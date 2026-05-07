const express = require("express");

const {
  listarAcademicas,
  buscarAcademicaPorId,
  criarAcademica,
  atualizarAcademica,
  deletarAcademica,
} = require("../controllers/academicasController");

const router = express.Router();

router.get("/", listarAcademicas);
router.get("/:id", buscarAcademicaPorId);
router.post("/", criarAcademica);
router.put("/:id", atualizarAcademica);
router.delete("/:id", deletarAcademica);

module.exports = router;