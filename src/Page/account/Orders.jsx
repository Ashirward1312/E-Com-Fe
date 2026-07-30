import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
   Package,
   Calendar,
   CreditCard,
   ShoppingBag,
   Eye,
} from "lucide-react";

import { getMyOrders } from "../../services/orderApi";

const Orders = () => {
   const [orders, setOrders] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      fetchOrders();
   }, []);

   const fetchOrders = async () => {
      try {
         const data = await getMyOrders();
         setOrders(data);
      } catch (error) {
         console.error(error);
      } finally {
         setLoading(false);
      }
   };

   const getStatusColor = (status) => {
      switch (status) {
         case "placed":
            return "bg-yellow-100 text-yellow-700";

         case "confirmed":
            return "bg-blue-100 text-blue-700";

         case "processing":
            return "bg-indigo-100 text-indigo-700";

         case "shipped":
            return "bg-purple-100 text-purple-700";

         case "delivered":
            return "bg-green-100 text-green-700";

         case "cancelled":
            return "bg-red-100 text-red-700";

         default:
            return "bg-gray-100 text-gray-700";
      }
   };

   const getPaymentColor = (status) => {
      switch (status) {
         case "paid":
            return "bg-green-100 text-green-700";

         case "pending":
            return "bg-orange-100 text-orange-700";

         case "failed":
            return "bg-red-100 text-red-700";

         default:
            return "bg-gray-100 text-gray-700";
      }
   };

   if (loading) {
      return (
         <div className="text-center py-20">
            Loading Orders...
         </div>
      );
   }

   return (
      <div>

         <div className="mb-8">

            <h1 className="text-3xl font-bold">
               My Orders
            </h1>

            <p className="text-gray-500 mt-2">
               View and track all your orders.
            </p>

         </div>

         {orders.length === 0 ? (

            <div className="bg-white rounded-xl shadow p-12 text-center">

               <ShoppingBag
                  size={70}
                  className="mx-auto text-gray-300"
               />

               <h2 className="mt-5 text-2xl font-semibold">
                  No Orders Found
               </h2>

               <p className="text-gray-500 mt-2">
                  You haven't placed any orders yet.
               </p>

               <Link
                  to="/products"
                  className="inline-block mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg"
               >
                  Continue Shopping
               </Link>

            </div>

         ) : (

            <div className="space-y-6">

               {orders.map((order) => (

                  <div
                     key={order.order_id}
                     className="bg-white rounded-xl shadow hover:shadow-lg transition"
                  >

                     <div className="p-6">

                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5">

                           <div>

                              <h2 className="font-bold text-xl">
                                 #{order.order_id}
                              </h2>

                              <div className="flex flex-wrap gap-5 mt-4 text-gray-600 text-sm">

                                 <div className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    {new Date(
                                       order.created_at
                                    ).toLocaleDateString()}
                                 </div>

                                 <div className="flex items-center gap-2">
                                    <Package size={16} />
                                    {order.total_items} Items
                                 </div>

                                 <div className="flex items-center gap-2">
                                    <CreditCard size={16} />
                                    {order.payment_method.toUpperCase()}
                                 </div>

                              </div>

                           </div>

                           <div className="text-right">

                              <h3 className="text-3xl font-bold text-orange-600">
                                 ₹{order.final_price}
                              </h3>

                              <div className="mt-3 flex gap-2 justify-end flex-wrap">

                                 <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(
                                       order.status
                                    )}`}
                                 >
                                    {order.status}
                                 </span>

                                 <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getPaymentColor(
                                       order.payment_status
                                    )}`}
                                 >
                                    {order.payment_status}
                                 </span>

                              </div>

                           </div>

                        </div>

                        <div className="border-t mt-6 pt-5 flex justify-end">

                           <Link
                              to={`/account/orders/${order.order_id}`}
                              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg"
                           >
                              <Eye size={18} />
                              View Details
                           </Link>

                        </div>

                     </div>

                  </div>

               ))}

            </div>

         )}

      </div>
   );
};

export default Orders;