import { useNavigate } from "react-router-dom";
import {
    createPayment,
    verifyPayment,
} from "../../services/orderApi";
import { getCart, clearCart } from "../../utils/cart";
import { syncCart } from "../../services/cartApi";
import {
    successToast,
    errorToast,
} from "../../utils/toast";

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

            const payment = await createPayment();

            const options = {

                key: payment.key,

                amount: payment.amount,

                currency: payment.currency,

                name: "IASVeda",

                description: "E-Book Purchase",

                order_id: payment.razorpay_order_id,

                handler: async function (response) {

                    try {

                        const verify = await verifyPayment({

                            order_id: payment.order_id,

                            razorpay_order_id:
                                response.razorpay_order_id,

                            razorpay_payment_id:
                                response.razorpay_payment_id,

                            razorpay_signature:
                                response.razorpay_signature,

                        });

                        clearCart();

                        successToast(
                            verify.message
                        );

                        navigate(
                            "/order-success",
                            {
                                state: verify.order,
                                replace: true,
                            }
                        );

                    } catch (error) {

                        console.log(error);

                        errorToast(
                            "Payment verification failed."
                        );

                    }

                },

                prefill: {

                    name: "",

                    email: "",

                    contact: "",

                },

                theme: {

                    color: "#4F46E5",

                },

            };

            const razorpay = new window.Razorpay(
                options
            );

            razorpay.open();

        } catch (error) {

            console.log(error);

            errorToast(
                error.response?.data?.detail ||
                error.response?.data?.message ||
                "Payment Failed"
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
                    After successful payment, your books will be available in
                    <strong> My Library</strong>.
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