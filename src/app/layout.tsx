import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const inter = Figtree({ subsets: ["latin"] });

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
