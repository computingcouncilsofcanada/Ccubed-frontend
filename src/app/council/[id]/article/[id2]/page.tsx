"use client";

import React from "react";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import Footer from "@/components/shared/Footer";

import { MainArticleHeader, MainArticleGrid, MainLatestArticles } from "../../../components/MainArticleComponents";


const ArticlePage = () => {
  return (
    <div className="min-h-screen relative w-full overflow-hidden bg-gradient-to-b from-[#10212E] to-[#162C3D] -mt-30 pt-20">
      <BgBoxMainPage maxHeight={200} />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 xl:px-2 w-full max-w-[1152px] mt-4 text-white">
        <MainArticleHeader />
        <MainArticleGrid />
        <MainLatestArticles />
      </div>
      <Footer />
    </div>
  );
};

export default ArticlePage;
