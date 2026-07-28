import { useEffect, useState } from "react";
import { getMyOrders } from "../../services/orderApi";

const MyOrders = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        fetchOrders();

    }, []);

    const fetchOrders = async () => {

        try {

            const data = await getMyOrders();

            setOrders(data);

        } catch (err) {
            console.log(err);
        }

    };

    return (

        <div>

            {orders.map((order) => (

                <div key={order.id}>

                    <h3>{order.order_id}</h3>

                    <p>{order.status}</p>

                    <p>₹ {order.final_price}</p>

                </div>

            ))}

        </div>

    );

};

export default MyOrders;