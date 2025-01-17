const fs = require('fs');
const express = require("express");
const path = require("path");
const router = express.Router();
const database = require("./database");
const multer = require('multer'); // Require multer for handling file uploads

//home route
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
//login routes for serving, capturing and verifiying
router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});
router.post("/verify", async (req, res) => {
    let useremail = req.body.username;
    let password = req.body.password;
    if (useremail && password) {
        const [credentials] = await database.query("SELECT user_email, user_password FROM user_table WHERE user_email = ?", [useremail])
        if (credentials) {
            if (credentials["user_email"] === useremail && credentials["user_password"] === password) {
                req.session.authenticated = true;
                req.session.useremail = useremail;
                res.redirect("/client_home")
            }
            else {
                res.send("<h1>Invalid credentials</h1>");
            }
            res.end();
            console.log(credentials)
        }
        else {
            res.send("<h1> No user found </h1>")
        }
    }
    else {
        res.send("<h1> Enter credentials </h1> ");
        res.end();
    }

});

router.get("/client_home", async (req, res) => {
    //let useremail = req.body.username;  
    if (req.session.authenticated) {
        const [user_id] = await database.query("SELECT user_identifier FROM user_table WHERE user_email = ?", [req.session.useremail]);
        const policies = await database.query("SELECT * FROM policy_table WHERE user_identifier = ?", [user_id["user_identifier"]]);
        res.render(path.join(__dirname, "public", "policy_page"), { policies });
        console.log(policies);
    }
    else {
        res.sendFile(path.join(__dirname, "public", "tenor.gif"))
    }
});
//signup routes for signing up and adding to dbms

router.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "signup.html"));
})
router.post("/enroll", async (req, res) => {
    let username = req.body.user_name
    let useremail = req.body.email_address
    let password = req.body.firstpassword

    const result = await database.query("INSERT INTO user_table (user_name, user_email, user_password) VALUES (?,?,?)", [username, useremail, password])
    if (result) {
        res.sendFile(path.join(__dirname, "public", "success.gif"));
    }
    else
        res.send("Another err")
})

//misc routes
router.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "about.html"));
})

router.get("/resetpass", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "resetpassword.html"));
})
//All_Solutions route
router.get("/All_solutions", async (req, res) => {
    try {
        const solutions = await database.query("SELECT * FROM solutions");
        res.status(200).render(path.join(__dirname, "public", "categories_page"), {solutions});
        //console.log(tester)

    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error occurred");
    }
});
//Single_Solution route
router.get("/single_solution", async (req, res) => {
    try {
        const tester = req.policies
        const solution = await database.query("SELECT * FROM solutions WHERE solution_name = 'PowerAutomate Emailer'");
        res.status(200).render(path.join(__dirname, "public", "single_solution"), {solution});
        console.log(tester)

    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error occurred");
    }
});

//test route
router.get("/test", async (req, res) => {
    try {
        const results = await database.query("SELECT * FROM user_table");
        res.status(200).render(path.join(__dirname, "public", "categories_page"));
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error occurred");
    }
});




//admin login route
router.get("/Adminlogin", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "loginAdmin.html"));
});



//verify Admin login
router.post("/verifyAdmin", async (req, res) => {
    let admin_email = req.body.admin_email
    let password = req.body.password;
    if (admin_email && password) {
        const [credentials] = await database.query("SELECT admin_email, admin_password FROM admin_table WHERE admin_email = ?", [admin_email])
        if (credentials) {
            if (credentials["admin_email"] === admin_email && credentials["admin_password"] === password) {
                req.session.authenticated = true;
                req.session.admin_email = admin_email;
                res.redirect("/adminPortal")
            }
            else {
                res.send("<h1>Invalid credentials</h1>");
            }
            res.end();
            console.log(credentials)
        }
        else {
            res.send("<h1> No Admin found </h1>")
        }
    }
    else {
        res.send("<h1> Enter credentials </h1> ");
        res.end();
    }

});

//admin portal route

router.get('/adminPortal', async (req, res) => {


    if (req.session.authenticated) {

        let policies = req.body.policy_name;
        policies = await database.query('SELECT DISTINCT policy_name FROM policy_table ');
        const users = await database.query('SELECT user_name FROM policy_table WHERE policy_name = "Car Insurance"');
        const admins = await database.query('SELECT * FROM admin_table ORDER BY admin_identifier desc');
        res.render(path.join(__dirname, "public", "admin_list"), { policies, users, admins });
        console.log(policies);
        console.log(users)
        console.log(admins);

    } else {
        console.log("Admin not registered!!!");
    }

});

//Edit User information 
router.get("/update", async(req, res) => {
    if (req.session.authenticated) {

        const [users] = await database.query("SELECT user_name, policy_name, date_acquired, amount_paid FROM policy_table" );
        //const policies = await database.query("SELECT * FROM policy_table WHERE user_identifier = ?", [user_id["user_identifier"]]);
        res.render(path.join(__dirname, "public", "edit_user"), { users });
        console.log(users);
    }
    else {
        res.sendFile(path.join(__dirname, "public", "tenor.gif"))
    }



    //res.render(path.join(__dirname, "public", "edit_user"));
});

//login routes for serving, capturing and verifiying
router.get("/upload", async (req, res) => {
    try {
        // Fetch unique policy names from the policy_table
        const policies = await database.query("SELECT DISTINCT policy_name FROM policy_table");

        // Render the upload_solutions.ejs template and pass the policies as an option
        res.render(path.join(__dirname, "public", "upload_solutions.ejs"), { policies });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error occurred");
    }
});



const solutionZipStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Specify the destination folder for solutionZip
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Use the original file name
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            // Specify the destination folder for uploaded files
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            // Use the original file name
            cb(null, file.originalname);
        }
    }),
    fileFilter: (req, file, cb) => {
        // You can add custom file filtering logic here if needed
        // For example, check file types, etc.
        cb(null, true);
    }
});

// Add the /upload route handler
router.post('/upload', upload.fields([
    { name: 'documentation', maxCount: 1 },
    { name: 'solutionZip', maxCount: 1 },
]), async (req, res) => {
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

    // Retrieve user email from the session
    const useremail = req.session.useremail;

    try {
        // Get the user's ID based on the email
        const [user] = await database.query('SELECT user_identifier FROM user_table WHERE user_email = ?', [useremail]);
        
        if (!user) {
            throw new Error('User not found');
        }

        // Insert data into the solutions table, including file paths if they exist
        const sql = `
            INSERT INTO solutions
            (solution_name, solution_description, solution_documents_path, solution_codezip_path, solution_category, solution_tags, solution_snippet, solution_link, user_identifier)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const documentationFilePath = documentationFile ? 'uploads/' + documentationFile.originalname : null;
        const solutionZipFilePath = solutionZipFile ? 'uploads/' + solutionZipFile.originalname : null;

        // Execute the SQL query using mysql2
        await database.query(
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
                user.user_identifier, // Add user identifier
            ]
        );

        // Handle file uploads separately if they exist
        if (documentationFile && documentationFile.buffer) {
            const documentationFilePath = 'uploads/' + documentationFile.originalname;
            fs.writeFile(documentationFilePath, documentationFile.buffer, (err) => {
                if (err) {
                    console.error('Error writing documentation file: ' + err.message);
                } else {
                    console.log('Documentation file saved:', documentationFilePath);
                }
            });
        }

        if (solutionZipFile && solutionZipFile.buffer) {
            const solutionZipFilePath = 'uploads/' + solutionZipFile.originalname;
            fs.writeFile(solutionZipFilePath, solutionZipFile.buffer, (err) => {
                if (err) {
                    console.error('Error writing solution ZIP file: ' + err.message);
                } else {
                    console.log('Solution ZIP file saved:', solutionZipFilePath);
                }
            });
        }

        console.log('Solution uploaded successfully');

        // Send a success message to the user and redirect to client_home
        res.redirect('/client_home');
    } catch (error) {
        console.error('Error inserting data into the database: ' + error.message);
        // Redirect to the /upload page after an error
        res.redirect('/upload');
    }
});

router.get('/user_solutions', async (req, res) => {
    if (req.session.authenticated) {
        try {
            // Retrieve the user's email from the session
            const useremail = req.session.useremail;

            // Get the user's ID based on the email
            const [user] = await database.query('SELECT user_identifier FROM user_table WHERE user_email = ?', [useremail]);

            if (!user) {
                throw new Error('User not found');
            }

            // Fetch user-specific solutions based on user_identifier
            const userSolutions = await database.query('SELECT * FROM solutions WHERE user_identifier = ?', [user.user_identifier]);

            // Render the user_solutions.ejs page with user-specific solutions
            res.render('user_solutions', { userSolutions });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error occurred');
        }
    } else {
        res.sendFile(path.join(__dirname, 'public', 'tenor.gif'));
    }
});

// Delete a solution from the database
router.delete('/delete_solution/:solutionId', async (req, res) => {
    if (req.session.authenticated) {
        try {
            const solutionId = req.params.solutionId;

            // Check if the solution belongs to the currently authenticated user
            const [solution] = await database.query('SELECT * FROM solutions WHERE solutionId = ?', [solutionId]);
            if (!solution) {
                return res.status(404).json({ success: false, message: 'Solution not found' });
            }

            // Get the user's email from the session
            const useremail = req.session.useremail;

            // Get the user's ID based on the email
            const [user] = await database.query('SELECT user_identifier FROM user_table WHERE user_email = ?', [useremail]);

            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            // Check if the solution belongs to the authenticated user
            if (solution.user_identifier !== user.user_identifier) {
                return res.status(403).json({ success: false, message: 'Permission denied' });
            }

            // Delete the solution from the database
            await database.query('DELETE FROM solutions WHERE solutionId = ?', [solutionId]);

            // Respond with success
            res.status(200).json({ success: true, message: 'Solution deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'An error occurred while deleting the solution' });
        }
    } else {
        // Unauthorized access
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
});



module.exports = router;
