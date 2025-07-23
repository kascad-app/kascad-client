// components/InnerLayout.tsx
"use client";
import Sidebar from "./Sidebar";
import { Toaster } from "sonner";

export default function InnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sidebar>
      {children}
      <Toaster
      // toastOptions={{
      //   style: {
      //     background: "#f6ffe0",
      //     color: "#3f4139",
      //     border: "2px solid #d2fa52",
      //   },
      // }}
      />
    </Sidebar>
  );
}
