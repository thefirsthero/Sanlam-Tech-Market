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
router.post("/verify", async (req, res) =>{
    let useremail = req.body.username;
    let password = req.body.password;
    if(useremail && password) 
    {
        const [credentials] = await database.query("SELECT user_email, user_password FROM user_table WHERE user_email = ?", [useremail]) 
        if(credentials)
        {
            if(credentials["user_email"] === useremail && credentials["user_password"] === password)
            {
            req.session.authenticated = true;
            req.session.useremail = useremail;
            res.redirect("/client_home")
            }
            else 
            {
            res.send("<h1>Invalid credentials</h1>");
            }
        res.end();
        console.log(credentials)     
        }
        else
        {
            res.send("<h1> No user found </h1>")
        }
    }    
    else
    {
        res.send("<h1> Enter credentials </h1> ");
        res.end();
    }
});
router.get("/client_home", (req, res) => {   
    if(req.session.authenticated)
    {
        res.sendFile(path.join(__dirname, "public", "policy_catalog.html"));
    }
    else
    {
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

    const result = await database.query("INSERT INTO user_table (user_name, user_email, user_password) VALUES (?,?,?)", [username,useremail,password])
    if(result)
    {
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
    try 
    {
        const results = await database.query("SELECT * FROM user_table");   
        res.status(200).send(results);
    } 
    catch (error)
    {
        console.log(error);
        res.status(500).send("Error occurred");
    }
});

module.exports = router;