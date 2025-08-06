//This is the Header / Navbar Component

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/constants/constants"; // These are the navlinks from constants file
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user, logout } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  // Filter out login link if user is logged in
  const filteredNavLinks = navLinks.filter(
    (link) => !(link.name === "Login" && user)
  );

  return (
    <div className="w-full bg-transparent relative z-50">
      {/* <div
        className="flex justify-between p-3 mx-auto items-center px-4"
        style={{ maxWidth: "1200px" }}
      > */}
      <div className="flex justify-between py-8 px-4 sm:px-6 md:px-8 xl:px-0 mx-auto items-center max-w-6xl">
        <div className="left flex gap-10 items-center">
          <Link href="/">
            <Image
              src="/FigmaFiles/ccubed-icon.svg"
              alt="CCubed Logo"
              width={48}
              height={48}
              priority
              className="cursor-pointer select-none"
              draggable={false}
              style={{ userSelect: "none" }}
            />
          </Link>
          <div className="desktop hidden sm:block z-50">
            <ul className="flex justify-between gap-10 ">
              {filteredNavLinks.map(({ id, href, name }) => (
                <li key={id}>
                  <Link
                    href={href}
                    className="text-white font-normal"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "16px",
                      lineHeight: "24px",
                      letterSpacing: "1%",
                    }}
                  >
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
                      className="text-white cursor-pointer"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: "400",
                        fontSize: "16px",
                        lineHeight: "24px",
                        letterSpacing: "1%",
                      }}
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
                      className="text-white cursor-pointer"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: "400",
                        fontSize: "16px",
                        lineHeight: "24px",
                        letterSpacing: "1%",
                      }}
                    >
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <Link
          href="/login"
          className="text-white p-2 border border-white"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "24px",
            letterSpacing: "1%",
            borderRadius: "8px",
          }}
        >
          Sign In
        </Link>
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
    </div>
  );
};

export default Navbar;
