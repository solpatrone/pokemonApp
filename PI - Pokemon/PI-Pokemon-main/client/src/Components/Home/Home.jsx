import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card";
// import Paginado from "../Paginado/Paginado";
import s from "./Home.module.css";
// import logo from "../../images/log.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../../redux/actions";

export default function Home() {
  const dispatch = useDispatch();
  //idem a mapStateToProps
  const allPokemons = useSelector((state) => state.pokemons);

  useEffect(() => {
    //hago el dispatch de la accion (idem mapDispatchToProps)
    dispatch(getAllPokemons());
  }, [dispatch]);

  return (
    <div className={s.container}>
      <header className={s.header}>
        <div className={s.imageContainer}>
          {/* <img src={logo} alt="Logo pokemon" /> */}
          <SearchBar />
          <Link to="/create_pokemon">Crear Pokemon</Link>
        </div>
        <div className={s.btnContainer}>
          <select>
            <option value="asc_alf">A a Z</option>
            <option value="des_alf">Z a A</option>
            <option value="asc_str">Mayor a Menor Fuerza</option>
            <option value="des_str">Menor a Mayor Fuerza</option>
          </select>
          <select>
            {/* mapear todos los tipos para crear las opciones */}
            <option value="tipo">Tipo1</option>
          </select>
          <select>
            <option value="created">Creados</option>
            <option value="api">API</option>
            <option value="all">Todos</option>
          </select>
        </div>
      </header>
      <main>
        {allPokemons &&
          allPokemons.map((p) => (
            <Card name={p.name} type={p.type} img={p.img} key={p.id} />
          ))}

        {/* <Paginado /> */}
      </main>
      <footer>App created by Sol Patrone</footer>
    </div>
  );
}
