//This is the Header / Navbar Component

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/constants/constants"; // These are the navlinks from constants file
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); //State for toggling Menu Btn
  const { user, logout } = useUser();
  const router = useRouter();

  const toggleMenu = () => {
    // Function to toggle Menu
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  // Filter out login link if user is logged in
  const filteredNavLinks = navLinks.filter(
    (link) => !(link.name === "Login" && user)
  );

  return (
    <div className="flex justify-between p-3 w-full mx-auto  items-center">
      <div className="left flex gap-6 items-center">
      <Image
        src="/FigmaFiles/ccubed-icon.svg"
        alt="CCubed Logo"
        width={40}
        height={40}
        priority
      />
        <div className="desktop hidden sm:block z-50">
        <ul className="flex justify-between gap-10 ">
          {filteredNavLinks.map(({ id, href, name }) => (
            <li key={id}>
              <Link href={href} className="font-semibold text-white">
                {name}
              </Link>
            </li>
          ))}
          {user && (
            <>
              <li>
                <Link
                  href="/login"
                  onClick={handleLogout}
                  className="font-semibold text-white cursor-pointer"
                >
                  Logout
                </Link>
              </li>
              <li>
                <Link
                  href={`/member/${
                    user.role === "staff"
                      ? "member"
                      : user.role === "SUPER_ADMIN"
                      ? "super-admin"
                      : "admin"
                  }`}
                  className="font-semibold text-white cursor-pointer"
                >
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    

      </div>
      <Link href="/login" className="text-white font-bold p-2 border-2 borde-white rounded-md">Sign in</Link>
     
    
      {/* <div onClick={toggleMenu} className="hidden max-sm:block z-50">
        {isOpen ? <X /> : <Menu />}
      </div> */}

      {/* <div
        className={`fixed inset-0  transition-all duration-300 bg-black flex  justify-center items-center text-white  ${
          isOpen ? "opacity-100 z-10" : "opacity-0 -z-10"
        }`}
      >
        <ul className="mobile flex flex-col justify-between gap-10 text-center">
          {filteredNavLinks.map(({ id, href, name }) => (
            <li key={id}>
              <Link
                href={href}
                className="font-semibold"
                onClick={() => setIsOpen(false)}
              >
                {name}
              </Link>
            </li>
          ))}
          {user && (
            <li>
              <Link
                href="/login"
                className="underline cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </li>
          )}
        </ul>
      </div> */}
    </div>
  );
};

export default Navbar;
