"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Define the benefits data
const benefits = [
  {
    id: 1,
    number: "1",
    title: "Free Events for Students",
    description: "At Ccubed, we believe education and opportunity should be accessible to everyone. That's why most of our events are completely free whether it's a tech talk, design workshop, networking mixer, or career panel. Just s how up and start learning.",

  },
  {
    id: 2,
    number: "2",
    title: "Meet Like-Minded Students",
    description: "Whether you're into design, coding, business, or just looking to get inspired, Ccubed connects you with other ambitious students across Canada and beyond. Make friends, find project partners, or start something new together.",

  },
  {
    id: 3,
    number: "3",
    title: "Career & Skills Boost",
    description: "From resume reviews and mock interviews to hands-on skill-building sessions in design, coding, and communication our events are designed to help you build confidence, expand your toolkit, and get job-ready faster.",

  },
  {
    id: 4,
    number: "4",
    title: "Free Events for Students",
    description: "Not sure what you want to do yet? No problem. Try out a design sprint, join a coding jam, or attend a startup pitch night. Ccubed gives you the space to explore new interests without pressure just curiosity and fun.",

  }
];

export default function KeyBenefits() {
  return (
    <section
      className="key-benefits relative z-10"
      style={{ marginTop: "-20px" }}
    >
      {/* Header with title and logo */}
      <div
        className="flex gap-3 items-end justify-center mb-12 mx-auto"
        style={{
          width: "806px",
          height: "214px",
        }}
      >
        <h1 className="text-white text-5xl font-extrabold">
          Key Benefits of Our System
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

      {/* Benefits Cards - Cascading Layout */}
      <div className="relative max-w-6xl mx-auto px-4" style={{ height: "800px" }}>
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.id}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.3,
              ease: "easeOut" 
            }}
            whileHover={{ scale: 1.02 }}
            className={`group absolute rounded-2xl px-6 py-4 cursor-pointer overflow-hidden`}
            style={{
              width: "640px",
              height: "303px",
              left: index % 2 === 0 ? "0px" : "auto",
              right: index % 2 === 0 ? "auto" : "0px", 
              top: `${index * 160}px`,
              zIndex: 10 + index,
              opacity: 1.0,
            }}
          >
            {/* Grid Layout: 2x2 */}
            <div 
              className="grid gap-2 mb-6"
              style={{ 
                marginTop: "20px",
                gridTemplateColumns: "80px 1fr",
                gridTemplateRows: "auto 1fr",
                alignItems: "baseline"
              }}
            >
              {/* Left Top: Number */}
              <div className="justify-self-start self-baseline">
                <span 
                  className="font-bold block"
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "96px",
                    letterSpacing: "0.5%",
                    lineHeight: "1",
                    color: "rgba(255, 255, 255, 0.3)"
                  }}
                >
                  {benefit.number}.
                </span>
              </div>
              
              {/* Right Top: Title */}
              <div className="justify-self-start self-baseline">
                <h3 
                  className="font-bold"
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "40px",
                    letterSpacing: "0.5%",
                    lineHeight: "1",
                    whiteSpace: "nowrap",
                    color: "rgba(255, 255, 255, 0.7)"
                  }}
                >
                  {benefit.title}
                </h3>
              </div>
              
              {/* Left Bottom: Empty */}
              <div></div>
              
              {/* Right Bottom: Description (Only on Hover) */}
              <div className="justify-self-start self-start">
                                  <div className="hidden group-hover:block">
                    <p 
                      className="text-white/90 text-left"
                      style={{
                        fontFamily: "Roboto, sans-serif",
                        fontSize: "20px",
                        letterSpacing: "1%",
                        fontWeight: "300",
                        lineHeight: "1.3",
                        maxWidth: "400px"
                      }}
                    >
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>


            {/* Hover Border Effect */}
            <div 
              className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(${
                  benefit.id === 1 ? 'ellipse at top left' :
                  benefit.id === 2 ? 'ellipse 100% 100% at center right' :
                  benefit.id === 3 ? 'ellipse at top left' :
                  'ellipse at bottom right'
                }, ${
                  benefit.id === 2 ? 
                  'rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 40%, rgba(255, 255, 255, 0.2) 60%, transparent 85%' :
                  'rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 30%, transparent 70%'
                })`,
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'xor',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                padding: '2px'
              }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
} 