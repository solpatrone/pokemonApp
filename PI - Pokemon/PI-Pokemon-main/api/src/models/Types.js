const { DataTypes } = require("sequelize");
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define("type", {
    name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
};
