var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");
var auth = require("../controllers/authController");
var passport = require("passport");

router.post("/login", passport.authenticate("local"), auth.auth);
router.get("/authenticate", auth.authenticate);
router.post("/signup", userController.signup);
router.get("/send_otp", userController.sendOTP);
router.get("/confirm_otp", userController.confirmOTP);
router.get("/reset_pass", userController.resetPass);
router.get("/contact_us", userController.resetPass);
router.get("/logout", userController.logout);

module.exports = router;
