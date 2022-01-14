import React from "react";
import style from "./Card.module.css";
import { Link } from "react-router-dom";

export default function Card({ name, img, types, id }) {
  return (
    <div className={style.container}>
      <Link to={`/home/:${id}`}>
        <img
          src={img}
          alt="Imagen del pokemon"
          width="200px"
          className={style.img}
        />
      </Link>
      <div className={style.data}>
        <h3 className={style.title}>{name}</h3>
        <div className={style.types}>
          <strong>Type: </strong>
          {types && types.join(", ")}
        </div>
      </div>
    </div>
  );
}
