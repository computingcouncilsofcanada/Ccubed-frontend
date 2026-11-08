import EmptyState, { emptyStateDarkCompact } from "@/components/shared/EmptyState";
import { IconFileText, IconPlus } from "@tabler/icons-react";

export default function EmptyArticlesState() {
  return (
    <EmptyState
      {...emptyStateDarkCompact}
      icon={IconFileText}
      title="No articles found"
      description="Create an article to see it listed here."
      action={{
        label: "New article",
        icon: IconPlus,
        href: "/member/articles/upsert?mode=create",
      }}
    />
  );
}
