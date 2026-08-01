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

            if (error.response && error.response.data) {
                const data = error.response.data;

                if (data.stock_error) {
                    errorToast(data.stock_error);
                } else if (data.product_error) {
                    errorToast(data.product_error);
                } else if (typeof data === "string") {
                    errorToast(data);
                } else {
                    errorToast(Object.values(data)[0]);
                }

            } else {
                errorToast("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">

            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-lg p-10">

                {/* ✅ Centered Heading with Gold Touch */}
                <div className="text-center mb-12">

                    <h1 className="text-3xl font-bold text-[#0B1C33]">

                        CHECKOUT
                    </h1>

                    <div className="w-16 h-1 bg-[#C8A45A] mx-auto mt-3 rounded-full"></div>

                    <p className="text-gray-500 mt-4">
                        Complete your shipping details below
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-8"
                >

                    {/* Personal Info Grid */}
                    <div className="grid md:grid-cols-2 gap-6">

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8A45A]"
                                name="full_name"
                                value={form.full_name}
                                onChange={handleChange}
                                placeholder="Full Name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Phone
                            </label>
                            <input
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8A45A]"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8A45A]"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                            />
                        </div>

                    </div>

                    {/* Address */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <textarea
                            rows="4"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8A45A]"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            placeholder="Address"
                            required
                        />
                    </div>

                    {/* City / State / Pincode */}
                    <div className="grid md:grid-cols-3 gap-6">

                        <input
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8A45A]"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            placeholder="City"
                            required
                        />

                        <input
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8A45A]"
                            name="state"
                            value={form.state}
                            onChange={handleChange}
                            placeholder="State"
                            required
                        />

                        <input
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8A45A]"
                            name="pincode"
                            value={form.pincode}
                            onChange={handleChange}
                            placeholder="Pincode"
                            required
                        />

                    </div>

                    {/* Payment */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Payment Method
                        </label>
                        <select
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8A45A]"
                            name="payment_method"
                            value={form.payment_method}
                            onChange={handleChange}
                        >
                            <option value="cod">
                                Cash On Delivery
                            </option>
                            <option value="online">
                                Online Payment
                            </option>
                        </select>
                    </div>

                    {/* Submit */}
                    <div className="text-center pt-4">
                        <button
                            type="submit"
                            className="bg-[#0B1C33] text-white px-10 py-3 rounded-md hover:bg-[#162e4f] transition font-medium"
                        >
                            Place Order
                        </button>
                    </div>

                </form>

            </div>

        </div>
    );
};

export default Checkout;