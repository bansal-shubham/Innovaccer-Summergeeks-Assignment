//Require all the required packages
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
var nodemailer = require("nodemailer");
var unirest = require("unirest");
//Global Variables
var find1, address, type = -1, message = "";
//Connect to Innovaccer database using mongoose 
mongoose.connect("mongodb://localhost/innovaccer", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

//Nodemailer transporter function
var transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  port: 25,
  auth: {
    user: 'enter your email id',
    pass: 'password'
  }, tls: {
    rejectUnauthorized: false
  }
});

//Database Schema 
var userSchema = new mongoose.Schema({
  vname: String,
  vphone: Number,
  vemail: String,
  hname: String,
  hphone: Number,
  hemail: String,
  intime: String,
  outtime: String
});

//Create model of userschema
var data = mongoose.model("data", userSchema);

//Get route to render landing page
app.get("/", function (req, res) {
  data.find({}, function (err, found) {
    if (err)
      console.log(err);
    else {
      foundData = found;
    }
  });
  var x = type, xx = message;
  type = -1;
  message = "";
  res.render("page", { types: x, messages: xx });
});

app.get("/checkin", function (req, res) {
  res.render("checkin");
});

app.get("/checkout", function (req, res) {
  res.render("checkout");
});

//Post route to handle check-in form details
app.post("/", function (req, res) {
  var vname = req.body.vname;
  var vphone = req.body.vphone;
  var vemail = req.body.vemail;
  var hname = req.body.hname;
  var hphone = req.body.hphone;
  var hemail = req.body.hemail;
  var temp = new Date();
  var intime = temp.getHours() + ":" + temp.getMinutes() + ":" + temp.getSeconds();
  var obj = { vname: vname, vphone: vphone, vemail: vemail, hname: hname, hphone: hphone, hemail: hemail, intime: intime };
  find1 = obj;
  var content = find1.vname + " just checked in." + "\n" + "Visitor Details:" + "\n" + "Phone Number: " + find1.vphone + "\n" + "E-mail: " + find1.vemail + "\n" + "Check In Time:" + find1.intime;

  //Check if user already present in database
  data.find({ "vemail": vemail, "outtime": null }, function (err, found) {
    if (found.length === 0) {

      //Storing value in database

      data.create(obj, function (err, found) {
        console.log(found);
        if (err)
          console.log(err);
        else {
          var mailOptions = {
            from: 'Enter your email id',
            to: find1.hemail,
            subject: 'Mail from a Guest',
            text: content
          };

          //mail sent to host
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

          var req = unirest("POST", "https://www.fast2sms.com/dev/bulk");

          //sms sent to host

          req.headers({
            "authorization": "Enter authorization key"
          });

          req.form({
            "sender_id": "FSTSMS",
            "message": content,
            "language": "english",
            "route": "p",
            "numbers": find1.hphone,
          });

          req.end(function (res) {
            if (res.error) {
              console.log(res.body);
              res.redirect('/');
            }
          });

        }
      });

      type = 1;
      message = find1.vname + " Checked In Successfully";
      res.redirect("/");

    }

    else if (found.length == 1) {
      console.log("User already Checked-in");
      type = 2;
      message = 'User already checked-in';
      res.redirect('/');
    }
    else {
      console.log("Database has multiple entries");
      type = 2;
      message = 'User already checked-in';
      res.redirect('/');
    }
  });
});

//Post route to handle check-out form details

app.post("/checkout", function (req, res) {

  var time = new Date();
  var now = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
  var mail = req.body.mail;
  console.log(mail);

  //Check if user already present in database
  data.find({ vemail: String(mail), outtime: null || undefined }, function (err, got) {
    console.log(got);
    console.log(err);
    if (got.length == 1) {

      //adding timestamp for checkout
      data.findOneAndUpdate({ vemail: mail, intime: got[got.length - 1].intime }, { outtime: now }, function () {
        console.log("Checkout Time added !!");
        address = req.body.address;

        var mailOptions = {
          from: 'Enter your email id',
          to: got[got.length - 1].vemail,
          subject: 'Details',
          text: "Thanks for your visit!" + "\n" + "Name: " + got[got.length - 1].vname + "\n" + "Email: " + got[got.length - 1].vemail + "\n" + "Phone no.: " + got[got.length - 1].vphone + "\n" + "Check-in time: " + got[got.length - 1].intime + "\n" + "Check-out time: " + now + "\n" + "Host name:  " + got[got.length - 1].hname + "\n" + "Address: " + address
        };

        ////mail sent to visitor
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      });
      type = 1;
      message = "Checked Out Successfully";
      res.redirect('/');
    }
    else if (got.length == 0) {
      console.log("Cannot Checkout");
      type = 2;
      message = 'User has not checked in yet';
      res.redirect('/');
    }
    else {
      console.log("Checkin is having multiple entries");
      res.redirect('/');
    }
  });
});

// Server listening at port 3500
app.listen(3500, function () {
  console.log("server has started");
});