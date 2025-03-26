import React from "react";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-screen max-w-md bg-white mx-auto">
      {children}
    </section>
  );
}
