import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart,
} from "../../services/cartApi";

const Cart = () => {
    const navigate = useNavigate();

    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const data = await getCart();
            setCart(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const increaseQty = async (item) => {
        try {
            await updateCartItem(item.id, item.quantity + 1);
            fetchCart();
        } catch (error) {
            alert(
                error.response?.data?.detail ||
                error.response?.data?.error ||
                "Unable to update quantity."
            );
        }
    };

    const decreaseQty = async (item) => {
        if (item.quantity === 1) {
            removeItem(item.id);
            return;
        }

        try {
            await updateCartItem(item.id, item.quantity - 1);
            fetchCart();
        } catch (error) {
            console.log(error);
        }
    };

    const removeItem = async (itemId) => {
        try {
            await removeCartItem(itemId);
            fetchCart();
        } catch (error) {
            console.log(error);
        }
    };

    const handleClearCart = async () => {
        try {
            await clearCart();
            fetchCart();
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return <h2 className="text-center mt-10">Loading...</h2>;
    }

    if (!cart || cart.items.length === 0) {
        return (
            <div className="text-center mt-20">
                <h2 className="text-2xl font-bold">
                    Your Cart is Empty
                </h2>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10">

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-3xl font-bold">
                    Shopping Cart
                </h1>

                <button
                    onClick={handleClearCart}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                    Clear Cart
                </button>

            </div>

            {cart.items.map((item) => (

                <div
                    key={item.id}
                    className="flex items-center gap-6 border rounded-lg p-4 mb-4"
                >

                    <img
                        src={item.product_image}
                        alt={item.product_name}
                        className="w-28 h-28 object-cover rounded"
                    />

                    <div className="flex-1">

                        <h2 className="text-xl font-semibold">
                            {item.product_name}
                        </h2>

                        <p className="text-gray-500">
                            ₹{item.product_price}
                        </p>

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

                        <h3 className="font-bold text-lg">
                            ₹{item.subtotal}
                        </h3>

                        <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 mt-2"
                        >
                            Remove
                        </button>

                    </div>

                </div>

            ))}

            <div className="mt-10 border-t pt-6">

                <h2 className="text-2xl font-bold">
                    Total Items : {cart.total_items}
                </h2>

                <h2 className="text-3xl font-bold mt-2">
                    Total : ₹{cart.total_price}
                </h2>

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