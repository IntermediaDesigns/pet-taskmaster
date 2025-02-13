'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation.js';

export default function Login({ user }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const info = await response.json();

    if (info.error) {
      return setError(info.error);
    }
    router.push('/');
    router.refresh();
  }

  return (
    <>
      <div className='h-screen flex justify-center items-center'>
        {!user.id ? (
          <div>
            <form onSubmit={handleLogin}>
              <label htmlFor='username'>Username:</label>
              <input
                type='text'
                id='username'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder='Enter your username'
              />

              <label htmlFor='password'>Password:</label>
              <input
                type='password'
                id='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder='Enter your password'
              />

              <button type='submit'>
                Login
              </button>
              <p>
                No account yet?
                <Link href={'/register'}> Sign Up</Link>
              </p>
              <p>{error}</p>
              {success && <p>{success}</p>}
            </form>
          </div>
        ) : (
          <div>
            <Link href='/user/userId'>
              Go to Profile
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
