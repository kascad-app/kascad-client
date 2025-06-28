import { useState } from "react";
import { X, Plus, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { OnlineVideo } from "@kascad-app/shared-types";

interface ProfileVideosManagerProps {
  currentVideos: OnlineVideo[];
  setCurrentVideos: React.Dispatch<React.SetStateAction<OnlineVideo[]>>;
}

export default function ProfileVideosManager({
  currentVideos,
  setCurrentVideos,
}: ProfileVideosManagerProps) {
  const [newVideoUrl, setNewVideoUrl] = useState("");

  // Fonction pour extraire l'ID de la vidéo YouTube
  const getYouTubeVideoId = (url: string): string | null => {
    if (!url || typeof url !== "string") return null;
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Fonction pour générer l'URL de la miniature YouTube
  const getYouTubeThumbnail = (url: string): string => {
    if (!url || typeof url !== "string")
      return "/assets/img/placeholder-video.svg";
    const videoId = getYouTubeVideoId(url);
    return videoId
      ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
      : "/assets/img/placeholder-video.svg";
  };

  // Fonction pour valider une URL YouTube
  const isValidYouTubeUrl = (url: string): boolean => {
    if (!url || typeof url !== "string") return false;
    return getYouTubeVideoId(url) !== null;
  };

  const handleAddVideo = () => {
    if (!newVideoUrl.trim()) return;

    if (!isValidYouTubeUrl(newVideoUrl)) {
      alert("Veuillez entrer une URL YouTube valide");
      return;
    }

    if (currentVideos.some((video) => video.url === newVideoUrl)) {
      alert("Cette vidéo est déjà dans votre liste");
      return;
    }

    const newVideo: OnlineVideo = {
      url: newVideoUrl,
      title: "Vidéo YouTube", // Titre par défaut, pourrait être amélioré
      description: "", // Description vide par défaut
    };

    setCurrentVideos((prev) => [...prev, newVideo]);

    console.log("Vidéo ajoutée :", currentVideos);

    setNewVideoUrl("");
  };

  const handleRemoveVideo = (index: number) => {
    setCurrentVideos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddVideo();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Mes vidéos</h3>

      {/* Formulaire d'ajout de vidéo */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="video-url">Ajouter une vidéo YouTube</Label>
        <div className="flex gap-2">
          <Input
            id="video-url"
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            value={newVideoUrl}
            onChange={(e) => setNewVideoUrl(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1"
          />
          <Button
            type="button"
            onClick={handleAddVideo}
            disabled={!newVideoUrl.trim()}
            size="sm"
          >
            <Plus className="w-4 h-4" />
            Ajouter
          </Button>
        </div>
        <p className="text-xs text-gray-500">
          Copiez l'URL d'une vidéo YouTube (ex:
          https://www.youtube.com/watch?v=dQw4w9WgXcQ)
        </p>
      </div>

      {/* Liste des vidéos */}
      {currentVideos.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {currentVideos.map((video, idx) => {
            // Vérification de sécurité pour éviter les erreurs
            if (!video || !video.url) {
              return null;
            }

            const thumbnailUrl = getYouTubeThumbnail(video.url);

            return (
              <div
                key={`video-${idx}`}
                className="relative group w-60 h-36 rounded overflow-hidden shadow-lg bg-white drop-shadow-[0_0_8px_rgba(0,0,0,0.3)]"
              >
                {/* Miniature de la vidéo */}
                <div className="relative w-full h-24 bg-gray-100">
                  <img
                    src={thumbnailUrl}
                    alt={video.title || `Vidéo ${idx + 1}`}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      e.currentTarget.src = "/assets/img/placeholder-video.svg";
                    }}
                  />
                  {/* Overlay de lecture */}
                  <Link
                    href={video.url}
                    target="_blank"
                    className="absolute inset-0"
                  >
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Actions */}
                <div className="p-2 flex items-center justify-between">
                  <span className="text-xs text-gray-600 truncate flex-1">
                    {video.title || "Vidéo YouTube"}
                  </span>
                  <div className="flex gap-1">
                    {/* Bouton pour ouvrir la vidéo */}
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => window.open(video.url, "_blank")}
                      title="Voir la vidéo"
                      className="h-6 w-6 p-0"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                    {/* Bouton de suppression */}
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveVideo(idx)}
                      title="Supprimer"
                      className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">🎬</div>
          <p>Aucune vidéo ajoutée pour le moment</p>
          <p className="text-xs">
            Ajoutez des liens YouTube pour mettre en valeur vos performances
          </p>
        </div>
      )}
    </div>
  );
}
