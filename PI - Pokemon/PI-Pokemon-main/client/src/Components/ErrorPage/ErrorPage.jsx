import React from "react";
import { Link } from "react-router-dom";
import s from "./ErrorPage.module.css";
import pikachu from "../../images/surprised.png";

export default function ErrorPage() {
  return (
    <div className={s.ppal}>
      <div className={s.container}>
        <div className={s.surprised}>
          <div className={s.border}>
            <h2>Ups! Ha ocurrido un error!</h2>
            <p>La página que buscas no ha sido encontrada</p>
          </div>
          <img src={pikachu} alt="Pikachu sorprendido" width="500px" />
        </div>
        <Link to="/home" className={s.btnContainer}>
          <button className={s.btn}>Home</button>
        </Link>
      </div>
    </div>
  );
}
