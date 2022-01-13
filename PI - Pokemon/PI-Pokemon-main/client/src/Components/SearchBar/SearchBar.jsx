import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../../redux/actions";
import s from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getPokemonByName(name));
  }

  return (
    <div className={s.container}>
      <input
        type="text"
        value={name}
        placeholder="Ingrese el nombre de un pokemon"
        onChange={(e) => handleChange(e)}
        className={s.input}
      />

      <button
        type="submit"
        onClick={(e) => handleSubmit(e)}
        className={s.button}
      >
        Buscar
      </button>
    </div>
  );
}
