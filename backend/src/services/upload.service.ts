import cloudinary from "../libs/cloudinary";

export const uploadToCloudinary = (
  fileBuffer: Buffer,
  folder = "avatars"
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        if (!result)
          return reject(new Error("No se recibió respuesta de Cloudinary"));
        resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};
