"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Service Card types
type ServiceCardProps = {
  id: number;
  title: string;
  description: string;
  serviceType?: 'map' | 'resume';
};

// ServiceCard component - integrated into this section
function ServiceCard({
  // id,
  title,
  description,
  serviceType,
}: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const shouldShowExpanded = isExpanded || isHovered;

  return (
    <motion.div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <motion.div
        className="w-[373px] px-4 py-6 rounded-xl relative overflow-hidden border border-white/10 backdrop-blur-sm"
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.25))'
        }}
        animate={{
          height: shouldShowExpanded ? "304px" : "189px",
        }}
        transition={{ 
          duration: 0.8, 
          ease: [0.25, 0.1, 0.25, 1],
          type: "tween"
        }}
      >
        {/* Service Card Gradient Border - When expanded or hovered */}
        {shouldShowExpanded && (
          <div 
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background: 
                serviceType === 'map' 
                  ? 'radial-gradient(ellipse 120% 80% at 100% 0%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.2) 60%, transparent 100%)'
                  : serviceType === 'resume'
                  ? 'linear-gradient(to bottom, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.2) 60%, transparent 100%)'
                  : 'radial-gradient(ellipse 120% 80% at 100% 100%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.2) 60%, transparent 100%)',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'xor',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              padding: '1px'
            }}
          />
        )}

        {/* Icon Container Area - Always Visible */}
        <div className="relative w-[341px] h-[141px] flex justify-center items-center rounded-xl backdrop-blur-sm border border-white/10">
          {/* Gradient border overlay */}
          <div 
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 120% 80% at 20% 100%, rgba(212,212,212,0.4) 0%, rgba(212,212,212,0.25) 30%, rgba(212,212,212,0.1) 60%, transparent 100%)
              `,
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'xor',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              padding: '1px'
            }}
          />

          {/* Background grid - visible when card is expanded with radial fade effect */}
          <motion.div 
            className="absolute inset-0"
            animate={{
              opacity: shouldShowExpanded ? 1 : 0
            }}
            transition={{ 
              duration: 0.6, 
              ease: [0.25, 0.1, 0.25, 1]
            }}
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '10.66px 8.81px',
              maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 70%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 70%)'
            }}
          ></motion.div>
          
          {/* Service Icon - Discord default, Map service, or Resume service */}
          {serviceType === 'map' ? (
            // Map service (polygon background with map icon inside)
            <div className="relative flex justify-center items-center translate-y-2">
              {/* Orange glow effects - visible when expanded */}
              <div 
                className={`absolute -left-4 top-1/2 -translate-y-1/2 w-20 h-20 transition-opacity duration-300 ${
                  shouldShowExpanded ? 'opacity-80' : 'opacity-0'
                }`}
                style={{
                  background: 'radial-gradient(ellipse 100% 70% at center, rgba(255, 184, 35, 0.6) 0%, rgba(255, 184, 35, 0.3) 30%, transparent 60%)',
                  filter: 'blur(8px)'
                }}
              />
              
              <div 
                className={`absolute -right-4 top-1/2 -translate-y-1/2 w-20 h-20 transition-opacity duration-300 ${
                  shouldShowExpanded ? 'opacity-70' : 'opacity-0'
                }`}
                style={{
                  background: 'radial-gradient(ellipse 100% 70% at center, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 30%, transparent 60%)',
                  filter: 'blur(8px)'
                }}
              />
              
              {/* Orange polygon background */}
              <div className="relative">
                <Image
                  src="/FigmaFiles/serviceIcons/orange-polygon.svg"
                  alt="Orange Polygon Background"
                  width={97}
                  height={108}
                  className="object-contain"
                />
                
                {/* Map vector icon positioned 24px below top border of polygon */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
                  <Image
                    src="/FigmaFiles/serviceIcons/map-vector.svg"
                    alt="Map Vector"
                    width={46}
                    height={46}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          ) : serviceType === 'resume' ? (
            // Resume service (red polygon background with checklist icon inside)
            <div className="relative flex justify-center items-center translate-y-2">
              {/* Red glow effect - top left, closer to center */}
              <div 
                className={`absolute -left-3 -top-3 w-20 h-20 transition-opacity duration-300 ${
                  shouldShowExpanded ? 'opacity-80' : 'opacity-0'
                }`}
                style={{
                  background: 'radial-gradient(ellipse 100% 70% at center, rgba(255, 63, 51, 0.6) 0%, rgba(255, 63, 51, 0.3) 30%, transparent 60%)',
                  filter: 'blur(8px)'
                }}
              />
              
              {/* White glow effect - bottom right, closer to center */}
              <div 
                className={`absolute -right-3 -bottom-3 w-20 h-20 transition-opacity duration-300 ${
                  shouldShowExpanded ? 'opacity-70' : 'opacity-0'
                }`}
                style={{
                  background: 'radial-gradient(ellipse 100% 70% at center, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 30%, transparent 60%)',
                  filter: 'blur(8px)'
                }}
              />
              
              {/* Red polygon background */}
              <div className="relative">
                <Image
                  src="/FigmaFiles/serviceIcons/red-polygon.svg"
                  alt="Red Polygon Background"
                  width={97}
                  height={108}
                  className="object-contain"
                />
                
                {/* Checklist icon positioned 24px below top border of polygon */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
                  <Image
                    src="/FigmaFiles/serviceIcons/service-checklist.svg"
                    alt="Checklist Vector"
                    width={46}
                    height={46}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          ) : (
            // Discord Service Icon - Complete SVG (original implementation)
            <div className="relative flex justify-center items-center translate-y-2">
              {/* Left blue glow effect - visible when expanded */}
              <div 
                className={`absolute -left-4 top-1/2 -translate-y-1/2 w-20 h-20 transition-opacity duration-300 ${
                  shouldShowExpanded ? 'opacity-80' : 'opacity-0'
                }`}
                style={{
                  background: 'radial-gradient(ellipse 100% 70% at center, rgba(114, 137, 218, 0.6) 0%, rgba(114, 137, 218, 0.3) 30%, transparent 60%)',
                  filter: 'blur(8px)'
                }}
              />
              
              {/* Right white glow effect - visible when expanded */}
              <div 
                className={`absolute -right-4 top-1/2 -translate-y-1/2 w-20 h-20 transition-opacity duration-300 ${
                  shouldShowExpanded ? 'opacity-70' : 'opacity-0'
                }`}
                style={{
                  background: 'radial-gradient(ellipse 100% 70% at center, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 30%, transparent 60%)',
                  filter: 'blur(8px)'
                }}
              />
              
              <Image
                src="/FigmaFiles/serviceIcons/service-discord.svg"
                alt="Discord Service"
                width={97}
                height={108}
                className="object-contain relative z-10"
              />
            </div>
          )}
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {shouldShowExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut",
                delay: 0.4
              }}
              className="flex flex-col px-2 mt-2"
            >
            <h1 className="text-white font-bold text-2xl mb-1">{title}</h1>
            <p 
              className="text-white text-sm"
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: '300',
                fontSize: '14px',
                letterSpacing: '0%',
                lineHeight: '1.2'
              }}
            >{description}</p>
          </motion.div>
        )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// Service card data
type ServiceData = {
  id: number;
  title: string;
  description: string;
  serviceType?: 'map' | 'resume';
};

const servicesData: ServiceData[] = [
  {
    id: 1,
    title: "Discord Events",
    description:
      "Join our Discord to stay updated on upcoming events, meet fellow computing students, and be part of the conversation. From casual chats to national collabs — it all starts here.",
  },
  {
    id: 2,
    title: "Online Events",
    description:
      "Connect from anywhere and join our online events — workshops, panels, game nights, and more! Learn, network, and have fun with computing students across Canada.",
    serviceType: "map"
  },
  {
    id: 3,
    title: "Resume Review",
    description:
      "Get personalized feedback on your resume from industry professionals and experienced peers. Boost your chances and stand out in your next application.",
    serviceType: "resume"
  },
];

// Main Services Section Component
export default function Services() {
  return (
    <section
      className="service relative z-10"
      style={{ marginTop: "-60px" }}
    >
      {/* Header with title and logo */}
      <div
        className="flex gap-3 items-end justify-start mb-4 w-full max-w-[706px] h-[120px] sm:h-[160px] md:h-[214px] px-4 sm:px-6 md:px-8 xl:px-0"
      >
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold">Services</h1>
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

      <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 px-4 sm:px-6 md:px-8 xl:px-0">
        {/* Description */}
        <p className="text-white font-light">
          We connect computing students across Canada through meaningful
          events and shared experiences. Our goal is to support student
          groups and foster a strong, inclusive tech community.
        </p>

        {/* Services Grid */}
        <div
          className="three-boxes grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
          style={{ minHeight: "320px" }}
        >
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="flex justify-center items-start h-[320px]"
            >
              <ServiceCard
                id={service.id}
                title={service.title}
                description={service.description}
                serviceType={service.serviceType}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 