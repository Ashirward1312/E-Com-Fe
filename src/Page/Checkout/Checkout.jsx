import { useNavigate } from "react-router-dom";
import { checkout } from "../../services/orderApi";
import { getCart, clearCart } from "../../utils/cart";
import { syncCart } from "../../services/cartApi";
import { successToast, errorToast } from "../../utils/toast";

const Checkout = () => {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const cart = getCart();

            if (cart.length === 0) {
                errorToast("Your cart is empty.");
                return;
            }

            await syncCart(
                cart.map((item) => ({
                    product_id: item.product_id,
                    quantity: 1,
                }))
            );

            const data = await checkout();

            clearCart();

            successToast("Purchase Successful");

            navigate("/order-success", {
                state: data.order,
                replace: true,
            });

        } catch (error) {

            console.error(error);

            errorToast(
                error.response?.data?.detail ||
                error.response?.data?.message ||
                "Checkout Failed"
            );
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-10">

            <h1 className="text-3xl font-bold mb-6">
                Checkout
            </h1>

            <div className="border rounded-lg p-6 mb-6">

                <h2 className="text-xl font-semibold mb-3">
                    Digital Purchase
                </h2>

                <p className="text-gray-600">
                    You are purchasing digital e-books.
                </p>

                <p className="text-gray-600 mt-2">
                    After successful payment, the books will
                    be available in your <strong>My Library</strong>.
                </p>

            </div>

            <form onSubmit={handleSubmit}>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg"
                >
                    Proceed to Payment
                </button>

            </form>

        </div>
    );
};

export default Checkout;