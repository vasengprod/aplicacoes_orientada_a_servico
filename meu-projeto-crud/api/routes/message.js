import { Router } from "express";

const router = Router();

// GET ALL
router.get("/", async (req, res) => {
  try {
    const messages = await req.context.models.Message.findAll();
    res.json(messages);
  } catch {
    res.status(500).json({ error: "Erro ao buscar mensagens" });
  }
});

// GET ONE
router.get("/:messageId", async (req, res) => {
  try {
    const message = await req.context.models.Message.findByPk(
      req.params.messageId
    );
    res.json(message);
  } catch {
    res.status(500).json({ error: "Erro ao buscar mensagem" });
  }
});

// CREATE
router.post("/", async (req, res) => {
  try {
    const { text, userId } = req.body;

    const message = await req.context.models.Message.create({
      text,
      UserId: userId,
    });

    res.status(201).json(message);
  } catch {
    res.status(500).json({ error: "Erro ao criar mensagem" });
  }
});

// DELETE
router.delete("/:messageId", async (req, res) => {
  try {
    await req.context.models.Message.destroy({
      where: { id: req.params.messageId },
    });

    res.json({ message: "Mensagem deletada" });
  } catch {
    res.status(500).json({ error: "Erro ao deletar mensagem" });
  }
});

export default router;