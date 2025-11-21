"use client";
import React from "react";
import { VisionText } from "./bgTextComponents/VisionText";
import { EventText } from "./bgTextComponents/EventsText";
import { ValueSystemText } from "./bgTextComponents/ValueSystemText";

// Consistent static layout using fixed pixel values
const HEADER_HEIGHT_PX = 80; // Navbar/header height in pixels
const HERO_HEIGHT_PX = 360; // Hero section height in pixels
const MV_MARGIN_TOP_PX = 120; // Additional spacing before Mission/Vision
const MV_CONTAINER_TOP_PX =
  HEADER_HEIGHT_PX + HERO_HEIGHT_PX + MV_MARGIN_TOP_PX; // computed top
const MV_CONTAINER_HEIGHT_PX = 600; // Mission/Vision band height

const EVENTS_CONTAINER_TOP_PX_1 = 1150; // First Events band top
const EVENTS_CONTAINER_TOP_PX_2 = 1550; // Second Events band top
const EVENTS_CONTAINER_HEIGHT_PX = 900; // Events band height (both)

const VS_CONTAINER_TOP_PX_1 = 2300; // Value System first band
const VS_CONTAINER_TOP_PX_2 = 2650; // Value System second band
const VS_CONTAINER_HEIGHT_PX = 900; // Value System band height

const BgTextMainPage: React.FC = () => {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ width: "100%", zIndex: 1 }}
    >
      {/* Mission/Vision center word (fixed band) */}
      <VisionText
        visionTop={MV_CONTAINER_TOP_PX}
        visionHeight={MV_CONTAINER_HEIGHT_PX}
      />

      {/* Events section background texts (fixed bands) */}
      <EventText
        eventTop1={EVENTS_CONTAINER_TOP_PX_1}
        eventTop2={EVENTS_CONTAINER_TOP_PX_2}
        eventHeight={EVENTS_CONTAINER_HEIGHT_PX}
      />
      {/* Value System background texts (fixed bands) */}
      <ValueSystemText
        valueSystemTop1={VS_CONTAINER_TOP_PX_1}
        valueSystemTop2={VS_CONTAINER_TOP_PX_2}
        valueSystemHeight={VS_CONTAINER_HEIGHT_PX}
      />
    </div>
  );
};

export default BgTextMainPage;
