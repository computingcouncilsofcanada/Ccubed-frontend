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
      className={`flex text-white group p-5 bg-[#D4D4D4]/10 backdrop-blur-sm shadow-xl relative overflow-hidden transition-all duration-300 ${isHovered ? '' : 'rounded-lg'}`}
      key={event.id + "-list"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        clipPath: isHovered ? zigzagClipPath : 'none'
      }}
    >
      
      <div className="px-5 relative z-10">
        <h1 className="text-center">
          <span className="text-2xl font-extrabold group-hover:text-5xl transition-all duration-300 ">
            {formatDate(event.date).split(" ")[1].split("")[0]}{getOrdinalSuffix(formatDate(event.date).split(" ")[1].split("")[0])}
          </span>{" "}
          <br />
          {formatDate(event.date).split(" ")[0]}
        </h1>
      </div>
      <div className="flex-1 relative z-10">
        <div className="flex gap-3 h-60  group-hover:pl-4 transition-all duration-300 ">
          <div className="flex-1">
            <Image
              src={
                event.files && event.files.length > 0
                  ? event.files[0].url
                  : "https://placehold.co/400"
              }
              alt={event.name}
              width={250}
              height={250}
              className="rounded-lg w-full h-full"
              priority={false}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
          </div>

          <div className="flex-2 flex flex-col gap-3">
            {event.types &&
              event.types.length > 0 &&
              event.types.map((type) => (
                <h1
                  className="w-fit flex justify-center items-center"
                  style={{
                    height: "28px",
                    paddingLeft: "12px",
                    paddingRight: "12px",
                    borderRadius: "20px",
                    backgroundColor: "rgba(212, 212, 212, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    opacity: "0.99",
                    color: "#FFFFFF",
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: "400",
                    fontSize: "10px",
                    lineHeight: "auto",
                    letterSpacing: "0%",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.25))",
                  }}
                  key={event.id + "-" + type}
                >
                  {type}
                </h1>
              ))}

            <h1 className="text-4xl font-bold max-w-[300px]">
              {event.name}
            </h1>
            <p className="max-w-[500px]">{event.description}</p>
          </div>
          <div className="flex-1  flex justify-center items-center">
            <div className="flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 ">
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
      </div>
    </div>
  );
} 