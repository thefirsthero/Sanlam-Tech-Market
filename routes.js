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
//Single_Solution route
router.get("/single_solution", async (req, res) => {
    try {
        res.status(200).render(path.join(__dirname, "public", "single_solution"));
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
        res.status(200).send(results);
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
router.get("/upload", (req, res) => {
    res.render(path.join(__dirname, "public", "upload_solutions.ejs"));
})

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

// Add a POST route to handle form submission
router.post("/upload", upload.fields([
    { name: 'documentation', maxCount: 1 }, // Optional documentation file
    { name: 'solutionZip', maxCount: 1 },   // Optional solutionZip file
]), (req, res) => {
    // Retrieve data from the form
    const solutionName = req.body.solutionName;
    const solutionDescription = req.body.solutionDescription;
    const codeSnippets = req.body.codeSnippets;
    const repositoryLink = req.body.repositoryLink;
    const solutionCategory = req.body.solutionCategory; // Access the solution category
    const solutionTags = req.body.solutionTags; // Access the solution tags

    // You can check if the files were uploaded and handle them accordingly
    const documentationFile = req.files['documentation'] ? req.files['documentation'][0] : null;
    const solutionZipFile = req.files['solutionZip'] ? req.files['solutionZip'][0] : null;

    // Insert data into the solutions table, including file paths if they exist
    const sql = `
        INSERT INTO solutions
        (solution_name, solution_description, solution_path, solution_category, solution_tags, solution_snippet, solution_link)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    // Execute the SQL query using your database connection (database.query)
    database.query(
        sql,
        [
            solutionName,
            solutionDescription,
            'uploads/' + (documentationFile ? documentationFile.filename : ''), // Use documentation file if it exists
            solutionCategory, // Specify the category
            solutionTags, // Specify tags
            codeSnippets,
            repositoryLink,
        ],
        (err, result) => {
            if (err) {
                console.error('Error inserting data into the database: ' + err.message);
                return res.status(500).send('Error uploading the solution.');
            }

            console.log('Solution uploaded successfully');
            res.status(200).send('Solution uploaded successfully');
        }
    );
});

module.exports = router;
