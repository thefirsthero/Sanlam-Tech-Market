const express = require("express");
const path = require("path");
const router = express.Router();


router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
})
router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
})
router.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "signup.html"));
})
router.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "about.html"));
})
router.get("/resetpass", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "resetpassword.html"));
})

module.exports = router;