import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import s from "./Home.module.css";
import logo from "../../images/log.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByType,
  getAllPokemons,
  getAllTypes,
  orderByName,
  orderByStrenght,
  filterByCreation,
} from "../../redux/actions";

export default function Home() {
  //estados globales
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.copyPokemons);
  const allTypes = useSelector((state) => state.types);

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

  //hago el dispatch de la accion (idem mapDispatchToProps)
  useEffect(() => {
    dispatch(getAllPokemons());
    dispatch(getAllTypes());
  }, [dispatch]);

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleFilterType(e) {
    e.preventDefault();
    dispatch(filterByType(e.target.value));
  }

  function handleOrderByStr(e) {
    e.preventDefault();
    dispatch(orderByStrenght(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleCreation(e) {
    e.preventDefault();
    dispatch(filterByCreation(e.target.value));
  }

  return (
    <div className={s.container}>
      <header className={s.header}>
        <div className={s.image}>
          <img src={logo} alt="Logo pokemon" className={s.logo} />
        </div>
        <div className={s.functional}>
          <div className={s.ppal}>
            <div className={s.search}>
              <SearchBar />
            </div>
            <div className={s.create}>
              <Link to="/create" className={s.link}>
                Crear Pokemon
              </Link>
            </div>
          </div>
          <div className={s.filter}>
            <div>
              <select onChange={(e) => handleSort(e)}>
                <option value="asc_alf">A a Z</option>
                <option value="des_alf">Z a A</option>
              </select>
            </div>
            <div>
              <select onChange={(e) => handleOrderByStr(e)}>
                <option value="asc_str">Mayor a Menor Fuerza</option>
                <option value="des_str">Menor a Mayor Fuerza</option>
              </select>
            </div>
            <div>
              <select onChange={(e) => handleFilterType(e)}>
                <option value="all">Todos</option>
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
                <option value="all">Todos</option>
                <option value="createdInDb">Creados</option>
                <option value="api">API</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className={s.main}>
        <div className={s.cards}>
          {currentPokemons &&
            currentPokemons.map((p) => (
              <Card name={p.name} type={p.type} img={p.img} key={p.id} />
            ))}
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
