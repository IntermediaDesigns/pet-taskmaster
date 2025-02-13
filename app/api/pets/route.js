import { NextResponse } from "next/server.js";
import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";

export async function GET() {
  try {
    const user = await fetchUser();

    if (!user.id) {
      return NextResponse.json({
        success: false,
        message: "Please login/register!",
      });
    }

    const pets = await prisma.pet.findMany({ where: { userId: user.id } });

    return NextResponse.json({
      success: true,
      pets,
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
    const {
      nickname,
      type,
      spriteUrl,
      name,
      pokedexId,
      isShiny,
      isRare,
      collectedNumber,
      isStarter,
    } = await req.json();
    const user = await fetchUser();

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Please login to create a pet!",
      });
    }

    let pet = null;

    if (isStarter) {
      pet = await prisma.pet.create({
        data: {
          userId: user.id,
          name,
          nickname,
          type,
          spriteUrl,
          pokedexId,
          isShiny,
          isRare,
          hearts: 5,
        },
      });
    } else {
      pet = await prisma.pet.create({
        data: {
          userId: user.id,
          name,
          nickname,
          type,
          spriteUrl,
          pokedexId,
          isShiny,
          isRare,
          hearts: 1,
        },
      });
    }

    let _user;

    if (collectedNumber) {
      _user = await prisma.user.update({
        where: { id: user.id },
        data: {
          collectedPets: {
            push: collectedNumber,
          },
        },
      });
    }

    return NextResponse.json({ success: true, pet });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function PUT(req) {
  try {
    const { petId, isActive } = await req.json();
    const user = await fetchUser();

    const _pet = await prisma.pet.findFirst({
      where: {
        id: petId,
      },
    });

    if (_pet.userId !== user.id) {
      return NextResponse.json({
        success: false,
        message: "You must be the owner of this pet to Update!",
      });
    }

    let updatedPet = null;

    if (isActive) {
      updatedPet = await prisma.pet.update({
        where: {
          id: petId,
        },
        data: {
          isActive: false,
        },
      });
    } else {
      if (_pet.hearts > 0) {
        updatedPet = await prisma.pet.update({
          where: {
            id: petId,
          },
          data: {
            hearts: {
              decrement: 1,
            },
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Put Router",
      updatedPet,
    });
  } catch (error) {
    return NextResponse.json({
      success: true,
      error: error.message,
    });
  }
}
