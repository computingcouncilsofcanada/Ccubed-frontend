import React from "react";
import { IconX } from "@tabler/icons-react";
import Modal from "./Modal";

export type ConfirmActionTone = "danger" | "info" | "warning";

const toneClasses: Record<
  ConfirmActionTone,
  { iconWrap: string; icon: string; confirmButton: string }
> = {
  danger: {
    iconWrap: "bg-gradient-to-br from-red-500/20 to-rose-500/20 border-2 border-red-400/30",
    icon: "text-red-400",
    confirmButton:
      "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700",
  },
  info: {
    iconWrap: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-2 border-blue-400/30",
    icon: "text-blue-400",
    confirmButton:
      "bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700",
  },
  warning: {
    iconWrap:
      "bg-gradient-to-br from-orange-500/20 to-amber-500/20 border-2 border-orange-400/30",
    icon: "text-orange-400",
    confirmButton:
      "bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700",
  },
};

interface ConfirmActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  tone: ConfirmActionTone;
  icon: React.ElementType;
  confirmLabel: string;
  confirmIcon?: React.ElementType;
  confirmDisabled?: boolean;
  cancelLabel?: string;
  contentClassName?: string;
  /** Extra content rendered below the icon/message block, outside its centered layout (e.g. a form field). */
  extra?: React.ReactNode;
  children: React.ReactNode;
}

export default function ConfirmActionModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  tone,
  icon: Icon,
  confirmLabel,
  confirmIcon: ConfirmIcon,
  confirmDisabled,
  cancelLabel = "Cancel",
  contentClassName = "flex flex-col items-center gap-4 py-4",
  extra,
  children,
}: ConfirmActionModalProps) {
  const { iconWrap, icon, confirmButton } = toneClasses[tone];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col gap-6">
        <div className={contentClassName}>
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${iconWrap}`}>
            <Icon size={32} className={icon} strokeWidth={2.5} />
          </div>
          {children}
        </div>

        {extra}

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-600">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 border-2 border-gray-600 rounded-lg hover:bg-gray-700 transition-all duration-200 font-medium text-gray-300 hover:border-gray-500 flex items-center gap-2"
          >
            <IconX size={18} />
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={confirmDisabled}
            className={`px-6 py-2.5 text-white rounded-lg transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2 ${confirmButton}`}
          >
            {ConfirmIcon && <ConfirmIcon size={18} />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}
