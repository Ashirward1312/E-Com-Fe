import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import adminApi from "../../services/adminApi";
import { successToast, errorToast } from "../../utils/toast";

const AddProduct = () => {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        category: "",
        name: "",
        author: "",
        description: "",
        price: "",
        sale_price: "",
        pages: "",
        language: "English",
        image: null,
        ebook: null,
        is_active: true,
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await adminApi.getCategories();
            setCategories(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        setFormData({
            ...formData,
            [name]:
                type === "checkbox"
                    ? checked
                    : type === "file"
                        ? files[0]
                        : value,
        });
    };

    const calculateDiscount = () => {
        if (
            formData.sale_price &&
            Number(formData.sale_price) < Number(formData.price)
        ) {
            const discount =
                ((formData.price - formData.sale_price) /
                    formData.price) *
                100;
            return Math.round(discount);
        }
        return 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {

            if (
                formData.sale_price &&
                Number(formData.sale_price) >= Number(formData.price)
            ) {
                errorToast("Sale price must be less than actual price");
                setLoading(false);
                return;
            }

            const data = new FormData();

            data.append("category_id", formData.category);
            data.append("name", formData.name);
            data.append("author", formData.author);
            data.append("description", formData.description);
            data.append("price", formData.price);

            if (formData.sale_price) {
                data.append("sale_price", formData.sale_price);
            }

            data.append("pages", formData.pages);
            data.append("language", formData.language);
            data.append("is_active", formData.is_active);

            if (formData.image) data.append("upload_image", formData.image);
            if (formData.ebook) data.append("upload_ebook", formData.ebook);

            await adminApi.addProduct(data);

            successToast("Product Added Successfully");
            navigate("/admin/products");

        } catch (error) {
            console.log(error);
            errorToast("Failed to Add Product");
        } finally {
            setLoading(false);
        }
    };

    const discount = calculateDiscount();

    return (
        <div className="p-4 sm:p-6 lg:p-8">

            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                {/* Page Header */}
                <div className="border-b px-6 sm:px-10 py-5 bg-white">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0B1C33]">
                        Add New Digital Product
                    </h2>
                    <p className="text-gray-500 mt-1 text-sm">
                        Fill in the details to list a new e-book.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 sm:p-10">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                        {/* Category */}
                        <div>
                            <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                                Category
                            </label>
                            <div className="relative">
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-[#C8A45A]/50 focus:border-[#C8A45A] outline-none transition-all cursor-pointer"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Book Name */}
                        <div>
                            <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                                Book Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-[#C8A45A]/50 focus:border-[#C8A45A] outline-none transition-all"
                            />
                        </div>

                        {/* Author */}
                        <div>
                            <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                                Author
                            </label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-[#C8A45A]/50 focus:border-[#C8A45A] outline-none transition-all"
                            />
                        </div>

                        {/* Actual Price */}
                        <div>
                            <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                                Actual Price (₹)
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-[#C8A45A]/50 focus:border-[#C8A45A] outline-none transition-all"
                            />
                        </div>

                        {/* Sale Price */}
                        <div>
                            <label className="flex items-center gap-2 mb-1.5 text-sm font-semibold text-gray-700">
                                Sale Price (₹)
                                <span className="text-[10px] uppercase tracking-wider bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-bold">
                                    Optional
                                </span>
                            </label>
                            <input
                                type="number"
                                name="sale_price"
                                value={formData.sale_price}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-[#C8A45A]/50 focus:border-[#C8A45A] outline-none transition-all"
                            />
                            {discount > 0 && (
                                <p className="text-xs text-green-600 mt-1.5 font-semibold">
                                    ✅ {discount}% Discount Applied
                                </p>
                            )}
                        </div>

                        {/* Pages */}
                        <div>
                            <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                                Pages
                            </label>
                            <input
                                type="number"
                                name="pages"
                                value={formData.pages}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-[#C8A45A]/50 focus:border-[#C8A45A] outline-none transition-all"
                            />
                        </div>

                        {/* Language */}
                        <div>
                            <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                                Language
                            </label>
                            <div className="relative">
                                <select
                                    name="language"
                                    value={formData.language}
                                    onChange={handleChange}
                                    className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-[#C8A45A]/50 focus:border-[#C8A45A] outline-none transition-all cursor-pointer"
                                >
                                    <option value="English">English</option>
                                    <option value="Hindi">Hindi</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Description */}
                    <div className="mt-6">
                        <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            required
                            className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-[#C8A45A]/50 focus:border-[#C8A45A] outline-none transition-all"
                        />
                    </div>

                    {/* File Uploads */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">

                        {/* Cover Image */}
                        <div>
                            <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                                Cover Image
                            </label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                className="w-full text-sm text-gray-500
                                    file:mr-3 file:py-2 file:px-4
                                    file:rounded-lg file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-[#C8A45A]/10 file:text-[#C8A45A]
                                    hover:file:bg-[#C8A45A]/20 cursor-pointer"
                            />
                        </div>

                        {/* E-book PDF */}
                        <div>
                            <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                                E-book PDF
                            </label>
                            <input
                                type="file"
                                name="ebook"
                                accept=".pdf"
                                onChange={handleChange}
                                className="w-full text-sm text-gray-500
                                    file:mr-3 file:py-2 file:px-4
                                    file:rounded-lg file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-[#0B1C33]/10 file:text-[#0B1C33]
                                    hover:file:bg-[#0B1C33]/20 cursor-pointer"
                            />
                        </div>

                    </div>

                    {/* Active Toggle */}
                    <div className="mt-6 flex items-center gap-3">
                        <input
                            type="checkbox"
                            name="is_active"
                            id="is_active"
                            checked={formData.is_active}
                            onChange={handleChange}
                            className="w-4 h-4 text-[#C8A45A] bg-gray-100 border-gray-300 rounded focus:ring-[#C8A45A] cursor-pointer"
                        />
                        <label htmlFor="is_active" className="text-sm font-semibold text-gray-700 cursor-pointer">
                            Active Product
                        </label>
                    </div>

                    {/* Submit */}
                    <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/products")}
                            className="w-full sm:w-auto border border-gray-300 text-gray-700 px-8 py-3 rounded-xl text-sm font-semibold hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full sm:w-auto bg-[#0B1C33] text-white px-10 py-3 rounded-xl text-sm font-semibold hover:bg-[#162e4f] transition shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? "Saving..." : "Save Product"}
                        </button>
                    </div>

                </form>

            </div>

        </div>
    );
};

export default AddProduct;