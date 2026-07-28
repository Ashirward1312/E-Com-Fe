import API from "../api/axios";

// View Cart
export const getCart = async () => {
    try {
        const response = await API.get("cart/");
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Add To Cart
export const addToCart = async (productId, quantity = 1) => {
    try {
        const response = await API.post("cart/add/", {
            product_id: productId,
            quantity,
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

// Update Cart Item
export const updateCartItem = async (itemId, quantity) => {
    try {
        const response = await API.put(`cart/item/${itemId}/`, {
            quantity,
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

// Remove Cart Item
export const removeCartItem = async (itemId) => {
    try {
        const response = await API.delete(`cart/item/${itemId}/delete/`);

        return response.data;
    } catch (error) {
        throw error;
    }
};

// Clear Cart
export const clearCart = async () => {
    try {
        const response = await API.delete("cart/clear/");

        return response.data;
    } catch (error) {
        throw error;
    }
};



export const syncCart = async (items) => {
    const { data } = await API.post("/cart/sync/", {
        items,
    });

    return data;
};