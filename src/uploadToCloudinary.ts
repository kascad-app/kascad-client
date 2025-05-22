export async function uploadToCloudinary(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "kascad_unsigned"); // remplace par ton preset unsigned

    const res = await fetch("https://api.cloudinary.com/v1_1/dw52hoh3p/image/upload", {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error?.message || "Erreur Cloudinary");
    }

    const data = await res.json();
    return data.secure_url; // c'est l'URL publique hébergée de l'image
}