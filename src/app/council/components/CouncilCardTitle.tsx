import { CouncilContentProps } from "../types/types";

export const CouncilCardTitle = ({ section }: CouncilContentProps) => {
  return (
    <div className="relative text-center md:text-left">
      {/* Default title */}
      <h2
        className="text-[28px] sm:text-[32px] md:text-[40px] leading-[36px] sm:leading-[40px] md:leading-[48px] tracking-[0.01em] font-normal transition-all duration-300 group-hover:opacity-0"
        style={{
          fontFamily: "Roboto, sans-serif",
          color: "white",
        }}
      >
        {section.title}
      </h2>

      {/* Gradient title on hover */}
      <h2
        className="text-[28px] sm:text-[32px] md:text-[40px] leading-[36px] sm:leading-[40px] md:leading-[48px] tracking-[0.01em] font-bold absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          fontFamily: "Roboto, sans-serif",
          background: "linear-gradient(to right, #FFFFFF 0%, #394A8B 35%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
        }}
      >
        {section.title}
      </h2>
    </div>
  );
};
