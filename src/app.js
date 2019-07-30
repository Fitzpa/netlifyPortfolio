var express = require("express");
var bodyParser = require("body-parser");
var exhbs = require("express-handlebars");
var path = require("path");
var nodemailer = require("nodemailer");

var app = express();

// View Engine Setup
app.engine("handlebars", exhbs());
app.set("view engine", "handlebars");

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.render("louie");
});

app.post("/send", function(req, res) {
  var output =
    "<p>You have a new contact request</p><h3>Contact Detais</h3><br><ul><li>Name: ${req.body.name}</li><li>Email: ${req.body.email}</li><li>File: ${req.body.myFile}</li></ul><h3>Message</h3><p>${req.body.message}</p>";

  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: "fitz4492@gmail.com",
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: "1/0WwvQS-e6ATZTpvDwhKJJWYVUUfHNLx45RvsCl1m9S8",
      accessToken: "ya29.GltVBwgqOglLef-NIuMxdNLbqp-T9vTtgqKRsm4AC7VeA1NuJu-6_x6R_7Noiqlx5-4Ah14Y4PaTJ4GHS3eY6_9nkHphHFGMyMuGGvvQ3Yf1ULU47NIIV9oADPkj"
    }
  });

  // send mail with defined transport object
  var mailOptions = {
    from: '"Louie Fitzpatrick" <fitz4492@gmail.com>', // sender address
    to: "fitz4492@gmail.com",
    subject: "Developer Work", // Subject line
    text: "Hello world?", // plain text body
    html: output
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.render("louie", { msg: "Email has been sent..." });
  });
});

var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log("server started on port " + PORT);
});
