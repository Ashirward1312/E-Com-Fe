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
import { Link, useNavigate } from "react-router-dom";
import { getProducts } from "../../services/productApi";
import CartContext from "../../context/CartContext";
import { successToast } from "../../utils/toast";

const Product = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [onSaleOnly, setOnSaleOnly] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [
        products,
        selectedCategories,
        selectedLanguages,
        onSaleOnly,
        searchTerm
    ]);

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
            setFilteredProducts(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let updated = [...products];

        if (selectedCategories.length > 0) {
            updated = updated.filter((p) =>
                selectedCategories.includes(p.category?.name)
            );
        }

        if (selectedLanguages.length > 0) {
            updated = updated.filter((p) =>
                selectedLanguages.includes(p.language)
            );
        }


        if (onSaleOnly) {
            updated = updated.filter((p) => p.price < 300);
        }

        if (searchTerm) {
            updated = updated.filter((p) =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredProducts(updated);
    };

    const toggleSelection = (value, list, setList) => {
        if (list.includes(value)) {
            setList(list.filter((item) => item !== value));
        } else {
            setList([...list, value]);
        }
    };

    const handleBuyNow = (product) => {
        addToCart(product);
        navigate("/cart");
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20 text-xl font-semibold">
                Loading...
            </div>
        );
    }

    const uniqueCategories = [
        ...new Set(products.map((p) => p.category?.name)),
    ];

    const uniqueLanguages = [
        ...new Set(products.map((p) => p.language)),
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-20">

            <div className="max-w-7xl mx-auto px-8">

                <div className="relative mb-20 flex justify-center overflow-hidden">

                    {/* Background Glow */}
                    <div className="absolute -top-10 h-64 w-64 rounded-full bg-[#C8A45A]/10 blur-3xl"></div>

                    <div className="relative text-center">

                        {/* Premium Label */}
                        <div className="inline-flex items-center rounded-full border border-[#C8A45A]/25 bg-[#0B1C33]/5 px-5 py-2 backdrop-blur-sm">

                            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#C8A45A]">
                                Civil Services E-Library
                            </span>

                        </div>

                        {/* Heading */}
                        <h1 className="mt-8 text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none">

                            <span className="text-[#0B1C33]">
                                IAS
                            </span>

                            <span className="mx-3"></span>

                            <span className="bg-gradient-to-r from-[#B8862D] via-[#E2BE6A] to-[#B8862D] bg-clip-text text-transparent">
                                VEDA
                            </span>

                        </h1>

                        {/* Subtitle */}
                        <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-[0.18em] uppercase text-[#0B1C33]/85">
                            Digital Library
                        </h2>

                        {/* Premium Divider */}
                        <div className="mt-8 flex items-center justify-center gap-4">

                            <div className="h-px w-14 bg-gradient-to-r from-transparent to-[#C8A45A]"></div>

                            <div className="h-2.5 w-2.5 rounded-full bg-[#C8A45A] shadow-[0_0_12px_rgba(200,164,90,0.7)]"></div>

                            <div className="h-1 w-32 rounded-full bg-gradient-to-r from-[#B8862D] via-[#E2BE6A] to-[#B8862D]"></div>

                            <div className="h-2.5 w-2.5 rounded-full bg-[#C8A45A] shadow-[0_0_12px_rgba(200,164,90,0.7)]"></div>

                            <div className="h-px w-14 bg-gradient-to-l from-transparent to-[#C8A45A]"></div>

                        </div>

                    </div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

                    {/* SIDEBAR */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-8">

                            <h2 className="text-xl font-bold text-[#0B1C33]">
                                Filters
                            </h2>

                            {/* Search */}
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#C8A45A]"
                            />

                            {/* Category */}
                            <div>
                                <h3 className="font-semibold mb-2">Category</h3>
                                {uniqueCategories.map((cat, i) => (
                                    <label key={i} className="flex items-center gap-2 text-sm">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(cat)}
                                            onChange={() =>
                                                toggleSelection(cat, selectedCategories, setSelectedCategories)
                                            }
                                            className="accent-[#C8A45A]"
                                        />
                                        {cat}
                                    </label>
                                ))}
                            </div>

                            {/* Language */}
                            <div>
                                <h3 className="font-semibold mb-2">Language</h3>
                                {uniqueLanguages.map((lang, i) => (
                                    <label key={i} className="flex items-center gap-2 text-sm">
                                        <input
                                            type="checkbox"
                                            checked={selectedLanguages.includes(lang)}
                                            onChange={() =>
                                                toggleSelection(lang, selectedLanguages, setSelectedLanguages)
                                            }
                                            className="accent-[#C8A45A]"
                                        />
                                        {lang}
                                    </label>
                                ))}
                            </div>


                            {/* On Sale */}
                            <div>
                                <h3 className="font-semibold mb-2">Offers</h3>
                                <label className="flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={onSaleOnly}
                                        onChange={() => setOnSaleOnly(!onSaleOnly)}
                                        className="accent-[#C8A45A]"
                                    />
                                    On Sale
                                </label>
                            </div>

                        </div>
                    </div>

                    {/* PRODUCT GRID */}
                    <div className="lg:col-span-3">
                        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

                            {filteredProducts.map((product) => {

                                const isOnSale =
                                    product.sale_price &&
                                    product.sale_price < product.price;

                                return (
                                    <div
                                        key={product.id}
                                        className="relative flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-xl transition"
                                    >

                                        {/* BADGES */}
                                        <div className="absolute top-4 left-4 flex gap-2 z-10">

                                            {isOnSale && (
                                                <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
                                                    {product.discount_percentage}% OFF
                                                </span>
                                            )}


                                        </div>

                                        <div className="flex items-center justify-center bg-gray-100 p-6 rounded-t-2xl">
                                            <div className="max-w-[180px]">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-[240px] object-contain"
                                                />
                                            </div>
                                        </div>

                                        <div className="p-6 flex flex-col flex-1">
                                            <h2 className="font-bold text-[#0B1C33] text-lg line-clamp-2">
                                                {product.name}
                                            </h2>

                                            {isOnSale ? (
                                                <div className="mt-3 flex items-center gap-3">
                                                    <span className="text-2xl font-bold text-[#C8A45A]">
                                                        ₹{product.sale_price}
                                                    </span>
                                                    <span className="text-lg text-gray-400 line-through">
                                                        ₹{product.price}
                                                    </span>
                                                </div>
                                            ) : (
                                                <p className="mt-3 text-2xl font-bold text-[#C8A45A]">
                                                    ₹{product.price}
                                                </p>
                                            )}

                                            <div className="mt-auto pt-6 space-y-3">

                                                <Link
                                                    to={`/books/${product.id}`}
                                                    className="w-full inline-flex justify-center items-center gap-2 bg-[#0B1C33] text-white py-3 rounded-xl font-semibold hover:bg-[#162e4f] transition"
                                                >
                                                    View Details
                                                </Link>

                                                <button
                                                    onClick={() =>
                                                        handleBuyNow(product)
                                                    }
                                                    className="w-full rounded-lg bg-[#C8A45A] py-2.5 font-semibold text-[#0B1C33] hover:bg-yellow-400 shadow-md transition"
                                                >
                                                    Buy Now
                                                </button>

                                            </div>
                                        </div>

                                    </div>
                                );
                            })}

                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Product;