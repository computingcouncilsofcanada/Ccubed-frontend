import { User } from "@/types/user.interface";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Keep one entry per email; manual emails take precedence over selected users. */
export function dedupeMembersForSubmit(
  users: User[],
  selectedUserIds: Iterable<string>,
  manualEmails: string[],
  excludeEmails: string[] = []
): string[] {
  const excluded = new Set(excludeEmails.map((e) => e.toLowerCase()));
  const seenEmails = new Set<string>();
  const emails: string[] = [];

  for (const email of manualEmails) {
    const normalized = email.toLowerCase();
    if (excluded.has(normalized) || seenEmails.has(normalized)) continue;
    seenEmails.add(normalized);
    emails.push(normalized);
  }

  for (const userId of selectedUserIds) {
    const user = users.find((u) => u.id === userId);
    if (!user) continue;
    const normalized = user.email.toLowerCase();
    if (excluded.has(normalized) || seenEmails.has(normalized)) continue;
    seenEmails.add(normalized);
    emails.push(normalized);
  }

  return emails;
}

export const formatGroupTimestamp = (value: string | null | undefined) => {
  if (!value) return null;
  const date = new Date(Number(value));
  if (Number.isNaN(date.getTime())) {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return null;
    return `${parsed.toLocaleDateString()} ${parsed.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};
