"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IconList, IconApps } from "@tabler/icons-react";
import Image from "next/image";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import Footer from "@/components/shared/Footer";
import PreviewModal from "@/components/modals/PreviewModal";
import { getAllEvents } from "@/services/useApiAuth";
import { Events } from "@/types/events";

export default function EventsPage() {
  const [events, setEvents] = useState<Events[]>([]);
  const [error, setError] = useState<string>("");
  const [eventType, setEventType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<string>("list"); // "list" or "grid"
  const [selectedEvent, setSelectedEvent] = useState<Events | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleShare = () => alert("Share link clicked");
  const handleInvite = () => alert("Invitation link clicked");

  const fetchEvents = async () => {
    try {
      const offset = 0;
      const limit = 0;
      const res = await getAllEvents(limit, offset);
      setEvents(res.data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      setError(message);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []); // Fetching the events once at component mount

  return (
    <div className="relative w-full overflow-hidden overflow-x-hidden -mt-30 pt-20">
      {/* Add the background component - limited height for events page */}
      <BgBoxMainPage maxHeight={100} />
      
      <div className="max-w-6xl w-full mx-auto py-10 font-patrick px-5 relative z-10 mb-32">
        <div className="border-2 border-black h-85 bg-gray-200 rounded-md"></div>
        <h1 className="text-black  text-3xl mt-5 ">Events</h1>
        <p className="text-lg mt-5">
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
                x: ["all", "inperson", "hybrid", "online"].indexOf(eventType) * 87, // 84px width + 3px gap
              }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1]
              }}
            />

            {/* Sliding Gradient Border */}
            <motion.div
              className="absolute top-1 rounded-lg pointer-events-none"
              style={{
                height: "48px",
                width: "84px",
                background: "linear-gradient(to top, rgba(61, 131, 178, 1) 0%, rgba(26, 56, 76, 0) 100%)",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "xor",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                padding: "1.5px",
              }}
              animate={{
                x: ["all", "inperson", "hybrid", "online"].indexOf(eventType) * 87,
              }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1]
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
                ease: [0.4, 0, 0.2, 1]
              }}
            />

            {/* Sliding Gradient Border */}
            <motion.div
              className="absolute top-1 rounded-lg pointer-events-none"
              style={{
                height: "48px",
                width: "48px",
                borderRadius: "8px",
                background: "linear-gradient(to top, rgba(61, 131, 178, 1) 0%, rgba(26, 56, 76, 0) 100%)",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "xor",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                padding: "1.5px",
              }}
              animate={{
                x: ["list", "grid"].indexOf(viewMode) * 52,
              }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1]
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
                  color={viewMode === value ? "#FFFFFF" : "rgba(255, 255, 255, 0.7)"} 
                />
              </motion.button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-10 mt-10">
          {events.length > 0 &&
            events.filter((event: Events) => event.status !== 0)
            .filter((event: Events) => {
              if (eventType === "all") return true;
              if (!event.types || event.types.length === 0) return eventType === "online";
              
              // Handle hybrid filter - events with multiple types OR events specifically marked as hybrid
              if (eventType === "hybrid") {
                return event.types.length > 1 || event.types.some(type => type.toLowerCase().includes("hybrid"));
              }
              
              // Handle single type filters
              if (eventType === "inperson") {
                return event.types.length === 1 && event.types[0] === "In Person";
              }
              
              if (eventType === "online") {
                return event.types.length === 1 && event.types[0] === "Online";
              }
              
              return false;
            }).length === 0 && (
            <p className="text-2xl font-bold text-center">
              No events at this time
            </p>
          )}
          {events.length > 0 &&
            events.filter((event: Events) => event.status !== 0)
            .filter((event: Events) => {
              if (eventType === "all") return true;
              if (!event.types || event.types.length === 0) return eventType === "online";
              
              // Handle hybrid filter - events with multiple types OR events specifically marked as hybrid
              if (eventType === "hybrid") {
                return event.types.length > 1 || event.types.some(type => type.toLowerCase().includes("hybrid"));
              }
              
              // Handle single type filters
              if (eventType === "inperson") {
                return event.types.length === 1 && event.types[0] === "In Person";
              }
              
              if (eventType === "online") {
                return event.types.length === 1 && event.types[0] === "Online";
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
              if (!event.types || event.types.length === 0) return eventType === "online";
              
              // Handle hybrid filter - events with multiple types OR events specifically marked as hybrid
              if (eventType === "hybrid") {
                return event.types.length > 1 || event.types.some(type => type.toLowerCase().includes("hybrid"));
              }
              
              // Handle single type filters
              if (eventType === "inperson") {
                return event.types.length === 1 && event.types[0] === "In Person";
              }
              
              if (eventType === "online") {
                return event.types.length === 1 && event.types[0] === "Online";
              }
              
              return false;
            })
            .map((event) => (
              <div
                className="flex border-2 border-black rounded-xl p-4 gap-6 items-center"
                key={event.id}
              >
                <div className="w-70 h-70 bg-gray-200 flex items-center justify-center rounded-md border-2 border-black overflow-hidden">
                  <Image
                    src={
                      event.files && event.files.length > 0
                        ? event.files[0].url
                        : "https://placehold.co/400"
                    }
                    alt={event.name}
                    width={280}
                    height={280}
                    className="w-full h-full object-cover rounded-md"
                    priority={false}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />
                </div>
                <div className="flex-1 rounded-md p-4 flex flex-col justify-between min-h-[15rem]">
                  <div className="">
                    <div className="flex gap-2">
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
                    </div>

                    <h2 className="text-3xl font-patrick mt-2 mb-2">
                      {event.name}
                    </h2>
                    <p className="text-lg font-patrick mb-4">
                      {event.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <a href="#" className="underline font-patrick text-lg">
                      Discord - #event-stage channel
                    </a>
                    <span className="font-patrick text-lg">
                      January (Exact Date TBD)
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-4 ml-4">
                  <button className="bg-black text-white px-6 py-3 rounded-lg font-patrick text-xl">
                    Invitation Link
                  </button>
                  <button
                    className="border-2 border-black bg-white text-black px-6 py-3 rounded-lg font-patrick text-xl"
                    onClick={() => {
                      setSelectedEvent(event);
                      setIsModalOpen(true);
                    }}
                  >
                    See Details
                  </button>
                </div>
              </div>
            ))}
        </div>
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
