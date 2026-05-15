const express = require("express");

const {
  login,
  getSession,
  logout,
  refresh,
} = require("../controllers/sessionController");

const router = express.Router();

router.post("/", login);
router.get("/", getSession);
router.delete("/", logout);
router.post("/refresh", refresh);

module.exports = router;