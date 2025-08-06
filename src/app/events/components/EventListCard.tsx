import Image from "next/image";
import { Events } from "@/types/events";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { getOrdinalDay, getMonthName } from "@/utils/dateUtils";

type EventListCardProps = {
  event: Events;
  onSeeDetails: (event: Events) => void;
  onInvitationLink: () => void;
  showInvitationButton?: boolean; // Optional prop to show/hide invitation button
};

export function EventListCard({ 
  event, 
  onSeeDetails, 
  onInvitationLink,
  showInvitationButton = true 
}: EventListCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Add debounce to prevent rapid state changes
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 50); // 50ms delay to prevent flickering
  };

  const zigzagClipPath = "polygon(0% 0%, 1% 2%, 0% 4%, 1% 6%, 0% 8%, 1% 10%, 0% 12%, 1% 14%, 0% 16%, 1% 18%, 0% 20%, 1% 22%, 0% 24%, 1% 26%, 0% 28%, 1% 30%, 0% 32%, 1% 34%, 0% 36%, 1% 38%, 0% 40%, 1% 42%, 0% 44%, 1% 46%, 0% 48%, 1% 50%, 0% 52%, 1% 54%, 0% 56%, 1% 58%, 0% 60%, 1% 62%, 0% 64%, 1% 66%, 0% 68%, 1% 70%, 0% 72%, 1% 74%, 0% 76%, 1% 78%, 0% 80%, 1% 82%, 0% 84%, 1% 86%, 0% 88%, 1% 90%, 0% 92%, 1% 94%, 0% 96%, 1% 98%, 0% 100%, 100% 100%, 99% 98%, 100% 96%, 99% 94%, 100% 92%, 99% 90%, 100% 88%, 99% 86%, 100% 84%, 99% 82%, 100% 80%, 99% 78%, 100% 76%, 99% 74%, 100% 72%, 99% 70%, 100% 68%, 99% 66%, 100% 64%, 99% 62%, 100% 60%, 99% 58%, 100% 56%, 99% 54%, 100% 52%, 99% 50%, 100% 48%, 99% 46%, 100% 44%, 99% 42%, 100% 40%, 99% 38%, 100% 36%, 99% 34%, 100% 32%, 99% 30%, 100% 28%, 99% 26%, 100% 24%, 99% 22%, 100% 20%, 99% 18%, 100% 16%, 99% 14%, 100% 12%, 99% 10%, 100% 8%, 99% 6%, 100% 4%, 99% 2%, 100% 0%)";

  return (
    <motion.div
      className={`flex text-white group bg-[#D4D4D4]/10 backdrop-blur-sm shadow-xl relative overflow-hidden w-full max-w-[1144px] h-[234px] ${isHovered ? '' : 'rounded-lg'}`}
      key={event.id + "-list"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        pointerEvents: 'auto',
        clipPath: isHovered ? zigzagClipPath : 'none'
      }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: isHovered ? 0 : 0.1  // Add small delay when leaving hover
      }}
    >
      {/* Date section */}
      <motion.div 
        className="flex items-start justify-start relative z-10" 
        initial={{
          paddingLeft: '24px',
          paddingTop: '24px',
          paddingBottom: '24px',
          paddingRight: '24px'
        }}
        animate={{
          paddingLeft: isHovered ? '32px' : '24px',
          paddingTop: isHovered ? '16px' : '24px',
          paddingBottom: isHovered ? '16px' : '24px',
          paddingRight: isHovered ? '32px' : '24px'
        }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1]
        }}
      >
        <div className="flex flex-col items-center text-center -space-y-1">
          <motion.span 
            className="text-white font-bold"
            initial={{
              fontSize: '32px'
            }}
            animate={{
              fontSize: isHovered ? '48px' : '32px'
            }}
            style={{
              fontFamily: 'Roboto, sans-serif',
              lineHeight: 'auto',
              letterSpacing: '0%'
            }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            {getOrdinalDay(event.date)}
          </motion.span>
          <motion.span 
            className="text-white font-light"
            initial={{
              fontSize: '11px'
            }}
            animate={{
              fontSize: isHovered ? '16px' : '11px'
            }}
            style={{
              fontFamily: 'Roboto, sans-serif',
              lineHeight: 'auto',
              letterSpacing: '0%'
            }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            {getMonthName(event.date)}
          </motion.span>
        </div>
      </motion.div>

      {/* Separator line - only shown on hover, spans full card height */}
      <motion.div 
        className="w-[2px] z-20"
        style={{ 
          borderRight: '2px dashed rgba(255, 255, 255, 0.1)'
        }}
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: isHovered ? 1 : 0
        }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1]
        }}
      />

      {/* Image section */}
      <motion.div 
        className="flex items-center justify-center relative z-10" 
        initial={{
          paddingLeft: '24px',
          paddingTop: '17px',
          paddingBottom: '17px',
          paddingRight: '16px'
        }}
        animate={{
          paddingLeft: isHovered ? '16px' : '24px',
          paddingTop: '17px',
          paddingBottom: '17px',
          paddingRight: '16px'
        }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1]
        }}
      >
        {event.files && event.files.length > 0 ? (
          <Image
            src={event.files[0].url}
            alt={event.name}
            width={200}
            height={200}
            className="rounded-xl opacity-100"
            style={{ width: '200px', height: '200px' }}
            priority={false}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
              if (nextElement) {
                nextElement.style.display = 'flex';
              }
            }}
          />
        ) : null}
        <div 
          className={`w-[200px] h-[200px] rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center ${event.files && event.files.length > 0 ? 'hidden' : 'flex'}`}
          style={{ 
            display: event.files && event.files.length > 0 ? 'none' : 'flex'
          }}
        >
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 text-gray-400">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
              </svg>
            </div>
            <span className="text-xs text-gray-400 font-medium">No Image</span>
          </div>
        </div>
      </motion.div>

      {/* Content section */}
      <div className="flex-1 flex flex-col justify-start relative z-10 py-7">
        {/* Badge section - Fixed height 32px, independent area */}
        <div className="h-8 flex items-start justify-start flex-shrink-0 mb-3">
          {event.types &&
            event.types.length > 0 && (
              <span
                className="w-fit flex justify-center items-center h-8 px-4 bg-[#D4D4D4]/10 text-white rounded-full relative transition-all duration-300"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: "400",
                  fontSize: "13px",
                  lineHeight: "auto",
                  letterSpacing: "0%",
                }}
                key={event.id + "-" + event.types[0]}
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
                {/* Show first type, or 'Hybrid' if multiple types */}
                {event.types.length > 1 ? 'Hybrid' : event.types[0]}
              </span>
            )}
        </div>

        {/* Title and description section */}
        <div className="flex-1">
          <div className="relative max-w-[400px] mb-2">
            <h1 
              className="text-4xl font-extrabold text-white"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              {event.name}
            </h1>
            {/* Gradient overlay for hover effect */}
            <h1 
              className="text-4xl font-extrabold absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                fontFamily: 'Roboto, sans-serif',
                background: 'linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(80, 128, 239, 1) 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
              }}
            >
              {event.name}
            </h1>
          </div>
            <p 
            className="font-light max-w-[500px]"
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: '16px',
              lineHeight: 'normal',
              letterSpacing: '0%',
             }}
          >
            {event.description}
          </p>
        </div>
      </div>

      {/* Button section */}
      <div className="flex items-center justify-center relative z-10 pt-5" style={{ paddingRight: '36px' }}>
        <motion.div 
          className="flex flex-col gap-3"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: isHovered ? 1 : 0
          }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          {showInvitationButton && (
            <button
              className="w-36 h-11 bg-[#FAA336] text-center flex items-center justify-center"
              style={{
                borderRadius: '6px',
                color: '#0B1820',
                fontFamily: 'Roboto, sans-serif',
                fontWeight: '400',
                fontSize: '16px',
                lineHeight: 'auto',
                letterSpacing: '0%'
              }}
              onClick={onInvitationLink}
            >
              Invitation Link
            </button>
          )}
          <button
            className="w-36 h-11 bg-transparent border-[1px] border-white text-center flex items-center justify-center"
            style={{
              borderRadius: '6px',
              color: '#FFFFFF',
              fontFamily: 'Roboto, sans-serif',
              fontWeight: '400',
              fontSize: '16px',
              lineHeight: 'auto',
              letterSpacing: '0%'
            }}
            onClick={() => onSeeDetails(event)}
          >
            See Details
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
} 