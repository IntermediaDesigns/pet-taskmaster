"use client";
import React, { useEffect, useState } from "react";
import { MdCatchingPokemon } from "react-icons/md";
import PokemonDetails from "./PokemonDetails";

export default function PokemonList({ startId, endId, collection }) {
  const [pokemonArray, setPokemonArray] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPokemonRange = async () => {
      const newArray = [];

      for (let id = startId; id <= endId; id++) {
        try {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${id}`
          );

          const pokemonData = await response.json();

          //checks for legendary or mythical status
          let isRare = false;
          let rarityResponse = await fetch(
            `https://pokeapi.co/api/v2/pokemon-species/${pokemonData.id}/`
          );
          let rarityData = await rarityResponse.json();

          if (rarityData.is_legendary || rarityData.is_mythical) {
            isRare = true;
          }

          //checks if collected
          let isPokedexIdInCollection = null;

          if (collection) {
            isPokedexIdInCollection = collection.includes(+pokemonData.id);
          }

          const pokemonObject = {
            pokedexId: pokemonData.id,
            name: pokemonData.name,
            capitalizedName:
              pokemonData.name.charAt(0).toUpperCase() +
              pokemonData.name.slice(1),
            type: pokemonData.types[0].type.name,
            spriteUrl: pokemonData.sprites.front_default,
            isRare,
            isPokedexIdInCollection,
          };

          newArray.push(pokemonObject);
        } catch (error) {
          setError(`Error fetching Pokémon with ID ${id}:`, error.message);
        }
      }

      setPokemonArray(newArray);
    };
    fetchPokemonRange();
  }, [startId, endId]);

  return (
    <>
      <div>
        <h1>Explore Our Pet Selection</h1>
        <div>
          <p>Total Collected Pets</p>
          <div>
          {collection && <p><MdCatchingPokemon />{collection.length} / 151</p>}</div>
        </div>
        <div>
          {pokemonArray.map((pokemon) => (
            <PokemonDetails key={pokemon.pokedexId} pokemon={pokemon} isProfilePage={false} showRunawayMessage={false}/>
          ))}
        </div>
        <p>{error}</p>
      </div>
    </>
  );
}
