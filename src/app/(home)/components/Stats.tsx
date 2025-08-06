"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { privateAxios } from "@/lib/axios";

// Statistics data
// TODO: Fetch volunteer leaders count from database instead of hardcoded values
const getStats = (eventsCount: number) => [
  {
    id: 1,
    number: "5+",
    label: "Province Engaged",
  },
  {
    id: 2,
    number: `${eventsCount}+`,
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
  const [eventsCount, setEventsCount] = useState(0);

  // Fetch events count from API
  useEffect(() => {
    const fetchEventsCount = async () => {
      try {
        const response = await privateAxios.get("/events");
        const activeEvents = response.data.data.filter((event: { status: number }) => event.status !== 0);
        setEventsCount(activeEvents.length);
      } catch (error) {
        console.error("Error fetching events count:", error);
        // Fallback to default value
        setEventsCount(10);
      }
    };

    fetchEventsCount();
  }, []);

  const stats = getStats(eventsCount);

  return (
    <section 
      ref={ref}
      className="stats-section relative z-10 py-16 flex justify-center"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center place-items-center max-w-5xl w-full">
        {stats.map((stat: { id: number; number: string; label: string }, index: number) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.2,
              ease: "easeOut" 
            }}
            className="flex flex-col items-start justify-center w-[200px] h-[140px] text-left pl-4"
          >
            {/* Number */}
            <div 
              className="text-white font-bold flex items-center mb-2"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "64px",
                lineHeight: "1",
                letterSpacing: "0%",
                height: "64px",
              }}
            >
              <AnimatedCounter 
                targetNumber={stat.number} 
                isInView={isInView}
              />
            </div>
            
            {/* Label */}
            <div 
              className="text-white font-light text-left"
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