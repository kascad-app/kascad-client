"use client";

import { notFound } from "next/navigation";
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

export default function ConversationPage() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const params = useParams();

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

  const handleDeleteMessage = async (messageId: string) => {
    await deleteMessage(messageId);
    await mutate(messagesKey); // recharge les messages après suppression
  };

  const back = () => {
    window.history.back();
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
    <main className="flex flex-col  mx-auto py-10 px-6 ">
      <div className="flex items-center justify-between w-full gap-3 mb-6 ">
        <div className="flex items-center gap-2">
          <MailOpen className="text-[#101B08]" />
          <h1 className="text-2xl font-bold text-[#101B08] font-michroma ">
            Sonsor message
          </h1>
        </div>
        <Button variant="outline" onClick={back}>
          {" "}
          retour messagerie
        </Button>
      </div>

      <div className="flex flex-col justify-between w-full">
        <div className="flex-1 bg-[#F9F9F6] border border-[#D2FA52]/40 rounded-xl p-6 space-y-8 max-h-[70vh] justify-around">
          {isLoading ? (
            <p className="text-gray-500">Chargement des messages...</p>
          ) : error ? (
            <p className="text-red-500">
              Erreur lors du chargement des messages.
            </p>
          ) : data && data.messages.length > 0 ? (
            [...data.messages].reverse().map((msg) => {
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
                      {msg.sender?.displayName ||
                        msg.sender?.fullName ||
                        msg.sender?.companyName ||
                        msg.senderId}
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
                            Cette action est irréversible. Voulez-vous vraiment
                            supprimer ce message ?
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
            })
          ) : (
            <p className="text-gray-400 italic">
              Aucun message dans cette conversation.
            </p>
          )}
        </div>

        {/* Zone de rédaction */}
        <div className="mt-6 border border-[#B1BD93]/60 bg-white rounded-xl shadow-lg p-4 absolute bottom-8 w-4/5">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleChange}
            placeholder="Écrire un message..."
            className="w-full p-3 rounded-lg border border-[#E0E0DC] text-sm text-[#101B08] resize-none focus:outline-none focus:ring-2 focus:ring-[#D2FA52] bg-[#FAFAF8] min-h-[100px] max-h-[35dvh] overflow-auto"
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
