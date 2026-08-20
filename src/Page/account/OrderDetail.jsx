import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Download } from "lucide-react";
import {
   getOrderDetail,
   downloadEbook,
} from "../../services/orderApi";
import { successToast, errorToast } from "../../utils/toast";

const OrderDetail = () => {

   const { orderId } = useParams();

   const [order, setOrder] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      fetchOrder();
   }, []);

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

   const handleDownload = async (item) => {
      try {
         const blob = await downloadEbook(item.id);

         const url = window.URL.createObjectURL(blob);
         const link = document.createElement("a");

         link.href = url;
         link.download = `${item.product_name}.pdf`;

         document.body.appendChild(link);
         link.click();
         link.remove();

         window.URL.revokeObjectURL(url);

         successToast("Download Started");

      } catch (error) {
         console.log("E-book download error:", error);

         errorToast(
            error?.message || "Unable to download e-book."
         );
      }
   };

   if (loading) {
      return (
         <div className="flex justify-center items-center py-20 text-lg font-semibold text-gray-500">
            Loading...
         </div>
      );
   }

   if (!order) {
      return (
         <div className="flex justify-center items-center py-20 text-lg font-semibold text-gray-500">
            Purchase not found.
         </div>
      );
   }

   return (
      <div className="p-8">

         {/* Header */}
         <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0B1C33]">
               Purchase Details
            </h1>
            <div className="mt-3 h-1 w-20 bg-[#C8A45A] rounded-full"></div>
         </div>

         {/* Order Summary */}
         <div className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
               <div>
                  <p className="text-gray-400 uppercase tracking-wide text-xs">Order ID</p>
                  <p className="text-[#0B1C33] font-semibold mt-1">{order.order_id}</p>
               </div>
               <div>
                  <p className="text-gray-400 uppercase tracking-wide text-xs">Payment</p>
                  <span
                     className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${order.payment_status === "paid"
                           ? "bg-green-100 text-green-700"
                           : "bg-yellow-100 text-yellow-700"
                        }`}
                  >
                     {order.payment_status.toUpperCase()}
                  </span>
               </div>
               <div>
                  <p className="text-gray-400 uppercase tracking-wide text-xs">Total</p>
                  <p className="text-[#C8A45A] font-semibold mt-1">₹ {order.final_price}</p>
               </div>
            </div>
         </div>

         {/* Purchased Books */}
         <h2 className="text-xl font-bold text-[#0B1C33] mb-5">
            Purchased Books
         </h2>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

            {order.items.map((item) => (

               <div
                  key={item.id}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex gap-5 items-center"
               >

                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-2 w-24 h-32 flex items-center justify-center flex-shrink-0">
                     <img
                        src={item.product_image}
                        alt={item.product_name}
                        className="max-h-full max-w-full object-contain"
                     />
                  </div>

                  <div className="flex-1">
                     <h3 className="text-base font-bold text-[#0B1C33] leading-snug">
                        {item.product_name}
                     </h3>
                     <p className="text-[#C8A45A] font-semibold mt-1 text-sm">₹ {item.price}</p>

                     {order.payment_status === "paid" && (
                        <button
                           onClick={() => handleDownload(item)}
                           className="mt-4 flex items-center justify-center gap-2 bg-[#0B1C33] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#162e4f] transition"
                        >
                           <Download size={16} />
                           <span>Download E-Book</span>
                        </button>
                     )}
                  </div>

               </div>

            ))}

         </div>

         {/* Timeline */}
         <h2 className="text-xl font-bold text-[#0B1C33] mb-5">
            Order Timeline
         </h2>

         <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="space-y-4">
               {order.status_history.map((history, index) => (
                  <div key={index} className="flex items-start gap-3">
                     <div className="w-2.5 h-2.5 rounded-full bg-[#C8A45A] mt-1.5 flex-shrink-0"></div>
                     <div>
                        <p className="font-semibold text-[#0B1C33] text-sm capitalize">{history.status}</p>
                        <p className="text-gray-400 text-xs mt-0.5">
                           {new Date(history.created_at).toLocaleString()}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         </div>

      </div>
   );
};

export default OrderDetail;