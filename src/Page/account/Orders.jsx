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
      return <div>Loading...</div>;
   }

   return (
      <div>

         <h1>My Library</h1>

         {orders.length === 0 ? (

            <div>

               <p>No Books Purchased.</p>

               <Link to="/products">
                  Browse Books
               </Link>

            </div>

         ) : (

            orders.map((order) => (

               <div
                  key={order.order_id}
                  style={{
                     border: "1px solid #ccc",
                     padding: "15px",
                     marginBottom: "15px",
                  }}
               >

                  <p>
                     <strong>Order ID:</strong> {order.order_id}
                  </p>

                  <p>
                     <strong>Date:</strong>{" "}
                     {new Date(
                        order.created_at
                     ).toLocaleDateString()}
                  </p>

                  <p>
                     <strong>Books:</strong>{" "}
                     {order.total_items}
                  </p>

                  <p>
                     <strong>Total:</strong> ₹
                     {order.final_price}
                  </p>

                  <p>
                     <strong>Payment:</strong>{" "}
                     {order.payment_status}
                  </p>

                  <p>
                     <strong>Status:</strong>{" "}
                     {order.status}
                  </p>

                  <br />

                  <Link
                     to={`/account/orders/${order.order_id}`}
                  >
                     Open Library
                  </Link>

               </div>

            ))

         )}

      </div>
   );
};

export default Orders;