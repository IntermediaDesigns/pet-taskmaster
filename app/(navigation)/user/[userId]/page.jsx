import Link from "next/link.js";
import PokemonDetails from "../../../components/PokemonDetails.jsx";
import { fetchUser } from "../../lib/fetchUser.js";
import { prisma } from "../../lib/prisma.js";

export default async function ProfilePage() {
  const user = await fetchUser();

  let userPokemon = null;

  if (user.id) {
    userPokemon = await prisma.pet.findMany({
      where: {
        userId: user.id,
      },
    });
  }

  return (
    <>
      {user.id ? (
        <div>
          <h1>Welcome {user.username}!</h1>

          <div></div>

          <div>
            <div>
              {userPokemon.length > 0 ? (
                userPokemon.map((pokemon) => (
                  <div key={pokemon.id}>
                    <PokemonDetails
                      pokemon={pokemon}
                      showHearts={true}
                      isProfilePage={true}
                      showRunawayMessage={true}
                    />
                    <Link
                      href={`/pet/${pokemon.id}`}
                    >
                      Pet Details Page
                    </Link>
                  </div>
                ))
              ) : (
                <div>
                  <p>
                    Looks like you need to select your 1st pet!{" "}
                  </p>
                  <p>
                    Select a pet to get started!
                  </p>
                  <Link href={"/selectPet"}>
                    <button>
                      Select a pet!
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>
            Please Log in/Register to View your Profile
          </p>
        </div>
      )}
    </>
  );
}
