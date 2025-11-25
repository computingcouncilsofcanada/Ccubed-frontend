"use client";

import { useState, useEffect, useMemo } from "react";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import { ArticleHeader } from "./components/ArticleHeader";
import { ArticleHero } from "./components/ArticleHero";
import Footer from "@/components/shared/Footer";
import { CouncilArticle } from "./components/CouncilArticle";
import { LatestArticle } from "./components/LatestArticle";
import { useParams } from "next/navigation";
import { councilSections } from "./components/Calculations";

const ArticlePage = () => {
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
        Article not found.
      </div>
    );
  }
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
