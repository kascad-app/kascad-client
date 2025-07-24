import { useRef } from "react";
import { ImageDto, TempImage } from "@kascad-app/shared-types";

export default function ProfileImagesManager({
  currentImages,
  setCurrentImages,
  imageFiles,
  setImageFiles,
}: {
  currentImages: ImageDto[];
  setCurrentImages: React.Dispatch<React.SetStateAction<ImageDto[]>>;
  imageFiles: TempImage[];
  setImageFiles: React.Dispatch<React.SetStateAction<TempImage[]>>;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleMarkToDelete(index: number) {
    setCurrentImages((imgs) =>
      imgs.map((img, i) =>
        i === index ? { ...img, isToDelete: !img.isToDelete } : img,
      ),
    );
  }

  function handleRemoveNewImage(index: number) {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function handleAddImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageFiles((prev: TempImage[]) => [
        ...prev,
        { file, preview: reader.result as string },
      ]);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Ma galerie d'images</h3>
      <div className="flex flex-wrap gap-4">
        {/* Images existantes */}
        {currentImages.map((img, idx) => (
          <div
            key={`existing-${idx}`}
            className={`relative group w-60 h-40 rounded overflow-hidden shadow ${
              img.isToDelete ? "opacity-50 grayscale" : ""
            }`}
          >
            <img
              src={img.url}
              alt={`Profil ${idx + 1}`}
              className="object-cover w-full h-full"
            />
            <button
              type="button"
              onClick={() => handleMarkToDelete(idx)}
              className="!absolute top-2 right-2 bg-white/80 rounded-full p-1 z-10 cursor-pointer"
              title={img.isToDelete ? "Annuler la suppression" : "Supprimer"}
            >
              {img.isToDelete ? (
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 14l-4-4 4-4"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 10h7a4 4 0 110 8h-1"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
            {img.isToDelete && (
              <span className="!absolute bottom-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                À supprimer
              </span>
            )}
          </div>
        ))}
        {/* Nouvelles images (preview) */}
        {imageFiles.map((img, idx) => (
          <div
            key={`new-${idx}`}
            className="relative group w-60 h-40 rounded overflow-hidden shadow ring-2 ring-primary-green ring-offset-2"
          >
            <img
              src={img.preview}
              alt={`Nouvelle ${idx + 1}`}
              className="object-cover w-full h-full"
            />
            <button
              type="button"
              onClick={() => handleRemoveNewImage(idx)}
              className="!absolute top-2 right-2 bg-white/80 rounded-full p-1 z-10 cursor-pointer"
              title="Supprimer"
            >
              <svg
                className="w-5 h-5 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <span className="absolute bottom-2 left-2 bg-primary-green text-white text-xs px-2 py-1 rounded">
              Nouvelle
            </span>
          </div>
        ))}
        {/* Zone d'ajout */}
        <label className="flex flex-col items-center justify-center w-60 h-40 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-primary-green transition">
          <span className="text-gray-400 text-3xl">+</span>
          <span className="text-xs text-gray-500 mt-1">Ajouter</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAddImage}
          />
        </label>
      </div>
    </div>
  );
}
