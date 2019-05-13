const connection = require("../helpers/db");
const bcrypt = require("../middlewares/bcryptPassword");
const passport = require("passport");
const jwt = require("jsonwebtoken");
/**
 * Class Pages Controller
 */
class AuthController {
  /**
   * Page about
   * @param {*} req
   * @param {*} res
   */

  recordUser(req, res, err) {
    let user = req.body;
    user = bcrypt.hashPassword(user, user.password);
    connection.query("INSERT INTO users SET ?", user, (error, result) => {
      if (error) throw error;
    });
    if (err) res.status(500).json({ flash: error.message });
    else res.status(200).json({ flash: "User created !" });
    res.end();
  }

  signin(req, res) {
    passport.authenticate("user", (err, user, info) => {
      if (err) return res.status(500).send(err);
      if (!user)
        return res
          .status(400)
          .json({ message: info.message, toast: info.toast });
      const token = jwt.sign(user.email, "yoursecret");
      return res.json({
        user,
        token,
        message: info.message,
        toast: info.toast
      });
    })(req, res);
  }
}

module.exports = AuthController;
