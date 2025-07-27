import { notFound } from "next/navigation";
import { Suspense } from "react";

interface PageProps {
  params: { id: string };
}

export default function ConversationPage({ params }: PageProps) {
  const { id } = params;
  if (!id) return notFound();
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Conversation</h1>
      <div className="bg-white rounded-xl shadow p-6">
        <p>
          ID de la conversation : <span className="font-mono">{id}</span>
        </p>
        {/* TODO: Afficher les messages et l'UI de la conversation ici */}
      </div>
    </main>
  );
}
