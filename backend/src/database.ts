import mongoose from "mongoose";
import config from "./config";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.MONGO_URI, {
      autoIndex: true,
      maxPoolSize: 10,
    });

    console.log(`Conectado a MongoDB (${config.NODE_ENV})`);
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1);
  }
};
