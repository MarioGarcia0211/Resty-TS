export const ROLES = ["superadmin", "admin", "mesero"] as const;
export type Role = (typeof ROLES)[number];

export const TIPO_DOCUMENTOS = ["CC", "TI", "CE", "PASAPORTE"] as const;
export type TipoDocumento = (typeof TIPO_DOCUMENTOS)[number];
