"use client";
import { motion } from "framer-motion";
import Image from "next/image";

type TeamCardProps = {
  imageUrl: string;
  name: string;
  role: string;
  info: string;
  discord: string;
  linkedin: string;
};

const TeamCard = ({
  imageUrl,
  name,
  role,
  info,
  discord,
  linkedin,
}: TeamCardProps) => {
  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      className="relative h-[381px] w-[234px] text-white"
    >
      <div className="relative w-full h-[299px]">
        <motion.div
          variants={{
            rest: { x: 0, y: 0, rotate: 0, opacity: 0 },
            hover: {
              x: -11,
              y: -5,
              rotate: -5,
              opacity: 0.1,
              filter: "blur(4px)",
            },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute top-0 left-0 h-full w-full rounded-xl overflow-hidden z-0 group"
        >
          <Image src={imageUrl} alt="Shadow" fill className="object-cover group-hover:grayscale" />
        </motion.div>

        <motion.div
          variants={{
            rest: { x: 0, y: 0, rotate: 0, opacity: 1 },
            hover: { x: 15, y: -10, rotate: 10, opacity: 0.1 },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative h-full w-full rounded-xl overflow-hidden z-10 group"
        >
          <Image src={imageUrl} alt="Main" fill className="object-cover group-hover:grayscale" />
        </motion.div>

        <motion.div
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center z-20"
          style={{ pointerEvents: "none" }}
        >
          <div style={{
            border: "2px solid transparent",
            borderImageSource:
              "linear-gradient(304.46deg, rgba(83, 92, 145, 0.02) 1.69%, rgba(255, 255, 255, 0.02) 100.92%), linear-gradient(125.58deg, rgba(255, 255, 255, 0.1) 2.32%, rgba(146, 144, 195, 0.09) 99.14%)",
            borderImageSlice: 1,
            backdropFilter: "blur(13px)",           
            boxShadow: "0px 14px 44px 0px #00000040" 
          }} className="bg-[#D4D4D41A] w-[233px] h-[100px] rounded-xl  flex items-center justify-center backdrop-blur">
            <p className=" text-[18px] italic p-5">{info}</p>
          </div>
        </motion.div>
      </div>

      <h3 className="text-2xl font-medium mt-[20px] relative z-10">{name}</h3>
      <p className="text-lg font-light mt-[8px] relative z-10">{role}</p>

      <motion.div
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative z-30 flex gap-3 mt-[16px] justify-center"
      >
        <a href={discord} target="_blank" rel="noopener noreferrer">
          <Image
            src="/discord.svg"
            alt="Discord Icon"
            width={24}
            height={24}
            className="mx-auto"
          />
        </a>
        <a href={linkedin} target="_blank" rel="noopener noreferrer">
          <Image
            src="/linkedin.svg"
            alt="Linkedin Icon"
            width={24}
            height={24}
            className="mx-auto"
          />
        </a>
      </motion.div>
    </motion.div>
  );
};

export default TeamCard;
