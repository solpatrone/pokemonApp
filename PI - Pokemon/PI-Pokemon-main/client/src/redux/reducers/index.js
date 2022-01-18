const initialState = {
  pokemons: [],
  copyPokemons: [],
  types: [],
  detail: [],
  loading: false,
  error: "",
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        copyPokemons: action.payload,
        loading: false,
      };
    case "GET_ALL_TYPES":
      return {
        ...state,
        types: action.payload,
      };
    case "GET_POKEMON_BY_ID":
      return {
        ...state,
        detail: action.payload,
      };
    case "GET_POKEMON_BY_NAME":
      return {
        ...state,
        copyPokemons: action.payload,
      };

    case "ORDER_BY_NAME":
      let sortedArray =
        action.payload === "asc_alf"
          ? state.pokemons.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        copyPokemons: sortedArray,
      };
    case "ORDER_BY_STRENGTH":
      let orderedArray =
        action.payload === "asc_str"
          ? state.pokemons.sort((a, b) => {
              if (a.attack > b.attack) {
                return -1;
              }
              if (b.attack > a.attack) {
                return 1;
              } else {
                return 0;
              }
            })
          : state.pokemons.sort((a, b) => {
              if (a.attack > b.attack) {
                return 1;
              }
              if (b.attack > a.attack) {
                return -1;
              } else {
                return 0;
              }
            });
      return {
        ...state,
        copyPokemons: orderedArray,
      };

    case "FILTER_BY_CREATION":
      const pokemonCopyArray = state.pokemons;
      // console.log(pokemonCopyArray);
      const filteredCreation =
        action.payload === "createdInDb"
          ? pokemonCopyArray.filter((pokemon) => pokemon.createdInDb)
          : pokemonCopyArray.filter((pokemon) => !pokemon.createdInDb);
      return {
        ...state,
        copyPokemons:
          action.payload === "all" ? state.pokemons : filteredCreation,
      };
    case "FILTER_BY_TYPE":
      const allPokemons = state.pokemons;
      const filteredArray =
        action.payload === "all"
          ? allPokemons
          : allPokemons.filter((pokemon) => {
              if (!pokemon.createdInDb) {
                return pokemon.types.find((t) => t === action.payload);
              } else {
                return pokemon.types.find((t) => t.name === action.payload);
              }
            });
      return {
        ...state,
        copyPokemons: filteredArray,
      };

    case "POST_POKEMON":
      return {
        ...state,
      };

    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
