// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "@/shared/context/SessionProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Kascad",
  description: "Devenez le partenaire privilégié des champions de demain",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <SessionProvider>{children}</SessionProvider>

        <Toaster
          toastOptions={{
            style: {
              background: "#f6ffe0",
              color: "#3f4139",
              border: "2px solid #d2fa52",
            },
          }}
        />
      </body>
    </html>
  );
}
