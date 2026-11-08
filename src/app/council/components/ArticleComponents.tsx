import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { mockArticles } from "@/data/mockArticles";
import { IArticle } from "@/data/mockArticles";
import { councilSections } from "@/data/councilSections";




// ============================================================================
// ARTICLE HEADER COMPONENT
// ============================================================================

export const ArticleHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center my-16"
    >
      <div className="">
        <h1
          className="text-[32px] sm:text-[40px] leading-10 sm:leading-12 tracking-[0.01em] font-extrabold text-white"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Article
        </h1>
      </div>

      <p
        className="text-white text-center text-[16px] sm:text-[20px] font-light leading-6 sm:leading-[27px] w-full max-w-[80ch] mx-auto px-4"
        style={{ fontFamily: "Roboto, sans-serif" }}
      >
        Our goal is to facilitate the entry of newcomers and enthusiasts into
        one of Tech&apos;s most important fields: cybersecurity. We believe
        security should be taught sooner, more engagingly, and more
        enthusiastically.
      </p>
    </motion.div>
  );
};

// ============================================================================
// ARTICLE HERO COMPONENT
// ============================================================================

export const ArticleHero = () => {
  const pathname = usePathname();
  const councilSlug = pathname.split("/")[2];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter articles by council (match slug)
  const councilArticles = mockArticles
    .filter((article) => {
      const articleCouncilSlug = article.council.toLowerCase().replace(/\s+/g, "");
      return articleCouncilSlug === councilSlug;
    })
    .slice(0, 5);

  // Handle navigation
  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? councilArticles.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === councilArticles.length - 1 ? 0 : prev + 1
    );
  };

  // No articles – empty state (same styling as latest articles section)
  if (councilArticles.length === 0) {
    return (
      <div className="text-center text-white/60 py-8 my-16">
        <p>No other articles available at the moment.</p>
      </div>
    );
  }

  const currentArticle = councilArticles[currentIndex];
  const hasMultipleArticles = councilArticles.length > 1;

  return (
    <div className="flex flex-col gap-7 text-white">
      <div className="flex [@media(min-width:1054px)]:flex-row flex-col justify-between gap-7">
        <div className="[@media(min-width:1054px)]:w-1/2 w-full max-[1054px]:h-100 relative rounded-xl overflow-hidden h-[400px]">
          <Image
            src={currentArticle.img_url || "/ArticlePics/ArticleHero.png"}
            alt={currentArticle.title}
            fill
            className="object-cover"
          />
          {hasMultipleArticles && (
            <div className="absolute bottom-5 right-5 flex gap-2">
              <button
                onClick={handlePrevious}
                className="p-4 rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-all"
                aria-label="Previous article"
              >
                <img src="/ArticlePics/arrowLeft.svg" alt="Previous" />
              </button>
              <button
                onClick={handleNext}
                className="p-4 rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-all"
                aria-label="Next article"
              >
                <img src="/ArticlePics/arrowRight.svg" alt="Next" />
              </button>
            </div>
          )}
        </div>
        <div className="w-full [@media(min-width:1054px)]:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            {currentArticle.title}
          </h1>
          <div className="flex gap-5 items-center flex-wrap">
            <p className="px-2 py-1 bg-[#D4D4D4]/10 rounded-2xl w-fit text-sm">
              {currentArticle.title || "Article"}
            </p>
            <p className="text-sm">{currentArticle.read_min}</p>
            <div className="flex gap-2 items-center">
              <img src="/ArticlePics/note.svg" alt="Date" />
              <p className="text-sm">{currentArticle.date || "Recent"}</p>
            </div>
          </div>
          <p className="font-medium">
            {currentArticle.bigdescription ||
              "Cybersecurity in 2025 is revolving faster than ever, with AI Driven attacks becoming more sophisticated and harder to detect. New Global Resolutions and Security frameworks are pushing organizations..."}
          </p>
        </div>
      </div>
      {hasMultipleArticles && (
        <div className="flex justify-center items-center">
          <div className="flex gap-1">
            {councilArticles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`${
                  index === currentIndex
                    ? "bg-gradient-to-b from-brand to-[#FFFFFF]"
                    : "bg-[#D4D4D4]/10"
                } rounded-full size-2 transition-all cursor-pointer`}
                aria-label={`Go to article ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// ARTICLES COMPONENT
// ============================================================================

export const Articles = ({ articles }: { articles: IArticle[] }) => {
  const router = useRouter();
  return (
    <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 xl:px-2 w-full max-w-6xl mt-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-4 cursor-pointer"
      >
        {articles.map((article) => (
          <div
            className="relative flex flex-col gap-4 mb-4 rounded-xl p-2 cursor-pointer group transition-all duration-300"
            key={article.id}
            onClick={() => router.push(`/article/${article.id}`)}
          >
            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/6"></div>

            <div className="h-40 rounded-xl overflow-hidden relative z-10">
              <Image
                src="/ArticlePics/ArticleComputer.png"
                alt={article.title}
                fill
                objectFit="cover"
              />
            </div>
            <div className="text-white flex flex-col gap-3 relative z-10">
              <p className="px-2 py-1 bg-[#D4D4D4]/10 rounded-2xl w-fit ">
                {article.title}
              </p>
              <div className="flex items-center gap-3">
                <p>{article.read_min}</p>
                <div className="flex gap-2 items-center">
                  <img src="/ArticlePics/note.svg" alt="" />
                  <p>{article.title}</p>
                </div>
              </div>
              <p>{article.bigdescription}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// ============================================================================
// COUNCIL ARTICLE COMPONENT
// ============================================================================

export const CouncilArticle = () => {
  const router = useRouter();
  return (
    <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 xl:px-2 w-full max-w-6xl mt-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center my-16"
      >
        <div className="">
          <h1
            className="text-[32px] sm:text-[40px] leading-10 sm:leading-12 tracking-[0.01em] font-extrabold text-white"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Council Articles
          </h1>
        </div>

        <p
          className="text-white text-center text-[16px] sm:text-[20px] font-light leading-6 sm:leading-[27px] w-full max-w-[80ch] mx-auto px-4"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Discover articles crafted by the council, covering key issues and
          decisions. Get clear, reliable information to understand what&apos;s
          happening behind the scenes.
        </p>
      </motion.div>
      <div className="flex flex-wrap justify-center gap-4 text-white">
        {councilSections.map((section) => (
          <div
            key={section.title}
            className="group flex flex-col gap-2 w-full sm:w-[45%] md:w-[30%] cursor-pointer"
            onClick={() => {
              if (!section.comingSoon) {
                router.push(
                  `/council/${section.title.toLowerCase().replace(/\s+/g, "")}`
                );
              }
            }}
          >
            <div className="h-60 rounded-xl overflow-hidden relative transition-shadow duration-300 group-hover:shadow-[0_0_13px_rgba(255,255,255,0.3)]">
              <Image src={section.icon} alt={section.title} fill />
            </div>

            <div className="flex flex-col gap-6 relative">
              <h3 className="font-bold text-xl">
                {section.title}
              </h3>
              <div className="relative pr-10 pl-10 pb-3">
                <p className="font-regular text-md  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {section.shortDescription}
                </p>
                <div
                  className="absolute bottom-0 left-0 right-0 top-1/4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                  style={{
                    borderBottom: "1px solid #9290C3",
                    background: `
                      linear-gradient(to top, #9290C3, transparent) left/1px 100% no-repeat,
                      linear-gradient(to top, #9290C3, transparent) right/1px 100% no-repeat
                    `,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// LATEST ARTICLE COMPONENT
// ============================================================================

// ============================================================================
// LATEST ARTICLE COMPONENT
// ============================================================================

export const LatestArticle = () => {
  const pathname = usePathname();
  const councilSlug = pathname.split("/")[2];

  // Filter articles by council (match slug: council title normalized)
  const filteredArticles = mockArticles.filter((article) => {
    const articleCouncilSlug = article.council.toLowerCase().replace(/\s+/g, "");
    return articleCouncilSlug === councilSlug;
  });


  return (
    <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 xl:px-2 w-full max-w-6xl mt-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-left my-16 flex flex-col gap-3"
      >
        <div className="">
          <h1
            className="text-[32px] sm:text-[40px] leading-10 sm:leading-12 tracking-[0.01em] font-extrabold text-white"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Latest Articles
          </h1>
        </div>

        <p
          className="text-white text-left text-lg font-light w-full max-w-[80ch]"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Discover articles crafted by the council, covering key issues and
          decisions. Get clear, reliable information to understand what&apos;s
          happening behind the scenes.
        </p>
      </motion.div>
      {filteredArticles.length > 0 ? (
        <Articles articles={filteredArticles} />
      ) : (
        <div className="text-center text-white/60 py-8 my-16">
          <p>No other articles available at the moment.</p>
        </div>
      )}
    </div>
  );
};
