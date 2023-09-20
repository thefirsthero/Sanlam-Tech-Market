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

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        // You can add custom file filtering logic here if needed
        // For example, check file types, etc.
        cb(null, true);
    }
});


// Define a route to handle the form submission
app.post('/upload', upload.fields([
    { name: 'documentation', maxCount: 1 }, // Optional documentation file
    { name: 'solutionZip', maxCount: 1 },   // Optional solutionZip file
]), (req, res) => {
  // Retrieve data from the form
  const solutionName = req.body.solutionName;
  const solutionDescription = req.body.solutionDescription;
  const solutionCategory = req.body.solutionCategory;
  const solutionTags = req.body.solutionTags;
  const codeSnippets = req.body.codeSnippets;
  const repositoryLink = req.body.repositoryLink;

  // You can check if the files were uploaded and handle them accordingly
  const documentationFile = req.files['documentation'] ? req.files['documentation'][0] : null;
  const solutionZipFile = req.files['solutionZip'] ? req.files['solutionZip'][0] : null;

  // Insert data into the solutions table, including file paths if they exist
const sql = `
INSERT INTO solutions
(solution_name, solution_description, solution_documents_path, solution_codezip_path, solution_category, solution_tags, solution_snippet, solution_link)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;

const documentationFilePath = documentationFile ? 'uploads/documents/' + documentationFile.originalname : null;
const solutionZipFilePath = solutionZipFile ? 'uploads/code_zip_files/' + solutionZipFile.originalname : null;

// Execute the SQL query using mysql2
db.query(
sql,
[
    solutionName,
    solutionDescription,
    documentationFilePath,
    solutionZipFilePath,
    solutionCategory,
    solutionTags,
    codeSnippets,
    repositoryLink,
],
(err, result) => {
    // Handle errors and success
    if (err) {
        console.error('Error inserting data into the database: ' + err.message);
        res.status(500).send('Error uploading the solution.');
        return;
    }

    // Log successful file uploads
    if (documentationFile) {
        console.log('Documentation uploaded successfully:', documentationFilePath);
    }

    if (solutionZipFile) {
        console.log('Solution ZIP file uploaded successfully:', solutionZipFilePath);
    }

    console.log('Solution uploaded successfully');
    res.status(200).send('Solution uploaded successfully');
}
);

});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
