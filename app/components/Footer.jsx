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
    <div>
      <div>
        <div>
          <h2>Pet Taskmaster</h2>
          <p>
            Unleash the joy of virtual companionship.
          </p>
        </div>

        <div>
          <p>Follow us!</p>

          <div>
            <a
              href="https://twitter.com/imdesignsllc"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.facebook.com/Pokemon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://github.com/Moreen-n/Moreen-n"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="https://instagram.com/moryn_molly"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        <div>
          <h2>Links</h2>
          <ul>
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <ScrollLink to="aboutSection" smooth={true} duration={500}>
                About
              </ScrollLink>
            </li>
          </ul>
        </div>

        <div>
          <GoMoveToTop onClick={() => window.scrollTo(0, 0)} />
        </div>
      </div>

      <div>
        <FaRegCopyright /> 2024 Pet Taskmaster. All rights reserved.
      </div>
    </div>
  );
}
