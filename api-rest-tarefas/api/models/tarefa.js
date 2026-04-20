const getTarefaModel = (sequelize, { DataTypes }) => {
  const Tarefa = sequelize.define("Tarefa", {
    objectId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    concluida: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  return Tarefa;
};

export default getTarefaModel;