import Image from "next/image";

interface SidebarFooterProps {
  logoSrc: string;
  isCollapsed: boolean;
  isMobile: boolean;
}

export default function SidebarFooter({
  logoSrc,
  isCollapsed,
  isMobile,
}: SidebarFooterProps) {
  return (
    <div className={`p-5 mt-auto border-t border-slate-200 ${isMobile || !isCollapsed ? "px-6" : ""}`}>
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 border-2 border-blue-400/30 flex items-center justify-center shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-cyan-700 transition-all duration-200 hover:scale-105">
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

