import React from "react";
import { Link } from "react-router-dom";
import other from "../../images/default.jpg";
import style from "./Card.module.css";

export default function Card({ name, img, types, id, createdInDb }) {
  return (
    <Link to={`/home/${id}`} className={style.idPoke}>
      <div className={style.container}>
        <img
          src={img ? img : other}
          alt="Imagen del pokemon"
          width="200px"
          height="218px"
          className={style.img}
        />
        <div className={style.data}>
          <h3 className={style.title}>{name}</h3>
          <div className={style.types}>
            <strong>Type: </strong>
            {!createdInDb ? types + " " : types.map((p) => p.name + " ")}
          </div>
        </div>
      </div>
    </Link>
  );
}
