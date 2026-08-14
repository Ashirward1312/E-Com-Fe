import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";
import adminApi from "../../services/adminApi";
import { successToast, errorToast } from "../../utils/toast";

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
        if (!window.confirm("Delete this product?")) return;

        try {
            await adminApi.deleteProduct(id);
            setProducts((prev) => prev.filter((item) => item.id !== id));
            successToast("Product deleted successfully");
        } catch (error) {
            console.log(error);
            errorToast("Delete Failed");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20 text-lg font-semibold text-gray-500">
                Loading...
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1C33]">
                        Products
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Manage all digital e-books
                    </p>
                </div>

                <Link
                    to="/admin/products/add"
                    className="inline-flex items-center gap-2 bg-[#C8A45A] text-[#0B1C33] px-5 py-2.5 rounded-xl font-semibold hover:bg-yellow-400 transition text-sm self-start sm:self-auto"
                >
                    <Plus size={18} />
                    Add Product
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl shadow-sm border border-gray-200">
                <table className="min-w-full bg-white text-sm">

                    <thead className="bg-[#0B1C33] text-white">
                        <tr>
                            <th className="px-4 py-4 text-left whitespace-nowrap">Image</th>
                            <th className="px-4 py-4 text-left whitespace-nowrap">Book</th>
                            <th className="px-4 py-4 text-left whitespace-nowrap">Author</th>
                            <th className="px-4 py-4 text-left whitespace-nowrap">Category</th>
                            <th className="px-4 py-4 text-left whitespace-nowrap">Pages</th>
                            <th className="px-4 py-4 text-left whitespace-nowrap">Language</th>
                            <th className="px-4 py-4 text-left whitespace-nowrap">Price</th>
                            <th className="px-4 py-4 text-left whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="py-10 text-center text-gray-500">
                                    No products found.
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => {
                                const isOnSale =
                                    product.sale_price &&
                                    product.sale_price < product.price;

                                return (
                                    <tr
                                        key={product.id}
                                        className="border-b hover:bg-gray-50 transition"
                                    >

                                        <td className="px-4 py-4">
                                            {product.image && (
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-12 h-14 object-contain rounded shadow-sm"
                                                />
                                            )}
                                        </td>

                                        <td className="px-4 py-4 font-semibold text-[#0B1C33] max-w-[160px]">
                                            <span className="line-clamp-2">{product.name}</span>
                                        </td>

                                        <td className="px-4 py-4 text-gray-600 whitespace-nowrap">
                                            {product.author}
                                        </td>

                                        <td className="px-4 py-4 text-gray-600 whitespace-nowrap">
                                            {product.category?.name}
                                        </td>

                                        <td className="px-4 py-4 text-gray-600 whitespace-nowrap">
                                            {product.pages}
                                        </td>

                                        <td className="px-4 py-4 text-gray-600 whitespace-nowrap">
                                            {product.language}
                                        </td>

                                        <td className="px-4 py-4 whitespace-nowrap">
                                            {isOnSale ? (
                                                <div>
                                                    <span className="text-[#C8A45A] font-bold">
                                                        ₹ {product.sale_price}
                                                    </span>
                                                    <span className="ml-2 text-gray-400 line-through text-xs">
                                                        ₹ {product.price}
                                                    </span>
                                                    <div className="text-xs text-red-500 font-semibold mt-0.5">
                                                        {product.discount_percentage}% OFF
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-[#C8A45A] font-bold">
                                                    ₹ {product.price}
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <Link
                                                    to={`/admin/products/edit/${product.id}`}
                                                    className="p-1.5 rounded-md hover:bg-blue-50 transition"
                                                >
                                                    <Pencil size={17} className="text-blue-600" />
                                                </Link>

                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-1.5 rounded-md hover:bg-red-50 transition"
                                                >
                                                    <Trash2 size={17} className="text-red-600" />
                                                </button>
                                            </div>
                                        </td>

                                    </tr>
                                );
                            })
                        )}
                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default Products;