"use client";

import React, { useState, useMemo } from "react";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import Footer from "@/components/shared/Footer";
import {
  CouncilHero,
  DescriptionSection,
  RepresentativesSection,
  EventsSection,
  ArticleSection,
} from "../components/SpecificCouncilComponents";
import { Events } from "@/types/events";
import { councilSections } from "@/data/councilSections";
import { useParams } from "next/navigation";
import PreviewModal from "@/components/modals/PreviewModal";

const CouncilDetailPage = () => {
    const [selectedEvent, setSelectedEvent] = useState<Events | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();
  const { id } = params;

  const handleShare = () => alert("Share link clicked");
  const handleInvite = (url: string | null | undefined) => {
    if (!url) {
      console.warn("No registration URL for this event");
      return;
    }
  
      window.open(url, "_blank");
    };
  const council = useMemo(() => {
    return councilSections.find(
      (section) => section.title.toLowerCase().replace(/\s+/g, "") === id
    );
  }, [id]);

  if (!council) {
    return (
      <div className="text-white flex justify-center items-center ">
        Council not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen relative w-full overflow-hidden  bg-linear-to-b from-[#10212E] to-[#162C3D] -mt-30 pt-20">
      <BgBoxMainPage maxHeight={200} />

      <div className="relative z-10 container mx-auto w-full max-w-6xl mt-6 px-4">
        <CouncilHero council={council} />
        <DescriptionSection council={council} />
        <RepresentativesSection council={council} />
        <EventsSection council={council} setSelectedEvent={setSelectedEvent} setIsModalOpen={setIsModalOpen}/>
        <ArticleSection council={council} />
      </div>

      <Footer />

      <PreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
        onShare={handleShare}
        onInvite={() => handleInvite(selectedEvent?.url ?? null)}
      />
    </div>
  );
};

export default CouncilDetailPage;
