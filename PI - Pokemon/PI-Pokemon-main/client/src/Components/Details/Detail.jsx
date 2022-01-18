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
                <h3>Information:</h3>
                <p>
                  <strong>Id: </strong> {pokemon.id}
                </p>
                <p>
                  <strong>Type: </strong>
                  {!pokemon.createdInDb
                    ? pokemon.types + " "
                    : pokemon.types.map((p) => p.name + " ")}
                </p>
                <p>
                  <strong>Hp: </strong> {pokemon.hp}
                </p>
                <p>
                  <strong>Strength: </strong> {pokemon.attack}
                </p>
                <p>
                  <strong>Deffense: </strong> {pokemon.defense}
                </p>
                <p>
                  <strong>Speed: </strong> {pokemon.speed}
                </p>
                <p>
                  <strong>Height: </strong> {pokemon.height}
                </p>
                <p>
                  <strong>Weight: </strong> {pokemon.weight}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className={s.footer}>App created by Sol Patrone</footer>
    </div>
  );
}
