import { Router } from "express";
import tarefaController from "../controllers/tarefaController.js";

const router = Router();

router.post("/", tarefaController.criarTarefa);
router.get("/", tarefaController.listarTarefas);
router.get("/:objectId", tarefaController.buscarTarefaPorObjectId);
router.put("/:objectId", tarefaController.atualizarTarefa);
router.delete("/:objectId", tarefaController.removerTarefa);

export default router;