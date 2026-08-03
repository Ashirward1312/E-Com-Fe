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
        sale_price: "", // ✅ ADDED
        pages: "",
        language: "English",
        image: null,
        ebook: null,
        preview: null,
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {

            // ✅ Sale validation
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

            // ✅ Append sale price only if filled
            if (formData.sale_price) {
                data.append("sale_price", formData.sale_price);
            }

            data.append("pages", formData.pages);
            data.append("language", formData.language);
            data.append("is_active", formData.is_active);

            if (formData.image) data.append("upload_image", formData.image);
            if (formData.ebook) data.append("upload_ebook", formData.ebook);
            if (formData.preview) data.append("upload_preview", formData.preview);

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

    return (
        <div className="min-h-screen bg-gray-100 p-10">

            <div className="max-w-5xl mx-auto bg-white border border-gray-200 shadow-md rounded-lg">

                {/* Header */}
                <div className="border-b px-8 py-6 bg-gray-50 rounded-t-lg">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Add Product
                    </h2>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                                Category
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                            >
                                <option value="">Select Category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Book Name */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                                Book Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                            />
                        </div>

                        {/* Author */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                                Author
                            </label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                            />
                        </div>

                        {/* Actual Price */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                                Actual Price
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                            />
                        </div>

                        {/* ✅ SALE PRICE */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                                Sale Price (Optional)
                            </label>
                            <input
                                type="number"
                                name="sale_price"
                                value={formData.sale_price}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                            />
                            <p className="text-xs text-gray-400 mt-1">
                                Leave empty if no sale
                            </p>
                        </div>

                        {/* Pages */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                                Pages
                            </label>
                            <input
                                type="number"
                                name="pages"
                                value={formData.pages}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                            />
                        </div>

                        {/* Language */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                                Language
                            </label>
                            <select
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                            >
                                <option value="English">English</option>
                                <option value="Hindi">Hindi</option>
                            </select>
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                            />
                        </div>

                        {/* Cover Image */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                                Cover Image
                            </label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                className="w-full text-sm"
                            />
                        </div>

                        {/* Ebook */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                                E-book PDF
                            </label>
                            <input
                                type="file"
                                name="ebook"
                                accept=".pdf"
                                onChange={handleChange}
                                className="w-full text-sm"
                            />
                        </div>

                        {/* Preview */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                                Preview PDF
                            </label>
                            <input
                                type="file"
                                name="preview"
                                accept=".pdf"
                                onChange={handleChange}
                                className="w-full text-sm"
                            />
                        </div>

                        {/* Active */}
                        <div className="flex items-center mt-6">
                            <input
                                type="checkbox"
                                name="is_active"
                                checked={formData.is_active}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <label className="text-sm text-gray-700">
                                Active Product
                            </label>
                        </div>

                    </div>

                    {/* Submit */}
                    <div className="mt-10 border-t pt-6 text-right">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-gray-800 text-white px-8 py-2 rounded-md hover:bg-black transition disabled:opacity-50"
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