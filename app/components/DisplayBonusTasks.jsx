import { IoMdCheckboxOutline } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DisplayBonusTasks({ task, pet }) {
  const router = useRouter();
  const formattedDueDate = new Date(task.dueDate).toLocaleString();

  let worth = task.worth;

  if (pet.hearts === 5) {
    worth = worth * 2;
  }

  async function handleCompleteTask() {
    const response = await fetch("/api/tasks", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskId: task.id,
        isCompleted: true,
        petId: pet.id,
        worth: task.worth,
        isBonus: true,
      }),
    });

    const info = await response.json();

    router.refresh();
  }

  useEffect(() => {
    router.refresh();
  }, [pet]);

  return (
    <>
      <div>
        <div>
          <p>
            <span>Category: </span>
            {task.category}
          </p>
          <p>
            <span>Due:</span>{" "}
            {new Date(formattedDueDate).toLocaleDateString()}
          </p>
          <p>
            <span>Worth:</span> {worth}
            {worth === 20 && "(Bonus Time!)"}
          </p>
          <div>
            <IoMdCheckboxOutline
              onClick={handleCompleteTask}
            />
          </div>
        </div>

        <div>
          <p>
            <span>Bonus Task: </span>
            {task.name}
          </p>
        </div>
      </div>
    </>
  );
}
