import { motion } from "framer-motion";
import { IconList, IconApps } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { mockArticles } from "@/data/mockArticles";
import { IArticle } from "@/data/mockArticles";


// ============================================================================
// DATA AND CONSTANTS
// ============================================================================

export const options = [
  { label: "All", value: "all" },
  { label: "Artificial Intelligence", value: "artificialintelligence" },
  { label: "CyberSecurity", value: "cybersecurity" },
  { label: "Women In Tech", value: "womenintech" },
];

export const councilSections = [
  {
    title: "Cybersecurity Council",
    shortDescription:
      "Our goal is to facilitate the entry of newcomers and enthusiasts into one of Tech's most important fields: cybersecurity. We believe security should be taught sooner, more engagingly, and more enthusiastically.",
    fullDescription:
      " Our goal is to facilitate the entry of newcomers and enthusiasts into one of Tech's most important fields: cybersecurity. We believe security should be taught sooner, more engagingly, and more enthusiastically. We and numerous Canadian universities have paired up to create this very council, one that facilitates the engagement of your local cyber club by introducing you with industry professionals, educational events tailored to you, and ready made content for your next cybersecurity workshops. No more need to spend countless hours swimming through LinkedIn contacts and Internet write-ups, we've got you.",
    icon: "/FigmaFiles/councilAssets/Cybersecurity_council.png",
  },
  {
    title: "Artificial Intelligence Council",
    shortDescription: "Coming Soon",
    fullDescription: "Coming Soon",
    icon: "/FigmaFiles/councilAssets/CCubed_icon.png",
  },
  {
    title: "Women in Tech Council",
    shortDescription: "Coming Soon",
    fullDescription: "Coming Soon",
    icon: "/FigmaFiles/councilAssets/CCubed_icon.png",
  },
];

const CONTAINER_WIDTH = 600; // px
const PADDING = 8; // p-1 x2
const INNER_WIDTH = CONTAINER_WIDTH - PADDING;
const OPTION_WIDTH = INNER_WIDTH / options.length;

const VIEW_OPTIONS = ["list", "grid"];
const VIEW_CONTAINER_WIDTH = 108; // px
const VIEW_PADDING = 8; // p-1 x2
const VIEW_INNER_WIDTH = VIEW_CONTAINER_WIDTH - VIEW_PADDING;
const VIEW_OPTION_WIDTH = VIEW_INNER_WIDTH / VIEW_OPTIONS.length;
//  const MOBILE_COLS = 2;
//  const MOBILE_OPTION_WIDTH = CONTAINER_WIDTH / MOBILE_COLS;
//  const MOBILE_OPTION_HEIGHT = 56;

type CouncilArticleType = {
  src: string;
  name: string;
  subtext: string;
};

const CouncilArticles: CouncilArticleType[] = [
  {
    src: "/ArticlePics/ArticleHero.png",
    name: "Women In Tech",
    subtext:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit Reprehenderit voluptate temporibus aut ipsum unde consequatur minima ex libero iusto quo.",
  },
  {
    src: "/ArticlePics/ArticleHero.png",
    name: "Artificial Intelligence",
    subtext:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit Reprehenderit voluptate temporibus aut ipsum unde consequatur minima ex libero iusto quo.",
  },
  {
    src: "/ArticlePics/ArticleHero.png",
    name: "CyberSecurity",
    subtext:
      "Cybersecurity in 2025 is evolving faster than ever, with AI-driven attacks becoming more sophisticated and harder to detect. New global regulations and security frameworks ",
  },
];

type ArticleHeaderProps = {
  eventType: string;
  onArticleTypeChange: (type: string) => void;
  viewMode: string;
  onViewModeChange: (mode: string) => void;
  options: { label: string; value: string }[];
};

// ============================================================================
// ARTICLE FILTER BAR COMPONENT
// ============================================================================

export function ArticleFilterBar({
  eventType,
  onArticleTypeChange,
  viewMode,
  onViewModeChange,
  options,
}: ArticleHeaderProps) {
  const index = options.findIndex((o) => o.value === eventType);

  const COLS = 2; // always 2 columns on mobile
  const ITEM_W = 150;
  // const ITEM_H = 48;
  const GAP_Y = 56;

  const mobileX = ITEM_W * (index % COLS);
  const mobileY = GAP_Y * Math.floor(index / COLS);

  return (
    <div className="flex justify-between items-center mt-7 ">
      <div
        className="grid grid-cols-2 gap-1 rounded-lg p-1 bg-[#0B161E] relative md:hidden"
        style={{ width: `310px`, height: "112px" }}
      >
        {/* MOBILE Sliding Background Indicator */}
        <motion.div
          className="absolute rounded-lg"
          style={{
            height: "48px",
            width: 300 / 2, // 150px per column
            backgroundColor: "rgba(19, 40, 54, 0.8)",
            top: 4,
            left: 4,
          }}
          animate={{
            x: mobileX,
            y: mobileY,
          }}
          transition={{
            duration: 0.45,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {/* MOBILE Sliding Border */}
        <motion.div
          className="absolute rounded-lg pointer-events-none"
          style={{
            height: "48px",
            width: 300 / 2,
            background:
              "linear-gradient(to top, rgba(61, 131, 178, 1) 0%, rgba(26, 56, 76, 0) 100%)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "xor",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            padding: "1.5px",
            top: 4,
            left: 4,
          }}
          animate={{
            x: mobileX,
            y: mobileY,
          }}
          transition={{
            duration: 0.45,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {/* MOBILE OPTIONS */}
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center justify-center rounded-lg cursor-pointer text-white relative z-10 h-12"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontSize: "14px",
              fontWeight: eventType === option.value ? 400 : 300,
            }}
          >
            <input
              type="radio"
              name="eventType"
              value={option.value}
              checked={eventType === option.value}
              onChange={() => onArticleTypeChange(option.value)}
              className="hidden"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>

      {/* Event Type Filter */}
      <div
        className="flex gap-1 rounded-lg p-1 bg-[#0B161E] max-md:hidden relative"
        style={{ width: `${CONTAINER_WIDTH}px`, height: "56px" }}
      >
        {/* Sliding Background Indicator */}
        <motion.div
          className="absolute top-1 rounded-lg"
          style={{
            height: "48px",
            width: OPTION_WIDTH,
            backgroundColor: "rgba(19, 40, 54, 0.8)",
          }}
          animate={{
            x: OPTION_WIDTH * index,
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {/* Sliding Gradient Border */}
        <motion.div
          className="absolute top-1 rounded-lg pointer-events-none"
          style={{
            height: "48px",
            width: OPTION_WIDTH,
            background:
              "linear-gradient(to top, rgba(61, 131, 178, 1) 0%, rgba(26, 56, 76, 0) 100%)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "xor",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            padding: "1.5px",
          }}
          animate={{
            x: OPTION_WIDTH * index,
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {options.map((option) => (
          <motion.label
            key={option.value}
            className="flex items-center justify-center flex-1 rounded-lg cursor-pointer text-white relative z-10"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontSize: "16px",
              fontWeight: eventType === option.value ? 400 : 300,
              letterSpacing: "1%",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input
              type="radio"
              name="eventType"
              value={option.value}
              checked={eventType === option.value}
              onChange={() => onArticleTypeChange(option.value)}
              className="hidden"
            />
            <span className="relative z-10">{option.label}</span>
          </motion.label>
        ))}
      </div>

      {/* View Mode Toggle */}
      <div
        className="flex gap-1 rounded-lg p-1 bg-[#0B161E] relative"
        style={{ width: `${VIEW_CONTAINER_WIDTH}px`, height: "56px" }}
      >
        {/* Sliding Background Indicator */}
        <motion.div
          className="absolute top-1 rounded-lg"
          style={{
            height: "48px",
            width: VIEW_OPTION_WIDTH,
            backgroundColor: "rgba(19, 40, 54, 0.8)",
            borderRadius: "8px",
          }}
          animate={{
            x: VIEW_OPTION_WIDTH * VIEW_OPTIONS.indexOf(viewMode),
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {/* Sliding Gradient Border */}
        <motion.div
          className="absolute top-1 rounded-lg pointer-events-none"
          style={{
            height: "48px",
            width: VIEW_OPTION_WIDTH,
            borderRadius: "8px",
            background:
              "linear-gradient(to top, rgba(61, 131, 178, 1) 0%, rgba(26, 56, 76, 0) 100%)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "xor",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            padding: "1.5px",
          }}
          animate={{
            x: VIEW_OPTION_WIDTH * VIEW_OPTIONS.indexOf(viewMode),
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {[
          { icon: IconList, value: "list" },
          { icon: IconApps, value: "grid" },
        ].map(({ icon: Icon, value }) => (
          <motion.button
            key={value}
            className="relative z-10"
            style={{
              width: VIEW_OPTION_WIDTH,
              height: "48px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: "none",
              background: "transparent",
              padding: 0,
              margin: 0,
            }}
            onClick={() => onViewModeChange(value)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Icon
              size={24}
              stroke={1.5}
              color={
                viewMode === value ? "#FFFFFF" : "rgba(255, 255, 255, 0.7)"
              }
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}

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
  return (
    <div className="flex flex-col gap-7 text-white ">
      <div className=" flex [@media(min-width:1054px)]:flex-row flex-col justify-between gap-7">
        <div className="[@media(min-width:1054px)]:w-1/2 w-full max-[1054px]:h-100 relative rounded-xl overflow-hidden ">
          <Image src="/ArticlePics/ArticleHero.png" alt="Hero Image" fill />
          <div className="absolute bottom-5 right-5 flex gap-2 cursor-pointer">
            <div className="p-4 w-1/2 rounded-xl border flex items-center justify-center">
              <img src="/ArticlePics/arrowLeft.svg" alt="" />
            </div>
            <div className="p-4 w-1/2 rounded-xl border flex items-center justify-center">
              <img src="/ArticlePics/arrowRight.svg" alt="" />
            </div>
          </div>
        </div>
        <div className=" w-full [@media(min-width:1054px)]:w-1/2 flex flex-col gap-4">
          <h1 className=" text-5xl font-bold">
            The State of Cybersecurity in 2025: What You Need to Know
          </h1>
          <div className="flex gap-5 items-center">
            <p className="px-2 py-1 bg-[#D4D4D4]/10 rounded-2xl w-fit ">
              Information Security
            </p>
            <p>7 mins read</p>
            <div className="flex gap-2 items-center">
              <img src="/ArticlePics/note.svg" alt="" />
              <p>Nov 21, 2025</p>
            </div>
          </div>
          <p className="font-medium">
            Cybersecurity in 2025 is evolving faster than ever, with AI-driven
            attacks becoming more sophisticated and harder to detect. New global
            regulations and security frameworks are pushing organizations to
            rethink how they protect data and manage digital risks. To stay
            ahead, individuals and businesses must adopt stronger
            authentication, continuous monitoring, and proactive
            threat-prevention strategies.
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex gap-1">
          {Array.from({ length: 5 }, (_v, index) => (
            <div
              key={index}
              className={`${
                index === 0
                  ? "bg-linear-to-b from-[#FAA336] to-[#FFFFFF]"
                  : "bg-[#D4D4D4]/10"
              } rounded-full size-2 `}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// ARTICLES COMPONENT
// ============================================================================

export const Articles = ({articles}: {articles: IArticle[]}) => {
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
      <p>{article.description}</p>
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
        {CouncilArticles.map(({ name, subtext, src }) => (
          <div
            key={name}
            className="group flex flex-col gap-2 w-full sm:w-[45%] md:w-[30%] cursor-pointer"
          >
            <div className="h-60 rounded-xl overflow-hidden relative transition-shadow duration-300 group-hover:shadow-[0_0_13px_rgba(255,255,255,0.3)]">
              <Image src={src} alt={name} fill />
            </div>

             <div className="flex flex-col gap-6 relative">
              <h3 className="font-bold text-xl">{name}</h3>
              <div className="relative pr-10 pl-10 pb-3">
                <p className="font-regular text-md  opacity-0 group-hover:opacity-100 transition-opacity duration-300">{subtext}</p>
                <div
                  className="absolute bottom-0 left-0 right-0 top-1/4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                  style={{
                    borderBottom: "1px solid #9290C3",
                    background: `
                      linear-gradient(to top, #9290C3, transparent) left/1px 100% no-repeat,
                      linear-gradient(to top, #9290C3, transparent) right/1px 100% no-repeat
                    `
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

export const LatestArticle = () => {
  const [articleType, setArticleType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<string>("list");
  const pathname = usePathname();
  const council = pathname.split("/")[2];

  const articles = mockArticles.filter((article)=> article.council === council);
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
          className="text-white text-left text-lg font-light  w-full max-w-[80ch] "
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Discover articles crafted by the council, covering key issues and
          decisions. Get clear, reliable information to understand what&apos;s
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
      <Articles articles={articles} />
    </div>
  );
};
