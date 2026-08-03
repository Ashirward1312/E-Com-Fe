// import { useEffect, useState } from "react";
// import { getMyOrders } from "../../services/orderApi";

// const MyOrders = () => {

//     const [orders, setOrders] = useState([]);

//     useEffect(() => {

//         fetchOrders();

//     }, []);

//     const fetchOrders = async () => {

//         try {

//             const data = await getMyOrders();

//             setOrders(data);

//         } catch (err) {
//             console.log(err);
//         }

//     };

//     return (

//         <div>

//             {orders.map((order) => (

//                 <div key={order.id}>

//                     <h3>{order.order_id}</h3>

//                     <p>{order.status}</p>

//                     <p>₹ {order.final_price}</p>

//                 </div>

//             ))}

//         </div>

//     );

// };

// export default MyOrders;
import { useEffect, useState } from "react";
import {
    getMyOrders,
    downloadEbook,
} from "../../services/orderApi";
import { successToast, errorToast } from "../../utils/toast";

const MyOrders = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await getMyOrders();
            setOrders(data);
        } catch (error) {
            console.log(error);
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

    return (
        <div className="max-w-5xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">
                My Library
            </h1>

            {orders.length === 0 && (
                <p>No books purchased yet.</p>
            )}

            {orders.map((order) => (

                <div
                    key={order.id}
                    className="border rounded-lg p-5 mb-5"
                >

                    <h3 className="font-bold">
                        Order : {order.order_id}
                    </h3>

                    <p>Status : {order.status}</p>

                    <p>Payment : {order.payment_status}</p>

                    <p>Total : ₹{order.final_price}</p>

                    <hr className="my-4" />

                    {order.items.map((item) => (

                        <div
                            key={item.id}
                            className="flex justify-between items-center mb-3"
                        >

                            <div>

                                <p className="font-medium">
                                    {item.product_name}
                                </p>

                                <p>
                                    ₹{item.price}
                                </p>

                            </div>

                            {order.payment_status === "paid" && (

                                <button
                                    onClick={() =>
                                        handleDownload(item)
                                    }
                                    className="bg-green-600 text-white px-4 py-2 rounded"
                                >
                                    Download
                                </button>

                            )}

                        </div>

                    ))}

                </div>

            ))}

        </div>
    );
};

export default MyOrders;