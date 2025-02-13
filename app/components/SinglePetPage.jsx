"use client";
import { useState } from "react";
import CreateTask from "./CreateTask.jsx";
import DisplayTasks from "./DisplayTasks.jsx";
import EvolvePet from "./EvolvePet.jsx";
import PetHearts from "./PetHearts.jsx";
import { useRouter } from "next/navigation.js";

export default function SinglePetInfo({
  pokemonData,
  pet,
  user,
  tasks,
  collection,
  wallet,
}) {
  const router = useRouter();

  const imageSrc = pet.isShiny
    ? pokemonData.sprites.other["official-artwork"].front_shiny
    : pokemonData.sprites.other["official-artwork"].front_default;

  const [error, setError] = useState("");

  const purchasePet = async () => {
    // Code to purchase the pet back
    if (wallet.coin < 200) {
      return setError("Not enough coins to purchase pet back");
    }
    const response = await fetch(`/api/pets/${pet.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isActive: true,
        hearts: 2,
      }),
    });
    const info = await response.json();

    setError("");
    router.refresh();
  };

  async function handlePausePet() {
    const response = await fetch(`/api/pets/${pet.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isPaused: !pet.isPaused,
      }),
    });

    const info = await response.json();

    router.refresh();
  }

  return (
    <>
      <div>
        <div>
          <div>
            <img src={imageSrc} alt={`${pokemonData.name} sprite`} />
            <div>
              {pet.isActive && pet.hearts === 5 && (
                <EvolvePet pet={pet} collection={collection} wallet={wallet} />
              )}
            </div>
            <div>
              {pet.isActive && <PetHearts pokemon={pet} showHearts={true} />}
            </div>
          </div>
          <div>
            <div>
              <div>
                <p>
                  <span>Name: </span>{" "}
                  {pet.nickname}
                </p>
                <p>
                  <span>Species:</span>{" "}
                  {pet.name}
                </p>

                <div>
                  <p>Abilities:</p>
                  <div>
                    {pokemonData.abilities.map((ability) => (
                      <p
                        key={ability.ability.name}
                      >
                        {ability.is_hidden && (
                          <span>
                            <br />
                            Hidden:
                            <br />{" "}
                          </span>
                        )}
                        {ability.ability.name.charAt(0).toUpperCase() +
                          ability.ability.name.slice(1)}
                        {ability.is_hidden && " "}
                      </p>
                    ))}
                  </div>
                </div>
                <br />
                <br />
                <div>
                  <p>Base Stats:</p>
                  <ul>
                    <li>HP: {pokemonData.stats[0].base_stat}</li>
                    <li>Attack: {pokemonData.stats[1].base_stat}</li>
                    <li>Defense: {pokemonData.stats[2].base_stat}</li>
                    <li>Special Attack: {pokemonData.stats[3].base_stat}</li>
                    <li>Special Defense: {pokemonData.stats[4].base_stat}</li>
                    <li>Speed: {pokemonData.stats[5].base_stat}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {pet.isActive && !pet.isPaused ? (
          <div>
            <button onClick={handlePausePet}>
              Pause Pet (Pause Tasks)
            </button>
            <CreateTask user={user} pet={pet} />
            <DisplayTasks tasks={tasks} pet={pet} />
          </div>
        ) : pet.isPaused ? (
          <div>
            <p>Pet is sleeping</p>
            <button onClick={handlePausePet}>
              Wake Up Pet!
            </button>
          </div>
        ) : (
          <div>
            <p >Pet has Runaway!</p>
            <button onClick={purchasePet}>
              Purchase Pet Back 200 Coin
            </button>
            <p>{error}</p>
          </div>
        )}
      </div>
    </>
  );
}
