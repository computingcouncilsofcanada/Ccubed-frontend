"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import { DataTable } from "@/components/data-table/data-table";
import { getErrMsg } from "@/utils/errorMessage";
import { getArticles } from "@/services/useApiArticle";
import { Article } from "@/types/article.interface";
import EmptyArticlesState from "./components/EmptyArticlesState";
import { Pagination } from "@/components/shared/Pagination";
import { createArticleTableColumns } from "./components/ArticleTableColumns";

const PAGE_SIZE = 10;

export default function MemberArticlesPage() {
  const { user } = useUser();
  const router = useRouter();

  const [articles, setArticles] = useState<Article[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const offset = (page - 1) * PAGE_SIZE;
      const response = await getArticles(PAGE_SIZE, offset);
    
      setArticles(response.data.articles);
      setTotalRecords(response.data.totalRecords);
    } catch (err: unknown) {
      setFetchError(getErrMsg(err));
      setArticles([]);
      setTotalRecords(0);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const columns = useMemo(() => createArticleTableColumns(), []);

  const handleRowClick = useCallback(
    (row: Article) => {
      router.push(`/member/articles/${row.id}`);
    },
    [router]
  );

  if (!user) {
    return null;
  }

  const showEmptyPlaceholder = !loading && articles.length === 0 && totalRecords === 0 && !fetchError;

  return (
    <div className="min-h-screen text-white p-6">
      <div
        className="relative rounded-3xl p-8"
        style={{
          background: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(28px) saturate(120%)",
          WebkitBackdropFilter: "blur(28px) saturate(120%)",
          borderRadius: "22px",
          border: "1px solid rgba(255, 255, 255, 0.35)",
          boxShadow: `
    0 20px 40px rgba(0,0,0,0.18),
    inset 0 1px 0 rgba(255,255,255,0.6),
    inset 0 -1px 0 rgba(255,255,255,0.15)
  `,
        }}
      >
        <div
          className="absolute top-0 left-6 right-6 h-px rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
          }}
        />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
              <Image
                src="/FigmaFiles/ccubed-icon.svg"
                alt=""
                width={30}
                height={30}
                draggable={false}
                className="select-none"
              />
              Articles
            </h1>
            <p className="text-slate-400">Browse and open articles from the admin area</p>
          </div>
          <Link
            href="/member/articles/upsert?mode=create"
            className="inline-flex justify-center px-6 py-3 bg-brand text-black rounded-3xl hover:opacity-90 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 items-center gap-2"
          >
            <IconPlus size={20} />
            New article
          </Link>
        </div>

        {fetchError && (
          <div className="mb-6 rounded-xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-200">
            {fetchError}
          </div>
        )}

        {showEmptyPlaceholder ? (
          <EmptyArticlesState />
        ) : (
          <>
            <DataTable
              columns={columns}
              data={articles}
              headerVariant="purple"
              sort={true}
              onRowClick={handleRowClick}
              loading={loading}
              loadingDelay={0}
            />
            <Pagination
              page={page}
              pageSize={PAGE_SIZE}
              totalRecords={totalRecords}
              itemCountOnPage={articles.length}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
