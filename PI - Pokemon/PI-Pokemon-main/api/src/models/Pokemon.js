const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("pokemon", {
    name: {
      type: DataTypes.TEXT,
      allowNull: false, //debe ser requerido obligatoriamente
    },
    id: {
      type: DataTypes.UUID, //creo un id unico (32 caracteres, pueden ser num o letras, separados por 4 guiones)
      defaultValue: DataTypes.UUIDV4, //lo defino como un valor por default (v4 es la version más estable)
      allowNull: false,
      primaryKey: true, //asigno su valor como una clave primaria
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    img: {
      type: DataTypes.STRING(1234),
      allowNull: true,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  });
};
