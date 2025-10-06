import config from "./config";
import { connectDB } from "./database";
import app from "./app";

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    app.listen(config.PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${config.PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

startServer();
