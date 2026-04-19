import { Router } from "express";

const router = Router();

// GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const users = await req.context.models.User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET USER BY ID
router.get("/:userId", async (req, res) => {
  try {
    const user = await req.context.models.User.findByPk(req.params.userId);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ error: error.message });
  }
});

// CREATE USER
router.post("/", async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res
        .status(400)
        .json({ error: "username e email são obrigatórios" });
    }

    const user = await req.context.models.User.create({
      username,
      email,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: error.message });
  }
});

// UPDATE USER
router.put("/:userId", async (req, res) => {
  try {
    const { username, email } = req.body;

    const [updated] = await req.context.models.User.update(
      { username, email },
      {
        where: { id: req.params.userId },
      }
    );

    if (!updated) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json({ message: "Usuário atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE USER
router.delete("/:userId", async (req, res) => {
  try {
    const deleted = await req.context.models.User.destroy({
      where: { id: req.params.userId },
    });

    if (!deleted) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;