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
        <div>
          <div>
            <MdCatchingPokemon
              onClick={toggleSidebar}
            />
          </div>
          <div>
            {!isSidebarOpen && <span>Menu</span>}
          </div>
        </div>

        {isSidebarOpen && (
          <div>
            <Link
              href={"/pokedex"}
              onClick={handleLinkClick}
            >
              Pokedex
            </Link>
            <Link
              href={"/store"}
              onClick={handleLinkClick}
            >
              Store
            </Link>

            {user.id && (
              <Link
                href={`/user/${user.id}`}
                onClick={handleLinkClick}
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
