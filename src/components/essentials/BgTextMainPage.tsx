"use client";
import React from "react";
import { VisionText } from "./bgTextComponents/VisionText";
import { EventText } from "./bgTextComponents/EventsText";
import { ValueSystemText } from "./bgTextComponents/ValueSystemText";

import {
  MV_CONTAINER_HEIGHT_PX,
  MV_CONTAINER_TOP_PX,
  EVENTS_CONTAINER_HEIGHT_PX,
  EVENTS_CONTAINER_TOP_PX_1,
  EVENTS_CONTAINER_TOP_PX_2,
  VS_CONTAINER_HEIGHT_PX,
  VS_CONTAINER_TOP_PX_1,
  VS_CONTAINER_TOP_PX_2,
} from "./bgTextComponents/Constants";

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
