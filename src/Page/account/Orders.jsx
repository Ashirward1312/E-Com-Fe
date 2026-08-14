import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
               My Orders
            </h1>
            <div className="mt-2 h-1 w-16 bg-[#C8A45A] rounded-full"></div>
            <p className="mt-3 text-gray-500 text-sm sm:text-base">
               View and track your purchase history.
            </p>
         </div>

         {orders.length === 0 ? (

            <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-12 text-center shadow-sm">
               <h2 className="text-lg sm:text-xl font-bold text-[#0B1C33] mb-3">
                  No Orders Yet
               </h2>
               <p className="text-gray-500 mb-7 text-sm sm:text-base">
                  You haven't purchased any books yet.
               </p>
               <Link
                  to="/books"
                  className="inline-block bg-[#0B1C33] text-white px-7 py-3 rounded-xl font-semibold hover:bg-[#162e4f] transition text-sm sm:text-base"
               >
                  Browse Books
               </Link>
            </div>

         ) : (

            <div className="space-y-5">

               {orders.map((order) => (

                  <div
                     key={order.order_id}
                     className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-7 shadow-sm hover:shadow-md transition"
                  >

                     <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">

                        <div>
                           <h2 className="text-lg sm:text-xl font-bold text-[#0B1C33]">
                              Order #{order.order_id}
                           </h2>
                           <p className="text-gray-500 mt-0.5 text-sm">
                              {new Date(order.created_at).toLocaleDateString()}
                           </p>
                        </div>

                        <span
                           className={`self-start px-3 py-1.5 rounded-full text-xs font-semibold ${
                              order.payment_status === "paid"
                                 ? "bg-green-100 text-green-700"
                                 : "bg-yellow-100 text-yellow-700"
                           }`}
                        >
                           {order.payment_status.toUpperCase()}
                        </span>

                     </div>

                     <div className="border-t border-gray-100 my-5"></div>

                     <div className="grid grid-cols-3 gap-3 sm:gap-6 text-sm">

                        <div>
                           <p className="text-gray-400 uppercase tracking-wide text-xs">Books</p>
                           <p className="text-[#0B1C33] font-semibold mt-1">{order.total_items}</p>
                        </div>

                        <div>
                           <p className="text-gray-400 uppercase tracking-wide text-xs">Total</p>
                           <p className="text-[#C8A45A] font-semibold mt-1">₹ {order.final_price}</p>
                        </div>

                        <div>
                           <p className="text-gray-400 uppercase tracking-wide text-xs">Status</p>
                           <p className="text-[#0B1C33] font-semibold mt-1 capitalize">{order.status}</p>
                        </div>

                     </div>

                     <div className="mt-5 flex justify-end">
                        <Link
                           to={`/account/orders/${order.order_id}`}
                           className="bg-[#C8A45A] text-[#0B1C33] px-5 py-2 rounded-xl text-sm font-semibold hover:bg-yellow-400 transition"
                        >
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