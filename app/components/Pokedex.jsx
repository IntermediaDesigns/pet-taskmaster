"use client";
import React, { useState } from "react";
import PokemonList from "./PokemonList.jsx";

export default function Pokedex({ collection }) {
  const [startId, setStartId] = useState(1);
  const [endId, setEndId] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  async function handleShowMore() {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay
    if (endId + 10 <= 151) {
      setEndId((prevEndId) => prevEndId + 10);
      setStartId((prevStartId) => prevStartId + 10);
    } else {
      setEndId(151);
      setStartId(141);
    }

    setIsLoading(false);
  }

  async function handleShowLess() {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (startId - 10 >= 1) {
      setEndId((prevEndId) => prevEndId - 10);
      setStartId((prevStartId) => prevStartId - 10);
    } else {
      setStartId(1);
      setEndId(10);
    }
    setIsLoading(false);
  }

  return (
    <>
      <div>
        <PokemonList startId={startId} endId={endId} collection={collection} />
        <div>
          {endId > 10 ? (
            <button
              onClick={handleShowLess}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Previous 10"}
            </button>
          ) : null}

          {endId < 151 ? (
            <button
              onClick={handleShowMore}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Next 10"}
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}
