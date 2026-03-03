import React, { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import { login as loginApi, getMe } from '../services/api';

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Al cargar la aplicación, comprobamos si hay sesión
    useEffect(() => {
        const checkSession = async () => {
            const storedToken = localStorage.getItem('token');

            if (storedToken) {
                try {
                    // Llamar a getMe(token) para recuperar los datos del usuario
                    const userData = await getMe(storedToken);
                    setUser(userData);
                    setToken(storedToken);
                } catch (err) {
                    // Si el token ya no es válido, eliminarlo del localStorage
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
                }
            }

            setLoading(false);
        };

        checkSession();
    }, []);

    const login = async (email: string, password: string) => {
        setError(null);
        try {
            const data = await loginApi({ email, password });

            if (!data.data || !data.data.token || !data.data.user) {
                throw new Error("El servidor no ha devuelto un token o usuario válido");
            }

            // guardar el token en localStorage
            localStorage.setItem('token', data.data.token);
            setToken(data.data.token);

            // obtener los datos del usuario
            if (data.data?.user) {
                setUser(data.data.user);
            } else {
                const userData = await getMe(data.data.token);
                setUser(userData);
            }

        } catch (err: any) {
            // Si el login falla, guardar el mensaje de error
            setError("Error al iniciar");
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setError(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Crea un custom hook useAuth() que devuelva el contexto y lance un error si se usa fuera
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
}