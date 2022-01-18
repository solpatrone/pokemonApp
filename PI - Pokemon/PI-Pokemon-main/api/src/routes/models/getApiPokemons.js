const axios = require("axios");

const getApiPokemons = async () => {
  try {
    const apiFirstPageResponse = await axios.get(
      "https://pokeapi.co/api/v2/pokemon"
    );
    //hago otro get para los proximos 20
    const apiSecondPageResponse = await axios.get(
      apiFirstPageResponse.data.next
    );
    //concateno los resultados (la data en la prop results) de ambos get en un array
    //esto me retorna un json con el name y ulr de mi pokemon (dentro del url encuentro toda la info)
    const pokemonsArray = apiFirstPageResponse.data.results.concat(
      apiSecondPageResponse.data.results
    );
    //al trabajar de manera asincronica, mi array va a contener promesas las cuales puedo resolver con un Promise.all()
    const pokemonsResult = await Promise.all(
      pokemonsArray.map(async (obj) => {
        //mapeo mis objetos de manera async, ya que estoy trabajando con promesas (la url puede tomarse un tiempo en cargar)
        //y accedo a la prop url para obtener solo la info que necesito para mis rutas
        const pokemon = await axios.get(obj.url);
        return {
          id: pokemon.data.id,
          name: pokemon.data.name,
          hp: pokemon.data.stats[0].base_stat,
          attack: pokemon.data.stats[1].base_stat,
          defense: pokemon.data.stats[2].base_stat,
          speed: pokemon.data.stats[5].base_stat,
          height: pokemon.data.height,
          weight: pokemon.data.weight,
          img: pokemon.data.sprites.front_default,
          types: pokemon.data.types.map((element) => {
            return element.type.name;
          }),
        };
      })
    );
    //retorno toda la info creada en mi objeto pokemonResult para utilizar en las rutas segun corresponda
    //console.log(pokemonsResult);
    return pokemonsResult;
  } catch (e) {
    console.log(e);
  }
};

module.exports = getApiPokemons;
