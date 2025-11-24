import { ArticleHeader } from "./ArticleHeader";
import { ArticleHero } from "./ArticleHero";
import { motion } from "framer-motion";
import Image from "next/image";

export const CouncilArticle = () => {
  return (
    <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 xl:px-2 w-full max-w-[1152px] mt-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center my-16"
      >
        <div className="">
          <h1
            className="text-[32px] sm:text-[40px] leading-[40px] sm:leading-[48px] tracking-[0.01em] font-extrabold text-white"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Council Articles
          </h1>
        </div>

        <p
          className="text-white text-center text-[16px] sm:text-[20px] font-light leading-[24px] sm:leading-[27px] w-full max-w-[80ch] mx-auto px-4"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Discover articles crafted by the council, covering key issues and
          decisions. Get clear, reliable information to understand what’s
          happening behind the scenes.
        </p>
      </motion.div>
      <div className="flex flex-col gap-7 text-white ">
        <div className=" flex cope:flex-row flex-col justify-between gap-7">
          <div className="cope:w-1/2 w-full max-cope:h-100 relative rounded-xl overflow-hidden">
            <Image src="/ArticlePics/ArticleHero.png" alt="" fill></Image>
            <div className="absolute bottom-5 right-5 flex gap-2 cursor-pointer">
              <div className="p-4 w-1/2 rounded-xl border flex items-center justify-center">
                <img src="/ArticlePics/arrowLeft.svg" alt="" />
              </div>
              <div className="p-4 w-1/2 rounded-xl border flex items-center justify-center">
                <img src="/ArticlePics/arrowRight.svg" alt="" />
              </div>
            </div>
          </div>
          <div className=" w-full cope:w-1/2 flex flex-col gap-4">
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
              attacks becoming more sophisticated and harder to detect. New
              global regulations and security frameworks are pushing
              organizations to rethink how they protect data and manage digital
              risks. To stay ahead, individuals and businesses must adopt
              stronger authentication, continuous monitoring, and proactive
              threat-prevention strategies.
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex gap-1">
            {Array.from({ length: 5 }, (_v, index) => (
              <div
                className={`${
                  index === 0
                    ? "bg-gradient-to-b from-[#FAA336] to-[#FFFFFF]"
                    : "bg-[#D4D4D4]/10"
                } rounded-full size-2 `}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
