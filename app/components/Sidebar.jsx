"use client";
import React, { useState, useEffect, useRef } from "react";
import { MdCatchingPokemon } from "react-icons/md";
import Link from "next/link";

export default function Sidebar({ user }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLinkClick = () => {
    toggleSidebar();
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isSidebarOpen) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSidebarOpen]);

  return (
    <>
      <div ref={sidebarRef}>
        <div className="flex items-center justify-between p-4 gap-4">
          <div className="flex items-center justify-between ">
            <MdCatchingPokemon
              onClick={toggleSidebar}
              className="text-4xl cursor-pointer text-black bg-button1 rounded-full hover:bg-hover1"
            />
          </div>
          <div>
            {!isSidebarOpen && <span className="text-muted font-Jura text-lg">Menu</span>}
          </div>
        </div>

        {isSidebarOpen && (
          <div className="flex flex-col items-center justify-center space-y-4 p-4 bg-accent w-40 shadow-lg rounded mt-6 absolute">
            <Link
              href={"/pokedex"}
              onClick={handleLinkClick}
              className="rounded-xl bg-button1 px-4 py-2 text-black text-center font-Jura text-lg hover:bg-hover1"
            >
              Pokedex
            </Link>
            <Link
              href={"/store"}
              onClick={handleLinkClick}
              className="rounded-xl bg-button1 px-4 py-2 text-black text-center font-Jura text-lg hover:bg-hover1"
            >
              Store
            </Link>

            {user.id && (
              <Link
                href={`/user/${user.id}`}
                onClick={handleLinkClick}
                className="rounded-xl bg-button1 px-4 py-2 text-black text-center font-Jura text-lg hover:bg-hover1"
              >
                Profile
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
}
