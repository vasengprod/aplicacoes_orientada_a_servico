import { randomUUID } from "crypto";

const criarTarefa = async (models, dados) => {
  const { descricao, concluida = false } = dados;

  if (!descricao) {
    return {
      status: 400,
      data: { error: "descricao é obrigatória" },
    };
  }

  const tarefa = await models.Tarefa.create({
    objectId: randomUUID(),
    descricao,
    concluida,
  });

  return {
    status: 201,
    data: tarefa,
  };
};

const listarTarefas = async (models) => {
  const tarefas = await models.Tarefa.findAll();

  return {
    status: 200,
    data: tarefas,
  };
};

const buscarTarefaPorObjectId = async (models, objectId) => {
  const tarefa = await models.Tarefa.findOne({
    where: { objectId },
  });

  if (!tarefa) {
    return {
      status: 404,
      data: { error: "Tarefa não encontrada" },
    };
  }

  return {
    status: 200,
    data: tarefa,
  };
};

const atualizarTarefa = async (models, objectId, dados) => {
  const tarefa = await models.Tarefa.findOne({
    where: { objectId },
  });

  if (!tarefa) {
    return {
      status: 404,
      data: { error: "Tarefa não encontrada" },
    };
  }

  const { descricao, concluida } = dados;

  if (descricao !== undefined) {
    tarefa.descricao = descricao;
  }

  if (concluida !== undefined) {
    tarefa.concluida = concluida;
  }

  await tarefa.save();

  return {
    status: 200,
    data: tarefa,
  };
};

const removerTarefa = async (models, objectId) => {
  const tarefa = await models.Tarefa.findOne({
    where: { objectId },
  });

  if (!tarefa) {
    return {
      status: 404,
      data: { error: "Tarefa não encontrada" },
    };
  }

  await tarefa.destroy();

  return {
    status: 200,
    data: { message: "Tarefa removida com sucesso" },
  };
};

export default {
  criarTarefa,
  listarTarefas,
  buscarTarefaPorObjectId,
  atualizarTarefa,
  removerTarefa,
};