import { CONFIG } from "../config/config";

export const cloudinaryService = {
  async uploadImage(file, onProgress) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CONFIG.CLOUDINARY_UPLOAD_PRESET);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable && onProgress) {
          const percentComplete = (e.loaded / e.total) * 100;
          onProgress(percentComplete);
        }
      });

      xhr.addEventListener("load", () => {
        try {
          const response = JSON.parse(xhr.responseText);

          if (xhr.status === 200) {
            resolve(response);
          } else {
            console.error("Cloudinary error:", response);
            reject(
              new Error(response?.error?.message || "Cloudinary upload failed")
            );
          }
        } catch {
          reject(new Error("Invalid Cloudinary response"));
        }
      });

      xhr.addEventListener("error", () =>
        reject(new Error("Network error"))
      );

      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${CONFIG.CLOUDINARY_CLOUD_NAME}/image/upload`
      );
      xhr.send(formData);
    });
  },
};
