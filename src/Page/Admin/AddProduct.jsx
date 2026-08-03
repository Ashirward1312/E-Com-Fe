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

            const data = new FormData();

            data.append("category_id", formData.category);
            data.append("name", formData.name);
            data.append("author", formData.author);
            data.append("description", formData.description);
            data.append("price", formData.price);
            data.append("pages", formData.pages);
            data.append("language", formData.language);
            data.append("is_active", formData.is_active);

            if (formData.image) {
                data.append("upload_image", formData.image);
            }

            if (formData.ebook) {
                data.append("upload_ebook", formData.ebook);
            }

            if (formData.preview) {
                data.append("upload_preview", formData.preview);
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
        <div>

            <h2>Add Product</h2>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Category</label>

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
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

                <br />

                <div>
                    <label>Book Name</label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Author</label>

                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Description</label>

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="5"
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Price</label>

                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Pages</label>

                    <input
                        type="number"
                        name="pages"
                        value={formData.pages}
                        onChange={handleChange}
                    />
                </div>

                <br />

                <div>
                    <label>Language</label>

                    <select
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                    >
                        <option value="English">
                            English
                        </option>

                        <option value="Hindi">
                            Hindi
                        </option>
                    </select>
                </div>

                <br />

                <div>
                    <label>Cover Image</label>

                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </div>

                <br />

                <div>
                    <label>E-book PDF</label>

                    <input
                        type="file"
                        name="ebook"
                        accept=".pdf"
                        onChange={handleChange}
                    />
                </div>

                <br />

                <div>
                    <label>Preview PDF</label>

                    <input
                        type="file"
                        name="preview"
                        accept=".pdf"
                        onChange={handleChange}
                    />
                </div>

                <br />

                <div>

                    <label>

                        <input
                            type="checkbox"
                            name="is_active"
                            checked={formData.is_active}
                            onChange={handleChange}
                        />

                        Active

                    </label>

                </div>

                <br />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Save Product"}
                </button>

            </form>

        </div>
    );
};

export default AddProduct;