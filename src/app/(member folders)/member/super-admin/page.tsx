"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Image from "next/image";
import { useSafariImageFallback } from "@/hooks/useSafariImageFallback";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import {
  DashboardWidget,
  dashboardWidgets,
} from "@/components/dashboard/DashboardWidget";
import { ProfileCard } from "@/components/dashboard/ProfileCard";
import { SearchInput } from "@/components/dashboard/SearchInput";
import { HorizontalWidget } from "@/components/dashboard/HorizontalWidget";
import { VerticalWidget } from "@/components/dashboard/VerticalWidget";

export default function SuperAdminPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  const logoSrc = useSafariImageFallback(
    "/FigmaFiles/ccubed-icon.svg",
    "/FigmaFiles/ccubed-icon.png",
  );


  // useEffect(() => {
  //   if (!isLoading) {
  //     if (!user) {
  //       router.push("/");
  //     } else if (user.role !== "SUPER_ADMIN") {
  //       router.push("/member");
  //     }
  //   }
  // }, [user, isLoading, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="relative w-full h-full min-h-screen p-3 sm:p-4 md:p-6 lg:p-8 text-white text-base sm:text-lg font-poppins overflow-hidden">
      <div className="absolute inset-1 sm:inset-2 z-0">
        <BgBoxMainPage maxHeight={400} />
      </div>
      <div
        className="absolute inset-3 sm:inset-4 md:inset-6 lg:inset-8 border-2 border-white/15 backdrop-blur-sm rounded-xl overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3),0_8px_16px_-8px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.12)]"
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <div className="dashboard-wrapper px-3 sm:px-4 md:px-6 pt-4 sm:pt-6 pb-4 sm:pb-6 bg-[#D4D4D4]/10 w-full h-full min-h-0 flex flex-col overflow-y-auto xl:overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]">
          <div className="flex-shrink-0 flex flex-col lg:flex-row lg:justify-between lg:items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex flex-col gap-1 sm:gap-1.5 min-w-0">
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <Image
                  src={logoSrc}
                  alt="CCubed Icon"
                  width={32}
                  height={32}
                  className="shrink-0 sm:w-10 sm:h-10"
                  quality={100}
                  draggable={false}
                  style={{ userSelect: "none" }}
                />
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold truncate">
                  Hi, {user.username}!
                </h1>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-white/90">
                See everything about CCUBED at a glance
              </p>
            </div>
            <div className="w-full lg:w-[55%] xl:w-[50%] shrink-0">
              <SearchInput />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-4 sm:gap-6 xl:flex-1 xl:min-h-0">
            <div className="grid grid-cols-1 md:grid-cols-[minmax(200px,1.2fr)_2fr] xl:grid-rows-[auto_1fr] grid-rows-[auto_auto] gap-4 sm:gap-6 min-h-0">
              <ProfileCard user={user} />
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {dashboardWidgets.slice(0, 4).map((widget) => (
                  <DashboardWidget
                    key={widget.statText}
                    bgIcon={widget.bgIcon}
                    statNumber={widget.statNumber}
                    statText={widget.statText}
                    statPercentage={widget.statPercentage}
                  />
                ))}
              </div>
              <div className="md:col-span-2 p-2 min-h-[180px] sm:min-h-[200px] xl:min-h-[220px] overflow-hidden flex flex-col">
                <HorizontalWidget />
              </div>
            </div>
            <div className="flex flex-col p-2 gap-3 sm:gap-4 xl:flex-1 xl:min-h-0 min-w-0">
              <VerticalWidget />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
