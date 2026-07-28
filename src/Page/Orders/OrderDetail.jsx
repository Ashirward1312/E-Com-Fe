import { useNavigate, Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
    getOrderDetail,
    cancelOrder,
} from "../../services/orderApi";

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

    const handleCancel = async () => {
        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this order?"
        );

        if (!confirmCancel) return;

        try {
            const data = await cancelOrder(order.order_id);

            alert(data.message);

            fetchOrder();
        } catch (error) {
            alert(
                error.response?.data?.detail ||
                "Unable to cancel order."
            );
        }
    };

    if (loading) {
        return (
            <div className="text-center py-20">
                Loading...
            </div>
        );
    }

    if (!order) {
        return (
            <div className="text-center py-20">
                Order not found.
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-5xl px-4 py-10">

            <h1 className="mb-8 text-3xl font-bold">
                Order Details
            </h1>

            <div className="rounded-lg border p-6 mb-8">

                <p><strong>Order ID :</strong> {order.order_id}</p>

                <p><strong>Status :</strong> {order.status}</p>

                <p><strong>Payment :</strong> {order.payment_status}</p>

                <p><strong>Payment Method :</strong> {order.payment_method}</p>

                <p><strong>Total :</strong> ₹{order.final_price}</p>

            </div>

            <div className="rounded-lg border p-6 mb-8">

                <h2 className="text-xl font-semibold mb-4">
                    Shipping Address
                </h2>

                <p>{order.full_name}</p>

                <p>{order.phone}</p>

                <p>{order.email}</p>

                <p>{order.address}</p>

                <p>
                    {order.city}, {order.state}
                </p>

                <p>{order.pincode}</p>

            </div>

            <div className="rounded-lg border p-6">

                <h2 className="text-xl font-semibold mb-5">
                    Order Items
                </h2>

                {order.items.map((item) => (

                    <div
                        key={item.id}
                        className="flex items-center gap-5 border-b py-4"
                    >

                        <img
                            src={item.product_image}
                            alt={item.product_name}
                            className="h-24 w-24 rounded object-cover"
                        />

                        <div className="flex-1">

                            <h3 className="font-semibold">
                                {item.product_name}
                            </h3>

                            <p>
                                Quantity : {item.quantity}
                            </p>

                            <p>
                                Price : ₹{item.price}
                            </p>

                        </div>

                        <h3 className="font-bold">
                            ₹{item.subtotal}
                        </h3>

                    </div>

                ))}

            </div>

            <div className="mt-8 rounded-lg border p-6">

                <h2 className="text-xl font-semibold mb-4">
                    Order Timeline
                </h2>

                {order.status_history.map((history, index) => (

                    <div
                        key={index}
                        className="flex justify-between border-b py-3"
                    >

                        <span className="capitalize">
                            {history.status}
                        </span>

                        <span>
                            {new Date(
                                history.created_at
                            ).toLocaleString()}
                        </span>

                    </div>

                ))}

            </div>

            {(order.status === "placed" ||
                order.status === "confirmed") && (

                    <button
                        onClick={handleCancel}
                        className="mt-8 rounded-lg bg-red-600 px-6 py-3 text-white"
                    >
                        Cancel Order
                    </button>

                )}

        </div>
    );
};

export default OrderDetail;