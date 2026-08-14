// import { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { getProductDetail } from "../../services/productApi";
// import CartContext from "../../context/CartContext";
// import { successToast, errorToast } from "../../utils/toast";

// const ProductDetail = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { addToCart } = useContext(CartContext);

//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [quantity, setQuantity] = useState(1);

//     useEffect(() => {
//         fetchProduct();
//     }, [id]);

//     const fetchProduct = async () => {
//         try {
//             const data = await getProductDetail(id);
//             setProduct(data);
//         } catch (error) {
//             errorToast("Product not found");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const increaseQty = () => {
//         if (quantity < product.stock) {
//             setQuantity(quantity + 1);
//         }
//     };

//     const decreaseQty = () => {
//         if (quantity > 1) {
//             setQuantity(quantity - 1);
//         }
//     };

//     const handleAddToCart = () => {
//         addToCart({ ...product, quantity });
//         successToast("Product added to cart");
//     };

//     const handleBuyNow = () => {
//         addToCart({ ...product, quantity });
//         navigate("/checkout");
//     };

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center min-h-screen text-xl font-semibold">
//                 Loading Product...
//             </div>
//         );
//     }

//     if (!product) {
//         return (
//             <div className="flex justify-center items-center min-h-screen text-xl font-semibold">
//                 Product not found
//             </div>
//         );
//     }

//     return (
//         <div className="bg-gray-50 min-h-screen pt-28 pb-32">

//             <div className="max-w-7xl mx-auto px-6">

//                 {/* ✅ Breadcrumb */}
//                 <div className="mb-8 text-sm text-gray-500 flex gap-2 flex-wrap">
//                     <Link to="/" className="hover:text-[#C8A45A] transition">
//                         Home
//                     </Link>
//                     /
//                     <Link
//                         to="/products"
//                         className="hover:text-[#C8A45A] transition"
//                     >
//                         Products
//                     </Link>
//                     /
//                     <span className="text-[#0B1C33] font-medium">
//                         {product.name}
//                     </span>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-16 items-start">

//                     {/* ✅ IMAGE */}
//                     <div className="bg-white rounded-3xl shadow-lg p-10 flex justify-center items-center group">
//                         <img
//                             src={product.image}
//                             alt={product.name}
//                             className="max-h-[500px] object-contain transition-transform duration-500 group-hover:scale-105"
//                         />
//                     </div>

//                     {/* ✅ DETAILS */}
//                     <div>

//                         <span className="inline-block bg-[#C8A45A]/10 text-[#C8A45A] text-xs font-semibold px-4 py-1 rounded-full mb-4">
//                             {product.category?.name}
//                         </span>

//                         <h1 className="text-4xl font-extrabold text-[#0B1C33]">
//                             {product.name}
//                         </h1>

//                         <div className="mt-6 flex items-center gap-4">
//                             <span className="text-4xl font-bold text-[#C8A45A]">
//                                 ₹ {product.price}
//                             </span>

//                             {product.stock > 0 ? (
//                                 <span className="text-green-600 text-sm bg-green-100 px-3 py-1 rounded-full">
//                                     In Stock
//                                 </span>
//                             ) : (
//                                 <span className="text-red-600 text-sm bg-red-100 px-3 py-1 rounded-full">
//                                     Out of Stock
//                                 </span>
//                             )}
//                         </div>

//                         <p className="mt-8 text-gray-600 leading-relaxed text-lg">
//                             {product.description}
//                         </p>

//                         {/* ✅ Quantity Selector */}
//                         {product.stock > 0 && (
//                             <div className="mt-8 flex items-center gap-6">

//                                 <div className="flex items-center border rounded-lg overflow-hidden">

//                                     <button
//                                         onClick={decreaseQty}
//                                         className="px-4 py-2 bg-gray-100 hover:bg-gray-200"
//                                     >
//                                         −
//                                     </button>

//                                     <span className="px-6 font-semibold">
//                                         {quantity}
//                                     </span>

//                                     <button
//                                         onClick={increaseQty}
//                                         className="px-4 py-2 bg-gray-100 hover:bg-gray-200"
//                                     >
//                                         +
//                                     </button>

//                                 </div>

//                                 <span className="text-sm text-gray-500">
//                                     Available: {product.stock}
//                                 </span>

//                             </div>
//                         )}

//                         {/* ✅ Buttons */}
//                         <div className="mt-10 flex flex-col sm:flex-row gap-4">

//                             <button
//                                 onClick={handleAddToCart}
//                                 disabled={product.stock <= 0}
//                                 className="flex-1 bg-[#0B1C33] text-white py-4 rounded-xl font-semibold hover:bg-[#162e4f] transition disabled:bg-gray-400"
//                             >
//                                 Add to Cart
//                             </button>

//                             <button
//                                 onClick={handleBuyNow}
//                                 disabled={product.stock <= 0}
//                                 className="flex-1 bg-[#C8A45A] text-[#0B1C33] py-4 rounded-xl font-semibold hover:bg-yellow-400 transition disabled:bg-gray-300"
//                             >
//                                 Buy Now
//                             </button>

//                         </div>

//                     </div>
//                 </div>
//             </div>

//             {/* ✅ Sticky Bottom Add To Cart (Mobile UX) */}
//             {product.stock > 0 && (
//                 <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg p-4 flex justify-between items-center md:hidden">

//                     <div>
//                         <p className="text-sm text-gray-500">Total</p>
//                         <p className="font-bold text-[#C8A45A] text-lg">
//                             ₹ {product.price * quantity}
//                         </p>
//                     </div>

//                     <button
//                         onClick={handleAddToCart}
//                         className="bg-[#0B1C33] text-white px-6 py-3 rounded-lg"
//                     >
//                         Add to Cart
//                     </button>

//                 </div>
//             )}

//         </div>
//     );
// };

// export default ProductDetail;


import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { getProductDetail } from "../../services/productApi";
import CartContext from "../../context/CartContext";
import { successToast, errorToast } from "../../utils/toast";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const data = await getProductDetail(id);
            setProduct(data);
        } catch (error) {
            errorToast("Product not found");
        } finally {
            setLoading(false);
        }
    };



    const handleBuyNow = () => {
        addToCart({ ...product, quantity: 1 });
        navigate("/checkout");
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen pt-32">
                Loading...
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex justify-center items-center min-h-screen pt-32">
                Product not found
            </div>
        );
    }

    const hasDiscount =
        product.sale_price &&
        product.sale_price < product.price;

    return (
        <div className="bg-gray-50 min-h-screen pt-36 pb-20">

            <div className="max-w-6xl mx-auto px-8">

                {/* Back Button */}
                <div className="mb-6">
                    <button
                        onClick={() => navigate("/books")}
                        className="w-full sm:w-auto inline-flex justify-center items-center gap-2 border-2 border-[#0B1C33] text-[#0B1C33] px-8 py-3.5 rounded-xl font-bold hover:bg-[#0B1C33] hover:text-white transition"
                    >
                        <span>&larr;</span> Back to Products
                    </button>
                </div>

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Link to="/" className="hover:text-[#C8A45A]">Home</Link>
                    <ChevronRight size={16} />
                    <Link to="/books" className="hover:text-[#C8A45A]">Books</Link>
                    <ChevronRight size={16} />
                    <span className="text-[#0B1C33] font-medium truncate">{product.name}</span>
                </div>

                <div className="grid md:grid-cols-2 gap-16 bg-white shadow-2xl rounded-3xl p-12">

                    {/* LEFT IMAGE */}
                    <div className="flex justify-center">

                        <div className="bg-gray-100 rounded-2xl p-8 shadow-inner w-full max-w-sm">

                            <img
                                src={product.image || "/book-placeholder.png"}
                                alt={product.name}
                                className="w-full max-h-[360px] object-contain mx-auto"
                            />

                        </div>

                    </div>

                    {/* RIGHT DETAILS */}
                    <div>

                        <p className="text-xs uppercase tracking-widest text-[#C8A45A] font-semibold">
                            Digital E‑Book
                        </p>

                        <h1 className="text-4xl font-bold text-[#0B1C33] mt-3 leading-tight">
                            {product.name}
                        </h1>

                        <div className="mt-6">

                            {hasDiscount ? (
                                <div className="flex items-center gap-4">
                                    <span className="text-3xl font-bold text-[#C8A45A]">
                                        ₹ {product.sale_price}
                                    </span>
                                    <span className="text-xl text-gray-400 line-through">
                                        ₹ {product.price}
                                    </span>
                                    <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-semibold">
                                        {product.discount_percentage}% OFF
                                    </span>
                                </div>
                            ) : (
                                <span className="text-3xl font-bold text-[#C8A45A]">
                                    ₹ {product.price}
                                </span>
                            )}

                        </div>

                        {/* Info Section */}
                        <div className="mt-8 border-t border-b border-gray-200 py-6 space-y-4">

                            <div className="flex justify-between">
                                <span className="text-gray-500 font-medium">
                                    Author
                                </span>
                                <span className="text-[#0B1C33]">
                                    {product.author || "IASVeda"}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500 font-medium">
                                    Pages
                                </span>
                                <span className="text-[#0B1C33]">
                                    {product.pages || "--"}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500 font-medium">
                                    Language
                                </span>
                                <span className="text-[#0B1C33]">
                                    {product.language || "English"}
                                </span>
                            </div>

                        </div>

                        {/* Description */}
                        <div className="mt-6 text-gray-600 leading-relaxed">
                            {product.description}
                        </div>

                        {/* Buttons */}
                        <div className="mt-10 space-y-4">

                            <button
                                onClick={handleBuyNow}
                                className="w-full bg-[#C8A45A] text-[#0B1C33] py-3 rounded-xl font-semibold hover:bg-yellow-400 transition shadow-md"
                            >
                                Buy Now
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ProductDetail;