import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import log from "../../images/log.png";
import s from "./LandingPage.module.css";

function LandingPage() {
  return (
    <div className={s.container}>
      <div className={s.imageContainer}>
        <img src={log} alt="Logo pokemon" className={s.logo} />
        <img src={logo} alt="Imagen de los pokemons" className={s.img} />
      </div>
      <div className={s.btnContainer}>
        <Link to="/home">
          <button className={s.btn}>LET'S GO!</button>
        </Link>
      </div>
    </div>
  );
}
export default LandingPage;
