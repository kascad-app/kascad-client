"use client";

import { notFound, useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import {
  useGetConversationMessages,
  useMarkConversationAsRead,
  useSendMessage,
  useDeleteMessage,
} from "@/entities/direct-messages/conversations.hooks";
import { SWR_KEY } from "@/shared/constants/SWR_KEY";
import { mutate } from "swr";
import { MailOpen, Send, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import clsx from "clsx";
import { use, useEffect, useRef, useState } from "react";
import { Button } from "@/shared/ui/button/Button.ui";
import { CreateMessageInput } from "@/entities/offers/offer.type";
import { ROUTES } from "@/shared/constants/ROUTES";
import { useSession } from "@/shared/context/SessionContext";

export default function ConversationPage() {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const params = useParams();
  const session = useSession();

  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
        ? params.id[0]
        : undefined;

  if (!id) return notFound();

  const [message, setMessage] = useState("");
  const useMarkAsRead = useMarkConversationAsRead(id);
  const { trigger: sendMessage } = useSendMessage();
  const { trigger: deleteMessage } = useDeleteMessage();
  // Utilise la même clé que le hook pour que mutate mette bien à jour data
  const messagesKey = SWR_KEY.CONVERSATIONS.MESSAGES.GET(id);
  const { data, isLoading, error } = useGetConversationMessages(id || "");
  useEffect(() => {
    autoResize();
  }, []);

  useEffect(() => {
    if (data && !isLoading && !error) {
      useMarkAsRead.trigger();
    }
    // Scroll en bas à chaque chargement de messages
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [data, isLoading, error]);

  useEffect(() => {
    autoResize();
  }, [message]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    autoResize();
  };

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    await sendMessage({
      conversationId: id,
      content: message,
    } as CreateMessageInput);

    setMessage("");
    await mutate(messagesKey); // recharge les messages après envoi
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Empêche le retour à la ligne
      handleSendMessage();
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    await deleteMessage(messageId);
    await mutate(messagesKey); // recharge les messages après suppression
  };

  const back = () => {
    router.push(ROUTES.MESSAGERIE.PAGE);
  };

  if (isLoading)
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white bg-opacity-90 min-h-screen min-w-full">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-[#d2fa52] mb-8"></div>
        <span className="text-2xl text-[#101B08] font-bold font-figtree">
          Chargement de la conversation...
        </span>
      </div>
    );

  return (
    <main className="flex flex-col justify-between mx-auto py-10 px-6 h-full">
      <div className="flex flex-col items-start  w-full gap-3 mb-6 ">
        <Button variant="underline" onClick={() => back()}>
          {" "}
          ← Retour messagerie
        </Button>
        <div className="flex items-center gap-2">
          <MailOpen className="text-[#101B08]" />
          <h1 className="text-2xl font-bold text-[#101B08] font-michroma ">
            {data?.participantInfo.companyName}
          </h1>
        </div>
      </div>

      <div className="flex flex-col justify-between w-full h-full">
        <div className="overflow-y-auto max-h-[60dvh] bg-[#F9F9F6] border border-[#D2FA52]/40 rounded-xl p-6 space-y-8">
          {isLoading ? (
            <p className="text-gray-500">Chargement des messages...</p>
          ) : error ? (
            <p className="text-red-500">Erreur lors du chargement des messages.</p>
          ) : data && data.messages.length > 0 ? (
            <>
              {[...data.messages].reverse().map((msg) => {
                const isFromSponsor = msg.senderType === "sponsor";
                return (
                  <div
                    key={msg._id}
                    className={clsx("pl-4 rounded-md p-4 shadow-sm relative", {
                      "border-l-4 border-[#B1BD93] bg-white/70 text-[#101B08]":
                        isFromSponsor,
                      "border-l-4 border-[#D2FA52] bg-[#D2FA52]/70 text-[#101B08]":
                        !isFromSponsor,
                    })}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold">
                        {isFromSponsor
                          ? data?.participantInfo.companyName
                          : session?.user?.identity.fullName || "Vous"}
                      </p>
                      <span className="text-xs text-gray-500">
                        {new Date(msg.createdAt).toLocaleString("fr-FR", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    {!isFromSponsor && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            className="absolute bottom-2 right-2 p-1 rounded-full hover:bg-[#e6e6e6] transition text-gray-400 hover:text-[#B91C1C]"
                            style={{ opacity: 0.7 }}
                            title="Supprimer"
                          >
                            <X size={16} />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Supprimer ce message ?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Cette action est irréversible. Voulez-vous
                              vraiment supprimer ce message ?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteMessage(msg._id)}
                            >
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </>
          ) : (
            <p className="text-gray-400 italic">
              Aucun message dans cette conversation.
            </p>
          )}
        </div>

        {/* Zone de rédaction */}
        <div className="mt-6 border border-[#B1BD93]/60 bg-white rounded-xl shadow-lg p-4  bottom-8 w-full">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Écrire un message..."
            className="w-full p-3 rounded-lg border border-[#E0E0DC] text-sm text-[#101B08] resize-none focus:outline-none focus:ring-2 focus:ring-[#D2FA52] bg-[#FAFAF8] min-h-[100px] max-h-[15dvh] overflow-auto"
            rows={1}
          />

          <div className="flex justify-end mt-4">
            <button
              onClick={handleSendMessage}
              className="flex items-center gap-2 bg-[#D2FA52] text-[#101B08] font-semibold px-5 py-2 rounded-lg hover:bg-[#c4eb3f] transition"
            >
              Envoyer
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
