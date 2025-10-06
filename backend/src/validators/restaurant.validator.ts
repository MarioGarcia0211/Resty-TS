import { z } from "zod";

// Crear restaurante
export const createRestaurantSchema = z.object({
  nombre: z
    .string()
    .min(1, { message: "El nombre es obligatorio" })
    .max(50, { message: "El nombre no puede superar los 50 caracteres" }),

  direccion: z
    .string()
    .min(1, { message: "La dirección es obligatoria" })
    .max(50, { message: "La dirección no puede superar los 50 caracteres" }),

  ciudad: z
    .string()
    .min(1, { message: "La ciudad es obligatoria" })
    .max(50, { message: "La ciudad no puede superar los 50 caracteres" }),

  pais: z
    .string()
    .min(1, { message: "El país es obligatorio" })
    .max(50, { message: "El país no puede superar los 50 caracteres" }),

  telefono: z
    .string()
    .regex(/^[0-9]+$/, {
      message: "El teléfono solo debe contener números",
    })
    .optional(),

  activo: z.boolean().optional(),

  logo_url: z
    .string()
    .url({ message: "El logo debe ser una URL válida" })
    .optional()
    .nullable(),
});

// Actualizar restaurante (todos opcionales)
export const updateRestaurantSchema = createRestaurantSchema.partial();

// Inferencia de tipos TS
export type CreateRestaurantInput = z.infer<typeof createRestaurantSchema>;
export type UpdateRestaurantInput = z.infer<typeof updateRestaurantSchema>;
