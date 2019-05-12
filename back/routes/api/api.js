const express = require("express");
const router = express.Router();
const passport = require("passport");

/**
 * Routing for Pages
 */
const ApiController = require("../../controllers/ApiController");
const controller = new ApiController();

router.get("/restaurants", (req, res) => controller.loading(req, res));
router.post("/record", (req, res) => controller.record(req, res));
// router.post("/favorites/:id_restaurant", (req, res) =>
//   controller.recordFavorites(req, res)
// );
// router.get("/favorites/:id_user", (req, res) =>
//   controller.getFavorites(req, res)
// );

// router.post(
//   "/favorites/:id_user",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     controller.recordFavorites(req, res);
//   }
// );

router.post("/getFavorites/:id_user", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(401);
    }
    if (!user) {
      // return res.json("not connected");
      return res.send({
        message: "not connected",
        user: user
      });
    }
    controller.getFavorites(req, res);
  })(req, res, next);
});

router.post("/favorites/:id_user", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(401);
    }
    if (!user) {
      // return res.json("not connected");
      return res.send({
        message: "Something is not right",
        user: user
      });
    }
    controller.recordFavorites(req, res);
  })(req, res, next);
});

module.exports = router;
