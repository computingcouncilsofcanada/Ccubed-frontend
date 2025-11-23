"use client";

import { useState, useEffect } from "react";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import { ArticleHeader } from "./components/ArticleHeader";
import { ArticleHero } from "./components/ArticleHero";
import Footer from "@/components/shared/Footer";
import { CouncilArticle } from "./components/CouncilArticle";
import { LatestArticle } from "./components/LatestArticle";

const ArticlePage = () => {
  return (
    <>
      <BgBoxMainPage maxHeight={100} />
      <div className="relative w-full overflow-hidden -mt-30 pt-20 h-full">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 xl:px-2 w-full max-w-[1152px] mt-4">
          <ArticleHeader />
          <ArticleHero />
        </div>
        <CouncilArticle />
        <LatestArticle />

        <div className="mt-12">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ArticlePage;
