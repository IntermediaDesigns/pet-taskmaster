import React from "react";
import { prisma } from "@/lib/prisma.js";
import SinglePetInfo from "@/app/components/SinglePetPage.jsx";
import { fetchUser } from "@/lib/fetchUser.js";

export default async function PetPage({ params }) {
  const petId = params.petId;
  const pet = await prisma.pet.findFirst({ where: { id: petId } });
  const user = await fetchUser();
  const wallet = await prisma.wallet.findFirst({ where: { userId: user.id } });
  const tasks = await prisma.task.findMany({ where: { petId } });
  const collection = await prisma.user.findFirst({
    where: { id: user.id },
    select: { collectedPets: true },
  });

  const pokemon = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pet.pokedexId}`
  );
  const pokemonData = await pokemon.json();

  return (
    <SinglePetInfo
      pet={pet}
      pokemonData={pokemonData}
      user={user}
      tasks={tasks}
      collection={collection}
      wallet={wallet}
    />
  );
}
