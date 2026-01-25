import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArticleHeader } from "./SpecificCouncilArticleComponents";
import { ArticleBody } from "./SpecificCouncilArticleComponents";
import { CouncilSection } from "../types/types";
import { EventCard } from "@/components/shared/EventCard";
import { Events } from "@/types/events";
import { privateAxios } from "@/lib/axios";
import { transformApiEvents } from "@/app/events/utils/eventsApi";
import Image from 'next/image';
import { useSafariImageFallback } from "@/hooks/useSafariImageFallback";
import {
    IconBrandLinkedin,
    IconBrandDiscord,
    IconBrandInstagram,
    IconBrandTwitter,
} from "@tabler/icons-react";

interface Representative {
    name: string;
    title: string;
    image: string;
    role: string;
}

type CouncilProps = {
    council: CouncilSection;
};

/**
 * ArticleSection Component
 * Displays the main article content with header and body
 */
export const ArticleSection = ({ council }: CouncilProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-32"
        >
            <ArticleHeader council={council} />
            <ArticleBody />
        </motion.div>
    );
};

/**
 * DescriptionSection Component
 * Shows council description text alongside an image carousel
 */
export const DescriptionSection = ({ council }: CouncilProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const slides = [
        { id: 0, image: "/FigmaFiles/councilAssets/bear_heart.png" },
        { id: 1, image: "/FigmaFiles/councilAssets/CCubed_icon.png" },
        { id: 2, image: "/FigmaFiles/councilAssets/Cybersecurity_council.png" },
        { id: 3, image: "/FigmaFiles/councilAssets/guy.png" },
        { id: 4, image: "/FigmaFiles/councilAssets/bear_heart.png" },
        { id: 5, image: "/FigmaFiles/councilAssets/CCubed_icon.png" },
    ];

    const nextSlide = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index: number) => {
        setDirection(index > activeIndex ? 1 : -1);
        setActiveIndex(index);
    };

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 1,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? "100%" : "-100%",
            opacity: 1,
        }),
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-24 px-4"
        >
            <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-full md:w-1/2 shrink-0">
                    <h2
                        className="text-[28px] sm:text-[34px] md:text-[36px] font-extrabold leading-tight tracking-[0.01em] text-white mb-4"
                        style={{ fontFamily: "Roboto, sans-serif" }}
                    >
                        Description
                    </h2>

                    <p
                        className="text-white font-light text-[15px] sm:text-[16px] md:text-[18px] leading-[1.6] tracking-[0.01em] w-full max-w-none"
                        style={{ fontFamily: "Roboto, sans-serif" }}
                    >
                        {council.fullDescription}
                    </p>
                </div>

                <div className="w-full md:w-1/2 flex flex-col items-center">
                    <div className="relative w-full max-w-[550px] md:h-[331px] h-[220px] overflow-hidden rounded-[20px] bg-[#D4D4D4]/10 backdrop-blur-sm">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={activeIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 800, damping: 50 },
                                    opacity: { duration: 0.15 },
                                }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={1}
                                onDragEnd={(_, { offset, velocity }) => {
                                    const swipe = swipePower(offset.x, velocity.x);

                                    if (swipe < -swipeConfidenceThreshold) {
                                        nextSlide();
                                    } else if (swipe > swipeConfidenceThreshold) {
                                        prevSlide();
                                    }
                                }}
                                className="absolute inset-0 flex items-center justify-center rounded-[20px] cursor-grab active:cursor-grabbing"
                            >
                                <img
                                    src={slides[activeIndex].image}
                                    alt={`Slide ${activeIndex + 1}`}
                                    className="w-full h-full object-contain rounded-[20px] pointer-events-none select-none"
                                    draggable={false}
                                />
                            </motion.div>
                        </AnimatePresence>

                        <div className="absolute inset-0 border border-white/10 rounded-[20px] pointer-events-none z-20"></div>

                        <button
                            onClick={prevSlide}
                            className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 transition-colors px-3 py-1 md:px-4 md:py-2 rounded-full text-white text-lg md:text-xl font-bold z-10"
                            aria-label="Previous slide"
                        >
                            ‹
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 transition-colors px-3 py-1 md:px-4 md:py-2 rounded-full text-white text-lg md:text-xl font-bold z-10"
                            aria-label="Next slide"
                        >
                            ›
                        </button>
                    </div>

                    <div className="flex gap-2 mt-4">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                                    activeIndex === idx ? "bg-yellow-400" : "bg-gray-500"
                                }`}
                                onClick={() => goToSlide(idx)}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

/**
 * EventsSection Component
 * Fetches and displays upcoming council events in a grid layout
 */
export const EventsSection = () => {
    const [councilEvents, setCouncilEvents] = useState<Events[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Fetch events from backend
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const res = await privateAxios.get("/events");
                const transformedEvents = transformApiEvents(res.data.data);

                // Filter active events, get future events, sort by date (earliest first), and take only 4
                const now = new Date();
                const activeFutureEvents = transformedEvents
                    .filter((event) => event.status !== 0)
                    .filter((event) => new Date(event.date) > now)
                    .sort((a, b) => {
                        const dateA = new Date(a.date);
                        const dateB = new Date(b.date);
                        return dateA.getTime() - dateB.getTime(); // Earliest first
                    })
                    .slice(0, 4) // Take only 4 events
                    .map((event) => ({ ...event, url: `/events/${event.id}` })); // Add missing url property
                setCouncilEvents(activeFutureEvents);
            } catch (error: unknown) {
                console.error("Error fetching events:", error);
                // Fallback to empty array
                setCouncilEvents([]);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-32"
        >
            <div className="text-start mb-6">
                <h2
                    className="text-[36px] font-extrabold leading-12 tracking-[0.01em] text-white mb-4"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                >
                    Council Events
                </h2>
                <p
                    className="text-white font-light text-[18px] leading-[26px] tracking-[0.01em]"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                >
                    Discover the range of events organized by our council in collaboration
                    with partnered societies and universities. Each gathering reflects our
                    shared goals of connection, growth, and engagement, offering unique
                    experiences for our community.
                </p>
            </div>

            {/* Event Cards */}
            {loading ? (
                <div className="flex justify-center items-center py-16">
                    <div className="text-white text-lg">Loading events...</div>
                </div>
            ) : councilEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {councilEvents.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{
                                duration: 0.8,
                                delay: index * 0.1,
                                ease: "easeOut",
                            }}
                        >
                            <EventCard
                                id={event.id}
                                title={event.name}
                                time={event.time}
                                date={event.date}
                                location={event.location}
                                type={(() => {
                                    if (!event.types || event.types.length === 0) return "Online";
                                    const eventType = event.types[0];
                                    if (eventType === "In Person") return "In Person";
                                    if (eventType === "Online") return "Online";

                                    return "Online";
                                })()}
                                imageSrc={
                                    event.files && event.files.length > 0
                                        ? event.files[0].url
                                        : "https://placehold.co/400"
                                }
                                description={event.description}
                                onseeDetails={() => router.push(`/events/${event.id}`)}
                                onInvitationLink={() => console.log('Invitation link clicked for event:', event.id)}
                            />
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <div className="text-white text-lg mb-2">No events available</div>
                    <div className="text-white/70 text-sm">
                        Check back soon for upcoming council events!
                    </div>
                </div>
            )}
        </motion.div>
    );
};

/**
 * CouncilHero Component
 */
export const CouncilHero = ({ council }: CouncilProps) => {
    return (
        <section className="hero flex gap-4 flex-col-reverse md:flex-row items-center justify-center relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 xl:px-0 mb-24 pt-8">
            {/* Text Content */}
            <div className="text flex flex-col gap-4 md:max-w-sm lg:max-w-lg">
                <h1
                    className="text-white font-extrabold text-2xl sm:text-3xl md:text-2xl lg:text-5xl"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                >
                    {council.title}
                </h1>
                <p
                    className="text-white max-w-xl sm:text-lg sm:leading-6 lg:text-xl lg:leading-7"
                    style={{
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: "300",
                        lineHeight: "22px",
                        letterSpacing: "0%",
                    }}
                >
                    {council.shortDescription}
                </p>
            </div>

            {/* Council Icon (same as council card) */}
            <div className="image relative flex justify-center flex-shrink-0">
                <div className="relative w-[300px] h-[300px] md:w-[320px] md:h-[320px] lg:w-[480px] lg:h-[480px]">
                    <Image
                        src={council.icon}
                        alt={`${council.title} icon`}
                        width={405}
                        height={405}
                        className="w-full h-full object-contain select-none"
                        priority
                        quality={100}
                        draggable={false}
                        style={{ userSelect: "none" }}
                    />
                </div>
            </div>
        </section>
    );
};

/**
 * RepresentativesSection Component
 * Displays council representatives with role filtering and interactive profile cards
 */
export const RepresentativesSection = () => {
    const [activeFilter, setActiveFilter] = useState("Management");
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [clickedIndex, setClickedIndex] = useState<number | null>(null);

    const representativeImgSrc = useSafariImageFallback(
        "/FigmaFiles/councilAssets/guy.svg",
        "/FigmaFiles/councilAssets/guy.png"
    );

    const councilRepresentatives: Representative[] = [
        {
            name: "Parth Doshi",
            title: "President",
            image: representativeImgSrc,
            role: "Management",
        },
        // Add more representatives as needed
    ];

    const filterOptions = [
        "Management",
        "Product",
        "Operation",
        "Design",
        "Marketing",
        "Customer service",
    ];

    const socialLinks = [
        {
            id: 1,
            icon: IconBrandLinkedin,
            linkUrl: "https://www.linkedin.com/company/placeholder",
            altText: "LinkedIn",
            fill: false,
        },
        {
            id: 2,
            icon: IconBrandInstagram,
            linkUrl: "https://www.instagram.com/placeholder",
            altText: "Instagram",
            fill: false,
        },
        {
            id: 3,
            icon: IconBrandTwitter,
            linkUrl: "https://x.com/placeholder",
            altText: "Twitter",
            fill: false,
        },
        {
            id: 4,
            icon: IconBrandDiscord,
            linkUrl: "https://discord.com/invite/placeholder",
            altText: "Discord",
            fill: false,
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-24 px-4 sm:px-6"
        >

            <div className="text-center mb-8">
                <h2
                    className="text-[36px] md:text-[30px] sm:text-[24px] font-extrabold leading-[1.3] text-white mb-4"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                >
                    Council Representatives
                </h2>
                <p
                    className="text-white font-light text-[18px] md:text-[16px] sm:text-[14px] leading-[26px] max-w-[845px] md:max-w-[700px] sm:max-w-[95%] mx-auto"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                >
                    Meet the key members of our council, including main directors and
                    representatives from our partnered societies and clubs. Each profile
                    offers a glimpse into their role and contribution, helping you get to
                    know the people shaping our community.
                </p>
            </div>


            <div className="flex flex-wrap justify-center gap-3 sm:gap-2 mb-8">
                {filterOptions.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`transition-all duration-300 ease-out h-11 sm:h-[38px] px-4 py-2 rounded-[20px] relative ${
                            activeFilter === filter ? "font-medium" : "font-light"
                        }`}
                        style={{
                            fontFamily: "Roboto, sans-serif",
                            lineHeight: "27px",
                            letterSpacing: "0%",
                        }}
                    >
                        {activeFilter === filter && (
                            <motion.div
                                className="absolute inset-0 rounded-[20px] pointer-events-none"
                                style={{
                                    background:
                                        "linear-gradient(120deg, rgba(51, 186, 197, 1) 0%, rgba(255, 255, 255, 0.1) 35%, transparent 65%)",
                                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                    maskComposite: "xor",
                                    WebkitMask:
                                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                    WebkitMaskComposite: "xor",
                                    padding: "2px",
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        )}
                        <span
                            className={`relative z-10 ${
                                activeFilter === filter ? "text-transparent" : "text-white"
                            }`}
                        >
                            {activeFilter === filter ? (
                                <span
                                    style={{
                                        background:
                                            "linear-gradient(to right, #FFFFFF 0%, #33BAC5 85%)",
                                        WebkitBackgroundClip: "text",
                                        backgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        color: "transparent",
                                    }}
                                >
                                    {filter}
                                </span>
                            ) : (
                                filter
                            )}
                        </span>
                    </button>
                ))}
            </div>

            {/* Representative Cards */}
            <div className="flex justify-center">
                <div className="flex flex-wrap justify-center gap-6 max-w-[845px] md:max-w-[700px] sm:max-w-[95%]">
                    {councilRepresentatives.map((rep, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{
                                duration: 0.8,
                                delay: index * 0.1,
                                ease: "easeOut",
                            }}
                            className="text-center shrink-0 w-[200px] sm:w-40"
                        >
                            {/* Profile Picture */}
                            <div className="relative h-[229px] sm:h-[180px] flex items-end justify-center mb-4">
                                <motion.div
                                    className="overflow-hidden cursor-pointer"
                                    animate={{
                                        width:
                                            hoveredIndex === index || clickedIndex === index
                                                ? "179px"
                                                : "169px",
                                        height:
                                            hoveredIndex === index || clickedIndex === index
                                                ? "229px"
                                                : "169px",
                                        borderRadius:
                                            hoveredIndex === index || clickedIndex === index
                                                ? "12px"
                                                : "50%",
                                    }}
                                    onHoverStart={() => setHoveredIndex(index)}
                                    onHoverEnd={() => setHoveredIndex(null)}
                                    onClick={() =>
                                        setClickedIndex(clickedIndex === index ? null : index)
                                    }
                                    transition={{
                                        duration: 0.6,
                                        ease: [0.25, 0.46, 0.45, 0.94],
                                    }}
                                >
                                    <Image
                                        src={rep.image}
                                        alt={rep.name}
                                        width={179}
                                        height={229}
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            </div>

                            <h3
                                className="text-[24px] md:text-[20px] sm:text-[18px] font-medium text-white"
                                style={{ fontFamily: "Roboto, sans-serif" }}
                            >
                                {rep.name}
                            </h3>
                            <p
                                className="text-[18px] md:text-[16px] sm:text-[14px] text-white font-light mb-2"
                                style={{ fontFamily: "Roboto, sans-serif" }}
                            >
                                {rep.title}
                            </p>

                            <motion.div
                                className="flex items-center justify-center gap-4"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity:
                                        hoveredIndex === index || clickedIndex === index ? 1 : 0,
                                }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                {socialLinks.map(
                                    ({ id, linkUrl, icon: IconComponent, altText, fill }) => (
                                        <a
                                            href={linkUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            key={id}
                                            aria-label={altText}
                                            className="hover:opacity-80 transition-opacity duration-200"
                                        >
                                            <IconComponent
                                                size={22}
                                                color="#FFFFFF"
                                                stroke={fill ? 0 : 1.5}
                                                fill={fill ? "#FFFFFF" : "none"}
                                            />
                                        </a>
                                    )
                                )}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};
