import React, { useEffect } from "react";
import CollapsibleSection from "../ui/CollapsibleSection";

type FileObject = {
  id: number;
  name: string;
  url: string;
};

type EventType = {
  id: number;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  images: string;
  files: FileObject[];
  // Optionally, add more fields for 'learn', 'need', 'instructors' if available
};

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventType | null;
  onShare?: () => void;
  onInvite?: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  event,
  onShare,
  onInvite,
}) => {
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;

      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {

      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    };
  }, [isOpen]);

  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full h-9/10 p-8 relative font-patrick text-black flex flex-col gap-4 overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5    px-4 py-1 text-lg"
        >
          ✕
        </button>
        {/* Header */}
        <div className="flex gap-5 items-center  mb-2 ">
          <h2 className="text-2xl font-bold">{event.name}</h2>
          <div className="inline-block px-4 py-1 border-2 border-black rounded-full  font-patrick text-lg bg-white">
            Discord Events
          </div>
        </div>
        {/* Main Content */}
        <div className="flex h-full flex-row gap-8 ">
          {/* Image Box */}
          <div className="w-100 h-full   bg-gray-100 border border-black rounded-lg flex items-center justify-center">
            {event.files && event.files.length > 0 ? (
              <img
                src={event.files[0].url}
                alt={event.name}
                className="object-cover w-full h-full rounded-lg"
              />
            ) : (
              <span className="text-4xl text-gray-400">🖼️</span>
            )}
          </div>
          {/* Details */}
          <div className="flex-1 flex flex-col gap-2">
            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold mb-1">Description</h3>
              <p className="text-base whitespace-pre-line">
                {event.description}
              </p>
            </div>
            <CollapsibleSection title="You will Learn:">
              <ul className="list-disc list-inside text-base">
                <li>Lots and lots of vocabulary</li>
                <li>Useful everyday phrases</li>
                <li>Basic sentence structures</li>
                <li>Basic grammar rules most beginner courses don't teach</li>
              </ul>
            </CollapsibleSection>
            <CollapsibleSection title="What You Need:">
              <ul className="list-disc list-inside text-base">
                <li>
                  Greet people and introduce yourself both formally and casually
                </li>
                <li>Pronounce words correctly without hearing them first</li>
                <li>Over one thousand vocabulary words from all categories</li>
              </ul>
            </CollapsibleSection>
            <CollapsibleSection title="Instructors">
              <ul className="list-disc list-inside text-base">
                <li>
                  Greet people and introduce yourself both formally and casually
                </li>
                <li>Pronounce words correctly without hearing them first</li>
                <li>Over one thousand vocabulary words from all categories</li>
              </ul>
            </CollapsibleSection>
            <div className="flex flex-col flex-1 justify-end h-full">
              <div className="flex justify-between items-end mt-auto">
                <div className="flex flex-col gap-2">
                  <span className="">Discord</span>
                  <span className="flex items-center gap-2 text-base">
                    <span>📅</span> March (Exact Date TBD)
                  </span>
                </div>
                <div className="flex gap-2 items-center self-end">
                  <button
                    onClick={onShare}
                    className="border border-black rounded-lg bg-white hover:bg-gray-100 px-6 py-2 text-sm font-medium h-auto min-h-0"
                    style={{
                      height: "auto",
                      minHeight: 0,
                      alignSelf: "center",
                    }}
                  >
                    Share Link
                  </button>
                  <button
                    onClick={onInvite}
                    className="border border-black rounded-lg bg-black text-white hover:bg-gray-900 px-6 py-2 text-sm font-medium h-auto min-h-0"
                    style={{
                      height: "auto",
                      minHeight: 0,
                      alignSelf: "center",
                    }}
                  >
                    Invitation Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
