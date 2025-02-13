"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import BacktoProfile from "../components/BacktoProfile.jsx";
import PokemonDetails from "../components/PokemonDetails.jsx";
import { useRouter } from "next/navigation";

export default function SelectPet({ user }) {
  const [starterArray, setStarterArray] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [nickname, setNickname] = useState("");
  const [starterPokemon, setStarterPokemon] = useState(null);
  const [section, setSection] = useState("selectPet");
  const [userPokemon, setUserPokemon] = useState(null);
  const [error, setError] = useState("");

  const router = useRouter();

  async function fetchUserPokemon() {
    const response = await fetch("/api/pets", {
      headers: { "Content-Type": "application/json" },
    });

    const info = await response.json();
    setUserPokemon(info.pets);
  }

  async function fetchPokemon() {
    const starters = [];

    const starterId = [1, 4, 7, 25, 147];

    for (let i = 0; i < starterId.length; i++) {
      const request = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${starterId[i]}`
      );
      const pokemonData = await request.json();

      const pokemonObject = {
        pokedexId: pokemonData.id,
        name: pokemonData.name,
        capitalizedName:
          pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1),
        type: pokemonData.types[0].type.name,
        spriteUrl: pokemonData.sprites.front_default,
      };
      starters.push(pokemonObject);
    }
    setStarterArray(starters);
  }

  useEffect(() => {
    fetchPokemon();
    fetchUserPokemon();
  }, []);

  function handleConfirmPet() {
    if (!selectedPokemon) {
      return setError("Please select a starter pokemon!");
    }
    setError("");
    setSection("namePet");
  }

  async function handleSubmit() {
    const response = await fetch("/api/pets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nickname,
        name: selectedPokemon.capitalizedName,
        type: selectedPokemon.type,
        pokedexId: selectedPokemon.pokedexId,
        spriteUrl: selectedPokemon.spriteUrl,
        collectedNumber: selectedPokemon.pokedexId,
        isStarter: true,
      }),
    });
    const info = await response.json();

    getStarter(info.pet.id);

    setSection("congrats");
    setSelectedPokemon(null);
    setNickname("");
    router.refresh();
  }

  async function getStarter(petId) {
    const response = await fetch(`/api/pets/${petId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const info = await response.json();

    setStarterPokemon(info.pet);
  }

  return (
    <>
      {userPokemon && userPokemon.length > 0 ? (
        <BacktoProfile user={user} />
      ) : (
        <div>
          {/* Select a pet section */}
          {section === "selectPet" && (
            <>
              <p>Select a Pet!</p>

              <div>
                {starterArray.map((pokemon) => (
                  <PokemonDetails
                    key={pokemon.pokedexId}
                    pokemon={pokemon}
                    setSelectedPokemon={setSelectedPokemon}
                    selectedPokemon={selectedPokemon}
                    isSelectPokemon={true}
                    showRunawayMessage={false}
                  />
                ))}
              </div>
              <button
                onClick={handleConfirmPet}
              >
                Confirm
              </button>
              <p>{error}</p>
            </>
          )}

          {/* Name your pet section */}
          {section === "namePet" && (
            <>
              <div>
                <p>Name your 1st Pet!</p>
              </div>

              <div>
                <input
                  value={nickname}
                  type="text"
                  placeholder="Enter a pet name.."
                  onChange={(e) => setNickname(e.target.value)}
                />
                <button
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </>
          )}

          {/* Congrats section */}
          {section === "congrats" && (
            <>
              <div>
                <div>
                  <p>Congratulations!</p>
                  <div>
                    {/* <PokemonDetails pokemon={starterPokemon} /> */}
                    {starterPokemon && (
                      <PokemonDetails
                        pokemon={starterPokemon}
                        isProfilePage={true}
                        showRunawayMessage={false}
                      />
                    )}
                  </div>
                  <p>
                    You've successfully chosen your pet. This is a big step in
                    your journey. Your pet is eager to grow and evolve, and it's
                    all up to you now.
                  </p>{" "}
                  <br />
                  <p>
                    Remember, every task you complete will help your pet. The
                    more tasks you do, the faster your pet will evolve. It's not
                    just about helping your pet grow, it's about growing
                    yourself too.
                  </p>{" "}
                  <br />
                  <p>
                    So, let's get started! Your pet is excited to see what you
                    can achieve together.
                  </p>
                  <br />
                  <p>
                    Click on your pet for more details or go to your tasks to
                    get started!
                  </p>
                  <br />
                  <div>
                    <Link href={"/store"}>
                      Go to store
                    </Link>
                    <Link
                      href={"/user/userId"}
                    >
                      Profile
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
