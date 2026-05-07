const pool = require("../config/db");

async function listarAcademicas(req, res) {
  try {
    const result = await pool.query(
      "SELECT * FROM experiencias_academicas ORDER BY id ASC"
    );

    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao listar experiências acadêmicas",
      detalhe: error.message,
    });
  }
}

async function buscarAcademicaPorId(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM experiencias_academicas WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "Experiência acadêmica não encontrada" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao buscar experiência acadêmica",
      detalhe: error.message,
    });
  }
}

async function criarAcademica(req, res) {
  try {
    const { pessoa_id, curso, instituicao, periodo, status, descricao } = req.body;

    const result = await pool.query(
      `INSERT INTO experiencias_academicas
      (pessoa_id, curso, instituicao, periodo, status, descricao)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [pessoa_id, curso, instituicao, periodo, status, descricao]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao criar experiência acadêmica",
      detalhe: error.message,
    });
  }
}

async function atualizarAcademica(req, res) {
  try {
    const { id } = req.params;
    const { pessoa_id, curso, instituicao, periodo, status, descricao } = req.body;

    const result = await pool.query(
      `UPDATE experiencias_academicas
      SET pessoa_id = $1,
          curso = $2,
          instituicao = $3,
          periodo = $4,
          status = $5,
          descricao = $6
      WHERE id = $7
      RETURNING *`,
      [pessoa_id, curso, instituicao, periodo, status, descricao, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "Experiência acadêmica não encontrada" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao atualizar experiência acadêmica",
      detalhe: error.message,
    });
  }
}

async function deletarAcademica(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM experiencias_academicas WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "Experiência acadêmica não encontrada" });
    }

    return res.json({
      mensagem: "Experiência acadêmica deletada com sucesso",
      experiencia: result.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao deletar experiência acadêmica",
      detalhe: error.message,
    });
  }
}

module.exports = {
  listarAcademicas,
  buscarAcademicaPorId,
  criarAcademica,
  atualizarAcademica,
  deletarAcademica,
};