import { Suspense } from "react";
import EmailTemplateUpsertContent from "./EmailTemplateUpsertContent";

export default function MemberEmailTemplateUpsertPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#10212E] to-[#162C3D] text-slate-300">
          Loading editor…
        </div>
      }
    >
      <EmailTemplateUpsertContent />
    </Suspense>
  );
}
