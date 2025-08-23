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
              x: -10,
              y: -5,
              rotate: -10,
              opacity: 0.1,
              filter: "blur(4px)",
            },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute top-0 left-0 h-full w-full rounded-xl overflow-hidden z-0"
        >
          <Image src={imageUrl} alt="Shadow" fill className="object-cover" />
        </motion.div>

        <motion.div
          variants={{
            rest: { x: 0, y: 0, rotate: 0, opacity: 1 },
            hover: { x: 20, y: -10, rotate: 7, opacity: 0.1 },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative h-full w-full rounded-xl overflow-hidden z-10"
        >
          <Image src={imageUrl} alt="Main" fill className="object-cover" />
        </motion.div>

        <motion.div
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center z-20"
          style={{ pointerEvents: "none" }}
        >
          <div className="bg-[#D4D4D41A] w-[233px] h-[100px] rounded-xl shadow-2xl border text-white italic text-center flex items-center backdrop-blur border-gray-700">
            <p className=" text-[18px]">{info}</p>
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
