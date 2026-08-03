import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../../context/CartContext";
import AuthContext from "../../context/AuthContext";

const Cart = () => {
    const navigate = useNavigate();

    const {
        cart,
        removeItem,
        totalItems,
        totalPrice,
    } = useContext(CartContext);

    const { isAuthenticated } = useContext(AuthContext);

    const handleCheckout = () => {
        if (!isAuthenticated) {
            navigate("/login", { state: { from: "/checkout" } });
            return;
        }
        navigate("/checkout");
    };

    if (!cart || cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center pt-32 bg-gray-50">
                <h2 className="text-3xl font-bold text-[#0B1C33]">
                    Your Cart is Empty
                </h2>
                <p className="text-gray-500 mt-4">
                    Add some digital books to continue.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">

            <div className="max-w-7xl mx-auto px-8">

                {/* Page Title */}
                <h1 className="text-4xl font-extrabold text-[#0B1C33] mb-14">
                    Shopping Cart
                </h1>

                <div className="grid lg:grid-cols-3 gap-12">

                    {/* ✅ LEFT SIDE – ITEMS */}
                    <div className="lg:col-span-2 space-y-8">

                        {cart.map((item) => (
                            <div
                                key={item.product_id}
                                className="flex flex-col sm:flex-row items-center sm:items-start gap-8 bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-lg transition"
                            >

                                {/* Image Section */}
                                <div className="bg-gray-100 rounded-2xl p-6 w-40 h-52 flex items-center justify-center shadow-inner">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="max-h-full max-w-full object-contain"
                                    />
                                </div>

                                {/* Details Section */}
                                <div className="flex-1 w-full flex flex-col justify-between">

                                    <div>
                                        <h2 className="text-2xl font-bold text-[#0B1C33]">
                                            {item.name}
                                        </h2>

                                        <p className="text-gray-500 mt-3 text-lg">
                                            ₹ {Number(item.price).toLocaleString("en-IN")}
                                        </p>
                                    </div>

                                    <div className="mt-6 flex justify-between items-center">

                                        <p className="text-xl font-semibold text-[#C8A45A]">
                                            ₹ {(item.price * item.quantity).toLocaleString("en-IN")}
                                        </p>

                                        <button
                                            onClick={() => removeItem(item.product_id)}
                                            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium"
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>

                    {/* ✅ RIGHT SIDE – SUMMARY */}
                    <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-lg sticky top-32 h-fit">

                        <h2 className="text-2xl font-bold text-[#0B1C33] mb-8">
                            Order Summary
                        </h2>

                        <div className="space-y-5 text-gray-600">

                            <div className="flex justify-between text-lg">
                                <span>Total Items</span>
                                <span className="font-semibold text-[#0B1C33]">
                                    {totalItems}
                                </span>
                            </div>

                            <div className="flex justify-between text-lg">
                                <span>Subtotal</span>
                                <span className="font-semibold text-[#0B1C33]">
                                    ₹ {Number(totalPrice).toLocaleString("en-IN")}
                                </span>
                            </div>

                            <div className="border-t pt-6 flex justify-between text-2xl font-bold">
                                <span>Total</span>
                                <span className="text-[#C8A45A]">
                                    ₹ {Number(totalPrice).toLocaleString("en-IN")}
                                </span>
                            </div>

                        </div>

                        <button
                            onClick={handleCheckout}
                            className="mt-10 w-full bg-[#0B1C33] text-white py-4 rounded-2xl text-lg font-semibold hover:bg-[#162e4f] transition shadow-md"
                        >
                            Proceed to Checkout
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Cart;