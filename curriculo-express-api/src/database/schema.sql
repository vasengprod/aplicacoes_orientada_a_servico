DROP TABLE IF EXISTS links;
DROP TABLE IF EXISTS tecnologias;
DROP TABLE IF EXISTS projetos;
DROP TABLE IF EXISTS experiencias_profissionais;
DROP TABLE IF EXISTS experiencias_academicas;
DROP TABLE IF EXISTS pessoas;

CREATE TABLE pessoas (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  slug VARCHAR(120) UNIQUE NOT NULL,
  cargo VARCHAR(180) NOT NULL,
  resumo TEXT,
  email VARCHAR(180),
  cidade VARCHAR(120),
  estado VARCHAR(120),
  pais VARCHAR(120),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE experiencias_academicas (
  id SERIAL PRIMARY KEY,
  pessoa_id INTEGER NOT NULL REFERENCES pessoas(id) ON DELETE CASCADE,
  curso VARCHAR(180) NOT NULL,
  instituicao VARCHAR(180) NOT NULL,
  periodo VARCHAR(80),
  status VARCHAR(80),
  descricao TEXT
);

CREATE TABLE experiencias_profissionais (
  id SERIAL PRIMARY KEY,
  pessoa_id INTEGER NOT NULL REFERENCES pessoas(id) ON DELETE CASCADE,
  cargo VARCHAR(180) NOT NULL,
  empresa VARCHAR(180) NOT NULL,
  periodo VARCHAR(80),
  descricao TEXT,
  impacto TEXT
);

CREATE TABLE projetos (
  id SERIAL PRIMARY KEY,
  pessoa_id INTEGER NOT NULL REFERENCES pessoas(id) ON DELETE CASCADE,
  nome VARCHAR(180) NOT NULL,
  descricao TEXT,
  tecnologia VARCHAR(120),
  url TEXT
);

CREATE TABLE tecnologias (
  id SERIAL PRIMARY KEY,
  pessoa_id INTEGER NOT NULL REFERENCES pessoas(id) ON DELETE CASCADE,
  nome VARCHAR(120) NOT NULL,
  categoria VARCHAR(120)
);

CREATE TABLE links (
  id SERIAL PRIMARY KEY,
  pessoa_id INTEGER NOT NULL REFERENCES pessoas(id) ON DELETE CASCADE,
  tipo VARCHAR(80) NOT NULL,
  url TEXT NOT NULL
);