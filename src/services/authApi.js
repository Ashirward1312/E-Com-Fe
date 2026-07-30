import API from "../api/axios";

// Register
export const register = async (userData) => {
    try {
        const response = await API.post("accounts/register/", userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Login
export const login = async (credentials) => {
    try {
        const response = await API.post("accounts/login/", credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get Profile
export const getProfile = async () => {
    try {
        const response = await API.get("accounts/profile/");
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Update Profile
export const updateProfile = async (userData) => {
    try {
        const response = await API.put(
            "accounts/profile/update/",
            userData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;
    } catch (error) {
        throw error;
    }
};

// Refresh Token
export const refreshToken = async (refresh) => {
    try {
        const response = await API.post("accounts/refresh/", {
            refresh,
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getDashboard = async () => {
    const response = await API.get(
        "accounts/dashboard/"
    );

    return response.data;
};