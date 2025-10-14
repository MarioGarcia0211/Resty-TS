import mongoose, { Schema, Document, Model } from "mongoose";
import {
  ROLES,
  TIPO_DOCUMENTOS,
  Role,
  TipoDocumento,
} from "./../constants/enums";

export interface IUser extends Document {
  nombre: string;
  apellido: string;
  email: string;
  contrasena: string;
  rol: Role;
  restaurante?: mongoose.Types.ObjectId | null;
  tipoDocumento: TipoDocumento;
  numeroDocumento: string;
  telefono?: string;
  activo: boolean;
  avatar?: string; // URL de Cloudinary
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    apellido: {
      type: String,
      required: [true, "El apellido es obligatorio"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "El correo es obligatorio"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    contrasena: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      trim: true,
    },
    rol: {
      type: String,
      enum: [...ROLES],
      required: [true, "El rol es obligatorio"],
    },
    restaurante: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      default: null,
    },
    tipoDocumento: {
      type: String,
      enum: [...TIPO_DOCUMENTOS],
      required: [true, "El tipo de documento es obligatorio"],
    },
    numeroDocumento: {
      type: String,
      required: [true, "El número de documento es obligatorio"],
      unique: true,
      trim: true,
    },
    telefono: {
      type: String,
      trim: true,
    },
    activo: {
      type: Boolean,
      default: true, // por defecto el usuario está activo
    },
    avatar: {
      type: String,
      default: null, // URL de Cloudinary
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
