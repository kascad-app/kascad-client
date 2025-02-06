import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { Navbar } from "@/shared/ui/navbar/navbar.ui";
import "./globals.css";

const inter = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kascad",
  description: "Devenez le partenaire privilégié des champions de demain",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " h-full"}>
        {children}
        <Navbar />
      </body>
    </html>
  );
}
