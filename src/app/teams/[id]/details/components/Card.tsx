import React from "react";

type Member = {
  imageUrl: string;
  name: string;
};

type CardProps = {
  member: Member;
  isMobile?: boolean;
};

const cards = [
  {
    className: "z-5 w-[330px] h-[510px]",
    style: {
      transform: "translateX(-610px) rotateY(100deg) translateZ(-100px)",
    },
  },
  {
    className: "z-5 w-[280px] h-[400px]",
    style: {
      transform: "translateX(-430px) rotateY(70deg) translateZ(-100px)",
    },
  },
  {
    className: "z-10 w-[250px] h-[330px]",
    style: { transform: "translateX(-260px) rotateY(23deg) translateZ(-50px)" },
  },
  {
    className: "z-10 w-[250px] h-[330px]",
    style: { transform: "translateX(260px) rotateY(-23deg) translateZ(-50px)" },
  },
  {
    className: "z-5 w-[280px] h-[400px]",
    style: {
      transform: "translateX(430px) rotateY(-70deg) translateZ(-100px)",
    },
  },
  {
    className: "z-5 w-[330px] h-[510px]",
    style: {
      transform: "translateX(610px) rotateY(-100deg) translateZ(-100px)",
    },
  },
];

const Card = ({ member, isMobile = false }: CardProps) => {
  // Don't render the 3D cards on mobile
  if (isMobile) {
    return null;
  }

  return (
    <>
      {cards.map((card, i) => (
        <div
          key={i}
          className={`absolute rounded-xl shadow-2xl ${card.className}`}
          style={{
            ...card.style,
            transition: "transform 0.3s ease",
          }}
        >
          <img
            src={member.imageUrl}
            alt={member.name}
            className="w-full h-full object-cover rounded-xl grayscale-100"
          />
        </div>
      ))}
    </>
  );
};

export default Card;