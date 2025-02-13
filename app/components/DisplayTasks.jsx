'use client';
import React, { useState, useEffect } from 'react';
import { IoMdCheckboxOutline } from 'react-icons/io';
import DisplayBonusTasks from './DisplayBonusTasks.jsx';
import { useRouter } from 'next/navigation.js';

export default function DisplayTasks({ user, userId, pet, tasks }) {
  const [taskList, setTaskList] = useState([]);
  const [bonusList, setBonusList] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const bonusTasks = tasks.filter(
      (task) => task.isBonus === true && !task.isCompleted
    );
    setBonusList(bonusTasks);
  }, [tasks]);

  useEffect(() => {
    const userTasks = tasks.filter(
      (task) => !task.isBonus === true && !task.isCompleted
    );
    setTaskList(userTasks);
  }, [tasks]);

  async function handleCompleteTask(task) {
    const response = await fetch('/api/tasks', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taskId: task.id,
        isCompleted: true,
        petId: pet.id,
        worth: task.worth,
      }),
    });

    if (response.ok) {
      const info = await response.json();
      console.log(info);
    } else {
      console.error('Response not OK');
    }

    router.refresh();
  }

  return (
    <>
      <div>
        <p>Tasks</p>

        <div>
          <div>
            <div>
              <p>Daily Tasks</p>
            </div>

            {taskList.length === 0 && (
              <p>Create a task to get started!</p>
            )}

            {taskList.map((task) => (
              <div key={task.id}>
                <div>
                  <p>
                    <span>Category: </span>
                    {task.category}
                  </p>
                  <p>
                    <span>Due:</span>{' '}
                    {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                  <p>
                    <span>Worth:</span>{' '}
                    {task.worth}
                  </p>
                  <div>
                    <IoMdCheckboxOutline
                      onClick={() => handleCompleteTask(task)}
                      disabled={completedTasks.includes(task)}
                    />
                  </div>
                </div>
                <div>
                  <p>
                    <span>Task: </span>
                    {task.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <p>Bonus Task!</p>
            {bonusList &&
              bonusList.map((bonusTask) => (
                <DisplayBonusTasks
                  key={bonusTask.id}
                  task={bonusTask}
                  pet={pet}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
