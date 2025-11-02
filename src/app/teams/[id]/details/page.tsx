"use client";

import React, { useEffect, useMemo, useState } from "react";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import Footer from "@/components/shared/Footer";
import { mockMembers } from "@/data/mockMembers";
import { useParams } from "next/navigation";
import Image from "next/image";

// Define the card configurations
const cardConfigs = [
  {
    className: "w-[330px] h-[510px] grayscale-100",
    style: {
      transform: "translateX(-610px) rotateY(100deg) translateZ(-100px)",
    },
    description: "Left Perspective View"
  },
  {
    className: "w-[280px] h-[400px]",
    style: {
      transform: "translateX(-430px) rotateY(70deg) translateZ(-100px)",
    },
    description: "Left Side View"
  },
  {
    className: "w-[250px] h-[330px]",
    style: { transform: "translateX(-260px) rotateY(23deg) translateZ(-50px)" },
    description: "Left Front View"
  },
  {
    className: "w-[250px] h-[330px]",
    style: { transform: "translateX(260px) rotateY(-23deg) translateZ(-50px)" },
    description: "Right Front View"
  },
  {
    className: "w-[280px] h-[400px]",
    style: {
      transform: "translateX(430px) rotateY(-70deg) translateZ(-100px)",
    },
    description: "Right Side View"
  },
  {
    className: "w-[330px] h-[510px]",
    style: {
      transform: "translateX(610px) rotateY(-100deg) translateZ(-100px)",
    },
    description: "Right Perspective View"
  },
];

const TeamDetailsPage = () => {
  const params = useParams();
  const { id } = params;
  const [isMobile, setIsMobile] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const member = useMemo(() => {
    return mockMembers
      .flatMap((team) => team.members)
      .find((member) => member.id === Number(id));
  }, [id]);

  // Navigation functions for card carousel
  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % cardConfigs.length);
  };

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + cardConfigs.length) % cardConfigs.length);
  };

  if (!member && id) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Member not found</p>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Loading member...</p>
      </div>
    );
  }

  return (
    <>
      <BgBoxMainPage maxHeight={100} />
      <div className="relative w-full overflow-hidden -mt-30 pt-20">
        <div className="text-center min-h-screen text-white">
          {/* Header */}
          <div className="space-y-6">
            <h1 className="text-[40px] font-bold leading-[48px] mt-[43px]">
              Meet Our Team
            </h1>
            <p className="font-light text-[18px] leading-[27px] text-gray-300">
              Meet our diverse team of world-class creators, designers, and
              problem solvers
            </p>
          </div>

          {/* Mobile Carousel for Perspective Cards */}
          {isMobile ? (
            <div className="relative flex justify-center items-center h-[600px] px-4">
              <div className="relative w-full max-w-md">
                {/* Navigation Arrows */}
                <button
                  onClick={prevCard}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 rounded-full p-3 transition-all"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={nextCard}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 rounded-full p-3 transition-all"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <div className="relative mx-auto rounded-xl transition-all duration-300">
                  <div className="w-[280px] h-[400px] mx-auto rounded-xl">
                    <img
                      src={member.imageUrl}
                      alt={`${member.name} - ${cardConfigs[currentCardIndex].description}`}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  
                  {/* Card Position Indicator */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {cardConfigs.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentCardIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentCardIndex ? "bg-white" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>

                </div>
              </div>
            </div>
          ) : (
            /* Desktop 3D Perspective View */
            <div className="relative flex justify-center items-center h-[600px] z-10">
              <div
                className="relative w-full h-full flex justify-center items-center"
                style={{
                  perspective: "1000px",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Render all perspective cards */}
                {cardConfigs.map((card, i) => (
                  <div
                    key={i}
                    className={`absolute rounded-xl shadow-2xl ${card.className}`}
                    style={{
                      ...card.style,
                      transition: "transform 0.3s ease",
                    }}
                  >
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-xl grayscale-100"
                    />
                  </div>
                ))}

                {/* Main Center Image */}
                <div
                  className="absolute z-40 rounded-xl w-[288px] h-[374px]"
                  style={{
                    transform: "translateZ(80px)",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    transition: "transform 0.3s ease",
                  }}
                >
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Member info */}
          <div className={isMobile ? "mt-8" : "-mt-10"}>
            <h2 className="text-3xl font-semibold">{member.name}</h2>
            <p className="text-gray-400 mt-2 text-lg">{member.role}</p>

            <div className="relative z-30 flex gap-3 mt-[16px] justify-center">
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/linkedin.svg"
                  alt="Linkedin Icon"
                  width={24}
                  height={24}
                  className="mx-auto"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default TeamDetailsPage;