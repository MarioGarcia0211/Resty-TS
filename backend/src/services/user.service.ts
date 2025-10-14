import { User, IUser } from "../models/user.model";
import bcrypt from "bcryptjs";

// Crear un nuevo usuario
export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
  // Validar email duplicado
  if (userData.email) {
    const existingEmail = await User.findOne({ email: userData.email });
    if (existingEmail) {
      throw new Error("El correo electrónico ya está registrado");
    }
  }

  // Validar número de documento duplicado
  if (userData.numeroDocumento) {
    const existingDocumento = await User.findOne({
      numeroDocumento: userData.numeroDocumento,
    });
    if (existingDocumento) {
      throw new Error("El número de documento ya está registrado");
    }
  }

  // Validar que admin y mesero siempre tengan restaurante asignado
  if (userData.rol === "admin" || userData.rol === "mesero") {
    if (!userData.restaurante) {
      throw new Error(`Un ${userData.rol} debe pertenecer a un restaurante`);
    }
  }

  // Hashear contraseña
  if (userData.contrasena) {
    const salt = await bcrypt.genSalt(10);
    userData.contrasena = await bcrypt.hash(userData.contrasena, salt);
  }

  const user = new User(userData);
  return await user.save();
};

// Obtener todos los usuarios
export const getUsers = async (): Promise<IUser[]> => {
  return await User.find()
    .select("-contrasena")
    .populate("restaurante", "nombre");
};

// Obtener usuario por ID
export const getUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id)
    .select("-contrasena")
    .populate("restaurante", "nombre");
};

// Actualizar usuario
export const updateUser = async (
  id: string,
  updates: Partial<IUser>
): Promise<IUser | null> => {
  // Validar email duplicado (si se intenta cambiar)
  if (updates.email) {
    const existingEmail = await User.findOne({
      email: updates.email,
      _id: { $ne: id },
    });
    if (existingEmail) {
      throw new Error("El correo electrónico ya está en uso por otro usuario");
    }
  }

  // Validar número de documento duplicado (si se intenta cambiar)
  if (updates.numeroDocumento) {
    const existingDocumento = await User.findOne({
      numeroDocumento: updates.numeroDocumento,
      _id: { $ne: id },
    });
    if (existingDocumento) {
      throw new Error("El número de documento ya está en uso por otro usuario");
    }
  }
  // Validar que admin y mesero siempre tengan restaurante asignado
  if (updates.rol === "admin" || updates.rol === "mesero") {
    if (!updates.restaurante) {
      throw new Error(`Un ${updates.rol} debe pertenecer a un restaurante`);
    }
  }

  // Rehashear contraseña si se actualiza
  if (updates.contrasena) {
    const salt = await bcrypt.genSalt(10);
    updates.contrasena = await bcrypt.hash(updates.contrasena, salt);
  }

  return await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
};

// Eliminar usuario
export const deleteUser = async (id: string): Promise<IUser | null> => {
  return await User.findByIdAndDelete(id);
};
