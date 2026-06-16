"use client";

import { useUser } from "@/context/UserContext";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import { getErrMsg } from "@/utils/errorMessage";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useApiBulkEmail } from "@/services/useApiBulkEmail";
import {
  BulkEmailWithPreview,
} from "@/types/email.interface";
import { BulkEmailStatusBadge } from "../components/BulkEmailStatusBadge";

export default function BulkEmailReviewPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const bulkEmailId = params?.id;

  const { getBulkEmail, confirmBulkEmail, cancelBulkEmail } = useApiBulkEmail();

  const [data, setData] = useState<BulkEmailWithPreview | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [acting, setActing] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) router.push("/");
  }, [user, isLoading, router]);

  const fetchBulkEmail = useCallback(async () => {
    if (!bulkEmailId) return;
    setLoading(true);
    setLoadError(null);
    try {
      const response = await getBulkEmail(bulkEmailId);
      setData(response.data as BulkEmailWithPreview);
    } catch (e: unknown) {
      setLoadError(getErrMsg(e));
    } finally {
      setLoading(false);
    }
  }, [getBulkEmail, bulkEmailId]);

  useEffect(() => {
    fetchBulkEmail();
  }, [fetchBulkEmail]);

  const handleConfirm = async (dryRun: boolean) => {
    if (!bulkEmailId || !data) return;
    const recipientCount = data.bulkEmail.recipients.length;
    if (!dryRun) {
      const ok = window.confirm(
        `Send this email to ${recipientCount} recipient${recipientCount === 1 ? "" : "s"}? This cannot be undone.`,
      );
      if (!ok) return;
    }
    setActing(true);
    try {
      await confirmBulkEmail(bulkEmailId, dryRun);
      await fetchBulkEmail();
    } catch (e: unknown) {
      alert(getErrMsg(e));
    } finally {
      setActing(false);
    }
  };

  const handleCancel = async () => {
    if (!bulkEmailId) return;
    const ok = window.confirm("Cancel this pending bulk email?");
    if (!ok) return;
    setActing(true);
    try {
      await cancelBulkEmail(bulkEmailId);
      await fetchBulkEmail();
    } catch (e: unknown) {
      alert(getErrMsg(e));
    } finally {
      setActing(false);
    }
  };

  if (!user) return null;

  return (
    <div className="relative -mt-30 min-h-screen w-full overflow-x-hidden overflow-hidden bg-gradient-to-b from-[#10212E] to-[#162C3D] pt-30">
      <BgBoxMainPage maxHeight={400} enableGlow />

      <div className="relative z-10 mx-auto max-w-[min(100%,72rem)] p-4 sm:p-6">
        <div className="mb-8">
          <Link
            href="/member/email/bulk-emails"
            className="group mb-4 inline-flex items-center gap-2 text-gray-300 transition-colors hover:text-[#FAA336]"
          >
            <IconArrowLeft
              size={20}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span className="font-medium">Back to bulk emails</span>
          </Link>
          <h1 className="mb-2 text-4xl font-bold text-white md:text-5xl">
            Review bulk email
          </h1>
          <p className="text-lg text-slate-300">
            Verify the rendered email and recipient list before sending.
          </p>
        </div>

        {loading && (
          <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-slate-300">
            Loading…
          </div>
        )}

        {loadError && (
          <div className="rounded-xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-200">
            {loadError}
          </div>
        )}

        {data && (
          <BulkEmailReviewBody
            data={data}
            acting={acting}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
}

function BulkEmailReviewBody({
  data,
  acting,
  onConfirm,
  onCancel,
}: {
  data: BulkEmailWithPreview;
  acting: boolean;
  onConfirm: (dryRun: boolean) => void;
  onCancel: () => void;
}) {
  const { bulkEmail, preview } = data;
  const recipients = bulkEmail.recipients ?? [];
  const total = recipients.length;
  const sent = recipients.filter((r) => r.status === "sent").length;
  const failed = recipients.filter((r) => r.status === "failed").length;
  const isPending = bulkEmail.status === "pending";

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8">
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <div className="flex items-center gap-3">
            <BulkEmailStatusBadge status={bulkEmail.status} />
            <span className="text-sm text-slate-400">
              {total} recipient{total === 1 ? "" : "s"}
              {sent > 0 || failed > 0
                ? ` · ${sent} sent${failed > 0 ? `, ${failed} failed` : ""}`
                : ""}
            </span>
          </div>
          {isPending && (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onCancel}
                disabled={acting}
                className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10 disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => onConfirm(true)}
                disabled={acting}
                className="rounded-xl border border-[#FAA336]/50 px-4 py-2 text-sm font-semibold text-[#FAA336] hover:bg-[#FAA336]/10 disabled:opacity-40"
              >
                Dry run (no send)
              </button>
              <button
                type="button"
                onClick={() => onConfirm(false)}
                disabled={acting}
                style={{ backgroundColor: "#FAA336" }}
                className="rounded-xl px-5 py-2 text-sm font-semibold text-black shadow-lg hover:opacity-90 disabled:opacity-60"
              >
                {acting ? "Working…" : "Confirm & send"}
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8">
        <h2 className="border-b border-white/10 pb-3 text-lg font-semibold text-white">
          Sample render
        </h2>
        <div className="mt-4 flex flex-col gap-3">
          {preview.length === 0 ? (
            <p className="text-sm text-slate-400">
              No recipients to preview.
            </p>
          ) : (
            preview.map((p, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-black/20 p-4"
              >
                <p className="text-xs text-slate-400">To: {p.email}</p>
                <p className="mt-1 font-semibold text-white">
                  {p.subject}
                </p>
                <div
                  className="mt-3 text-sm text-slate-200 [&_a]:text-[#FAA336] [&_a]:underline [&_h2]:text-lg [&_h2]:font-bold [&_h3]:text-base [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
                  dangerouslySetInnerHTML={{ __html: p.body }}
                />
              </div>
            ))
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8">
        <h2 className="border-b border-white/10 pb-3 text-lg font-semibold text-white">
          Recipients
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-slate-300">
              <tr>
                <th className="border-b border-white/10 px-3 py-2 text-left font-semibold">
                  Email
                </th>
                <th className="border-b border-white/10 px-3 py-2 text-left font-semibold">
                  Status
                </th>
                <th className="border-b border-white/10 px-3 py-2 text-left font-semibold">
                  Detail
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-200">
              {recipients.map((r, i) => (
                <tr key={`${r.email}-${i}`}>
                  <td className="border-b border-white/5 px-3 py-2">
                    {r.email}
                  </td>
                  <td className="border-b border-white/5 px-3 py-2">
                    <span
                      className={
                        r.status === "sent"
                          ? "text-green-300"
                          : r.status === "failed"
                            ? "text-red-300"
                            : "text-slate-300"
                      }
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="border-b border-white/5 px-3 py-2 text-xs text-slate-400">
                    {r.error
                      ? r.error
                      : r.sent_at
                        ? new Date(Number(r.sent_at)).toLocaleString()
                        : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
