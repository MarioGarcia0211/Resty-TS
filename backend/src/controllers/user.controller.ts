import { Request, Response } from "express";
import * as userService from "../services/user.service";
import * as uploadService from "../services/upload.service";

//Crear un nuevo usuario
export const createUser = async (req: Request, res: Response) => {
  try {
    if (req.file) {
      req.body.avatar = await uploadService.uploadToCloudinary(
        req.file.buffer,
        "avatarResty"
      );
    }
    const user = await userService.createUser(req.body);
    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// Obtener todos los usuarios
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    return res.json(users);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtener usuario por ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    return res.json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar usuario
export const updateUser = async (req: Request, res: Response) => {
  try {
    if (req.file) {
      req.body.avatar = await uploadService.uploadToCloudinary(req.file.buffer);
    }
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    return res.json(user);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// Eliminar usuario
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    return res.json({ message: "Usuario eliminado correctamente" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
