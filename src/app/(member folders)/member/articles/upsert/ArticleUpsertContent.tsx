"use client";

import { useUser } from "@/context/UserContext";
import { getArticle, createArticle, updateArticle } from "@/services/useApiArticle";
import { getCouncil, getCouncils } from "@/services/useApiCouncil";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import { Article, CreateArticleDTO } from "@/types/article.interface";
import { Council } from "@/types/council.interface";
import { getErrMsg } from "@/utils/errorMessage";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ArticleUpsertLeftColumn } from "./ArticleUpsertLeftColumn";
import { ArticleUpsertRightColumn } from "./ArticleUpsertRightColumn";
import type { ArticleUpsertFormValues } from "./articleUpsertForm";
import { defaultArticleUpsertFormValues } from "./articleUpsertForm";

function normalizeCouncilsResponse(raw: unknown): Council[] {
  if (Array.isArray(raw)) return raw as Council[];
  if (
    raw &&
    typeof raw === "object" &&
    "data" in raw &&
    Array.isArray((raw as { data: unknown }).data)
  ) {
    return (raw as { data: Council[] }).data;
  }
  return [];
}

export default function ArticleUpsertContent() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [councils, setCouncils] = useState<Council[]>([]);
  const [councilsLoading, setCouncilsLoading] = useState(true);
  const [councilsError, setCouncilsError] = useState<string | null>(null);

  const modeParam = searchParams.get("mode");
  const articleId = searchParams.get("id");
  const mode = modeParam === "update" ? "update" : "create";
  const isUpdate = mode === "update" && Boolean(articleId);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoadingArticle, setIsLoadingArticle] = useState(false);
  const [existingThumbnail, setExistingThumbnail] = useState<string | null>(null);
  const [existingHero, setExistingHero] = useState<string | null>(null);
  const [editorKey, setEditorKey] = useState(0);

  const [thumbPreview, setThumbPreview] = useState<string | null>(null);
  const [heroPreview, setHeroPreview] = useState<string | null>(null);

  const methods = useForm<ArticleUpsertFormValues>({
    defaultValues: defaultArticleUpsertFormValues,
  });
  const { handleSubmit, watch, reset } = methods;

  const thumbnailFiles = watch("thumbnail");
  const heroFiles = watch("hero_image");
  const councilIdValue = watch("council_id");

  const councilOptions = useMemo(() => {
    const byId = new Map<string, Council>();
    for (const c of councils) {
      byId.set(c.id, c);
    }
    return Array.from(byId.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [councils]);

  const applyArticleToForm = useCallback(
    (article: Article) => {
      const authors =
        article.authors?.length > 0
          ? article.authors.map((a) => ({ value: a }))
          : [{ value: "" }];
      const tags =
        article.tags && article.tags.length > 0
          ? article.tags.map((t) => ({ value: t }))
          : [{ value: "" }];
      const links =
        article.share_links && article.share_links.length > 0
          ? article.share_links.map((l) => ({ icon: l.icon, url: l.url }))
          : [{ icon: "", url: "" }];

      reset({
        title: article.title,
        description: article.description,
        slug: article.slug,
        status: article.status,
        read_minutes: article.read_minutes != null ? String(article.read_minutes) : "",
        council_id: article.council_id,
        authors,
        tags,
        share_links: links,
        content: article.content,
      });
      setExistingThumbnail(article.thumbnail_url ?? null);
      setExistingHero(article.hero_image_url ?? null);
      setThumbPreview(article.thumbnail_url ?? null);
      setHeroPreview(article.hero_image_url ?? null);
      setEditorKey((k) => k + 1);
    },
    [reset]
  );

  useEffect(() => {
    if (!isLoading) {
      if (!user) router.push("/");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    let cancelled = false;
    setCouncilsLoading(true);
    setCouncilsError(null);
    (async () => {
      try {
        const raw = await getCouncils();
        if (cancelled) return;
        setCouncils(normalizeCouncilsResponse(raw));
      } catch (e: unknown) {
        if (!cancelled) setCouncilsError(getErrMsg(e));
      } finally {
        if (!cancelled) setCouncilsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!councilIdValue) return;
    if (councils.some((c) => c.id === councilIdValue)) return;
    let cancelled = false;
    (async () => {
      try {
        const data = (await getCouncil(councilIdValue)) as Council;
        if (cancelled) return;
        setCouncils((prev) =>
          prev.some((c) => c.id === data.id) ? prev : [...prev, data]
        );
      } catch {
        // Article may reference a council not visible to this user; keep id in form only
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [councilIdValue, councils]);

  useEffect(() => {
    if (thumbnailFiles?.length) {
      const file = thumbnailFiles[0];
      if (file?.type?.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setThumbPreview(url);
        return () => URL.revokeObjectURL(url);
      }
    } else if (existingThumbnail) {
      setThumbPreview(existingThumbnail);
    } else if (!isUpdate) {
      setThumbPreview(null);
    }
    return undefined;
  }, [thumbnailFiles, existingThumbnail, isUpdate]);

  useEffect(() => {
    if (heroFiles?.length) {
      const file = heroFiles[0];
      if (file?.type?.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setHeroPreview(url);
        return () => URL.revokeObjectURL(url);
      }
    } else if (existingHero) {
      setHeroPreview(existingHero);
    } else if (!isUpdate) {
      setHeroPreview(null);
    }
    return undefined;
  }, [heroFiles, existingHero, isUpdate]);

  useEffect(() => {
    if (!isUpdate || !articleId) return;
    let cancelled = false;
    setIsLoadingArticle(true);
    setLoadError(null);
    (async () => {
      try {
        const response = await getArticle(articleId);
        if (cancelled) return;
        applyArticleToForm(response.data as Article);
      } catch (e: unknown) {
        if (!cancelled) setLoadError(getErrMsg(e));
      } finally {
        if (!cancelled) setIsLoadingArticle(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isUpdate, articleId, applyArticleToForm]);

  const onSubmit = async (data: ArticleUpsertFormValues) => {
    const thumbFile = data.thumbnail?.[0];
    const thumbnailPayload: File | string | undefined =
      thumbFile ?? existingThumbnail ?? undefined;
    if (!thumbnailPayload) {
      alert("Please add a thumbnail image.");
      return;
    }

    const heroFile = data.hero_image?.[0];
    const heroPayload: File | string | undefined =
      heroFile ?? (existingHero ? existingHero : undefined);

    const authors = data.authors.map((a) => a.value.trim()).filter(Boolean);
    if (authors.length === 0) {
      alert("Add at least one author.");
      return;
    }

    const tags = data.tags.map((t) => t.value.trim()).filter(Boolean);
    const share_links = data.share_links
      .filter((s) => s.url.trim() || s.icon.trim())
      .map((s) => ({ icon: s.icon.trim(), url: s.url.trim() }))
      .filter((s) => s.url);

    const readParsed = data.read_minutes.trim();
    const readNum = readParsed === "" ? NaN : Number(readParsed);
    const read_minutes = Number.isFinite(readNum) ? readNum : undefined;

    const dto: CreateArticleDTO = {
      title: data.title.trim(),
      thumbnail: thumbnailPayload,
      hero_image: heroPayload,
      description: data.description.trim(),
      authors,
      tags: tags.length ? tags : undefined,
      slug: data.slug.trim(),
      status: data.status,
      read_minutes,
      council_id: data.council_id.trim(),
      share_links: share_links.length ? share_links : undefined,
      content: data.content,
    };

    setIsSubmitting(true);
    try {
      if (isUpdate && articleId) {
        await updateArticle(articleId, dto);
        alert("Article updated.");
      } else {
        await createArticle(dto);
        alert("Article created.");
      }
    } catch (e: unknown) {
      alert(getErrMsg(e));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  const heading = isUpdate ? "Edit article" : "Create article";
  const subtitle = isUpdate
    ? "Update article metadata and rich content."
    : "Publish a new article with rich text content.";

  if (isUpdate && articleId && loadError) {
    return (
      <div className="relative -mt-30 min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#10212E] to-[#162C3D] pt-30">
        <BgBoxMainPage maxHeight={400} enableGlow />
        <div className="relative z-10 mx-auto max-w-3xl p-6 text-slate-200">
          <p className="mb-4 text-red-400">{loadError}</p>
          <Link href="/member/articles" className="text-brand hover:underline">
            Back to articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative -mt-30 min-h-screen w-full overflow-x-hidden overflow-hidden bg-gradient-to-b from-[#10212E] to-[#162C3D] pt-30">
      <BgBoxMainPage maxHeight={400} enableGlow />

      <div className="relative z-10 mx-auto max-w-[min(100%,90rem)] p-4 sm:p-6">
        <div className="mb-8">
          <Link
            href="/member/articles"
            className="group mb-4 inline-flex items-center gap-2 text-gray-300 transition-colors hover:text-brand"
          >
            <IconArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Back to Articles</span>
          </Link>
          <h1 className="mb-2 text-4xl font-bold text-white md:text-5xl">{heading}</h1>
          <p className="text-lg text-slate-300">{subtitle}</p>
        </div>

        {isUpdate && isLoadingArticle ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-slate-300">
            Loading article…
          </div>
        ) : (
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,34rem)_minmax(0,1fr)] xl:items-stretch xl:gap-10"
            >
              <ArticleUpsertLeftColumn
                isUpdate={isUpdate}
                councilsLoading={councilsLoading}
                councilsError={councilsError}
                councilOptions={councilOptions}
                thumbPreview={thumbPreview}
                heroPreview={heroPreview}
                isSubmitting={isSubmitting}
              />
              <ArticleUpsertRightColumn editorKey={editorKey} isSubmitting={isSubmitting} />
            </form>
          </FormProvider>
        )}
      </div>
    </div>
  );
}
