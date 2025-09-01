import Image from "next/image";
import { Events } from "@/types/events";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { extractDay, getOrdinalSuffix, getMonthName } from "@/utils/dateUtils";

type EventListCardProps = {
  event: Events;
  onSeeDetails: (event: Events) => void;
  onInvitationLink: () => void;
  showInvitationButton?: boolean; // Optional prop to show/hide invitation button
};

export function EventListCard({
  event,
  onSeeDetails,
  onInvitationLink,
  showInvitationButton = true,
}: EventListCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(() => {
    // Initialize with current window width if available, fallback to desktop size
    if (typeof window !== "undefined") {
      return window.innerWidth;
    }
    return 1024; // Default to desktop size for SSR
  });
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [descriptionLineClamp, setDescriptionLineClamp] = useState<number>(2);

  // Window width and cleanup timeout
  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth);

    // Handle window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Add debounce to prevent rapid state changes
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 50); // 50ms delay to prevent flickering
  };

  // Generate a zigzag clip-path dynamically so density is easy to tweak
  const generateZigzagClipPath = (stepPercent = 3, amplitudePercent = 1) => {
    const points: string[] = [];
    // Left edge: from top to bottom
    points.push(`0% 0%`);
    let toggleLeft = true;
    for (let y = stepPercent; y <= 100; y += stepPercent) {
      const x = toggleLeft ? `${amplitudePercent}%` : `0%`;
      points.push(`${x} ${y}%`);
      toggleLeft = !toggleLeft;
    }
    // Bottom-right corner
    points.push(`100% 100%`);
    // Right edge: from bottom back to top
    let toggleRight = true;
    for (let y = 100 - stepPercent; y >= 0; y -= stepPercent) {
      const x = toggleRight ? `${100 - amplitudePercent}%` : `100%`;
      points.push(`${x} ${y}%`);
      toggleRight = !toggleRight;
    }
    return `polygon(${points.join(", ")})`;
  };

  // Make it slightly less dense than before (was ~2% step). Now 3%.
  const zigzagClipPath = generateZigzagClipPath(3, 1);

  // Recalculate description line clamp based on title wrapped lines (more title lines => fewer description lines)
  useEffect(() => {
    const measure = () => {
      if (!titleRef.current || typeof window === "undefined") return;
      const el = titleRef.current;
      const style = window.getComputedStyle(el);
      const lineHeightPx = parseFloat(style.lineHeight || "0");
      if (!lineHeightPx) {
        setDescriptionLineClamp(2);
        return;
      }
      const height = el.getBoundingClientRect().height;
      const approxLines = Math.max(1, Math.round(height / lineHeightPx));
      setDescriptionLineClamp(approxLines > 1 ? 2 : 4);
    };
    const raf = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(raf);
  }, [windowWidth, event.name]);

  // For badge positioning, only consider the largest two screens explicitly
  // >=1200px and 1024-1199px; other sizes use previous simple margins
  const badgeMarginTop =
    windowWidth >= 1200
      ? -3 // imageTop(17) + 8 - contentTop(28)
      : windowWidth >= 1024
      ? 3 // imageTop(15) + 8 - contentTop(20)
      : windowWidth < 700
      ? 4
      : windowWidth < 820
      ? 6
      : 8;

  // Day number and ordinal suffix for date display
  const dayNumber = extractDay(event.date);
  const ordinal = getOrdinalSuffix(dayNumber);

  // Suffix sizing/position (small superscript at top-right of the day number)
  const suffixFontSizeBase =
    windowWidth < 700
      ? "10px"
      : windowWidth < 820
      ? "12px"
      : windowWidth < 1024
      ? "14px"
      : windowWidth < 1200
      ? "16px"
      : "18px";
  const suffixFontSizeHover =
    windowWidth < 700
      ? "12px"
      : windowWidth < 820
      ? "14px"
      : windowWidth < 1024
      ? "16px"
      : windowWidth < 1200
      ? "18px"
      : "20px";
  // Align suffix top flush with the day number top
  const suffixTopBase = "0px";
  const suffixTopHover = "0px";
  const suffixRightBase =
    windowWidth < 700
      ? "-10px"
      : windowWidth < 820
      ? "-12px"
      : windowWidth < 1024
      ? "-14px"
      : windowWidth < 1200
      ? "-16px"
      : "-18px";
  const suffixRightHover =
    windowWidth < 700
      ? "-12px"
      : windowWidth < 820
      ? "-14px"
      : windowWidth < 1024
      ? "-16px"
      : windowWidth < 1200
      ? "-18px"
      : "-20px";

  return (
    <motion.div
      className={`flex text-white group bg-[#D4D4D4]/10 backdrop-blur-sm shadow-xl relative overflow-hidden w-full max-w-[1144px] ${
        isHovered ? "" : "rounded-lg"
      }`}
      key={event.id + "-list"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      style={{
        height:
          windowWidth < 700
            ? "160px"
            : windowWidth < 820
            ? "180px"
            : windowWidth < 1024
            ? "200px"
            : windowWidth < 1200
            ? "220px"
            : "234px",
        pointerEvents: "auto",
        clipPath: isHovered ? zigzagClipPath : "none",
      }}
      transition={{
        duration: 0.6,
        ease: [0.2, 0.65, 0.3, 0.9],
      }}
    >
      {/* Date section */}
      <motion.div
        className="flex items-start justify-start relative z-10"
        initial={{
          paddingLeft:
            windowWidth < 700
              ? "12px"
              : windowWidth < 820
              ? "16px"
              : windowWidth < 1024
              ? "18px"
              : windowWidth < 1200
              ? "20px"
              : "24px",
          paddingTop: "24px",
          paddingBottom:
            windowWidth < 700
              ? "12px"
              : windowWidth < 820
              ? "16px"
              : windowWidth < 1024
              ? "18px"
              : windowWidth < 1200
              ? "20px"
              : "24px",
          paddingRight: "0px",
        }}
        animate={{
          paddingLeft: isHovered
            ? windowWidth < 700
              ? "16px"
              : windowWidth < 820
              ? "20px"
              : windowWidth < 1024
              ? "22px"
              : windowWidth < 1200
              ? "28px"
              : "32px"
            : windowWidth < 700
            ? "12px"
            : windowWidth < 820
            ? "16px"
            : windowWidth < 1024
            ? "18px"
            : windowWidth < 1200
            ? "20px"
            : "24px",
          paddingTop: isHovered
            ? windowWidth < 700
              ? "24px"
              : windowWidth < 820
              ? "12px"
              : windowWidth < 1024
              ? "14px"
              : windowWidth < 1200
              ? "15px"
              : "16px"
            : "24px",
          paddingBottom: isHovered
            ? windowWidth < 700
              ? "8px"
              : windowWidth < 820
              ? "12px"
              : windowWidth < 1024
              ? "14px"
              : windowWidth < 1200
              ? "15px"
              : "16px"
            : windowWidth < 700
            ? "12px"
            : windowWidth < 820
            ? "16px"
            : windowWidth < 1024
            ? "18px"
            : windowWidth < 1200
            ? "20px"
            : "24px",
          paddingRight: isHovered
            ? windowWidth < 700
              ? "16px"
              : windowWidth < 820
              ? "20px"
              : windowWidth < 1024
              ? "22px"
              : windowWidth < 1200
              ? "28px"
              : "32px"
            : "0px",
        }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <motion.div
          className="flex flex-col items-center text-center -space-y-1 relative"
          initial={{
            width:
              windowWidth < 700
                ? "48px"
                : windowWidth < 820
                ? "56px"
                : windowWidth < 1024
                ? "64px"
                : windowWidth < 1200
                ? "68px"
                : "72px",
          }}
          animate={{
            width: isHovered
              ? windowWidth < 700
                ? "56px"
                : windowWidth < 820
                ? "64px"
                : windowWidth < 1024
                ? "80px"
                : windowWidth < 1200
                ? "84px"
                : "88px"
              : windowWidth < 700
              ? "48px"
              : windowWidth < 820
              ? "56px"
              : windowWidth < 1024
              ? "64px"
              : windowWidth < 1200
              ? "68px"
              : "72px",
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background:
                "radial-gradient(ellipse 120% 95% at 50% 42%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 35%, rgba(255,255,255,0.04) 55%, transparent 78%)",
              filter: "blur(10px)",
              borderRadius: "8px",
            }}
          />
          <div className="relative z-10 inline-block leading-none">
            <motion.span
              className="text-white font-bold"
              initial={{
                fontSize:
                  windowWidth < 700
                    ? "18px"
                    : windowWidth < 820
                    ? "20px"
                    : windowWidth < 1024
                    ? "22px"
                    : windowWidth < 1200
                    ? "28px"
                    : "32px",
              }}
              animate={{
                fontSize: isHovered
                  ? windowWidth < 700
                    ? "24px"
                    : windowWidth < 820
                    ? "28px"
                    : windowWidth < 1024
                    ? "32px"
                    : windowWidth < 1200
                    ? "40px"
                    : "48px"
                  : windowWidth < 700
                  ? "18px"
                  : windowWidth < 820
                  ? "20px"
                  : windowWidth < 1024
                  ? "22px"
                  : windowWidth < 1200
                  ? "28px"
                  : "32px",
              }}
              style={{
                fontFamily: "Roboto, sans-serif",
                lineHeight: "auto",
                letterSpacing: "0%",
              }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {dayNumber}
            </motion.span>
            <motion.span
              className="absolute text-white"
              initial={{
                fontSize: suffixFontSizeBase,
                top: suffixTopBase,
                right: suffixRightBase,
              }}
              animate={{
                fontSize: isHovered ? suffixFontSizeHover : suffixFontSizeBase,
                top: isHovered ? suffixTopHover : suffixTopBase,
                right: isHovered ? suffixRightHover : suffixRightBase,
              }}
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 700,
                lineHeight: 1,
                opacity: 0.9,
              }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {ordinal}
            </motion.span>
          </div>
          <motion.span
            className="text-white font-light relative z-10"
            initial={{
              fontSize:
                windowWidth < 700
                  ? "8px"
                  : windowWidth < 820
                  ? "9px"
                  : windowWidth < 1024
                  ? "10px"
                  : windowWidth < 1200
                  ? "10.5px"
                  : "11px",
            }}
            animate={{
              fontSize: isHovered
                ? windowWidth < 700
                  ? "10px"
                  : windowWidth < 820
                  ? "12px"
                  : windowWidth < 1024
                  ? "13px"
                  : windowWidth < 1200
                  ? "14px"
                  : "16px"
                : windowWidth < 700
                ? "8px"
                : windowWidth < 820
                ? "9px"
                : windowWidth < 1024
                ? "10px"
                : windowWidth < 1200
                ? "10.5px"
                : "11px",
            }}
            style={{
              fontFamily: "Roboto, sans-serif",
              lineHeight: "auto",
              letterSpacing: "0%",
            }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {getMonthName(event.date)}
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Separator line - only shown on hover, spans full card height */}
      <motion.div
        className="w-[4px] min-w-[4px] max-w-[4px] basis-[4px] shrink-0 grow-0 z-20 h-full flex items-center justify-center"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <svg
          width="4"
          className="h-full block"
          style={{ pointerEvents: "none" }}
        >
          <line
            x1="2"
            y1="0"
            x2="2"
            y2="100%"
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="4 6"
          />
        </svg>
      </motion.div>

      {/* Image section */}
      <motion.div
        className="flex items-center justify-center relative z-10"
        initial={{
          paddingLeft:
            windowWidth < 700
              ? "12px"
              : windowWidth < 820
              ? "16px"
              : windowWidth < 1024
              ? "18px"
              : windowWidth < 1200
              ? "20px"
              : "24px",
          paddingTop:
            windowWidth < 700
              ? "8px"
              : windowWidth < 820
              ? "12px"
              : windowWidth < 1024
              ? "14px"
              : windowWidth < 1200
              ? "15px"
              : "17px",
          paddingBottom:
            windowWidth < 700
              ? "8px"
              : windowWidth < 820
              ? "12px"
              : windowWidth < 1024
              ? "14px"
              : windowWidth < 1200
              ? "15px"
              : "17px",
          paddingRight:
            windowWidth < 700
              ? "16px"
              : windowWidth < 820
              ? "12px"
              : windowWidth < 1024
              ? "14px"
              : windowWidth < 1200
              ? "15px"
              : "16px",
        }}
        animate={{
          paddingLeft: isHovered
            ? windowWidth < 700
              ? "8px"
              : windowWidth < 820
              ? "12px"
              : windowWidth < 1024
              ? "14px"
              : windowWidth < 1200
              ? "16px"
              : "16px"
            : windowWidth < 700
            ? "12px"
            : windowWidth < 820
            ? "16px"
            : windowWidth < 1024
            ? "18px"
            : windowWidth < 1200
            ? "20px"
            : "24px",
          paddingTop:
            windowWidth < 700
              ? "8px"
              : windowWidth < 820
              ? "12px"
              : windowWidth < 1024
              ? "14px"
              : windowWidth < 1200
              ? "15px"
              : "17px",
          paddingBottom:
            windowWidth < 700
              ? "8px"
              : windowWidth < 820
              ? "12px"
              : windowWidth < 1024
              ? "14px"
              : windowWidth < 1200
              ? "15px"
              : "17px",
          paddingRight:
            windowWidth < 700
              ? "16px"
              : windowWidth < 820
              ? "12px"
              : windowWidth < 1024
              ? "14px"
              : windowWidth < 1200
              ? "15px"
              : "16px",
        }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {event.files && event.files.length > 0 ? (
          <Image
            src={event.files[0].url}
            alt={event.name}
            width={200}
            height={200}
            className="rounded-xl opacity-100"
            style={{
              width:
                windowWidth < 700
                  ? "100px"
                  : windowWidth < 820
                  ? "120px"
                  : windowWidth < 1024
                  ? "140px"
                  : windowWidth < 1200
                  ? "170px"
                  : "200px",
              height:
                windowWidth < 700
                  ? "100px"
                  : windowWidth < 820
                  ? "120px"
                  : windowWidth < 1024
                  ? "140px"
                  : windowWidth < 1200
                  ? "170px"
                  : "200px",
            }}
            priority={false}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const nextElement = e.currentTarget
                .nextElementSibling as HTMLElement;
              if (nextElement) {
                nextElement.style.display = "flex";
              }
            }}
          />
        ) : null}
        <div
          className={`rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center ${
            event.files && event.files.length > 0 ? "hidden" : "flex"
          }`}
          style={{
            width:
              windowWidth < 600
                ? "100px"
                : windowWidth < 700
                ? "100px"
                : windowWidth < 820
                ? "120px"
                : windowWidth < 1024
                ? "140px"
                : windowWidth < 1200
                ? "170px"
                : "200px",
            height:
              windowWidth < 600
                ? "100px"
                : windowWidth < 700
                ? "100px"
                : windowWidth < 820
                ? "120px"
                : windowWidth < 1024
                ? "140px"
                : windowWidth < 1200
                ? "170px"
                : "200px",
            display: event.files && event.files.length > 0 ? "none" : "flex",
          }}
        >
          <div className="text-center">
            <div
              className="mx-auto mb-2 text-gray-400"
              style={{
                width:
                  windowWidth < 600
                    ? "24px"
                    : windowWidth < 700
                    ? "24px"
                    : windowWidth < 820
                    ? "32px"
                    : windowWidth < 1024
                    ? "40px"
                    : windowWidth < 1200
                    ? "44px"
                    : "48px",
                height:
                  windowWidth < 600
                    ? "24px"
                    : windowWidth < 700
                    ? "24px"
                    : windowWidth < 820
                    ? "32px"
                    : windowWidth < 1024
                    ? "40px"
                    : windowWidth < 1200
                    ? "44px"
                    : "48px",
              }}
            >
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span
              className="text-gray-400 font-medium"
              style={{
                fontSize:
                  windowWidth < 600
                    ? "8px"
                    : windowWidth < 700
                    ? "9px"
                    : windowWidth < 820
                    ? "10px"
                    : windowWidth < 1024
                    ? "11px"
                    : windowWidth < 1200
                    ? "12px"
                    : "12px",
              }}
            >
              No Image
            </span>
          </div>
        </div>
      </motion.div>

      {/* Content section */}
      <div
        className="flex-1 flex flex-col justify-start relative z-10"
        style={{
          paddingTop:
            windowWidth < 700
              ? "20px"
              : windowWidth < 820
              ? "24px"
              : windowWidth < 1024
              ? "22px"
              : windowWidth < 1200
              ? "20px"
              : "28px",
          paddingBottom:
            windowWidth < 700
              ? "8px"
              : windowWidth < 820
              ? "12px"
              : windowWidth < 1024
              ? "14px"
              : windowWidth < 1200
              ? "15px"
              : "28px",
        }}
      >
        {/* Badge section - for largest 2 screens, sits 8px below image top */}
        <div
          className="flex items-start justify-start flex-shrink-0"
          style={{
            marginTop: `${badgeMarginTop}px`,
            marginBottom:
              windowWidth < 700
                ? "6px"
                : windowWidth < 820
                ? "8px"
                : windowWidth < 1024
                ? "10px"
                : "16px",
          }}
        >
          {event.types && event.types.length > 0 && (
            <span
              className="w-fit flex justify-center items-center bg-[#D4D4D4]/10 text-white rounded-full relative transition-all duration-300"
              style={{
                height:
                  windowWidth < 700
                    ? "16px"
                    : windowWidth < 820
                    ? "20px"
                    : windowWidth < 1024
                    ? "24px"
                    : windowWidth < 1200
                    ? "28px"
                    : "32px",
                fontFamily: "Roboto, sans-serif",
                fontWeight: "400",
                fontSize:
                  windowWidth < 700
                    ? "8px"
                    : windowWidth < 820
                    ? "9px"
                    : windowWidth < 1024
                    ? "10px"
                    : windowWidth < 1200
                    ? "11px"
                    : "13px",
                lineHeight: "auto",
                letterSpacing: "0%",
                paddingLeft: windowWidth < 700 ? "6px" : "12px",
                paddingRight: windowWidth < 700 ? "6px" : "12px",
              }}
              key={event.id + "-" + event.types[0]}
            >
              {/* Gradient border overlay - only visible on hover */}
              {isHovered && (
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(19, 25, 59, 0.6) 0%, rgba(19, 25, 59, 0.4) 30%, rgba(19, 25, 59, 0.2) 60%, rgba(255, 255, 255, 0.1) 100%)",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "xor",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    padding: "2px",
                  }}
                />
              )}
              {/* Show first type, or 'Online' if multiple types */}
              {event.types.length > 1 ? "Online" : event.types[0]}
            </span>
          )}
        </div>

        {/* Title and description section */}
        <div className="flex-1">
          <div
            className="relative"
            style={{
              maxWidth:
                windowWidth < 600
                  ? "160px"
                  : windowWidth < 700
                  ? "200px"
                  : windowWidth < 820
                  ? "260px"
                  : windowWidth < 1024
                  ? "320px"
                  : windowWidth < 1200
                  ? "340px"
                  : "500px",
              marginBottom:
                windowWidth < 700
                  ? "3px"
                  : windowWidth < 820
                  ? "4px"
                  : windowWidth < 1024
                  ? "4px"
                  : windowWidth < 1200
                  ? "5px"
                  : "6px",
            }}
          >
            <h1
              ref={titleRef}
              className="text-xl sm:text-2xl md:text-4xl font-extrabold text-white"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize:
                  windowWidth < 600
                    ? "14px"
                    : windowWidth < 700
                    ? "16px"
                    : windowWidth < 820
                    ? "20px"
                    : windowWidth < 1024
                    ? "24px"
                    : windowWidth < 1200
                    ? "28px"
                    : "36px",
                lineHeight:
                  windowWidth < 600
                    ? "16px"
                    : windowWidth < 700
                    ? "18px"
                    : windowWidth < 820
                    ? "22px"
                    : windowWidth < 1024
                    ? "26px"
                    : windowWidth < 1200
                    ? "30px"
                    : "38px",
              }}
            >
              {event.name}
            </h1>
            {/* Gradient overlay for hover effect */}
            <h1
              className="text-xl sm:text-2xl md:text-4xl font-extrabold absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize:
                  windowWidth < 600
                    ? "14px"
                    : windowWidth < 700
                    ? "16px"
                    : windowWidth < 820
                    ? "20px"
                    : windowWidth < 1024
                    ? "24px"
                    : windowWidth < 1200
                    ? "28px"
                    : "36px",
                lineHeight:
                  windowWidth < 600
                    ? "16px"
                    : windowWidth < 700
                    ? "18px"
                    : windowWidth < 820
                    ? "22px"
                    : windowWidth < 1024
                    ? "26px"
                    : windowWidth < 1200
                    ? "30px"
                    : "38px",
                background:
                  "linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(80, 128, 239, 1) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              {event.name}
            </h1>
          </div>
          <p
            className="font-light"
            style={{
              maxWidth:
                windowWidth < 600
                  ? "180px"
                  : windowWidth < 700
                  ? "260px"
                  : windowWidth < 820
                  ? "400px"
                  : windowWidth < 1024
                  ? "480px"
                  : windowWidth < 1200
                  ? "440px"
                  : "500px",
              fontFamily: "Roboto, sans-serif",
              fontSize:
                windowWidth < 600
                  ? "9px"
                  : windowWidth < 700
                  ? "10px"
                  : windowWidth < 820
                  ? "14px"
                  : windowWidth < 1024
                  ? "16px"
                  : "18px",
              lineHeight: "normal",
              letterSpacing: "0%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: descriptionLineClamp,
            }}
          >
            {event.description}
          </p>
        </div>
      </div>

      {/* Button section */}
      <div
        className="flex items-center justify-center relative z-10"
        style={{
          paddingTop:
            windowWidth < 700
              ? "6px"
              : windowWidth < 820
              ? "8px"
              : windowWidth < 1024
              ? "10px"
              : windowWidth < 1200
              ? "15px"
              : "20px",
          paddingRight:
            windowWidth < 600
              ? "12px"
              : windowWidth < 700
              ? "14px"
              : windowWidth < 820
              ? "20px"
              : windowWidth < 1024
              ? "16px"
              : windowWidth < 1200
              ? "26px"
              : "36px",
        }}
      >
        <motion.div
          className="flex flex-col"
          style={{
            gap:
              windowWidth < 700
                ? "6px"
                : windowWidth < 820
                ? "8px"
                : windowWidth < 1024
                ? "9px"
                : windowWidth < 1200
                ? "10px"
                : "12px",
          }}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <button
            className="bg-[#FAA336] text-center flex items-center justify-center"
            style={{
              minWidth:
                windowWidth < 600
                  ? "60px"
                  : windowWidth < 700
                  ? "70px"
                  : windowWidth < 820
                  ? "80px"
                  : windowWidth < 1024
                  ? "90px"
                  : windowWidth < 1200
                  ? "105px"
                  : "120px",
              height:
                windowWidth < 600
                  ? "20px"
                  : windowWidth < 700
                  ? "24px"
                  : windowWidth < 820
                  ? "28px"
                  : windowWidth < 1024
                  ? "30px"
                  : windowWidth < 1200
                  ? "33px"
                  : "36px",
              paddingLeft: "8px",
              paddingRight: "8px",
              borderRadius: "6px",
              color: "#0B1820",
              fontFamily: "Roboto, sans-serif",
              fontWeight: "400",
              fontSize:
                windowWidth < 600
                  ? "8px"
                  : windowWidth < 700
                  ? "9px"
                  : windowWidth < 820
                  ? "10px"
                  : windowWidth < 1024
                  ? "11px"
                  : windowWidth < 1200
                  ? "12px"
                  : "14px",
              lineHeight: "auto",
              letterSpacing: "0%",
            }}
            onClick={onInvitationLink}
          >
            Registration Link
          </button>
          <button
            className="bg-transparent border-[1px] border-white text-center flex items-center justify-center"
            style={{
              minWidth:
                windowWidth < 600
                  ? "60px"
                  : windowWidth < 700
                  ? "70px"
                  : windowWidth < 820
                  ? "80px"
                  : windowWidth < 1024
                  ? "90px"
                  : windowWidth < 1200
                  ? "105px"
                  : "120px",
              height:
                windowWidth < 600
                  ? "20px"
                  : windowWidth < 700
                  ? "24px"
                  : windowWidth < 820
                  ? "28px"
                  : windowWidth < 1024
                  ? "30px"
                  : windowWidth < 1200
                  ? "33px"
                  : "36px",
              paddingLeft: "8px",
              paddingRight: "8px",
              borderRadius: "6px",
              color: "#FFFFFF",
              fontFamily: "Roboto, sans-serif",
              fontWeight: "400",
              fontSize:
                windowWidth < 600
                  ? "8px"
                  : windowWidth < 700
                  ? "9px"
                  : windowWidth < 820
                  ? "10px"
                  : windowWidth < 1024
                  ? "11px"
                  : windowWidth < 1200
                  ? "12px"
                  : "14px",
              lineHeight: "auto",
              letterSpacing: "0%",
            }}
            onClick={() => onSeeDetails(event)}
          >
            See Details
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
