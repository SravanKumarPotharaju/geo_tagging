// export const CONFIG = {
//   CLOUDINARY_CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
//   CLOUDINARY_UPLOAD_PRESET: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,

//   USER_EMAIL: import.meta.env.VITE_USER_EMAIL || "user@example.com",
//   API_BASE_URL: "https://api.alumnx.com/api/hackathons",
//   MAX_FILE_SIZE: 10 * 1024 * 1024,
//   ALLOWED_FILE_TYPES: ["image/jpeg", "image/jpg", "image/png"],
// };




export const CONFIG = {
  API_BASE_URL: "https://api.alumnx.com/api/hackathons",
  USER_EMAIL: "shravan3246@gmail.com", //  EMAIL
  CLOUDINARY_CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME, // From Cloudinary dashboard
  CLOUDINARY_UPLOAD_PRESET: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET, // From Cloudinary settings
  MAX_FILE_SIZE: 10 * 1024 * 1024,
  ALLOWED_FILE_TYPES: ["image/jpeg", "image/jpg", "image/png"],
};