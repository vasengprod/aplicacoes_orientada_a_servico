import "dotenv/config";
import cors from "cors";
import express from "express";

import models, { sequelize } from "./api/models/index.js";
import routes from "./api/routes/index.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Contexto global
app.use((req, res, next) => {
  req.context = {
    models,
  };
  next();
});

// Log de requisições
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Rotas
app.use("/users", routes.user);
app.use("/messages", routes.message);
app.use("/session", routes.session);

// Rota base
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "API rodando 🚀",
  });
});

// Porta
const port = process.env.PORT || 3000;

// Sincronizar banco SEM apagar dados
sequelize
  .sync()
  .then(() => {
    console.log("Banco sincronizado");

    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar com o banco:", error);
  });