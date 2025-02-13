import React from "react";
import { fetchUser } from "../../lib/fetchUser";
import { prisma } from "../../lib/prisma";

export default async function Wallet({}) {
  const user = await fetchUser();
  const userWallet = await prisma.wallet.findFirst({
    where: { userId: user.id },
  });
  return (
    <>
      <div>
        <p>Your Wallet</p>
        <p>
          Coins: <span>{userWallet?.coin}</span>
        </p>
      </div>
    </>
  );
}
