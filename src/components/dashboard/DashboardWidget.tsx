interface DashboardWidgetProps {
  bgIcon: string;
  statText: string;
  statNumber: number;
  statPercentage: number;
}

export const DashboardWidget = ({
  bgIcon,
  statText,
  statNumber,
  statPercentage,
}: DashboardWidgetProps) => {
  return (
    <div
      className="border-2 border-white/10 backdrop-blur-sm flex flex-col justify-end rounded-xl bg-right-bottom bg-no-repeat shadow-2xl "
      style={{
        backgroundImage: `url(${bgIcon})`,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <div className="p-4">
        <div className="flex items-baseline gap-2">
          <p className="text-6xl leading-none font-bold">{statNumber}</p>

          <div className="bg-[#FAA366] flex items-center gap-1 text-[#173246] rounded-full px-2 py-[2px]">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4L20 18H4L12 4Z" />
            </svg>
            <p className="text-sm">{statPercentage}%</p>
          </div>
        </div>
        <p className="">{statText}</p>
      </div>
    </div>
  );
};

export const dashboardWidgets: DashboardWidgetProps[] = [
  {
    bgIcon: "/DashboardPics/personIcon.png",
    statNumber: 8,
    statText: "Total Team Members",
    statPercentage: 3.5,
  },
  {
    bgIcon: "/DashboardPics/calendarIcon.png",
    statNumber: 10,
    statText: "Events Hosted this Month",
    statPercentage: 1.2,
  },
  {
    bgIcon: "/DashboardPics/emojiIcon.png",
    statNumber: 50,
    statText: "Average Participants per events",
    statPercentage: 0.2,
  },
  {
    bgIcon: "/DashboardPics/mailIcon.png",
    statNumber: 17,
    statText: "Upcoming Events Planned",
    statPercentage: 0.2,
  },
];
