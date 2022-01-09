const axios = require("axios");

export function getAllPokemons() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/pokemons");
    return dispatch({
      type: "GET_ALL_POKEMONS",
      payload: json.data,
    });
  };
}
