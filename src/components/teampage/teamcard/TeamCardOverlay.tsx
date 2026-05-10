import React from "react";

function TeamCardOverlay({
  role,
  name,
  info,
}: {
  role: string;
  name: string;
  info: string;
}) {
  return (
    <div className="absolute inset-[3px] z-100 translate-y-1 group-hover:translate-y-0 duration-300 rounded-2xl opacity-0 group-hover:opacity-100 flex justify-end items-start flex-col p-6 text-white bg-[#132430]/80 backdrop-blur-sm  gap-4 pointer-events-none ">
      <div className="flex flex-col gap-4 text-left">
        <div className="flex flex-col ">
          <p className="font-normal">{role}</p>
          <p className="font-semibold">{name}</p>
        </div>

        <p className="font-light">{info}</p>
      </div>
    </div>
  );
}

export default TeamCardOverlay;
