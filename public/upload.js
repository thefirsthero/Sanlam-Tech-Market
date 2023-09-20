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

// Handle file uploads using Multer
const documentationStorage = multer.diskStorage({
    destination: 'uploads/documents/', // Destination folder for documentation
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    }
});

const solutionZipStorage = multer.diskStorage({
    destination: 'uploads/code_zip_files/', // Destination folder for solutionZip
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    }
});

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: function (req, file, cb) {
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

  // Execute the SQL query using mysql2
  db.query(
    sql,
    [
        solutionName,
        solutionDescription,
        documentationFile ? 'uploads/documents/' + documentationFile.filename : '', // Use documentation file if it exists
        solutionZipFile ? 'uploads/code_zip_files/' + solutionZipFile.filename : '', // Use solutionZipFile file if it exists
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

      // TODO: Handle file uploads separately using Multer and save them to the server
      if (documentationFile) {
          // Documentation file was uploaded, you can save it to the server
          // Example: fs.writeFileSync('uploads/documents/' + documentationFile.filename, documentationFile.buffer);
          console.log('Documentation uploaded successfully:', documentationFile.originalname);
   }

      if (solutionZipFile) {
          // Solution ZIP file was uploaded, you can save it to the server
          // Example: fs.writeFileSync('uploads/code_zip_files/' + solutionZipFile.filename, solutionZipFile.buffer);
          console.log('Solution ZIP file uploaded successfully:', solutionZipFile.originalname);
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
