export interface MessageEntry {
    from: "me" | "sponsor";
    text: string;
    date: string;
}

export interface MessageThread {
    id: number;
    name: string;
    logo: string;
    sport: string;
    location: string;
    budget: string;
    perks: string[];
    description?: string;
    conditions?: string;
    lastMessage: string;
    lastDate: string;
    messages: MessageEntry[];
}

export async function getMessages(): Promise<MessageThread[]> {
    const res = await fetch("http://localhost:3000/datas/messages.json", {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Erreur lors du chargement des messages");
    return res.json();
}
