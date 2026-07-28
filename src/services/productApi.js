import API from "../api/axios";

// Get All Products
export const getProducts = async () => {
    try {
        const response = await API.get("products/");
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get Latest Products
export const getLatestProducts = async () => {
    try {
        const response = await API.get("products/latest/");
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get Categories
export const getCategories = async () => {
    try {
        const response = await API.get("products/categories/");
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get Product Detail
export const getProductDetail = async (id) => {
    try {
        const response = await API.get(`products/${id}/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};