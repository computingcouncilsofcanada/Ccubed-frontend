export const CardBorderGradient = ({
  gradientFormat,
  compositeType,
  padding,
  radius,
}: {
  gradientFormat: string;
  compositeType: string;
  padding: string;
  radius: string;
}) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${radius} z-70`}
      style={{
        background: gradientFormat,
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        maskComposite: compositeType,
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: compositeType,
        padding: padding,
      }}
    ></div>
  );
};
