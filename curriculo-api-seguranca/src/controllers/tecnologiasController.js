const pool = require("../config/db");

async function listarTecnologias(req, res) {
  try {
    const result = await pool.query("SELECT * FROM tecnologias ORDER BY id ASC");
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao listar tecnologias", detalhe: error.message });
  }
}

async function buscarTecnologiaPorId(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM tecnologias WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "Tecnologia não encontrada" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao buscar tecnologia", detalhe: error.message });
  }
}

async function criarTecnologia(req, res) {
  try {
    const { pessoa_id, nome, categoria } = req.body;

    const result = await pool.query(
      `INSERT INTO tecnologias
      (pessoa_id, nome, categoria)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [pessoa_id, nome, categoria]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao criar tecnologia", detalhe: error.message });
  }
}

async function atualizarTecnologia(req, res) {
  try {
    const { id } = req.params;
    const { pessoa_id, nome, categoria } = req.body;

    const result = await pool.query(
      `UPDATE tecnologias
      SET pessoa_id = $1,
          nome = $2,
          categoria = $3
      WHERE id = $4
      RETURNING *`,
      [pessoa_id, nome, categoria, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "Tecnologia não encontrada" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao atualizar tecnologia", detalhe: error.message });
  }
}

async function deletarTecnologia(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query("DELETE FROM tecnologias WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "Tecnologia não encontrada" });
    }

    return res.json({ mensagem: "Tecnologia deletada com sucesso", tecnologia: result.rows[0] });
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao deletar tecnologia", detalhe: error.message });
  }
}

module.exports = {
  listarTecnologias,
  buscarTecnologiaPorId,
  criarTecnologia,
  atualizarTecnologia,
  deletarTecnologia,
};