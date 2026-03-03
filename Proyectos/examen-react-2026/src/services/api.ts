
import type { LoginDTO, AuthResponse, User, IncidentsResponse, CreateIncidentDTO, IncidentResponse, MessageResponse } from "../types";

const API_URL = "http://192.168.50.120:1495/api";


export async function login(credentials: LoginDTO): Promise<AuthResponse> {
    // Realizamos la petición al endpoint de login
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST", // Usamos POST porque estamos enviando datos sensibles
        headers: {
            "Content-Type": "application/json", 
        },
      
        body: JSON.stringify(credentials),
    });

    // Comprobamos si la respuesta del servidor es buena
    if (!response.ok) {
        // Si falló, lanzamos un error
        throw new Error("El login ha fallado");
    }

    // Si todo fue bien, convertimos la respuesta JSON del servidor a un objeto de JavaScript y la devolvemos
    return response.json();
}

export async function getMe(token: string): Promise<User> {
    // Realizamos la petición al endpoint de login
    const response = await fetch(`${API_URL}/auth/me`, {
        method: "GET", // con el method get estamos pidiendo datos al servidor en este caso el usuario
        headers: {
            Authorization: `Bearer ${token}`, // con el token estamos identificandonos en el servidor
        },
    });

    // Comprobamos si la respuesta del servidor es buena
    if (!response.ok) {
        // Si falló, lanzamos un error
        throw new Error("Failed to fetch user data");
    }
    // Si todo fue bien
    return response.json();
}

export async function getIncidents(): Promise<IncidentsResponse> {
    // Realizamos la petición al endpoint de incidencias
    const response = await fetch(`${API_URL}/incidents`, {
        method: "GET", // usamos get para traer los datos que queremos del servidor en este caso los incidentes
    });
    // Comprobamos si el servidor contestó bien
    if (!response.ok) {
        throw new Error("No se han podido cargar las incidencias");
    }
    // Devolvemos la lista de incidencias en formato JavaScript
    return response.json();
}

export async function createIncident(token: string, incident: CreateIncidentDTO): Promise<IncidentResponse> {
    // Realizamos la petición al endpoint de incidencias
    const response = await fetch(`${API_URL}/incidents`, {
    method: "POST", // usamos post para enviar datos al servidor en este caso el incidente
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(incident),
  });
// Comprobamos si el servidor contestó bien
  if (!response.ok) {
    throw new Error("error al crear el incidente");
  }
// Devolvemos la lista de incidencias en formato JavaScript
  return response.json();
}

export async function deleteIncident(token: string, id: number): Promise<MessageResponse> {
    // Realizamos la petición al endpoint de incidencias
    const response = await fetch(`${API_URL}/incidents/${id}`, {
    method: "DELETE", // usamos delete para borrar datos 
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Comprobamos si el servidor contestó bien
  if (!response.ok) {
    throw new Error("Error al borrar incidente");
  }
  // Devolvemos la lista de incidencias en formato JavaScript
  return response.json();
}