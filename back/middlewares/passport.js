const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connection = require("../helpers/db");
const { comparePassword } = require("./bcryptPassword");

passport.use(
  "user",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false
    },
    (username, password, cb) => {
      const sql = "SELECT * FROM users WHERE email = ?";
      connection.query(sql, username, (error, user) => {
        if (error) {
          return cb(error);
          // throw error;
        }
        if (!user.length) {
          return cb(null, false, {
            message: "Incorrect email !",
            toast: "error"
          });
        }
        if (user.length) {
          const checkPass = comparePassword(password, user[0].password);
          checkPass.then(check => {
            check
              ? cb(null, user[0], {
                  message: `Bienvenue ${user[0].name}`,
                  toast: "success"
                })
              : cb(null, false, {
                  message: "Mot de passe invalide",
                  toast: "error"
                });
          });
        }
      });
    }
  )
);
