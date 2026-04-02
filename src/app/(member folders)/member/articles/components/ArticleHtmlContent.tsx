"use client";

import DOMPurify from "isomorphic-dompurify";

type ArticleHtmlContentProps = {
  html: string;
  className?: string;
};

/**
 * Renders trusted admin-authored HTML with sanitization.
 */
export function ArticleHtmlContent({ html, className }: ArticleHtmlContentProps) {
  const clean = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
  });

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
