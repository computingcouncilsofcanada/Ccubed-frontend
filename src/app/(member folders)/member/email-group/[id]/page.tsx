"use client";

import { useParams } from "next/navigation";
import EmailGroupFormContent from "../components/EmailGroupFormContent";

export default function EmailGroupDetailPage() {
  const params = useParams();
  const id = params?.id as string | undefined;

  return <EmailGroupFormContent mode="update" groupId={id} />;
}
