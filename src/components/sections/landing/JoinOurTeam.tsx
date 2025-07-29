"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function JoinOurTeam() {
  return (
    <section
      className="join-our-team relative z-10"
      style={{ marginTop: "-40px" }}
    >
      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 items-start">
          {/* Left Side - Title and Text Content */}
          <div className="text-content max-w-none">
            {/* Title with logo */}
            <div className="flex gap-3 items-end mb-6">
              <h1 
                className="text-white font-extrabold"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "48px",
                  fontWeight: "800" // Extrabold
                }}
              >
                Join Our Team
              </h1>
              <motion.div className="relative" style={{ marginLeft: "-40px" }}>
                <Image
                  src="/FigmaFiles/mainPageAssets/small-breathe-logo.svg"
                  alt="Breathe Logo"
                  width={143}
                  height={210}
                  priority
                />
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src="/FigmaFiles/mainPageAssets/small-breathe-logo-2.svg"
                    alt="Breathe Logo Animated"
                    width={143}
                    height={210}
                    priority
                  />
                </motion.div>
              </motion.div>
            </div>
            
            {/* Description text */}
            <p 
              className="text-white"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "20px",
                fontWeight: "300", // Light
                lineHeight: "27px",
                letterSpacing: "1%"
              }}
            >
              Want to be part of something meaningful? Join the Ccubed team and help us create free, impactful events for students across Canada. Whether you&apos;re into design, tech, marketing, or organizing events, this is your chance to gain real experience, build your network, and grow alongside a passionate, supportive community. No matter your background or level, if you&apos;re eager to learn and make a difference—we&apos;d love to have you on board.
            </p>
          </div>

          {/* Right Side - Teal Content Area */}
          <div className="content-area flex items-start">
            <div 
              style={{
                width: "470px",
                height: "349px",
                backgroundColor: "#34BAC5", // Fill 34BAC5 100%
                borderRadius: "20px", // Corner radius 20
                opacity: "100%", // Opacity 100%
                marginLeft: "auto",
                marginTop: "190px" // Position to align with middle of "Join Our Team" title
              }}
            >
              {/* Empty content area - clean simple rectangle */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 