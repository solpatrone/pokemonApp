import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById } from "../../redux/actions";
import { Link } from "react-router-dom";
import s from "./Detail.module.css";
import logo from "../../images/log.png";
import other from "../../images/default.jpg";

export default function Detail(props) {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getPokemonById(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  return (
    <div className={s.container}>
      <header className={s.header}>
        <Link to="/home" className={s.link}>
          <img src={logo} alt="Logo pokemon" className={s.logo} />
        </Link>
        <div className={s.funcional}></div>
      </header>
      <main className={s.main}>
        <div className={s.cardContainer}>
          <div className={s.card}>
            <div className={s.imageCont}>
              <h1 className={s.title}>{pokemon.name}</h1>
              <img
                src={pokemon.img ? pokemon.img : other}
                alt="Pokemon frontal pic"
                className={s.img}
              />
            </div>
            <div className={s.col}>
              <div className={s.info}>
                <h3>Información:</h3>
                <p>Id: {pokemon.id}</p>
                <p>
                  Type:
                  {!pokemon.createdInDb
                    ? pokemon.types + " "
                    : pokemon.types.map((p) => p.name + " ")}
                </p>
                <p>Vida: {pokemon.hp}</p>
                <p>Fuerza: {pokemon.attack}</p>
                <p>Defensa: {pokemon.defense}</p>
                <p>Velocidad: {pokemon.speed}</p>
                <p>Altura: {pokemon.height}</p>
                <p>Peso: {pokemon.weight}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className={s.footer}>App created by Sol Patrone</footer>
    </div>
  );
}
