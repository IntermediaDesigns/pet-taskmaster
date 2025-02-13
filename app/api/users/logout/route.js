import { NextResponse } from "next/server.js";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const cookieStore = cookies();

    const userCookie = cookieStore.get("token");
    const decodedToken = jwt.verify(userCookie.value, process.env.JWT_SECRET);

    cookieStore.delete("token");

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
