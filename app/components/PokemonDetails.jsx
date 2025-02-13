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
            className="rounded-md"
          >
            <div key={pokemon.pokedexId} className="flex flex-col items-center">
              <div className="flex flex-col items-center w-[205px] h-[267px]">
                <p className="font-Sansita text-xl pt-3 text-center">
                  {pokemon.capitalizedName || pokemon.name}
                </p>

                <div className="flex flex-col items-center">
                  <div className="flex flex-col">
                    {pokemon.isRare && (
                      <p className="font-Jura text-md pb-1">
                        <span>🌟</span> Rare
                      </p>
                    )}

                    {pokemon.isShiny && (
                      <p className="font-Jura text-md">
                        <span className="text-gray-300">✨</span> Shiny
                      </p>
                    )}
                    {!pokemon.isRare && !pokemon.isShiny && (
                      <p className="font-Jura text-md pb-1">Common</p>
                    )}
                  </div>
                  <p className="font-Jura text-md">Type: {pokemon.type}</p>
                  <img
                    // className={`${styles.pokemon} ${
                    //   isSelected ? styles.selectedPokemon : ""
                    // }`}
                    src={pokemon.spriteUrl}
                    alt={`${pokemon.name} sprite`}
                    className="w-[110px] top-[-15px] relative z-10 p-0 m-0"
                  />
                </div>
                {pokemon.isPokedexIdInCollection ? (
                  <MdCatchingPokemon className="text-ltgreen" />
                ) : !isProfilePage ? (
                  <p className="text-md font-Jura text-ltblue relative top-[-20px]">Collect me!</p>
                ) : (
                  <MdCatchingPokemon />
                )}
                {pokemon.nickname ? (
                  <p className="font-Pokemon text-2xl">
                    {pokemon.isPaused
                      ? `💤 ${pokemon.nickname} 💤`
                      : pokemon.nickname}
                  </p>
                ) : (
                  <p className="font-Pokemon text-2xl tracking-wider relative top-[-25px] ">Name Me!</p>
                )}
              </div>
              <p className="font-Jura text-2xl relative top-[-20px]">Pokedex #{pokemon.pokedexId}</p>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
