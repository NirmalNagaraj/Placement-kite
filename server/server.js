const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

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
    SELECT 
      \`Sl.No.\`,
      \`Student Name\`, 
      \`Email ID\`, 
      \`Mobile Number\`,
      \`Marks -12th\`
    FROM 
      db
    WHERE 
      (\`Marks -10th\` >= ? OR ? = 0)
      AND (\`Marks -12th\` >= ? OR ? = 0)
      AND (\`No. of current backlogs\` <= ?)
      AND (\`Aggregate %\` >= ? OR ? = 0)
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

app.get('/dashboard', verifyToken, (req, res) => {
  const eligibilityQuery = `
    SELECT 
      \`University Roll Number\`,
      \`Marks -10th\`,
      \`Marks -12th\`,
      \`Aggregate %\`
    FROM 
      db
    WHERE 
      \`University Roll Number\` = ?
  `;

  connection.query(eligibilityQuery, [req.user.universityRollNumber], (error, eligibilityResults, fields) => {
    if (error) {
      console.error('Error fetching eligibility:', error);
      return res.status(500).json({ error: 'An error occurred while fetching eligibility data', originalError: error.message });
    }

    const eligibility = eligibilityResults[0];

    // Check if user meets eligibility criteria (10th, 12th, CGPA above 60%)
    if (
      (eligibility['Marks -10th'] >= 60 &&
      eligibility['Marks -12th'] >= 60 &&
      eligibility['Aggregate %'] >= 6) || 
      // Add condition for common criteria
      eligibility['Aggregate %'] >= 0
    ) {
      // Fetch upcoming events
      const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
      connection.query('SELECT * FROM company_data WHERE date >= ?', [currentDate], (error, results, fields) => {
        if (error) {
          console.error('Error fetching upcoming company data:', error);
          return res.status(500).json({ error: 'An error occurred while fetching upcoming company data', originalError: error.message });
        }
        const upcomingEvents = results.filter((event) => {
          // Check if the user meets the company criteria (80% or 60%)
          return (
            (event.criteria === 80 && eligibility['Aggregate %'] >= 8) ||
            (event.criteria === 60 && eligibility['Aggregate %'] >= 6) ||
            event.criteria === 'common'
          );
        });
        res.json({
          message: 'Accessed dashboard successfully',
          user: {
            name: req.user.name,
            universityRollNumber: req.user.universityRollNumber,
            tenthMarks: eligibility['Marks -10th'],
            twelfthMarks: eligibility['Marks -12th'],
            cgpa: eligibility['Aggregate %'],
          },
          upcomingEvents,
        });
      });
    } else {
      res.status(403).json({ error: 'User does not meet eligibility criteria for upcoming events' });
    }
  });
});

app.post('/company-data', (req, res) => {
  const { name, date, ctc,role , criteria } = req.body;
  const query = `INSERT INTO company_data (name, date, ctc, role ,criteria) VALUES (?, ?,?, ?, ?)`;
  connection.query(query, [name, date, ctc, role,criteria], (error, results, fields) => {
    if (error) throw error;
    res.send('Data inserted successfully');
  });
});

app.get('/upcoming', verifyToken, (req, res) => {
  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

  // Check if user meets eligibility criteria (10th, 12th, CGPA above 60%)
  if (
    req.query.tenth >= 60 &&
    req.query.twelfth >= 60 &&
    req.query.cgpa >= 60
  ) {
    connection.query('SELECT * FROM company_data WHERE date >= ?', [currentDate], (error, results, fields) => {
      if (error) {
        console.error('Error fetching upcoming company data:', error);
        return res.status(500).json({ error: 'An error occurred while fetching upcoming company data', originalError: error.message });
      }
      res.json(results);
    });
  } else {
    res.status(403).json({ error: 'User does not meet eligibility criteria for upcoming events' });
  }
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



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});