import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../../services/blogApi";

const PublicBlogs = () => {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchBlogs = async () => {
            try {
                const data = await getBlogs();
                setBlogs(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();

    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="text-lg font-medium text-gray-500">
                    Loading blogs...
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-[1200px] mx-auto px-6 pt-24 pb-16">

            {/* ✅ Heading Section (Thoda niche kiya) */}
            <div className="text-center mb-14">

                <h1 className="text-4xl md:text-5xl font-bold text-[#0B1B31]">
                    Latest <span className="text-[#C8A45A]">Articles</span>
                </h1>

                <div className="w-20 h-1 bg-[#C8A45A] mx-auto mt-4 rounded-full"></div>

                <p className="text-gray-500 mt-6 max-w-2xl mx-auto">
                    Stay updated with the latest news, insights, and study
                    materials for your IAS preparation journey.
                </p>

            </div>

            {blogs.length === 0 ? (

                <div className="text-center py-20 bg-gray-50 rounded-3xl shadow-sm">
                    <h2 className="text-xl font-semibold text-[#0B1B31] mb-2">
                        No Articles Yet
                    </h2>
                    <p className="text-gray-500">
                        Check back later for new content.
                    </p>
                </div>

            ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

                    {blogs.map((blog) => (

                        <Link
                            key={blog.id}
                            to={`/blogs/${blog.slug}`}
                            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col"
                        >

                            {/* ✅ Square Image - Full Visible */}
                            <div className="aspect-square bg-gray-100 flex items-center justify-center p-4 relative">

                                {blog.image ? (
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="text-gray-400 text-sm">
                                        No Image
                                    </div>
                                )}

                                {/* Date Badge */}
                                <div className="absolute top-4 left-4 bg-[#C8A45A] text-[#0B1B31] text-xs font-semibold px-3 py-1 rounded-full shadow">
                                    {new Date(blog.created_at).toLocaleDateString(
                                        undefined,
                                        {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        }
                                    )}
                                </div>

                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-1">

                                <h3 className="text-lg font-semibold text-[#0B1B31] mb-3 line-clamp-2 group-hover:text-[#C8A45A] transition">
                                    {blog.title}
                                </h3>

                                <p className="text-gray-500 text-sm line-clamp-3 mb-5 flex-1">
                                    {blog.meta_description ||
                                        "Click to read more about this topic..."}
                                </p>

                                <div className="mt-auto flex items-center text-[#C8A45A] font-medium text-sm">
                                    Read Full Article
                                    <svg
                                        className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </svg>
                                </div>

                            </div>

                        </Link>

                    ))}

                </div>

            )}

        </div>
    );
};

export default PublicBlogs;