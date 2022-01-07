const express = require("express");
const app = express.Router();
const getAllInfo = require("./models/getAllInfo");
const { Pokemon, Type } = require("../db");

app.get("/", async (req, res) => {
  const { name } = req.query;
  try {
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
  } catch (e) {
    console.log(e);
  }
});

app.get("/:idPokemon", async (req, res) => {
  const { idPokemon } = req.params;
  try {
    const pokemons = await getAllInfo();
    const foundPokemon = pokemons.find((p) => p.id === Number(idPokemon));

    res.send(foundPokemon);
  } catch (e) {
    console.log(e);
  }
});

app.post("/", async (req, res) => {
  const { name, hp, strength, defense, speed, weight, img, type } = req.body;
  try {
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
  } catch (e) {
    console.log(e);
  }
});

module.exports = app;
