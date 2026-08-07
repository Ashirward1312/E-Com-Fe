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
      return <div className="p-8">Loading...</div>;
   }

   return (
      <div className="p-8">

         {/* Header */}
         <div className="mb-10">
            <h1 className="text-3xl font-bold text-[#0B1C33]">
               Welcome Back 👋
            </h1>
            <p className="mt-2 text-gray-500">
               Manage your account and track your orders.
            </p>
         </div>

         {/* Stats Grid */}
         <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <StatCard
               title="Total Orders"
               value={stats.total_orders}
               icon={<Package size={22} />}
            />

            <StatCard
               title="Pending"
               value={stats.pending_orders}
               icon={<Clock size={22} />}
            />

            <StatCard
               title="Delivered"
               value={stats.completed_orders}
               icon={<CheckCircle size={22} />}
            />

            <StatCard
               title="Cancelled"
               value={stats.cancelled_orders}
               icon={<XCircle size={22} />}
            />

         </div>

         {/* Quick Actions */}
         <div className="mt-12 border border-gray-200 rounded-lg bg-white p-8">
            <div className="text-center mb-8">
               <h2 className="text-xl font-semibold text-[#0B1C33]">
                  Quick Actions
               </h2>
               <div className="w-16 h-1 bg-[#C8A45A] mx-auto mt-3 rounded-full"></div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">

               <QuickCard
                  to="/products"
                  icon={<ShoppingBag size={28} />}
                  title="Continue Shopping E-Books"
                  desc="Browse all available e-books and study materials."
                  highlight={true}
               />

               <QuickCard
                  to="/account/profile"
                  icon={<User size={22} />}
                  title="My Profile"
                  desc="View and update your profile."
               />

               <QuickCard
                  to="/account/orders"
                  icon={<Package size={22} />}
                  title="My Orders"
                  desc="View your past and current orders."
               />

            </div>

         </div>

      </div>
   );
};

const StatCard = ({ title, value, icon }) => {
   return (
      <div className="border border-gray-200 bg-white rounded-lg p-6 flex items-center justify-between">

         <div>
            <p className="text-gray-500 text-sm">
               {title}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#0B1C33]">
               {value}
            </h2>
         </div>

         <div className="p-3 rounded-md bg-[#C8A45A] text-[#0B1C33]">
            {icon}
         </div>

      </div>
   );
};

const QuickCard = ({ to, icon, title, desc, highlight }) => {
   return (
      <Link
         to={to}
         className={`border rounded-lg p-6 transition-all duration-300 flex flex-col justify-center ${highlight
               ? "bg-gradient-to-br from-[#0B1C33] to-[#1A365D] border-transparent shadow-lg hover:shadow-xl hover:-translate-y-1 transform scale-[1.02]"
               : "border-gray-200 bg-white hover:border-[#C8A45A] hover:shadow-sm"
            }`}
      >
         <div className={`mb-4 ${highlight ? "text-[#C8A45A]" : "text-[#C8A45A]"}`}>
            {icon}
         </div>

         <h3 className={`font-semibold ${highlight ? "text-xl text-white" : "text-[#0B1C33]"}`}>
            {title}
         </h3>

         <p className={`mt-2 text-sm ${highlight ? "text-gray-300" : "text-gray-500"}`}>
            {desc}
         </p>
      </Link>
   );
};

export default Dashboard;