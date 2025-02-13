"use client";
import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaRegCopyright,
  FaTwitter,
} from "react-icons/fa";
import { GoMoveToTop } from "react-icons/go";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link.js";

export default function Footer() {
  return (
    <footer className="bg-primary/90 text-white p-10 bottom-0 sticky w-full h-[250px]">
      <div className="flex justify-between gap-10">
        <div className="flex flex-col gap-4">
          <h2 className="font-Sansita text-3xl text-muted">Pet Taskmaster</h2>
          <p className="font-Jura text-xl text-secondary w-[300px]">
            Unleash the joy of virtual companionship.
          </p>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <p className="font-Jura text-2xl">Follow us!</p>

          <div className="flex gap-4">
            <a
              href="https://twitter.com/imdesignsllc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-ltgreen hover:text-ltblue"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.facebook.com/Pokemon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-ltgreen hover:text-ltblue"
            >
              <FaFacebook />
            </a>
            <a
              href="https://github.com/Moreen-n/Moreen-n"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-ltgreen hover:text-ltblue"
            >
              <FaGithub />
            </a>
            <a
              href="https://instagram.com/moryn_molly"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-ltgreen hover:text-ltblue"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <h2 className="font-Jura text-2xl">Links</h2>
          <ul>
            <li className="font-Jura text-xl text-ltgreen hover:text-ltblue">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="font-Jura text-xl cursor-pointer text-ltgreen hover:text-ltblue">
              <ScrollLink to="about" smooth={true} duration={500}>
                About
              </ScrollLink>
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-center text-black text-xl bg-button1 rounded-full w-12 h-12 cursor-pointer hover:bg-hover1">
          <GoMoveToTop onClick={() => window.scrollTo(0, 0)} />
        </div>
      </div>

      <div className="mt-10 font-Jura flex justify-center items-center gap-2 ml-8">
        <FaRegCopyright /> 2024 Pet Taskmaster. All rights reserved.
      </div>
    </footer>
  );
}
