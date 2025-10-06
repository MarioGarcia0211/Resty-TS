import { Restaurant, IRestaurant } from "../models/restaurant.model";

//Crear un nuevo restaurante
export const createRestaurant = async (
  restaurantData: Partial<IRestaurant>
): Promise<IRestaurant> => {
  const restaurant = new Restaurant(restaurantData);
  return await restaurant.save();
};

//Obtener todos los restaurantes
export const getRestaurants = async (): Promise<IRestaurant[]> => {
  return await Restaurant.find();
};

//Obtener restaurante por ID
export const getRestaurantById = async (
  id: string
): Promise<IRestaurant | null> => {
  return await Restaurant.findById(id);
};

//Actualizar restaurante
export const updateRestaurant = async (
  id: string,
  updates: Partial<IRestaurant>
): Promise<IRestaurant | null> => {
  return await Restaurant.findByIdAndUpdate(id, updates, { new: true });
};

//Eliminar restaurante
export const deleteRestaurant = async (
  id: string
): Promise<IRestaurant | null> => {
  return await Restaurant.findByIdAndDelete(id);
};
