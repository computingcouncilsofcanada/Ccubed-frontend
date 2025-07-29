"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import { privateAxios } from "@/lib/axios";
import { getAllEvents } from "@/services/useApiAuth";

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
  const [error, setError] = useState<string>("");

  const fetchEvents = async () => {
    try {
      const offset = 0;
      const limit =0;
      const res = await getAllEvents(limit, offset);
      setEvents(res.data);
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen relative w-full px-2 md:px-0 overflow-hidden overflow-x-hidden">
      <BgBoxMainPage />
      <section className="hero w-full mx-auto max-w-4xl flex gap-2 flex-col md:flex-row items-center relative z-10">
        <div className="text w-full md:w-1/2 px-5 flex flex-col gap-4">
          <h1 className="text-white font-extrabold text-4xl">
            Connecting Canada’s computing students through community and events.
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
              src="/FigmaFiles/mainPageAssets/hero-img.png"
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
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/FigmaFiles/mainPageAssets/hero-img-2.png"
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
      <section className="service px-5  w-full mx-auto max-w-5xl flex flex-col gap-5 mt-20 relative z-10">
        <div className="flex gap-3 items-center">
          <h1 className="text-white text-4xl font-extrabold">Services</h1>
          <Image
            src="/FigmaFiles/ccubed-icon.svg"
            alt="CCubed Logo"
            width={45}
            height={45}
            priority
          />
        </div>
        <p className="text-white font-thin w-7/10">
          We connect computing students across Canada through meaningful events
          and shared experiences. Our goal is to support student groups and
          foster a strong, inclusive tech community.
        </p>
        <div className="three-boxes grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 z-5 h-80">
          {cards.map(({ id, imgSrc, description, title }) => (
            <div
              className="px-4 py-4 bg-[#D4D4D4]/10 rounded-md flex flex-col gap-5 group transition-all duration-700 h-35 hover:h-70 shadow-2xl"
              key={id}
            >
              <div className=" flex justify-center items-center p-4  bg-[#D4D4D4]/30 rounded-md">
                <Image
                  src={imgSrc}
                  alt={title}
                  width={64}
                  height={64}
                  className="translate-y-2"
                />
              </div>
              <div className="hidden group-hover:flex-col gap-2 group-hover:flex transition-all duration-700 z-10">
                <h1 className="text-white font-bold text-2xl">{title}</h1>
                <p className="text-white font-thin text-sm">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="px-5 events  w-full max-w-5xl mx-auto mt-110 sm:mt-60 md:mt-10 flex flex-col gap-5 relative z-10">
        <div className="flex gap-3 items-center justify-center">
          <h1 className="text-white text-4xl font-extrabold">Events</h1>

          <Image
            src="/FigmaFiles/ccubed-icon.svg"
            alt="CCubed Logo"
            width={45}
            height={45}
            priority
          />
        </div>
        <p className="text-white font-thin w-full text-center px-30">
          Join us for a variety of indoor and outdoor events that bring
          computing students together beyond the screen. Whether it's a casual
          meetup or a collaborative workshop, there's always a way to connect
          and grow.
        </p>
        <div className="flex gap-1 rounded-lg p-1 w-fit bg-[#0B161E] ">
          {[
            { label: "All Events", value: "all" },
            { label: "In person", value: "inperson" },
            { label: "Discord", value: "discord" },
            { label: "Online", value: "online" },
          ].map((option) => (
            <label
              key={option.value}
              className={`px-5 py-3 rounded-lg text-xl cursor-pointer transition-colors duration-150 text-white
            ${eventType === option.value ? "bg-[#132836] " : " "}
          `}
            >
              <input
                type="radio"
                name="eventType"
                value={option.value}
                checked={eventType === option.value}
                onChange={() => setEventType(option.value)}
                className="hidden"
              />
              {option.label}
            </label>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {events.filter((event: Events) => event.status !== 0).length ===
            0 && (
            <p className="text-2xl font-bold text-center">
              No events at this time
            </p>
          )}
             {events.length > 0 &&
            events.filter((event: Events) => {
              if (event.status === 0) return false;
              if (eventType === "all") return true;
              if (event.types.length > 0) {
                const eventTypes = event.types.map((t) =>
                  t.split(" ").join("").toLowerCase()
                );
                return eventTypes.includes(eventType.toLowerCase());
              }
              return false;
            }).length === 0 &&
            eventType !== "all" && (
              <p className="text-2xl font-bold text-center">
                No events found for this category
              </p>
            )}
          {events
            .filter((event: Events) => {
              if (event.status === 0) return false;
              if (eventType === "all") return true;
              if (event.types.length > 0) {
                const eventTypes = event.types.map((t) =>
                  t.split(" ").join("").toLowerCase()
                );
      
                return eventTypes.includes(eventType.toLowerCase());
              }
            })
            .map((event) => (
              <div
                className="h-80 p-2 shadow-lg rounded-lg flex flex-col gap-2 bg-[#D4D4D4]/10"
                key={event.name}
              >
                <div className=" relative w-full h-50  flex items-center justify-center rounded-md  ">
                  <img
                    src={
                      event.files && event.files.length > 0
                        ? event.files[0].url
                        : "https://placehold.co/400"
                    }
                    className="w-full h-full object-cover rounded-md"
                    alt={event.name}
                  />
                  <div className="absolute top-2 right-2 flex flex-col gap-2 ">
                    {event.types &&
                      event.types.length > 0 &&
                      event.types.map((type, id) => (
                        <span
                          key={type + id}
                          className="border-2 px-1 border-gray-200 rounded-full text-white"
                        >
                          {type}
                        </span>
                      ))}
                  </div>
                </div>
                <h1 className="text-xl font-bold text-white">{event.name}</h1>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
