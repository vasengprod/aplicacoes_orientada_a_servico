const express = require("express");

const {
  listarPessoas,
  buscarPessoaPorId,
  criarPessoa,
  atualizarPessoa,
  deletarPessoa,
} = require("../controllers/pessoasController");

const router = express.Router();

router.get("/", listarPessoas);
router.get("/:id", buscarPessoaPorId);
router.post("/", criarPessoa);
router.put("/:id", atualizarPessoa);
router.delete("/:id", deletarPessoa);

module.exports = router;