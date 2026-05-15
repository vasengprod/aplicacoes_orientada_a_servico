const express = require("express");
const cors = require("cors");

const pessoasRoutes = require("./routes/pessoasRoutes");
const academicasRoutes = require("./routes/academicasRoutes");
const profissionaisRoutes = require("./routes/profissionaisRoutes");
const projetosRoutes = require("./routes/projetosRoutes");
const tecnologiasRoutes = require("./routes/tecnologiasRoutes");
const linksRoutes = require("./routes/linksRoutes");
const curriculosRoutes = require("./routes/curriculosRoutes");
const sessionRoutes = require("./routes/sessionRoutes");

const authMiddleware = require("./middlewares/authMiddleware");
const protectRoutes = require("./middlewares/protectRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(authMiddleware);
app.use(protectRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "API Currículo Express funcionando",
    status: "online",
    endpoints: {
      pessoas: "/pessoas",
      experienciasAcademicas: "/experiencias-academicas",
      experienciasProfissionais: "/experiencias-profissionais",
      projetos: "/projetos",
      tecnologias: "/tecnologias",
      links: "/links",
      curriculoCompleto: "/curriculos/vinicius-almeida",
      session: "/session",
    },
  });
});

app.use("/session", sessionRoutes);
app.use("/pessoas", pessoasRoutes);
app.use("/experiencias-academicas", academicasRoutes);
app.use("/experiencias-profissionais", profissionaisRoutes);
app.use("/projetos", projetosRoutes);
app.use("/tecnologias", tecnologiasRoutes);
app.use("/links", linksRoutes);
app.use("/curriculos", curriculosRoutes);

module.exports = app;