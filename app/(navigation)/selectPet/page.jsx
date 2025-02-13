import SelectPet from "@/app/components/SelectPet.jsx";
import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";

export default async function SelectPetPage() {
  const user = await fetchUser();
  let collection = null;
  if (user.id) {
    collection = await prisma.user.findFirst({
      where: { id: user.id },
      select: { collectedPets: true },
    });
  }

  return <SelectPet user={user} collection={collection} />;
}
