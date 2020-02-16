var User = require("../models/userModel");
var OTP = require("../models/otpModel");
var Contact = require("../models/contactModel");
var nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.uploadInitialBodyPhotos = (req, res) => {
  console.log(req.body.type); // JSON Object
  UpdateInitPhotos(req, res);
  console.log(req.file.filename); // JSON Object
  // res.json({ sucesss: true });
};
const UpdateInitPhotos = (req, res) => {
  var updatePic =
    req.body.type === "front"
      ? { initialFrontPhoto: req.file.filename }
      : { initialSidePhoto: req.file.filename };
  User.findOneAndUpdate(
    { _id: "5e0dc0fe8dc0df41f86c3566" },
    updatePic,
    function(err, data) {
      if (err) {
        console.log(err);
      } else {
        res.json({ success: true });
        console.log("data inserted", data);
      }
    }
  );
};

exports.signup = (req, res) => {
  console.log("Body=", req.body);
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      req.body.password = hash;
      var user = new User(req.body);
      user.save((err, data) => {
        if (err) {
          if (err.code === 11000) {
            res.json({
              success: false,
              exist: true,
              msg: "Email already registered"
            });
          } else {
            res.json({ success: false, msg: "ٰsome kind of error error" });
            console.log(err);
          }
        } else {
          console.log(data);
          res.json({ success: true, msg: "signup successfull" });
        }
      });
    });
  });
};
exports.sendOTP = (req, res) => {
  console.log(req.query);
  // res.send({success:true})
  User.find({ email: req.query.email }).exec(function(err, array) {
    if (err) {
      console.log(err);
      res.json({ success: false, user: false });
    } else {
      // console.log(array);
      if (array.length === 0) {
        res.json({ success: true, user: false });
      } else {
        const OTC = Math.floor(Math.random() * 1000000);
        OTP.findOne({ email: req.query.email }).exec(function(err, data) {
          if (err) {
            console.log(err);
          } else {
            var transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "Put Your gmail Address Here",
                pass: "Put Gmail Password Here"
              }
            });

            var mailOptions = {
              from: "Put Your gmail Address Here",
              to: req.query.email,
              subject: `Use ${OTC} to reset your password`,
              text: `Your password reset code is ${OTC}`
            };

            transporter.sendMail(mailOptions, function(error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
                if (data === null) {
                  const newotp = { otp: OTC, email: req.query.email };
                  const newOTP = new OTP(newotp);
                  newOTP.save(function(err, data) {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log(data);
                      res.json({ success: true, user: true });
                    }
                  });
                } else {
                  OTP.findOneAndUpdate(
                    { email: req.query.email },
                    { otp: OTC },
                    function(err, data) {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log(data);
                        res.json({ success: true, user: true });
                      }
                    }
                  );
                }
              }
            });

            // console.log(data);
          }
        });
      }
    }
  });
};
exports.confirmOTP = (req, res) => {
  OTP.findOne(req.query).exec(function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      if (data === null) {
        res.json({ success: true, match: false });
      } else {
        res.json({ success: true, match: true });
      }
    }
  });
};
exports.resetPass = (req, res) => {
  User.findOneAndUpdate({ email: req.query.email }, req.query, function(
    err,
    data
  ) {
    if (err) {
      console.log(err);
    } else {
      res.json({ success: true });
    }
  });
};
exports.contact = (req, res) => {
  const contact = new Contact(req.query);
  contact.save(function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json({ success: true });
    }
  });
};
exports.logout = (req, res) => {
  req.logout();
  res.send({ success: true });
};
