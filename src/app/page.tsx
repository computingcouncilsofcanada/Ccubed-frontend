"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";

type Card = {
  id: number;
  imgSrc: string;
  title: string;
  description: string;
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
  return (
    <div className="min-h-screen relative w-full px-2 md:px-0 overflow-hidden overflow-x-hidden">
      <BgBoxMainPage />
      <section className="hero w-full mx-auto max-w-4xl flex gap-2 flex-col md:flex-row items-center relative z-10">
        <div className="text w-full md:w-1/2 px-3 flex flex-col gap-4">
          <h1 className="text-white font-extrabold text-3xl">
            Connecting Canada’s computing students through community and events.
          </h1>
          <p className="text-white font-semibold">
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
              width={1000}
              height={1000}
              className="w-full h-auto"
            />
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ zIndex: 2 }}
            >
              <Image
                src="/FigmaFiles/mainPageAssets/hero-img-2.png"
                alt="Hero Image with Texture"
                width={1000}
                height={1000}
                className="w-full h-auto"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
      <section className="service  w-full mx-auto max-w-5xl flex flex-col gap-5 mt-20 relative z-10">
        <h1 className="text-white text-3xl font-bold">Services</h1>
        <p className="text-white font-thin w-7/10">
          We connect computing students across Canada through meaningful events
          and shared experiences. Our goal is to support student groups and
          foster a strong, inclusive tech community.
        </p>
        <div className="three-boxes grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 z-5 h-80">
          {cards.map(({ id, imgSrc, description, title }) => (
            <div
              className="px-4 py-4 bg-[#D4D4D4]/10 rounded-md flex flex-col gap-5 group transition-all duration-700 h-45 hover:h-80"
              key={id}
            >
              <div className=" flex justify-center items-center p-4  bg-[#D4D4D4]/30 rounded-md">
                <img src={imgSrc} alt="" className="translate-y-2" />
              </div>
              <div className="hidden flex-col gap-2 group-hover:flex transition-all duration-700 z-10">
                <h1 className="text-white font-bold text-2xl">{title}</h1>
                <p className="text-white font-thin text-sm">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="events  w-full max-w-5xl mx-auto mt-110 sm:mt-60 md:mt-15 flex flex-col gap-5 relative z-10">
        <h1 className="text-white text-3xl font-bold">Events</h1>
        <p className="text-white font-thin w-7/10">
          Join us for a variety of indoor and outdoor events that bring
          computing students together beyond the screen. Whether it's a casual
          meetup or a collaborative workshop, there's always a way to connect
          and grow.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <div className="h-80 ring-1 ring-[#9290C3] rounded-md bg-[#D4D4D4]/10"></div>
          <div className="h-80 ring-1 ring-[#9290C3] rounded-md bg-[#D4D4D4]/10"></div>
          <div className="h-80 ring-1 ring-[#9290C3] rounded-md bg-[#D4D4D4]/10"></div>
          <div className="h-80 ring-1 ring-[#9290C3] rounded-md bg-[#D4D4D4]/10"></div>
        </div>
      </section>
    </div>
  );
}
