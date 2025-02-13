import { NextResponse } from "next/server.js";
import { fetchUser } from "../../lib/fetchUser.js";
import { prisma } from "../../lib/prisma.js";

export async function GET() {
  try {
    const user = await fetchUser();

    if (!user.id) {
      return NextResponse.json({
        success: false,
        message: "Please login/register!",
      });
    }

    const wallet = await prisma.wallet.findUnique({
      where: { userId: user.id },
    });

    return NextResponse.json({
      success: true,
      wallet,
      user,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}

export async function POST(req) {
  try {
    const { coin } = await req.json();
    const user = await fetchUser();

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Please login to create a wallet!",
      });
    }

    const existingWallet = await prisma.wallet.findUnique({
      where: { userId: user.id },
    });

    if (existingWallet) {
      return NextResponse.json({
        success: false,
        message: "Wallet already exists for this user!",
      });
    }

    const wallet = await prisma.wallet.create({
      data: {
        userId: user.id,
        coin,
      },
    });

    return NextResponse.json({ success: true, wallet });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function PUT(req) {
  try {
    const { coinChange } = await req.json();
    const user = await fetchUser();

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Please login to update the wallet!",
      });
    }

    const existingWallet = await prisma.wallet.findUnique({
      where: { userId: user.id },
    });

    if (!existingWallet) {
      return NextResponse.json({
        success: false,
        message: "Wallet not found for this user!",
      });
    }

    const updatedWallet = await prisma.wallet.update({
      where: { userId: user.id },
      data: {
        coin: coinChange,
      },
    });

    return NextResponse.json({ success: true, updatedWallet });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
