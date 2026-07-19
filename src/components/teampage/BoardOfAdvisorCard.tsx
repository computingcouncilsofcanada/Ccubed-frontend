"use client";

import { useState } from "react";
import TeamCardV2 from "./TeamCardV2";
import { TeamCardProps } from "./TeamCardV2";
import { ChevronLeft, ChevronRight } from "lucide-react";

type BoardOfAdvisorCardProps = {
  advisors: TeamCardProps[];
};

const BoardOfAdvisorCard = ({ advisors }: BoardOfAdvisorCardProps) => {
  const [index, setIndex] = useState(0);

  if (advisors.length === 0) return null;

  const current = advisors[index];
  const showNav = advisors.length > 1;

  const goPrev = () =>
    setIndex((prev) => (prev === 0 ? advisors.length - 1 : prev - 1));

  const goNext = () =>
    setIndex((prev) => (prev === advisors.length - 1 ? 0 : prev + 1));

  return (
    <div className="relative w-full max-w-6xl flex flex-col md:flex-row gap-8 items-center z-50">
      <div className="flex items-center gap-4 w-full md:w-1/2 justify-center">
        {showNav && (
          <button
            onClick={goPrev}
            aria-label="Previous advisor"
            className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition shrink-0"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
        )}

        <TeamCardV2
          imageUrl={current.imageUrl}
          name={current.name}
          role={current.role}
          info={current.info}
          linkedin={current.linkedin}
          className="h-95.25 w-68"
        />

        {showNav && (
          <button
            onClick={goNext}
            aria-label="Next advisor"
            className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition shrink-0"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        )}
      </div>

      <div className="md:w-1/2 w-full text-white px-4">
        <h3 className="text-2xl font-semibold mb-2">{current.name}</h3>
        <p className="text-sm uppercase tracking-wide text-white/60 mb-4">
          {current.role}
        </p>
        <p className="text-base leading-relaxed text-white/80">
          {current.info}
        </p>
      </div>
    </div>
  );
};

export default BoardOfAdvisorCard;
