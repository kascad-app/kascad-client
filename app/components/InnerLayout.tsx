// components/InnerLayout.tsx
"use client";
import Sidebar from "./Sidebar";

export default function InnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Sidebar>{children}</Sidebar>;
}
