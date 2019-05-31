const express = require("express");
const router = express.Router();
const passport = require("passport");
const { check, validationResult } = require("express-validator/check");

const getErrorAsObject = errors =>
  errors.reduce((errorObject, { param, msg }) => {
    errorObject[param] = msg;
    return errorObject;
  }, {});

/**
 * Routing for Pages
 */
const AuthController = require("../../controllers/AuthController");
const controller = new AuthController();

router.get("/map", (req, res) => controller.loading(req, res));
router.post(
  "/signup",
  [
    check("name")
      .not()
      .isEmpty()
      .withMessage("Le champ Prenom est vide"),
    check("lastname")
      .not()
      .isEmpty()
      .withMessage("Le champ Nom est vide"),
    check("email")
      .not()
      .isEmpty()
      .withMessage("Le champ Email est vide"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Le champ Password est vide"),
    check("email")
      .isEmail()
      .withMessage("Le format de l'email est invalide")
  ],
  (req, res, next) => {
    const errors = validationResult(req).array();

    if (errors.length) {
      return res.status(400).send({ errors: getErrorAsObject(errors) });
    } else controller.signUp(req, res, next);
  }
);
router.post("/signin", (req, res) => controller.signin(req, res));
router.get("/signout", (req, res) => controller.signout(req, res));

module.exports = router;
