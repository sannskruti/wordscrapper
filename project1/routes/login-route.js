const {
  login,
  register,
  logout,
  checkWord,
  newGame,
} = require("../controllers/login-controller");

const express = require("express");
const router = express.Router();
router.route("/").get(login);
router.route("/register").post(register);
router.route("/logout").post(logout);
router.route("/guess-word").post(checkWord);
router.route("/newgame").get(newGame);

module.exports = router;
