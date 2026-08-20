
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
// export const downloadEbook = async (orderItemId) => {
//     const response = await API.get(
//         `orders/download/${orderItemId}/`,
//         {
//             responseType: "blob",
//         }
//     );

//     return response.data;
// };

export const downloadEbook = async (orderItemId) => {
    try {
        const response = await API.get(
            `orders/download/${orderItemId}/`,
            {
                responseType: "blob",
            }
        );

        return response.data;

    } catch (error) {

        const responseData = error.response?.data;

        if (responseData instanceof Blob) {

            const text = await responseData.text();

            let data;

            try {
                data = JSON.parse(text);
            } catch {
                throw new Error(
                    "Failed to download e-book."
                );
            }

            // Response is directly an array
            if (Array.isArray(data)) {
                throw new Error(
                    data[0] || "Failed to download e-book."
                );
            }

            // Response is { detail: [...] }
            if (Array.isArray(data?.detail)) {
                throw new Error(
                    data.detail[0] || "Failed to download e-book."
                );
            }

            // Response is { detail: "..." }
            if (typeof data?.detail === "string") {
                throw new Error(data.detail);
            }

            throw new Error(
                "Failed to download e-book."
            );
        }

        throw new Error(
            responseData?.detail ||
            "Failed to download e-book."
        );
    }
};
// Library
export const getLibrary = async () => {
    const response = await API.get(
        "orders/library/"
    );

    return response.data;
};