"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import StoreInventoryPets from "@/app/components/StoreInventoryPets.jsx";
import PokemonDetails from "./PokemonDetails.jsx";

export default function Store({ user, wallet, collection }) {
  const router = useRouter();
  const [section, setSection] = useState("selectPet");
  const [nickname, setNickname] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [purchasedPet, setPurchasedPet] = useState(null);
  const [cost, setCost] = useState(0);
  const [error, setError] = useState("");
  const [purchaseMessage, setPurchaseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    if (!nickname) {
      setLoading(false);
      return setError("Please provide a nickname for your Pet!");
    }

    if (cost > wallet.coin) {
      setLoading(false);
      setError("Insufficient funds. Please add more coins to your wallet.");
    }

    const isPokedexIdInCollection = collection.includes(
      +selectedPokemon.pokedexId
    );

    const response = await fetch("/api/pets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nickname,
        name: selectedPokemon.capitalizedName,
        type: selectedPokemon.type,
        pokedexId: selectedPokemon.pokedexId,
        spriteUrl: selectedPokemon.spriteUrl,
        isRare: selectedPokemon.isRare,
        isShiny: selectedPokemon.isShiny,
        collectedNumber: isPokedexIdInCollection
          ? null
          : selectedPokemon.pokedexId,
      }),
    });

    const info = await response.json();

    if (info.pet) {
      getPurchasedPet(info.pet.id);
      handlePurchase();
      setError("");
      setNickname("");
      setSection("congrats");
    } else {
      setError("Failed to create pet. Please try again.");
    }
    setLoading(false);
  }

  async function getPurchasedPet(petId) {
    const response = await fetch(`/api/pets/${petId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const info = await response.json();

    setPurchasedPet(info.pet);
  }

  function handleCancel() {
    setSection("selectPet");
    setCost(0);
    setSelectedPokemon(null);
    setError("");
    setNickname("");
    router.refresh();
  }

  async function handlePurchase() {
    const coinChange = wallet.coin - cost;

    const response = await fetch(`/api/wallet`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ coinChange }),
    });

    const info = await response.json();

    router.refresh();
  }

  return (
    <>
      <div>
        {section === "selectPet" && (
          <div>
            <p>Featured Pets of the Day!</p>
            <div>
              <StoreInventoryPets
                isStore={true}
                setSection={setSection}
                user={user}
                setSelectedPokemon={setSelectedPokemon}
                selectedPokemon={selectedPokemon}
                setCost={setCost}
                wallet={wallet}
                setError={setError}
                isProfilePage={false}
                collection={collection}
              />
              <p>{error}</p>
            </div>
          </div>
        )}

        {section === "namePet" && (
          <>
            <div>
              {selectedPokemon && (
                <PokemonDetails
                  pokemon={selectedPokemon}
                  isProfilePage={false}
                  showRunawayMessage={false}
                />
              )}

              <p>Name your Pet!</p>
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
                disabled={loading}
              >
                {loading
                  ? "Completing Purchase..."
                  : `Complete Purchase (${selectedPokemon.cost} Coins)`}
              </button>
              <button onClick={handleCancel}>
                Cancel
              </button>
            </div>
            <p>{error}</p>
          </>
        )}

        {section === "congrats" && (
          <>
            <div>
              <div>
                <p>Congratulations!</p>
                <div>
                  {purchasedPet && (
                    <PokemonDetails
                      pokemon={purchasedPet}
                      isProfilePage={true}
                      showRunawayMessage={false}
                    />
                  )}
                </div>
                <p>
                  You've successfully bought your pet. This is a big step in
                  your journey. Your pet is eager to grow and evolve, and it's
                  all up to you now.
                </p>
                <br />
                <p>
                  Remember, every task you complete will help your pet. The more
                  tasks you do, the faster your pet will evolve. It's not just
                  about helping your pet grow, it's about growing yourself too.
                </p>
                <br />
                <p>
                  So, let's get started! Your pet is excited to see what you can
                  achieve together.
                </p>
                <br />
                <p>
                  Click on your pet for more details or go to your tasks to get
                  started!
                </p>
                <br />
                <div>
                  <Link
                    href={"/store"}
                    onClick={handleCancel}
                  >
                    Back to store
                  </Link>
                  <Link href="user/userId">
                    Profile
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
