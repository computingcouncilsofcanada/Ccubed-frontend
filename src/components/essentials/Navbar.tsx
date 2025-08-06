//This is the Header / Navbar Component

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { navLinks } from "@/constants/constants"; // These are the navlinks from constants file
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useSafariImageFallback } from "../../hooks/useSafariImageFallback";

const Navbar = () => {
  const { user, logout, isHydrated } = useUser();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Use Safari-specific fallback for logo
  const logoSrc = useSafariImageFallback(
    "/FigmaFiles/ccubed-icon.svg",
    "/FigmaFiles/ccubed-icon.png"
  );

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      // Disable scroll on both body and html
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.documentElement.style.overflow = 'hidden';
    } else {
      // Enable scroll
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.documentElement.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  // Filter out login link if user is logged in - only after hydration
  const filteredNavLinks = navLinks.filter(
    (link) => !(link.name === "Login" && isHydrated && user)
  );

  // Don't render user-dependent content until hydrated
  const showUserContent = isHydrated && user;
  const showSignInButton = isHydrated && !user;

  return (
    <div className="w-full bg-transparent relative z-50">
      {/* <div
        className="flex justify-between p-3 mx-auto items-center px-4"
        style={{ maxWidth: "1200px" }}
      > */}
      <div className="flex justify-between py-4 sm:py-8 px-4 sm:px-6 md:px-8 xl:px-0 mx-auto items-center max-w-6xl">
        {/* Logo */}
        <Link href="/">
          <Image
            src={logoSrc}
            alt="CCubed Logo"
            width={48}
            height={48}
            priority
            quality={100}
            className="cursor-pointer select-none"
            draggable={false}
            style={{ userSelect: "none" }}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-8">
            {filteredNavLinks.map(({ id, href, name }) => (
              <Link
                key={id}
                href={href}
                className="text-white font-normal hover:text-gray-300 transition-colors"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "16px",
                  lineHeight: "24px",
                  letterSpacing: "1%",
                }}
              >
                {name}
              </Link>
            ))}
            {showUserContent && (
              <>
                <Link
                  href="/login"
                  onClick={handleLogout}
                  className="text-white cursor-pointer hover:text-gray-300 transition-colors"
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
                <Link
                  href={`/member/${
                    user.role === "staff"
                      ? "member"
                      : user.role === "SUPER_ADMIN"
                      ? "super-admin"
                      : "admin"
                  }`}
                  className="text-white cursor-pointer hover:text-gray-300 transition-colors"
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
              </>
            )}
          </nav>
          
          {/* Desktop Sign In Button */}
          {showSignInButton && (
            <Link
              href="/login"
              className="text-white px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "1%",
              }}
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          {/* Mobile Sign In Button */}
          {showSignInButton && (
            <Link
              href="/login"
              className="text-white px-2 py-1 sm:px-3 sm:py-1.5 border border-white rounded-md text-xs sm:text-sm hover:bg-white hover:text-gray-900 transition-colors"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "400",
                fontSize: "12px",
                lineHeight: "16px",
                letterSpacing: "1%",
              }}
            >
              Sign In
            </Link>
          )}
          
          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white w-8 h-8 flex items-center justify-center relative z-50 transition-transform duration-300 hover:scale-110"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <IconX size={24} className="transition-all duration-300" />
            ) : (
              <IconMenu2 size={24} className="transition-all duration-300" />
            )}
          </button>
        </div>
        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 transition-all duration-300 md:hidden ${
            isOpen ? "opacity-100 z-40 pointer-events-auto" : "opacity-0 -z-10 pointer-events-none"
          }`}
          style={{
            backdropFilter: isOpen ? "blur(10px)" : "none",
            WebkitBackdropFilter: isOpen ? "blur(10px)" : "none",
            backgroundColor: isOpen ? "rgba(13, 28, 38, 0.8)" : "transparent",
          }}
          onClick={() => setIsOpen(false)}
        >
          <div className="flex flex-col items-center justify-center min-h-screen px-8">
            <nav className="flex flex-col gap-8 text-center">
              {filteredNavLinks.map(({ id, href, name }) => (
                <Link
                  key={id}
                  href={href}
                  className="text-white text-2xl font-medium hover:text-gray-300 transition-colors"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    letterSpacing: "1%",
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {name}
                </Link>
              ))}
              {showUserContent && (
                <>
                  <Link
                    href="/login"
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="text-white text-2xl font-medium hover:text-gray-300 transition-colors"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      letterSpacing: "1%",
                    }}
                  >
                    Logout
                  </Link>
                  <Link
                    href={`/member/${
                      user.role === "staff"
                        ? "member"
                        : user.role === "SUPER_ADMIN"
                        ? "super-admin"
                        : "admin"
                    }`}
                    className="text-white text-2xl font-medium hover:text-gray-300 transition-colors"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      letterSpacing: "1%",
                    }}
                    onClick={() => setIsOpen(false)}
                  >
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
