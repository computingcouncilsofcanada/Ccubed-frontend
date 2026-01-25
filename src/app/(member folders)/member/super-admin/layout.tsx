"use client";

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
