"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link.js";
import { CgPokemon } from "react-icons/cg";
import PokemonDetails from "./PokemonDetails.jsx";
import StoreInventoryPets from "./StoreInventoryPets";

export default function LandingPage({ user, collection }) {
  const [pokemonArray, setPokemonArray] = useState([]);

  async function fetchPokemon() {
    const pokemons = [];

    const pokemonId = [11, 19, 23, 39, 56, 77, 124, 132, 133, 143, 147, 151];

    for (let i = 0; i < pokemonId.length; i++) {
      const request = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId[i]}`
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

      pokemons.push(pokemonObject);
    }
    setPokemonArray(pokemons);
  }

  useEffect(() => {
    fetchPokemon();
  }, []);

  const randomIndex = Math.floor(Math.random() * pokemonArray.length);
  const randomPokemon = pokemonArray[randomIndex];

  return (
    <>
      {/* Hero Container */}
      <div>
        <div>
          <div>
            {randomPokemon && (
              <div>
                <PokemonDetails
                  key={randomPokemon.name}
                  pokemon={randomPokemon}
                />
              </div>
            )}
          </div>

          <div>
            <p>Pet Taskmaster</p>
            <hr />
            <p>
              Welcome to Pet Taskmaster - Where Pet Passion Meets Play!
            </p>

            <p>
              Start your journey with Pet Taskmaster and receive your first pet
              for free! Engage in delightful activities, earn coins, and unlock
              a world of possibilities in our virtual store.
            </p>
          </div>
        </div>
      </div>

      {/* About Container */}
      <div id="aboutSection">
        <div>
          <div>
            <p>ABOUT</p>
            <div>
              <p>
                Welcome to Pet Taskmaster, the ultimate pet adventure game that
                brings fun and responsibility together!
              </p>
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
                alt=""
              />
            </div>

            <div>
              <p>Your Mission</p>
              <p>
                In this exciting world, you get to choose your own pet and
                embark on a journey filled with tasks and challenges. Your
                mission? Keep your pet happy and prevent it from running away by
                accomplishing bonus tasks. But that’s not all!
              </p>

              <p>Earn and Spend Coins</p>
              <p>
                As you progress, you’ll earn coins that open up a world of
                possibilities. Want to add more pets to your collection? Trade
                in your coins at our store. Fancy a different kind of pet? Use
                your coins to evolve your current pet into a new form. Or maybe
                you’ve always wanted a rare pet? Save up and buy one from our
                store!
              </p>
              <p>Join the Community</p>
              <p>
                Pet Taskmaster is more than just a game - it’s a vibrant
                community of pet lovers and taskmasters just like you. So why
                wait? Sign up today and let the fun begin!
              </p>
            </div>
            {!user.id && (
              <div>
                <Link href={"/register"}>
                  Sign Up!
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Video Container */}
      <div>
        <div>
          <CgPokemon />
          <p>Pet Taskmaster in Action!</p>
          <div>
            <video
              width="800"
              height="500"
              src="./appClip.mp4"
              loop
              autoPlay
            ></video>
          </div>
        </div>
      </div>

      {/* Store Container */}
      <div>
        <p>Featured Pets of the Day!</p>
        <div>
          <StoreInventoryPets showHearts={false} collection={collection} />
        </div>
        <div>
          <Link href={`/store`}>
            See Store!
          </Link>
        </div>
      </div>
      {/*  Task Container */}
      <div>
        <div>
          <p>Complete Tasks!</p>
          <div>
            <p>
              Welcome to Pet Taskmaster, the fun and engaging app that turns
              your daily tasks into an exciting adventure!{" "}
            </p>

            <p>
              Here, every task you complete earns you coins, and these coins are
              key to keeping your adorable pet from running away. Remember, your
              pet thrives on your productivity!{" "}
            </p>

            <img
              src="/tasks.png"
              alt="tasks"
            />

            <p>
              The more tasks you complete, the happier your pet stays. So, let’s
              get those tasks done and keep your pet by your side. After all, a
              task completed is a coin earned, and a happy pet in return.{" "}
            </p>

            <p>
              {" "}
              Start your journey with Pet Taskmaster today and transform your
              everyday tasks into a thrilling quest!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
