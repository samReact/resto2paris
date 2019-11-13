const Sequelize = require("sequelize");
const sequelize = require("../helpers/db.js");
const Users = require("../models/Users");
const Restaurants = require("../models/Restaurants");

const Favorites = sequelize.define("favorites", {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: Users,
      key: "id"
    }
  },
  restaurant_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: Restaurants,
      key: "id"
    }
  }
});

module.exports = Favorites;
