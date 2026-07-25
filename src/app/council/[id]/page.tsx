"use client";

import React, { useState, useMemo } from "react";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import Footer from "@/components/shared/Footer";
import {
  CouncilHero,
  UniversitiesSection,
  RepresentativesSection,
  EventsSection,
  ArticleSection,
} from "../components/SpecificCouncilComponents";
import { Events } from "@/types/events";
import { councilSections } from "@/data/councilSections";
import { useParams } from "next/navigation";
import PreviewModal from "@/components/modals/PreviewModal";

const AiNodesBackground = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
    <div className="relative mx-auto h-full w-full max-w-[1440px]">
      <img
        src="/FigmaFiles/councilAssets/brain-final.svg"
        alt=""
        aria-hidden="true"
        className="absolute select-none opacity-60"
        style={{ top: 38, left: 699, width: 670, height: 670 }}
        draggable={false}
      />
      <img
        src="/FigmaFiles/councilAssets/nodes.png"
        alt=""
        aria-hidden="true"
        className="absolute select-none"
        style={{ top: 889, left: 1167, width: 513, height: 513 }}
        draggable={false}
      />
      <img
        src="/FigmaFiles/councilAssets/nodes.png"
        alt=""
        aria-hidden="true"
        className="absolute select-none"
        style={{
          top: 1999.13,
          left: -368,
          width: 428.68,
          height: 428.68,
          transform: "rotate(-143.52deg)",
        }}
        draggable={false}
      />
      <img
        src="/FigmaFiles/councilAssets/nodes.png"
        alt=""
        aria-hidden="true"
        className="absolute select-none"
        style={{ top: 2229, left: 1251, width: 513, height: 513 }}
        draggable={false}
      />
      <img
        src="/FigmaFiles/councilAssets/nodes 4.svg"
        alt=""
        aria-hidden="true"
        className="absolute select-none"
        style={{ top: 1372, left: 63, width: 529.58, height: 529.58 }}
        draggable={false}
      />
    </div>
  </div>
);

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

  const isAiCouncil = council.title
    .toLowerCase()
    .includes("artificial intelligence");

  return (
    <div className="min-h-screen relative w-full overflow-hidden  bg-linear-to-b from-[#10212E] to-[#162C3D] -mt-30 pt-20">
      {isAiCouncil ? <AiNodesBackground /> : <BgBoxMainPage maxHeight={200} />}

      <div className="relative z-10 container mx-auto w-full max-w-6xl mt-6 px-4">
        <CouncilHero council={council} />
        <UniversitiesSection council={council} />
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
