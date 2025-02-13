'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation.js';

export default function CreateTask({ user, pet }) {
  const [name, setName] = useState('');
  const [worth, setWorth] = useState(1);
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(user.id);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [error, setError] = useState(null);
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const task = {
      category,
      name,
      dueDate,
    };

    setSubmitClicked(true);

    if (!isLoggedIn) {
      setError('You must be logged in to submit.');
      return;
    }

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: task.name,
          category: task.category,
          worth: worth,
          pet,
          dueDate: new Date(task.dueDate + 'T00:00:00').toISOString(),
          isBonus: false,
        }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setTaskName('');
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
    setName('');
    setDueDate('');
    setCategory('');
  };

  return (
    <>
      <div>
        <form id='taskForm' onSubmit={handleSubmit}>
          <p>Create a Task</p>
          <div>
            <label>Task Category</label>
            <input
              type='text'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder='Enter a Category..'
              required
            />
            <label>Due Date</label>
            <input
              type='date'
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter a Task..'
            required
          />
        </form>
        <button form='taskForm' type='submit'>
          Submit
        </button>
        {error && <p>{error}</p>}
        {message && <p>{message}</p>}{' '}
      </div>
    </>
  );
}
