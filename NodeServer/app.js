var createError = require("http-errors");
var express = require("express");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var session = require("express-session");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var recordsRouter = require("./routes/records");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const multer = require("multer");
User = require("./models/userModel");

var app = express();
require("./config/mongoConnection");
// view engine setup
var cors = require("cors");
app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

/* GET users listing. */
app.use(
  session({
    secret: "secret-word",
    // cookie:{_expires : 60000000} ,
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(function(username, password, next) {
    User.findOne({ email: username }, (err, data) => {
      if (err) {
        console.log(err);
        next(null, false);
      } else {
        if (data == null) next(null, false);
        else {
          bcrypt.compare(password, data.password).then(function(result) {
            console.log("data", data);
            if (result) {
              next(null, data);
            } else {
              next(null, false);
            }
          });
        }
      }
    });
  })
);
passport.serializeUser(function(user, next) {
  next(null, user.id);
});

passport.deserializeUser(function(id, next) {
  User.findOne({ _id: id }, (err, user) => {
    if (err) console.log(err);
    else {
      if (user == null) console.log(user);
      else next(null, user);
    }
  });
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/records", recordsRouter);

// app.post("/upload", upload.single("avatar"), function(req, res) {
//   console.log(req.files); // JSON Object
//   console.log(req.file.filename); // JSON Object
//   res.json({ sucesss: true });
// });

// app.post("/upload", upload.single(),function(req, res, next) {
//   console.log(req.files);
//   console.log(req.body);
//   if (!req.files) {
//     res.send("File was not found");
//     return;
//   }
//   console.log(req.path);
//   res.json(res.files[0].data);
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// module.exports = passport;
module.exports = app;
