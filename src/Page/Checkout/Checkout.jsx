import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkout } from "../../services/orderApi";
import { getCart, clearCart } from "../../utils/cart";
import { syncCart } from "../../services/cartApi";
import { successToast, errorToast } from "../../utils/toast";
const Checkout = () => {



    const [form, setForm] = useState(() => {
        const saved = localStorage.getItem("checkoutForm");

        return saved
            ? JSON.parse(saved)
            : {
                full_name: "",
                phone: "",
                email: "",
                address: "",
                city: "",
                state: "",
                pincode: "",
                payment_method: "cod",
            };
    });

    const navigate = useNavigate();



    const handleChange = (e) => {
        const updatedForm = {
            ...form,
            [e.target.name]: e.target.value,
        };

        setForm(updatedForm);

        localStorage.setItem(
            "checkoutForm",
            JSON.stringify(updatedForm)
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const cart = getCart();

            if (cart.length === 0) {
                successToast("Your cart is empty.");
                return;
            }

            await syncCart(
                cart.map((item) => ({
                    product_id: item.product_id,
                    quantity: item.quantity,
                }))
            );

            const data = await checkout(form);

            clearCart();
            localStorage.removeItem("checkoutForm");

            navigate("/order-success", {
                state: data.order,
                replace: true,
            });

        } catch (error) {
            console.error("Checkout Error:", error);

            errorToast(error.message || "Checkout Failed");
        }
    };


    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto p-8 space-y-5"
        >
            <input
                className="w-full border rounded-lg px-4 py-3"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                placeholder="Full Name"
            />

            <input
                className="w-full border rounded-lg px-4 py-3"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
            />

            <input
                className="w-full border rounded-lg px-4 py-3"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
            />

            <textarea
                className="w-full border rounded-lg px-4 py-3"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                rows={4}
            />

            <input
                className="w-full border rounded-lg px-4 py-3"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
            />

            <input
                className="w-full border rounded-lg px-4 py-3"
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="State"
            />

            <input
                className="w-full border rounded-lg px-4 py-3"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                placeholder="Pincode"
            />

            <select
                className="w-full border rounded-lg px-4 py-3"
                name="payment_method"
                value={form.payment_method}
                onChange={handleChange}
            >
                <option value="cod">Cash On Delivery</option>
                <option value="online">Online Payment</option>
            </select>

            <button
                type="submit"
                className="w-full rounded-lg bg-indigo-600 py-3 text-white"
            >
                Place Order
            </button>
        </form>
    )
};

export default Checkout;