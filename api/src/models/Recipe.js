const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },

    dishSumary: {
      type: DataTypes.STRING, //o .TEXT?
      allowNull: false,
    },

    punctuation: {
      type: DataTypes.INTEGER,
    },

    healthyLevel: {
      type: DataTypes.STRING,
    },

    steps: {
      type: DataTypes.STRING, //o .TEXT?
    }
  });
};
