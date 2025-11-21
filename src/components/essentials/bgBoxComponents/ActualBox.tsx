import Image from "next/image";
import { bgImagesType } from "../BgBoxMainPage";

export const ActualBox = ({ img }: { img: bgImagesType }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        zIndex: 2,
      }}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        style={{
          objectFit: "contain",
          userSelect: "none",
        }}
        draggable={false}
        unoptimized={img.src.endsWith(".png")}
      />
    </div>
  );
};
