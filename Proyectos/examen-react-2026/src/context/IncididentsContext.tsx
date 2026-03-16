import React, { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Incident, CreateIncidentDTO } from '../types';
import { getIncidents, createIncident, deleteIncident } from '../services/api';
import { useAuth } from './AuthContext';
// Definimos la forma de nuestro contexto
interface IncidentsContextType {
    incidents: Incident[];
    loading: boolean;
    fetchIncidents: () => Promise<void>;
    addIncident: (incident: CreateIncidentDTO) => Promise<void>;
    removeIncident: (id: number) => Promise<void>;
}
// Creamos el contexto
const IncidentsContext = createContext<IncidentsContextType | undefined>(undefined);
export function IncidentsProvider({ children }: { children: ReactNode }) {
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    
    // Obtenemos el token desde el AuthContext para poder enviarlo
    const { token } = useAuth();
    // Función para obtener las incidencias
    const fetchIncidents = async () => {
        setLoading(true);
        try {
            const response = await getIncidents();
            // response.data contiene el array de incidencias
            if (response.data) {
                setIncidents(response.data);
            }
        } catch (error) {
            console.error("Error al obtener las incidencias:", error);
        } finally {
            setLoading(false);
        }
    };
    // Función para añadir una incidencia
    const addIncident = async (incident: CreateIncidentDTO) => {
        if (!token) throw new Error("No hay un token de autenticación");
        try {
            await createIncident(token, incident);
            // Volvemos a pedir la lista actualizada al backend
            await fetchIncidents();
        } catch (error) {
            console.error("Error al crear la incidencia:");
            throw error;
        }
    };
    // Función para eliminar una incidencia
    const removeIncident = async (id: number) => {
        if (!token) throw new Error("No hay un token de autenticación");
        try {
            await deleteIncident(token, id);
            // Volvemos a pedir la lista actualizada al backend
            await fetchIncidents();
        } catch (error) {
            console.error("Error al borrar la incidencia:");
            throw error;
        }
    };
    // Cargar las incidencias tras montar el componente
    useEffect(() => {
        fetchIncidents();
    }, []);
    return (
        <IncidentsContext.Provider value={{ incidents, loading, fetchIncidents, addIncident, removeIncident }}>
            {children}
        </IncidentsContext.Provider>
    );
}
// Hook personalizado para usar el contexto
export function useIncidents() {
    const context = useContext(IncidentsContext);
    if (context === undefined) {
        throw new Error("useIncidents debe usarse dentro de un IncidentsProvider");
    }
    return context;
}
