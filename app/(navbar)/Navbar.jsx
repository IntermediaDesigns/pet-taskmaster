import React from "react";
import Link from "next/link";
import { MdCatchingPokemon } from "react-icons/md";
import { RiCoinsFill } from "react-icons/ri";
import Logout from "../components/Logout.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { fetchUser } from "../lib/fetchUser.js";
import { prisma } from "../lib/prisma.js";
import GenerateBonusTask from "../components/GenerateBonusTask.jsx";

export default async function Navbar() {
  try {
    const user = await fetchUser();
    
    // Early return for non-authenticated users
    if (!user?.id) {
      return (
        <div>
          <div>
            <Link href={"/"}>
              <img src="/Logo.png" alt="Logo" />
            </Link>
            <div>
              <Sidebar user={user} />
            </div>
          </div>

          <p>Pet Taskmaster</p>

          <div>
            <Link href={"/login"}>
              Login
            </Link>
            <Link href={"/register"}>
              Sign Up
            </Link>
          </div>
        </div>
      );
    }

    // Only query wallet and pets if we have an authenticated user
    const [wallet, pets] = await Promise.all([
      prisma.wallet.findFirst({ 
        where: { userId: user.id }
      }),
      prisma.pet.findMany({
        where: { userId: user.id },
        include: { task: true },
      })
    ]);

    // Verify wallet exists
    if (!wallet) {
      throw new Error('Wallet not found for user');
    }

    return (
      <>
        {pets?.map((pet) => (
          <GenerateBonusTask key={pet.id} pet={pet} />
        ))}
        
        <div>
          <div>
            <Link href={"/"}>
              <img src="/Logo.png" alt="Logo" />
            </Link>
            <div>
              <Sidebar user={user} />
            </div>
          </div>

          <p>Pet Taskmaster</p>

          <div>
            <div>
              Welcome {user.username}!
              <p>
                Coins: <RiCoinsFill />{" "}
                <span>{wallet.coin}</span>{" "}
              </p>
              <p>
                Pets:
                <span>
                  {" "}
                  <MdCatchingPokemon /> {pets?.length || 0}
                </span>{" "}
              </p>
            </div>
            <Logout />
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error('Error in Navbar:', error);
    // Return a minimal navbar with error state
    return (
      <div>
        <Link href={"/"}>
          <img src="/Logo.png" alt="Logo" />
        </Link>
        <p>Pet Taskmaster</p>
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }
}