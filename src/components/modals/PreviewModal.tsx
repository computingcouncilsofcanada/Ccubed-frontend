import React, { useEffect, useRef, useState } from "react";
import CollapsibleSection from "../ui/CollapsibleSection";
import { Events } from "@/types/events";
import Image from "next/image";
import { formatDateSmart } from "@/utils/dateUtils";
import { isEventPast } from "@/app/events/utils/eventUtils";
import ReactMarkdown from "react-markdown";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Events | null;
  onShare?: () => void;
  onInvite?: (url: string | null | undefined) => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  event,
  onInvite,
}) => {
  const scrollLockRef = useRef(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

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

  useEffect(() => {
    if (isOpen) setCurrentImageIndex(0);
  }, [isOpen, event?.files]);

  const handleThumbnailClick = (index: number) => {
    if (event?.files && index >= 0 && index < event.files.length) {
      setCurrentImageIndex(index);
    }
  };

  const handlePreviousImage = () => {
    if (event?.files && event.files.length > 0) {
      setCurrentImageIndex(
        (prevIndex) =>
          (prevIndex - 1 + event.files!.length) % event.files!.length,
      );
    }
  };

  const handleNextImage = () => {
    if (event?.files && event.files.length > 0) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % event.files!.length,
      );
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    if (touchStartX.current === null) return;

    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNextImage();
      else handlePreviousImage();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const formatDate = (dateString: string) => {
    if (!dateString || dateString.trim().toUpperCase() === "TBD") return "TBD";
    if (dateString.trim().toUpperCase().includes("EVERY"))
      return dateString.trim();
    return formatDateSmart(dateString, { format: "medium" });
  };

  const displayTime = (() => {
    if (!event?.time || event?.time.trim().toUpperCase() === "TBD")
      return "TBD";

    if (event?.date && event?.date.trim().toUpperCase().includes("EVERY")) {
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
      <div className="preview-modal-scroll bg-[#D4D4D4]/10 md:rounded-2xl max-w-7xl w-full h-full md:h-9/10 p-8 relative text-white flex flex-col gap-4 overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-400 hover:border-white hover:bg-white/10 text-white text-xl transition-all duration-200"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Header */}
        <div className="md:flex md:gap-3 md:items-center  mb-2 b">
          <h2
            className="text-4xl font-bold max-md:text-center"
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
            className="max-md:hidden"
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8 ">
          <div className="w-full md:w-100 flex flex-col flex-shrink-0 gap-4">
            <div className="w-full h-[300px] md:h-[500px] rounded-lg flex flex-col items-center justify-center overflow-hidden relative">
              {event.files &&
              event.files.length > 0 &&
              event.files[currentImageIndex] ? (
                <div
                  className="w-full h-full rounded-lg overflow-hidden relative"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <Image
                    src={event.files[currentImageIndex].url}
                    alt={event.name}
                    width={400}
                    height={400}
                    className="w-full h-full md:h-full object-cover rounded-lg"
                  />
                  {event.files.length > 1 && (
                    <>
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
            </div>

            {/* Thumbnails (under image) */}
            {event.files && event.files.length > 0 && (
              <div className="flex justify-center gap-2">
                {event.files.map((eventFile, index) => (
                  <div
                    className={`w-12 h-12 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                      index === currentImageIndex ? "" : "opacity-50"
                    }`}
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <Image
                      src={eventFile.url}
                      alt={eventFile.name}
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
            )}

            {!isEventPast(event) && (
              <div className="flex justify-center md:justify-center mt-10">
                <button
                  onClick={() =>
                    onInvite?.(
                      event.registration_link || event.url
                        ? event.registration_link || event.url
                        : null,
                    )
                  }
                  className="px-4 py-2 text-[#0B1820] bg-[#FAA336] border border-[#FAA336] rounded-md text-center"
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

          <div className="flex-1 flex flex-col gap-2 min-w-0">
            <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-10 mb-4">
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

            <div>
              <CollapsibleSection
                title="Description"
                titleStyle="text-3xl font-bold"
                defaultOpen={true}
              >
                <p>{event.description}</p>
              </CollapsibleSection>
            </div>

            {event.learning_outcomes && event.learning_outcomes.length > 0 && (
              <div>
                <CollapsibleSection
                  title="Learning outcomes"
                  titleStyle="text-2xl font-bold"
                  defaultOpen={false}
                >
                  <ul className="list-disc list-inside space-y-1">
                    {event.learning_outcomes.map((outcome, i) => (
                      <li key={i}>{outcome}</li>
                    ))}
                  </ul>
                </CollapsibleSection>
              </div>
            )}

            {event.what_you_need && event.what_you_need.length > 0 && (
              <div>
                <CollapsibleSection
                  title="What you need"
                  titleStyle="text-2xl font-bold"
                  defaultOpen={false}
                >
                  <ul className="list-disc list-inside space-y-1">
                    {event.what_you_need.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </CollapsibleSection>
              </div>
            )}

            {event.instructors && event.instructors.length > 0 && (
              <div>
                <CollapsibleSection
                  title="Instructors"
                  titleStyle="text-2xl font-bold"
                  defaultOpen={false}
                >
                  <ul className="list-disc list-inside space-y-1">
                    {event.instructors.map((name, i) => (
                      <li key={i}>{name}</li>
                    ))}
                  </ul>
                </CollapsibleSection>
              </div>
            )}

            {event.content && event.content.trim() && (
              <div>
                <CollapsibleSection
                  title="Event details"
                  titleStyle="text-2xl font-bold"
                  defaultOpen={false}
                >
                  <ReactMarkdown
                    components={{
                      strong: ({ children }) => (
                        <strong className="text-[#FAA336] font-semibold">
                          {children}
                        </strong>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-lg font-bold  mb-2 text-white">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-base font-semibold mt-4 mb-1 text-white">
                          {children}
                        </h3>
                      ),
                      p: ({ children }) => (
                        <p className="text-white/90 my-2 leading-relaxed">
                          {children}
                        </p>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc list-inside my-2 space-y-1 text-white/90">
                          {children}
                        </ul>
                      ),
                      li: ({ children }) => (
                        <li className="ml-2">{children}</li>
                      ),
                    }}
                  >

                    {event.content.replace(/\r\n/g, "\n")}
                  </ReactMarkdown>
                </CollapsibleSection>
              </div>
            )}

            {event.recurrence && event.recurrence.type !== "none" && (
              <div>
                <CollapsibleSection
                  title="Recurrence"
                  titleStyle="text-2xl font-bold"
                  defaultOpen={false}
                >
                  <div className="space-y-2">
                    {event.recurrence.type === "daily" && (
                      <div className="flex items-center gap-2">
                        <span className="text-[#FAA336]">📅</span>
                        <p>
                          This event occurs{" "}
                          <span className="font-semibold">daily</span>
                        </p>
                      </div>
                    )}

                    {event.recurrence.type === "weekly" && (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[#FAA336]">📅</span>
                          <p>
                            This event occurs{" "}
                            <span className="font-semibold">weekly</span>
                          </p>
                        </div>
                        {event.recurrence.days_of_week &&
                          event.recurrence.days_of_week.length > 0 && (
                            <p className="ml-7 text-white/80">
                              Every {event.recurrence.days_of_week.join(", ")}
                            </p>
                          )}
                      </div>
                    )}

                    {event.recurrence.type === "monthly" && (
                      <div className="flex items-center gap-2">
                        <span className="text-[#FAA336]">📅</span>
                        <p>
                          This event occurs{" "}
                          <span className="font-semibold">monthly</span>
                        </p>
                      </div>
                    )}

                    {event.recurrence.type === "custom" && (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[#FAA336]">📅</span>
                          <p>
                            This event occurs on{" "}
                            <span className="font-semibold">
                              specific dates
                            </span>
                          </p>
                        </div>
                        {event.recurrence.custom_dates &&
                          event.recurrence.custom_dates.length > 0 && (
                            <div className="ml-7 space-y-1">
                              {event.recurrence.custom_dates.map(
                                (date, idx) => (
                                  <p key={idx} className="text-white/80">
                                    •{" "}
                                    {new Date(date).toLocaleDateString(
                                      "en-US",
                                      {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      },
                                    )}
                                  </p>
                                ),
                              )}
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                </CollapsibleSection>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
