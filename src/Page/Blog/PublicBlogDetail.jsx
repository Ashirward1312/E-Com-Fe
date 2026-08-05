import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBlog } from "../../services/blogApi";

const PublicBlogDetail = () => {

    const { slug } = useParams();

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchBlog = async () => {

            try {
                const data = await getBlog(slug);
                setBlog(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }

        };

        fetchBlog();

    }, [slug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <h2 className="text-lg font-medium text-gray-500">
                    Loading...
                </h2>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="text-center py-24">
                <h2 className="text-3xl font-bold mb-6 text-[#0B1B31]">
                    Blog Not Found
                </h2>

                <Link to="/blogs">
                    <button className="bg-gradient-to-r from-[#0B1B31] to-[#1c355e] text-white px-6 py-2.5 rounded-xl shadow-md hover:shadow-xl transition">
                        Back to Blogs
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f8f9fc] via-white to-[#f5f7fb] pt-32 pb-20">

            <div className="max-w-5xl mx-auto px-6">

                {/* ✅ Back Button */}
                <div className="mb-12">
                    <Link to="/blogs">
                        <button className="group bg-[#0B1B31] text-white px-7 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                            <span className="group-hover:-translate-x-1 transition-transform duration-300">
                                ←
                            </span>
                            Back to Blogs
                        </button>
                    </Link>
                </div>

                {/* ✅ Title Section */}
                <div className="text-center mb-10">

                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#0B1B31] leading-tight">
                        {blog.title}
                    </h1>

                    <div className="w-24 h-1.5 bg-gradient-to-r from-[#C8A45A] to-[#e6c06d] mx-auto mt-5 rounded-full"></div>

                    <p className="text-gray-500 mt-6 text-sm tracking-wide">
                        {new Date(blog.created_at).toLocaleDateString(
                            "en-IN",
                            {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            }
                        )}
                    </p>

                </div>

                {/* ✅ Premium Image Frame */}
                {blog.image && (
                    <div className="flex justify-center mb-16">

                        <div className="relative">

                            {/* Decorative Glow */}
                            <div className="absolute -inset-4 bg-[#C8A45A]/10 rounded-3xl blur-2xl"></div>

                            <div className="relative w-80 h-80 bg-white rounded-3xl shadow-2xl flex items-center justify-center p-8 border border-gray-100">

                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="max-w-full max-h-full object-contain"
                                />

                            </div>

                        </div>

                    </div>
                )}

                {/* ✅ Content Section */}
                <div className="max-w-3xl mx-auto">

                    <div className="bg-white shadow-xl rounded-3xl p-10 border border-gray-100">

                        <div className="text-gray-700 leading-8 text-[16px] whitespace-pre-wrap">
                            {blog.content}
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default PublicBlogDetail;