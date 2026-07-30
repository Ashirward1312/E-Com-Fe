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
         <div className="p-8">
            Loading...
         </div>
      );
   }

   return (
      <div className="p-8">

         {/* Header */}
         <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0B1C33]">
               Orders
            </h1>
         </div>

         {/* Table */}
         <div className="bg-white border border-gray-200 rounded-lg">

            <table className="w-full text-sm">

               <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wide">
                  <tr>
                     <th className="px-6 py-4 text-left font-semibold">
                        Order ID
                     </th>
                     <th className="px-6 py-4 text-left font-semibold">
                        Customer
                     </th>
                     <th className="px-6 py-4 text-left font-semibold">
                        Phone
                     </th>
                     <th className="px-6 py-4 text-left font-semibold">
                        Total
                     </th>
                     <th className="px-6 py-4 text-left font-semibold">
                        Payment
                     </th>
                     <th className="px-6 py-4 text-left font-semibold">
                        Status
                     </th>
                     <th className="px-6 py-4 text-left font-semibold">
                        Date
                     </th>
                     <th className="px-6 py-4 text-center font-semibold">
                        Action
                     </th>
                  </tr>
               </thead>

               <tbody>

                  {orders.length === 0 ? (

                     <tr>
                        <td
                           colSpan="8"
                           className="py-8 text-center text-gray-500"
                        >
                           No orders found.
                        </td>
                     </tr>

                  ) : (

                     orders.map((order) => (

                        <tr
                           key={order.id}
                           className="border-t hover:bg-gray-50 transition"
                        >

                           <td className="px-6 py-4 font-medium text-[#0B1C33]">
                              {order.order_id}
                           </td>

                           <td className="px-6 py-4 text-gray-700">
                              {order.full_name}
                           </td>

                           <td className="px-6 py-4 text-gray-600">
                              {order.phone}
                           </td>

                           <td className="px-6 py-4 font-semibold text-[#0B1C33]">
                              ₹ {order.final_price}
                           </td>

                           <td className="px-6 py-4 capitalize text-gray-600">
                              {order.payment_status}
                           </td>

                           <td className="px-6 py-4 capitalize">
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

                           <td className="px-6 py-4 text-gray-600">
                              {new Date(
                                 order.created_at
                              ).toLocaleDateString()}
                           </td>

                           <td className="px-6 py-4 text-center">

                              <Link
                                 to={`/admin/orders/${order.order_id}`}
                                 className="inline-flex items-center justify-center p-2 rounded-md hover:bg-indigo-50 transition"
                              >
                                 <Eye
                                    size={18}
                                    className="text-indigo-600"
                                 />
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