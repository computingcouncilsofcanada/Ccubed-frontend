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

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/");
      } else if (user.role !== "SUPER_ADMIN") {
        router.push("/member");
      }
    }
  }, [user, isLoading, router]);

  if (!user || user.role !== "SUPER_ADMIN") {
    return null;
  }

  return (
    <div className="relative w-full h-full min-h-screen p-6 md:p-8 text-white text-lg font-poppins overflow-hidden">
      <div className="absolute inset-2 z-0">
        <BgBoxMainPage maxHeight={400} />
      </div>
      <div
        className="absolute inset-8 border-2 border-white/15 backdrop-blur-sm rounded-xl overflow-hidden"
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <div className="dashboard-wrapper px-6 pt-6 pb-6 bg-[#D4D4D4]/10 w-full h-full min-h-0 flex flex-col overflow-hidden">
          <div className="top-section mb-6 flex-shrink-0 flex max-[1292px]:flex-col  max-[1292px]:items-center max-[1292px]:gap-3 flex-row justify-between">
            <div className="left-section flex flex-col gap-1.5">
              <div className="flex gap-4">
                <Image
                  src={logoSrc}
                  alt="CCubed Icon"
                  width={40}
                  height={40}
                  quality={100}
                  draggable={false}
                  style={{ userSelect: "none" }}
                />
                <h1 className="text-5xl font-bold">Hi, {user.username}!</h1>
              </div>
              <h1 className="text-lg">
                See everything about CCUBED at a glance
              </h1>
            </div>
            <SearchInput />
          </div>

          <div className="grid grid-cols-[3fr_1.2fr] gap-3 flex-1 min-h-0">
            <div className="grid grid-cols-[1.2fr_2fr] grid-rows-[auto_1fr] gap-6 min-h-0">
              <ProfileCard user={user} />
              <div className="grid grid-cols-2 grid-rows-2 gap-6">
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
              <div className="col-span-2 p-2 min-h-0 overflow-hidden flex flex-col">
                <HorizontalWidget />
              </div>
            </div>
            <div className="flex flex-col p-2 gap-4 flex-1 min-h-0">
              <VerticalWidget />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
