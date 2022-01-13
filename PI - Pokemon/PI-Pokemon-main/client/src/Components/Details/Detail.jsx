import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById } from "../../redux/actions";

export default function Detail(props) {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getPokemonById(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  return (
    <div>
      <div>
        <h1>
          {pokemon.id} {pokemon.name}
        </h1>
      </div>
      <div>
        <img src={pokemon.img} alt="Pokemon frontal pic" />
      </div>
      <div>
        <h3>Type: {pokemon.types && pokemon.types.join(", ")}</h3>
      </div>
      <div>
        <h3>Estadisticas:</h3>
        <p>Vida: {pokemon.hp}</p>
        <p>Fuerza: {pokemon.attack}</p>
        <p>Defensa: {pokemon.defense}</p>
        <p>Velocidad: {pokemon.speed}</p>
        <p>Altura: {pokemon.height}</p>
        <p>Peso: {pokemon.weight}</p>
      </div>
    </div>
  );
}
