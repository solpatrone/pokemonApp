const express = require("express");
const app = express.Router();
const getAllInfo = require("./models/getAllInfo");
const { Pokemon, Type } = require("../db");

app.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    const pokemons = await getAllInfo();
    if (name) {
      const foundPokemon = pokemons.filter(
        (p) => p.name.toLowerCase() === name.toLowerCase()
      );
      if (foundPokemon) {
        return res.send(foundPokemon);
      } else {
        return res.send("Tu pokemon no ha sido encontrado");
      }
    }

    let pokeInfo = pokemons.map((p) => {
      return {
        id: p.id,
        name: p.name,
        img: p.img,
        type: p.types,
        attack: p.attack,
      };
    });
    return res.send(pokeInfo);
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
  const {
    name,
    hp,
    strength,
    defense,
    speed,
    weight,
    height,
    img,
    type,
    createdInDb,
  } = req.body;
  try {
    let newPokemon = await Pokemon.create({
      name,
      hp,
      strength,
      defense,
      speed,
      weight,
      height,
      img,
      createdInDb,
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
    console.log(newPokemon);
    res.send(newPokemon);
  } catch (e) {
    console.log(e);
  }
});

module.exports = app;
