import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRestaurant extends Document {
  nombre: string;
  direccion: string;
  ciudad: string;
  pais: string;
  telefono: string;
  activo: boolean;
  logo_url?: string; // URL de Cloudinary
  createdAt?: Date;
  updatedAt?: Date;
}

const restaurantSchema = new Schema<IRestaurant>(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    direccion: {
      type: String,
      required: [true, "La dirección es obligatoria"],
      trim: true,
    },
    ciudad: {
      type: String,
      required: [true, "La ciudad es obligatoria"],
      trim: true,
    },
    pais: {
      type: String,
      required: [true, "El pais es obligatorio"],
      trim: true,
    },
    telefono: {
      type: String,
      required: [true, "El teléfono es obligatorio"],
      trim: true,
    },
    activo: {
      type: Boolean,
      default: true, // por defecto el restaurante está activo
    },
    logo_url: {
      type: String,
      default: null, // URL de Cloudinary
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Restaurant: Model<IRestaurant> = mongoose.model<IRestaurant>(
  "Restaurant",
  restaurantSchema
);
