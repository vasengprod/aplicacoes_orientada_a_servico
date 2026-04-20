import tarefaService from "../services/tarefaService.js";

const criarTarefa = async (req, res) => {
  try {
    const result = await tarefaService.criarTarefa(req.context.models, req.body);
    return res.status(result.status).json(result.data);
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    return res.status(500).json({ error: "Erro interno ao criar tarefa" });
  }
};

const listarTarefas = async (req, res) => {
  try {
    const result = await tarefaService.listarTarefas(req.context.models);
    return res.status(result.status).json(result.data);
  } catch (error) {
    console.error("Erro ao listar tarefas:", error);
    return res.status(500).json({ error: "Erro interno ao listar tarefas" });
  }
};

const buscarTarefaPorObjectId = async (req, res) => {
  try {
    const result = await tarefaService.buscarTarefaPorObjectId(
      req.context.models,
      req.params.objectId
    );
    return res.status(result.status).json(result.data);
  } catch (error) {
    console.error("Erro ao buscar tarefa:", error);
    return res.status(500).json({ error: "Erro interno ao buscar tarefa" });
  }
};

const atualizarTarefa = async (req, res) => {
  try {
    const result = await tarefaService.atualizarTarefa(
      req.context.models,
      req.params.objectId,
      req.body
    );
    return res.status(result.status).json(result.data);
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    return res.status(500).json({ error: "Erro interno ao atualizar tarefa" });
  }
};

const removerTarefa = async (req, res) => {
  try {
    const result = await tarefaService.removerTarefa(
      req.context.models,
      req.params.objectId
    );
    return res.status(result.status).json(result.data);
  } catch (error) {
    console.error("Erro ao remover tarefa:", error);
    return res.status(500).json({ error: "Erro interno ao remover tarefa" });
  }
};

export default {
  criarTarefa,
  listarTarefas,
  buscarTarefaPorObjectId,
  atualizarTarefa,
  removerTarefa,
};