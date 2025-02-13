"use client";
import React, { useEffect, useState } from "react";
import { RiCoinsFill } from "react-icons/ri";
import { randomDataArray } from "../lib/randomStorePets.js";
import PokemonDetails from "./PokemonDetails.jsx";

export default function StoreInventoryPets({
  isStore,
  setSection,
  user,
  setSelectedPokemon,
  setError,
  selectedPokemon,
  setCost,
  wallet,
  collection,
}) {
  const [randomArray, setRandomArray] = useState(randomDataArray);
  const [inventoryArray, setInventoryArray] = useState(null);

  async function fetchInventory() {
    const inventory = [];

    for (let i = 0; i < randomArray.length; i++) {
      const { number, boolean } = randomArray[i];

      const request = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${number}`
      );
      const pokemonData = await request.json();

      let isRare = false;
      let rarityResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonData.id}/`
      );
      let rarityData = await rarityResponse.json();

      if (rarityData.is_legendary || rarityData.is_mythical) {
        isRare = true;
      }

      let cost = 20;

      if (boolean) {
        cost += 10;
      }

      if (isRare) {
        cost *= 2;
      }

      let isPokedexIdInCollection = null;
      if (collection) {
        isPokedexIdInCollection = collection.includes(+pokemonData.id);
      }
      const pokemonObject = {
        pokedexId: pokemonData.id,
        name: pokemonData.name,
        capitalizedName:
          pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1),
        type: pokemonData.types[0].type.name,
        spriteUrl: boolean
          ? pokemonData.sprites.front_shiny
          : pokemonData.sprites.front_default,
        isShiny: boolean,
        isRare,
        cost,
        isPokedexIdInCollection,
      };

      inventory.push(pokemonObject);
    }

    setInventoryArray(inventory);
  }

  useEffect(() => {
    fetchInventory();
  }, []);

  function handleSelectPurchase(pokemon) {
    if (wallet.coin < pokemon.cost) {
      return setError("You dont have enough coins to make this purchase!");
    }

    setSection("namePet");
    setSelectedPokemon(pokemon);
    setCost(pokemon.cost);
    setError("");
  }

  return (
    <>
      <div>
        {inventoryArray && (
          <div>
            {inventoryArray.map((pokemon) => (
              <div key={pokemon.pokedexId}>
                <div>
                  <PokemonDetails
                    key={pokemon.pokedexId}
                    pokemon={pokemon}
                    isProfilePage={false}
                    showRunawayMessage={false}
                  />

                  {isStore && user.id && (
                    <button
                      onClick={() => handleSelectPurchase(pokemon)}
                    >
                      Buy Pet for <RiCoinsFill />
                      {pokemon.cost}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
