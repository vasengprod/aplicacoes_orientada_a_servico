const express = require("express");

const {
  listarProfissionais,
  buscarProfissionalPorId,
  criarProfissional,
  atualizarProfissional,
  deletarProfissional,
} = require("../controllers/profissionaisController");

const router = express.Router();

router.get("/", listarProfissionais);
router.get("/:id", buscarProfissionalPorId);
router.post("/", criarProfissional);
router.put("/:id", atualizarProfissional);
router.delete("/:id", deletarProfissional);

module.exports = router;