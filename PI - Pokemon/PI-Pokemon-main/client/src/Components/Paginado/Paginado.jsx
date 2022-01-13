import React from "react";

export default function Paginado({ pokemonsPerPage, allPokemons, paginado }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allPokemons.length / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul>
        {pageNumbers &&
          pageNumbers.map((p) => (
            <li key={p}>
              <a onClick={() => paginado(p)} href="#">
                {p}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}
