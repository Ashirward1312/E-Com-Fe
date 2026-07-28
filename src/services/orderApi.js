import API from "../api/axios";

// Checkout
export const checkout = async (orderData) => {
    try {
        const response = await API.post("orders/checkout/", orderData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// My Orders
export const getMyOrders = async () => {
    try {
        const response = await API.get("orders/");
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Order Detail
export const getOrderDetail = async (orderId) => {
    try {
        const response = await API.get(`orders/${orderId}/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Cancel Order
export const cancelOrder = async (orderId) => {
    try {
        const response = await API.post(
            `orders/${orderId}/cancel/`
        );

        return response.data;
    } catch (error) {
        throw error;
    }
};