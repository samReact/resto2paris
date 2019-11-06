const connection = require("../helpers/db");
const bcrypt = require("../middlewares/bcryptPassword");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Users = require("../models/Users");
/**
 * Class Pages Controller
 */
class AuthController {
  /**
   * Page about
   * @param {*} req
   * @param {*} res
   */

  async signUp(req, res, next) {
    let user = req.body;
    user = bcrypt.hashPassword(user, user.password);
    try {
      await Users.create(user);
      res.status(201).json({
        message: "Votre compte a été crée avec succès !",
        toast: "success",
      });
    } catch (error) {
      return next(error);
    }
  }

  signin(req, res) {
    passport.authenticate("user", (err, user, info) => {
      if (err) return res.status(500).send(err);
      if (!user)
        return res
          .status(400)
          .json({ message: info.message, toast: info.toast });
      const token = jwt.sign(user.email, "yoursecret");
      return res.send({
        user,
        token,
        message: info.message,
        toast: info.toast,
      });
    })(req, res);
  }

  signout(req, res, err) {
    if (err) {
      return next(error);
    } else {
      req.logout();
      res.send({ user: null });
    }
  }
}

module.exports = AuthController;
