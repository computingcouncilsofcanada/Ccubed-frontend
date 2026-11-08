import Link from "next/link";
import React from "react";

interface EmptyStateAction {
  label: string;
  icon?: React.ElementType;
  href?: string;
  onClick?: () => void;
  className?: string;
}

interface EmptyStateProps {
  icon: React.ElementType;
  iconSize?: number;
  title: string;
  description?: string;
  action?: EmptyStateAction;
  className?: string;
  innerClassName?: string;
  iconClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const defaultActionClassName =
  "inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-black transition-all shadow-lg hover:opacity-90 bg-brand";

/** Compact dark-glass card used by member list pages with a single-line layout (no inner padding wrapper). */
export const emptyStateDarkCompact = {
  className: "rounded-2xl border border-white/15 bg-white/5 p-8 text-center",
  innerClassName: "",
  iconSize: 56,
  iconClassName: "mx-auto text-slate-500 mb-4",
  titleClassName: "text-xl font-semibold text-white mb-2",
  descriptionClassName: "text-slate-400",
} as const;

/** Roomier dark-glass card used by member table pages. */
export const emptyStateDarkRoomy = {
  className: "rounded-xl border border-white/20 bg-white/5 p-6",
  innerClassName: "text-center py-16",
  iconSize: 64,
  iconClassName: "mx-auto text-slate-400 mb-4",
  titleClassName: "text-xl font-semibold text-white mb-2",
  descriptionClassName: "text-slate-400",
} as const;

export default function EmptyState({
  icon: Icon,
  iconSize = 64,
  title,
  description,
  action,
  className = "bg-white rounded-xl shadow-lg border border-gray-200 p-6",
  innerClassName = "text-center py-16",
  iconClassName = "mx-auto text-gray-400 mb-4",
  titleClassName = "text-xl font-semibold text-gray-700 mb-2",
  descriptionClassName = "text-gray-500",
}: EmptyStateProps) {
  const ActionIcon = action?.icon;
  const actionClassName = action?.className ?? defaultActionClassName;

  const actionElement = action ? (
    action.href ? (
      <Link href={action.href} className={actionClassName}>
        {ActionIcon && <ActionIcon size={20} />}
        {action.label}
      </Link>
    ) : (
      <button type="button" onClick={action.onClick} className={actionClassName}>
        {ActionIcon && <ActionIcon size={20} />}
        {action.label}
      </button>
    )
  ) : null;

  return (
    <div className={className}>
      <div className={innerClassName}>
        <Icon size={iconSize} className={iconClassName} />
        <h3 className={titleClassName}>{title}</h3>
        {description && <p className={descriptionClassName}>{description}</p>}
        {actionElement && <div className="mt-6">{actionElement}</div>}
      </div>
    </div>
  );
}
