"use client";

import React from "react";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import Footer from "@/components/shared/Footer";
import { CouncilHeader } from "./components/CouncilHeader";
import { CouncilSections } from "./components/CouncilSections";

const CouncilPage = () => {

  return (
    // allow vertical growth; keep x hidden for aesthetics
    <div className="min-h-screen relative w-full overflow-hidden bg-linear-to-b from-[#10212E] to-[#162C3D] -mt-30 pt-20">
      <BgBoxMainPage maxHeight={200} />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 xl:px-2 w-full max-w-6xl mt-4">
        <CouncilHeader />

        {/* Council Sections */}
        <CouncilSections />
      </div>

      <Footer />
    </div>
  );
};

export default CouncilPage;
