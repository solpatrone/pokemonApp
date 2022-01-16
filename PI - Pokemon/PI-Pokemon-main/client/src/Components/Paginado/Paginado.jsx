import React from "react";
import s from "./Paginado.module.css";

export default function Paginado({ pokemonsPerPage, allPokemons, paginado }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allPokemons.length / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={s.containerPag}>
      <ul className={s.listPag}>
        {pageNumbers &&
          pageNumbers.map((p) => (
            <li key={p} className={s.item}>
              <a onClick={() => paginado(p)} href="#" className={s.link}>
                {p}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}
