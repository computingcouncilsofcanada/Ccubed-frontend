"use client";

import Image from "next/image";
import Link from "next/link";

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
  return (
    <section className="footer-section relative z-10 flex justify-center">
      {/* Main Footer Container with specified dimensions and gradient border */}
      <div 
        className="footer-container relative"
        style={{
          width: "1150px",
          height: "298px",
          borderRadius: "30px",
        }}
      >
        {/* Gradient Border Effect */}
        <div 
          className="absolute inset-0 rounded-[30px] pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 45%, transparent 90%)",
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'xor',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            padding: '4px'
          }}
        />
        
        {/* Content Container */}
        <div className="relative px-8 pt-12 h-full">
          {/* Footer Content Grid */}
          <div className="h-full flex items-start gap-[100px]">
            {/* Left Section - Logo and Description */}
            <div className="footer-left flex flex-col justify-start max-w-md">
              {/* Logo and Title */}
              <div className="flex items-center gap-4 mb-4 mt-[-20px]">
                <Image
                  src="/FigmaFiles/ccubed-icon.svg"
                  alt="CCubed Logo"
                  width={60}
                  height={60}
                  priority
                  className="select-none"
                  draggable={false}
                  style={{ userSelect: "none" }}
                />
                <h2
                  className="text-white font-extrabold"
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "40px",
                    lineHeight: "1",
                    letterSpacing: "0%",
                  }}
                >
                  CCUBED
                </h2>
              </div>

              {/* Description */}
              <p
                className="text-white font-normal"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "16px",
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

            {/* Right Section - Navigation Links */}
            <div className="footer-right grid grid-cols-3 gap-10">
              {/* Column 1 */}
              <div className="footer-column">
                {footerLinks.column1.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="block text-white font-semibold mb-3 hover:opacity-80 transition-opacity"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontSize: "16px",
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
                    className="block text-white font-normal mb-3 hover:opacity-80 transition-opacity"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontSize: "16px",
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
                    className="block text-white font-normal mb-3 hover:opacity-80 transition-opacity"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontSize: "16px",
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
          </div>

          {/* Bear mascot positioned absolutely */}
          <div 
            className="absolute"
            style={{
              left: "970px",
              bottom: "32px"
            }}
          >
            <Image
              src="/FigmaFiles/mainPageAssets/bear_greeting.svg"
              alt="Bear Greeting"
              width={278}
              height={346}
              className="select-none"
              draggable={false}
              style={{
                transform: "scale(1.55)",
                transformOrigin: "bottom center",
                userSelect: "none"
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
} 