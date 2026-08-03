import API from "../api/axios";

const adminApi = {


    // ==========================
    // Users
    // ==========================

    async getUsers() {
        const response = await API.get("accounts/admin/users/");
        return response.data;
    },

    async getUser(id) {
        const response = await API.get(`accounts/admin/users/${id}/`);
        return response.data;
    },

    async updateUser(id, data) {
        const response = await API.put(
            `accounts/admin/users/${id}/`,
            data
        );

        return response.data;
    },

    async deleteUser(id) {
        const response = await API.delete(
            `accounts/admin/users/${id}/`
        );

        return response.data;
    },
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
    async getPublicCategories() {
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

    // ==========================
    // Categories
    // ==========================

    async getCategories() {
        const response = await API.get(
            "products/admin/categories/"
        );
        return response.data;
    },

    async createCategory(data) {
        const response = await API.post(
            "products/admin/categories/",
            data
        );

        return response.data;
    },

    async updateCategory(id, data) {
        const response = await API.put(
            `products/admin/categories/${id}/`,
            data
        );

        return response.data;
    },

    async deleteCategory(id) {
        const response = await API.delete(
            `products/admin/categories/${id}/`
        );

        return response.data;
    },

};


export default adminApi;