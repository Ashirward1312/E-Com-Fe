import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";
import adminApi from "../../services/adminApi";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await adminApi.getProducts();
            setProducts(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Delete this product?"
        );

        if (!confirmDelete) return;

        try {
            await adminApi.deleteProduct(id);

            setProducts((prev) =>
                prev.filter((item) => item.id !== id)
            );

            alert("Product deleted successfully");
        } catch (error) {
            console.log(error);
            alert("Delete Failed");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                Loading...
            </div>
        );
    }

    return (
        <div className="space-y-6">

            <div className="flex items-center justify-between">

                <h1 className="text-3xl font-bold">
                    Products
                </h1>

                <Link
                    to="/admin/products/add"
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg"
                >
                    <Plus size={18} />
                    Add Product
                </Link>

            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">
                                Image
                            </th>

                            <th className="p-4 text-left">
                                Product
                            </th>

                            <th className="p-4 text-left">
                                Category
                            </th>

                            <th className="p-4 text-left">
                                Price
                            </th>

                            <th className="p-4 text-left">
                                Stock
                            </th>

                            <th className="p-4 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {products.map((product) => (

                            <tr
                                key={product.id}
                                className="border-t"
                            >

                                <td className="p-4">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-16 h-16 rounded object-cover"
                                    />
                                </td>

                                <td className="p-4">
                                    {product.name}
                                </td>

                                <td className="p-4">
                                    {product.category_name}
                                </td>

                                <td className="p-4">
                                    ₹ {product.price}
                                </td>

                                <td className="p-4">
                                    {product.stock}
                                </td>

                                <td className="p-4">

                                    <div className="flex justify-center gap-3">

                                        <Link
                                            to={`/admin/products/edit/${product.id}`}
                                        >
                                            <Pencil
                                                size={18}
                                                className="text-blue-600"
                                            />
                                        </Link>

                                        <button
                                            onClick={() =>
                                                handleDelete(product.id)
                                            }
                                        >
                                            <Trash2
                                                size={18}
                                                className="text-red-600"
                                            />
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default Products;