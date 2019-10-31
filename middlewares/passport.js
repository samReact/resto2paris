const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connection = require("../helpers/db");
const { comparePassword } = require("./bcryptPassword");
const Users = require("../models/Users");

passport.use(
  "user",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (username, password, cb) => {
      try {
        const user = await Users.findOne({ where: { email: username } });
        if (user) {
          const checkPass = comparePassword(password, user.password);
          checkPass.then(check => {
            check
              ? cb(null, user, {
                  message: `Bienvenue ${user.name}`,
                  toast: "success",
                })
              : cb(null, false, {
                  message: "Mot de passe invalide",
                  toast: "error",
                });
          });
        } else {
          return cb(null, false, {
            message: "Incorrect email !",
            toast: "error",
          });
        }
      } catch (error) {
        return cb(error);
      }
    },
  ),
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    cb(err, user);
  });
});
