const mongoose = require("mongoose");
const validator = require("validator");
const userModel = mongoose.Schema({
  fName: {
    type: String,
    required: false
  },
  lName: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: [true, "user must have the email"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, " you entered email is not valid"]
  },
  password: {
    type: String,
    required: [true, "user must have the password"]
  }
});
module.exports = mongoose.model("User", userModel);
