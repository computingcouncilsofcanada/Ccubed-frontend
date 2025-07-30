"use client";

import { useEffect, useState } from "react";
import { privateAxios } from "@/lib/axios"; //importing Public Axios
import PreviewModal from "@/components/modals/PreviewModal";
import { getAllEvents } from "@/services/useApiAuth";

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

export default function EventsPage() {
  const [events, setEvents] = useState<Events[]>([]);
  const [error, setError] = useState<string>("");
  const [eventType, setEventType] = useState<string>("all");
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
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []); // Fetching the events once at component mount

  return (
    <div className="min-h-screen bg-foreground text-background">
      <div className="max-w-6xl w-full mx-auto py-10 font-patrick px-5">
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
        <div className="flex justify-between items-center  mt-7">
          <div className="flex gap-6 ">
            {[
              { label: "All Events", value: "all" },
              { label: "In person", value: "inperson" },
              { label: "Discord", value: "discord" },
              { label: "Online", value: "online" },
            ].map((option) => (
              <label
                key={option.value}
                className={`px-6 py-1 rounded-lg border-2 font-patrick text-xl cursor-pointer transition-colors duration-150
            ${
              eventType === option.value
                ? "bg-black text-white border-black"
                : "bg-white text-black border-black"
            }
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
          <button className="px-6 py-1 rounded-lg border-2 font-patrick text-xl cursor-pointer  bg-white text-black border-black">
            Past - Upcoming
          </button>
        </div>

        <div className="flex flex-col gap-10 mt-10">
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
            }).length === 0 && (
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
                className="flex border-2 border-black rounded-xl p-4 gap-6 items-center"
                key={event.id}
              >
                <div className="w-70 h-70 bg-gray-200 flex items-center justify-center rounded-md border-2 border-black">
                  <img
                    src={
                      event.files && event.files.length > 0
                        ? event.files[0].url
                        : "https://placehold.co/400"
                    }
                    className="w-full h-full object-cover rounded-md"
                    alt={event.name}
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
