const pool = require("../config/db");

async function listarLinks(req, res) {
  try {
    const result = await pool.query("SELECT * FROM links ORDER BY id ASC");
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao listar links", detalhe: error.message });
  }
}

async function buscarLinkPorId(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM links WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "Link não encontrado" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao buscar link", detalhe: error.message });
  }
}

async function criarLink(req, res) {
  try {
    const { pessoa_id, tipo, url } = req.body;

    const result = await pool.query(
      `INSERT INTO links
      (pessoa_id, tipo, url)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [pessoa_id, tipo, url]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao criar link", detalhe: error.message });
  }
}

async function atualizarLink(req, res) {
  try {
    const { id } = req.params;
    const { pessoa_id, tipo, url } = req.body;

    const result = await pool.query(
      `UPDATE links
      SET pessoa_id = $1,
          tipo = $2,
          url = $3
      WHERE id = $4
      RETURNING *`,
      [pessoa_id, tipo, url, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "Link não encontrado" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao atualizar link", detalhe: error.message });
  }
}

async function deletarLink(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query("DELETE FROM links WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "Link não encontrado" });
    }

    return res.json({ mensagem: "Link deletado com sucesso", link: result.rows[0] });
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao deletar link", detalhe: error.message });
  }
}

module.exports = {
  listarLinks,
  buscarLinkPorId,
  criarLink,
  atualizarLink,
  deletarLink,
};