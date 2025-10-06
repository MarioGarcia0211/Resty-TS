import { Request, Response } from "express";
import * as restaurantService from "../services/restaurant.service";
import * as uploadService from "../services/upload.service";

//Crear un nuevo restaurante
export const createRestaurant = async (req: Request, res: Response) => {
  try {
    if (req.file) {
      req.body.logo_url = await uploadService.uploadToCloudinary(
        req.file.buffer,
        "logoResty"
      );
    }
    const restaurant = await restaurantService.createRestaurant(req.body);
    return res.status(201).json(restaurant);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// Obtener todos los restaurantes
export const getRestaurants = async (_req: Request, res: Response) => {
  try {
    const restaurants = await restaurantService.getRestaurants();
    return res.json(restaurants);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtener restaurante por ID
export const getRestaurantById = async (req: Request, res: Response) => {
  try {
    const restaurant = await restaurantService.getRestaurantById(req.params.id);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurante no encontrado" });
    return res.json(restaurant);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar restaurante
export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    if (req.file) {
      req.body.logo_url = await uploadService.uploadToCloudinary(
        req.file.buffer,
        "logoResty"
      );
    }
    const restaurant = await restaurantService.updateRestaurant(
      req.params.id,
      req.body
    );
    if (!restaurant)
      return res.status(404).json({ message: "Restaurante no encontrado" });
    return res.json(restaurant);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// Eliminar restaurante
export const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await restaurantService.deleteRestaurant(req.params.id);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurante no encontrado" });
    return res.json({ message: "Restaurante eliminado correctamente" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
