"use client";
import { useEffect } from "react";
import bonustasks from "../lib/bonusTasks.js";
import { useRouter } from "next/navigation";

export default function GenerateBonusTask({ pet }) {
  const router = useRouter();

  function getRandomTask() {
    const randomIndex = Math.floor(Math.random() * bonustasks.length);
    return bonustasks[randomIndex];
  }

  async function fetchPetData() {
    const response = await fetch(`/api/pets/${pet.id}`, {});
    const info = await response.json();
    return info.pet;
  }

  async function GenerateTask() {
    if (Math.random() < 0.05) {
      let foundPet = await fetchPetData();

      const filteredTasks = await foundPet.task.filter(
        (task) => task.isBonus && !task.isCompleted
      );

      if (filteredTasks.length >= 3) {
        if (foundPet.hearts === 0) {
          const response = await fetch(`/api/pets/`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              petId: pet.id,
              isActive: true,
            }),
          });
          const info = await response.json();

          router.refresh();
        } else if (foundPet.hearts > 0) {
          const response = await fetch(`/api/pets/`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              petId: pet.id,
            }),
          });
          const info = await response.json();
          router.refresh();
        }
      }

      // if (filteredTasks.length < 3) {
      let randomTask = getRandomTask();
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 3);
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: randomTask.name,
          category: randomTask.category,
          worth: 10,
          pet,
          isBonus: true,
          dueDate: dueDate.toISOString(),
        }),
      });
      const info = await response.json();

      router.refresh();
    }
  }

  // useEffect to run GenerateTask every second
  useEffect(() => {
    const intervalId = setInterval(async () => {
      let foundPet = await fetchPetData();

      if (foundPet.isActive && !foundPet.isPaused) {
        GenerateTask();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [pet.isActive, pet.isPaused]);

  return null;
}
