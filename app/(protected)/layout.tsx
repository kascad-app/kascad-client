import { SessionProvider } from "@/shared/context/SessionProvider";
import AuthGuard from "@/shared/guards/AuthGuard";
import InnerLayout from "../components/InnerLayout";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AuthGuard>
        <InnerLayout>{children}</InnerLayout>
      </AuthGuard>
    </SessionProvider>
  );
}
