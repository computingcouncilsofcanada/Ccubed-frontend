import { Events } from "@/types/events";
import { EventListCard } from "./EventListCard";

type PastEventsSectionProps = {
  pastEvents: Events[];
  onSeeDetails: (event: Events) => void;
  onInvitationLink: (event: Events) => void; // Still need this prop but won't be used
};

export function PastEventsSection({ 
  pastEvents, 
  onSeeDetails, 
  onInvitationLink 
}: PastEventsSectionProps) {
  if (pastEvents.length === 0) {
    return null; // Don't show section if no past events
  }

  return (
    <section className="w-full py-8 mt-20">
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Past Events
        </h2>
        <p className="text-white/70 text-base">
          Check out our previous events and activities
        </p>
      </div>

      {/* Past Events List */}
      <div className="flex flex-col gap-4 max-w-6xl mx-auto">
        {pastEvents.map((event) => (
          <EventListCard
            key={event.id + "-past"}
            event={event}
            onSeeDetails={onSeeDetails}
            onInvitationLink={() => onInvitationLink(event)}
            showInvitationButton={false} // Hide invitation button for past events
          />
        ))}
      </div>
    </section>
  );
} 