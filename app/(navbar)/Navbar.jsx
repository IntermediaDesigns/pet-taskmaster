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
    if (!user?.id) {
      return (
        <nav className="h-24 w-full bg-primary/90 fixed">
          <div className=" flex items-center justify-evenly">
            <Link href={"/"}>
              <img src="/Logo.png" alt="Logo" className="w-32 rounded-br-3xl" />
            </Link>
            <div className="flex justify-between items-center py-4">
              <p>Pet Taskmaster</p>

              <div>
                <Link href={"/login"}>Login</Link>
                <Link href={"/register"}>Sign Up</Link>
              </div>
            </div>
          </div>
          <div>
            <Sidebar user={user} />
          </div>
        </nav>
      );
    }

    const [wallet, pets] = await Promise.all([
      prisma.wallet.findFirst({
        where: { userId: user.id },
      }),
      prisma.pet.findMany({
        where: { userId: user.id },
        include: { task: true },
      }),
    ]);

    // Verify wallet exists
    if (!wallet) {
      throw new Error("Wallet not found for user");
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
                Coins: <RiCoinsFill /> <span>{wallet.coin}</span>{" "}
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
    console.error("Error in Navbar:", error);
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
