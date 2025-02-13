"use client";
import React from "react";
import { MdCatchingPokemon } from "react-icons/md";
import pokeColor from "../lib/pokeColor.js";
import PetHearts from "./PetHearts.jsx";

export default function PokemonDetails({
  pokemon,
  setSelectedPokemon,
  isSelectPokemon,
  selectedPokemon,
  showHearts,
  isProfilePage,
  showRunawayMessage,
}) {
  const isSelected =
    selectedPokemon && selectedPokemon.pokedexId === pokemon.pokedexId;

  const gradient = pokeColor[pokemon.type.toLowerCase()] || {
    start: "#ffffff",
    end: "#ffffff",
  };

  const gradientBackground = `linear-gradient(45deg, ${gradient.start}, ${gradient.end})`;

  const handleClick = () => {
    if (isSelectPokemon) {
      setSelectedPokemon(pokemon);
    }
  };

  return (
    <>
      <div>
        {pokemon.isActive
          ? showHearts && <PetHearts pokemon={pokemon} showHearts={true} />
          : showRunawayMessage && (
              <p>Pet has Runaway!</p>
            )}
        <div>
          <div
            // className={`${} ${
            //   isSelected ? styles.selectedPokemonContainer : ""
            // }`}
            style={{
              background: `url("/poke300.png"), ${gradientBackground}`,
            }}
            onClick={handleClick}
          >
            <div key={pokemon.pokedexId}>
              <div>
                <p>
                  {pokemon.capitalizedName || pokemon.name}
                </p>

                <div>
                  <div>
                    {pokemon.isRare && (
                      <p>
                        <span>🌟</span> Rare
                      </p>
                    )}

                    {pokemon.isShiny && (
                      <p>
                        <span>✨</span> Shiny
                      </p>
                    )}
                    {!pokemon.isRare && !pokemon.isShiny && (
                      <p>Common</p>
                    )}
                  </div>
                  <p>Type: {pokemon.type}</p>
                  <img
                    // className={`${styles.pokemon} ${
                    //   isSelected ? styles.selectedPokemon : ""
                    // }`}
                    src={pokemon.spriteUrl}
                    alt={`${pokemon.name} sprite`}
                  />
                </div>
                {pokemon.isPokedexIdInCollection ? (
                  <MdCatchingPokemon />
                ) : !isProfilePage ? (
                  <p>Collect me!</p>
                ) : (
                  <MdCatchingPokemon />
                )}
                {pokemon.nickname ? (
                  <p>
                    {pokemon.isPaused
                      ? `💤 ${pokemon.nickname} 💤`
                      : pokemon.nickname}
                  </p>
                ) : (
                  <p>Name Me!</p>
                )}
              </div>
              <p>Pokedex #{pokemon.pokedexId}</p>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
