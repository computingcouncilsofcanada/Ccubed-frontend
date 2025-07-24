"use client";

import { useEffect, useState } from "react";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import Hero from "@/components/sections/landing/Hero";
import Events from "@/components/sections/landing/Events";
import ValueSystem from "@/components/sections/landing/ValueSystem";
import MissionVision from "@/components/sections/landing/MissionVision";
import Stats from "@/components/sections/landing/Stats";
import Footer from "@/components/sections/landing/Footer";
// import { privateAxios } from "@/lib/axios";
import { mockEvents } from "@/data/mockEvents";

type FileObject = {
  id: number;
  name: string;
  url: string;
};

type Events = {
  id: number;
  name: string;
  description: string;
  status: number;
  date: string;
  time: string;
  location: string;
  images: string;
  files: FileObject[];
  types: string[];
};

export default function Home() {
  const [events, setEvents] = useState<Events[]>([]);
  // const [error, setError] = useState<string>("");

  useEffect(() => {
    // Using mock data instead of API call for testing
    setEvents(mockEvents);
    
    // Original API call (commented out for testing)
    // privateAxios
    //   .get("/events")
    //   .then((res) => {
    //     setEvents(res.data.data);
    //   })
    //   .catch((error) => {
    //     setError(error.response.data.message);
    //   });
  }, []);

  return (
    <div className="min-h-screen relative w-full overflow-hidden overflow-x-hidden bg-gradient-to-b from-[#10212E] to-[#162C3D] -mt-30 pt-20">
      <BgBoxMainPage />
      {/* Page Container - unified width control */}
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <Hero />

        {/* Mission Vision Section */}
        <MissionVision />

        {/* Events Section */}
        <Events events={events} />

        {/* Stats Section */}
        <Stats />

        {/* Value System Section */}
        <ValueSystem />

      </div>
      
      {/* Footer Section - Outside container for custom width */}
      <Footer />
    </div>
  );
}
