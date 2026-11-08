"use client";

import { useUser } from "@/context/UserContext";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { getArticle } from "@/services/useApiArticle";
import { Article } from "@/types/article.interface";
import { getErrMsg } from "@/utils/errorMessage";
import { ArticleHtmlContent } from "../components/ArticleHtmlContent";
import Image from "next/image";

const contentProseClass =
  "max-w-none text-slate-200 leading-relaxed [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-brand [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-brand [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4 [&_li]:my-1 [&_a]:text-brand [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-brand/60 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-300 [&_strong]:text-slate-100";

export default function MemberArticleDetailPage() {
  const { user } = useUser();
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = (await getArticle(id));
      console.log(response.data);
      setArticle(response.data as Article);
    } catch (e: unknown) {
      setError(getErrMsg(e));
      setArticle(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  if (!user) {
    return null;
  }

  if (!id) {
    return (
      <div className="p-6 text-slate-300">
        <p>Missing article id.</p>
        <Link href="/member/articles" className="mt-4 inline-block text-brand hover:underline">
          Back to articles
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-6">
      <div
        className="relative max-w-4xl mx-auto rounded-3xl p-8"
        style={{
          background: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(28px) saturate(120%)",
          WebkitBackdropFilter: "blur(28px) saturate(120%)",
          border: "1px solid rgba(255, 255, 255, 0.35)",
          boxShadow: `
    0 20px 40px rgba(0,0,0,0.18),
    inset 0 1px 0 rgba(255,255,255,0.6),
    inset 0 -1px 0 rgba(255,255,255,0.15)
  `,
        }}
      >
        <button
          type="button"
          onClick={() => router.push("/member/articles")}
          className="inline-flex items-center gap-2 text-slate-300 hover:text-brand transition-colors mb-6"
        >
          <IconArrowLeft size={20} />
          <span className="font-medium">Back to articles</span>
        </button>

        {loading && <p className="text-slate-400">Loading…</p>}

        {error && !loading && (
          <div className="rounded-xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-200 mb-4">
            {error}
          </div>
        )}

        {!loading && article && (
          <>
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{article.title}</h1>
              <p className="text-slate-300 text-lg">{article.description}</p>
              <div className="flex flex-wrap gap-3 mt-4 text-sm text-slate-400">
                <span>Slug: {article.slug}</span>
                <span>Status: {article.status}</span>
                {article.read_minutes != null && <span>{article.read_minutes} min read</span>}
                {article.authors?.length ? (
                  <span>Authors: {article.authors.join(", ")}</span>
                ) : null}
              </div>
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-xs font-medium bg-brand/20 text-brand border border-brand/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {(article.hero_image_url || article.thumbnail_url) && (
              <div className="mb-8 rounded-2xl overflow-hidden border border-white/10 aspect-[21/9] max-h-80 relative bg-black/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Image
                  src={article.hero_image_url || article.thumbnail_url}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  fill
                  objectFit="cover"
                />
              </div>
            )}

            <ArticleHtmlContent html={article.content || ""} className={contentProseClass} />
          </>
        )}
      </div>
    </div>
  );
}
