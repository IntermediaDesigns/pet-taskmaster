import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma.js";

export async function POST(req) {
  try {
    const cookieStore = cookies();
    const { username, email, password } = await req.json();
    if (!username || !email || !password) {
      return NextResponse.json({
        success: false,
        error: "You must provide a username, email, and password to Sign Up",
      });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return NextResponse.json({
        success: false,
        error: "Username or email already exists. Please login.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const userWallet = await prisma.wallet.create({
      data: { userId: user.id, coin: 200 },
    });

    const token = jwt.sign(
      { userId: user.id, username, email },
      process.env.JWT_SECRET
    );

    cookieStore.set("token", token);

    return NextResponse.json({ success: true, user, userWallet });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
