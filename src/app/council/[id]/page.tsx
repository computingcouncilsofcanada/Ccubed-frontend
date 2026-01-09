"use client";

import React, { useMemo } from "react";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import Footer from "@/components/shared/Footer";
import {
  MainSection,
  DescriptionSection,
  RepresentativesSection,
  EventsSection,
  ArticleSection,
} from "../components/SpecificCouncilComponents";
import { councilSections } from "@/data/councilSections";
import { useParams } from "next/navigation";

const CouncilDetailPage = () => {
  const params = useParams();
  const { id } = params;

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
        <MainSection council={council} />
        <DescriptionSection council={council} />
        <RepresentativesSection />
        <EventsSection />
        <ArticleSection council={council} />
      </div>

      <Footer />
    </div>
  );
};

export default CouncilDetailPage;
