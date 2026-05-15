require("dotenv").config();

const fs = require("fs");
const path = require("path");
const pool = require("../src/config/db");

async function run() {
  try {
    const fileName = process.argv[2];

    if (!fileName) {
      console.error("Informe o arquivo SQL.");
      console.error("Exemplo: node scripts/runSql.js schema.sql");
      process.exit(1);
    }

    const filePath = path.join(__dirname, "..", "src", "database", fileName);
    const sql = fs.readFileSync(filePath, "utf8");

    await pool.query(sql);

    console.log(`Arquivo ${fileName} executado com sucesso.`);
  } catch (error) {
    console.error("Erro ao executar SQL:");
    console.error(error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

run();