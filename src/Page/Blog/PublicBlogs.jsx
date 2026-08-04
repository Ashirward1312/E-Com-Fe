import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import adminApi from "../../services/adminApi"; // Ideally use a public API, but for now we'll fetch from adminApi

const PublicBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                // Fetch blogs using the existing API endpoint
                const data = await adminApi.getBlogs();
                // Filter only published blogs for the public view
                const publishedBlogs = data.filter(blog => blog.is_published);
                setBlogs(publishedBlogs);
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
                <div className="text-xl font-semibold text-gray-500">Loading blogs...</div>
            </div>
        );
    }

    return (
        <div className="max-w-[1200px] mx-auto px-6 py-16">
            {/* Header section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#0B1B31] mb-4">
                    Latest <span className="text-[#C8A45A]">Articles</span>
                </h1>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                    Stay updated with the latest news, insights, and study materials for your IAS preparation journey.
                </p>
            </div>

            {/* Blog Grid */}
            {blogs.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-3xl">
                    <h2 className="text-2xl font-bold text-[#0B1B31] mb-2">No Articles Yet</h2>
                    <p className="text-gray-500">Check back later for new content.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <Link
                            to={`/blogs/${blog.slug}`}
                            key={blog.id}
                            className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col group"
                        >
                            {/* Image Container */}
                            <div className="h-56 bg-gray-200 overflow-hidden relative">
                                {blog.featured_image ? (
                                    <img
                                        src={blog.featured_image}
                                        alt={blog.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-[#132743] text-gray-400">
                                        No Image
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 bg-[#C8A45A] text-[#0B1B31] text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                    {new Date(blog.created_at).toLocaleDateString(undefined, {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col flex-1">
                                <h3 className="text-xl font-bold text-[#0B1B31] mb-3 line-clamp-2 group-hover:text-[#C8A45A] transition-colors">
                                    {blog.title}
                                </h3>
                                <p className="text-gray-500 line-clamp-3 mb-6 flex-1">
                                    {blog.excerpt || "Click to read more about this topic..."}
                                </p>
                                
                                <div className="mt-auto flex items-center text-[#C8A45A] font-semibold">
                                    Read Full Article
                                    <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
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
