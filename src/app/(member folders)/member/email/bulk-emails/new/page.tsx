import { Suspense } from "react";
import NewBulkEmailWizard from "./NewBulkEmailWizard";

export default function MemberNewBulkEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#10212E] to-[#162C3D] text-slate-300">
          Loading wizard…
        </div>
      }
    >
      <NewBulkEmailWizard />
    </Suspense>
  );
}
