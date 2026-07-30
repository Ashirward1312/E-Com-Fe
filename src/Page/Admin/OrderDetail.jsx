import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import adminApi from "../../services/adminApi";

const OrderDetail = () => {

   const { orderId } = useParams();
   const [order, setOrder] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      loadOrder();
   }, []);

   const loadOrder = async () => {
      try {
         const data = await adminApi.getOrder(orderId);
         setOrder(data);
      } catch (error) {
         console.log(error);
      } finally {
         setLoading(false);
      }
   };

   if (loading) {
      return <div className="p-8">Loading...</div>;
   }

   return (
      <div className="p-8">

         {/* Header */}
         <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0B1C33]">
               Order #{order.order_id}
            </h1>
         </div>

         {/* Top Grid */}
         <div className="grid lg:grid-cols-2 gap-6 mb-8">

            {/* Customer Info */}
            <div className="border border-gray-200 bg-white rounded-lg p-6">

               <h2 className="text-lg font-semibold mb-4 text-[#0B1C33]">
                  Customer Information
               </h2>

               <div className="space-y-2 text-gray-700">
                  <p><span className="font-medium">Name:</span> {order.full_name}</p>
                  <p><span className="font-medium">Phone:</span> {order.phone}</p>
                  <p><span className="font-medium">Email:</span> {order.email}</p>
               </div>

            </div>

            {/* Shipping Address */}
            <div className="border border-gray-200 bg-white rounded-lg p-6">

               <h2 className="text-lg font-semibold mb-4 text-[#0B1C33]">
                  Shipping Address
               </h2>

               <div className="space-y-1 text-gray-700">
                  <p>{order.address}</p>
                  <p>{order.city}</p>
                  <p>{order.state}</p>
                  <p>{order.pincode}</p>
               </div>

            </div>

         </div>

         {/* Items Section */}
         <div className="border border-gray-200 bg-white rounded-lg p-6">

            <h2 className="text-lg font-semibold mb-6 text-[#0B1C33]">
               Order Items
            </h2>

            <div className="overflow-x-auto">

               <table className="w-full text-sm">

                  <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wide">
                     <tr>
                        <th className="px-4 py-3 text-left font-semibold">
                           Image
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                           Product
                        </th>
                        <th className="px-4 py-3 text-center font-semibold">
                           Qty
                        </th>
                        <th className="px-4 py-3 text-right font-semibold">
                           Price
                        </th>
                        <th className="px-4 py-3 text-right font-semibold">
                           Subtotal
                        </th>
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

                           <td className="px-4 py-4 font-medium text-gray-800">
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

            {/* Total */}
            <div className="mt-6 text-right text-lg font-bold text-[#0B1C33]">
               Total: ₹ {order.final_price}
            </div>

         </div>

      </div>
   );
};

export default OrderDetail;