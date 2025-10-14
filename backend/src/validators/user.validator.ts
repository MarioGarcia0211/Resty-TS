import { z } from "zod";
import { ROLES, TIPO_DOCUMENTOS } from "../constants/enums";

// Crear Usuario
export const createUserSchema = z.object({
  nombre: z
    .string()
    .min(1, { message: "El nombre es obligatorio" })
    .max(50, { message: "El nombre no puede superar los 50 caracteres" }),

  apellido: z
    .string()
    .min(1, { message: "El apellido es obligatorio" })
    .max(50, { message: "El apellido no puede superar los 50 caracteres" }),

  email: z
    .string()
    .email({ message: "El correo debe tener un formato válido" }),

  contrasena: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),

  rol: z.enum(ROLES, {
    message: `El rol debe ser uno de: ${ROLES.join(", ")}`,
  }),

  restaurante: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, {
      message: "El restaurante debe ser un ObjectId válido",
    })
    .optional()
    .nullable(),

  tipoDocumento: z.enum(TIPO_DOCUMENTOS, {
    message: `El tipo de documento debe ser uno de: ${TIPO_DOCUMENTOS.join(
      ", "
    )}`,
  }),

  numeroDocumento: z.string().superRefine((value, ctx) => {
    if (!value || value.length < 4) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "El número de documento debe tener al menos 4 dígitos",
      });
      return;
    }

    if (!/^[0-9]+$/.test(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "El número de documento debe contener solo números",
      });
    }

    if (value.length > 12) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "El número de documento no puede superar los 12 dígitos",
      });
    }
  }),

  telefono: z
    .string()
    .regex(/^[0-9]+$/, {
      message: "El teléfono solo debe contener números",
    })
    .optional(),

  activo: z.boolean().optional(),

  avatar: z
    .string()
    .url({ message: "El avatar debe ser una URL válida" })
    .optional()
    .nullable(),
});

// Actualizar Usuario (todos opcionales)
export const updateUserSchema = createUserSchema.partial();

// Inferencia de tipos TS
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
