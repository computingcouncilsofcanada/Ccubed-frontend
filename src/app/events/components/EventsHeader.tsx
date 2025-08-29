import { motion } from "framer-motion";
import { IconList, IconApps } from "@tabler/icons-react";

type EventsHeaderProps = {
  eventType: string;
  onEventTypeChange: (type: string) => void;
  viewMode: string;
  onViewModeChange: (mode: string) => void;
};

export function EventsHeader({
  eventType,
  onEventTypeChange,
  viewMode,
  onViewModeChange,
}: EventsHeaderProps) {
  return (
    <div className="flex justify-between items-center mt-7">
      {/* Event Type Filter */}
      <div
        className="flex gap-1 rounded-lg p-1 bg-[#0B161E] relative"
        style={{ width: "176px", height: "56px" }}
      >
        {/* Sliding Background Indicator */}
        <motion.div
          className="absolute top-1 rounded-lg"
          style={{
            height: "48px",
            width: "84px", // (176-8-3)/2 = width per option
            backgroundColor: "rgba(19, 40, 54, 0.8)",
          }}
          animate={{
            x: ["all", "online"].indexOf(eventType) * 87, // 84px width + 3px gap
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {/* Sliding Gradient Border */}
        <motion.div
          className="absolute top-1 rounded-lg pointer-events-none"
          style={{
            height: "48px",
            width: "84px",
            background:
              "linear-gradient(to top, rgba(61, 131, 178, 1) 0%, rgba(26, 56, 76, 0) 100%)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "xor",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            padding: "1.5px",
          }}
          animate={{
            x: ["all", "online"].indexOf(eventType) * 87,
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {[
          { label: "All Events", value: "all" },
          { label: "Online", value: "online" },
        ].map((option) => (
          <motion.label
            key={option.value}
            className={`flex items-center justify-center flex-1 rounded-lg cursor-pointer text-white relative z-10`}
            style={{
              fontFamily: "Roboto, sans-serif",
              fontSize: "16px",
              fontWeight: eventType === option.value ? "400" : "300",
              letterSpacing: "1%",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input
              type="radio"
              name="eventType"
              value={option.value}
              checked={eventType === option.value}
              onChange={() => onEventTypeChange(option.value)}
              className="hidden"
            />
            <span className="relative z-10">{option.label}</span>
          </motion.label>
        ))}
      </div>

      {/* View Mode Toggle */}
      <div
        className="flex gap-1 rounded-lg p-1 bg-[#0B161E] relative"
        style={{ width: "108px", height: "56px" }}
      >
        {/* Sliding Background Indicator */}
        <motion.div
          className="absolute top-1 rounded-lg"
          style={{
            height: "48px",
            width: "48px",
            backgroundColor: "rgba(19, 40, 54, 0.8)",
            borderRadius: "8px",
          }}
          animate={{
            x: ["list", "grid"].indexOf(viewMode) * 52, // 48px width + 4px gap
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {/* Sliding Gradient Border */}
        <motion.div
          className="absolute top-1 rounded-lg pointer-events-none"
          style={{
            height: "48px",
            width: "48px",
            borderRadius: "8px",
            background:
              "linear-gradient(to top, rgba(61, 131, 178, 1) 0%, rgba(26, 56, 76, 0) 100%)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "xor",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            padding: "1.5px",
          }}
          animate={{
            x: ["list", "grid"].indexOf(viewMode) * 52,
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {[
          { icon: IconList, value: "list" },
          { icon: IconApps, value: "grid" },
        ].map(({ icon: Icon, value }) => (
          <motion.button
            key={value}
            className="relative z-10"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: "none",
              background: "transparent",
              padding: "0",
              margin: "0",
            }}
            onClick={() => onViewModeChange(value)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Icon
              size={24}
              stroke={1.5}
              color={
                viewMode === value ? "#FFFFFF" : "rgba(255, 255, 255, 0.7)"
              }
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
