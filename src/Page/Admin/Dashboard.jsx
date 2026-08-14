import { useEffect, useState } from "react";
import adminApi from "../../services/adminApi";
import {
    Package,
    ShoppingCart,
    Users,
    IndianRupee,
} from "lucide-react";

const Dashboard = () => {

    const [dashboard, setDashboard] = useState({
        total_products: 0,
        total_orders: 0,
        total_users: 0,
        total_revenue: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const data = await adminApi.getDashboard();
            setDashboard(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20 text-lg font-semibold text-gray-500">
                Loading...
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-8">

            {/* Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1C33]">
                    Dashboard
                </h1>
                <p className="text-gray-500 mt-1 text-sm sm:text-base">
                    Welcome to Admin Dashboard
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">

                {/* Products */}
                <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                        <p className="text-gray-500 text-xs sm:text-sm">Products</p>
                        <h2 className="text-2xl sm:text-3xl font-bold mt-1 text-[#0B1C33]">
                            {dashboard.total_products}
                        </h2>
                    </div>
                    <div className="p-2.5 rounded-xl bg-indigo-50 shrink-0">
                        <Package size={24} className="text-indigo-600" />
                    </div>
                </div>

                {/* Orders */}
                <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                        <p className="text-gray-500 text-xs sm:text-sm">Orders</p>
                        <h2 className="text-2xl sm:text-3xl font-bold mt-1 text-[#0B1C33]">
                            {dashboard.total_orders}
                        </h2>
                    </div>
                    <div className="p-2.5 rounded-xl bg-orange-50 shrink-0">
                        <ShoppingCart size={24} className="text-orange-500" />
                    </div>
                </div>

                {/* Users */}
                <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                        <p className="text-gray-500 text-xs sm:text-sm">Users</p>
                        <h2 className="text-2xl sm:text-3xl font-bold mt-1 text-[#0B1C33]">
                            {dashboard.total_users}
                        </h2>
                    </div>
                    <div className="p-2.5 rounded-xl bg-green-50 shrink-0">
                        <Users size={24} className="text-green-600" />
                    </div>
                </div>

                {/* Revenue */}
                <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                        <p className="text-gray-500 text-xs sm:text-sm">Revenue</p>
                        <h2 className="text-xl sm:text-2xl font-bold mt-1 text-[#0B1C33] truncate">
                            ₹ {dashboard.total_revenue}
                        </h2>
                    </div>
                    <div className="p-2.5 rounded-xl bg-red-50 shrink-0">
                        <IndianRupee size={24} className="text-red-500" />
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Dashboard;