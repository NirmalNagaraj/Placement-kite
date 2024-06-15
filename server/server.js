const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');
const twilio = require('twilio');
const crypto = require('crypto');
const nodemailer = require('nodemailer');



const app = express();
const port = 3000;
const accountSid = 'ACbee68d94e3e4db20026db2754e316db9';
const authToken = '5d66279b0123a1e91a34c113e619d8bf'; // Replace with your Twilio Auth Token
const twilioClient = twilio(accountSid, authToken);
const generateOTP = () => {
  return crypto.randomBytes(3).toString('hex').toUpperCase(); // Generates a 6-digit OTP (3 bytes * 2 characters per byte)
};

// Store generated OTPs in memory (replace with a database in production)
const otpCache = {};

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Beelzebub',
  database: 'students_data',
  port:'3308'
}); 
 
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database:', error);
    return;
  }
  console.log('Connected to the Nirmal successfully');
});

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    
    return res.status(401).json({ error: 'No token provided' });
    
  }
  jwt.verify(token.split(' ')[1], 'secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Failed to authenticate token' });
    }
    console.log(decoded);
    req.user = decoded;
    next(); 
  });
};


const sendEmail = async (to, subject, text) => {
  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "bidblogger19@gmail.com",
        pass: "cbzvfcibscbseuty",
      },
    });

    // Define email options
    const mailOptions = {
      from: "bidblogger19@gmail.com",
      to: Array.isArray(to) ? to.join(', ') : to, // Convert array of emails to comma-separated string if needed
      subject,
      text,
    };
    console.log(mailOptions);
    // Send the email
    await transporter.sendMail(mailOptions);

    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });
app.use(bodyParser.json());
app.get('/api/data', (req, res) => {
  const tenthValue = parseFloat(req.query.tenth) || 0;
  const twelfthValue = parseFloat(req.query.twelfth) || 0;
  const currentBacklogsValue = parseInt(req.query.backlogs) || 0;
  const cgpaValue = parseFloat(req.query.cgpa) || 0;

  const query = `
    SELECT 
      \`Name\`, 
      \`Email\`, 
      \`MobileNumber\`,
      \`Marks12orDiploma\` 
    FROM 
      \`userdetails\`
    WHERE 
      (\`Marks10\` >= ? OR ? = 0)
      AND (\`Marks12orDiploma\` >= ? OR ? = 0)
      AND (\`Backlogs\` <= ?)
      AND (\`CGPA\` >= ? OR ? = 0)
  `;
  
  const values = [tenthValue, tenthValue, twelfthValue, twelfthValue, currentBacklogsValue, cgpaValue, cgpaValue];

  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'An error occurred while fetching data' });
      return;
    }
    res.json(results);
  });
});



app.post('/login', (req, res) => {
  const { universityRollNumber, password } = req.body; 

  connection.query('SELECT * FROM login_info WHERE University_Roll_Number = ?', [universityRollNumber], async (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'An error occurred while fetching data' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Enter a valid university roll number or password' });
    }

    const user = results[0];

    // Trim whitespace from both passwords
    const trimmedDBPassword = user.Password.trim();
    const trimmedProvidedPassword = password.trim();

    // Compare trimmed passwords
    if (trimmedDBPassword !== trimmedProvidedPassword) {
      console.log('Passwords do not match');
      return res.status(401).json({ error: 'Invalid university roll number or password' });
    }

    const token = jwt.sign({ universityRollNumber: user.University_Roll_Number, name: user.Name }, 'secret_key', { expiresIn: '1h' });
    res.json({ token });
  });
});

app.post('/faculty/login', (req, res) => {
  console.log(req.body); // Check if the request body is received properly
  const { username, password } = req.body;
  const query = `SELECT * FROM faculty_login WHERE name = ? AND password = ?`;
  connection.query(query, [username, password], (err, result) => {
    if (err) {
      res.status(500).send('Internal server error');
      return; 
    }
    if (result.length > 0) {
      res.status(200).send({ message: 'Login successful' });
    } else {
      res.status(401).send({ error: 'Invalid credentials' });
    }
  }); 
});

app.get('/dashboard', verifyToken, (req, res) => {
  connection.query('SELECT `Marks10`, `Name`,`Marks12orDiploma`, `CGPA` FROM UserDetails WHERE `RegisterNumber` = ?', [req.user.universityRollNumber], (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'An error occurred while fetching user data' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User data not found' });
    }

    const userData = results[0];

    // Send back the required user details
    res.json({
      message: 'Personal Details',
      user: {
        name: userData['Name'],
        universityRollNumber: req.user.universityRollNumber,
        // Include additional user details from the db table
        marks10th: userData['Marks10'],
        marks12th: userData['Marks12orDiploma'],
        aggregatePercentage: userData['CGPA'],

        // Add more details as needed
      },
    });
  });
});

app.get('/personal-details', verifyToken, (req, res) => {
  const registerNumber = req.user.universityRollNumber;
  connection.query('SELECT * FROM UserDetails WHERE RegisterNumber = ?', [registerNumber], (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'An error occurred while fetching user data' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User data not found' });
    }

    const userData = results[0];

    // Send back the user details
    res.json({
      userDetails: userData
    });
  });
});

app.post('/company-data', (req, res) => {
  const { name, date, ctc, role ,criteria ,link ,type} = req.body;
  const query = `INSERT INTO company_data (name, date, ctc, role ,criteria ,link , type) VALUES (?,?, ?, ?, ? ,?,?)`;
  connection.query(query, [name, date, ctc, role ,criteria , link , type], (error, results, fields) => {
    if (error) throw error;
    res.send('Data inserted successfully');
  });
}); 

app.post('/hiring-update', (req, res) => {
  const { companyName,hiring  } = req.body;

  // Update the hired value in the company_data table
  const sql = 'UPDATE company_data SET hired = ? WHERE name =?' ;
  connection.query(sql, [hiring , companyName], (error, results) => {
    if (error) {
      console.error('Error updating hired value:', error);
      res.status(500).json({ error: 'Failed to update hired value' });
      return;
    }

    console.log('Hiring value updated successfully');
    res.status(200).json({ message: 'Hiring value updated successfully' });
  });
});
app.get('/hiring-count', (req, res) => {
  // Query to calculate the sum of the hiring field value in the company_data table
  const sql_students = 'SELECT COUNT(RegisterNumber) AS totalCount FROM UserDetails';
  const sql = 'SELECT SUM(hired) AS totalHiring FROM company_data';

  connection.query(sql, (error1, results1) => {
    if (error1) {
      console.error('Error fetching hiring count:', error1);
      res.status(500).json({ error: 'Failed to fetch hiring count' });
      return;
    }

    // Execute the second query after the first one completes
    connection.query(sql_students, (error2, results2) => {
      if (error2) {
        console.error('Error fetching total count:', error2);
        res.status(500).json({ error: 'Failed to fetch total count' });
        return;
      }

      // Extract the total hiring count from the first query results
      const totalHiring = results1[0].totalHiring;

      // Extract the total count from the second query results
      const totalCount = results2[0].totalCount;

      // Send both counts as a response
      res.status(200).json({ totalHiring, totalCount });
      // console.log('Total hiring count:', totalHiring);
      // console.log('Total count:', totalCount);
    });
  });
}); 

app.post('/placement-info', (req, res) => {
    const { companyName, studentInfo } = req.body;

    // Insert student placement info into placed_info table
    const query = 'INSERT INTO placed_info (university_number, company_name, role, ctc) VALUES (?, ?, ?, ?)';
    studentInfo.forEach(async (student) => {
        try {
            await new Promise((resolve, reject) => {
                connection.query(query, [student.studentNumber, companyName, student.role, student.ctc], (error, results) => {
                    if (error) {
                        console.error('Error inserting student placement info:', error);
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
        } catch (error) { 
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
    });

    res.status(200).json({ message: 'Student placement info inserted successfully' });
});
app.get('/students-placed', (req, res) => {
    // Query to select all rows from the placed_info table
    const query = 'SELECT * FROM placed_info';

    // Execute the query
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error retrieving placed info:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            // Send the results as a response
            res.status(200).json(results);
        }
    });
});

app.get('/students/info', (req, res) => {
  
  const universityRollNumber = req.query.universityRollNumber; 
   

  // Fetch details from the db table based on the university number
  const query = `
    SELECT *
    FROM UserDetails
    WHERE RegisterNumber = ?
  `;
  connection.query(query, [universityRollNumber], (error, studentDetails, fields) => {
    if (error) {
      console.error('Error fetching student details:', error);
      res.status(500).json({ error: 'An error occurred while fetching student details' });
      return;
    }

    // Fetch details from the placed_info table based on the university roll number
    const placedInfoQuery = `
      SELECT *
      FROM placed_info
      WHERE university_number = ?
    `;
    connection.query(placedInfoQuery, [universityRollNumber], (error, placedInfo, fields) => {
      if (error) {
        console.error('Error fetching placed info:', error);
        res.status(500).json({ error: 'An error occurred while fetching placed info' });
        return;
      }

      // Return both sets of data
      res.json({ studentDetails, placedInfo });
    });
  });
});

app.post('/userDetails', verifyToken, (req, res) => {
  const {
    name, gender, branch, marks10, educationLevel, marks12OrDiploma, cgpa, backlogs,
    historyOfArrears, mobileNumber, email, residence, address, degree, yearOfPassing
  } = req.body;

  // Extract RegisterNumber from decoded JWT token
  const { universityRollNumber } = req.user;

  // Calculate the grade based on the given conditions
  let grade;
  if (marks10 < 60 || marks12OrDiploma < 60 || cgpa < 6) {
    grade = 1;
  } else if (marks10 >= 60 && marks10 <= 79 && marks12OrDiploma >= 60 && marks12OrDiploma <= 79) {
    grade = 2;
  } else if (marks10 > 79 && marks12OrDiploma > 79 && cgpa > 7) {
    grade = 3;
  } else {
    grade = 1; // Default to grade 1 if conditions are not met
  }

  // Your SQL query to insert data into the UserDetails table
  const userDetailsQuery = `
    INSERT INTO UserDetails (RegisterNumber, Name, Gender, Branch, Marks10, ModeOfStudy, Marks12orDiploma,
      CGPA, Backlogs, HistoryOfArrears, MobileNumber, Email, Residence, Address,
      Degree, YearOfPassing, Grade)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Your SQL query to insert data into the EmailDetails table
  const emailDetailsQuery = `
    INSERT INTO EmailDetails (registerNumber, email)
    VALUES (?, ?)
  `;

  const userDetailsValues = [
    universityRollNumber, name, gender, branch, marks10, educationLevel, marks12OrDiploma, cgpa, backlogs,
    historyOfArrears, mobileNumber, email, residence, address, degree, yearOfPassing, grade
  ];

  const emailDetailsValues = [
    universityRollNumber, email
  ];

  // Execute both SQL queries to insert user details and email details
  connection.beginTransaction((err) => {
    if (err) {
      console.error('Error beginning transaction:', err);
      return res.status(500).json({ error: 'An error occurred while beginning transaction' });
    }

    connection.query(userDetailsQuery, userDetailsValues, (error, results, fields) => {
      if (error) {
        connection.rollback(() => {
          console.error('Error inserting user details:', error);
          res.status(500).json({ error: 'An error occurred while inserting user details' });
        });
      }

      connection.query(emailDetailsQuery, emailDetailsValues, (err, results) => {
        if (err) {
          connection.rollback(() => {
            console.error('Error inserting email details:', err);
            res.status(500).json({ error: 'An error occurred while inserting email details' });
          });
        }

        connection.commit((err) => {
          if (err) {
            connection.rollback(() => {
              console.error('Error committing transaction:', err);
              res.status(500).json({ error: 'An error occurred while committing transaction' });
            });
          }
          console.log('Transaction completed successfully');
          res.json({ success: true });
        });
      });
    });
  });
});


app.get('/verify-user',verifyToken, (req, res) => {
  // Extract universityRollNumber from request headers
  const { universityRollNumber } = req.user;

  // Check if universityRollNumber is present
  if (!universityRollNumber) {
    return res.status(400).json({ error: 'University Roll Number not provided' });
  }

  // Query to check if universityRollNumber exists in UserDetails table
  const query = 'SELECT * FROM UserDetails WHERE RegisterNumber = ?';
  connection.query(query, [universityRollNumber], (error, results, fields) => {
    if (error) {
      console.error('Error verifying user:', error);
      return res.status(500).json({ error: 'An error occurred while verifying user' });
    }

    // Check if user exists
    if (results.length > 0) {
      // User exists, send success response
      res.status(200).json({ verified: true });
    } else {
      // User does not exist, send failure response
      res.status(404).json({ verified: false });
    }
  });
});

app.post('/offerLetter', verifyToken,upload.single('pdfFile'), (req, res) => {
  const { companyName } = req.body;
  const registerNumber = req.user.universityRollNumber;
  const pdfPath = req.file.path;
  console.log(companyName , pdfPath);

  // Read the PDF file
  fs.readFile(pdfPath, (err, data) => {
    if (err) {
      console.error('Error reading PDF file:', err);
      return res.status(500).json({ error: 'Failed to upload PDF' });
    }

    // Insert the offer letter data into the database
    const sql = 'INSERT INTO OfferLetters (RegisterNumber ,Company_name, Offerletter) VALUES (?,?, ?)';
    connection.query(sql, [registerNumber,companyName, data], (err, result) => {
      if (err) {
        console.error('Error inserting offer letter data:', err);
        return res.status(500).json({ error: 'Failed to insert offer letter data' });
      }
      console.log('Offer letter data inserted successfully');
      res.status(200).json({ message: 'Offer letter data inserted successfully' });
    });
  });
});

app.get('/api/all-questions', (req, res) => {
  // Fetch all questions from the SolutionData table
  connection.query('SELECT * FROM SolutionData', (error, questions) => {
    if (error) {
      console.error('Error fetching questions:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Process the blob data for each question
    questions.forEach(question => {
      // Convert blob data to a buffer
      const bufferData = Buffer.from(question.solution_data, 'binary');
      // Convert buffer to base64
      question.solution_data = bufferData.toString('base64');
    });

    // Send the questions data in the response
    res.status(200).json(questions);
  });
});

app.get('/api/qbdetails', (req, res) => {
  const companyName = req.query.companyName; // Extract company name from query parameter
  const id = req.query.id; // Extract ID from query parameter
  console.log(companyName,id);
  // SQL query to select company details based on company name and ID
  const sql = 'SELECT * FROM SolutionData WHERE company_name = ? AND id = ?';

  // Execute the SQL query with the company name and ID parameters
  connection.query(sql, [companyName, id], (err, results) => {
    if (err) { 
      console.error('Error fetching company details:', err);
      return res.status(500).json({ error: 'Failed to fetch company details' });
    }
    // Send the fetched company details as JSON response
    res.json(results[0]); // Assuming there's only one company detail with the given name and ID
  });
});


app.post('/api/upload-qp', verifyToken, upload.single('solution_data'), (req, res) => {
  const { company_name, round, question_description, solution_type } = req.body;
  const registerNumber = req.user.universityRollNumber; // Get registerNumber from user's token
  const solution_data = req.file ? fs.readFileSync(req.file.path) : null; // Read file if uploaded

  // Insert data into the database
  const sql = 'INSERT INTO SolutionData (RegisterNumber, company_name, round, question_description, solution_type, solution_data) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(sql, [registerNumber, company_name, round, question_description, solution_type, solution_data], (error, results) => {
    if (error) {
      console.error('Error uploading question paper:', error);
      return res.status(500).json({ error: 'An error occurred while uploading the question paper' });
    }

    // Remove the temporary file after reading
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    res.status(200).json({ message: 'Question paper uploaded successfully' });
  });
});
app.get('/api/get-qp', (req, res) => {
  const companyName = req.query.companyName; // Extract company name from query parameter

  // SQL query to select all data from SolutionData with the specified company name
  const sql = 'SELECT * FROM SolutionData WHERE company_name = ?';

  // Execute the SQL query with the company name parameter
  connection.query(sql, [companyName], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Failed to fetch data' });
    }
    // Send the fetched data as JSON response
    res.json(results);
  });
});
app.get('/upcoming', (req, res) => {
  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
  connection.query('SELECT * FROM company_data WHERE date >= ?', [currentDate], (error, results, fields) => {
    if (error) {
      console.error('Error fetching upcoming company data:', error);
      return res.status(500).json({ error: 'An error occurred while fetching upcoming company data' });
    }
    res.json(results);
  });
});
app.get('/api/get-document/:companyName', (req, res) => {
  const companyName = req.params.companyName;
  console.log(companyName);
  // Fetch document data (Blob) from the SolutionData table based on the company name
  connection.query('SELECT solution_data FROM SolutionData WHERE company_name = ?', [companyName], (error, documentData) => {
    if (error) {
      console.error('Error fetching document:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Check if document data exists
    if (documentData.length === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Extract the Blob data
    const documentBlob = documentData[0].solution_data;

    // Convert Blob data to Buffer
    const documentBuffer = Buffer.from(documentBlob, 'binary');

    // Set the response headers to indicate that it's a PDF file
    res.setHeader('Content-Type', 'application/pdf');

    // Send the document data in the response
    res.send(documentBuffer);
  });
});

app.get('/api/question-bank/:companyName', (req, res) => {
  const { companyName } = req.params;

  // Query to fetch the PDF blob data from the database
  const sql = 'SELECT pdf_data FROM company_data WHERE name = ?';
  connection.query(sql, [companyName], (error, results) => {
    if (error) {
      console.error('Error fetching PDF data:', error);
      res.status(500).json({ error: 'Failed to fetch PDF data' });
      return;
    }

    // Check if any results were returned
    if (results.length === 0 || !results[0].pdf_data) {
      res.status(404).json({ error: 'PDF data not found for the company' });
      return;
    }

    // Retrieve the PDF blob data from the query results
    const pdfBlobData = results[0].pdf_data;

    // Convert the blob data into a buffer
    const pdfBuffer = Buffer.from(pdfBlobData, 'binary');
    console.log( pdfBuffer);
   
    // Send the PDF buffer as a response
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
    console.log( "Res",pdfBuffer);
  });
});


app.get('/previous', (req, res) => {
  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
  connection.query('SELECT * FROM company_data WHERE date < ?', [currentDate], (error, results, fields) => {
    if (error) {
      console.error('Error fetching previous company data:', error);
      return res.status(500).json({ error: 'An error occurred while fetching previous company data' });
    }
    res.json(results);
  });
}); 

app.post('/cgpa', (req, res) => {
  const { universityRollNumber, cgpa } = req.body;

  // Update the Aggregate % in the database table for the specified university roll number
  const query = `UPDATE db SET \`Aggregate %\` = ? WHERE \`University Roll Number\` = ?`;
  connection.query(query, [cgpa, universityRollNumber], (error, results, fields) => {
    if (error) {
      console.error('Error updating Aggregate %:', error);
      return res.status(500).json({ error: 'An error occurred while updating Aggregate %' });
    }
    res.status(200).json({ message: 'Aggregate % updated successfully' });
  });
});



app.post('/logout', (req, res) => {
  // Clear the token stored in the client (e.g., local storage)
  // No need for any server-side session cleanup as tokens are stateless
  res.status(200).json({ message: 'Logout successful' });
});


app.post('/api/upload', upload.single('file'), (req, res) => {
  const filename = req.file.path;
  const updates = [];

  fs.createReadStream(filename)
    .pipe(csvParser())
    .on('data', (data) => {
      updates.push(data);
    })
    .on('end', () => {
      const updateQuery = 'UPDATE student_data SET Aggregate = ? WHERE UniversityRollNumber = ?';

      updates.forEach((update) => {
        connection.query(updateQuery, [update.Aggregate, update.UniversityRollNumber], (err, results, fields) => {
          if (err) {
            console.error('Error updating data:', err);
            return;
          }
          console.log(`Updated Aggregate for University Roll Number ${update.UniversityRollNumber}`);
        });
      });

      res.status(200).json({ message: 'Data updated successfully' });
    });
});

app.post('/api/update-pdf', upload.single('pdfFile'), (req, res) => {
  const { companyName } = req.body;
  const pdfPath = req.file.path;
  console.log(companyName , pdfPath);
  fs.readFile(pdfPath, (err, data) => {
    if (err) {
      console.error('Error reading PDF file:', err);
      return res.status(500).json({ error: 'Failed to upload PDF' });
    }

    const sql = 'UPDATE company_data SET pdf_data = ? WHERE name = ?';
    connection.query(sql, [data, companyName], (err, result) => {
      if (err) {
        console.error('Error updating PDF data:', err);
        return res.status(500).json({ error: 'Failed to update PDF data' });
      }
      console.log('PDF data updated successfully');
      res.status(200).json({ message: 'PDF data updated successfully' });
    });
  });
});


app.post('/validate', (req, res) => {
  const { universityRollNumber, password } = req.body;
  console.log('Roll Number:', universityRollNumber);
  console.log('Password:', password);

  // Query the database to check if the provided roll number and password match any records
  connection.query('SELECT * FROM login_info WHERE University_Roll_Number = ?', [universityRollNumber], (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'An error occurred while fetching data' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid length university roll number or password' });
    }

    const user = results[0];

    // Trim whitespace from both passwords
    const trimmedDBPassword = user.Password.trim();
    const trimmedProvidedPassword = password.trim();
    console.log(`Original :${trimmedDBPassword} and Provided: ${trimmedProvidedPassword}`);

    // Compare trimmed passwords
    if (trimmedDBPassword !== trimmedProvidedPassword) {
      console.log('Passwords do not match');
      return res.status(401).json({ error: 'Invalid university roll number or password' });
    }

    // Passwords match, return success response
    res.status(200).json({ message: 'Validation successful' });
  });
});


app.post('/send-otp', (req, res) => {
  const { mobileNumber } = req.body;
  const otp = generateOTP();
  
  
  otpCache[mobileNumber] = otp;

  twilioClient.messages
    .create({
      body: `Your OTP is ${otp}`,
      from: '+16503514109',
      to: mobileNumber
    })
    .then(message => {
      console.log('OTP sent:', message.sid);
      res.status(200).send('OTP sent successfully');
    })
    .catch(error => {
      console.error('Error sending OTP:', error);
      res.status(500).json({ error: 'Failed to send OTP' });
    });
});

app.post('/verify-otp', (req, res) => {
  const { mobileNumber, otp } = req.body;

  if (!otpCache[mobileNumber]) {
    return res.status(400).json({ error: 'OTP not sent or expired' });
  }

  if (otpCache[mobileNumber] === otp) {
    delete otpCache[mobileNumber];
    res.status(200).send('OTP verified successfully');
  } else {
    res.status(401).json({ error: 'Invalid OTP' }); 
  }
}); 

app.post('/api/reset-password', verifyToken, (req, res) => {
  const { newPassword, repeatPassword } = req.body;
  const universityRollNumber = req.user.universityRollNumber;
  console.log(universityRollNumber);

  if (newPassword !== repeatPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

 
  connection.query('UPDATE login_info SET Password = ? WHERE University_Roll_Number = ?', [newPassword, universityRollNumber], (error, results, fields) => {
    if (error) {
      console.error('Error updating password:', error);
      return res.status(500).json({ error: 'An error occurred while updating password' });
    }


    res.status(200).json({ message: 'Password updated successfully' });
  });
});

app.post('/api/EmailAlert', (req, res) => {
  const { companyName, criteria } = req.body;

  // Determine the grade based on the criteria
  let grade;
  switch(criteria) {
    case '80%':
      grade = 3;
      break;
    case '60%':
      grade = 2;
      break;
    case 'common':
      grade = 1;
      break;
    default:
      grade = 1; // Default to grade 1 for unknown criteria
  }

  const query = `SELECT Email FROM UserDetails WHERE Grade = ?`;

  // Execute the SQL query
  connection.query(query, [grade], async (error, results, fields) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      return res.status(500).json({ error: 'An error occurred while fetching email details' });
    }
    const emails = results.map(result => result.Email);
    console.log(emails);
    // Send email to multiple recipients
    const subject = `New Company Added: ${companyName}`;
    const text = `Dear Student,\n\nWe are pleased to inform you that a new company (${companyName}) has been added to our placement list. Please check your dashboard for more details.\n\nRegards,\nPlacement Cell`;
    try {
      await sendEmail(emails, subject, text);
      console.log('Email sent successfully to:', emails);
      res.json({ success: true, emails });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'An error occurred while sending email' });
    }
  });
});

app.post('/apply', verifyToken, (req, res) => {
  const { companyName} = req.body;
  const registerNumber = req.user.universityRollNumber;

  if (!companyName || !registerNumber) {
    return res.status(400).json({ error: 'Company name and register number are required' });
  }
  
  
  // Insert into applied_companies table (Dummy operation)
  const sql = 'INSERT INTO applied_companies (company_name, register_number) VALUES (?, ?)';
  connection.query(sql, [companyName, registerNumber], (err, result) => {
    if (err) {
      console.error('Error inserting into applied_companies:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    
    console.log('Inserted into applied_companies:', result);
    return res.status(201).json({ message: 'Applied successfully' });
  });
});

app.get('/appliedCompanies', verifyToken, (req, res) => {
  const sql = 'SELECT * FROM applied_companies WHERE register_number = ?';
  const registerNumber = req.user.universityRollNumber;
  connection.query(sql, [registerNumber], (err, results) => {
    if (err) {
      console.error('Error fetching applied companies:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    console.log('Fetched applied companies:', results);
    return res.status(200).json(results);
  });
});

app.post('/submitReview/:companyname',(req, res) => {
  const {  role, review } = req.body;
  const {companyName} = req.params;
  console.log(companyName);

  if (!companyName || !role || !review) {
    return res.status(400).json({ error: 'Company name, role, review, and register number are required' });
  }
  
  const sql = 'INSERT INTO applied_review (company_name, role, review) VALUES (?, ?, ?)';
  connection.query(sql, [companyName, role, review], (err, result) => {
    if (err) {
      console.error('Error inserting into applied_companies:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    
    console.log('Inserted into applied_companies:', result);
    return res.status(201).json({ message: 'Applied successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});  