import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../../context/CartContext";

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


    const handleClearCart = () => {
        clearCart();
    };


    if (!cart || cart.length === 0) {
        return (
            <div className="text-center mt-20">
                <h2 className="text-2xl font-bold">Your Cart is Empty</h2>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Shopping Cart</h1>

                <button
                    onClick={handleClearCart}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                    Clear Cart
                </button>
            </div>

            {cart.map((item) => (
                <div
                    key={item.product_id}
                    className="flex items-center gap-6 border rounded-lg p-4 mb-4"
                >
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-28 h-28 object-cover rounded"
                    />

                    <div className="flex-1">
                        <h2 className="text-xl font-semibold">{item.name}</h2>

                        <p className="text-gray-500">₹{item.price}</p>

                        <div className="flex items-center gap-3 mt-3">
                            <button
                                onClick={() => decreaseQty(item)}
                                className="px-3 py-1 bg-gray-200 rounded"
                            >
                                -
                            </button>

                            <span>{item.quantity}</span>

                            <button
                                onClick={() => increaseQty(item)}
                                className="px-3 py-1 bg-gray-200 rounded"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="text-right">
                        <h3 className="font-bold text-lg">₹{item.price * item.quantity}</h3>

                        <button
                            onClick={() => removeItem(item.product_id)}
                            className="text-red-500 mt-2"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}

            <div className="mt-10 border-t pt-6">
                <h2 className="text-2xl font-bold">Total Items : {totalItems}</h2>

                <h2 className="text-3xl font-bold mt-2">Total : ₹{totalPrice}</h2>

                <button
                    onClick={() => navigate("/checkout")}
                    className="mt-6 bg-indigo-600 text-white px-8 py-3 rounded-lg"
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;
