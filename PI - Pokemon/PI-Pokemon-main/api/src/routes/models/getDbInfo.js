const { Pokemon, Type } = require("../../db");

const getDbInfo = async () => {
  try {
    return await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: [],
      },
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = getDbInfo;
