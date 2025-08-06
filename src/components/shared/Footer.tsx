"use client";

import Link from "next/link";
import Image from "next/image";
import { useSafariImageFallback } from "../../hooks/useSafariImageFallback";

// Footer navigation links organized by columns
const footerLinks = {
  column1: [
    { name: "Home", href: "/" },
    { name: "Council", href: "/council" },
    { name: "Events", href: "/events" },
    { name: "Resources", href: "/external-resources" },
    { name: "Partnership", href: "/partnership" },
  ],
  column2: [
    { name: "Careers", href: "/hiring" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
    { name: "About Us", href: "/about" },
  ],
  column3: [
    { name: "FAQs", href: "/faqs" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Use", href: "/terms-of-use" },
  ],
};

export default function Footer() {
  // Use Safari-specific fallback for logo
  const logoSrc = useSafariImageFallback(
    "/FigmaFiles/ccubed-icon.svg",
    "/FigmaFiles/ccubed-icon.png"
  );

  // Use Safari-specific fallback for bear greeting
  const bearSrc = useSafariImageFallback(
    "/FigmaFiles/mainPageAssets/bear_greeting.svg",
    "/FigmaFiles/mainPageAssets/bear_greeting.png"
  );

  return (
    <section className="footer-section relative z-10 flex justify-center px-4 sm:px-6 md:px-8">
      {/* Main Footer Container with specified dimensions and gradient border */}
      <div
        className="footer-container relative w-full max-w-[1150px] h-auto min-h-[298px] md:h-[298px]"
        style={{
          borderRadius: "30px",
        }}
      >
        {/* Gradient Border Effect */}
        <div
          className="absolute inset-0 rounded-[30px] pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 45%, transparent 90%)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "xor",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            padding: "4px",
          }}
        />

        {/* Content Container */}
        <div className="relative px-4 sm:px-6 md:px-8 pt-8 sm:pt-10 md:pt-12 h-full pb-8 md:pb-0">
          {/* Footer Content Grid - Three Column Layout */}
          <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_2fr_0.5fr] gap-6 md:gap-8 lg:gap-6 items-start">
            {/* Column 1 - Logo and Description */}
            <div className="footer-left flex flex-col justify-start">
              {/* Logo and Title */}
              <div className="flex items-center gap-3 sm:gap-4 mb-4 mt-0 md:mt-[-20px]">
                <Image
                  src={logoSrc}
                  alt="CCubed Logo"
                  width={60}
                  height={60}
                  quality={100}
                  priority
                  className="select-none w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] md:w-[60px] md:h-[60px]"
                  draggable={false}
                  style={{ userSelect: "none" }}
                />
                <h2
                  className="text-white font-extrabold text-[28px] sm:text-[32px] md:text-[40px]"
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    lineHeight: "1",
                    letterSpacing: "0%",
                  }}
                >
                  CCUBED
                </h2>
              </div>

              {/* Description */}
              <p
                className="text-white font-normal text-sm sm:text-base"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  lineHeight: "22px",
                  letterSpacing: "0%",
                  maxWidth: "450px",
                }}
              >
                Lorem ipsum dolor sit amet consectetur. Ac malesuada sagittis
                mollis ullamcorper blandit augue phasellus hac elit. Aliquam
                lorem id in scelerisque tortor amet lacus dolor interdum.
                Aliquam lorem id in scelerisque tortor amet lacus dolor
                interdum.
              </p>
            </div>

            {/* Column 2 - Navigation Links */}
            <div className="footer-navigation grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:grid-cols-3 lg:col-span-1">
              {/* Column 1 */}
              <div className="footer-column">
                {footerLinks.column1.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="block text-white font-semibold mb-2 sm:mb-3 hover:opacity-80 transition-opacity text-sm sm:text-base"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      lineHeight: "22px",
                      letterSpacing: "0%",
                      opacity: 0.9,
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Column 2 */}
              <div className="footer-column">
                {footerLinks.column2.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="block text-white font-normal mb-2 sm:mb-3 hover:opacity-80 transition-opacity text-sm sm:text-base"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      lineHeight: "22px",
                      letterSpacing: "0%",
                      opacity: 0.9,
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Column 3 */}
              <div className="footer-column">
                {footerLinks.column3.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="block text-white font-normal mb-2 sm:mb-3 hover:opacity-80 transition-opacity text-sm sm:text-base"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      lineHeight: "22px",
                      letterSpacing: "0%",
                      opacity: 0.9,
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 3 - Bear Mascot */}
            <div className="footer-bear hidden lg:flex justify-center items-end relative">
              <Image
                src={bearSrc}
                alt="Bear Greeting"
                width={278}
                height={346}
                className="select-none"
                draggable={false}
                style={{
                  transform: "scale(2.5) translateY(30px)",
                  transformOrigin: "bottom center",
                  userSelect: "none",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 