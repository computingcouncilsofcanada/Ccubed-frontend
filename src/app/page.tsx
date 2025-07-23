"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import EventCard from "@/components/ui/EventCard";
import ServiceCard from "@/components/ui/ServiceCard";
import KeyBenefits from "@/components/sections/KeyBenefits";
import JoinOurTeam from "@/components/sections/JoinOurTeam";
// import { privateAxios } from "@/lib/axios";
import { mockEvents } from "@/data/mockEvents";

type FileObject = {
  id: number;
  name: string;
  url: string;
};

type Card = {
  id: number;
  imgSrc: string;
  title: string;
  description: string;
};

type Events = {
  id: number;
  name: string;
  description: string;
  status: number;
  date: string;
  time: string;
  location: string;
  images: string;
  files: FileObject[];
  types: string[];
};

const cards: Card[] = [
  {
    id: 1,
    imgSrc: "/FigmaFiles/serviceIcons/Discord.png",
    title: "Discord Events",
    description:
      "Join our Discord to stay updated on upcoming events, meet fellow computing students, and be part of the conversation. From casual chats to national collabs — it all starts here.",
  },
  {
    id: 2,
    imgSrc: "/FigmaFiles/serviceIcons/maps.png",
    title: "Online Events",
    description:
      "Connect from anywhere and join our online events — workshops, panels, game nights, and more! Learn, network, and have fun with computing students across Canada.",
  },
  {
    id: 3,
    imgSrc: "/FigmaFiles/serviceIcons/Checklist.png",
    title: "Resume Review",
    description:
      "Get personalized feedback on your resume from industry professionals and experienced peers. Boost your chances and stand out in your next application.",
  },
];
export default function Home() {
  const [eventType, setEventType] = useState<string>("all");
  const [events, setEvents] = useState<Events[]>([]);
  // const [error, setError] = useState<string>("");

  useEffect(() => {
    // Using mock data instead of API call for testing
    setEvents(mockEvents);
    
    // Original API call (commented out for testing)
    // privateAxios
    //   .get("/events")
    //   .then((res) => {
    //     setEvents(res.data.data);
    //   })
    //   .catch((error) => {
    //     setError(error.response.data.message);
    //   });
  }, []);

  return (
    <div className="min-h-screen relative w-full overflow-hidden overflow-x-hidden">
      {/* Background text pattern for glassmorphism testing */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="text-white text-8xl font-bold transform rotate-12 absolute top-20 left-10">
          CCubed
        </div>
        <div className="text-white text-8xl font-light transform -rotate-6 absolute top-40 right-20">
          Computing
        </div>
        <div className="text-white text-8xl font-bold transform rotate-45 absolute bottom-40 left-1/4">
          Community
        </div>
        <div className="text-white text-8xl transform -rotate-12 absolute bottom-20 right-1/3">
          Events
        </div>
        <div className="text-white text-9xl font-bold transform rotate-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          C³
        </div>
        <div className="text-white text-8xl font-medium transform rotate-24 absolute top-32 left-1/3">
          Canada
        </div>
        <div className="text-white text-8xl font-light transform -rotate-18 absolute bottom-32 right-10">
          Students
        </div>
      </div>
      <BgBoxMainPage />
      {/* Page Container - unified width control */}
      <div className="container mx-auto max-w-6xl">
        <section className="hero flex gap-2 flex-col md:flex-row items-center relative z-10">
          <div className="text w-full md:w-1/2 px-5 flex flex-col gap-4">
            <h1 className="text-white font-extrabold text-4xl">
              Connecting Canada’s computing students through community and
              events.
            </h1>
            <p className="text-white font-light">
              To connect and support students through engaging events while
              building community amongst Canadian computing student groups. 
            </p>
            <div className="flex  items-center gap-3">
              <a
                href=""
                className="p-2 border-1 border-[#FAA336] bg-[#FAA336] rounded-lg"
              >
                Get Started
              </a>
              <a
                href=""
                className="p-2 rounded-lg text-white border-1 border-white "
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="image w-full md:w-1/2 relative">
            <motion.div className="relative w-full h-auto">
              <Image
                src="/FigmaFiles/mainPageAssets/hero-img.svg"
                alt="Hero Image"
                width={500}
                height={500}
                className="w-full h-auto"
                priority
              />
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
                  width={500}
                  height={500}
                  className="w-full h-auto"
                  priority
                />
              </motion.div>
            </motion.div>
          </div>
        </section>
        <section
          className="service relative z-10"
          style={{ marginTop: "-60px" }}
        >
          <div
            className="flex gap-3 items-end justify-start mb-4"
            style={{
              width: "706px",
              height: "214px",
              marginLeft: "0",
            }}
          >
            <h1 className="text-white text-4xl font-extrabold">Services</h1>
            <motion.div className="relative" style={{ marginLeft: "-40px" }}>
              <Image
                src="/FigmaFiles/mainPageAssets/small-breathe-logo.svg"
                alt="Breathe Logo"
                width={143}
                height={210}
                priority
              />
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
                  src="/FigmaFiles/mainPageAssets/small-breathe-logo-2.svg"
                  alt="Breathe Logo Animated"
                  width={143}
                  height={210}
                  priority
                />
              </motion.div>
            </motion.div>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-white font-thin">
              We connect computing students across Canada through meaningful
              events and shared experiences. Our goal is to support student
              groups and foster a strong, inclusive tech community.
            </p>
            <div
              className="three-boxes grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
              style={{ minHeight: "320px" }}
            >
              {cards.map(({ id, description, title }) => (
                <div
                  key={id}
                  className="flex justify-center items-start h-[320px]"
                >
                  <ServiceCard
                    id={id}
                    title={title}
                    description={description}
                    serviceType={
                      id === 2 ? "map" : id === 3 ? "resume" : undefined
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          className="events relative z-10"
          style={{ marginTop: "-40px" }}
        >
          <div
            className="flex gap-3 items-end justify-center mb-4 mx-auto"
            style={{
              width: "706px",
              height: "214px",
            }}
          >
            <h1 className="text-white text-4xl font-extrabold">Events</h1>
            <motion.div className="relative" style={{ marginLeft: "-40px" }}>
              <Image
                src="/FigmaFiles/mainPageAssets/small-breathe-logo.svg"
                alt="Breathe Logo"
                width={143}
                height={210}
                priority
              />
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
                  src="/FigmaFiles/mainPageAssets/small-breathe-logo-2.svg"
                  alt="Breathe Logo Animated"
                  width={143}
                  height={210}
                  priority
                />
              </motion.div>
            </motion.div>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-white font-thin w-full text-center px-50">
              Join us for a variety of indoor and outdoor events that bring
              computing students together beyond the screen. Whether it&apos;s a
              casual meetup or a collaborative workshop, there&apos;s always a
              way to connect and grow.
            </p>
            <div
              className="flex gap-1 rounded-lg p-1 bg-[#0B161E]"
              style={{ width: "352px", height: "56px" }}
            >
              {[
                { label: "All Events", value: "all" },
                { label: "In Person", value: "inperson" },
                { label: "Hybrid", value: "hybrid" },
                { label: "Online", value: "online" },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center justify-center flex-1 rounded-lg cursor-pointer transition-colors duration-150 text-white relative overflow-hidden
          `}
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "16px",
                    fontWeight: eventType === option.value ? "400" : "300",
                    letterSpacing: "1%",
                    backgroundColor:
                      eventType === option.value
                        ? "rgba(19, 40, 54, 0.6)"
                        : "transparent",
                  }}
                >
                  {/* Gradient border for selected state */}
                  {eventType === option.value && (
                    <div
                      className="absolute inset-0 rounded-lg pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(61, 131, 178, 1) 0%, rgba(26, 56, 76, 0) 100%)",
                        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        maskComposite: "xor",
                        WebkitMask:
                          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        padding: "1.5px",
                      }}
                    />
                  )}
                  <input
                    type="radio"
                    name="eventType"
                    value={option.value}
                    checked={eventType === option.value}
                    onChange={() => setEventType(option.value)}
                    className="hidden"
                  />
                  <span className="relative z-10">{option.label}</span>
                </label>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-2 justify-items-center">
              {events.filter((event: Events) => event.status !== 0).length ===
                0 && (
                <p className="text-2xl font-bold text-center col-span-full">
                  No events at this time
                </p>
              )}
              {events
                .filter((event: Events) => event.status !== 0)
                .filter((event: Events) => {
                  if (eventType === "all") return true;
                  if (!event.types || event.types.length === 0) return false;
                  const eventTypeValue = event.types[0].toLowerCase();
                  return (
                    eventTypeValue === eventType ||
                    (eventType === "inperson" &&
                      eventTypeValue === "in person") ||
                    (eventType === "hybrid" && eventTypeValue === "hybrid") ||
                    (eventType === "online" && eventTypeValue === "online")
                  );
                })
                .map((event) => (
                  <EventCard
                    key={event.id}
                    id={event.id}
                    title={event.name}
                    time={event.time}
                    date={event.date}
                    location={event.location}
                    type={
                      event.types && event.types.length > 0
                        ? event.types[0] === "In person"
                          ? "In Person"
                          : event.types[0] === "Hybrid"
                          ? "Hybrid"
                          : "Online"
                        : "Online"
                    }
                    imageSrc={
                      event.files && event.files.length > 0
                        ? event.files[0].url
                        : "https://placehold.co/400"
                    }
                    description={event.description}
                  />
                ))}
            </div>

            {/* See More Button */}
            <div className="flex justify-center">
              <button
                className="border border-white rounded-lg"
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
              >
                See more
              </button>
            </div>
          </div>
        </section>

        <KeyBenefits />
        
        <JoinOurTeam />
      </div>{" "}
      {/* End of page container */}
    </div>
  );
}
