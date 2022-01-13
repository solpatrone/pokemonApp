import React from "react";
import style from "./Card.module.css";

export default function Card({ name, img, type }) {
  return (
    <div className={style.container}>
      <img
        src={img}
        alt="Imagen del pokemon"
        width="200px"
        className={style.img}
      />
      <div className={style.data}>
        <h3 className={style.title}>{name}</h3>
        <div className={style.types}>
          <strong>Type: </strong>
          {type && type.map((t) => t).join(", ")}
        </div>
      </div>
    </div>
  );
}
