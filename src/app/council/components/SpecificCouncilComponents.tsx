import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import { ArticleHeader } from "./SpecificCouncilArticleComponents";
import { ArticleBody } from "./SpecificCouncilArticleComponents";
import { CouncilSection } from "../types/types";
import { EventCard } from "@/components/shared/EventCard";
import { Events } from "@/types/events";
// import { privateAxios } from "@/lib/axios";
import { transformApiEvents } from "@/app/events/utils/eventsApi";
import Image from "next/image";
import { mockMembers } from "@/data/mockMembers";
import { mockEvents } from "@/data/mockEvents";
import TeamCard from "@/components/essentials/TeamCard";

type CouncilProps = {
  council: CouncilSection;
  setSelectedEvent?: (event: Events) => void;
  setIsModalOpen?: (isOpen: boolean) => void;
};

/**
 * ArticleSection Component
 * Displays the main article content with header and body
 */
export const ArticleSection = ({ council }: CouncilProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mb-32"
    >
      <ArticleHeader council={council} />
      <ArticleBody />
    </motion.div>
  );
};

/**
 * DescriptionSection Component
 * Shows council description text alongside an image carousel
 */
export const DescriptionSection = ({ council }: CouncilProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Get universities from the council data
  const universities = council.universities || [];
  const hasUniversities = universities.length > 0;

  const nextSlide = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % universities.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveIndex(
      (prev) => (prev - 1 + universities.length) % universities.length
    );
  };

  const goToSlide = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 1,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 1,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mb-24 px-4"
    >
      <div className="text-start mb-6">
        <h2
          className="text-[36px] font-extrabold leading-12 tracking-[0.01em] text-white mb-4"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Council Universities
        </h2>
      </div>
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="w-full md:w-1/2 shrink-0">
          {/* Display current university description if available */}
          {hasUniversities && (
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <h3
                className="text-white font-semibold text-[18px] mb-2"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                {universities[activeIndex].name}
              </h3>
              <p
                className="text-white/80 font-light text-[18px] leading-[1.5]"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                {universities[activeIndex].description}
              </p>
            </motion.div>
          )}
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center">
          {hasUniversities ? (
            <>
              <div className="relative md:mt-12 w-full max-w-[550px] md:h-[280px] h-[220px] overflow-hidden ">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 800, damping: 50 },
                      opacity: { duration: 0.15 },
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(_, { offset, velocity }) => {
                      const swipe = swipePower(offset.x, velocity.x);

                      if (swipe < -swipeConfidenceThreshold) {
                        nextSlide();
                      } else if (swipe > swipeConfidenceThreshold) {
                        prevSlide();
                      }
                    }}
                    className="absolute inset-0 flex items-center justify-center rounded-[20px] cursor-grab active:cursor-grabbing"
                  >
                    <img
                      src={universities[activeIndex].imageUrl}
                      alt={universities[activeIndex].name}
                      className="w-full h-full object-contain rounded-[20px] pointer-events-none select-none"
                      draggable={false}
                    />
                  </motion.div>
                </AnimatePresence>

                {universities.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 transition-colors px-3 py-1 md:px-4 md:py-2 rounded-full text-white text-lg md:text-xl font-bold z-10"
                      aria-label="Previous slide"
                    >
                      ‹
                    </button>

                    <button
                      onClick={nextSlide}
                      className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 transition-colors px-3 py-1 md:px-4 md:py-2 rounded-full text-white text-lg md:text-xl font-bold z-10"
                      aria-label="Next slide"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              {universities.length > 1 && (
                <div className="flex gap-2 mt-4">
                  {universities.map((_, idx) => (
                    <button
                      key={idx}
                      className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                        activeIndex === idx ? "bg-yellow-400" : "bg-gray-500"
                      }`}
                      onClick={() => goToSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="w-full max-w-[550px] md:h-[331px] h-[220px] flex items-center justify-center rounded-[20px] bg-[#D4D4D4]/10 backdrop-blur-sm border border-white/10">
              <p
                className="text-white/50 text-center px-6"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Partner universities coming soon
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
/**
 * EventsSection Component
 * Fetches and displays upcoming council events in a grid layout
 */
export const EventsSection = ({ council, setSelectedEvent, setIsModalOpen }: CouncilProps) => {
  const [councilEvents, setCouncilEvents] = useState<Events[]>([]);
  //   const [loading, setLoading] = useState(true);

  // Fetch events from backend
  useEffect(() => {
    // const fetchEvents = async () => {
    //   try {
    //     setLoading(true);
    //     const res = await privateAxios.get("/events");
    const transformedEvents = transformApiEvents(mockEvents);

    const mapDomainToCouncil = (domain: string) => {
      if (domain === "cybersecurity") return "Cybersecurity Council";
      if (domain === "ai") return "Artificial Intelligence Council";
      if (domain === "wit") return "Women In Tech Council";
      return domain; // fallback
    };

    const councilEvents = transformedEvents
      .map((event) => ({
        ...event,
        domains: (event.domains ?? []).map(mapDomainToCouncil),
      }))
      .filter((event) => {
        const events = event.domains && event.domains.includes(council.title);
        return events;
      })
      .slice(0, 4);

    setCouncilEvents(councilEvents);

    // Filter active events, get future events, sort by date (earliest first), and take only 4
    //     const now = new Date();
    //     const activeFutureEvents = transformedEvents
    //       .filter((event) => event.status !== 0)
    //       .filter((event) => new Date(event.date) > now)
    //       .sort((a, b) => {
    //         const dateA = new Date(a.date);
    //         const dateB = new Date(b.date);
    //         return dateA.getTime() - dateB.getTime(); // Earliest first
    //       })
    //       .slice(0, 4) // Take only 4 events
    //       .map((event) => ({ ...event, url: `/events/${event.id}` })); // Add missing url property
    //     setCouncilEvents(activeFutureEvents);
    //   } catch (error: unknown) {
    //     console.error("Error fetching events:", error);
    //     // Fallback to empty array
    //     setCouncilEvents([]);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
  }, [mockEvents]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mb-32"
    >
      <div className="text-start mb-6">
        <h2
          className="text-[36px] font-extrabold leading-12 tracking-[0.01em] text-white mb-4"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Council Events
        </h2>
        <p
          className="text-white font-light text-[18px] leading-[26px] tracking-[0.01em]"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Discover the range of events organized by our council in collaboration
          with partnered societies and universities. Each gathering reflects our
          shared goals of connection, growth, and engagement, offering unique
          experiences for our community.
        </p>
      </div>

      {/* Event Cards */}
      {councilEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {councilEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <EventCard
                id={event.id}
                title={event.name}
                time={event.time}
                date={event.date}
                location={event.location}
                type={(() => {
                  if (!event.types || event.types.length === 0) return "Online";
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
                onseeDetails={(event) => {
                  setSelectedEvent?.(event);
                  setIsModalOpen?.(true);
                }}
                onInvitationLink={() =>
                  console.log("Invitation link clicked for event:", event.id)
                }
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

/**
 * CouncilHero Component
 */
export const CouncilHero = ({ council }: CouncilProps) => {
  return (
    <section className="hero flex gap-4 flex-col-reverse md:flex-row items-center justify-start relative z-10 w-full mb-24 pt-8">
      <div className="text flex flex-col gap-4 flex-1 min-w-0 w-full">
        <h1
          className="text-white font-extrabold text-2xl sm:text-3xl md:text-2xl lg:text-5xl"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          {council.title}
        </h1>
        <p
          className="text-white sm:text-lg sm:leading-6 lg:text-xl lg:leading-7"
          style={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: "300",
            lineHeight: "22px",
            letterSpacing: "0%",
          }}
        >
          {council.shortDescription}
        </p>
      </div>

      {/* Council Icon (same as council card) */}
      <div className="image relative flex justify-center flex-shrink-0">
        <div className="relative w-[300px] h-[300px] md:w-[320px] md:h-[320px] lg:w-[480px] lg:h-[480px]">
          <Image
            src={council.icon}
            alt={`${council.title} icon`}
            width={405}
            height={405}
            className="w-full h-full object-contain select-none"
            priority
            quality={100}
            draggable={false}
            style={{ userSelect: "none" }}
          />
        </div>
      </div>
    </section>
  );
};

/**
 * RepresentativesSection Component
 * Same structure and design as the normal teams page; filtering logic stays council-specific.
 */
export const RepresentativesSection = ({ council }: CouncilProps) => {
  const members = React.useMemo(() => {
    const mapCouncilToSlug = (councilTitle: string) => {
      if (councilTitle.includes("Cybersecurity")) return "cybersecurity";
      if (
        councilTitle.includes("Artificial Intelligence") ||
        councilTitle.includes("Intelligence")
      )
        return "ai";
      if (councilTitle.includes("Women in Tech")) return "wit";
      return councilTitle.toLowerCase();
    };

    const councilSlug = mapCouncilToSlug(council.title);
    const seenNames: string[] = [];

    return mockMembers.flatMap((team) =>
      team.members.filter((member) => {
        const isCorrectCouncil = member.council === councilSlug;
        const isNewMember = !seenNames.includes(member.name);

        if (isCorrectCouncil && isNewMember) {
          seenNames.push(member.name);
          return true;
        }

        return false;
      })
    );
  }, [council.title]);

  return (
    <div className="mb-24 px-4 sm:px-6">
      <div className="text-start mb-6">
        <h2
          className="text-[36px] font-extrabold leading-12 tracking-[0.01em] text-white mb-4"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Council Representatives
        </h2>
        <p
          className="text-white font-light text-[18px] leading-[26px] tracking-[0.01em]"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Meet the key members of our council, including main directors and
          representatives from our partnered societies and clubs. Each profile
          offers a glimpse into their role and contribution, helping you get to
          know the people shaping our community.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-9 gap-y-17">
        {members.map((member) => (
          <TeamCard
            key={member.id}
            imageUrl={member.imageUrl}
            name={member.name}
            role={member.role}
            info={member.info}
            linkedin={member.social?.linkedin ?? ""}
          />
        ))}
      </div>

      {members.length === 0 && (
        <p className="text-white/70 text-center text-[16px] font-light">
          No council representatives to show yet.
        </p>
      )}
    </div>
  );
};
