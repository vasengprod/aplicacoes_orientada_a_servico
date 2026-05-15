const pool = require("../config/db");

async function listarPessoas(req, res) {
  try {
    const result = await pool.query("SELECT * FROM pessoas ORDER BY id ASC");
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao listar pessoas", detalhe: error.message });
  }
}

async function buscarPessoaPorId(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM pessoas WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "Pessoa não encontrada" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao buscar pessoa", detalhe: error.message });
  }
}

async function criarPessoa(req, res) {
  try {
    const { nome, slug, cargo, resumo, email, cidade, estado, pais } = req.body;

    const result = await pool.query(
      `INSERT INTO pessoas 
      (nome, slug, cargo, resumo, email, cidade, estado, pais)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [nome, slug, cargo, resumo, email, cidade, estado, pais]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao criar pessoa", detalhe: error.message });
  }
}

async function atualizarPessoa(req, res) {
  try {
    const { id } = req.params;
    const { nome, slug, cargo, resumo, email, cidade, estado, pais } = req.body;

    const result = await pool.query(
      `UPDATE pessoas
      SET nome = $1,
          slug = $2,
          cargo = $3,
          resumo = $4,
          email = $5,
          cidade = $6,
          estado = $7,
          pais = $8
      WHERE id = $9
      RETURNING *`,
      [nome, slug, cargo, resumo, email, cidade, estado, pais, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "Pessoa não encontrada" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao atualizar pessoa", detalhe: error.message });
  }
}

async function deletarPessoa(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query("DELETE FROM pessoas WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "Pessoa não encontrada" });
    }

    return res.json({ mensagem: "Pessoa deletada com sucesso", pessoa: result.rows[0] });
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao deletar pessoa", detalhe: error.message });
  }
}

module.exports = {
  listarPessoas,
  buscarPessoaPorId,
  criarPessoa,
  atualizarPessoa,
  deletarPessoa,
};