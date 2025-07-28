"use client";

import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { useGetConversationMessages } from "@/entities/direct-messages/conversations.hooks";

export default function ConversationPage() {
  const params = useParams();
  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : undefined;
  const { data, isLoading, error } = useGetConversationMessages(id || "");

  if (!id) return notFound();

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Conversation</h1>
      <div className="bg-white rounded-xl shadow p-6">
        <p>
          ID de la conversation : <span className="font-mono">{id}</span>
        </p>
        <div className="mt-6">
          {isLoading ? (
            <p>Chargement des messages...</p>
          ) : error ? (
            <p className="text-red-500">
              Erreur lors du chargement des messages.
            </p>
          ) : data && data.messages.length > 0 ? (
            <ul className="space-y-4">
              {data.messages.map((msg) => (
                <li key={msg._id} className="border-b pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-gray-700">
                      {msg.sender?.displayName ||
                        msg.sender?.fullName ||
                        msg.sender?.companyName ||
                        msg.senderId}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(msg.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-1 text-gray-900">{msg.content}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">
              Aucun message dans cette conversation.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
