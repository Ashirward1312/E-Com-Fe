import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

         console.log(error);

         errorToast("Unable to download e-book.");

      }
   };

   if (loading) {
      return <div>Loading...</div>;
   }

   if (!order) {
      return <div>Purchase not found.</div>;
   }

   return (
      <div>

         <h2>Purchase Details</h2>

         <p>
            <strong>Order ID:</strong> {order.order_id}
         </p>

         <p>
            <strong>Payment:</strong> {order.payment_status}
         </p>

         <p>
            <strong>Total:</strong> ₹{order.final_price}
         </p>

         <hr />

         <h3>Purchased Books</h3>

         {order.items.map((item) => (

            <div
               key={item.id}
               style={{
                  border: "1px solid #ccc",
                  marginBottom: "15px",
                  padding: "15px",
               }}
            >

               <img
                  src={item.product_image}
                  alt={item.product_name}
                  width="120"
               />

               <h4>{item.product_name}</h4>

               <p>₹{item.price}</p>

               {order.payment_status === "paid" && (

                  <button
                     onClick={() => handleDownload(item)}
                  >
                     Download PDF
                  </button>

               )}

            </div>

         ))}

         <hr />

         <h3>Timeline</h3>

         {order.status_history.map((history, index) => (

            <div key={index}>

               {history.status} -
               {" "}
               {new Date(
                  history.created_at
               ).toLocaleString()}

            </div>

         ))}

      </div>
   );
};

export default OrderDetail;