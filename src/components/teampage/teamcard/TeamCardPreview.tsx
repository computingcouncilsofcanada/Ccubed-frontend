import { CardBorderGradient } from "./gradients";

type TeamCardPreviewProps = {
  name: string;
  role: string;
  isOpen: boolean;
  onHoverChange: (isHovered: boolean) => void;
};

function TeamCardPreview({
  name,
  role,
  isOpen,
  onHoverChange,
}: TeamCardPreviewProps) {
  return (
    <div
      onMouseEnter={() => onHoverChange(true)}
      className={`absolute left-1/2 -translate-x-1/2 bottom-4 z-120 rounded-full px-4 py-2 flex items-center gap-3 bg-[#10212E]/80 backdrop-blur-sm cursor-pointer transition-[opacity,transform,padding,width] duration-300 ease-out ${
        isOpen
          ? "w-[calc(100%-2rem)] max-w-[calc(100%-2rem)] scale-x-[1.03] scale-y-[1.08] px-8 opacity-0 pointer-events-none"
          : "w-fit max-w-[90%] scale-100 opacity-100"
      }`}
    >
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
      <div className="flex flex-col leading-tight text-white items-start text-left overflow-hidden font-bold tracking-tight whitespace-nowrap">
        <p className="w-full text-sm truncate">{name}</p>
        <p className="w-full text-sm truncate">{role}</p>
      </div>
    </div>
  );
}

export default TeamCardPreview;
