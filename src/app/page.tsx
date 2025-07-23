"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import Events from "@/components/sections/landing/Events";
import Services from "@/components/sections/landing/Services";
import KeyBenefits from "@/components/sections/landing/KeyBenefits";
import JoinOurTeam from "@/components/sections/landing/JoinOurTeam";
// import { privateAxios } from "@/lib/axios";
import { mockEvents } from "@/data/mockEvents";

type FileObject = {
  id: number;
  name: string;
  url: string;
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

export default function Home() {
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
      <BgBoxMainPage />
      {/* Page Container - unified width control */}
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <section className="hero flex gap-2 flex-col md:flex-row items-center relative z-10">
          <div className="text w-full md:w-1/2 px-5 flex flex-col gap-4">
            <h1 className="text-white font-extrabold text-4xl">
              Connecting Canada&apos;s computing students through community and
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

        {/* Services Section */}
        <Services />

        {/* Events Section */}
        <Events events={events} />

        {/* Key Benefits Section */}
        <KeyBenefits />
        
        {/* Join Our Team Section */}
        <JoinOurTeam />
      </div>
    </div>
  );
}
