import { motion } from "framer-motion";
import { IconList, IconApps } from "@tabler/icons-react";
import {
  CONTAINER_WIDTH,
  PADDING,
  INNER_WIDTH,
  OPTION_WIDTH,
  VIEW_OPTIONS,
  VIEW_CONTAINER_WIDTH,
  VIEW_PADDING,
  VIEW_INNER_WIDTH,
  VIEW_OPTION_WIDTH,
} from "./Calculations";

type ArticleHeaderProps = {
  eventType: string;
  onArticleTypeChange: (type: string) => void;
  viewMode: string;
  onViewModeChange: (mode: string) => void;
  options: { label: string; value: string }[]; 
};

export function ArticleFilterBar({
  eventType,
  onArticleTypeChange,
  viewMode,
  onViewModeChange,
  options
}: ArticleHeaderProps) {
  const index = options.findIndex(o => o.value === eventType);


  const COLS = 2;       // always 2 columns on mobile
  const ITEM_W = 150;
  const ITEM_H = 48;
  const GAP_Y = 56;
  
  const mobileX = ITEM_W * (index % COLS);
  const mobileY = GAP_Y * Math.floor(index / COLS);

  return (
    <div className="flex justify-between items-center mt-7 ">
      <div
        className="grid grid-cols-2 gap-1 rounded-lg p-1 bg-[#0B161E] relative md:hidden"
        style={{ width: `310px`, height: "112px" }}
      >
        {/* MOBILE Sliding Background Indicator */}
        <motion.div
          className="absolute rounded-lg"
          style={{
            height: "48px",
            width: 300 / 2, // 150px per column
            backgroundColor: "rgba(19, 40, 54, 0.8)",
            top: 4,
            left: 4,
          }}
          animate={{
            x: mobileX,
            y: mobileY,
          }}
          transition={{
            duration: 0.45,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {/* MOBILE Sliding Border */}
        <motion.div
          className="absolute rounded-lg pointer-events-none"
          style={{
            height: "48px",
            width: 300 / 2,
            background:
              "linear-gradient(to top, rgba(61, 131, 178, 1) 0%, rgba(26, 56, 76, 0) 100%)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "xor",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            padding: "1.5px",
            top: 4,
            left: 4,
          }}
          animate={{
            x: mobileX,
            y: mobileY,
          }}
          transition={{
            duration: 0.45,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {/* MOBILE OPTIONS */}
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center justify-center rounded-lg cursor-pointer text-white relative z-10 h-[48px]"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontSize: "14px",
              fontWeight: eventType === option.value ? 400 : 300,
            }}
          >
            <input
              type="radio"
              name="eventType"
              value={option.value}
              checked={eventType === option.value}
              onChange={() => onArticleTypeChange(option.value)}
              className="hidden"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>

      {/* Event Type Filter */}
      <div
        className="flex gap-1 rounded-lg p-1 bg-[#0B161E] max-md:hidden relative"
        style={{ width: `${CONTAINER_WIDTH}px`, height: "56px" }}
      >
        {/* Sliding Background Indicator */}
        <motion.div
          className="absolute top-1 rounded-lg"
          style={{
            height: "48px",
            width: OPTION_WIDTH,
            backgroundColor: "rgba(19, 40, 54, 0.8)",
          }}
          animate={{
            x: OPTION_WIDTH * index,
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
            width: OPTION_WIDTH,
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
            x: OPTION_WIDTH * index,
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {options.map((option) => (
          <motion.label
            key={option.value}
            className="flex items-center justify-center flex-1 rounded-lg cursor-pointer text-white relative z-10"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontSize: "16px",
              fontWeight: eventType === option.value ? 400 : 300,
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
              onChange={() => onArticleTypeChange(option.value)}
              className="hidden"
            />
            <span className="relative z-10">{option.label}</span>
          </motion.label>
        ))}
      </div>

      {/* View Mode Toggle */}
      <div
        className="flex gap-1 rounded-lg p-1 bg-[#0B161E] relative"
        style={{ width: `${VIEW_CONTAINER_WIDTH}px`, height: "56px" }}
      >
        {/* Sliding Background Indicator */}
        <motion.div
          className="absolute top-1 rounded-lg"
          style={{
            height: "48px",
            width: VIEW_OPTION_WIDTH,
            backgroundColor: "rgba(19, 40, 54, 0.8)",
            borderRadius: "8px",
          }}
          animate={{
            x: VIEW_OPTION_WIDTH * VIEW_OPTIONS.indexOf(viewMode),
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
            width: VIEW_OPTION_WIDTH,
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
            x: VIEW_OPTION_WIDTH * VIEW_OPTIONS.indexOf(viewMode),
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
              width: VIEW_OPTION_WIDTH,
              height: "48px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: "none",
              background: "transparent",
              padding: 0,
              margin: 0,
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
