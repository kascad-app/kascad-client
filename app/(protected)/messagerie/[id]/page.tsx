import { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = Promise<{
  id: string;
}>;

export default async function Page(props: { params: Params }) {
  const { id } = await props.params;
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
