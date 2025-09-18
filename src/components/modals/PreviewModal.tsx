import React, { useEffect, useRef, useState } from "react";
import CollapsibleSection from "../ui/CollapsibleSection";
import { Events } from "@/types/events";
import Image from "next/image";
import { formatDateSmart } from "@/utils/dateUtils";
import { isEventPast } from "@/app/events/utils/eventUtils";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Events | null;
  onShare?: () => void;
  onInvite?: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  event,
  onInvite,
}) => {
  const scrollLockRef = useRef(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const slideshowIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      scrollLockRef.current = window.scrollY;

      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollLockRef.current}px`;
      document.body.style.width = "100%";
    } else {
      const scrollY = scrollLockRef.current;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    }

    return () => {
      if (!isOpen) return;

      const scrollY = scrollLockRef.current;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen, scrollLockRef]);

  // Slideshow functionality
  useEffect(() => {
    if (isOpen && event?.files) {
      // Always reset to first image when modal opens
      setCurrentImageIndex(0);

      // Clear any existing interval
      if (slideshowIntervalRef.current) {
        clearInterval(slideshowIntervalRef.current);
      }

      // Start slideshow only if there are multiple images
      if (event.files.length > 1) {
        slideshowIntervalRef.current = setInterval(() => {
          setCurrentImageIndex(
            (prevIndex) => (prevIndex + 1) % event.files!.length
          );
        }, 4000);
      }
    } else {
      // Reset index when modal is closed
      setCurrentImageIndex(0);
    }

    return () => {
      if (slideshowIntervalRef.current) {
        clearInterval(slideshowIntervalRef.current);
      }
    };
  }, [isOpen, event?.files]);

  // Handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    // Safety check to ensure index is within bounds
    if (event?.files && index >= 0 && index < event.files.length) {
      setCurrentImageIndex(index);
      // Reset slideshow timer when user manually selects an image
      if (slideshowIntervalRef.current) {
        clearInterval(slideshowIntervalRef.current);
      }
      if (event.files.length > 1) {
        slideshowIntervalRef.current = setInterval(() => {
          setCurrentImageIndex(
            (prevIndex) => (prevIndex + 1) % event.files!.length
          );
        }, 4000);
      }
    }
  };

  // Handle previous image
  const handlePreviousImage = () => {
    if (event?.files && event.files.length > 0) {
      setCurrentImageIndex(
        (prevIndex) =>
          (prevIndex - 1 + event.files!.length) % event.files!.length
      );
      // Reset slideshow timer when user manually navigates
      if (slideshowIntervalRef.current) {
        clearInterval(slideshowIntervalRef.current);
      }
      if (event.files.length > 1) {
        slideshowIntervalRef.current = setInterval(() => {
          setCurrentImageIndex(
            (prevIndex) => (prevIndex + 1) % event.files!.length
          );
        }, 4000);
      }
    }
  };

  // Handle next image
  const handleNextImage = () => {
    if (event?.files && event.files.length > 0) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % event.files!.length
      );
      // Reset slideshow timer when user manually navigates
      if (slideshowIntervalRef.current) {
        clearInterval(slideshowIntervalRef.current);
      }
      if (event.files.length > 1) {
        slideshowIntervalRef.current = setInterval(() => {
          setCurrentImageIndex(
            (prevIndex) => (prevIndex + 1) % event.files!.length
          );
        }, 4000);
      }
    }
  };

  // Use smart date formatting with timezone awareness
  const formatDate = (dateString: string) => {
    if (!dateString || dateString.trim().toUpperCase() === "TBD") return "TBD";
    if (dateString.trim().toUpperCase().includes("EVERY"))
      return dateString.trim();
    return formatDateSmart(dateString, { format: "medium" });
  };

  const displayTime = (() => {
    if (!event?.time || event?.time.trim().toUpperCase() === "TBD")
      return "TBD";

    // Check if this is a recurring event (date contains "Every")
    if (event?.date && event?.date.trim().toUpperCase().includes("EVERY")) {
      // For recurring events, time contains a timestamp - format it
      const timestamp = parseInt(event?.time);
      if (!isNaN(timestamp)) {
        const endDate = new Date(timestamp);
        return `Until ${endDate.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}`;
      }
    }

    return event?.time;
  })();
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="bg-[#D4D4D4]/10 md:rounded-2xl max-w-7xl w-full h-full md:h-9/10 p-8 relative  text-white flex flex-col gap-4  overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 cursor-pointer    px-4 py-1 text-lg"
        >
          ✕
        </button>
        {/* Header */}
        <div className="flex gap-3 items-center  mb-2 ">
          <h2
            className="text-4xl font-bold"
            style={{
              background: "linear-gradient(90deg, #fff 0%, #5181F0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {event.name}
          </h2>
          <Image
            src="/FigmaFiles/ccubed-icon.svg"
            alt="ccubed icon"
            width={35}
            height={35}
          ></Image>
          {/* <div className="flex gap-2">
                      {event.types &&
                        event.types.length > 0 &&
                        event.types.map((type, id) => (
                          <div
                            className="inline-block px-4 py-1 border-2 border-black rounded-full mb-2 font-patrick text-lg bg-white"
                            key={type + id}
                          >
                            {type}
                          </div>
                        ))}
                    </div> */}
        </div>
        {/* Main Content */}
        <div className="flex h-full flex-col  md:flex-row gap-8 ">
          {/* Image Box */}
          <div className="w-100 h-96 md:h-[500px] gap-4 rounded-lg flex flex-col items-center justify-center overflow-hidden relative">
            {event.files &&
            event.files.length > 0 &&
            event.files[currentImageIndex] ? (
              <div className="w-full h-full rounded-lg overflow-hidden relative">
                <Image
                  src={event.files[currentImageIndex].url}
                  alt={event.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover rounded-lg"
                />
                {/* Navigation Arrows - Only show if there are multiple images */}
                {event.files.length > 1 && (
                  <>
                    {/* Previous Arrow */}
                    <button
                      onClick={handlePreviousImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200 z-10"
                      aria-label="Previous image"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15 18L9 12L15 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    {/* Next Arrow */}
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200 z-10"
                      aria-label="Next image"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 18L15 12L9 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            ) : (
              <span className="text-4xl text-gray-400">🖼️</span>
            )}
            {/* other images */}
            <div className="flex justify-center gap-2 mt-4">
              {event.files &&
                event.files.length > 0 &&
                event.files.map((eventt, index) => (
                  <div
                    className={`w-12 h-12 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                      index === currentImageIndex ? "" : "opacity-50"
                    }`}
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <Image
                      src={eventt.url}
                      alt={eventt.name}
                      width={48}
                      height={48}
                      className={`w-full h-full object-cover transition-all duration-300 ${
                        index === currentImageIndex
                          ? "grayscale-0"
                          : "grayscale hover:grayscale-50"
                      }`}
                    />
                  </div>
                ))}
            </div>
          </div>
          {/* Details */}
          <div className="flex-1 flex flex-col gap-2 ">
            {/* top row */}
            <div className="flex items-center gap-10 mb-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/FigmaFiles/eventsAssets/clock-2.svg"
                  alt="Time"
                  width={30}
                  height={30}
                  className="select-none"
                  draggable={false}
                  style={{ userSelect: "none" }}
                />
                <span
                  style={{
                    fontSize: "16px",
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: "400",
                    letterSpacing: "0%",
                  }}
                >
                  {displayTime}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src="/FigmaFiles/eventsAssets/calendar.svg"
                  alt="Date"
                  width={30}
                  height={30}
                  className="select-none"
                  draggable={false}
                  style={{ userSelect: "none" }}
                />
                <span
                  style={{
                    fontSize: "16px",
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: "400",
                    letterSpacing: "0%",
                  }}
                >
                  {formatDate(event.date)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Image
                  src="/FigmaFiles/eventsAssets/place.svg"
                  alt="Location"
                  width={30}
                  height={30}
                  className="select-none"
                  draggable={false}
                  style={{ userSelect: "none" }}
                />
                <span
                  style={{
                    fontSize: "16px",
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: "400",
                    letterSpacing: "0%",
                  }}
                >
                  {event.location}
                </span>
              </div>
            </div>
            {/* Description */}
            <div>
              <CollapsibleSection
                title="Description"
                titleStyle="text-3xl font-bold"
              >
                <p>{event.description}</p>
              </CollapsibleSection>
            </div>
            {/* <CollapsibleSection
              title="You will Learn:"
              titleStyle="text-xl font-semibold"
            >
              <ul className="list-disc list-inside text-base">
                <li>Lots and lots of vocabulary</li>
                <li>Useful everyday phrases</li>
                <li>Basic sentence structures</li>
                <li>
                  Basic grammar rules most beginner courses don&apos;t teach
                </li>
              </ul>
            </CollapsibleSection>
            <CollapsibleSection
              title="What You Need:"
              titleStyle="text-xl font-semibold"
            >
              <ul className="list-disc list-inside text-base">
                <li>
                  Greet people and introduce yourself both formally and casually
                </li>
                <li>Pronounce words correctly without hearing them first</li>
                <li>Over one thousand vocabulary words from all categories</li>
              </ul>
            </CollapsibleSection>
            <CollapsibleSection
              title="Instructors"
              titleStyle="text-xl font-semibold"
            >
              <ul className="list-disc list-inside text-base">
                <li>
                  Greet people and introduce yourself both formally and casually
                </li>
                <li>Pronounce words correctly without hearing them first</li>
                <li>Over one thousand vocabulary words from all categories</li>
              </ul>
            </CollapsibleSection> */}
            <div className="flex flex-col flex-1 justify-end h-full ">
              <div className="flex justify-end mt-auto ">
                {/* <div className="flex flex-col gap-2 border-2 border-yellow-500">
                  <span className="">Discord</span>
                  <span className="flex items-center gap-2 text-base">
                    <span>📅</span> March (Exact Date TBD)
                  </span>
                </div> */}
                {!isEventPast(event) && (
                  <div className="flex gap-2 items-center justify-end ">
                    <button
                      onClick={onInvite}
                      className=" px-4 py-2 text-[#0B1820] bg-[#FAA336] border-[1px] border-[#FAA336] rounded-md text-center"
                      style={{
                        height: "auto",
                        minHeight: 0,
                        alignSelf: "center",
                      }}
                    >
                      Registration Link
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
