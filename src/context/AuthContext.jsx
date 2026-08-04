import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import {
    login as loginUser,
    getProfile,
} from "../services/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    const isTokenExpired = (token) => {

        try {

            const decoded = jwtDecode(token);

            return decoded.exp * 1000 < Date.now();

        } catch {

            return true;

        }

    };

    const clearAuth = () => {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        setUser(null);

    };

    const loadUser = async () => {

        const token = localStorage.getItem("access");

        if (!token) {

            setLoading(false);
            return;

        }

        if (isTokenExpired(token)) {

            clearAuth();

            setLoading(false);

            return;

        }

        try {

            const userData = await getProfile();

            setUser(userData);

        } catch (error) {

            console.error(error);

            clearAuth();

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

            localStorage.setItem(
                "access",
                data.access
            );

            localStorage.setItem(
                "refresh",
                data.refresh
            );

            const userData = await getProfile();

            setUser(userData);

            return {
                success: true,
                user: userData,
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

        clearAuth();

        window.location.href = "/";

    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,

                loading,

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