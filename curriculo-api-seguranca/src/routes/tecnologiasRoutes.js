const express = require("express");

const {
  listarTecnologias,
  buscarTecnologiaPorId,
  criarTecnologia,
  atualizarTecnologia,
  deletarTecnologia,
} = require("../controllers/tecnologiasController");

const router = express.Router();

router.get("/", listarTecnologias);
router.get("/:id", buscarTecnologiaPorId);
router.post("/", criarTecnologia);
router.put("/:id", atualizarTecnologia);
router.delete("/:id", deletarTecnologia);

module.exports = router;