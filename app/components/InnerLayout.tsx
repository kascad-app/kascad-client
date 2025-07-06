// components/InnerLayout.tsx
"use client";

import { useSession } from "@/shared/context/SessionContext";
import Sidebar from "./Sidebar";

export default function InnerLayout({ children }: { children: React.ReactNode; }) {
    const session = useSession();

    return session.user ? (
        <Sidebar>{children}</Sidebar>
    ) : (
        <>{children}</>
    );
}
