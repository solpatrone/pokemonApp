import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTypes, postPokemon } from "../../redux/actions";
import { Link, useHistory } from "react-router-dom";
import logo from "../../images/log.png";
import s from "./CreatePokemon.module.css";

export function validate(pokemon) {
  let error = { disableBtn: false };
  if (!pokemon.name) {
    error.name = "Name required";
    error.disableBtn = true;
  } else if (!/\S{5,20}[^0-9]/.test(pokemon.name)) {
    error.name =
      "The name should be between 5 and 20 characters (no numbers allowed)";
    error.disableBtn = true;
  }

  if (pokemon.attack < 0 || pokemon.attack > 200) {
    error.attack = "The number should be higher than 0 and lower than 200";
    error.disableBtn = true;
  }

  if (pokemon.hp < 0) {
    error.hp = "The number should be higher than 0";
    error.disableBtn = true;
  }

  if (pokemon.defense < 0) {
    error.defense = "The number should be higher than 0";
    error.disableBtn = true;
  }

  if (pokemon.speed < 0) {
    error.speed = "The number should be higher than 0";
    error.disableBtn = true;
  }

  if (pokemon.height < 0) {
    error.height = "The number should be higher than 0";
    error.disableBtn = true;
  }

  if (pokemon.weight < 0) {
    error.weight = "The number should be higher than 0";
    error.disableBtn = true;
  }

  //MOSTRAR NO FUNC X Q?
  // if (pokemon.types.length <= 0 || pokemon.types.length > 3) {
  //   error.types = "Pick between 1 and 3 types";
  //   error.disableBtn = true;
  // }

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

  const [error, setError] = useState({ disableBtn: true });

  const dispatch = useDispatch();
  const allTypes = useSelector((state) => state.types);

  const history = useHistory();

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

  function handleSelect(e) {
    setPokemon({
      ...pokemon,
      types: [...pokemon.types, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postPokemon(pokemon));
    alert("Your pokemon has been created");
    setPokemon({
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
    history.push("/home");
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
        <img src={logo} alt="Logo Pokemon" className={s.logo} />
        <div className={s.funcional}>
          <Link to="/home" className={s.link}>
            Home
          </Link>
        </div>
      </header>
      <main className={s.main}>
        <div className={s.formContainer}>
          <h3 className={s.title}>Create your Pokemon!</h3>

          <div className={s.form}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className={s.inputContainer}>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter a name"
                  value={pokemon.name}
                  name="name"
                  autoComplete="off"
                  onChange={(e) => handleChange(e)}
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
                  placeholder="Enter a value"
                  value={pokemon.hp}
                  name="hp"
                  onChange={(e) => handleChange(e)}
                />
                {error.hp && (
                  <strong
                    style={{
                      color: "#c90c0c",
                      fontSize: "14px",
                      fontWeight: "lighter",
                    }}
                  >
                    {error.hp}
                  </strong>
                )}
              </div>

              <div className={s.inputContainer}>
                <label>Strength</label>
                <input
                  type="number"
                  placeholder="Enter a value"
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
                <label>Defense</label>
                <input
                  type="number"
                  placeholder="Enter a value"
                  value={pokemon.defense}
                  name="defense"
                  onChange={(e) => handleChange(e)}
                />
                {error.defense && (
                  <strong
                    style={{
                      color: "#c90c0c",
                      fontSize: "14px",
                      fontWeight: "lighter",
                    }}
                  >
                    {error.defense}
                  </strong>
                )}
              </div>

              <div className={s.inputContainer}>
                <label>Speed</label>
                <input
                  type="number"
                  placeholder="Enter a value"
                  value={pokemon.speed}
                  name="speed"
                  onChange={(e) => handleChange(e)}
                />
                {error.speed && (
                  <strong
                    style={{
                      color: "#c90c0c",
                      fontSize: "14px",
                      fontWeight: "lighter",
                    }}
                  >
                    {error.speed}
                  </strong>
                )}
              </div>

              <div className={s.inputContainer}>
                <label>Height</label>
                <input
                  type="number"
                  placeholder="Enter a value"
                  value={pokemon.height}
                  name="height"
                  onChange={(e) => handleChange(e)}
                />
                {error.height && (
                  <strong
                    style={{
                      color: "#c90c0c",
                      fontSize: "14px",
                      fontWeight: "lighter",
                    }}
                  >
                    {error.height}
                  </strong>
                )}
              </div>

              <div className={s.inputContainer}>
                <label>Weight</label>
                <input
                  type="number"
                  placeholder="Enter a value"
                  value={pokemon.weight}
                  name="weight"
                  onChange={(e) => handleChange(e)}
                />
                {error.weight && (
                  <strong
                    style={{
                      color: "#c90c0c",
                      fontSize: "14px",
                      fontWeight: "lighter",
                    }}
                  >
                    {error.weight}
                  </strong>
                )}
              </div>

              <div className={s.inputContainer}>
                <label>Image</label>
                <input
                  type="text"
                  placeholder="Enter a url"
                  autoComplete="off"
                  value={pokemon.img}
                  name="img"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className={s.inputContainer}>
                <label>Type</label>
                <select onChange={(e) => handleSelect(e)}>
                  <option disabled>Types</option>
                  {allTypes &&
                    allTypes.map((t) => {
                      return (
                        <option value={t.name} key={t.name} name="types">
                          {t.name}
                        </option>
                      );
                    })}
                </select>

                <div>
                  {pokemon.types.map((e) => {
                    return (
                      <div className={s.selected} key={e}>
                        <p className={s.p}>{e}</p>
                        <button
                          onClick={() => {
                            handleDelete(e);
                          }}
                          className={s.btnDelete}
                        >
                          x
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={s.inputContainer}>
                <input
                  type="submit"
                  value="Create!"
                  className={s.btn}
                  disabled={error.disableBtn}
                />
              </div>
            </form>
          </div>
        </div>
      </main>
      <footer className={s.footer}>App created by Sol Patrone</footer>
    </div>
  );
}
