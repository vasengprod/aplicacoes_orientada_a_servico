const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("API ligada ⚡");
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
{autor:"Albus Dumbledore", citacao:"A felicidade pode ser encontrada mesmo nas horas mais sombrias, se alguém lembrar de acender a luz."},
{autor:"Albus Dumbledore", citacao:"São as nossas escolhas que revelam quem realmente somos."},
{autor:"Sirius Black", citacao:"Todos temos luz e trevas dentro de nós."},
{autor:"Hermione Granger", citacao:"Livros e inteligência são as armas mais poderosas."},
{autor:"Harry Potter", citacao:"Não são nossas habilidades que mostram quem somos, mas nossas escolhas."}
];

app.get("/citacoes", (req, res) => {
  const random = Math.floor(Math.random() * citacoes.length);
  res.send(citacoes[random]);
});

module.exports = app;