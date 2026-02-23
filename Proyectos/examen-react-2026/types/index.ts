// === ENTIDADES ===

export interface Incident {
  id: number;
  title: string;
  description: string;
  priority: "alta" | "media" | "baja";
  status: "abierta" | "resuelta";
  createdAt: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
}

// === RESPUESTAS DEL BACKEND ===

export interface AuthResponse {
  ok: boolean;
  data?: {
    user: User;
    token: string;
  };
  error?: string;
}

export interface IncidentsResponse {
  ok: boolean;
  data?: Incident[];
  error?: string;
}

export interface IncidentResponse {
  ok: boolean;
  data?: Incident;
  error?: string;
}

export interface MessageResponse {
  ok: boolean;
  message?: string;
  error?: string;
}

// === DTOs (datos que envías al backend) ===

export interface LoginDTO {
  email: string;
  password: string;
}

export interface CreateIncidentDTO {
  title: string;
  description: string;
  priority: "alta" | "media" | "baja";
}
