const pool = require("../config/db");

async function listarProjetos(req, res) {
  try {
    const result = await pool.query("SELECT * FROM projetos ORDER BY id ASC");
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao listar projetos", detalhe: error.message });
  }
}

async function buscarProjetoPorId(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM projetos WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "Projeto não encontrado" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao buscar projeto", detalhe: error.message });
  }
}

async function criarProjeto(req, res) {
  try {
    const { pessoa_id, nome, descricao, tecnologia, url } = req.body;

    const result = await pool.query(
      `INSERT INTO projetos
      (pessoa_id, nome, descricao, tecnologia, url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [pessoa_id, nome, descricao, tecnologia, url]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao criar projeto", detalhe: error.message });
  }
}

async function atualizarProjeto(req, res) {
  try {
    const { id } = req.params;
    const { pessoa_id, nome, descricao, tecnologia, url } = req.body;

    const result = await pool.query(
      `UPDATE projetos
      SET pessoa_id = $1,
          nome = $2,
          descricao = $3,
          tecnologia = $4,
          url = $5
      WHERE id = $6
      RETURNING *`,
      [pessoa_id, nome, descricao, tecnologia, url, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "Projeto não encontrado" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao atualizar projeto", detalhe: error.message });
  }
}

async function deletarProjeto(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query("DELETE FROM projetos WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "Projeto não encontrado" });
    }

    return res.json({ mensagem: "Projeto deletado com sucesso", projeto: result.rows[0] });
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao deletar projeto", detalhe: error.message });
  }
}

module.exports = {
  listarProjetos,
  buscarProjetoPorId,
  criarProjeto,
  atualizarProjeto,
  deletarProjeto,
};