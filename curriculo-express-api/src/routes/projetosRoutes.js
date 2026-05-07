const express = require("express");

const {
  listarProjetos,
  buscarProjetoPorId,
  criarProjeto,
  atualizarProjeto,
  deletarProjeto,
} = require("../controllers/projetosController");

const router = express.Router();

router.get("/", listarProjetos);
router.get("/:id", buscarProjetoPorId);
router.post("/", criarProjeto);
router.put("/:id", atualizarProjeto);
router.delete("/:id", deletarProjeto);

module.exports = router;