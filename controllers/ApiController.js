const connection = require("../helpers/db");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Restaurants = require("../models/Restaurants");
const Favorites = require("../models/Favorites");
/**
 * Class Pages Controller
 */
class ApiController {
  /**
   *
   * @param {*} req
   * @param {*} res
   */

  recordAllRestaurants(req, res, err) {
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
      "INSERT INTO restaurants (name, address1, address2, area,city,mainCategory,secondaryCategory,editorial_rating,description,annotation,owner_annotation,to_website,image_url,latitude,longitude) VALUES ?",
      [restoo],
      function(error, res) {
        if (error) throw error;
      }
    );

    if (err) res.status(500).json({ flash: error.message });
    else res.status(201).json({ flash: "Restaurants inserted !" });
    res.end();
  }

  async getAllRestaurants(req, res, err) {
    try {
      const restaurants = await Restaurants.findAll({ limit: 50 });
      res.status(200).send(restaurants);
    } catch (err) {
      res.status(500).json({ flash: err.message });
    }
  }

  async getFavorites(req, res, err) {
    const id_user = req.params.id_user;
    try {
      const favorites = await Favorites.findAll({
        where: { user_id: id_user }
      });
      res.status(200).send(favorites);
    } catch (err) {
      res.status(500).json({ flash: err.message });
    }
  }

  async recordFavorite(req, res, err) {
    const { userId, restaurantId } = req.body;
    try {
      Favorites.create({ user_id: userId, restaurant_id: restaurantId });
      res.status(201).send({ flash: "Ajouté aux favoris !" });
    } catch (err) {
      res.status(500).json({ flash: err.message });
    }
  }

  removeFavorite(req, res, err) {
    const { userId, restaurantId } = req.body;
    try {
      Favorites.destroy({
        where: { user_id: userId, restaurant_id: restaurantId }
      });
      res.status(200).send({ flash: "Favorite removed !" });
    } catch (err) {
      res.status(500).json({ flash: err.message });
    }
  }
}

module.exports = ApiController;
