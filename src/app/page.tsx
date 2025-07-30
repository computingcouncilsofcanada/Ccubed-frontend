"use client";

import { useEffect, useState } from "react";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import Hero from "@/components/sections/landing/Hero";
import Events from "@/components/sections/landing/Events";
import ValueSystem from "@/components/sections/landing/ValueSystem";
import MissionVision from "@/components/sections/landing/MissionVision";
import Stats from "@/components/sections/landing/Stats";
import Footer from "@/components/sections/landing/Footer";
import { privateAxios } from "@/lib/axios";
import { transformApiEvents } from "@/lib/utils";
// import { mockEvents } from "@/data/mockEvents";

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
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Using real API instead of mock data
    setLoading(true);
    privateAxios
      .get("/events")
      .then((res) => {
        const transformedEvents = transformApiEvents(res.data.data);
        setEvents(transformedEvents);
      })
      .catch((error) => {
        setError(error.response?.data?.message || "Failed to fetch events");
        console.error("Error fetching events:", error);
      })
      .finally(() => {
        setLoading(false);
      });
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

        {/* Error Display */}
        {error && (
          <div className="mb-8 mx-auto max-w-2xl">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Events Section */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-white text-lg">Loading events...</div>
          </div>
        ) : (
          <Events events={events} />
        )}

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
