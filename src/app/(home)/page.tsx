"use client";

import { useEffect, useState } from "react";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import BgTextMainPage from "@/components/essentials/BgTextMainPage";
import Hero from "./components/Hero";
import Events from "./components/Events";
import ValueSystem from "./components/ValueSystem";
import MissionVision from "./components/MissionVision";
import Stats from "./components/Stats";
import Footer from "@/components/shared/Footer";
import PreviewModal from "@/components/modals/PreviewModal";
import { transformApiEvents } from "@/app/events/utils/eventsApi";
import { Events as EventType } from "@/types/events";
import { privateAxios } from "@/lib/axios";

export default function Home() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  useEffect(() => {
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
      <BgBoxMainPage maxHeight={400} enableGlow={true} />
      <BgTextMainPage />
      {/* Page Container - unified width control */}
      {/* <div className="container mx-auto max-w-6xl"> */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8 xl:px-2">
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
          <Events
            events={events}
            onOpenEventDetail={(event) => {
              setSelectedEvent(event);
              setIsEventModalOpen(true);
            }}
          />
        )}

        {/* Stats Section */}
        <Stats />

        {/* Value System Section */}
        <ValueSystem />
      </div>

      {/* Footer Section - Outside container for custom width */}
      <Footer />

      {/* Event detail modal rendered at page level so it stacks above all sections */}
      <PreviewModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        event={selectedEvent}
      />
    </div>
  );
}
