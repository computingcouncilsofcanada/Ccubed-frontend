// This is the events Page

"use client";

import { useEffect, useState, useContext, createContext } from "react";
import publicAxios from "@/middleware/axiosPublic"; //importing Public Axios

type Events = {
  id: number;
  title: string;
  date: string;
  created_at: string;
  updated_at: string;
  scheduled: string;
  status: string;
  images: string;
};

export default function DummyPage() {
  const [events, setEvents] = useState<Events[]>([]); // state for storing events

  useEffect(() => {
    publicAxios
      .get("/events")
      .then((res) => {
        setEvents(res.data.events);
        console.log(res);
        console.log(res.status);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // Fetching the events once at component mount

  return (
    <div>
      <h1 className="text-center">Events</h1>
      <ul className="mt-10  px-6  grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-15">
        {events.map(
          (
            event // mapping over each event
          ) => (
            <ul key={event.id} className="border-2  border-amber-600">
              <li>{event.id}</li>
              <li>{event.title}</li>
              <li>{event.date}</li>
              <li>{event.created_at}</li>
              <li>{event.updated_at}</li>
              <li>{event.scheduled}</li>
              <li>{event.status}</li>
              <li>{event.images}</li>
            </ul>
          )
        )}
      </ul>
    </div>
  );
}
