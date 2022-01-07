const express = require("express");
const app = express.Router();
const axios = require("axios");
const { Type } = require("../db");

app.get("/", async (req, res) => {
  try {
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
  } catch (e) {
    console.log(e);
  }
});

module.exports = app;
