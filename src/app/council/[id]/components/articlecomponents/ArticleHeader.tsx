import { motion } from "framer-motion";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export const ArticleHeader = () => {
  return (
    <div className="text-start mb-6">
      <h2
        className="text-[36px] font-extrabold leading-[48px] tracking-[0.01em] text-white mb-4"
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
        <Link href="">
          <motion.div
            className="flex gap-2 items-center cursor-pointer"
            whileHover="hover"
            initial="initial"
            variants={{
              initial: {},
              hover: {},
            }}
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
        </Link>
      </div>
    </div>
  );
};
