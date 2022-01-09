import React from "react";

export default function Card({ name, img, type }) {
  return (
    <div>
      <h3>{name}</h3>
      <img src={img} alt="Imagen del pokemon" width="200px" />
      <p>{type}</p>
    </div>
  );
}
