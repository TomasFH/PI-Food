const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },

    summary: {
      type: DataTypes.STRING, //o .TEXT?
      allowNull: false,
    },

    punctuation: {
      type: DataTypes.INTEGER,
    },

    healthScore: {
      type: DataTypes.INTEGER,
    },

    steps: {
      type: DataTypes.TEXT, // estaba en .STRING. Lo cambié para probar.
    }
  });
};
