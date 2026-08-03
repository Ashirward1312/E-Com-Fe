// import { useEffect, useState, useContext } from "react";
// import { Link } from "react-router-dom";
// import { getProducts } from "../../services/productApi";
// import CartContext from "../../context/CartContext";
// import { successToast } from "../../utils/toast";

// const Product = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const { addToCart } = useContext(CartContext);

//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     const fetchProducts = async () => {
//         try {
//             const data = await getProducts();
//             setProducts(data);
//         } catch (error) {
//             console.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleAddToCart = (product) => {
//         addToCart(product);
//         successToast("Product added to cart.");
//     };

//     if (loading) {
//         return (
//             <div className="flex justify-center py-20">
//                 Loading...
//             </div>
//         );
//     }

//     return (
//         <div className="container mx-auto px-6 pt-32 pb-12 bg-gray-50 min-h-screen">

//             <div className="mb-12 text-center">
//                 <h1 className="text-4xl font-extrabold text-[#0B1C33] tracking-tight">
//                     IASVeda Civil Services Books
//                 </h1>
//                 <div className="w-24 h-1 bg-[#C8A45A] mx-auto mt-4 rounded-full"></div>
//                 <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto">
//                     Explore our comprehensive collection of study materials and premium guides curated specifically for your UPSC preparation.
//                 </p>
//             </div>

//             <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

//                 {products.map((product) => (
//                     <div
//                         key={product.id}
//                         className="rounded-2xl border border-gray-200 bg-white p-4 transition hover:shadow-xl flex flex-col"
//                     >

//                         {/* ✅ Bigger Image Section */}
//                         <div className="flex items-center justify-center bg-gray-100 rounded-xl h-80 mb-5 p-3">

//                             <img
//                                 src={product.image}
//                                 alt={product.name}
//                                 className="max-h-full max-w-full object-contain"
//                             />

//                         </div>

//                         <h2 className="text-lg font-semibold text-[#0B1C33]">
//                             {product.name}
//                         </h2>

//                         <p className="mt-2 text-sm text-gray-500 line-clamp-2">
//                             {product.description}
//                         </p>

//                         <p className="mt-4 text-xl font-bold text-[#C8A45A]">
//                             ₹{product.price}
//                         </p>

//                         <div className="mt-auto pt-6 flex flex-col gap-3">

//                             <Link
//                                 to={`/products/${product.id}`}
//                                 className="w-full rounded-lg bg-[#0B1C33] py-2 text-center text-white hover:bg-[#162e4f] transition"
//                             >
//                                 View Details
//                             </Link>

//                             <button
//                                 onClick={() => handleAddToCart(product)}
//                                 className="w-full rounded-lg bg-[#C8A45A] py-2 text-[#0B1C33] font-semibold hover:bg-yellow-400 transition"
//                             >
//                                 Add to Cart
//                             </button>

//                         </div>

//                     </div>
//                 ))}

//             </div>

//         </div>
//     );
// };

// export default Product;

import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../services/productApi";
import CartContext from "../../context/CartContext";
import { successToast } from "../../utils/toast";

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        successToast("E-book added to cart.");
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20 text-xl font-semibold">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-16">

            <div className="container mx-auto px-6">

                {/* Header */}

                <div className="mb-14 text-center">

                    <h1 className="text-5xl font-extrabold text-[#0B1C33]">
                        IASVeda Digital Library
                    </h1>

                    <div className="mx-auto mt-4 h-1 w-28 rounded-full bg-[#C8A45A]" />

                    <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-500">
                        Explore our premium collection of UPSC E-books,
                        handwritten notes and study material. Purchase
                        once and download instantly after successful
                        payment.
                    </p>

                </div>

                {/* Products */}

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                    {products.map((product) => (

                        <div
                            key={product.id}
                            className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >

                            {/* Cover */}

                            <div className="flex h-80 items-center justify-center bg-gray-100 p-5">

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="max-h-full max-w-full object-contain"
                                />

                            </div>

                            {/* Content */}

                            <div className="flex flex-1 flex-col p-5">

                                <h2 className="line-clamp-2 text-xl font-bold text-[#0B1C33]">
                                    {product.name}
                                </h2>

                                <p className="mt-2 text-sm text-gray-500">
                                    <span className="font-semibold">
                                        Author:
                                    </span>{" "}
                                    {product.author}
                                </p>

                                <div className="mt-4 flex flex-wrap gap-2">

                                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                                        📄 {product.pages} Pages
                                    </span>

                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                        🌐 {product.language}
                                    </span>

                                </div>

                                <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-500">
                                    {product.description}
                                </p>

                                <div className="mt-5">

                                    <p className="text-3xl font-bold text-[#C8A45A]">
                                        ₹{product.price}
                                    </p>

                                </div>

                                <div className="mt-auto space-y-3 pt-6">

                                    <Link
                                        to={`/products/${product.id}`}
                                        className="block w-full rounded-lg bg-[#0B1C33] py-3 text-center font-semibold text-white transition hover:bg-[#16345c]"
                                    >
                                        View Details
                                    </Link>

                                    <button
                                        onClick={() =>
                                            handleAddToCart(product)
                                        }
                                        className="w-full rounded-lg bg-[#C8A45A] py-3 font-semibold text-[#0B1C33] transition hover:bg-yellow-400"
                                    >
                                        Add to Cart
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
};

export default Product;