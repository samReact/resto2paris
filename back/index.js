const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const port = process.env.PORT || 5000;
const colors = require("colors/safe");
const passport = require("passport");
require("./middlewares/passport"); //New Strategy local for check user with passport
require("./middlewares/jwtstrategie");

app.use(express.static(__dirname + "/public")); // all statics files in /public
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(
  // donnée en get post non encodé par l'URL
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// Initialize passport
app.use(passport.initialize());
// app.use(passport.session());

/**
 * routing
 */

const authRouter = require("./routes/auth/auth");
const apiRouter = require("./routes/api/api");

app.use("/auth", authRouter);
app.use("/api", apiRouter);

/**
 * 404 Page
 */
app.use((req, res) => {
  res.status(404);
  res.render("errors/404");
});

// Handle 500
app.use((error, req, res, next) => {
  res.status(500);
  console.error(colors.bold.red.underline(error.stack));
  res.render("errors/500", {
    message: error.message,
    stack: error.stack,
    error: error
  });
});

/*********************************************************************************************************************************************
 * *************************************************************************
 * *************************************************************************
 *  Running Server
 * *************************************************************************
 * *************************************************************************
 ******************************************************************************************************************************************/

app.listen(port, err => {
  console.clear();
  if (!err) console.log(colors.rainbow("Site is live... Go ahead"));
  else console.log(colors.rainbow(err));
  console.log("🤓");
});
