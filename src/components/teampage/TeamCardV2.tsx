"use client";
import { motion } from "framer-motion";
import { CardBorderGradient } from "./teamcard/gradients";
import Image from "next/image";
import TeamcardImage from "./teamcard/TeamcardImage";
import TeamCardPreview from "./teamcard/TeamCardPreview";
import TeamCardSocials from "./teamcard/TeamCardSocials";
import TeamCardOverlay from "./teamcard/TeamCardOverlay";

type TeamCardProps = {
  imageUrl: string;
  name: string;
  role: string;
  info: string;
  linkedin: string;
};

function TeamCardV2({ imageUrl, name, role, info, linkedin }: TeamCardProps) {
  return (
    <div className="rounded-2xl h-[400px] w-[300px] relative z-100 cursor-pointer group duration-300 transition-all hover:scale-106">
      <div className="relative w-full h-full">
        {/* border gradient effect  */}
        <CardBorderGradient
          gradientFormat="linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 45%, transparent 90%)"
          compositeType="xor"
          padding="3px"
          radius="rounded-2xl"
        />
        <TeamcardImage imageUrl={imageUrl} />
      </div>

      {/* bottom details */}
      <TeamCardPreview name={name} role={role} />

      {/* top right details */}
      <TeamCardSocials linkedin={linkedin} />

      {/* fill card  */}
      <TeamCardOverlay name={name} info={info} role={role} />
    </div>
  );
}

export default TeamCardV2;
