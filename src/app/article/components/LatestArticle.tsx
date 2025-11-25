import { motion } from "framer-motion";
import { ArticleFilterBar } from "./ArticleFilterBar";
import { useState } from "react";
import { options } from "./Calculations";
import { Articles } from "./Articles";
export const LatestArticle = () => {
  const [articleType, setArticleType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<string>("list");
  return (
    <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 xl:px-2 w-full max-w-[1152px] mt-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-left my-16 flex flex-col gap-3"
      >
        <div className="">
          <h1
            className="text-[32px] sm:text-[40px] leading-[40px] sm:leading-[48px] tracking-[0.01em] font-extrabold text-white"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Latest Articles
          </h1>
        </div>

        <p
          className="text-white text-left text-lg font-light  w-full max-w-[80ch] "
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Discover articles crafted by the council, covering key issues and
          decisions. Get clear, reliable information to understand what’s
          happening behind the scenes.
        </p>
      </motion.div>
      <ArticleFilterBar
        eventType={articleType}
        onArticleTypeChange={setArticleType}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        options={options}
      />
      <Articles />
    </div>
  );
};
