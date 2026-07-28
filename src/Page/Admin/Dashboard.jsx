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
            <div className="flex items-center justify-center h-screen">
                Loading...
            </div>
        );
    }

    return (
        <div className="space-y-8">

            <div>
                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>

                <p className="text-gray-500">
                    Welcome to Admin Dashboard
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between">

                    <div>

                        <p className="text-gray-500">
                            Products
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            {dashboard.total_products}
                        </h2>

                    </div>

                    <Package
                        size={42}
                        className="text-indigo-600"
                    />

                </div>

                <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between">

                    <div>

                        <p className="text-gray-500">
                            Orders
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            {dashboard.total_orders}
                        </h2>

                    </div>

                    <ShoppingCart
                        size={42}
                        className="text-orange-500"
                    />

                </div>

                <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between">

                    <div>

                        <p className="text-gray-500">
                            Users
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            {dashboard.total_users}
                        </h2>

                    </div>

                    <Users
                        size={42}
                        className="text-green-600"
                    />

                </div>

                <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between">

                    <div>

                        <p className="text-gray-500">
                            Revenue
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            ₹ {dashboard.total_revenue}
                        </h2>

                    </div>

                    <IndianRupee
                        size={42}
                        className="text-red-500"
                    />

                </div>

            </div>

        </div>
    );
};

export default Dashboard;