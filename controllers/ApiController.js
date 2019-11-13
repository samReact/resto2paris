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
