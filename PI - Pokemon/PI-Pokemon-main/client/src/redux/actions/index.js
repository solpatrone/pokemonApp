const axios = require("axios");

export function getAllPokemons() {
  return async function (dispatch) {
    try {
      const json = await axios.get("http://localhost:3001/pokemons");
      return dispatch({
        type: "GET_ALL_POKEMONS",
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getPokemonByName(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3001/pokemons?name=" + name);
      return dispatch({
        type: "GET_POKEMON_BY_NAME",
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getPokemonById(id) {
  return function (dispatch) {
    return fetch("http://localhost:3001/pokemons/" + id)
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: "GET_POKEMON_BY_ID",
          payload: data,
        })
      );
  };
}

export function getAllTypes() {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/types");
    return dispatch({
      type: "GET_ALL_TYPES",
      payload: json.data,
    });
  };
}

export function filterByType(payload) {
  return {
    type: "FILTER_BY_TYPE",
    payload,
  };
}

export function filterByCreation(payload) {
  return {
    type: "FILTER_BY_CREATION",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByStrenght(payload) {
  return {
    type: "ORDER_BY_STRENGTH",
    payload,
  };
}

export function postPokemon(payload) {
  return async function (dispatch) {
    try {
      let response = await axios.post(
        "http://localhost:3001/pokemons",
        payload
      );
      return dispatch({
        type: "POST_POKEMON",
        payload: response,
      });
    } catch (e) {
      console.log(e);
    }
  };
}
