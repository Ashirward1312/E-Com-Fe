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
        successToast("Product added to cart.");
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                Loading...
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-12 bg-gray-50 min-h-screen">

            <h1 className="mb-10 text-3xl font-bold text-[#0B1C33]">
                Our Collection
            </h1>

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {products.map((product) => (
                    <div
                        key={product.id}
                        className="rounded-2xl border border-gray-200 bg-white p-4 transition hover:shadow-xl flex flex-col"
                    >

                        {/* ✅ Bigger Image Section */}
                        <div className="flex items-center justify-center bg-gray-100 rounded-xl h-80 mb-5 p-3">

                            <img
                                src={product.image}
                                alt={product.name}
                                className="max-h-full max-w-full object-contain"
                            />

                        </div>

                        <h2 className="text-lg font-semibold text-[#0B1C33]">
                            {product.name}
                        </h2>

                        <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                            {product.description}
                        </p>

                        <p className="mt-4 text-xl font-bold text-[#C8A45A]">
                            ₹{product.price}
                        </p>

                        <div className="mt-auto pt-6 flex flex-col gap-3">

                            <Link
                                to={`/products/${product.id}`}
                                className="w-full rounded-lg bg-[#0B1C33] py-2 text-center text-white hover:bg-[#162e4f] transition"
                            >
                                View Details
                            </Link>

                            <button
                                onClick={() => handleAddToCart(product)}
                                className="w-full rounded-lg bg-[#C8A45A] py-2 text-[#0B1C33] font-semibold hover:bg-yellow-400 transition"
                            >
                                Add to Cart
                            </button>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default Product;