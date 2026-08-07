import { Link, Navigate, useLocation } from "react-router-dom";

const OrderSuccess = () => {
    const location = useLocation();
    const order = location.state;

    if (!order) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="bg-gradient-to-br from-white via-[#f7f9fc] to-[#fdfaf4] pt-28 pb-20 min-h-[80vh]">

            <div className="max-w-3xl mx-auto px-6">

                <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10">

                    {/* ✅ SUCCESS ICON */}
                    <div className="text-center mb-10">

                        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 shadow-inner">
                            <span className="text-5xl text-green-600 font-bold">
                                ✓
                            </span>
                        </div>

                        <h1 className="text-3xl font-bold text-[#0B1C33]">
                            Payment Successful!
                        </h1>

                        <p className="text-gray-500 mt-3">
                            Your e-books have been added to your library.
                        </p>

                    </div>

                    {/* ✅ ORDER DETAILS */}
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">

                        <h2 className="text-xl font-semibold text-[#0B1C33] mb-6 border-b border-gray-200 pb-3">
                            Order Details
                        </h2>

                        <div className="space-y-4 text-sm">

                            <div className="flex justify-between">
                                <span className="text-gray-500">Order ID</span>
                                <span className="font-medium text-[#0B1C33] break-all">
                                    {order.order_id}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Amount Paid</span>
                                <span className="font-medium text-[#0B1C33]">
                                    ₹ {order.final_price}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Payment Status</span>
                                <span className="text-green-600 font-semibold capitalize">
                                    {order.payment_status}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Order Status</span>
                                <span className="text-[#C8A45A] font-semibold capitalize">
                                    {order.status}
                                </span>
                            </div>

                        </div>

                    </div>

                    {/* ✅ ACTION BUTTONS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">

                        <Link
                            to="/account/library"
                            className="bg-[#0B1C33] hover:bg-[#162e4f] text-white text-center py-3 rounded-xl font-medium transition shadow-md"
                        >
                            My Library
                        </Link>

                        <Link
                            to={`/account/orders/${order.order_id}`}
                            className="border-2 border-[#C8A45A] text-[#0B1C33] text-center py-3 rounded-xl font-medium hover:bg-[#C8A45A]/10 transition"
                        >
                            View Order
                        </Link>

                        <Link
                            to="/products"
                            className="border border-gray-300 text-gray-600 text-center py-3 rounded-xl font-medium hover:bg-gray-100 transition"
                        >
                            Buy More
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default OrderSuccess;