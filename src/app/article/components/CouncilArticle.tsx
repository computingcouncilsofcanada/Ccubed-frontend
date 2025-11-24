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
      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-2 text-white border-2 border-red-300">
        <div className="border-2 border-green-500 flex flex-col gap-2">
          <div className="h-60 rounded-xl overflow-hidden">
            <Image src="" alt="Test"></Image>
          </div>
          <div className="flex flex-col gap-6">
            <h3>Women In Tech</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Reprehenderit voluptate temporibus aut ipsum unde consequatur
              minima ex libero iusto quo.
            </p>
          </div>
        </div>
        <div className="border-2 border-yellow-500"></div>
        <div className="border-2 border-green-500"></div>
      </div>
    </div>
  );
};
