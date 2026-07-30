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
      return <div className="p-8">Loading Orders...</div>;
   }

   return (
      <div className="p-8">

         {/* Header */}
         <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0B1C33]">
               My Orders
            </h1>
            <p className="text-gray-500 mt-2">
               View and track your order history.
            </p>
         </div>

         {orders.length === 0 ? (

            <div className="border border-gray-200 bg-white rounded-lg p-12 text-center">

               <ShoppingBag
                  size={60}
                  className="mx-auto text-gray-300"
               />

               <h2 className="mt-6 text-xl font-semibold">
                  No Orders Found
               </h2>

               <p className="text-gray-500 mt-2">
                  You haven't placed any orders yet.
               </p>

               <Link
                  to="/products"
                  className="inline-block mt-6 bg-[#C8A45A] text-[#0B1C33] px-6 py-2.5 rounded-md font-medium hover:bg-yellow-400 transition"
               >
                  Continue Shopping
               </Link>

            </div>

         ) : (

            <div className="space-y-6">

               {orders.map((order) => (

                  <div
                     key={order.order_id}
                     className="border border-gray-200 bg-white rounded-lg p-6"
                  >

                     <div className="grid md:grid-cols-2 gap-6">

                        {/* Left Section */}
                        <div>

                           <h2 className="font-semibold text-lg text-[#0B1C33]">
                              Order #{order.order_id}
                           </h2>

                           <div className="mt-4 space-y-2 text-sm text-gray-600">

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

                        {/* Right Section */}
                        <div className="md:text-right">

                           <h3 className="text-2xl font-bold text-[#0B1C33]">
                              ₹{order.final_price}
                           </h3>

                           <div className="mt-3 flex flex-wrap gap-2 md:justify-end">

                              <span
                                 className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                                    order.status
                                 )}`}
                              >
                                 {order.status}
                              </span>

                              <span
                                 className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getPaymentColor(
                                    order.payment_status
                                 )}`}
                              >
                                 {order.payment_status}
                              </span>

                           </div>

                        </div>

                     </div>

                     <div className="mt-6 border-t pt-4 flex justify-end">

                        <Link
                           to={`/account/orders/${order.order_id}`}
                           className="flex items-center gap-2 bg-[#0B1C33] text-white px-5 py-2 rounded-md hover:bg-[#162e4f] transition"
                        >
                           <Eye size={18} />
                           View Details
                        </Link>

                     </div>

                  </div>

               ))}

            </div>

         )}

      </div>
   );
};

export default Orders;