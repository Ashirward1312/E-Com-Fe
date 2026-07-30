import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
   Package,
   MapPin,
   CreditCard,
   Clock,
} from "lucide-react";
import { successToast, errorToast } from "../../utils/toast";
import {
   getOrderDetail,
   cancelOrder,
} from "../../services/orderApi";

const OrderDetail = () => {
   const { orderId } = useParams();
   const navigate = useNavigate();

   const [loading, setLoading] = useState(true);
   const [order, setOrder] = useState(null);
   const [cancelLoading, setCancelLoading] = useState(false);

   useEffect(() => {
      fetchOrder();
   }, [orderId]);

   const fetchOrder = async () => {
      try {
         const data = await getOrderDetail(orderId);
         setOrder(data);
      } catch (error) {
         console.log(error);
      } finally {
         setLoading(false);
      }
   };

   const handleCancel = async () => {
      if (!window.confirm("Are you sure you want to cancel this order?"))
         return;

      try {
         setCancelLoading(true);
         await cancelOrder(orderId);
         successToast("Order cancelled successfully.");
         fetchOrder();
      } catch (error) {
         errorToast(
            error?.response?.data?.message ||
            "Unable to cancel order."
         );
      } finally {
         setCancelLoading(false);
      }
   };

   const statusColor = (status) => {
      switch (status) {
         case "placed":
            return "bg-yellow-100 text-yellow-700";
         case "confirmed":
            return "bg-blue-100 text-blue-700";
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

   if (loading) {
      return <div className="p-8">Loading...</div>;
   }

   if (!order) {
      return <div className="p-8">Order not found.</div>;
   }

   return (
      <div className="p-8 space-y-8">

         {/* Header */}
         <div className="border border-gray-200 bg-white rounded-lg p-6">

            <div className="flex justify-between items-center flex-wrap gap-4">

               <div>
                  <h1 className="text-2xl font-bold text-[#0B1C33]">
                     Order #{order.order_id}
                  </h1>
                  <p className="text-gray-500 mt-1 text-sm">
                     {new Date(order.created_at).toLocaleString()}
                  </p>
               </div>

               <span
                  className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${statusColor(
                     order.status
                  )}`}
               >
                  {order.status}
               </span>

            </div>

         </div>

         {/* Shipping + Payment Grid */}
         <div className="grid md:grid-cols-2 gap-6">

            <div className="border border-gray-200 bg-white rounded-lg p-6">

               <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-[#0B1C33]">
                  <MapPin size={18} />
                  Shipping Address
               </h2>

               <div className="space-y-2 text-sm text-gray-700">
                  <p>{order.full_name}</p>
                  <p>{order.phone}</p>
                  <p>{order.email}</p>
                  <p>{order.address}</p>
                  <p>{order.city}, {order.state}</p>
                  <p>{order.pincode}</p>
               </div>

            </div>

            <div className="border border-gray-200 bg-white rounded-lg p-6">

               <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-[#0B1C33]">
                  <CreditCard size={18} />
                  Payment Details
               </h2>

               <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Method:</strong> {order.payment_method.toUpperCase()}</p>
                  <p><strong>Status:</strong> {order.payment_status}</p>
               </div>

            </div>

         </div>

         {/* Ordered Items */}
         <div className="border border-gray-200 bg-white rounded-lg p-6">

            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-[#0B1C33]">
               <Package size={18} />
               Ordered Items
            </h2>

            <div className="overflow-x-auto">

               <table className="w-full text-sm">

                  <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wide">
                     <tr>
                        <th className="px-4 py-3 text-left font-semibold">Image</th>
                        <th className="px-4 py-3 text-left font-semibold">Product</th>
                        <th className="px-4 py-3 text-center font-semibold">Qty</th>
                        <th className="px-4 py-3 text-right font-semibold">Price</th>
                        <th className="px-4 py-3 text-right font-semibold">Subtotal</th>
                     </tr>
                  </thead>

                  <tbody>

                     {order.items.map((item) => (

                        <tr
                           key={item.id}
                           className="border-t hover:bg-gray-50 transition"
                        >

                           <td className="px-4 py-4">
                              <img
                                 src={item.product_image}
                                 alt={item.product_name}
                                 className="h-14 w-14 rounded-md border object-cover"
                              />
                           </td>

                           <td className="px-4 py-4 text-gray-800 font-medium">
                              {item.product_name}
                           </td>

                           <td className="px-4 py-4 text-center">
                              {item.quantity}
                           </td>

                           <td className="px-4 py-4 text-right">
                              ₹ {item.price}
                           </td>

                           <td className="px-4 py-4 text-right font-semibold text-[#0B1C33]">
                              ₹ {item.subtotal}
                           </td>

                        </tr>

                     ))}

                  </tbody>

               </table>

            </div>

         </div>

         {/* Order Summary */}
         <div className="border border-gray-200 bg-white rounded-lg p-6">

            <h2 className="text-lg font-semibold mb-6 text-[#0B1C33]">
               Order Summary
            </h2>

            <div className="space-y-3 text-sm text-gray-700">

               <div className="flex justify-between">
                  <span>Total Items</span>
                  <span>{order.total_items}</span>
               </div>

               <div className="flex justify-between">
                  <span>Total Price</span>
                  <span>₹ {order.total_price}</span>
               </div>

               <div className="flex justify-between">
                  <span>Discount</span>
                  <span>₹ {order.discount_amount}</span>
               </div>

               <div className="border-t pt-4 flex justify-between text-base font-bold text-[#0B1C33]">
                  <span>Final Total</span>
                  <span>₹ {order.final_price}</span>
               </div>

            </div>

         </div>

         {/* Timeline */}
         <div className="border border-gray-200 bg-white rounded-lg p-6">

            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-[#0B1C33]">
               <Clock size={18} />
               Order Timeline
            </h2>

            <div className="space-y-3 text-sm">

               {order.status_history.map((history, index) => (
                  <div
                     key={index}
                     className="flex justify-between border-b pb-2"
                  >
                     <span className="capitalize font-medium">
                        {history.status}
                     </span>
                     <span className="text-gray-500">
                        {new Date(history.created_at).toLocaleString()}
                     </span>
                  </div>
               ))}

            </div>

         </div>

         {/* Buttons */}
         <div className="flex gap-4">

            <button
               onClick={() => navigate(-1)}
               className="px-6 py-2.5 border border-gray-300 rounded-md hover:bg-gray-100 transition"
            >
               Back
            </button>

            {["placed", "confirmed", "processing"].includes(order.status) && (
               <button
                  onClick={handleCancel}
                  disabled={cancelLoading}
                  className="px-6 py-2.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
               >
                  {cancelLoading ? "Cancelling..." : "Cancel Order"}
               </button>
            )}

         </div>

      </div>
   );
};

export default OrderDetail;