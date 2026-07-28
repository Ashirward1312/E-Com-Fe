import { createContext, useEffect, useState } from "react";
import {
    login as loginUser,
    getProfile,
} from "../services/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const token = localStorage.getItem("access");

        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const userData = await getProfile();

            setUser(userData);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Load User Error:", error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (username, password) => {
        try {
            const data = await loginUser({
                username,
                password,
            });

            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);

            setUser(data.user);
            setIsAuthenticated(true);

            return {
                success: true,
                user: data.user,
            };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.detail ||
                    "Invalid username or password",
            };
        }
    };

    const logout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                isAuthenticated,
                login,
                logout,
                loadUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;