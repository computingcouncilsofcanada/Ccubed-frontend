"use client";

import React from "react";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import Footer from "@/components/shared/Footer";

const ArticlePage = () => {

  return (
    // allow vertical growth; keep x hidden for aesthetics
    <div className="min-h-screen relative w-full overflow-hidden bg-gradient-to-b from-[#10212E] to-[#162C3D] -mt-30 pt-20">
      <BgBoxMainPage maxHeight={200} />

      <Footer />
    </div>
  );
};

export default ArticlePage;