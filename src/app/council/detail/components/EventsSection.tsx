import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EventCard } from "@/components/shared/EventCard";
import { Events } from "@/types/events";
import { privateAxios } from "@/lib/axios";
import { transformApiEvents } from "@/app/events/utils/eventsApi";

const EventsSection = () => {
  const [councilEvents, setCouncilEvents] = useState<Events[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await privateAxios.get("/events");
        const transformedEvents = transformApiEvents(res.data.data);
        
        // Filter active events, get future events, sort by date (earliest first), and take only 4
        const now = new Date();
        const activeFutureEvents = transformedEvents
          .filter((event: Events) => event.status !== 0)
          .filter((event: Events) => new Date(event.date) > now)
          .sort((a: Events, b: Events) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA.getTime() - dateB.getTime(); // Earliest first
          })
          .slice(0, 4); // Take only 4 events
        setCouncilEvents(activeFutureEvents);
      } catch (error: unknown) {
        console.error("Error fetching events:", error);
        // Fallback to empty array
        setCouncilEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-32"
    >
      <div className="text-start mb-6">
        <h2
          className="text-[36px] font-extrabold leading-[48px] tracking-[0.01em] text-white mb-4"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Council Events
        </h2>
        <p
          className="text-white font-light text-[18px] leading-[26px] w-[845px] tracking-[0.01em]"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Discover the range of events organized by our council in collaboration
          with partnered societies and universities. Each gathering reflects our
          shared goals of connection, growth, and engagement, offering unique
          experiences for our community.
        </p>
      </div>

      {/* Event Cards */}
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="text-white text-lg">Loading events...</div>
        </div>
      ) : councilEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {councilEvents.map((event) => (
            <motion.div
              key={event.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <EventCard
                id={event.id}
                title={event.name}
                time={event.time}
                date={event.date}
                location={event.location}
                type={(() => {
                  if (!event.types || event.types.length === 0) return "Online";

                  const hasHybridType = event.types.some(
                    (type) =>
                      type.toLowerCase() === "hybrid" ||
                      type.toLowerCase().includes("hybrid")
                  );
                  if (event.types.length > 1 || hasHybridType) return "Hybrid";

                  const eventType = event.types[0];
                  if (eventType === "In Person") return "In Person";
                  if (eventType === "Online") return "Online";

                  return "Online";
                })()}
                imageSrc={
                  event.files && event.files.length > 0
                    ? event.files[0].url
                    : "https://placehold.co/400"
                }
                description={event.description}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-white text-lg mb-2">No events available</div>
          <div className="text-white/70 text-sm">
            Check back soon for upcoming council events!
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default EventsSection;
