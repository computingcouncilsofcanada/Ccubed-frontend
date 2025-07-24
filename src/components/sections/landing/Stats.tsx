"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// Statistics data
// TODO: Fetch events number and volunteer leaders count from database instead of hardcoded values
const stats = [
  {
    id: 1,
    number: "5+",
    label: "Province Engaged",
  },
  {
    id: 2,
    number: "10+",
    label: "events",
  },
  {
    id: 3,
    number: "400+",
    label: "executive & volunteer leaders",
  },
  {
    id: 4,
    number: "15+",
    label: "University Chapters",
  },
];

// Counter animation component
function AnimatedCounter({ targetNumber, isInView }: { targetNumber: string, isInView: boolean }) {
  const [displayNumber, setDisplayNumber] = useState("0");
  
  useEffect(() => {
    if (!isInView) return;
    
    // Extract the numeric part from strings like "5+", "400+"
    const match = targetNumber.match(/(\d+)/);
    if (!match) {
      setDisplayNumber(targetNumber);
      return;
    }
    
    const target = parseInt(match[1]);
    const suffix = targetNumber.replace(match[1], "");
    let current = 0;
    const increment = Math.ceil(target / 30); // Animation duration control
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDisplayNumber(target + suffix);
        clearInterval(timer);
      } else {
        setDisplayNumber(current + suffix);
      }
    }, 50);
    
    return () => clearInterval(timer);
  }, [targetNumber, isInView]);
  
  return <span>{displayNumber}</span>;
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section 
      ref={ref}
      className="stats-section relative z-10 py-16"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.2,
              ease: "easeOut" 
            }}
            className="text-start"
          >
            {/* Number */}
            <div 
              className="text-white font-bold mb-2"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "64px",
                lineHeight: "1",
                letterSpacing: "0%"
              }}
            >
              <AnimatedCounter 
                targetNumber={stat.number} 
                isInView={isInView}
              />
            </div>
            
            {/* Label */}
            <div 
              className="text-white font-light px-1.5"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "20px",
                lineHeight: "26px",
                letterSpacing: "0%",
                opacity: 0.9
              }}
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
} 