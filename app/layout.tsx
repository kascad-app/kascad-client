import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { Navbar } from "@/shared/ui/navbar/navbar.ui";
import { Header } from "@/widgets/header";
import "./globals.css";
import { Toaster } from "sonner";
import { ROUTES } from "@/shared/constants/ROUTES";
import { LayoutApp } from "@/widgets/layout-app";

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
      <body>
        <LayoutApp> {children} </LayoutApp>
      </body>
    </html>
  );
}
