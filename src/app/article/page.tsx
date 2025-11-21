"use client";

import { useState, useEffect } from "react";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import { ArticleHeader } from "./components/ArticleHeader";

const ArticlePage = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen relative w-full overflow-hidden bg-gradient-to-b from-[#10212E] to-[#162C3D] -mt-30 pt-20">
      {isHydrated && <BgBoxMainPage maxHeight={400} />}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 xl:px-2 w-full max-w-[1152px] mt-4">
        <ArticleHeader />
      </div>
    </div>
  );
};

export default ArticlePage;
