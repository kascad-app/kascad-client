import { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EventData {
    name: string;
    location: string;
    date: string;
    image: string;
}

interface EventUploaderProps {
    onAdd: (data: any) => void;
    trigger: React.ReactNode;
    mode: "event" | "video" | "image";
}

export default function EventUploader({ onAdd, trigger, mode }: EventUploaderProps) {
    const [open, setOpen] = useState(false);
    const [newEvent, setNewEvent] = useState<EventData>({
        name: "",
        location: "",
        date: "",
        image: "",
    });

    const onDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setNewEvent((prev) => ({ ...prev, image: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: { "image/*": [] },
        multiple: false,
        onDrop,
    });

    const handleSubmit = () => {
        if (mode === "event") {
            const { name, location, date, image } = newEvent;
            if (name && location && date && image) {
                onAdd(newEvent);
                setNewEvent({ name: "", location: "", date: "", image: "" });
                setOpen(false);
            }
        } else if (mode === "video") {
            if (newEvent.image.startsWith("http")) {
                onAdd(newEvent.image);
                setNewEvent({ ...newEvent, image: "" });
                setOpen(false);
            }
        } else if (mode === "image") {
            if (newEvent.image) {
                onAdd(newEvent.image);
                setNewEvent({ ...newEvent, image: "" });
                setOpen(false);
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="max-w-md">
                <h3 className="text-lg font-semibold mb-4">
                    {mode === "event"
                        ? "Ajouter un événement"
                        : mode === "video"
                            ? "Ajouter une vidéo"
                            : "Ajouter une image"}
                </h3>

                <div className="flex flex-col gap-4">
                    {mode === "event" && (
                        <>
                            <div
                                {...getRootProps({
                                    className:
                                        "border border-dashed border-gray-300 p-6 text-center rounded cursor-pointer hover:bg-gray-50",
                                })}
                            >
                                <input {...getInputProps()} />
                                <p className="text-sm text-gray-500">
                                    Glisse une image ici, ou clique pour en sélectionner une
                                </p>
                                {newEvent.image && (
                                    <img
                                        src={newEvent.image}
                                        alt="Preview"
                                        className="mt-4 w-full h-40 object-cover rounded"
                                    />
                                )}
                            </div>
                            <Input
                                placeholder="Nom de l'événement"
                                value={newEvent.name}
                                onChange={(e) =>
                                    setNewEvent((prev) => ({ ...prev, name: e.target.value }))
                                }
                            />
                            <Input
                                placeholder="Lieu"
                                value={newEvent.location}
                                onChange={(e) =>
                                    setNewEvent((prev) => ({ ...prev, location: e.target.value }))
                                }
                            />
                            <Input
                                type="date"
                                value={newEvent.date}
                                onChange={(e) =>
                                    setNewEvent((prev) => ({ ...prev, date: e.target.value }))
                                }
                            />
                        </>
                    )}

                    {mode === "video" && (
                        <Input
                            placeholder="Coller une URL de vidéo YouTube"
                            value={newEvent.image}
                            onChange={(e) =>
                                setNewEvent((prev) => ({ ...prev, image: e.target.value }))
                            }
                        />
                    )}

                    {mode === "image" && (
                        <div
                            {...getRootProps({
                                className:
                                    "border border-dashed border-gray-300 p-6 text-center rounded cursor-pointer hover:bg-gray-50",
                            })}
                        >
                            <input {...getInputProps()} />
                            <p className="text-sm text-gray-500">
                                Glisse une image ici, ou clique pour en sélectionner une
                            </p>
                            {newEvent.image && (
                                <img
                                    src={newEvent.image}
                                    alt="Preview"
                                    className="mt-4 w-full h-40 object-cover rounded"
                                />
                            )}
                        </div>
                    )}

                    <Button onClick={handleSubmit}>Valider</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}