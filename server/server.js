const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Beelzebub03',
  database: 'students_data',
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database:', error);
    return;
  }
  console.log('Connected to the database successfully');
});

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    alert("Unauthorized , login first");
    return res.status(401).json({ error: 'No token provided' });
    
  }
  jwt.verify(token.split(' ')[1], 'secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Failed to authenticate token' });
    }
    req.user = decoded;
    next();
  });
};
app.use(bodyParser.json());

app.get('/api/data', (req, res) => {
   const tenthValue = parseFloat(req.query.tenth) || 0;
  const twelfthValue = parseFloat(req.query.twelfth) || 0;
  const currentBacklogsValue = parseInt(req.query.backlogs) || 0;
  const cgpaValue = parseFloat(req.query.cgpa) || 0;
  const query = `
    SELECT *
    FROM db
    WHERE 
      (\Marks -10th\ >= 0)
      AND (\Marks -12th\ >= 0)
      AND (\No. of current backlogs\ <= ?)
      AND (\Aggregate %\ >= 0)
  `;
    const values = [tenthValue,  twelfthValue,  currentBacklogsValue, cgpaValue];

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

app.get('/dashboard', verifyToken, (req, res) => {
  connection.query('SELECT Marks -10th, Student Name,Marks -12th, Aggregate %, Email ID FROM db WHERE University Roll Number = ?', [req.user.universityRollNumber], (error, results, fields) => {
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
      message: 'Accessed dashboard successfully',
      user: {
        name: userData['Student Name'],
        universityRollNumber: req.user.universityRollNumber,
        // Include additional user details from the db table
        marks10th: userData['Marks -10th'],
        marks12th: userData['Marks -12th'],
        aggregatePercentage: userData['Aggregate %'],
        email: userData['Email ID'],
        // Add more details as needed
      },
    });
  });
});


app.post('/company-data', (req, res) => {
  const { name, date, ctc, role ,criteria } = req.body;
  const query = `INSERT INTO company_data (name, date, ctc, role ,criteria) VALUES (?,?, ?, ?, ?)`;
  connection.query(query, [name, date, ctc, role ,criteria], (error, results, fields) => {
    if (error) throw error;
    res.send('Data inserted successfully');
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
  const query = `UPDATE db SET \Aggregate %\ = ? WHERE \University Roll Number\ = ?`;
  connection.query(query, [cgpa, universityRollNumber], (error, results, fields) => {
    if (error) {
      console.error('Error updating Aggregate %:', error);
      return res.status(500).json({ error: 'An error occurred while updating Aggregate %' });
    }
    res.status(200).json({ message: 'Aggregate % updated successfully' });
  });
});

// server.js

// Other imports and configurations

app.post('/logout', (req, res) => {
  // Clear the token stored in the client (e.g., local storage)
  // No need for any server-side session cleanup as tokens are stateless
  res.status(200).json({ message: 'Logout successful' });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

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

app.post('/api/upload-pdf', (req, res) => {
  const { filename, mimeType, data } = req.body; // Assuming you're sending filename, mimeType, and data in the request body

  // Insert the PDF data into the database
  const sql = 'INSERT INTO pdf_documents (filename, mime_type, data) VALUES (?, ?, ?)';
  connection.query(sql, [filename, mimeType, data], (err, result) => {
    if (err) {
      console.error('Error inserting PDF data:', err);
      res.status(500).json({ error: 'Failed to upload PDF' });
      return;
    }
    console.log('PDF uploaded successfully');
    res.status(200).json({ message: 'PDF uploaded successfully' });
  });
});

// Route to fetch all PDF documents from the database
app.get('/api/get-all-pdfs', (req, res) => {
  // Query to retrieve all PDF data from the database
  const sql = 'SELECT id, filename, mime_type FROM pdf_documents';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching PDFs from database:', err);
      res.status(500).json({ error: 'Failed to fetch PDFs from database' });
      return;
    }

    // Send the PDF data to the client
    res.json(results);
  });
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
