const connection = require("../helpers/db");
const passport = require("passport");
const jwt = require("jsonwebtoken");
/**
 * Class Pages Controller
 */
class ApiController {
  /**
   *
   * @param {*} req
   * @param {*} res
   */

  loading(req, res, err) {
    connection.query("SELECT * FROM restaurants LIMIT 150", function(
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

  getFavorites(req, res, err) {
    const id_user = req.params.id_user;
    console.log(id_user);
    connection.query(
      `SELECT restaurant_id FROM favorites WHERE user_id = ${id_user}`,
      function(error, result) {
        if (err) {
          res.status(500).json({ flash: error.message });
        } else {
          res.send(result);
        }
      }
    );
  }
  recordFavorites(req, res, err) {
    // let user = req.body;
    // const { id } = user;
    const { userId, restaurantId } = req.body;

    connection.query(
      `INSERT INTO favorites (user_id, restaurant_id) VALUES (${userId},${restaurantId})`,
      error => {
        if (error) throw error;
      }
    );
    if (err) res.status(500).send({ flash: error.message });
    else res.status(200).send({ flash: "User created !" });
    res.end();

    // console.log(req.params.id_restaurant);
    // const id_restaurant = parseInt(req.params.id_restaurant);
    // const id_user = 54;
    // connection.query(
    //   "INSERT INTO favorites SET ?",
    //   { id_user: id_user, id_restaurant: id_restaurant },
    //   function(error, result) {
    //     if (error) throw error;
    //   }
    // );
    // if (err) res.status(500).json({ flash: error.message });
    // else res.status(200).json({ flash: "Database created !" });
    // res.end();
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
    connection.query(
      "INSERT INTO restaurants (name,address1,address2,area,city,mainCategory,secondaryCategory,editorial_rating,description,annotation,owner_annotation,to_website,image_url,latitude,longitude) VALUES ?",
      [restoo],
      function(error, res) {
        console.log(error);
        if (error) throw error;
      }
    );

    if (err) res.status(500).json({ flash: error.message });
    else res.status(200).json({ flash: "Database created !" });
    res.end();
  }
}

module.exports = ApiController;
