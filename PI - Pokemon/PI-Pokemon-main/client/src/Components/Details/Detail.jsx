import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById } from "../../redux/actions";
import { Link } from "react-router-dom";
import s from "./Detail.module.css";
import logo from "../../images/log.png";
import other from "../../images/default.jpg";
import LoadingPage from "../LoadingPage/LoadingPage";
import NotFound from "../NotFound/NotFound";

export default function Detail(props) {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.detail);
  console.log(pokemon);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(getPokemonById(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  return (
    <div className={s.container}>
      <header className={s.header}>
        <Link to="/home">
          <img src={logo} alt="Logo pokemon" className={s.logo} />
        </Link>
        <div className={s.funcional}>
          <Link to="/home" className={s.link}>
            Home
          </Link>
        </div>
      </header>
      <main className={s.main}>
        {loading ? (
          <LoadingPage />
        ) : pokemon.length > 0 ? (
          pokemon.map((p) => (
            <div className={s.cardContainer} key={p}>
              <div className={s.card}>
                <div className={s.imageCont}>
                  <h1 className={s.title}>{p.name}</h1>
                  <img
                    src={p.img ? p.img : other}
                    alt="Pokemon frontal pic"
                    className={s.img}
                  />
                </div>
                <div className={s.col}>
                  <div className={s.info}>
                    <h3>Information:</h3>
                    <p>
                      <strong>Id: </strong> {p.id}
                    </p>
                    <p>
                      <strong>Type: </strong>
                      {!p.createdInDb
                        ? p.types + " "
                        : p.types.map((e) => e.name + " ")}
                    </p>
                    <p>
                      <strong>Hp: </strong> {p.hp}
                    </p>
                    <p>
                      <strong>Strength: </strong> {p.attack}
                    </p>
                    <p>
                      <strong>Deffense: </strong> {p.defense}
                    </p>
                    <p>
                      <strong>Speed: </strong> {p.speed}
                    </p>
                    <p>
                      <strong>Height: </strong> {p.height}
                    </p>
                    <p>
                      <strong>Weight: </strong> {p.weight}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <NotFound />
        )}
      </main>
      <footer className={s.footer}>App created by Sol Patrone</footer>
    </div>
  );
}
