"use client"

import React, { useEffect, useState } from "react";

const BOX_COUNT = 10;

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const BackgroundBoxes = () => {
  const [boxes, setBoxes] = useState<React.ReactElement[]>([]);

  useEffect(() => {
    // Only run on client
    const generatedBoxes = Array.from({ length: BOX_COUNT }).map((_, i) => {
      const size = getRandom(30, 50); // px
      const top = getRandom(0, 90); // vh
      const left = getRandom(0, 90); // vw
      const duration = getRandom(6, 14); // seconds
      const delay = getRandom(0, 5); // seconds

      return (
        <div
          key={i}
          className="background-box"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}vh`,
            left: `${left}vw`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        />
      );
    });
    setBoxes(generatedBoxes);
  }, []);

  // Optionally, render nothing until client-side
  if (boxes.length === 0) return null;

  return <div className="fixed top-0 left-0 pointer-events-none z-0 w-screen height-screen">{boxes}</div>;
};

export default BackgroundBoxes;
