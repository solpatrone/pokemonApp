const { Pokemon, Type } = require("../../db");

const getDbInfo = async () => {
  try {
    return await Pokemon.findAll({
      //para que me traiga el pokemon con su tipo uso el include
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
