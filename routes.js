const express = require("express");
const path = require("path");
const router = express.Router();
const database = require("./database");

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
        console.log("Admiin not registered!!!");
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



module.exports = router;