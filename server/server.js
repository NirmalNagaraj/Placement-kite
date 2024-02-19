const express = require('express');
const jwt = require('jsonwebtoken');

const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Beelzebub03',
  database: 'students_data'
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database:', error);
    return;
  }
  console.log('Connected to the database successfully');
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }
  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Failed to authenticate token' });
    }
    req.user = decoded;
    next();
  });
};

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
    console.log('User Password from DB:', user.Password);
    console.log('Password from Request:', password);

    // Trim whitespace from both passwords
    const trimmedDBPassword = user.Password.trim();
    const trimmedProvidedPassword = password.trim();

    console.log('Trimmed DB Password:', trimmedDBPassword);
    console.log('Trimmed Provided Password:', trimmedProvidedPassword);

    // Compare trimmed passwords
    if (trimmedDBPassword !== trimmedProvidedPassword) { // Compare passwords directly
      console.log('Passwords do not match');
      return res.status(401).json({ error: 'Invalid university roll number or password' });
    }

    const token = jwt.sign({ universityRollNumber: user.University_Roll_Number, name: user.Name }, 'secret_key', { expiresIn: '1h' });
    res.json({ token });
  });
});




// Example protected route
app.get('/dashboard', verifyToken, (req, res) => {x
  res.json({ message: 'Accessed dashboard successfully', user: req.user });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
