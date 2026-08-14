import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import adminApi from "../../services/adminApi";

const Orders = () => {
   const [orders, setOrders] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      fetchOrders();
   }, []);

   const fetchOrders = async () => {
      try {
         const data = await adminApi.getOrders();
         setOrders(data);
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
         <div className="mb-7">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1C33]">
               Orders
            </h1>
            <p className="text-gray-500 text-sm mt-1">
               View and manage all customer orders
            </p>
         </div>

         {/* Table */}
         <div className="overflow-x-auto rounded-2xl shadow-sm border border-gray-200">
            <table className="min-w-full bg-white text-sm">

               <thead className="bg-[#0B1C33] text-white">
                  <tr>
                     <th className="px-4 py-4 text-left whitespace-nowrap">Order ID</th>
                     <th className="px-4 py-4 text-left whitespace-nowrap">Total</th>
                     <th className="px-4 py-4 text-left whitespace-nowrap">Payment</th>
                     <th className="px-4 py-4 text-left whitespace-nowrap">Status</th>
                     <th className="px-4 py-4 text-left whitespace-nowrap">Date</th>
                     <th className="px-4 py-4 text-center whitespace-nowrap">Action</th>
                  </tr>
               </thead>

               <tbody>
                  {orders.length === 0 ? (
                     <tr>
                        <td colSpan="6" className="py-10 text-center text-gray-500">
                           No orders found.
                        </td>
                     </tr>
                  ) : (
                     orders.map((order) => (
                        <tr
                           key={order.id}
                           className="border-b hover:bg-gray-50 transition"
                        >

                           <td className="px-4 py-4 font-medium text-[#0B1C33] whitespace-nowrap">
                              #{order.order_id}
                           </td>

                           <td className="px-4 py-4 font-semibold text-[#0B1C33] whitespace-nowrap">
                              ₹ {order.final_price}
                           </td>

                           <td className="px-4 py-4 capitalize text-gray-600 whitespace-nowrap">
                              {order.payment_status}
                           </td>

                           <td className="px-4 py-4 whitespace-nowrap">
                              <span
                                 className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    order.status === "delivered"
                                       ? "bg-green-100 text-green-700"
                                       : order.status === "shipped"
                                       ? "bg-blue-100 text-blue-700"
                                       : order.status === "cancelled"
                                       ? "bg-red-100 text-red-600"
                                       : "bg-yellow-100 text-yellow-700"
                                 }`}
                              >
                                 {order.status}
                              </span>
                           </td>

                           <td className="px-4 py-4 text-gray-600 whitespace-nowrap">
                              {new Date(order.created_at).toLocaleDateString()}
                           </td>

                           <td className="px-4 py-4 text-center">
                              <Link
                                 to={`/admin/orders/${order.order_id}`}
                                 className="inline-flex items-center justify-center p-2 rounded-md hover:bg-indigo-50 transition"
                              >
                                 <Eye size={18} className="text-indigo-600" />
                              </Link>
                           </td>

                        </tr>
                     ))
                  )}
               </tbody>

            </table>
         </div>

      </div>
   );
};

export default Orders;