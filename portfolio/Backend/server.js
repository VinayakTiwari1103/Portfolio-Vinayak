const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// MySQL Database connection
const db = mysql.createConnection({
    host: 'database-1.cdeo2a6ioa8g.ap-south-1.rds.amazonaws.com',
    user: 'admin',
    password: '8511056600',
    database: 'contact_db',
    port: 3306,
  });

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to the database');
});

// API endpoint to receive form data
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // SQL query to insert form data into the database
  const query = 'INSERT INTO contact_form (name, email, message) VALUES (?, ?, ?)';
  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ message: 'Error inserting data' });
    }
    res.status(200).json({ message: 'Message saved successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
