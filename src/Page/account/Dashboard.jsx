import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
   Package,
   Clock,
   CheckCircle,
   XCircle,
   User,
   ShoppingBag,
} from "lucide-react";

import { getDashboard } from "../../services/authApi";

const Dashboard = () => {
   const [stats, setStats] = useState({
      total_orders: 0,
      pending_orders: 0,
      completed_orders: 0,
      cancelled_orders: 0,
   });

   const [loading, setLoading] = useState(true);

   useEffect(() => {
      fetchDashboard();
   }, []);

   const fetchDashboard = async () => {
      try {
         const data = await getDashboard();
         setStats(data);
      } catch (error) {
         console.log(error);
      } finally {
         setLoading(false);
      }
   };

   if (loading) {
      return <h2>Loading...</h2>;
   }

   return (
      <div>

         <div className="mb-8">

            <h1 className="text-3xl font-bold">
               Welcome Back 👋
            </h1>

            <p className="mt-2 text-gray-500">
               Manage your account and track your orders.
            </p>

         </div>

         <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <StatCard
               title="Total Orders"
               value={stats.total_orders}
               color="bg-blue-500"
               icon={<Package size={26} />}
            />

            <StatCard
               title="Pending"
               value={stats.pending_orders}
               color="bg-yellow-500"
               icon={<Clock size={26} />}
            />

            <StatCard
               title="Delivered"
               value={stats.completed_orders}
               color="bg-green-500"
               icon={<CheckCircle size={26} />}
            />

            <StatCard
               title="Cancelled"
               value={stats.cancelled_orders}
               color="bg-red-500"
               icon={<XCircle size={26} />}
            />

         </div>

         <div className="mt-10 rounded-xl bg-white p-6 shadow">

            <h2 className="mb-6 text-2xl font-semibold">
               Quick Actions
            </h2>

            <div className="grid gap-6 md:grid-cols-3">

               <Link
                  to="/account/profile"
                  className="rounded-lg border p-6 transition hover:border-orange-500 hover:shadow"
               >
                  <User className="mb-3 text-orange-500" size={32} />

                  <h3 className="font-semibold">
                     My Profile
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                     View and update your profile.
                  </p>

               </Link>

               <Link
                  to="/account/orders"
                  className="rounded-lg border p-6 transition hover:border-orange-500 hover:shadow"
               >
                  <Package className="mb-3 text-orange-500" size={32} />

                  <h3 className="font-semibold">
                     My Orders
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                     Track your orders.
                  </p>

               </Link>

               <Link
                  to="/products"
                  className="rounded-lg border p-6 transition hover:border-orange-500 hover:shadow"
               >
                  <ShoppingBag className="mb-3 text-orange-500" size={32} />

                  <h3 className="font-semibold">
                     Continue Shopping
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                     Browse all available books.
                  </p>

               </Link>

            </div>

         </div>

      </div>
   );
};

const StatCard = ({
   title,
   value,
   icon,
   color,
}) => {
   return (
      <div className="rounded-xl bg-white p-6 shadow">

         <div className="flex items-center justify-between">

            <div>

               <p className="text-gray-500">
                  {title}
               </p>

               <h2 className="mt-2 text-3xl font-bold">
                  {value}
               </h2>

            </div>

            <div
               className={`rounded-full p-4 text-white ${color}`}
            >
               {icon}
            </div>

         </div>

      </div>
   );
};

export default Dashboard;