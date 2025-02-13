import LandingPage from "./components/LandingPage.jsx";
import { fetchUser } from "./lib/fetchUser.js";
import { prisma } from "./lib/prisma.js";

// export const dynamic = "force-dynamic";
export default async function Home() {
  const user = await fetchUser();

  let collection = null;
  if (user.id) {
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: { collectedPets: true },
    });

    collection = userData.collectedPets;
  }

  return (
    <div>
      <LandingPage user={user} collection={collection} />
    </div>
  );
}
