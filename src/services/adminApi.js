import API from "../api/axios";

const adminApi = {

    // Dashboard
    async getDashboard() {
        const response = await API.get(
            "orders/admin/dashboard/"
        );

        return response.data;
    },
    // Products
    async getProducts() {
        const response = await API.get("products/");
        return response.data;
    },

    async getProduct(id) {
        const response = await API.get(`products/${id}/`);
        return response.data;
    },

    async addProduct(productData) {
        const response = await API.post(
            "products/",
            productData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;
    },

    async updateProduct(id, productData) {
        const response = await API.put(
            `products/${id}/`,
            productData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;
    },

    async deleteProduct(id) {
        const response = await API.delete(
            `products/${id}/`
        );

        return response.data;
    },

    // Categories
    async getCategories() {
        const response = await API.get(
            "products/categories/"
        );

        return response.data;
    },

    // Orders
    async getOrders() {
        const response = await API.get(
            "orders/admin/"
        );

        return response.data;
    },

    async getOrder(orderId) {
        const response = await API.get(
            `orders/admin/${orderId}/`
        );

        return response.data;
    },

    async updateOrderStatus(orderId, status) {
        const response = await API.patch(
            `orders/admin/${orderId}/status/`,
            {
                status,
            }
        );

        return response.data;
    },

    // Coupons
    async getCoupons() {
        const response = await API.get(
            "products/admin/coupons/"
        );

        return response.data;
    },

    async addCoupon(couponData) {
        const response = await API.post(
            "products/admin/coupons/",
            couponData
        );

        return response.data;
    },

};

export default adminApi;