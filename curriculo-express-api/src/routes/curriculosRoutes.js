const express = require("express");

const {
  buscarCurriculoPorSlug,
} = require("../controllers/curriculosController");

const router = express.Router();

router.get("/:slug", buscarCurriculoPorSlug);

module.exports = router;