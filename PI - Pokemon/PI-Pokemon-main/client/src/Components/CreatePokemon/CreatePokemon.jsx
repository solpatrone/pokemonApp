import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTypes, postPokemon } from "../../redux/actions";
import { Link } from "react-router-dom";

export function validate(pokemon) {
  let error = {};

  if (!pokemon.name) {
    error.name = "Nombre requerido.";
  } else if (!/\S{5,20}[^0-9]/.test(pokemon.name)) {
    error.name =
      "El nombre debe contener entre 5 y 20 letras. No acepta numeros.";
  }

  if (!pokemon.attack) {
    error.attack = "Valor requerido.";
  } else if (pokemon.attack < 0 || pokemon.attack > 200) {
    error.attack = "La fuerza debe ser mayor a 0 y menor a 200 puntos.";
  }

  if (!pokemon.img) {
    error.img = "Imagen requerida.";
  }

  return error;
}

export default function CreatePokemon() {
  const [pokemon, setPokemon] = useState({
    name: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    img: "",
    types: [],
  });

  console.log(pokemon);

  const [error, setError] = useState({});

  const dispatch = useDispatch();
  const allTypes = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(getAllTypes());
  }, [dispatch]);

  function handleChange(e) {
    setPokemon((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError(validate({ ...pokemon, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postPokemon(pokemon));
    alert("Tu pokemon ha sido creado");
  }

  function handleSelect(e) {
    setPokemon({
      ...pokemon,
      types: [...pokemon.types, e.target.value],
    });
  }

  return (
    <div>
      <Link to="/home">Home</Link>
      <h3>Crea tu Pokemon!</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Nombre</label>
        <input
          type="text"
          placeholder="Ingresa un nombre"
          value={pokemon.name}
          name="name"
          onChange={(e) => handleChange(e)}
          className={error.name && "danger"}
        />
        <strong>{error.name}</strong>
        <label>Hit Points</label>
        <input
          type="number"
          placeholder="Ingresa hp"
          value={pokemon.hp}
          name="hp"
          onChange={(e) => handleChange(e)}
        />
        <label>Ataque</label>
        <input
          type="number"
          placeholder="Ingresa puntos de fuerza"
          value={pokemon.attack}
          name="attack"
          onChange={(e) => handleChange(e)}
          className={error.attack && "danger"}
        />
        <strong>{error.attack}</strong>
        <label>Defensa</label>
        <input
          type="number"
          placeholder="Ingresa puntos de defensa"
          value={pokemon.defense}
          name="defense"
          onChange={(e) => handleChange(e)}
        />
        <label>Velocidad</label>
        <input
          type="number"
          placeholder="Ingresa un valor de velocidad"
          value={pokemon.speed}
          name="speed"
          onChange={(e) => handleChange(e)}
        />
        <label>Altura</label>
        <input
          type="number"
          placeholder="Ingresa un valor de altura"
          value={pokemon.height}
          name="height"
          onChange={(e) => handleChange(e)}
        />
        <label>Peso</label>
        <input
          type="number"
          placeholder="Ingresa un valor de peso"
          value={pokemon.weight}
          name="weight"
          onChange={(e) => handleChange(e)}
        />
        <label>Imagen</label>
        <input
          type="text"
          placeholder="Ingresa una url"
          value={pokemon.img}
          name="img"
          onChange={(e) => handleChange(e)}
          className={error.img && "danger"}
        />
        <strong>{error.img}</strong>
        <label>Tipo</label>
        <select onChange={(e) => handleSelect(e)}>
          {allTypes &&
            allTypes.map((t) => (
              <option value={t.name} key={t.name} name="types">
                {t.name}
              </option>
            ))}
        </select>

        <input type="submit" value="Crear" />
      </form>
    </div>
  );
}
