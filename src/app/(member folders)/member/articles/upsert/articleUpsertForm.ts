import { cn } from "@/lib/utils";

export type ArticleUpsertFormValues = {
  title: string;
  description: string;
  slug: string;
  status: number;
  read_minutes: string;
  council_id: string;
  authors: { value: string }[];
  tags: { value: string }[];
  share_links: { icon: string; url: string }[];
  content: string;
  thumbnail?: FileList;
  hero_image?: FileList;
};

export const defaultArticleUpsertFormValues: ArticleUpsertFormValues = {
  title: "",
  description: "",
  slug: "",
  status: 0,
  read_minutes: "",
  council_id: "",
  authors: [{ value: "" }],
  tags: [{ value: "" }],
  share_links: [{ icon: "", url: "" }],
  content: "",
};

export const articleUpsertInputClass =
  "w-full px-4 py-3 rounded-lg border border-white/15 bg-black/25 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand/50";

export const articleUpsertSelectTriggerClass = cn(
  articleUpsertInputClass,
  "flex h-auto min-h-[48px] w-full items-center justify-between text-left [&>span]:line-clamp-1"
);
