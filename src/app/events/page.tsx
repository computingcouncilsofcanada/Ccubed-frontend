"use client";

import { useEffect, useState } from "react";
import { IconList, IconApps } from "@tabler/icons-react";
import Image from "next/image";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/shared/Footer";
import PreviewModal from "@/components/modals/PreviewModal";
import { getAllEvents } from "@/services/useApiAuth";
import { Events } from "@/types/events";
import { EventCard } from "@/components/sections/landing/EventCard";
import React from "react";
import { IconCalendar } from "@tabler/icons-react";
import { privateAxios } from "@/lib/axios";
import { transformApiEvents } from "@/lib/utils";

export default function EventsPage() {
  const [events, setEvents] = useState<Events[]>([]);
  const [gridEvents, setGridEvents] = useState<Events[]>([]);

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const [eventType, setEventType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<string>("list"); // "list" or "grid"
  const [selectedEvent, setSelectedEvent] = useState<Events | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleShare = () => alert("Share link clicked");
  const handleInvite = () => alert("Invitation link clicked");
  const [showMore, setShowMore] = useState<boolean>(false);

  const fetchEvents = async () => {
    try {
      const offset = 0;
      const limit = 0;
      const res = await getAllEvents(limit, offset);
      const transformedEvents = transformApiEvents(res.data)
      setEvents(transformedEvents);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "An error occurred";
      setError(message);
      console.log(error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  function getOrdinalSuffix(num: string) {
    const n = parseInt(num, 10);
    const lastDigit = n % 10;
    const lastTwo = n % 100;
  
    if (lastTwo >= 11 && lastTwo <= 13) return "th";
  
    if (lastDigit === 1) return "st";
    if (lastDigit === 2) return "nd";
    if (lastDigit === 3) return "rd";
    return "th";
  }
  
  useEffect(() => {
    // Using real API instead of mock data
    setLoading(true);
    privateAxios
      .get("/events")
      .then((res) => {
        const transformedEvents = transformApiEvents(res.data.data);
        setGridEvents(transformedEvents);
      })
      .catch((error) => {
        setError(error.response?.data?.message || "Failed to fetch events");
        console.error("Error fetching events:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredEvents = gridEvents
    .filter((event: Events) => event.status !== 0)
    .filter((event: Events) => {
      if (eventType === "all") return true;
      if (!event.types || event.types.length === 0)
        return eventType === "online";

      // Handle hybrid filter - events with multiple types OR events specifically marked as hybrid
      if (eventType === "hybrid") {
        return (
          event.types.length > 1 ||
          event.types.some((type) => type.toLowerCase().includes("hybrid"))
        );
      }

      // Handle single type filters
      if (eventType === "inperson") {
        return event.types.length === 1 && event.types[0] === "In Person";
      }

      if (eventType === "online") {
        return event.types.length === 1 && event.types[0] === "Online";
      }

      return false;
    });
  const showEmptyState = false;
  const showNoEventsForFilter =
    !showEmptyState && eventType !== "all" && filteredEvents.length === 0;

  // Check if there are more events to show
  const hasMoreEvents = filteredEvents.length > 4;

  const getFilterDisplayName = (type: string) => {
    switch (type) {
      case "inperson":
        return "In Person";
      case "hybrid":
        return "Hybrid";
      case "online":
        return "Online";
      default:
        return type;
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []); // Fetching the events once at component mount

  return (
    <div className="relative w-full overflow-hidden overflow-x-hidden -mt-30 pt-20">
      {/* Add the background component - limited height for events page */}
      <BgBoxMainPage maxHeight={100} />

      <div className="max-w-6xl w-full mx-auto py-10 px-5 relative z-10 mb-32">
        <div className="image relative flex justify-center flex-shrink-0">
          <motion.div className="relative w-[505px] h-[505px]">
            {/* Base Hero Image */}
            <Image
              src="/FigmaFiles/mainPageAssets/hero-img.svg"
              alt="Hero Image"
              width={505}
              height={505}
              className="w-full h-full object-contain select-none"
              priority
              draggable={false}
              style={{ userSelect: "none" }}
            />

            {/* Animated Overlay Image */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/FigmaFiles/mainPageAssets/hero-img-2.svg"
                alt="Hero Image with Texture"
                width={505}
                height={505}
                className="w-full h-full object-contain select-none"
                priority
                draggable={false}
                style={{ userSelect: "none" }}
              />
            </motion.div>
          </motion.div>
        </div>
        <div className="flex mb-4 ">
          <h1 className="text-white text-[40px] self-end font-extrabold ">
            Events
          </h1>
          <Image
            src="/FigmaFiles/eventPageAssets/bear-img.svg"
            alt="CCubed Bear Logo Animated"
            className="select-none  -ml-8"
            width={100}
            height={120}
            priority
            draggable={false}
            style={{ userSelect: "none" }}
          />
        </div>
        <p className=" mt-5 text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti qui
          officiis inventore, laborum porro debitis quae eius! A, ex ipsa quidem
          quasi error expedita earum beatae! Beatae quo delectus dignissimos
          dolorem fugit alias. Iusto eos non ad, dignissimos molestiae sunt.
        </p>
        {error && (
          <p className="mt-4 rounded-md border border-red-300 bg-red-100 p-4 text-center text-red-700">
            {error}
          </p>
        )}
        <div className="flex justify-between items-center mt-7">
          {/* Event Type Filter */}
          <div
            className="flex gap-1 rounded-lg p-1 bg-[#0B161E] relative"
            style={{ width: "352px", height: "56px" }}
          >
            {/* Sliding Background Indicator */}
            <motion.div
              className="absolute top-1 rounded-lg"
              style={{
                height: "48px",
                width: "84px", // (352-8-3)/4 = width per option
                backgroundColor: "rgba(19, 40, 54, 0.8)",
              }}
              animate={{
                x:
                  ["all", "inperson", "hybrid", "online"].indexOf(eventType) *
                  87, // 84px width + 3px gap
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
                x:
                  ["all", "inperson", "hybrid", "online"].indexOf(eventType) *
                  87,
              }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
              }}
            />

            {[
              { label: "All Events", value: "all" },
              { label: "In Person", value: "inperson" },
              { label: "Hybrid", value: "hybrid" },
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
                  onChange={() => setEventType(option.value)}
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
                onClick={() => setViewMode(value)}
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
        {viewMode === "grid" ? (
          <>
            <div
              className={`mb-2 ${
                showEmptyState || showNoEventsForFilter
                  ? "flex justify-center items-center h-[451px]"
                  : ""
              }`}
            >
              {!showEmptyState && !showNoEventsForFilter && (
                <div className="space-y-3">
                  {/* First Row - Always visible */}
                  <div className="grid grid-cols-4 gap-3 mt-10">
                    {filteredEvents.slice(0, 4).map((event) => (
                      <EventCard
                        key={event.id}
                        id={event.id}
                        title={event.name}
                        time={event.time}
                        date={event.date}
                        location={event.location}
                        type={(() => {
                          if (!event.types || event.types.length === 0)
                            return "Online";

                          // Check for hybrid first - either multiple types OR contains "hybrid"
                          const hasHybridType = event.types.some(
                            (type) =>
                              type.toLowerCase() === "hybrid" ||
                              type.toLowerCase().includes("hybrid")
                          );
                          if (event.types.length > 1 || hasHybridType)
                            return "Hybrid";

                          // Single type matching
                          const eventType = event.types[0];
                          if (eventType === "In Person") return "In Person";
                          if (eventType === "Online") return "Online";

                          return "Online"; // Default fallback
                        })()}
                        imageSrc={
                          event.files && event.files.length > 0
                            ? event.files[0].url
                            : "https://placehold.co/400"
                        }
                        description={event.description}
                      />
                    ))}
                  </div>

                  {/* Second Row - Animated */}
                  <AnimatePresence>
                    {showMore && filteredEvents.length > 4 && (
                      <motion.div
                        className="grid grid-cols-4 gap-3"
                        initial={{ opacity: 0, y: -30, height: 0 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          height: "auto",
                        }}
                        exit={{
                          opacity: 0,
                          y: -30,
                          height: 0,
                        }}
                        transition={{
                          duration: 0.8,
                          ease: [0.25, 0.1, 0.25, 1],
                          height: {
                            duration: 0.8,
                            ease: [0.25, 0.1, 0.25, 1],
                          },
                        }}
                      >
                        {filteredEvents.slice(4, 8).map((event) => (
                          <EventCard
                            key={event.id}
                            id={event.id}
                            title={event.name}
                            time={event.time}
                            date={event.date}
                            location={event.location}
                            type={(() => {
                              if (!event.types || event.types.length === 0)
                                return "Online";

                              // Check for hybrid first - either multiple types OR contains "hybrid"
                              const hasHybridType = event.types.some(
                                (type) =>
                                  type.toLowerCase() === "hybrid" ||
                                  type.toLowerCase().includes("hybrid")
                              );
                              if (event.types.length > 1 || hasHybridType)
                                return "Hybrid";

                              // Single type matching
                              const eventType = event.types[0];
                              if (eventType === "In Person") return "In Person";
                              if (eventType === "Online") return "Online";

                              return "Online"; // Default fallback
                            })()}
                            imageSrc={
                              event.files && event.files.length > 0
                                ? event.files[0].url
                                : "https://placehold.co/400"
                            }
                            description={event.description}
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
              {showEmptyState && (
                <motion.div
                  className="flex flex-col items-center justify-center py-16 px-8"
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
                    No Events Available
                  </h3>
                  <p
                    className="text-white text-center opacity-70"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontWeight: "300",
                      fontSize: "16px",
                      lineHeight: "24px",
                      letterSpacing: "0%",
                      maxWidth: "300px",
                    }}
                  >
                    Check back soon for exciting upcoming events and workshops!
                  </p>
                </motion.div>
              )}

              {/* No events found for specific filter */}
              {showNoEventsForFilter && (
                <motion.div
                  className="flex flex-col items-center justify-center py-16 px-8"
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
                    No {getFilterDisplayName(eventType)} Events
                  </h3>
                  <p
                    className="text-white text-center opacity-70"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontWeight: "300",
                      fontSize: "16px",
                      lineHeight: "24px",
                      letterSpacing: "0%",
                      maxWidth: "350px",
                    }}
                  >
                    We don&apos;t have any{" "}
                    {getFilterDisplayName(eventType).toLowerCase()} events
                    available right now. Try checking &quot;All Events&quot; or
                    other event types!
                  </p>
                </motion.div>
              )}
            </div>
            {hasMoreEvents && (
              <div className="flex justify-center">
                <motion.button
                  className="border border-white rounded-lg hover:bg-white/10 transition-colors duration-200"
                  style={{
                    width: "110px",
                    height: "44px",
                    borderRadius: "8px",
                    borderWidth: "1px",
                    borderColor: "#FFFFFF",
                    backgroundColor: "transparent",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "400",
                    fontSize: "16px",
                    lineHeight: "24px",
                    letterSpacing: "1%",
                    color: "#FFFFFF",
                  }}
                  onClick={() => setShowMore(!showMore)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {showMore ? "Show less" : "See more"}
                </motion.button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col gap-10 mt-10">
            {events.length > 0 &&
              events
                .filter((event: Events) => event.status !== 0)
                .filter((event: Events) => {
                  if (eventType === "all") return true;
                  if (!event.types || event.types.length === 0)
                    return eventType === "online";

                  // Handle hybrid filter - events with multiple types OR events specifically marked as hybrid
                  if (eventType === "hybrid") {
                    return (
                      event.types.length > 1 ||
                      event.types.some((type) =>
                        type.toLowerCase().includes("hybrid")
                      )
                    );
                  }

                  // Handle single type filters
                  if (eventType === "inperson") {
                    return (
                      event.types.length === 1 && event.types[0] === "In Person"
                    );
                  }

                  if (eventType === "online") {
                    return (
                      event.types.length === 1 && event.types[0] === "Online"
                    );
                  }

                  return false;
                }).length === 0 && (
                <p className="text-2xl font-bold text-center">
                  No events at this time
                </p>
              )}
            {events.length > 0 &&
              events
                .filter((event: Events) => event.status !== 0)
                .filter((event: Events) => {
                  if (eventType === "all") return true;
                  if (!event.types || event.types.length === 0)
                    return eventType === "online";

                  // Handle hybrid filter - events with multiple types OR events specifically marked as hybrid
                  if (eventType === "hybrid") {
                    return (
                      event.types.length > 1 ||
                      event.types.some((type) =>
                        type.toLowerCase().includes("hybrid")
                      )
                    );
                  }

                  // Handle single type filters
                  if (eventType === "inperson") {
                    return (
                      event.types.length === 1 && event.types[0] === "In Person"
                    );
                  }

                  if (eventType === "online") {
                    return (
                      event.types.length === 1 && event.types[0] === "Online"
                    );
                  }

                  return false;
                }).length === 0 &&
              eventType !== "all" && (
                <p className="text-2xl font-bold text-center">
                  No events found for this category
                </p>
              )}
            {events
              .filter((event: Events) => event.status !== 0)
              .filter((event: Events) => {
                if (eventType === "all") return true;
                if (!event.types || event.types.length === 0)
                  return eventType === "online";

                // Handle hybrid filter - events with multiple types OR events specifically marked as hybrid
                if (eventType === "hybrid") {
                  return (
                    event.types.length > 1 ||
                    event.types.some((type) =>
                      type.toLowerCase().includes("hybrid")
                    )
                  );
                }

                // Handle single type filters
                if (eventType === "inperson") {
                  return (
                    event.types.length === 1 && event.types[0] === "In Person"
                  );
                }

                if (eventType === "online") {
                  return (
                    event.types.length === 1 && event.types[0] === "Online"
                  );
                }

                return false;
              })
              .map((event) => (
                <div
                  className="flex text-white group p-5 bg-[#D4D4D4]/10 backdrop-blur-sm rounded-lg shadow-xl"
                  key={event.id + "-list"}
                >
                  <div className=" px-5 group-hover:border-r-[1px] border-dashed border-white/10 ">
                    <h1 className="text-center">
                      <span className="text-2xl font-extrabold group-hover:text-5xl transition-all duration-300 ">
                      {formatDate(event.date).split(" ")[1].split("")[0]}{getOrdinalSuffix(formatDate(event.date).split(" ")[1].split("")[0])}
                      </span>{" "}
                      <br />
                      {formatDate(event.date).split(" ")[0]}
                    </h1>
                  </div>
                  <div className=" flex-1 ">
                    <div className="flex gap-3 h-60  group-hover:pl-4 transition-all duration-300 ">
                      <div className="flex-1">
                        <Image
                          src={
                            event.files && event.files.length > 0
                              ? event.files[0].url
                              : "https://placehold.co/400"
                          }
                          alt={event.name}
                          width={250}
                          height={250}
                          className="rounded-lg w-full h-full"
                          priority={false}
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                        ></Image>
                      </div>

                      <div className="flex-2 flex flex-col gap-3">
                        {event.types &&
                          event.types.length > 0 &&
                          event.types.map((type) => (
                            <h1
                            className="w-fit flex justify-center items-center"
                            style={{
                              height: "28px",
                              paddingLeft: "12px",
                              paddingRight: "12px",
                              borderRadius: "20px",
                              backgroundColor: "rgba(212, 212, 212, 0.1)",
                              border: "1px solid rgba(255, 255, 255, 0.3)",
                              opacity: "0.99",
                              color: "#FFFFFF",
                              fontFamily: "Roboto, sans-serif",
                              fontWeight: "400",
                              fontSize: "10px",
                              lineHeight: "auto",
                              letterSpacing: "0%",
                              backdropFilter: "blur(10px)",
                              WebkitBackdropFilter: "blur(10px)",
                              filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.25))",
                            }}
                              key={event.id + "-" + type}
                            >
                              {type}
                            </h1>
                          ))}

                        <h1 className="text-4xl font-bold max-w-[300px]">
                          {event.name}
                        </h1>
                        <p className="max-w-[500px]">{event.description}</p>
                      </div>
                      <div className="flex-1  flex justify-center items-center">
                        <div className="flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 ">
                          <a
                            href=""
                            className="  p-2 text-black bg-[#FAA336] border-[1px] border-[#FAA336] rounded-md text-center"
                            onClick={(e) => e.preventDefault()}
                          >
                            Invitation Link
                          </a>
                          <a
                            href=""
                            className=" p-2  text-white  border-[1px] border-white rounded-md text-center"
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedEvent(event);
                              setIsModalOpen(true);
                            }}
                          >
                            See Details
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Add the shared footer */}
      <Footer />

      {/* Event Details Modal */}
      <PreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
        onShare={handleShare}
        onInvite={handleInvite}
      />
    </div>
  );
}
