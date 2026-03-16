"use client";

import { useEffect } from "react";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
