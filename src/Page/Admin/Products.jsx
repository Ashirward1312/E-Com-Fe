// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Pencil, Trash2, Plus } from "lucide-react";
// import adminApi from "../../services/adminApi";
// import { successToast, errorToast } from "../../utils/toast";

// const Products = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     const fetchProducts = async () => {
//         try {
//             const data = await adminApi.getProducts();
//             setProducts(data);
//         } catch (error) {
//             console.log(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDelete = async (id) => {
//         const confirmDelete = window.confirm("Delete this product?");
//         if (!confirmDelete) return;

//         try {
//             await adminApi.deleteProduct(id);
//             setProducts((prev) =>
//                 prev.filter((item) => item.id !== id)
//             );
//             successToast("Product deleted successfully");
//         } catch (error) {
//             console.log(error);
//             errorToast("Delete Failed");
//         }
//     };

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 Loading...
//             </div>
//         );
//     }

//     return (
//         <div className="p-8">

//             {/* Header */}
//             <div className="flex items-center justify-between mb-8">

//                 <h1 className="text-3xl font-bold text-[#0B1C33]">
//                     Products
//                 </h1>

//                 <Link
//                     to="/admin/products/add"
//                     className="flex items-center gap-2 bg-[#C8A45A] text-[#0B1B31] px-5 py-2.5 rounded-lg font-medium hover:bg-[#0B1B31] hover:text-[#C8A45A] transition-all duration-300"                >
//                     <Plus size={18} />
//                     Add Product
//                 </Link>

//             </div>

//             {/* Table */}
//             <div className="bg-white border border-gray-200 rounded-lg">

//                 <table className="w-full text-sm">

//                     <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wide">

//                         <tr>
//                             <th className="p-4 text-left font-semibold">Image</th>
//                             <th className="p-4 text-left font-semibold">Product</th>
//                             <th className="p-4 text-left font-semibold">Category</th>
//                             <th className="p-4 text-left font-semibold">Price</th>
//                             <th className="p-4 text-left font-semibold">Stock</th>
//                             <th className="p-4 text-center font-semibold">Actions</th>
//                         </tr>

//                     </thead>

//                     <tbody>

//                         {products.map((product) => (

//                             <tr
//                                 key={product.id}
//                                 className="border-t hover:bg-gray-50 transition"
//                             >

//                                 <td className="p-4">
//                                     <img
//                                         src={product.image}
//                                         alt={product.name}
//                                         className="w-14 h-14 rounded-md object-cover border"
//                                     />
//                                 </td>

//                                 <td className="p-4 font-medium text-gray-800">
//                                     {product.name}
//                                 </td>

//                                 <td className="p-4 text-gray-600">
//                                     {product.category_name}
//                                 </td>

//                                 <td className="p-4 font-semibold text-[#0B1C33]">
//                                     ₹ {product.price}
//                                 </td>

//                                 <td className="p-4 text-gray-600">
//                                     {product.stock}
//                                 </td>

//                                 <td className="p-4">
//                                     <div className="flex justify-center gap-4">

//                                         <Link
//                                             to={`/admin/products/edit/${product.id}`}
//                                             className="p-2 rounded-md hover:bg-blue-50 transition"
//                                         >
//                                             <Pencil
//                                                 size={18}
//                                                 className="text-blue-600"
//                                             />
//                                         </Link>

//                                         <button
//                                             onClick={() =>
//                                                 handleDelete(product.id)
//                                             }
//                                             className="p-2 rounded-md hover:bg-red-50 transition"
//                                         >
//                                             <Trash2
//                                                 size={18}
//                                                 className="text-red-600"
//                                             />
//                                         </button>

//                                     </div>
//                                 </td>

//                             </tr>

//                         ))}

//                     </tbody>

//                 </table>

//             </div>

//         </div>
//     );
// };

// export default Products;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
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
            setProducts((prev) =>
                prev.filter((item) => item.id !== id)
            );
            successToast("Product deleted successfully");
        } catch (error) {
            console.log(error);
            errorToast("Delete Failed");
        }
    };

    if (loading) {
        return (
            <div className="p-10 text-lg font-semibold">
                Loading...
            </div>
        );
    }

    return (
        <div className="p-10">

            <div className="flex justify-between items-center mb-8">

                <h2 className="text-3xl font-bold text-[#0B1C33]">
                    Products
                </h2>

                <Link
                    to="/admin/products/add"
                    className="bg-[#C8A45A] text-[#0B1C33] px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
                >
                    Add Product
                </Link>

            </div>

            <div className="overflow-x-auto rounded-2xl shadow-md border border-gray-200">

                <table className="min-w-full bg-white">

                    <thead className="bg-[#0B1C33] text-white">

                        <tr>
                            <th className="px-6 py-4 text-left">Image</th>
                            <th className="px-6 py-4 text-left">Book</th>
                            <th className="px-6 py-4 text-left">Author</th>
                            <th className="px-6 py-4 text-left">Category</th>
                            <th className="px-6 py-4 text-left">Pages</th>
                            <th className="px-6 py-4 text-left">Language</th>
                            <th className="px-6 py-4 text-left">Price</th>
                            <th className="px-6 py-4 text-left">Type</th>
                            <th className="px-6 py-4 text-left">Actions</th>
                        </tr>

                    </thead>

                    <tbody>

                        {products.map((product) => {

                            const isOnSale =
                                product.sale_price &&
                                product.sale_price < product.price;

                            return (
                                <tr
                                    key={product.id}
                                    className="border-b hover:bg-gray-50 transition"
                                >

                                    <td className="px-6 py-4">
                                        {product.image && (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-14 h-16 object-contain rounded shadow-sm"
                                            />
                                        )}
                                    </td>

                                    <td className="px-6 py-4 font-semibold text-[#0B1C33]">
                                        {product.name}
                                    </td>

                                    <td className="px-6 py-4 text-gray-600">
                                        {product.author}
                                    </td>

                                    <td className="px-6 py-4 text-gray-600">
                                        {product.category?.name}
                                    </td>

                                    <td className="px-6 py-4 text-gray-600">
                                        {product.pages}
                                    </td>

                                    <td className="px-6 py-4 text-gray-600">
                                        {product.language}
                                    </td>

                                    {/* ✅ PRICE WITH SALE SUPPORT */}
                                    <td className="px-6 py-4">

                                        {isOnSale ? (
                                            <div>
                                                <span className="text-[#C8A45A] font-bold">
                                                    ₹ {product.sale_price}
                                                </span>
                                                <span className="ml-2 text-gray-400 line-through text-sm">
                                                    ₹ {product.price}
                                                </span>
                                                <div className="text-xs text-red-500 font-semibold mt-1">
                                                    {product.discount_percentage}% OFF
                                                </div>
                                            </div>
                                        ) : (
                                            <span className="text-[#C8A45A] font-bold">
                                                ₹ {product.price}
                                            </span>
                                        )}

                                    </td>

                                    <td className="px-6 py-4 text-gray-600">
                                        E‑Book
                                    </td>

                                    <td className="px-6 py-4 flex items-center gap-4">

                                        <Link
                                            to={`/admin/products/edit/${product.id}`}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <Pencil size={18} />
                                        </Link>

                                        <button
                                            onClick={() =>
                                                handleDelete(product.id)
                                            }
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 size={18} />
                                        </button>

                                    </td>

                                </tr>
                            );
                        })}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default Products;