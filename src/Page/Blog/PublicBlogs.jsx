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

            {/* ✅ Premium Heading Section */}
            <div className="relative text-center mb-20">
                {/* Decorative Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#C8A45A]/10 blur-[80px] rounded-full -z-10"></div>
                
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#F3EFE6] text-[#C8A45A] font-semibold text-sm uppercase tracking-widest mb-6">
                    <span className="w-2 h-2 rounded-full bg-[#C8A45A] animate-pulse"></span>
                    Our Blog
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0B1B31] tracking-tight leading-tight mb-6">
                    Discover Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8A45A] to-[#B19047]">Articles</span>
                </h1>

                <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                    Stay updated with the latest news, insights, and study
                    materials meticulously curated for your IAS preparation journey.
                </p>
                
                <div className="mt-8 flex justify-center items-center gap-2">
                    <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#C8A45A] rounded-full"></div>
                    <div className="w-2 h-2 bg-[#C8A45A] rounded-full transform rotate-45"></div>
                    <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#C8A45A] rounded-full"></div>
                </div>
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
                            className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(200,164,90,0.15)] hover:border-[#C8A45A]/30 transition-all duration-500 group flex flex-col items-center text-center relative overflow-hidden"
                        >
                            {/* Decorative Top Accent */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C8A45A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Date Badge */}
                            <div className="mb-6 inline-flex items-center justify-center bg-[#F3EFE6] text-[#C8A45A] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                                {new Date(blog.created_at).toLocaleDateString(
                                    undefined,
                                    { month: "long", day: "numeric", year: "numeric" }
                                )}
                            </div>

                            {/* Title */}
                            <h3 className="text-xl md:text-2xl font-bold text-[#0B1B31] mb-4 line-clamp-2 group-hover:text-[#C8A45A] transition-colors duration-300 leading-tight">
                                {blog.title}
                            </h3>

                            {/* Excerpt */}
                            <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-8 flex-1">
                                {blog.meta_description || "Click to explore this topic in detail and gain comprehensive insights..."}
                            </p>

                            {/* CTA */}
                            <div className="mt-auto inline-flex items-center justify-center gap-2 text-[#0B1B31] font-semibold text-sm group-hover:text-[#C8A45A] transition-colors duration-300">
                                <span>Read Article</span>
                                <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-[#C8A45A]/10 flex items-center justify-center transition-colors duration-300">
                                    <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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