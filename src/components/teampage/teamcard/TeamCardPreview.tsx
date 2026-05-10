import React from "react";
import { CardBorderGradient } from "./gradients";

function TeamCardPreview({ name, role }: { name: string; role: string }) {
  return (
    <div className="absolute  left-1/2 -translate-x-1/2 bottom-4  w-fit max-w-[90%] rounded-full px-4 py-2 flex items-center gap-3 bg-[#10212E]/80 backdrop-blur-sm duration-300  cursor-pointer group-hover:opacity-0">
      <div className="absolute inset-0 bg-[#CCCCCC]/10 rounded-full" />
      <CardBorderGradient
        gradientFormat="linear-gradient(to right, rgba(255, 255, 255, 0.1) 0%, transparent 60%, transparent 80%,rgba(255, 255, 255, 0.1) 100% )"
        compositeType="xor"
        padding="2px"
        radius="rounded-full"
      />
      <div className="w-8 h-8 p-2 rounded-full relative shadow-2xl  bg-[#10212E]/50 shrink-0 flex items-center justify-center  backdrop-blur-sm ">
        <CardBorderGradient
          gradientFormat="linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 33%, transparent 66%,rgba(255, 255, 255, 0.1) 100% )"
          compositeType="xor"
          padding="1px"
          radius="rounded-full"
        />
        <div className="absolute inset-0 bg-[#CCCCCC]/50  rounded-full" />
        <p className="text-white">i</p>
      </div>
      <div className="flex flex-col leading-tight text-white items-start font-bold tracking-tight whitespace-nowrap ">
        <p>{name}</p>
        <p className="text-sm truncate ">{role}</p>
      </div>
    </div>
  );
}

export default TeamCardPreview;
