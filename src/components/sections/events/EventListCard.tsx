import Image from "next/image";
import { Events } from "@/types/events";
import { useState } from "react";

type EventListCardProps = {
  event: Events;
  onSeeDetails: (event: Events) => void;
  onInvitationLink: () => void;
};

export function EventListCard({ 
  event, 
  onSeeDetails, 
  onInvitationLink 
}: EventListCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  function getOrdinalSuffix(num: string) {
    const n = parseInt(num, 10);
    const lastDigit = n % 10;
    const lastTwo = n % 100;
  
    if (lastTwo >= 11 && lastTwo <= 13) return "th";
  
    if (lastDigit === 1) return "st";
    if (lastDigit === 2) return "nd";
    if (lastDigit === 3) return "rd";
    return "th";
  }

  const zigzagClipPath = "polygon(0% 0%, 1% 2%, 0% 4%, 1% 6%, 0% 8%, 1% 10%, 0% 12%, 1% 14%, 0% 16%, 1% 18%, 0% 20%, 1% 22%, 0% 24%, 1% 26%, 0% 28%, 1% 30%, 0% 32%, 1% 34%, 0% 36%, 1% 38%, 0% 40%, 1% 42%, 0% 44%, 1% 46%, 0% 48%, 1% 50%, 0% 52%, 1% 54%, 0% 56%, 1% 58%, 0% 60%, 1% 62%, 0% 64%, 1% 66%, 0% 68%, 1% 70%, 0% 72%, 1% 74%, 0% 76%, 1% 78%, 0% 80%, 1% 82%, 0% 84%, 1% 86%, 0% 88%, 1% 90%, 0% 92%, 1% 94%, 0% 96%, 1% 98%, 0% 100%, 100% 100%, 99% 98%, 100% 96%, 99% 94%, 100% 92%, 99% 90%, 100% 88%, 99% 86%, 100% 84%, 99% 82%, 100% 80%, 99% 78%, 100% 76%, 99% 74%, 100% 72%, 99% 70%, 100% 68%, 99% 66%, 100% 64%, 99% 62%, 100% 60%, 99% 58%, 100% 56%, 99% 54%, 100% 52%, 99% 50%, 100% 48%, 99% 46%, 100% 44%, 99% 42%, 100% 40%, 99% 38%, 100% 36%, 99% 34%, 100% 32%, 99% 30%, 100% 28%, 99% 26%, 100% 24%, 99% 22%, 100% 20%, 99% 18%, 100% 16%, 99% 14%, 100% 12%, 99% 10%, 100% 8%, 99% 6%, 100% 4%, 99% 2%, 100% 0%)";

  return (
    <div
      className={`flex text-white group bg-[#D4D4D4]/10 backdrop-blur-sm shadow-xl relative overflow-hidden transition-all duration-300 w-full max-w-[1144px] h-[234px] ${isHovered ? '' : 'rounded-lg'}`}
      key={event.id + "-list"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        clipPath: isHovered ? zigzagClipPath : 'none'
      }}
    >
      {/* Date section */}
      <div 
        className="flex items-start justify-start relative z-10 transition-all duration-300" 
        style={{
          paddingLeft: isHovered ? '32px' : '24px',
          paddingTop: isHovered ? '16px' : '24px',
          paddingBottom: isHovered ? '16px' : '24px',
          paddingRight: isHovered ? '32px' : '24px'
        }}
      >
        <div className="flex flex-col items-center text-center -space-y-1">
          <span 
            className="text-white font-bold transition-all duration-300"
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: isHovered ? '48px' : '32px',
              lineHeight: 'auto',
              letterSpacing: '0%'
            }}
          >
            {formatDate(event.date).split(" ")[1].split("")[0]}{getOrdinalSuffix(formatDate(event.date).split(" ")[1].split("")[0])}
          </span>
          <span 
            className="text-white font-light transition-all duration-300"
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: isHovered ? '16px' : '11px',
              lineHeight: 'auto',
              letterSpacing: '0%'
            }}
          >
            {formatDate(event.date).split(" ")[0]}
          </span>
        </div>
      </div>

      {/* Separator line - only shown on hover, spans full card height */}
      {isHovered && (
        <div 
          className="w-[2px] transition-opacity duration-300 z-20"
          style={{ 
            borderRight: '2px dashed rgba(255, 255, 255, 0.1)'
          }}
        />
      )}

      {/* Image section */}
      <div 
        className="flex items-center justify-center relative z-10" 
        style={{
          paddingLeft: isHovered ? '16px' : '24px',
          paddingTop: '17px',
          paddingBottom: '17px',
          paddingRight: '16px'
        }}
      >
        <Image
          src={
            event.files && event.files.length > 0
              ? event.files[0].url
              : "https://placehold.co/400"
          }
          alt={event.name}
          width={200}
          height={200}
          className="rounded-xl opacity-100"
          style={{ width: '200px', height: '200px' }}
          priority={false}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
      </div>

      {/* Content section */}
      <div className="flex-1 flex flex-col justify-start relative z-10 py-7">
        {event.types &&
          event.types.length > 0 &&
          event.types.map((type) => (
            <span
              className="w-fit flex justify-center items-center mb-5 h-8 px-4 bg-[#D4D4D4]/10 text-white rounded-full relative transition-all duration-300"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: "400",
                fontSize: "13px",
                lineHeight: "auto",
                letterSpacing: "0%",
              }}
              key={event.id + "-" + type}
            >
              {/* Gradient border overlay - only visible on hover */}
              {isHovered && (
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: "linear-gradient(to top, rgba(19, 25, 59, 0.6) 0%, rgba(19, 25, 59, 0.4) 30%, rgba(19, 25, 59, 0.2) 60%, rgba(255, 255, 255, 0.1) 100%)",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "xor",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    padding: "2px",
                  }}
                />
              )}
              {type}
            </span>
          ))}

        <h1 
          className="text-4xl font-extrabold max-w-[300px] mb-2"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          {event.name}
        </h1>
        <p 
          className="font-light max-w-[500px]"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          {event.description}
        </p>
      </div>

      {/* Button section */}
      <div className="flex items-center justify-center relative z-10 pt-5" style={{ paddingRight: '36px' }}>
        <div className="flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            className="p-2 text-black bg-[#FAA336] border-[1px] border-[#FAA336] rounded-md text-center"
            onClick={onInvitationLink}
          >
            Invitation Link
          </button>
          <button
            className="p-2 text-white border-[1px] border-white rounded-md text-center"
            onClick={() => onSeeDetails(event)}
          >
            See Details
          </button>
        </div>
      </div>
    </div>
  );
} 