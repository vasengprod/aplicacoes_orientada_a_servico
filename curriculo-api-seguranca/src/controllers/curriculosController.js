const pool = require("../config/db");

async function buscarCurriculoPorSlug(req, res) {
  try {
    const { slug } = req.params;

    const pessoaResult = await pool.query(
      "SELECT * FROM pessoas WHERE slug = $1",
      [slug]
    );

    if (pessoaResult.rows.length === 0) {
      return res.status(404).json({ erro: "Currículo não encontrado" });
    }

    const pessoa = pessoaResult.rows[0];

    const academicasResult = await pool.query(
      "SELECT * FROM experiencias_academicas WHERE pessoa_id = $1 ORDER BY id ASC",
      [pessoa.id]
    );

    const profissionaisResult = await pool.query(
      "SELECT * FROM experiencias_profissionais WHERE pessoa_id = $1 ORDER BY id ASC",
      [pessoa.id]
    );

    const projetosResult = await pool.query(
      "SELECT * FROM projetos WHERE pessoa_id = $1 ORDER BY id ASC",
      [pessoa.id]
    );

    const tecnologiasResult = await pool.query(
      "SELECT * FROM tecnologias WHERE pessoa_id = $1 ORDER BY id ASC",
      [pessoa.id]
    );

    const linksResult = await pool.query(
      "SELECT * FROM links WHERE pessoa_id = $1 ORDER BY id ASC",
      [pessoa.id]
    );

    return res.json({
      pessoa,
      experiencias_academicas: academicasResult.rows,
      experiencias_profissionais: profissionaisResult.rows,
      projetos: projetosResult.rows,
      tecnologias: tecnologiasResult.rows,
      links: linksResult.rows,
    });
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao buscar currículo completo",
      detalhe: error.message,
    });
  }
}

module.exports = {
  buscarCurriculoPorSlug,
};