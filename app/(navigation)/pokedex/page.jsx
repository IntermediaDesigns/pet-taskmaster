import Pokedex from "@/app/components/Pokedex.jsx";
import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";

export default async function PokedexPage() {
  const user = await fetchUser();

  let collection = null;
  if (user.id) {
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: { collectedPets: true },
    });

    collection = userData.collectedPets;
  }

  return <Pokedex collection={collection} />;
}
