"use client";

import React from "react";
import Link from "next/link";
import BgBoxComingSoon from "@/components/essentials/BgBoxComingSoon";
import { useSafariImageFallback } from "@/hooks/useSafariImageFallback";
import Image from "next/image";
import { motion } from "framer-motion";
import { IconBrandLinkedin, IconBrandDiscord, IconBrandInstagram, IconMail } from "@tabler/icons-react";


const socialLinks = [
  {
    id: 1,
    icon: IconBrandLinkedin,
    linkUrl: "https://www.linkedin.com/company/ccubed-dev/posts/?feedView=all",
    altText: "LinkedIn",
  },
  {
    id: 2,
    icon: IconBrandDiscord,
    linkUrl: "https://discord.com/invite/477KvYukHf",
    altText: "Discord",
  },
  {
    id: 3,
    icon: IconBrandInstagram,
    linkUrl: "https://www.instagram.com/ccubed_dev/?hl=en",
    altText: "Instagram",
  },
  // TODO: Add email icon

  // {
  //   id: 4,
  //   icon: IconBrandFacebook,
  //   linkUrl: "https://www.facebook.com/ccubed.dev/",
  //   altText: "Facebook",
  // },
  // {
  //   id: 5,
  //   icon: IconBrandTwitter,
  //   linkUrl: "https://x.com/ccubed_dev",
  //   altText: "Twitter",
  // },
];

const SocialIcons: React.FC<{ opacity?: number; size?: number }> = ({
  opacity = 1,
  size = 24,
}) => (
  <div className="social-icons flex items-center gap-4" style={{ opacity }}>
    {socialLinks.map(({ id, linkUrl, icon: IconComponent, altText }) => (
      <a
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        key={id}
        aria-label={altText}
      >
        <IconComponent size={size} color="#FFFFFF" stroke={1.5} />
      </a>
    ))}
  </div>
);

const ComingSoon = () => {
  const logoSrc = useSafariImageFallback(
    "/FigmaFiles/ccubed-icon.svg",
    "/FigmaFiles/ccubed-icon.png"
  );

  return (
    <div className="h-screen w-full overflow-y-auto flex flex-col bg-gradient-to-b from-[#0D1C26] to-[#1A384C]">
      {/* Background layer */}
      <BgBoxComingSoon />

      {/* Header */}
      <header className="relative z-30 flex-shrink-0 p-6 mb-10">
        <div className="max-w-5xl lg:max-w-7xl xl:max-w-[84rem] mx-auto">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <Image
              src={logoSrc}
              alt="CCubed Icon"
              width={40}
              height={40}
              quality={100}
              draggable={false}
              style={{ userSelect: "none" }}
            />
            <h1
              className="text-white font-semibold"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "20px",
              }}
            >
              CCUBED
            </h1>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <section className="relative flex-1 flex items-start justify-center px-6">
        <div className="relative z-30 bg-[#D4D4D4]/10 backdrop-blur-xs drop-shadow-lg w-full max-w-5xl lg:max-w-6xl xl:max-w-7xl rounded-[20px] shadow-2xl flex flex-col items-center justify-center gap-4 md:gap-6 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-[60px] py-20 border-2 border-white/20">
          {/* Logo */}
          <Image
            src={logoSrc}
            alt="CCubed Icon"
            width={120}
            height={120}
            quality={100}
            draggable={false}
            style={{ userSelect: "none" }}
            className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px]"
          />

          {/* Coming Soon text */}
          <div className="relative select-none cursor-default">
            <motion.p
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-center text-white leading-none"
              style={{ lineHeight: "1.2" }}
              initial={{ opacity: 1 }}
              whileHover={{
                opacity: 0,
                transition: {
                  duration: 0.6,
                  ease: "easeInOut",
                },
              }}
            >
              Magic in Progress
            </motion.p>
            <motion.p
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-center absolute inset-0 leading-none"
              style={{
                background: "linear-gradient(90deg, #FFFFFF 0%, #F7A527 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                lineHeight: "1.2",
              }}
              initial={{ opacity: 0 }}
              whileHover={{
                opacity: 1,
                transition: {
                  duration: 0.6,
                  ease: "easeInOut",
                },
              }}
            >
              Magic in Progress
            </motion.p>
          </div>

          {/* Description */}
          <p
            className="text-center px-2 sm:px-4 mx-auto max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: "300",
              fontSize: "16px",
              lineHeight: "normal",
              letterSpacing: "0%",
              color: "#FFFFFF",
              opacity: "100%",
            }}
          >
            Lorem ipsum dolor sit amet consectetur. Ac malesuada sagittis mollis
            ullamcorper blandit augue phasellus hac elit. Aliquam lorem id in
            scelerisque tortor amet lacus dolor interdum. Leo risus aliquam eu
            libero sagittis habitasse sed pretium. Leo risus aliquam eu libero
            sagittis habitasse sed pretium.
          </p>

          {/* Social icons */}
          <SocialIcons opacity={1} size={24} />

          {/* Email input */}
          <div className="relative w-full mx-auto max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-md">
            <IconMail
              size={24}
              stroke={2}
              color="#354052"
              className="absolute left-3 sm:left-4 md:left-5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 opacity-30"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full font-normal bg-white py-3 sm:py-4 rounded-full pl-10 sm:pl-12 pr-4 sm:pr-6 text-sm sm:text-base text-[#1F2937] placeholder-[#333333]/30"
            />
          </div>

          {/* Notify button */}
          <button className="w-fit bg-[#FAA336] px-6 sm:px-8 md:px-10 py-2 sm:py-3 rounded-full text-white text-sm sm:text-base font-medium">
            Notify me
          </button>

          {/* Greeting Bear */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 opacity-30 pointer-events-none">
            <Image
              src={useSafariImageFallback(
                "/FigmaFiles/mainPageAssets/bear_greeting.svg",
                "/FigmaFiles/mainPageAssets/bear_greeting.png"
              )}
              alt="Greeting Bear"
              width={200}
              height={200}
              quality={100}
              draggable={false}
              style={{
                userSelect: "none",
                width: "12vh",
                height: "12vh",
                minWidth: "80px",
                minHeight: "80px",
                maxWidth: "160px",
                maxHeight: "160px",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-30 flex-shrink-0 px-4 py-6">
        <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto flex items-center justify-between">
          <p
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: "normal",
              letterSpacing: 0,
              color: "#FFFFFF",
              opacity: 0.4,
              textTransform: "uppercase",
            }}
          >
            Computing Councils of Canada
          </p>

          {/* Social icons */}
          <SocialIcons opacity={0.4} size={24} />
        </div>
      </footer>
    </div>
  );
};

export default ComingSoon;
