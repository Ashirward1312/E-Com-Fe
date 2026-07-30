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
      const confirm = window.confirm(
         "Are you sure you want to cancel this order?"
      );

      if (!confirm) return;

      try {
         setCancelLoading(true);

         await cancelOrder(orderId);

         successToast("Order cancelled successfully.");

         fetchOrder();
      } catch (error) {
         console.log(error);
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

   if (loading) {
      return (
         <div className="py-20 text-center">
            Loading...
         </div>
      );
   }

   if (!order) {
      return (
         <div className="py-20 text-center">
            Order not found.
         </div>
      );
   }

   return (
      <div className="space-y-6">

         {/* Header */}

         <div className="bg-white rounded-xl shadow p-6">

            <div className="flex justify-between items-center flex-wrap gap-4">

               <div>

                  <h1 className="text-3xl font-bold">
                     Order #{order.order_id}
                  </h1>

                  <p className="text-gray-500 mt-2">
                     {new Date(
                        order.created_at
                     ).toLocaleString()}
                  </p>

               </div>

               <span
                  className={`px-4 py-2 rounded-full capitalize font-medium ${statusColor(
                     order.status
                  )}`}
               >
                  {order.status}
               </span>

            </div>

         </div>

         {/* Shipping + Payment */}

         <div className="grid lg:grid-cols-2 gap-6">

            <div className="bg-white rounded-xl shadow p-6">

               <h2 className="font-semibold text-xl flex items-center gap-2 mb-5">
                  <MapPin />
                  Shipping Address
               </h2>

               <p>{order.full_name}</p>

               <p>{order.phone}</p>

               <p>{order.email}</p>

               <p className="mt-3">
                  {order.address}
               </p>

               <p>
                  {order.city}, {order.state}
               </p>

               <p>{order.pincode}</p>

            </div>

            <div className="bg-white rounded-xl shadow p-6">

               <h2 className="font-semibold text-xl flex items-center gap-2 mb-5">
                  <CreditCard />
                  Payment Details
               </h2>

               <p>
                  <strong>Method:</strong>{" "}
                  {order.payment_method.toUpperCase()}
               </p>

               <p className="mt-3">
                  <strong>Status:</strong>{" "}
                  {order.payment_status}
               </p>

            </div>

         </div>

         {/* Products */}

         <div className="bg-white rounded-xl shadow p-6">

            <h2 className="font-semibold text-xl mb-6 flex items-center gap-2">
               <Package />
               Ordered Items
            </h2>

            <div className="space-y-5">

               {order.items.map((item) => (

                  <div
                     key={item.id}
                     className="flex gap-5 border rounded-lg p-4"
                  >

                     <img
                        src={item.product_image}
                        alt={item.product_name}
                        className="w-24 h-24 rounded-lg object-cover"
                     />

                     <div className="flex-1">

                        <h3 className="font-semibold text-lg">
                           {item.product_name}
                        </h3>

                        <p className="text-gray-500 mt-2">
                           Quantity : {item.quantity}
                        </p>

                        <p className="text-gray-500">
                           Price : ₹{item.price}
                        </p>

                        <p className="font-bold text-orange-600 mt-2">
                           ₹{item.subtotal}
                        </p>

                     </div>

                  </div>

               ))}

            </div>

         </div>

         {/* Summary */}

         <div className="bg-white rounded-xl shadow p-6">

            <h2 className="font-semibold text-xl mb-5">
               Order Summary
            </h2>

            <div className="space-y-3">

               <div className="flex justify-between">
                  <span>Total Items</span>
                  <span>{order.total_items}</span>
               </div>

               <div className="flex justify-between">
                  <span>Total Price</span>
                  <span>₹{order.total_price}</span>
               </div>

               <div className="flex justify-between">
                  <span>Discount</span>
                  <span>₹{order.discount_amount}</span>
               </div>

               <div className="border-t pt-4 flex justify-between text-xl font-bold">
                  <span>Final Total</span>
                  <span className="text-orange-600">
                     ₹{order.final_price}
                  </span>
               </div>

            </div>

         </div>

         {/* Timeline */}

         <div className="bg-white rounded-xl shadow p-6">

            <h2 className="font-semibold text-xl flex items-center gap-2 mb-5">
               <Clock />
               Order Timeline
            </h2>

            <div className="space-y-4">

               {order.status_history.map((history, index) => (

                  <div
                     key={index}
                     className="flex justify-between border-b pb-3"
                  >

                     <span className="capitalize font-medium">
                        {history.status}
                     </span>

                     <span className="text-gray-500 text-sm">
                        {new Date(
                           history.created_at
                        ).toLocaleString()}
                     </span>

                  </div>

               ))}

            </div>

         </div>

         {/* Buttons */}

         <div className="flex gap-4">

            <button
               onClick={() => navigate(-1)}
               className="px-6 py-3 rounded-lg border"
            >
               Back
            </button>

            {["placed", "confirmed", "processing"].includes(
               order.status
            ) && (

                  <button
                     onClick={handleCancel}
                     disabled={cancelLoading}
                     className="px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700"
                  >
                     {cancelLoading
                        ? "Cancelling..."
                        : "Cancel Order"}
                  </button>

               )}

         </div>

      </div>
   );
};

export default OrderDetail;