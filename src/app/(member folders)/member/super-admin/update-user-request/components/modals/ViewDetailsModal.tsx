"use client";

import Modal from "@/components/modals/Modal";
import { UpdateUserRequestListItem } from "@/types/user.interface";
import { UpdateUserRequestStatus } from "@/types/user.interface";
import { Check, X } from "lucide-react";

interface ViewDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: UpdateUserRequestListItem | null;
  onApprove: (item: UpdateUserRequestListItem) => void;
  onReject: (item: UpdateUserRequestListItem) => void;
}

export default function ViewDetailsModal({
  isOpen,
  onClose,
  request,
  onApprove,
  onReject,
}: ViewDetailsModalProps) {
  if (!isOpen || !request) return null;

  const d = request.details;
  const isPending =
    !request.status || request.status === UpdateUserRequestStatus.PENDING;

  const section = (title: string, content: React.ReactNode) => (
    <div className="mb-4">
      <h3 className="text-sm font-semibold text-gray-400 mb-1">{title}</h3>
      <div className="text-white text-sm">{content}</div>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update request details">
      <div className="max-h-[70vh] overflow-y-auto">
        <div className="space-y-1 mb-4 pb-3 border-b border-gray-600">
          <p className="text-gray-400 text-xs">User ID</p>
          <p className="font-mono text-sm text-white break-all">
            {request.user_id}
          </p>
        </div>

        {section("Username", d?.username ?? "—")}
        {section("About me", d?.about_me ? (
          <p className="whitespace-pre-wrap">{d.about_me}</p>
        ) : "—")}
        {section("Fun fact", d?.fun_fact ?? "—")}
        {section("Journey at CCubed", d?.journey_at_ccubed ?? "—")}
        {section("Favorite song", d?.favorite_song ?? "—")}
        {section("Favorite quote", d?.favorite_quote ?? "—")}

        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-1">Links</h3>
          <ul className="text-white text-sm space-y-0.5">
            <li>Instagram: {d?.instagram_url || "—"}</li>
            <li>Twitter: {d?.twitter_url || "—"}</li>
            <li>LinkedIn: {d?.linkedin_url || "—"}</li>
            <li>Discord: {d?.discord_url || "—"}</li>
            <li>Avatar URL: {d?.avatar_url ? "Set" : "—"}</li>
          </ul>
        </div>

        {(d?.domains?.length ?? 0) > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-400 mb-1">Domains</h3>
            <p className="text-white text-sm">
              {(d?.domains ?? []).join(", ")}
            </p>
          </div>
        )}
        {(d?.hobbies?.length ?? 0) > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-400 mb-1">Hobbies</h3>
            <p className="text-white text-sm">
              {(d?.hobbies ?? []).join(", ")}
            </p>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-600">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 text-gray-300"
          >
            Close
          </button>
          {isPending && (
            <>
              <button
                type="button"
                onClick={() => {
                  onApprove(request);
                  onClose();
                }}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2 text-white"
              >
                <Check size={18} />
                Approve
              </button>
              <button
                type="button"
                onClick={() => {
                  onReject(request);
                  onClose();
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg flex items-center gap-2 text-white"
              >
                <X size={18} />
                Reject
              </button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
