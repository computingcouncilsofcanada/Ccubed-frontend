"use client";

import React from 'react';
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import Footer from "@/components/shared/Footer";
import MainSection from "./components/MainSection";
import DescriptionSection from "./components/DescriptionSection";
import RepresentativesSection from "./components/RepresentativesSection";
import EventsSection from "./components/EventsSection";

const CouncilDetailPage = () => {

  return (
    <div className="min-h-screen relative w-full overflow-hidden  bg-gradient-to-b from-[#10212E] to-[#162C3D] -mt-30 pt-20">
      <BgBoxMainPage maxHeight={200} />

      <div className="relative z-10 container mx-auto w-full max-w-[1152px] mt-6 px-4">
        <MainSection />
        <DescriptionSection />
        <RepresentativesSection />
        <EventsSection />
      </div>

      <Footer />
    </div>
  );
};

export default CouncilDetailPage;
