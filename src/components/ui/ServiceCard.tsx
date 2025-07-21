"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type ServiceCardProps = {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  serviceType?: 'map' | 'resume'; // Add map and resume service types
};

export default function ServiceCard({
  id,
  title,
  description,
  imageSrc,
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
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <motion.div
        className="w-[373px] px-4 py-6 bg-[#D4D4D4]/10 rounded-xl border border-white/100 transition-all duration-300 relative overflow-hidden opacity-[0.99]"
        style={{
          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.25))'
        }}
        animate={{
          height: shouldShowExpanded ? "304px" : "189px",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Icon Container Area - Always Visible */}
        <div className="relative w-[341px] h-[141px] flex justify-center items-center bg-[#D4D4D4]/10 rounded-xl opacity-[0.99]">
          {/* Gradient border overlay */}
          <div 
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 120% 80% at 20% 100%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.25) 30%, rgba(255,255,255,0.1) 60%, transparent 100%)
              `,
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'xor',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              padding: '1px'
            }}
          />
          {/* Background grid - visible when card is expanded with radial fade effect */}
          <div 
            className={`absolute inset-0 transition-opacity duration-300 ${
              shouldShowExpanded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '10.66px 8.81px',
              maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 70%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 70%)'
            }}
          />
          
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
        {shouldShowExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
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
      </motion.div>
    </motion.div>
  );
} 