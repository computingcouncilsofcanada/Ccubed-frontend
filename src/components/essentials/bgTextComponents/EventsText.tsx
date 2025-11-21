interface EventTextProps {
  eventTop1: number;
  eventTop2: number;
  eventHeight: number;
}

export const EventText = ({
  eventTop1,
  eventTop2,
  eventHeight,
}: EventTextProps) => {
  return (
    <>
      <div
        className="absolute overflow-hidden"
        style={{
          left: "calc(-50vw + 50%)",
          top: `${eventTop1}px`,
          width: "100vw",
          height: `${eventHeight}px`,
        }}
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

      <div
        className="absolute overflow-hidden"
        style={{
          left: "calc(-50vw + 50%)",
          top: `${eventTop2}px`,
          width: "100vw",
          height: `${eventHeight}px`,
        }}
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
    </>
  );
};
