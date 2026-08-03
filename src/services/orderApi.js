
// import API from "../api/axios";

// // Checkout
// export const checkout = async () => {
//     try {
//         const response = await API.post("orders/checkout/");
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };

// // My Orders
// export const getMyOrders = async () => {
//     try {
//         const response = await API.get("orders/");
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };

// // Order Detail
// export const getOrderDetail = async (orderId) => {
//     try {
//         const response = await API.get(`orders/${orderId}/`);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };

// // Cancel Order
// export const cancelOrder = async (orderId) => {
//     try {
//         const response = await API.post(
//             `orders/${orderId}/cancel/`
//         );
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };

// // Download E-book
// export const downloadEbook = async (orderItemId) => {
//     try {
//         const response = await API.get(
//             `orders/download/${orderItemId}/`,
//             {
//                 responseType: "blob",
//             }
//         );

//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };

// export const getLibrary = async () => {
//     const response = await API.get("orders/library/");
//     return response.data;
// };


import API from "../api/axios";

export const createPayment = async () => {
    const response = await API.post(
        "orders/create-payment/"
    );

    return response.data;
};

export const verifyPayment = async (data) => {
    const response = await API.post(
        "orders/verify-payment/",
        data
    );

    return response.data;
};

// My Orders
export const getMyOrders = async () => {
    const response = await API.get("orders/");
    return response.data;
};

// Order Detail
export const getOrderDetail = async (orderId) => {
    const response = await API.get(
        `orders/${orderId}/`
    );

    return response.data;
};

// Cancel Order
export const cancelOrder = async (orderId) => {
    const response = await API.post(
        `orders/${orderId}/cancel/`
    );

    return response.data;
};

// Download Ebook
export const downloadEbook = async (orderItemId) => {
    const response = await API.get(
        `orders/download/${orderItemId}/`,
        {
            responseType: "blob",
        }
    );

    return response.data;
};

// Library
export const getLibrary = async () => {
    const response = await API.get(
        "orders/library/"
    );

    return response.data;
};