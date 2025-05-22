// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { LayoutApp } from "@/widgets/layout-app";
import { SessionProvider } from "@/shared/context/SessionProvider"; // 💡 nouveau

export const metadata: Metadata = {
  title: "Kascad",
  description: "Devenez le partenaire privilégié des champions de demain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <LayoutApp>{children}</LayoutApp>
        </SessionProvider>
      </body>
    </html>
  );
}
