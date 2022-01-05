const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const { Pokemon, Type } = require("../db");
const axios = require("axios");

//funcion para obtener la informacion desde la pokeAPI
const getApiPokemons = async () => {
  //hago un get desde url para conseguir los primeros 20 pokemons
  const apiFirstPageResponse = await axios.get(
    "https://pokeapi.co/api/v2/pokemon"
  );
  //hago otro get para los proximos 20
  const apiSecondPageResponse = await axios.get(apiFirstPageResponse.data.next);
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
};

const getDbInfo = async () => {
  return await Pokemon.findAll({
    //para que me traiga el pokemon con su tipo uso el include
    include: {
      model: Type,
      attributes: ["name"],
      through: [],
    },
  });
};

const getAllInfo = async () => {
  const apiInfo = await getApiPokemons();
  const dbInfo = await getDbInfo();

  const allInfo = apiInfo.concat(dbInfo);

  return allInfo;
};

router.get("/pokemons", async (req, res) => {
  const { name } = req.query;
  if (name) {
    const pokemons = await getAllInfo();
    const foundPokemon = pokemons.find(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );
    console.log(foundPokemon);
    res.send(foundPokemon);
  }

  let pokemon = await getAllInfo();
  let pokeInfo = pokemon.map((p) => {
    return {
      name: p.name,
      img: p.img,
      type: p.types,
    };
  });
  res.json(pokeInfo);
});

router.get("/pokemons/:idPokemon", async (req, res) => {
  const { idPokemon } = req.params;

  const pokemons = await getAllInfo();
  const foundPokemon = pokemons.find((p) => p.id === Number(idPokemon));

  res.send(foundPokemon);
});

router.get("/types", async (req, res) => {
  //traigo la info de la url
  const typesUrl = await axios.get("https://pokeapi.co/api/v2/type");
  //uso la data de esa url que es un obj con != props, uso results que tiene todos los types con su name
  const typesArray = await typesUrl.data.results;
  //por cada elemento creo en mi tabla una nueva instancia de Types donde el name va a ser el nombre de c/ elemento
  typesArray.forEach((t) => {
    Type.findOrCreate({
      where: {
        name: t.name,
      },
    });
  });

  const typeArray = await Type.findAll();
  res.send(typesArray);
});

router.post("/pokemons", async (req, res) => {
  const { name, hp, strength, defense, speed, weight, img, type } = req.body;

  let newPokemon = await Pokemon.create({
    name,
    hp,
    strength,
    defense,
    speed,
    weight,
    img,
  });

  //los tipos solo pueden coincidir con los guardadas en db, por lo que le pido a mi modelo Type
  //que encuentre todos aquellos donde el name sea igual a lo pasado por body
  let newType = await Type.findAll({
    where: {
      name: type,
    },
  });

  //hago la relacion entre ambas tablas
  newPokemon.addType(newType);
  res.send("Tu pokemon a sido creado");
});

module.exports = router;
