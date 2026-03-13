const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

app.get("/random", (req, res) => {
  const numero = Math.floor(Math.random() * 100) + 1;
  res.send(numero.toString());
});

app.get("/dado", (req, res) => {
  const numero = Math.floor(Math.random() * 6) + 1;
  res.send(numero.toString());
});

const citacoes = [
{autor:"Albert Einstein", citacao:"A imaginação é mais importante que o conhecimento."},
{autor:"Isaac Newton", citacao:"Se vi mais longe foi por estar sobre ombros de gigantes."}
];

app.get("/citacoes", (req, res) => {
  const random = Math.floor(Math.random() * citacoes.length);
  res.send(citacoes[random]);
});

module.exports = app;