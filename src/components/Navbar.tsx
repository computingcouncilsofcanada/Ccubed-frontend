//This is the Header / Navbar Component

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/constants/constants"; // These are the navlinks from constants file

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); //State for toggling Menu Btn

  const toggleMenu = () => {
    // Function to toggle Menu
    setIsOpen(!isOpen);
  };
  return (
    <div className="border-2 border-blue-200 flex justify-between p-3">
      <h1>Logo</h1>
      <div className="desktop hidden sm:block z-50">
        <ul className="flex justify-between gap-3">
          {navLinks.map(
            (
              { id, href, name } // Mapping over the navlinks from constant for Desktop Navbar
            ) => (
              <li key={id}>
                <Link href={href} className="underline">
                  {name}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
      <div onClick={toggleMenu} className="hidden max-sm:block z-50">
        {isOpen ? <X /> : <Menu />}
      </div>

      <div
        className={`fixed inset-0  transition-all duration-300 bg-black flex  justify-center items-center  ${
          isOpen ? "opacity-100 z-10" : "opacity-0 -z-10"
        }`}
      >
        <ul className="mobile flex flex-col justify-between gap-10 text-center">
          {navLinks.map(
            (
              { id, href, name } // Mapping over the navlinks from constant for Mobile Navbar
            ) => (
              <li key={id}>
                <Link
                  href={href}
                  className="underline "
                  onClick={() => setIsOpen(false)}
                >
                  {name}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
