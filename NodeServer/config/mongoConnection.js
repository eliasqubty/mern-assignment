var mongoose = require("mongoose");
// mongoose.set("useCreateIndex", true);

const connectionUrl =
  "mongodb://user1:assignment1@ds219459.mlab.com:19459/assignment";
mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify:false
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "DB connection error:"));
db.once("open", function() {
  console.log("Successfully connected to DB");
});
