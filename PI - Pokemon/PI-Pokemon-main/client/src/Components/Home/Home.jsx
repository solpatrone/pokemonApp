import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card";
import {
  filterByType,
  getAllPokemons,
  getAllTypes,
  orderByName,
  orderByStrenght,
  filterByCreation,
} from "../../redux/actions";
import logo from "../../images/log.png";
import s from "./Home.module.css";
import LoadingPage from "../LoadingPage/LoadingPage";

export default function Home() {
  //estados globales
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.copyPokemons);
  const allTypes = useSelector((state) => state.types);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  //estado local para ordenamiento alfabetico
  const [order, setOrder] = useState("");

  //estados locales para paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);
  const indexOfLastPost = currentPage * pokemonsPerPage;
  const indexOfFirstPost = indexOfLastPost - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(indexOfFirstPost, indexOfLastPost);

  function paginado(pageNumber) {
    setCurrentPage(pageNumber);
  }

  //dispatch para carga de pokemons y tipos
  useEffect(() => {
    dispatch(getAllPokemons());
    dispatch(getAllTypes());
  }, [dispatch]);

  //funciones de ordenamiento y filtrado
  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`); //necesario para que el renderizado ocurra, estado local que inicia vacio y se completa al ejecutar la funcion
  }

  function handleOrderByStr(e) {
    e.preventDefault();
    dispatch(orderByStrenght(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleFilterType(e) {
    e.preventDefault();
    dispatch(filterByType(e.target.value));
  }

  function handleCreation(e) {
    e.preventDefault();
    dispatch(filterByCreation(e.target.value));
  }

  return (
    <div className={s.container}>
      <header className={s.header}>
        <div className={s.image}>
          <Link to="/home">
            <img src={logo} alt="Pokemon logo" className={s.logo} />
          </Link>
        </div>
        <div className={s.functional}>
          <div className={s.ppal}>
            <div className={s.search}>
              <SearchBar />
            </div>
            <div className={s.create}>
              <Link to="/create" className={s.link}>
                Create Pokemon
              </Link>
            </div>
          </div>
          <div className={s.filter}>
            <div>
              <select onChange={(e) => handleSort(e)}>
                <option disabled>Alphabetical</option>
                <option value="asc_alf">A to Z</option>
                <option value="des_alf">Z to A</option>
              </select>
            </div>
            <div>
              <select onChange={(e) => handleOrderByStr(e)}>
                <option value="asc_str">High to Low Strength</option>
                <option value="des_str">Low to High Strength</option>
              </select>
            </div>
            <div>
              <select onChange={(e) => handleFilterType(e)}>
                <option value="all">All</option>
                {allTypes &&
                  allTypes.map((t) => (
                    <option value={t.name} key={t.name}>
                      {t.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <select onChange={(e) => handleCreation(e)}>
                <option value="all">All</option>
                <option value="createdInDb">Created</option>
                <option value="api">API</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className={s.main}>
        <div className={s.cards}>
          {error ? (
            <div className={s.error}>Pokemon no encontrado</div>
          ) : loading ? (
            <LoadingPage />
          ) : (
            currentPokemons &&
            currentPokemons.map((p) => (
              <Card
                name={p.name}
                types={p.types}
                img={p.img}
                key={p.id}
                id={p.id}
                createdInDb={p.createdInDb}
              />
            ))
          )}
        </div>
        <div className={s.paginado}>
          <Paginado
            pokemonsPerPage={pokemonsPerPage}
            allPokemons={allPokemons}
            paginado={paginado}
          />
        </div>
      </main>
      <footer className={s.footer}>App created by Sol Patrone</footer>
    </div>
  );
}
