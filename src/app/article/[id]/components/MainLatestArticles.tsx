import { motion } from "framer-motion";
import Image from "next/image";

export const MainLatestArticles = () => {
  return (
    <div>
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
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-4"
      >
        {Array.from({ length: 4 }, (_v, index) => (
          <div className=" flex flex-col gap-4 mb-4" key={index}>
            <div className="h-40 rounded-xl overflow-hidden relative">
              <Image
                src="/ArticlePics/computer.png"
                alt="computer"
                fill
                objectFit="cover"
              ></Image>
            </div>
            <div className="text-white flex flex-col gap-3">
              <p className="px-2 py-1 bg-[#D4D4D4]/10 rounded-2xl w-fit ">
                Information Security
              </p>
              <div className="flex items-center gap-3">
                <p>7 mins read</p>
                <div className="flex gap-2 items-center">
                  <img src="/ArticlePics/note.svg" alt="" />
                  <p>Nov 21, 2025</p>
                </div>
              </div>
              <p>Top Cyber Threats Every User Should Watch Out For</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
