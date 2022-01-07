const { Router } = require("express");
const router = Router();

//importando las rutas
const pokemons = require("./pokemons");
const types = require("./types");

// usando mis rutas
router.use("/pokemons", pokemons);
router.use("/types", types);

module.exports = router;
