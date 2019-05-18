const express = require("express");
const router = express.Router();
const passport = require("passport");

/**
 * Routing for Pages
 */
const AuthController = require("../../controllers/AuthController");
const controller = new AuthController();

router.get("/map", (req, res) => controller.loading(req, res));
router.post("/signup", (req, res) => controller.recordUser(req, res));
router.post("/signin", (req, res) => controller.signin(req, res));
router.get("/signout", (req, res) => {
  req.logout();
  res.send({ user: null });
});

module.exports = router;
