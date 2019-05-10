const connection = require("../helpers/db");
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
    connection.query("SELECT * FROM restaurants LIMIT 50", function(
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
    connection.query(`SELECT * FROM favorites`, function(error, result) {
      if (err) {
        res.status(500).json({ flash: error.message });
      } else {
        res.send(result);
      }
    });
  }
  recordFavorites(req, res, err) {
    console.log(req.params.id_restaurant);
    const id_restaurant = parseInt(req.params.id_restaurant);
    const id_user = 54;
    connection.query(
      "INSERT INTO favorites SET ?",
      { id_user: id_user, id_restaurant: id_restaurant },
      function(error, result) {
        if (error) throw error;
      }
    );
    if (err) res.status(500).json({ flash: error.message });
    else res.status(200).json({ flash: "Database created !" });
    res.end();
  }

  record(req, res, err) {
    const resto = req.body;
    let restoo = resto.map(e => [
      e.name,
      e.address,
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
      "INSERT INTO restaurants (name, address, area,city,mainCategory,secondaryCategory,editorial_rating,description,annotation,owner_annotation,to_website,image_url,latitude,longitude) VALUES ?",
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
