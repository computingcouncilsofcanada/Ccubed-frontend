"use client";
import React from "react";

// Consistent static layout (no DOM measuring). Adjust the vh constants below to tune spacing.
// Header + Hero + extra margin compose the Mission/Vision band top
const HEADER_HEIGHT_VH = 8;        // Navbar/header approximate height
const HERO_HEIGHT_VH = 36;         // Hero section approximate height
const MV_MARGIN_TOP_VH = 12;       // Additional spacing before Mission/Vision
const MV_CONTAINER_TOP_VH = HEADER_HEIGHT_VH + HERO_HEIGHT_VH + MV_MARGIN_TOP_VH; // computed top
const MV_CONTAINER_HEIGHT_VH = 60; // Mission/Vision band height

const EVENTS_CONTAINER_TOP_VH_1 = 115; // First Events band top
const EVENTS_CONTAINER_TOP_VH_2 = 155; // Second Events band top
const EVENTS_CONTAINER_HEIGHT_VH = 90;  // Events band height (both)

const VS_CONTAINER_TOP_VH_1 = 230; // Value System first band
const VS_CONTAINER_TOP_VH_2 = 265; // Value System second band
const VS_CONTAINER_HEIGHT_VH = 90;  // Value System band height

const BgTextMainPage: React.FC = () => {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ width: "100%", zIndex: 1 }}
    >
      {/* Mission/Vision center word (fixed band) */}
      <div className="absolute overflow-hidden" style={{ left: 0, right: 0, top: `${MV_CONTAINER_TOP_VH + 8}vh`, height: `${MV_CONTAINER_HEIGHT_VH}vh` }}>
        <span
          className="text-white select-none"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "400px",
            fontFamily: "Roboto, sans-serif",
            fontWeight: 900,
            opacity: 0.08,
            letterSpacing: "0em",
            whiteSpace: "nowrap",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.2) 50%, transparent 65%)",
            maskImage:
              "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.2) 50%, transparent 65%)",
          }}
        >
          Vision
        </span>
      </div>

      {/* Events section background texts (fixed bands) */}
      <div className="absolute overflow-hidden"
        style={{ left: "calc(-50vw + 50%)", top: `${EVENTS_CONTAINER_TOP_VH_1}vh`, width: "100vw", height: `${EVENTS_CONTAINER_HEIGHT_VH}vh` }}
      >
        <span
          className="text-white select-none absolute inset-0 flex items-center justify-start"
          style={{
            fontSize: "350px",
            fontFamily: "Roboto, sans-serif",
            fontWeight: 900,
            opacity: 0.12,
            letterSpacing: "0em",
            whiteSpace: "nowrap",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 25%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 20%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 60%, transparent 75%)",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 25%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 20%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 60%, transparent 75%)",
          }}
        >
          Events
        </span>
      </div>

      <div className="absolute overflow-hidden"
        style={{ left: "calc(-50vw + 50%)", top: `${EVENTS_CONTAINER_TOP_VH_2}vh`, width: "100vw", height: `${EVENTS_CONTAINER_HEIGHT_VH}vh` }}
      >
        <span
          className="text-white select-none absolute inset-0 flex items-center justify-end pr-8"
          style={{
            fontSize: "350px",
            fontFamily: "Roboto, sans-serif",
            fontWeight: 900,
            opacity: 0.05,
            letterSpacing: "0em",
            whiteSpace: "nowrap",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 75% 60%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.1) 50%, transparent 70%)",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 75% 60%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.1) 50%, transparent 70%)",
          }}
        >
          Events
        </span>
      </div>

      {/* Value System background texts (fixed bands) */}
      <div className="absolute overflow-hidden"
        style={{ left: "calc(-50vw + 50%)", top: `${VS_CONTAINER_TOP_VH_2}vh`, width: "100vw", height: `${VS_CONTAINER_HEIGHT_VH}vh` }}
      >
        <div
          className="text-white select-none absolute inset-0 flex items-center justify-start"
          style={{
            fontSize: "130px",
            fontFamily: "Roboto, sans-serif",
            fontWeight: 900,
            opacity: 0.04,
            letterSpacing: "0em",
            lineHeight: 1.2,
            WebkitMaskImage:
              "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 10%, rgba(0,0,0,0.3) 18%, rgba(0,0,0,0.1) 22%, transparent 25%)",
            maskImage:
              "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 10%, rgba(0,0,0,0.3) 18%, rgba(0,0,0,0.1) 22%, transparent 25%)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <div>Key</div>
            <div>Benefit</div>
            <div>of Our</div>
            <div>System</div>
          </div>
        </div>
      </div>

      <div className="absolute overflow-hidden"
        style={{ left: "calc(-50vw + 50%)", top: `${VS_CONTAINER_TOP_VH_1}vh`, width: "100vw", height: `${VS_CONTAINER_HEIGHT_VH}vh` }}
      >
        <div
          className="text-white select-none absolute inset-0 flex items-center justify-start"
          style={{
            fontSize: "130px",
            fontFamily: "Roboto, sans-serif",
            fontWeight: 900,
            opacity: 0.04,
            letterSpacing: "0em",
            lineHeight: 1.2,
            transform: "rotate(180deg)",
            WebkitMaskImage:
              "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 8%, rgba(0,0,0,0.2) 15%, rgba(0,0,0,0.05) 18%, transparent 20%)",
            maskImage:
              "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 8%, rgba(0,0,0,0.2) 15%, rgba(0,0,0,0.05) 18%, transparent 20%)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left" }}>
            <div>Key</div>
            <div>Benefit</div>
            <div>of Our</div>
            <div>System</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BgTextMainPage;


