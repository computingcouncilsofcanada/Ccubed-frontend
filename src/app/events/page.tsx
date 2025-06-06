/**
 * Events Page Component
 *
 * This page displays a list of events fetched from the backend API.
 * It handles both successful data fetching and error states.
 * The events are displayed in a responsive grid layout.
 */

"use client";

import { useEffect, useState, useContext, createContext } from "react";
import { privateAxios, publicAxios, publicAxiosLocal } from "@/lib/axios"; //importing Public Axios

/**
 * Event Type Definition
 *
 * @property {number} id - Unique identifier for the event
 * @property {string} name - Name of the event
 * @property {string} description - Detailed description of the event
 * @property {string} date - Date when the event will occur
 * @property {string} time - Time when the event will occur
 * @property {string} location - Venue or location of the event
 * @property {string} images - URL or path to event images
 */
type Events = {
  id: number;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  images: string;
};

/**
 * Events Page Component
 *
 * This component:
 * 1. Fetches events data from the backend API on component mount
 * 2. Manages loading and error states
 * 3. Displays events in a responsive grid layout
 * 4. Handles error display if the API request fails
 */
export default function DummyPage() {
  // State for storing the list of events
  const [events, setEvents] = useState<Events[]>([]);
  // State for storing any error messages
  const [error, setError] = useState<string>("");

  // Fetch events data when component mounts
  useEffect(() => {
    privateAxios
      .get("/events")
      .then((res) => {
        setEvents(res.data.data);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }, []); // Fetching the events once at component mount

  return (
    <div>
      {error ? (
        // Display error message if API request fails
        <p className="text-red-500 text-3xl text-center mt-20">{error}</p>
      ) : (
        <>
          <h1 className="text-center">Events</h1>
          {/* Responsive grid layout for events */}
          <ul className="mt-10  px-6  grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-15">
            {events.map((event) => (
              // Individual event card
              <ul key={event.id} className="border-2  border-amber-600">
                <li>{event.id}</li>
                <li>{event.name}</li>
                <li>{event.description}</li>
                <li>{event.date}</li>
                <li>{event.time}</li>
                <li>{event.location}</li>
                <li>{event.images}</li>
              </ul>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
