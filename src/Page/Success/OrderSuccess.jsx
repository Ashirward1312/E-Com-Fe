import { Link, Navigate, useLocation } from "react-router-dom";

const OrderSuccess = () => {
    const location = useLocation();

    const order = location.state;

    if (!order) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8">

                <div className="text-center">

                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">

                        <span className="text-5xl text-green-600">
                            ✓
                        </span>

                    </div>

                    <h1 className="text-3xl font-bold text-green-600 mt-5">
                        Payment Successful
                    </h1>

                    <p className="text-gray-600 mt-2">
                        Thank you for your purchase.
                    </p>

                    <p className="text-gray-600">
                        Your e-books have been added to your library.
                    </p>

                </div>

                <div className="border rounded-lg p-5 mt-8">

                    <h2 className="text-xl font-semibold mb-4">
                        Order Details
                    </h2>

                    <div className="space-y-3">

                        <div className="flex justify-between">
                            <span>Order ID</span>
                            <strong>{order.order_id}</strong>
                        </div>

                        <div className="flex justify-between">
                            <span>Amount Paid</span>
                            <strong>₹ {order.final_price}</strong>
                        </div>

                        <div className="flex justify-between">
                            <span>Payment Method</span>
                            <strong className="capitalize">
                                {order.payment_method}
                            </strong>
                        </div>

                        <div className="flex justify-between">
                            <span>Payment Status</span>
                            <strong className="text-green-600 capitalize">
                                {order.payment_status}
                            </strong>
                        </div>

                        <div className="flex justify-between">
                            <span>Order Status</span>
                            <strong className="text-green-600 capitalize">
                                {order.status}
                            </strong>
                        </div>

                    </div>

                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">

                    <h3 className="font-semibold text-green-700 mb-2">
                        What's Next?
                    </h3>

                    <ul className="space-y-2 text-green-700">

                        <li>
                            ✓ Your payment has been received successfully.
                        </li>

                        <li>
                            ✓ Your purchased books are now available in My Library.
                        </li>

                        <li>
                            ✓ You can download your books anytime.
                        </li>

                    </ul>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">

                    <Link
                        to="/account/library"
                        className="bg-indigo-600 text-white text-center py-3 rounded-lg"
                    >
                        My Library
                    </Link>

                    <Link
                        to={`/account/orders/${order.order_id}`}
                        className="border text-center py-3 rounded-lg"
                    >
                        View Order
                    </Link>

                    <Link
                        to="/products"
                        className="border text-center py-3 rounded-lg"
                    >
                        Buy More Books
                    </Link>

                </div>

            </div>

        </div>
    );
};

export default OrderSuccess;