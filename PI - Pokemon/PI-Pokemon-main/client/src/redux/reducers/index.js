const initialState = {
  pokemons: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
      };
    default:
      return state.pokemons;
  }
}

export default rootReducer;
