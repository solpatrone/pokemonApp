import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTypes, postPokemon } from "../../redux/actions";
import { Link } from "react-router-dom";
import logo from "../../images/log.png";
import s from "./CreatePokemon.module.css";

export function validate(pokemon) {
  let error = {};

  if (!pokemon.name) {
    error.name = "Nombre requerido.";
  } else if (!/\S{5,20}[^0-9]/.test(pokemon.name)) {
    error.name =
      "El nombre debe contener entre 5 y 20 letras. No acepta numeros.";
  }

  if (pokemon.attack < 0 || pokemon.attack > 200) {
    error.attack = "La fuerza debe ser mayor a 0 y menor a 200 puntos.";
  }

  if (!pokemon.img) {
    error.img = "Imagen requerida.";
  }

  // hp: 0,
  //   attack: 0,
  //   defense: 0,
  //   speed: 0,
  //   height: 0,
  //   weight: 0,
  //   img: "",
  //   types:

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

  function handleDelete(tipo) {
    setPokemon({
      ...pokemon,
      types: pokemon.types.filter((t) => t !== tipo),
    });
  }

  return (
    <div className={s.container}>
      <header className={s.header}>
        <Link to="/home" className={s.link}>
          <img src={logo} alt="Logo Pokemon" className={s.logo} />
        </Link>
      </header>
      <main className={s.main}>
        <div className={s.formContainer}>
          <h3 className={s.title}>Crea tu Pokemon!</h3>

          <div className={s.form}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className={s.inputContainer}>
                <label>Nombre</label>
                <input
                  type="text"
                  placeholder="Ingresa un nombre"
                  value={pokemon.name}
                  name="name"
                  autoComplete="off"
                  onChange={(e) => handleChange(e)}
                  required
                />
                {error.name && (
                  <strong
                    style={{
                      color: "#c90c0c",
                      fontSize: "14px",
                      fontWeight: "lighter",
                    }}
                  >
                    {error.name}
                  </strong>
                )}
              </div>

              <div className={s.inputContainer}>
                <label>Hit Points</label>
                <input
                  type="number"
                  placeholder="Ingresa hp"
                  value={pokemon.hp}
                  name="hp"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className={s.inputContainer}>
                <label>Ataque</label>
                <input
                  type="number"
                  placeholder="Ingresa puntos de fuerza"
                  value={pokemon.attack}
                  name="attack"
                  onChange={(e) => handleChange(e)}
                  className={error.attack && "danger"}
                />
                <strong
                  style={{
                    color: "#c90c0c",
                    fontSize: "14px",
                    fontWeight: "lighter",
                  }}
                >
                  {error.attack}
                </strong>
              </div>

              <div className={s.inputContainer}>
                <label>Defensa</label>
                <input
                  type="number"
                  placeholder="Ingresa puntos de defensa"
                  value={pokemon.defense}
                  name="defense"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className={s.inputContainer}>
                <label>Velocidad</label>
                <input
                  type="number"
                  placeholder="Ingresa un valor de velocidad"
                  value={pokemon.speed}
                  name="speed"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className={s.inputContainer}>
                <label>Altura</label>
                <input
                  type="number"
                  placeholder="Ingresa un valor de altura"
                  value={pokemon.height}
                  name="height"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className={s.inputContainer}>
                <label>Peso</label>
                <input
                  type="number"
                  placeholder="Ingresa un valor de peso"
                  value={pokemon.weight}
                  name="weight"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className={s.inputContainer}>
                <label>Imagen</label>
                <input
                  type="text"
                  placeholder="Ingresa una url"
                  value={pokemon.img}
                  name="img"
                  onChange={(e) => handleChange(e)}
                  className={error.img && "s.danger"}
                />
                <strong
                  style={{
                    color: "#c90c0c",
                    fontSize: "14px",
                    fontWeight: "lighter",
                  }}
                >
                  {error.img}
                </strong>
              </div>

              <div className={s.inputContainer}>
                <label>Tipo</label>
                <select onChange={(e) => handleSelect(e)}>
                  {allTypes &&
                    allTypes.map((t) => (
                      <option value={t.name} key={t.name} name="types">
                        {t.name}
                      </option>
                    ))}
                </select>
                <div>
                  <ul>
                    {pokemon.types.map((tipo) => (
                      <div className={s.selected}>
                        <li key={tipo}>{tipo}</li>
                        <button
                          onClick={() => handleDelete(tipo)}
                          key={tipo}
                          className={s.btnDelete}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={s.inputContainer}>
                {error.name ? null : (
                  <input type="submit" value="Enviar" className={s.btn} />
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
      <footer className={s.footer}>App created by Sol Patrone</footer>
    </div>
  );
}
