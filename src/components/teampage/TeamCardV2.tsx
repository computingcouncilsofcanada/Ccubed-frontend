"use client";
import { useState } from "react";
import { CardBorderGradient } from "./teamcard/gradients";
import TeamcardImage from "./teamcard/TeamcardImage";
import TeamCardPreview from "./teamcard/TeamCardPreview";
import TeamCardSocials from "./teamcard/TeamCardSocials";
import TeamCardOverlay from "./teamcard/TeamCardOverlay";

type TeamCardProps = {
  imageUrl: string;
  name: string;
  role: string;
  info: string;
  linkedin?: string;
};

function TeamCardV2({ imageUrl, name, role, info, linkedin }: TeamCardProps) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <div
      onMouseLeave={() => setIsOverlayOpen(false)}
      className={`rounded-2xl h-[400px] w-[300px] relative z-100 duration-300 transition-transform ease-out ${
        isOverlayOpen ? "scale-[1.03]" : "scale-100"
      }`}
    >
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
      <TeamCardPreview
        name={name}
        role={role}
        isOpen={isOverlayOpen}
        onHoverChange={setIsOverlayOpen}
      />

      {/* top right details */}
      <TeamCardSocials linkedin={linkedin} />

      {/* fill card  */}
      <TeamCardOverlay
        name={name}
        info={info}
        role={role}
        isOpen={isOverlayOpen}
      />
    </div>
  );
}

export default TeamCardV2;
