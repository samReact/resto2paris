const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const port = process.env.PORT || 5000;
const colors = require("colors/safe");
const passport = require("passport");
const PATH_TO_WEB_APP_BUILD = "client/build";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
require("./middlewares/passport"); //New Strategy local for check user with passport
require("./middlewares/jwtstrategie");

app.use(express.static(path.join(__dirname, PATH_TO_WEB_APP_BUILD)));

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

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

/*********************************************************************************************************************************************
 * *************************************************************************
 * *************************************************************************
 *  Running Server
 * *************************************************************************
 * *************************************************************************
 ******************************************************************************************************************************************/

app.listen(port, err => {
  // console.clear();
  // if (!err) console.log(colors.rainbow("Site is live... Go ahead"));
  // else console.log(colors.rainbow(err));
  // console.log("🤓");
});
