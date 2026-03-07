import Image from "next/image";

interface SidebarHeaderProps {
  logoSrc: string;
  isCollapsed: boolean;
  isMobile: boolean;
}

export default function SidebarHeader({
  logoSrc,
  isCollapsed,
  isMobile,
}: SidebarHeaderProps) {
  return (
    <div className={`p-5 mb-2 ${isMobile || !isCollapsed ? "px-6" : ""}`}>
      <div className="w-12 h-12  border-blue-400/30 flex items-center justify-center shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-cyan-700 transition-all duration-200 hover:scale-105">
        <Image
          src={logoSrc}
          alt="CCubed Logo"
          width={28}
          height={28}
          className="w-7 h-7"
        />
      </div>
    </div>
  );
}

