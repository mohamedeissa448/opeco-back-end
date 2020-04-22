var createError = require("http-errors");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/usersRoute");
var homeRouter = require("./routes/homeRouter");
var AboutUsRouter = require("./routes/aboutUsRouter");
var ServicesRouter = require("./routes/servicesRouter");
var projectsRouter = require("./routes/projectsRouter");
var contactRouter = require("./routes/contactRouter");

const passport = require("passport");
const authenticate = require("./authenticate");

var app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

var mongoose = require("mongoose");
mongoose //"mongodb://localhost:27017/opeco"
  .connect("mongodb://localhost:27017/opeco", {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("connected to DB");
  })
  .catch(() => {
    console.log("not connected to DB");
  });
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());
app.use("/", indexRouter);
app.use("/admin/users", usersRouter);
app.use("/admin/home", authenticate.verifyUser, homeRouter);
app.use("/admin/about-us", authenticate.verifyUser, AboutUsRouter);
app.use("/admin/services", authenticate.verifyUser, ServicesRouter);
app.use("/admin/projects", authenticate.verifyUser, projectsRouter);
app.use("/admin/contact", authenticate.verifyUser, contactRouter);

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
  console.log("errrrror", err);
});

module.exports = app;
