"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation.js";

export default function SignUp({ user }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  async function handleSignUp(e) {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("Please enter username, email, and password.");
      return;
    }

    const response = await fetch("/api/users/Register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }), // Include email in the payload
    });

    const info = await response.json();

    if (info.token) {
      // Set the token in localStorage
      localStorage.setItem("token", info.token);
    }

    if (info.error) {
      setError(info.error);
      setSuccessMessage("");
    } else {
      setSuccessMessage("Sign-up successful! Redirecting to homepage...");
      setError("");
      setTimeout(() => {
        router.push("/selectPet");
        router.refresh();
      }, 2000);
    }
  }

  return (
    <>
      <div>
        {!user.id ? (
          <div>
            <form onSubmit={handleSignUp}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder="Enter your username"
              />

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter your email"
              />

              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Enter your password"
              />

              <button type="submit">
                Sign Up
              </button>

              <p>
                Already have an account?
                <Link href="/login"> Login</Link>{" "}
              </p>
              <p>{error}</p>
              <p>{successMessage}</p>
            </form>
          </div>
        ) : (
          <div>
            <Link href="/user/userId">
              Go to Profile
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
