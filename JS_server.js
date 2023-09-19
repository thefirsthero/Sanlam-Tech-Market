//prerequisites
const express = require("express");
const session = require("express-session"); //Used to persist the state of a user. 
const routes = require("./routes");
const path = require("path");
const app = express();

app.set("view engine","ejs") 
//associations for sessions
app.use(express.json())
app.use(express.urlencoded({ extended: true}));
app.use(session(
{ 
    secret: "OhSoConfidential",
    resave: true,
    saveUninitialized: true
}));
//routes handler
app.use("/", routes);
app.use(express.static(path.join(__dirname, "public")));

//port listener
app.listen(4500, () => {
    console.log("Server running on port 4500")
});
