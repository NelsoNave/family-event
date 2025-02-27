import React from "react";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-screen max-w-md bg-white px-4 pb-20 pt-2 md:mx-auto">
      {children}
    </section>
  );
}
