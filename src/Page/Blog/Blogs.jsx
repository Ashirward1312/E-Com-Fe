import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import adminApi from "../../services/adminApi";

const Blogs = () => {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const data = await adminApi.getBlogs();
            setBlogs(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (slug) => {
        if (!window.confirm("Delete this blog?")) return;

        try {
            await adminApi.deleteBlog(slug);
            fetchBlogs();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#0B1B31]">Blogs Management</h1>
                    <p className="text-gray-500 mt-1">Manage and publish your articles</p>
                </div>
                <Link
                    to="/admin/blogs/add"
                    className="bg-[#C8A45A] text-[#0B1B31] px-6 py-2.5 rounded-xl font-semibold hover:bg-yellow-500 transition shadow-md"
                >
                    + Add New Blog
                </Link>
            </div>

            {/* Blog List */}
            {blogs.length === 0 ? (
                <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center shadow-sm">
                    <h2 className="text-xl font-bold text-[#0B1B31] mb-2">No Blogs Found</h2>
                    <p className="text-gray-500 mb-6">Start writing to engage your audience.</p>
                    <Link
                        to="/admin/blogs/add"
                        className="inline-block bg-[#0B1B31] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#132743] transition"
                    >
                        Create First Blog
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog) => (
                        <div
                            key={blog.id}
                            className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
                        >
                            {/* Image Placeholder or Actual Image */}
                            <div className="h-48 bg-gray-100 flex items-center justify-center relative">
                                {blog.featured_image ? (
                                    <img
                                        src={blog.featured_image}
                                        alt={blog.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-gray-400 font-medium">No Image</span>
                                )}
                                <span
                                    className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-full ${
                                        blog.is_published
                                            ? "bg-green-100 text-green-700"
                                            : "bg-gray-200 text-gray-700"
                                    }`}
                                >
                                    {blog.is_published ? "PUBLISHED" : "DRAFT"}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-1">
                                <h2 className="text-lg font-bold text-[#0B1B31] line-clamp-2 leading-snug">
                                    {blog.title}
                                </h2>
                                <p className="text-sm text-gray-400 mt-2">
                                    Created on {new Date(blog.created_at).toLocaleDateString()}
                                </p>

                                <div className="mt-auto pt-6 flex gap-3">
                                    <Link
                                        to={`/admin/blogs/edit/${blog.slug}`}
                                        className="flex-1 text-center bg-gray-50 border border-gray-200 text-[#0B1B31] px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-100 transition"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(blog.slug)}
                                        className="flex-1 text-center bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-100 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Blogs;