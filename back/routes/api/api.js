const express = require("express");
const router = express.Router();

/**
 * Routing for Pages
 */
const ApiController = require("../../controllers/ApiController");
const controller = new ApiController();

router.get("/restaurants", (req, res) => controller.loading(req, res));
router.post("/record", (req, res) => controller.record(req, res));
router.post("/favorites/:id_restaurant", (req, res) =>
  controller.recordFavorites(req, res)
);
router.get("/favorites/:id_user", (req, res) =>
  controller.getFavorites(req, res)
);

module.exports = router;
