import { motion } from "framer-motion";
import { IconCalendar } from "@tabler/icons-react";

type EmptyStateProps = {
  type: "all" | "online" | "inperson";
  height?: string;
};

const getFilterDisplayName = (type: string) => {
  switch (type) {
    case "inperson":
      return "In Person";
    case "online":
      return "Online";
    default:
      return type;
  }
};

export function EmptyState({ type, height = "451px" }: EmptyStateProps) {
  const isAllEvents = type === "all";

  return (
    <motion.div
      className="flex flex-col items-center justify-center px-8"
      style={{ height }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="relative">
        {/* Background decoration - subtle glow */}
        <div
          className="absolute rounded-full"
          style={{
            top: "-8px",
            left: "-8px",
            width: "80px",
            height: "80px",
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 50%, transparent 80%)",
            filter: "blur(1px)",
          }}
        />

        {/* Icon */}
        <div className="relative z-10 mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              boxShadow: "0 4px 12px rgba(255, 255, 255, 0.1)",
            }}
          >
            <IconCalendar
              size={32}
              stroke={1.5}
              color="rgba(255, 255, 255, 0.7)"
            />
          </div>
        </div>
      </div>

      {/* Text */}
      <h3
        className="text-white text-center mb-2"
        style={{
          fontFamily: "Roboto, sans-serif",
          fontWeight: "600",
          fontSize: "24px",
          lineHeight: "32px",
          letterSpacing: "-0.01em",
        }}
      >
        {isAllEvents
          ? "No Events Available"
          : `No ${getFilterDisplayName(type)} Events`}
      </h3>
      <p
        className="text-white text-center opacity-70"
        style={{
          fontFamily: "Roboto, sans-serif",
          fontWeight: "300",
          fontSize: "16px",
          lineHeight: "24px",
          letterSpacing: "0%",
          maxWidth: isAllEvents ? "300px" : "350px",
        }}
      >
        {isAllEvents
          ? "Check back soon for exciting upcoming events and workshops!"
          : `We don't have any ${getFilterDisplayName(
              type
            ).toLowerCase()} events available right now. Try checking "All Events" or other event types!`}
      </p>
    </motion.div>
  );
}
