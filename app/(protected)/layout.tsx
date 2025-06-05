import { SessionProvider } from "@/shared/context/SessionProvider";
import AuthGuard from "@/shared/guards/AuthGuard";
import { LayoutApp } from "@/widgets/layout-app";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AuthGuard>
        <LayoutApp>{children}</LayoutApp>
      </AuthGuard>
    </SessionProvider>
  );
}
