"use client";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@components/ui/dialog";
import { Input } from "@components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@components/ui/select";
import { Button } from "@components/ui/button";
import { ProfileType, ConversationType } from "@kascad-app/shared-types";
import { useGetOrCreateConversation } from "@/entities/direct-messages/conversations.hooks";

export default function StartConversationDialog() {
  const [open, setOpen] = useState(false);
  const [targetUserId, setTargetUserId] = useState<string>("");
  const [targetUserType, setTargetUserType] = useState<string>("");
  const [contextType, setContextType] = useState<string>("");
  const [referenceId, setReferenceId] = useState<string>("");
  const { trigger, isMutating, error } = useGetOrCreateConversation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!targetUserId || !targetUserType || !contextType) return;
    await trigger({
      targetUserId,
      targetUserType: ProfileType.SPONSOR,
      context: {
        type: ConversationType.PRIVATE,
        referenceId: undefined,
      },
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-6">
          Démarrer une conversation avec un sponsor
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouvelle conversation sponsor</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            placeholder="ID du sponsor (targetUserId)"
            value={targetUserId}
            onChange={(e) => setTargetUserId(e.target.value)}
            required
          />
          {error && (
            <div className="text-red-500 text-sm">Erreur: {error.message}</div>
          )}
          <DialogFooter>
            <Button type="submit" disabled={isMutating}>
              {isMutating ? "Envoi..." : "Démarrer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
