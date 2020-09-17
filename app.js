require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const nodemailer = require('nodemailer');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();
const dirPath = path.join(__dirname, "public/pdfs");
const files = fs.readdirSync(dirPath).map(name => {
    return {
      name: path.basename(name, ".pdf"),
      url: `/pdfs/${name}`
    };
  });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(
    express.static("public", {
      setHeaders: (res, filepath) =>
        res.attachment(`pdf-express-${path.basename(filepath)}`)
    })
  );

//Home route
app.get("/", (req, res) => {
    res.render("home", {msg: " "});
});
//Home post route with feedback NodeMailer package
app.post("/", (req, res) => {
    const output = `
    <p>You have a Feedback</p>
    <h1>Feedback</h1>
    <p style="font-size: large;"> ${req.body.data}</p>
    `;
    //Create Transport 
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        // logger: true,
        // debug: true,
        ignoreTLS: true,
        auth: {
            user: 'katrathu.kanitham8@gmail.com',
            pass: process.env.PASSKEY
        }
    });
    //Building Email message
    const mailOptions = {
        from: '"Feedback from Katradhu Kanitham" <manumadhu4641@gmail.com>', // sender address
        to: "katrathu.kanitham8@gmail.com", // list of receivers
        subject: "Feedback", // Subject line
        text: "Hello world?", // plain text body
        html: output, // html body
    };

    transporter.sendMail(mailOptions, (error, data) => {
        if(error)
        console.log("Error" + error);
        else{
            console.log("Email Sent");
        }
        res.render('home', {msg: "Feedback Sent ;-)"});
    });    
});
//Chapters List get route
app.get("/chapters", (req, res) => {
    res.render("chapters");
});
//redirect indi_chapter get route
app.get("/chapters/chapter1", (req, res) => {
    res.render("chapters/chapter1");
});
app.get("/chapters/chapter2", (req, res) => {
    res.sendFile(__dirname + "/views/error.html");
});
app.get("/chapters/chapter3", (req, res) => {
    res.sendFile(__dirname + "/views/error.html");
});
app.get("/chapters/chapter4", (req, res) => {
    res.sendFile(__dirname + "/views/error.html");
});
app.get("/chapters/chapter5", (req, res) => {
    res.sendFile(__dirname + "/views/error.html");
});
app.get("/chapters/chapter6", (req, res) => {
    res.sendFile(__dirname + "/views/error.html");
});
app.get("/chapters/chapter7", (req, res) => {
    res.sendFile(__dirname + "/views/error.html");
});
app.get("/chapters/chapter8", (req, res) => {
    res.sendFile(__dirname + "/views/error.html");
});
//about Route
app.get("/about", (req, res) => {
    res.render("about");
});
//Contact Route
app.get("/contact", (req, res) => {
    res.render("contact");
});
//Syllabus route _Temporarily  Hidden
app.get("/syllabus", (req, res) => {
    res.render("syllabus", { files });
    
});
//chapters wise specific exercise route(chapter 1)
app.get("/chapter1/exercise1.1", (req, res) => {
    res.render(__dirname + "/views/chapters/chapter1/exercise1.1.ejs");
});
app.get("/chapter1/exercise1.2", (req, res) => {
    res.render(__dirname + "/views/chapters/chapter1/exercise1.2.ejs");
});

app.get("/chapter1/exercise1.3", (req, res) => {
    res.render(__dirname + "/views/chapters/chapter1/exercise1.3.ejs");
});

app.get("/chapter1/exercise1.4", (req, res) => {
    res.render(__dirname + "/views/chapters/chapter1/exercise1.4.ejs");
});

app.get("/chapter1/exercise1.5", (req, res) => {
    res.render(__dirname + "/views/chapters/chapter1/exercise1.5.ejs")
});
//Server creation 
app.listen(port, (req, res) => {
    console.log("Server started at port 3000 successfully");
});