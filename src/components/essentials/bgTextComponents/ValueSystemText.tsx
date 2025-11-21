interface ValueSystemTextProps {
  valueSystemTop1: number;
  valueSystemTop2: number;
  valueSystemHeight: number;
}

export const ValueSystemText = ({
  valueSystemTop1,
  valueSystemTop2,
  valueSystemHeight,
}: ValueSystemTextProps) => {
  return (
    <>
      <div
        className="absolute overflow-hidden"
        style={{
          left: "calc(-50vw + 50%)",
          top: `${valueSystemTop2}px`,
          width: "100vw",
          height: `${valueSystemHeight}px`,
        }}
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div>Key</div>
            <div>Benefit</div>
            <div>of Our</div>
            <div>System</div>
          </div>
        </div>
      </div>

      <div
        className="absolute overflow-hidden"
        style={{
          left: "calc(-50vw + 50%)",
          top: `${valueSystemTop1}px`,
          width: "100vw",
          height: `${valueSystemHeight}px`,
        }}
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              textAlign: "left",
            }}
          >
            <div>Key</div>
            <div>Benefit</div>
            <div>of Our</div>
            <div>System</div>
          </div>
        </div>
      </div>
    </>
  );
};
