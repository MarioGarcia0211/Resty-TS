import dotenv from "dotenv";
dotenv.config();

const {
  PORT,
  NODE_ENV,
  MONGODB_HOST,
  MONGO_DATABASE,
  MONGODB_URI,
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  JWT_EXPIRES,
  JWT_REFRESH_EXPIRES,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;

// Función para obtener la URI de Mongo
const getMongoURI = (): string => {
  if (NODE_ENV === "atlas") {
    if (MONGODB_URI && MONGODB_URI.trim() !== "") {
      return MONGODB_URI;
    }
    throw new Error("No se encontró MONGODB_URI en .env para Atlas");
  }

  if (!MONGODB_HOST || !MONGO_DATABASE) {
    throw new Error("Faltan variables de entorno para Mongo Local");
  }

  return `mongodb://${MONGODB_HOST}:27017/${MONGO_DATABASE}`;
};

export default {
  PORT: PORT ? Number(PORT) : 4000,
  NODE_ENV: NODE_ENV || "local",

  // Mongo
  MONGO_URI: getMongoURI(),

  // JWT
  JWT_SECRET: JWT_SECRET || "",
  JWT_REFRESH_SECRET: JWT_REFRESH_SECRET || "",
  JWT_EXPIRES: JWT_EXPIRES || "15m",
  JWT_REFRESH_EXPIRES: JWT_REFRESH_EXPIRES || "7d",

  // Cloudinary
  CLOUDINARY: {
    CLOUD_NAME: CLOUDINARY_CLOUD_NAME || "",
    API_KEY: CLOUDINARY_API_KEY || "",
    API_SECRET: CLOUDINARY_API_SECRET || "",
  },
};
