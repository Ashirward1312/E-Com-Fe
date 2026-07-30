import { Link, useLocation, Navigate } from "react-router-dom";

const OrderSuccess = () => {
    const location = useLocation();

    const order = location.state;

    if (!order) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

            <div className="w-full max-w-xl rounded-xl bg-white p-8 shadow-lg">

                <div className="mb-6 text-center">

                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">

                        <span className="text-4xl text-green-600">
                            ✓
                        </span>

                    </div>

                    <h1 className="text-3xl font-bold text-green-600">
                        Order Placed Successfully
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Thank you for your purchase.
                    </p>

                </div>

                <div className="space-y-3 rounded-lg border p-5">

                    <div className="flex justify-between">
                        <span>Order ID</span>
                        <span className="font-semibold">
                            {order.order_id}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span>Total Amount</span>
                        <span className="font-semibold">
                            ₹{order.final_price}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span>Payment Method</span>
                        <span className="capitalize">
                            {order.payment_method}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span>Payment Status</span>
                        <span className="capitalize">
                            {order.payment_status}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span>Order Status</span>
                        <span className="capitalize text-green-600 font-semibold">
                            {order.status}
                        </span>
                    </div>

                </div>

                <div className="mt-8 flex gap-4">

                    <Link
                        to="/account/orders"
                        className="flex-1 rounded-lg bg-indigo-600 py-3 text-center text-white"
                    >
                        My Orders
                    </Link>

                    <Link
                        to="/products"
                        className="flex-1 rounded-lg border py-3 text-center"
                    >
                        Continue Shopping
                    </Link>

                </div>

            </div>

        </div>
    );
};

export default OrderSuccess;