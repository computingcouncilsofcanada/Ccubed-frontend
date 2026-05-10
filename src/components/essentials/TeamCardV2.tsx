"use client";
import { motion } from "framer-motion";
import Image from "next/image";

type TeamCardProps = {
  imageUrl: string;
  name: string;
  role: string;
  info: string;
  linkedin: string;
};

function TeamCardV2({ imageUrl, name, role, info, linkedin }: TeamCardProps) {
  return (
    <div className="rounded-2xl h-[400px] w-[320px] relative z-100 cursor-pointer">
      <div className="relative w-full h-full">
        {/* border gradient effect  */}
        <div
          className="absolute inset-0 p-[3px] rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 45%, transparent 90%)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "xor",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
          }}
        ></div>
        <Image
          src={imageUrl}
          fill
          alt="team-image"
          className="rounded-2xl object-cover"
          quality={100}
        ></Image>
      </div>

      {/* top right details */}
      <div className="absolute  top-3 right-4 h-fit px-2 py-2 flex flex-col  items-center gap-3  cursor-pointer">
        <div className="w-8 h-8 p-2 rounded-full  bg-[#10212E]/50 shrink-0 flex items-center justify-center border-1 border-white">
          <p className="text-white">i</p>
        </div>
        <div className="w-8 h-8 p-2 rounded-full  bg-[#10212E]/50 shrink-0 flex items-center justify-center border-1 border-white">
          <p className="text-white">i</p>
        </div>
        <div className="w-8 h-8 p-2 rounded-full  bg-[#10212E]/50 shrink-0 flex items-center justify-center border-1 border-white">
          <p className="text-white">i</p>
        </div>
      </div>
      {/* bottom details */}
      <div className="absolute  left-1/2 -translate-x-1/2 bottom-4  w-3/4 rounded-full px-2 py-2 flex items-center gap-3 bg-[#10212E] cursor-pointer">
        <div className="w-8 h-8 p-2 rounded-full  bg-[#10212E]/50 shrink-0 flex items-center justify-center border-1 border-white">
          <p className="text-white">i</p>
        </div>
        <div className="flex flex-col leading-tight text-white items-start font-bold tracking-tight">
          <p>{name}</p>
          <p>{role}</p>
        </div>
      </div>
    </div>
  );
}

export default TeamCardV2;
