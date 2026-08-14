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
      return (
         <div className="flex justify-center items-center py-20 text-lg font-semibold text-gray-500">
            Loading...
         </div>
      );
   }

   return (
      <div className="p-4 sm:p-6 lg:p-8">

         {/* Header */}
         <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1C33]">
               Welcome Back 👋
            </h1>
            <p className="mt-2 text-gray-500 text-sm sm:text-base">
               Manage your account.
            </p>
         </div>

         {/* Stats Grid */}
         <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">

            <StatCard
               title="Total Orders"
               value={stats.total_orders}
               icon={<Package size={20} />}
            />

            <StatCard
               title="Pending"
               value={stats.pending_orders}
               icon={<Clock size={20} />}
            />

            <StatCard
               title="Delivered"
               value={stats.completed_orders}
               icon={<CheckCircle size={20} />}
            />

            <StatCard
               title="Cancelled"
               value={stats.cancelled_orders}
               icon={<XCircle size={20} />}
            />

         </div>

         {/* Quick Actions */}
         <div className="mt-10 border border-gray-200 rounded-xl bg-white p-5 sm:p-8">
            <div className="text-center mb-6">
               <h2 className="text-lg sm:text-xl font-semibold text-[#0B1C33]">
                  Quick Actions
               </h2>
               <div className="w-16 h-1 bg-[#C8A45A] mx-auto mt-3 rounded-full"></div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

               <QuickCard
                  to="/books"
                  icon={<ShoppingBag size={26} />}
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
      <div className="border border-gray-200 bg-white rounded-xl p-4 sm:p-6 flex items-center justify-between gap-3">

         <div className="min-w-0">
            <p className="text-gray-500 text-xs sm:text-sm truncate">
               {title}
            </p>
            <h2 className="mt-1 text-xl sm:text-2xl font-bold text-[#0B1C33]">
               {value}
            </h2>
         </div>

         <div className="p-2.5 sm:p-3 rounded-lg bg-[#C8A45A] text-[#0B1C33] shrink-0">
            {icon}
         </div>

      </div>
   );
};

const QuickCard = ({ to, icon, title, desc, highlight }) => {
   return (
      <Link
         to={to}
         className={`border rounded-xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-center ${
            highlight
               ? "bg-gradient-to-br from-[#0B1C33] to-[#1A365D] border-transparent shadow-lg hover:shadow-xl hover:-translate-y-1 transform"
               : "border-gray-200 bg-white hover:border-[#C8A45A] hover:shadow-sm"
         }`}
      >
         <div className={`mb-3 ${highlight ? "text-[#C8A45A]" : "text-[#C8A45A]"}`}>
            {icon}
         </div>

         <h3 className={`font-semibold text-sm sm:text-base ${highlight ? "text-white" : "text-[#0B1C33]"}`}>
            {title}
         </h3>

         <p className={`mt-1.5 text-xs sm:text-sm ${highlight ? "text-gray-300" : "text-gray-500"}`}>
            {desc}
         </p>
      </Link>
   );
};

export default Dashboard;