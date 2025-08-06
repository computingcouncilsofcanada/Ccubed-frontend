import { Events } from "@/types/events";
import { EventCard } from "@/components/sections/landing/EventCard";
import { EventListCard } from "./EventListCard";
import { EmptyState } from "./EmptyState";

type CurrentEventsSectionProps = {
  viewMode: string;
  filteredCurrentEvents: Events[];
  showEmptyState: boolean;
  showFilterEmptyState: boolean;
  eventType: string;
  onSeeDetails: (event: Events) => void;
  onInvitationLink: () => void;
};

export function CurrentEventsSection({
  viewMode,
  filteredCurrentEvents,
  showEmptyState,
  showFilterEmptyState,
  eventType,
  onSeeDetails,
  onInvitationLink,
}: CurrentEventsSectionProps) {
  if (viewMode === "grid") {
    return (
      <div
        className={`mb-2 ${
          showEmptyState || showFilterEmptyState
            ? "flex justify-center items-center h-[451px]"
            : ""
        }`}
      >
        {/* Empty states */}
        {showEmptyState && <EmptyState type="all" />}
        {showFilterEmptyState && (
          <EmptyState type={eventType as "inperson" | "hybrid" | "online"} />
        )}

        {/* Grid events - Show all events */}
        {!showEmptyState && !showFilterEmptyState && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-10 justify-items-center sm:justify-items-stretch">
            {filteredCurrentEvents.map((event: Events) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.name}
                time={event.time}
                date={event.date}
                location={event.location}
                type={(() => {
                  if (!event.types || event.types.length === 0)
                    return "Online";

                  // Check for hybrid first - either multiple types OR contains "hybrid"
                  const hasHybridType = event.types.some(
                    (type) =>
                      type.toLowerCase() === "hybrid" ||
                      type.toLowerCase().includes("hybrid")
                  );
                  if (event.types.length > 1 || hasHybridType)
                    return "Hybrid";

                  // Otherwise return the single type
                  return event.types[0] as "Hybrid" | "Online" | "In Person";
                })()}
                imageSrc={
                  event.files && event.files.length > 0
                    ? event.files[0].url
                    : "https://placehold.co/400"
                }
                description={event.description}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // List view
  return (
    <div className="flex flex-col gap-10 mt-10">
      {/* Empty states */}
      {showEmptyState && <EmptyState type="all" height="234px" />}
      {showFilterEmptyState && (
        <EmptyState type={eventType as "inperson" | "hybrid" | "online"} height="234px" />
      )}

      {/* List events */}
      {!showEmptyState && !showFilterEmptyState && filteredCurrentEvents.length > 0 &&
        filteredCurrentEvents.map((event: Events) => (
          <EventListCard
            key={event.id}
            event={event}
            onSeeDetails={onSeeDetails}
            onInvitationLink={onInvitationLink}
            showInvitationButton={true}
          />
        ))}
    </div>
  );
} 