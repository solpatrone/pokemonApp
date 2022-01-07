const getApiPokemons = require("./getApiPokemons");
const getDbInfo = require("./getDbInfo");

const getAllInfo = async () => {
  try {
    const apiInfo = await getApiPokemons();
    const dbInfo = await getDbInfo();

    const allInfo = apiInfo.concat(dbInfo);

    return allInfo;
  } catch (e) {
    console.log(e);
  }
};

module.exports = getAllInfo;
