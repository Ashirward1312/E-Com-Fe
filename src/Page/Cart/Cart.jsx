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

    const { user, loading } = useContext(AuthContext);

    const handleCheckout = () => {

        navigate("/checkout");

    };

    if (!cart || cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center pt-32 bg-gradient-to-b from-white to-gray-50">
                <h2 className="text-4xl font-bold text-[#0B1C33]">
                    Your Cart is Empty
                </h2>
                <p className="text-gray-500 mt-4 text-lg">
                    Browse our premium digital collection.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-32 pb-20">

            <div className="max-w-7xl mx-auto px-8">

                <div className="mb-16">
                    <h1 className="text-4xl font-extrabold text-[#0B1C33]">
                        Your Digital Cart
                    </h1>
                    <div className="mt-4 h-1 w-24 bg-[#C8A45A] rounded-full"></div>
                </div>

                <div className="grid lg:grid-cols-3 gap-14">

                    {/* LEFT – ITEMS */}
                    <div className="lg:col-span-2 space-y-10">

                        {cart.map((item) => (

                            <div
                                key={item.product_id}
                                className="bg-white border border-gray-200 rounded-3xl p-8 shadow-md hover:shadow-xl transition duration-300"
                            >

                                <div className="flex flex-col sm:flex-row gap-10 items-center">

                                    {/* Image */}
                                    <div className="bg-gray-100 rounded-2xl p-6 w-44 h-60 flex items-center justify-center shadow-inner">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="max-h-full max-w-full object-contain"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 text-center sm:text-left">

                                        <h2 className="text-2xl font-bold text-[#0B1C33]">
                                            {item.name}
                                        </h2>

                                        <p className="mt-3 text-lg text-gray-500">
                                            Digital E‑Book
                                        </p>

                                        {/* Always 1 */}
                                        <p className="mt-2 text-sm text-gray-400">
                                            Quantity: 1
                                        </p>

                                        <div className="mt-6 flex justify-between items-center">

                                            <span className="text-2xl font-bold text-[#C8A45A]">
                                                ₹ {Number(item.price).toLocaleString("en-IN")}
                                            </span>

                                            <button
                                                onClick={() => removeItem(item.product_id)}
                                                className="px-5 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium"
                                            >
                                                Remove
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                    {/* RIGHT – SUMMARY */}
                    <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-xl sticky top-32 h-fit">

                        <h2 className="text-2xl font-bold text-[#0B1C33] mb-10">
                            Order Summary
                        </h2>

                        <div className="space-y-6 text-gray-600">

                            <div className="flex justify-between text-lg">
                                <span>Total Books</span>
                                <span className="font-semibold text-[#0B1C33]">
                                    {cart.length}
                                </span>
                            </div>

                            <div className="flex justify-between text-lg">
                                <span>Subtotal</span>
                                <span className="font-semibold text-[#0B1C33]">
                                    ₹ {cart
                                        .reduce((total, item) => total + Number(item.price), 0)
                                        .toLocaleString("en-IN")}
                                </span>
                            </div>

                            <div className="border-t pt-6 flex justify-between text-2xl font-bold">
                                <span>Total</span>
                                <span className="text-[#C8A45A]">
                                    ₹ {cart
                                        .reduce((total, item) => total + Number(item.price), 0)
                                        .toLocaleString("en-IN")}
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