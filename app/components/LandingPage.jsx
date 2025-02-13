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
      <section className="h-96 mt-32 flex items-center justify-center ">
        <div className="flex justify-between items-center w-[850px] gap-4">
          <div className="flex flex-col items-center w-full">
            {randomPokemon && (
              <div className="flex flex-col items-center w-[250px]">
                <PokemonDetails
                  key={randomPokemon.name}
                  pokemon={randomPokemon}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between">
            <p className="font-Sansita text-5xl border-b-4 border-b-primary pb-7">
              Pet Taskmaster
            </p>

            <p className="font-Jura text-2xl mb-3 pt-7">
              Welcome to Pet Taskmaster - Where Pet Passion Meets Play!
            </p>

            <p className="font-Jura text-2xl">
              Start your journey with Pet Taskmaster and receive your first pet
              for free! Engage in delightful activities, earn coins, and unlock
              a world of possibilities in our virtual store.
            </p>
          </div>
        </div>
      </section>

      {/* About Container */}
      <section id="about" className="h-[980px] bg-primary/90">
        <div className="p-8">
          <div>
            <p className="font-Sansita text-5xl font-bold text-muted">ABOUT</p>
            <div className="flex justify-between items-center gap-7">
              <p className="font-Jura text-4xl text-secondary">
                Welcome to Pet Taskmaster, the ultimate pet adventure game that
                brings fun and responsibility together!
              </p>
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
                alt=""
                className="w-64"
              />
            </div>

            <div>
              <p className="text-white text-3xl font-Jura underline underline-offset-[10px] decoration-2 pb-6">
                Your Mission
              </p>
              <p className="font-Jura text-white text-2xl pb-6">
                In this exciting world, you get to choose your own pet and
                embark on a journey filled with tasks and challenges. Your
                mission? Keep your pet happy and prevent it from running away by
                accomplishing bonus tasks. But that’s not all!
              </p>

              <p className="text-white text-3xl font-Jura underline underline-offset-[10px] decoration-2 pb-6">
                Earn and Spend Coins
              </p>
              <p className="font-Jura text-white text-2xl pb-6">
                As you progress, you’ll earn coins that open up a world of
                possibilities. Want to add more pets to your collection? Trade
                in your coins at our store. Fancy a different kind of pet? Use
                your coins to evolve your current pet into a new form. Or maybe
                you’ve always wanted a rare pet? Save up and buy one from our
                store!
              </p>
              <p className="text-white text-3xl font-Jura underline underline-offset-[10px] decoration-2 pb-6">
                Join the Community
              </p>
              <p className="font-Jura text-white text-2xl pb-12">
                Pet Taskmaster is more than just a game - it’s a vibrant
                community of pet lovers and taskmasters just like you. So why
                wait? Sign up today and let the fun begin!
              </p>
            </div>
            {!user.id && (
              <div>
                <Link
                  href={"/register"}
                  className="rounded-xl bg-button1 px-4 py-2 text-black text-center font-Jura text-lg shadow-xl hover:bg-hover1"
                >
                  Sign Up!
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Video Container */}
      <section className="h-[800px]">
        <div className="flex flex-col gap-8 items-center p-8">
          <CgPokemon className="text-8xl" />
          <p className="font-Sansita text-6xl">Pet Taskmaster in Action!</p>
          <div className="w-[850px] h-[500px] bg-muted/90 rounded-lg flex justify-center items-center shadow-xl">
            <video
              width="800"
              height="500"
              src="./appClip.mp4"
              loop
              autoPlay
              className="rounded-md shadow-lg"
            ></video>
          </div>
        </div>
      </section>

      {/* Store Container */}
      <section className="h-[600px] bg-primary/90 p-8">
        <p className="font-Sansita text-6xl text-muted pb-6 text-center">
          Featured Pets of the Day!
        </p>
        <div className="flex flex-col items-center p-12">
          <div className="pb-12">
            <StoreInventoryPets
              showHearts={false}
              collection={collection}
            />
          </div>
          <div>
            <Link href={`/store`} className="rounded-xl bg-button1 px-4 py-2 text-black text-center font-Jura text-lg shadow-xl hover:bg-hover1">See Store!</Link>
          </div>
        </div>
      </section>
      {/*  Task Container */}
      <section className="h-[1050px] p-8">
        <div className="flex flex-col items-center gap-8">
          <p className="font-Sansita text-6xl">Complete Tasks!</p>
          <div className="flex flex-col justify-between items-center gap-7 text-center">
            <p className="font-Jura text-2xl">
              Welcome to Pet Taskmaster, the fun and engaging app that turns
              your daily tasks into an exciting adventure!{" "}
            </p>

            <p className="font-Jura text-2xl">
              Here, every task you complete earns you coins, and these coins are
              key to keeping your adorable pet from running away. Remember, your
              pet thrives on your productivity!{" "}
            </p>

            <img src="/tasks.png" alt="tasks" className="w-[500px] shadow-lg rounded-2xl" />

            <p className="font-Jura text-2xl">
              The more tasks you complete, the happier your pet stays. So, let’s
              get those tasks done and keep your pet by your side. After all, a
              task completed is a coin earned, and a happy pet in return.{" "}
            </p>

            <p className="font-Jura text-2xl">
              {" "}
              Start your journey with Pet Taskmaster today and transform your
              everyday tasks into a thrilling quest!
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
