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
        return <div>Loading...</div>;
    }

    return (
        <div>

            <div style={{ marginBottom: "20px" }}>
                <h2>Products</h2>

                <Link to="/admin/products/add">
                    Add Product
                </Link>
            </div>

            <table border="1" cellPadding="10" width="100%">

                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Book</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Pages</th>
                        <th>Language</th>
                        <th>Price</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {products.map((product) => (

                        <tr key={product.id}>

                            <td>
                                {product.image && (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        width="60"
                                    />
                                )}
                            </td>

                            <td>{product.name}</td>

                            <td>{product.author}</td>

                            <td>{product.category?.name}</td>

                            <td>{product.pages}</td>

                            <td>{product.language}</td>

                            <td>₹ {product.price}</td>

                            <td>E-Book</td>

                            <td>

                                <Link
                                    to={`/admin/products/edit/${product.id}`}
                                >
                                    <Pencil size={18} />
                                </Link>

                                {"  "}

                                <button
                                    onClick={() =>
                                        handleDelete(product.id)
                                    }
                                >
                                    <Trash2 size={18} />
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
};

export default Products;