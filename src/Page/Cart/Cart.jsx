import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../../context/CartContext";
import AuthContext from "../../context/AuthContext";

const Cart = () => {
    const navigate = useNavigate();

    const {
        cart,
        updateQuantity,
        removeItem,
        clearCart,
        totalItems,
        totalPrice,
    } = useContext(CartContext);

    const { isAuthenticated } = useContext(AuthContext);

    const increaseQty = (item) => {
        updateQuantity(item.product_id, item.quantity + 1);
    };

    const decreaseQty = (item) => {
        if (item.quantity === 1) {
            removeItem(item.product_id);
            return;
        }
        updateQuantity(item.product_id, item.quantity - 1);
    };

    const handleCheckout = () => {
        if (!isAuthenticated) {
            navigate("/login", { state: { from: "/checkout" } });
            return;
        }
        navigate("/checkout");
    };

    if (!cart || cart.length === 0) {
        return (
            <div className="text-center mt-20">
                <h2 className="text-2xl font-bold text-[#0B1C33]">
                    Your Cart is Empty
                </h2>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-12">

            <h1 className="text-3xl font-extrabold text-[#0B1C33] mb-10 tracking-tight">
                Shopping Cart
            </h1>

            <div className="grid lg:grid-cols-3 gap-10">

                {/* ✅ LEFT SIDE – CART ITEMS */}
                <div className="lg:col-span-2 space-y-6">

                    {cart.map((item) => (
                        <div
                            key={item.product_id}
                            className="border border-gray-200 bg-white rounded-2xl p-5 flex flex-col sm:flex-row gap-6 items-center sm:items-start shadow-sm hover:shadow-md transition-shadow"
                        >

                            {/* Image – Full Visible with flex-shrink-0 to prevent squishing */}
                            <div className="w-full sm:w-36 h-48 sm:h-40 bg-gray-50 flex flex-shrink-0 items-center justify-center rounded-xl p-3 border border-gray-100">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="max-h-full max-w-full object-contain drop-shadow-sm mix-blend-multiply"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 w-full flex flex-col sm:flex-row justify-between h-full py-1">
                                <div className="flex flex-col justify-between h-full">
                                    <div>
                                        <h2 className="text-xl font-bold text-[#0B1C33] leading-tight">
                                            {item.name}
                                        </h2>

                                        <p className="text-gray-500 font-medium mt-1.5 text-lg">
                                            ₹ {Number(item.price).toLocaleString("en-IN")}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4 mt-6 sm:mt-4 bg-gray-50 w-fit p-1.5 rounded-lg border border-gray-200">
                                        <button
                                            onClick={() => decreaseQty(item)}
                                            className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 font-semibold transition"
                                        >
                                            -
                                        </button>

                                        <span className="font-bold text-[#0B1C33] w-6 text-center">
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() => increaseQty(item)}
                                            className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 font-semibold transition"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Price + Remove */}
                                <div className="mt-6 sm:mt-0 flex flex-row sm:flex-col justify-between items-center sm:items-end w-full sm:w-auto">
                                    <h3 className="text-2xl font-extrabold text-[#C8A45A]">
                                        ₹ {(item.price * item.quantity).toLocaleString("en-IN")}
                                    </h3>

                                    <button
                                        onClick={() => removeItem(item.product_id)}
                                        className="text-red-500 hover:text-red-700 font-medium text-sm sm:mt-auto transition flex items-center gap-1 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}

                </div>

                {/* ✅ RIGHT SIDE – SUMMARY */}
                <div className="border border-gray-200 bg-white rounded-2xl p-8 h-fit shadow-sm sticky top-6">

                    <h2 className="text-xl font-bold text-[#0B1C33] mb-6 tracking-tight">
                        Order Summary
                    </h2>

                    <div className="space-y-4 text-[15px]">

                        <div className="flex justify-between items-center text-gray-600">
                            <span>Total Items</span>
                            <span className="font-semibold text-gray-900">
                                {totalItems}
                            </span>
                        </div>

                        <div className="flex justify-between items-center text-gray-600">
                            <span>Subtotal</span>
                            <span className="font-semibold text-gray-900">
                                ₹ {Number(totalPrice).toLocaleString("en-IN")}
                            </span>
                        </div>

                        <div className="border-t border-gray-100 pt-5 mt-5 flex justify-between items-center text-xl font-extrabold text-[#0B1C33]">
                            <span>Total</span>
                            <span className="text-[#C8A45A]">
                                ₹ {Number(totalPrice).toLocaleString("en-IN")}
                            </span>
                        </div>

                    </div>

                    <button
                        onClick={handleCheckout}
                        className="mt-8 w-full bg-[#0B1C33] text-[#C8A45A] font-semibold text-lg py-3.5 rounded-xl hover:bg-[#162e4f] shadow-lg shadow-blue-900/10 transition-all hover:-translate-y-0.5"
                    >
                        Proceed to Checkout
                    </button>

                </div>

            </div>

        </div>
    );
};

export default Cart;