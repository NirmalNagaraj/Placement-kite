// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3000;

// Use cors middleware to allow requests from all origins
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
  console.log('Connected to database successfully');
});

app.get('/api/data', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const offset = (page - 1) * pageSize;

  const query = `SELECT * FROM db LIMIT ?, ?`;
  const values = [offset, pageSize];

  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'An error occurred while fetching data' });
      return;
    }
    res.json(results);
  });
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
