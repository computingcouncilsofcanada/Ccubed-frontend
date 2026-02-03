import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useSafariImageFallback } from "@/hooks/useSafariImageFallback";
import {
  IconBrandLinkedin,
  IconBrandDiscord,
  IconBrandInstagram,
  IconBrandTwitter,
} from "@tabler/icons-react";

interface Representative {
  name: string;
  title: string;
  image: string;
  role: string;
}

const RepresentativesSection = () => {
  const [activeFilter, setActiveFilter] = useState("Management");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const representativeImgSrc = useSafariImageFallback(
    "/FigmaFiles/councilAssets/guy.svg",
    "/FigmaFiles/councilAssets/guy.png"
  );

  const councilRepresentatives: Representative[] = [
    {
      name: "Parth Doshi",
      title: "President",
      image: representativeImgSrc,
      role: "Management",
    },
    // Add more representatives as needed
  ];

  const filterOptions = [
    "Management",
    "Product",
    "Operation",
    "Design",
    "Marketing",
    "Customer service",
  ];

  const socialLinks = [
    {
      id: 1,
      icon: IconBrandLinkedin,
      linkUrl: "https://www.linkedin.com/company/placeholder",
      altText: "LinkedIn",
      fill: false,
    },
    {
      id: 2,
      icon: IconBrandInstagram,
      linkUrl: "https://www.instagram.com/placeholder",
      altText: "Instagram",
      fill: false,
    },
    {
      id: 3,
      icon: IconBrandTwitter,
      linkUrl: "https://x.com/placeholder",
      altText: "Twitter",
      fill: false,
    },
    {
      id: 4,
      icon: IconBrandDiscord,
      linkUrl: "https://discord.com/invite/placeholder",
      altText: "Discord",
      fill: false,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mb-24 px-4 sm:px-6"
    >

      <div className="text-center mb-8">
        <h2
          className="text-[36px] md:text-[30px] sm:text-[24px] font-extrabold leading-[1.3] text-white mb-4"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Council Representatives
        </h2>
        <p
          className="text-white font-light text-[18px] md:text-[16px] sm:text-[14px] leading-[26px] max-w-[845px] md:max-w-[700px] sm:max-w-[95%] mx-auto"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Meet the key members of our council, including main directors and
          representatives from our partnered societies and clubs. Each profile
          offers a glimpse into their role and contribution, helping you get to
          know the people shaping our community.
        </p>
      </div>


      <div className="flex flex-wrap justify-center gap-3 sm:gap-2 mb-8">
        {filterOptions.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`transition-all duration-300 ease-out h-[44px] sm:h-[38px] px-4 py-2 rounded-[20px] relative ${
              activeFilter === filter ? "font-medium" : "font-light"
            }`}
            style={{
              fontFamily: "Roboto, sans-serif",
              lineHeight: "27px",
              letterSpacing: "0%",
            }}
          >
            {activeFilter === filter && (
              <motion.div
                className="absolute inset-0 rounded-[20px] pointer-events-none"
                style={{
                  background:
                    "linear-gradient(120deg, rgba(51, 186, 197, 1) 0%, rgba(255, 255, 255, 0.1) 35%, transparent 65%)",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "xor",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  padding: "2px",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
            <span
              className={`relative z-10 ${
                activeFilter === filter ? "text-transparent" : "text-white"
              }`}
            >
              {activeFilter === filter ? (
                <span
                  style={{
                    background:
                      "linear-gradient(to right, #FFFFFF 0%, #33BAC5 85%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  {filter}
                </span>
              ) : (
                filter
              )}
            </span>
          </button>
        ))}
      </div>

      {/* Representative Cards */}
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center gap-6 max-w-[845px] md:max-w-[700px] sm:max-w-[95%]">
          {councilRepresentatives.map((rep, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="text-center flex-shrink-0 w-[200px] sm:w-[160px]"
            >
              {/* Profile Picture */}
              <div className="relative h-[229px] sm:h-[180px] flex items-end justify-center mb-4">
                <motion.div
                  className="overflow-hidden cursor-pointer"
                  animate={{
                    width:
                      hoveredIndex === index || clickedIndex === index
                        ? "179px"
                        : "169px",
                    height:
                      hoveredIndex === index || clickedIndex === index
                        ? "229px"
                        : "169px",
                    borderRadius:
                      hoveredIndex === index || clickedIndex === index
                        ? "12px"
                        : "50%",
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  onClick={() =>
                    setClickedIndex(clickedIndex === index ? null : index)
                  }
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <Image
                    src={rep.image}
                    alt={rep.name}
                    width={179}
                    height={229}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>

              <h3
                className="text-[24px] md:text-[20px] sm:text-[18px] font-medium text-white"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                {rep.name}
              </h3>
              <p
                className="text-[18px] md:text-[16px] sm:text-[14px] text-white font-light mb-2"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                {rep.title}
              </p>

              <motion.div
                className="flex items-center justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{
                  opacity:
                    hoveredIndex === index || clickedIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {socialLinks.map(
                  ({ id, linkUrl, icon: IconComponent, altText, fill }) => (
                    <a
                      href={linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={id}
                      aria-label={altText}
                      className="hover:opacity-80 transition-opacity duration-200"
                    >
                      <IconComponent
                        size={22}
                        color="#FFFFFF"
                        stroke={fill ? 0 : 1.5}
                        fill={fill ? "#FFFFFF" : "none"}
                      />
                    </a>
                  )
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default RepresentativesSection;
