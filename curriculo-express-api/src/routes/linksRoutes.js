const express = require("express");

const {
  listarLinks,
  buscarLinkPorId,
  criarLink,
  atualizarLink,
  deletarLink,
} = require("../controllers/linksController");

const router = express.Router();

router.get("/", listarLinks);
router.get("/:id", buscarLinkPorId);
router.post("/", criarLink);
router.put("/:id", atualizarLink);
router.delete("/:id", deletarLink);

module.exports = router;