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
      if (foundPokemon.length > 0) {
        // console.log(foundPokemon);
        return res.send(foundPokemon);
      } else {
        return res.send([]);
      }
    }

    let pokeInfo = pokemons.map((p) => {
      return {
        id: p.id,
        name: p.name,
        img: p.img,
        types: p.types,
        attack: p.attack,
        createdInDb: p.createdInDb || false,
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
    const foundPokemon = pokemons.filter(
      (p) => p.id.toString() === idPokemon.toString()
    );
    if (foundPokemon.length > 0) {
      res.send(foundPokemon);
    } else {
      res.send([]);
    }
  } catch (e) {
    console.log(e);
  }
});

app.post("/", async (req, res) => {
  const {
    name,
    hp,
    attack,
    defense,
    speed,
    weight,
    height,
    img,
    types,
    createdInDb,
  } = req.body;
  try {
    if (name) {
      let newPokemon = await Pokemon.create({
        name,
        hp,
        attack,
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
          name: types,
        },
      });

      //hago la relacion entre ambas tablas
      newPokemon.addType(newType);
      return res.send(newPokemon);
    } else {
      return res.status(404).send("Pokemon name required");
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = app;
