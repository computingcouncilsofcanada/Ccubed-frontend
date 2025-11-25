import { motion } from "framer-motion";

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
          className="text-[32px] sm:text-[40px] leading-[40px] sm:leading-[48px] tracking-[0.01em] font-extrabold text-white"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Article
        </h1>
      </div>

      <p
        className="text-white text-center text-[16px] sm:text-[20px] font-light leading-[24px] sm:leading-[27px] w-full max-w-[80ch] mx-auto px-4"
        style={{ fontFamily: "Roboto, sans-serif" }}
      >
        Our goal is to facilitate the entry of newcomers and enthusiasts into
        one of Tech’s most important fields: cybersecurity. We believe security
        should be taught sooner, more engagingly, and more enthusiastically.
      </p>
    </motion.div>
  );
};
