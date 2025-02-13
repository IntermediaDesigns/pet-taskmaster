import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";

export async function POST(req, res) {
  try {
    const { name, pet, category, worth, isBonus, dueDate } = await req.json();

    const user = await fetchUser();

    let task = null;

    const _pet = await prisma.pet.findFirst({
      where: { id: pet.id },
      include: { task: true },
    });

    if (_pet.userId !== user.id) {
      return NextResponse.json({
        success: false,
        message: "You must be the owner of this pet to Update!",
      });
    }

    if (isBonus) {
      if (_pet) {
        const filteredBonusTasks = await _pet.task.filter(
          (task) => task.isBonus && !task.isCompleted
        );

        if (filteredBonusTasks.length < 3) {
          task = await prisma.task.create({
            data: {
              name,
              userId: user.id,
              petId: pet.id,
              category: category,
              worth: worth,
              isBonus,
              dueDate,
            },
          });
        }
      }
    } else {
      task = await prisma.task.create({
        data: {
          name,
          userId: user.id,
          petId: pet.id,
          category: category,
          worth: worth,
          isBonus,
          dueDate,
        },
      });
    }

    return NextResponse.json({ success: true, task });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function PUT(req, res) {
  const { petId, isCompleted, worth, taskId, isBonus } = await req.json();
  const user = await fetchUser();

  const _task = await prisma.task.findFirst({ where: { id: taskId } });

  if (_task.userId !== user.id) {
    return NextResponse.json({
      success: false,
      message: "You must be the owner of this task to Update!",
    });
  }

  const _pet = await prisma.pet.findFirst({
    where: { id: petId },
    include: { task: true },
  });

  if (_pet.userId !== user.id) {
    return NextResponse.json({
      success: false,
      message: "You must be the owner of this pet to Update!",
    });
  }

  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: { isCompleted },
  });

  if (updatedTask) {
    let coinIncrease = worth;

    if (_pet.hearts === 5) {
      coinIncrease *= 2;
    }
    const wallet = await prisma.wallet.update({
      where: { userId: user.id },
      data: {
        coin: {
          increment: coinIncrease,
        },
      },
    });

    if (isBonus && _pet.hearts < 5) {
      const pet = await prisma.pet.update({
        where: {
          id: petId,
        },
        data: {
          hearts: {
            increment: 1,
          },
        },
      });
    }
  }
  return NextResponse.json({ success: true, updatedTask });
}
