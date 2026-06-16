"use client";

import { useParams } from "next/navigation";
import CreateOrUpdateEmailGroupForm from "../components/CreateOrUpdateEmailGroupForm";

export default function EmailGroupDetailPage() {
  const params = useParams();
  const id = params?.id as string | undefined;

  return <CreateOrUpdateEmailGroupForm mode="update" groupId={id} />;
}
