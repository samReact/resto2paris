const sequelize = require("../helpers/db");
const Sequelize = require("sequelize");

const Restaurants = sequelize.define("restaurants", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  address1: {
    type: Sequelize.STRING
  },
  address2: {
    type: Sequelize.STRING
  },
  area: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  mainCategory: {
    type: Sequelize.STRING
  },
  secondaryCategory: {
    type: Sequelize.STRING
  },
  editorial_rating: {
    type: Sequelize.TINYINT
  },
  description: {
    type: Sequelize.TEXT
  },
  annotation: {
    type: Sequelize.TEXT
  },
  owner_annotation: {
    type: Sequelize.TEXT
  },
  to_website: {
    type: Sequelize.TEXT
  },
  image_url: {
    type: Sequelize.TEXT
  },
  latitude: {
    type: Sequelize.FLOAT
  },
  longitude: {
    type: Sequelize.FLOAT
  }
});

module.exports = Restaurants;
