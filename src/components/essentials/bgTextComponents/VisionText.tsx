interface VisionTextProps {
  visionTop: number;
  visionHeight: number;
}

export const VisionText = ({
  visionTop,
  visionHeight,
}: VisionTextProps) => {
  return (
    <div
      className="absolute overflow-hidden"
      style={{
        left: 0,
        right: 0,
        top: `${visionTop + 80}px`,
        height: `${visionHeight}px`,
      }}
    >
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
  );
};
