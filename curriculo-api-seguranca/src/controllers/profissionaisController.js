const pool = require("../config/db");

async function listarProfissionais(req, res) {
  try {
    const result = await pool.query(
      "SELECT * FROM experiencias_profissionais ORDER BY id ASC"
    );

    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao listar experiências profissionais",
      detalhe: error.message,
    });
  }
}

async function buscarProfissionalPorId(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM experiencias_profissionais WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "Experiência profissional não encontrada" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao buscar experiência profissional",
      detalhe: error.message,
    });
  }
}

async function criarProfissional(req, res) {
  try {
    const { pessoa_id, cargo, empresa, periodo, descricao, impacto } = req.body;

    const result = await pool.query(
      `INSERT INTO experiencias_profissionais
      (pessoa_id, cargo, empresa, periodo, descricao, impacto)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [pessoa_id, cargo, empresa, periodo, descricao, impacto]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao criar experiência profissional",
      detalhe: error.message,
    });
  }
}

async function atualizarProfissional(req, res) {
  try {
    const { id } = req.params;
    const { pessoa_id, cargo, empresa, periodo, descricao, impacto } = req.body;

    const result = await pool.query(
      `UPDATE experiencias_profissionais
      SET pessoa_id = $1,
          cargo = $2,
          empresa = $3,
          periodo = $4,
          descricao = $5,
          impacto = $6
      WHERE id = $7
      RETURNING *`,
      [pessoa_id, cargo, empresa, periodo, descricao, impacto, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "Experiência profissional não encontrada" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao atualizar experiência profissional",
      detalhe: error.message,
    });
  }
}

async function deletarProfissional(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM experiencias_profissionais WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "Experiência profissional não encontrada" });
    }

    return res.json({
      mensagem: "Experiência profissional deletada com sucesso",
      experiencia: result.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao deletar experiência profissional",
      detalhe: error.message,
    });
  }
}

module.exports = {
  listarProfissionais,
  buscarProfissionalPorId,
  criarProfissional,
  atualizarProfissional,
  deletarProfissional,
};