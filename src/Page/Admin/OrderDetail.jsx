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
      return <div className="p-6">Loading...</div>;
   }

   return (
      <div className="p-6">

         <h1 className="mb-6 text-3xl font-bold">
            Order #{order.order_id}
         </h1>

         <div className="grid gap-6 lg:grid-cols-2">

            <div className="rounded-xl border bg-white p-6 shadow">

               <h2 className="mb-4 text-xl font-semibold">
                  Customer Information
               </h2>

               <p><b>Name:</b> {order.full_name}</p>
               <p><b>Phone:</b> {order.phone}</p>
               <p><b>Email:</b> {order.email}</p>

            </div>

            <div className="rounded-xl border bg-white p-6 shadow">

               <h2 className="mb-4 text-xl font-semibold">
                  Shipping Address
               </h2>

               <p>{order.address}</p>
               <p>{order.city}</p>
               <p>{order.state}</p>
               <p>{order.pincode}</p>

            </div>

         </div>

         <div className="mt-6 rounded-xl border bg-white p-6 shadow">

            <h2 className="mb-4 text-xl font-semibold">
               Order Items
            </h2>

            <div className="overflow-x-auto">

               <table className="min-w-full">

                  <thead className="border-b bg-gray-50">

                     <tr>

                        <th className="px-4 py-3 text-left">
                           Image
                        </th>

                        <th className="px-4 py-3 text-left">
                           Product
                        </th>

                        <th className="px-4 py-3 text-center">
                           Qty
                        </th>

                        <th className="px-4 py-3 text-right">
                           Price
                        </th>

                        <th className="px-4 py-3 text-right">
                           Subtotal
                        </th>

                     </tr>

                  </thead>

                  <tbody>

                     {order.items.map((item) => (

                        <tr
                           key={item.id}
                           className="border-b last:border-none"
                        >

                           <td className="px-4 py-4">

                              <img
                                 src={item.product_image}
                                 alt={item.product_name}
                                 className="h-16 w-16 rounded-lg border object-cover"
                              />

                           </td>

                           <td className="px-4 py-4 font-medium">
                              {item.product_name}
                           </td>

                           <td className="px-4 py-4 text-center">
                              {item.quantity}
                           </td>

                           <td className="px-4 py-4 text-right">
                              ₹{item.price}
                           </td>

                           <td className="px-4 py-4 text-right font-semibold">
                              ₹{item.subtotal}
                           </td>

                        </tr>

                     ))}

                  </tbody>

               </table>

            </div>

         </div>

      </div>
   );
};

export default OrderDetail;