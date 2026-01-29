"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockArticles } from "@/data/mockArticles";
import React from "react";
import { IArticle } from "@/data/mockArticles";
import { usePathname } from "next/navigation";
import { MoveRight } from "lucide-react";
import { CouncilSection } from "@/app/council/types/types";
import { useRouter } from "next/navigation";

type CouncilProps = {
  council: CouncilSection;
};

// ============================================================================
// ARTICLE BIG CARD COMPONENT
// ============================================================================
export const ArticleBigcard = ({ council }: { council: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [windowWidth, setWindowWidth] = useState(() => {
    // Initialize with current window width if available, fallback to desktop size
    if (typeof window !== "undefined") {
      return window.innerWidth;
    }
    return 1024; // Default to desktop size for SSR
  });

  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    // Ensure window width is correctly set after hydration
    if (typeof window !== "undefined") {
      updateWidth();
    }
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  const shouldShowExpanded = isExpanded || isHovered;

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const article1 = mockArticles.find((article) => article.council === council);

  if (!article1) {
    return null;
  }

  return (
    <div
      className="[@media(min-width:1054px)]:w-1/2  relative flex flex-col cursor-pointer gap-4 "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <motion.div
        className={` rounded-4xl `}
        animate={{
          height: shouldShowExpanded
            ? windowWidth > 600
              ? "428px"
              : "500px"
            : "330px",
          backgroundColor: shouldShowExpanded ? "#D4D4D41A" : "transparent",
        }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1],
          type: "tween",
        }}
      >
        <div className="relative w-full h-50 rounded-4xl overflow-hidden">
          <Image
            src="/ArticlePics/ArticleImage.png"
            alt="Article Image"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col  md:gap-0 gap-4">
          <div className="flex flex-col md:flex-row justify-between md:items-center items-start md:gap-0 leading-12 tracking-[0.01em] text-white px-4">
            <div className="flex gap-4">
              <p>{article1.title}</p>
              <p>{article1.read_min}</p>
            </div>
            <p>{article1.date}</p>
          </div>
          <p className=" tracking-[0.01em] text-white font-extrabold text-xl px-4">
            {article1.description}
          </p>
        </div>
        <AnimatePresence>
          {shouldShowExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              className=""
            >
              {/* Description - Fixed Height */}
              <div className="h-25 mt-4 px-4  overflow-hidden">
                <p
                  className="text-white h-full overflow-hidden font-bold"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {article1.bigdescription}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// ============================================================================
// ARTICLE BODY COMPONENT
// ============================================================================
export const ArticleBody = () => {
  const pathname = usePathname();
  const council = pathname.split("/").pop();
  const otherThreeArticles = mockArticles
    .filter((article) => article.council === council)
    .slice(1, 4);

  if (!council) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col [@media(min-width:1054px)]:flex-row gap-7">
      <ArticleBigcard council={council} />
      <div className="[@media(min-width:1054px)]:w-1/2 max-[1054px]:items-center flex flex-col gap-2 max-md:mt-8">
        {otherThreeArticles.map((article) => (
          <React.Fragment key={`article-${article.id}`}>
            <InformationCard article={article} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// INFORMATION CARD COMPONENT
// ============================================================================
type InformationCardProps = {
  article: IArticle;
};

export const InformationCard = ({ article }: InformationCardProps) => {
  const { title, description, read_min, date, bigdescription } = article;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="flex gap-4 cursor-pointer relative rounded-2xl px-2  py-0.5 transition-all "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial="initial"
      animate={isHovered ? "hover" : "initial"}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className=" 
        absolute inset-0 -z-10 rounded-2xl
        bg-white/10
        backdrop-blur-xl
        border border-white/20
        shadow-[0_8px_30px_rgba(0,0,0,0.12)]
      "
          />
        )}
      </AnimatePresence>

      <motion.div
        className="relative w-40 h-40 flex-shrink-0 rounded-2xl mt-1.5 overflow-visible"
        variants={{
          initial: {
            filter: "brightness(1)",
          },
          hover: {
            filter: "brightness(1.2)",
          },
        }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: isHovered
            ? "0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.2)"
            : "0 0 0px rgba(255, 255, 255, 0)",
        }}
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          <Image
            src="/ArticlePics/ArticleComputer.png"
            alt="Article Image"
            fill
            className="object-cover"
          />
        </div>
      </motion.div>

      <div className="flex flex-col gap-3 flex-1 relative overflow-hidden min-h-[180px]">
        {/* Top row with category and date */}
        <AnimatePresence>
          {!isHovered ? (
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col md:flex-row md:items-center md:justify-between items-start gap-2"
            >
              <span className=" py-1 px-3 rounded-2xl bg-[#D4D4D4]/10 text-gray-300 text-sm font-medium">
                {title}
              </span>
              <span className="text-white text-sm">{date}</span>
            </motion.div>
          ) : (
            <div className="h-[28px]"></div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isHovered ? (
            <motion.span
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-white text-sm"
            >
              {read_min}
            </motion.span>
          ) : (
            <div className="h-[20px]"></div>
          )}
        </AnimatePresence>

        <div className="relative min-h-[100px]">
          <AnimatePresence mode="wait">
            {!isHovered ? (
              <motion.h3
                key="title"
                initial={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="text-white font-bold text-lg leading-tight tracking-[0.01em] absolute inset-0"
              >
                {description}
              </motion.h3>
            ) : (
              <motion.div
                key="description"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: -50 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col gap-3"
              >
                <h3
                  className="
                font-bold text-lg leading-tight tracking-[0.01em]
                bg-gradient-to-r from-[#FDE68A] via-[#FBBF24] to-[#F59E0B]
                bg-clip-text text-transparent
              "
                >
                  {description}
                </h3>

                <AnimatePresence>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className="text-white text-sm "
                  >
                    {bigdescription ||
                      "Cybersecurity in 2025 is evolving faster than ever, with AI-driven attacks becoming more sophisticated and harder to detect."}
                  </motion.p>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// ARTICLE HEADER COMPONENT
// ============================================================================
export const ArticleHeader = ({ council }: CouncilProps) => {
  const router = useRouter();

  const handleClick = (section: { title: string }) => {
    const cleanTitle = section.title.toLowerCase().replace(/\s+/g, "");
    router.push(`/council/${cleanTitle}/article`);
  };
  return (
    <div className="text-start mb-6">
      <h2
        className="text-[36px] font-extrabold leading-12 tracking-[0.01em] text-white mb-4"
        style={{ fontFamily: "Roboto, sans-serif" }}
      >
        Latest Articles
      </h2>
      <div className="flex flex-col md:flex-row justify-between md:items-center items-start md:gap-0 gap-4">
        <p
          className="text-white font-light text-[18px] leading-[26px] tracking-[0.01em]"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Take a quick look at our latest articles. Enjoy the content? Head to
          the Explore Articles page to discover more.
        </p>
        <motion.div
          className="flex gap-2 items-center cursor-pointer"
          whileHover="hover"
          initial="initial"
          variants={{
            initial: {},
            hover: {},
          }}
          onClick={() => handleClick(council)}
        >
          <motion.p
            className="text-white font-light text-[18px]"
            style={{ fontFamily: "Roboto, sans-serif" }}
            variants={{
              initial: { x: 10 },
              hover: { x: -3 },
            }}
          >
            See All
          </motion.p>

          <motion.div
            variants={{
              initial: { opacity: 0 },
              hover: { opacity: 1 },
            }}
          >
            <MoveRight className="text-white" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
