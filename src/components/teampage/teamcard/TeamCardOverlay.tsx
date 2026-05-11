function TeamCardOverlay({
  role,
  name,
  info,
  isOpen,
}: {
  role: string;
  name: string;
  info: string;
  isOpen: boolean;
}) {
  return (
    <div
      className={`absolute inset-[3px] z-100 rounded-2xl flex justify-end items-start flex-col p-6 text-white bg-[#132430]/80 backdrop-blur-sm gap-4 pointer-events-none  transition-[opacity,transform] duration-300 ease-out ${
        isOpen
          ? "scale-100 opacity-100"
          : "scale-[0.98] opacity-0"
      }`}
    >
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
