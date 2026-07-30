import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import adminApi from "../../services/adminApi";
import { successToast, errorToast } from "../../utils/toast";

const AddProduct = () => {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        category: "",
        name: "",
        description: "",
        price: "",
        stock: "",
        image: null,
        is_active: true,
    });

    const [loading, setLoading] = useState(false);

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

            const data = new FormData();

            data.append("category_id", formData.category);
            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("price", formData.price);
            data.append("stock", formData.stock);
            data.append("is_active", formData.is_active);

            if (formData.image) {
                data.append("upload_image", formData.image);
            }

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
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">

            <h1 className="text-3xl font-bold mb-8">
                Add Product
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                <div>

                    <label className="block mb-2 font-medium">
                        Product Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                        required
                    />

                </div>

                <div>

                    <label className="block mb-2 font-medium">
                        Category
                    </label>

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                        required
                    >

                        <option value="">
                            Select Category
                        </option>

                        {categories.map((category) => (

                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>

                        ))}

                    </select>

                </div>

                <div>

                    <label className="block mb-2 font-medium">
                        Description
                    </label>

                    <textarea
                        rows="5"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                        required
                    />

                </div>

                <div className="grid grid-cols-2 gap-6">

                    <div>

                        <label className="block mb-2 font-medium">
                            Price
                        </label>

                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                            required
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium">
                            Stock
                        </label>

                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                            required
                        />

                    </div>

                </div>

                <div>

                    <label className="block mb-2 font-medium">
                        Product Image
                    </label>

                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full"
                    />

                </div>

                <div className="flex items-center gap-3">

                    <input
                        type="checkbox"
                        name="is_active"
                        checked={formData.is_active}
                        onChange={handleChange}
                    />

                    <label>
                        Active Product
                    </label>

                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
                >
                    {loading ? "Saving..." : "Save Product"}
                </button>

            </form>

        </div>
    );
};

export default AddProduct;