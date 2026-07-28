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
         <div className="p-6">
            Loading...
         </div>
      );
   }

   return (
      <div className="p-6">
         <h1 className="mb-6 text-3xl font-bold">
            Orders
         </h1>

         <div className="overflow-x-auto rounded-xl border bg-white shadow">

            <table className="min-w-full">

               <thead className="border-b bg-gray-50">

                  <tr>

                     <th className="px-6 py-4 text-left">
                        Order ID
                     </th>

                     <th className="px-6 py-4 text-left">
                        Customer
                     </th>

                     <th className="px-6 py-4 text-left">
                        Phone
                     </th>

                     <th className="px-6 py-4 text-left">
                        Total
                     </th>

                     <th className="px-6 py-4 text-left">
                        Payment
                     </th>

                     <th className="px-6 py-4 text-left">
                        Status
                     </th>

                     <th className="px-6 py-4 text-left">
                        Date
                     </th>

                     <th className="px-6 py-4 text-center">
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
                           className="border-b hover:bg-gray-50"
                        >

                           <td className="px-6 py-4">
                              {order.order_id}
                           </td>

                           <td className="px-6 py-4">
                              {order.full_name}
                           </td>

                           <td className="px-6 py-4">
                              {order.phone}
                           </td>

                           <td className="px-6 py-4">
                              ₹{order.final_price}
                           </td>

                           <td className="px-6 py-4 capitalize">
                              {order.payment_status}
                           </td>

                           <td className="px-6 py-4 capitalize">
                              {order.status}
                           </td>

                           <td className="px-6 py-4">
                              {new Date(
                                 order.created_at
                              ).toLocaleDateString()}
                           </td>

                           <td className="px-6 py-4">

                              <div className="flex justify-center">

                                 <Link
                                    to={`/admin/orders/${order.order_id}`}
                                 >
                                    <Eye
                                       size={20}
                                       className="text-indigo-600"
                                    />
                                 </Link>

                              </div>

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