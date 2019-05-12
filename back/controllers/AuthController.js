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

  loading(req, res, err) {
    connection.query("SELECT * FROM restaurants LIMIT 200", function(
      error,
      result
    ) {
      if (err) {
        res.status(500).json({ flash: error.message });
      } else {
        res.send(result);
      }
    });
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

  record(req, res, err) {
    const resto = req.body;
    let restoo = resto.map(e => [
      e.name,
      e.address1,
      e.address2,
      e.area,
      e.city,
      e.mainCategory,
      e.secondaryCategory,
      e.editorial_rating,
      e.description,
      e.annotation,
      e.owner_annotation,
      e.to_website,
      e.image_url,
      e.latitude,
      e.longitude
    ]);
    console.log(restoo);
    connection.query(
      "INSERT INTO restaurants (name, address1, address2, area,city,mainCategory,secondaryCategory,editorial_rating,description,annotation,owner_annotation,to_website,image_url,latitude,longitude) VALUES ?",
      [restoo],
      function(error, res) {
        if (error) throw error;
      }
    );

    if (err) res.status(500).json({ flash: error.message });
    else res.status(200).json({ flash: "User created !" });
    res.end();
  }
}

module.exports = AuthController;
