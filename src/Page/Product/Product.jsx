import { useEffect, useState ,useContext} from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../services/productApi";
import CartContext from "../../context/CartContext";
import { successToast, errorToast } from "../../utils/toast";


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
        <div className="container mx-auto px-4 py-10">
            <h1 className="mb-8 text-3xl font-bold">
                Products
            </h1>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

                {products.map((product) => (
                    <div
                        key={product.id}
                        className="overflow-hidden rounded-xl border bg-white shadow-sm"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-60 w-full object-cover"
                        />

                        <div className="p-4">

                            <h2 className="text-lg font-semibold">
                                {product.name}
                            </h2>

                            <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                                {product.description}
                            </p>

                            <p className="mt-3 text-xl font-bold text-indigo-600">
                                ₹{product.price}
                            </p>

                            <Link
                                to={`/products/${product.id}`}
                                className="mt-4 block rounded-lg bg-indigo-600 py-2 text-center text-white hover:bg-indigo-700"
                            >
                                View Details
                            </Link>

                            <button
                                onClick={() => handleAddToCart(product)}
                                className="rounded-lg bg-orange-500 px-4 py-2 text-white"
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