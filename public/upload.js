// Import required libraries
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2'); // Use mysql2
const multer = require('multer'); // For handling file uploads

// Create an Express application
const app = express();
const port = 4500; // Choose a port

// Configure middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Create a MySQL database connection
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.message);
    return;
  }
  console.log('Connected to the database');
});

// Handle file uploads using multer
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        // You can add custom file filtering logic here if needed
        // For example, check file types, etc.
        cb(null, true);
    }
});


// Define a route to handle the form submission
app.post('/upload', (req, res) => {
  // Retrieve data from the form
  const solutionName = req.body.solutionName;
  const solutionDescription = req.body.solutionDescription;
  const solutionCategory = req.body.solutionCategory;
  const solutionTags = req.body.solutionTags;
  const codeSnippets = req.body.codeSnippets;
  const repositoryLink = req.body.repositoryLink;

  // Insert data into the solutions table
  const sql = `
    INSERT INTO solutions
    (solution_name, solution_description, solution_path, solution_category, solution_tags, solution_snippet, solution_link)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  // Execute the SQL query using mysql2
  db.query(
    sql,
    [
        solutionName,
        solutionDescription,
        'uploads/', // Path to the uploaded documentation PDF
        solutionCategory, // Specify the category
        solutionTags, // Specify tags
        codeSnippets,
        repositoryLink,
    ],
    (err, result) => {
      if (err) {
        console.error('Error inserting data into the database: ' + err.message);
        res.status(500).send('Error uploading the solution.');
        return;
      }

      // TODO: Handle file uploads separately using multer and save them to the server

      console.log('Solution uploaded successfully');
      res.status(200).send('Solution uploaded successfully');
    }
  );
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
