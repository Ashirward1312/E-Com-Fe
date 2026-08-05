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
            <div className="text-center py-20">
                <h2 className="text-xl font-semibold">
                    Loading...
                </h2>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="text-center py-20">

                <h2 className="text-3xl font-bold mb-4">
                    Blog Not Found
                </h2>

                <Link
                    to="/blogs"
                    className="text-blue-600 hover:underline"
                >
                    ← Back to Blogs
                </Link>

            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">

            <Link
                to="/blogs"
                className="text-blue-600 hover:underline"
            >
                ← Back to Blogs
            </Link>

            <h1 className="text-4xl font-bold mt-6 mb-3">
                {blog.title}
            </h1>

            <p className="text-gray-500 mb-8">
                {new Date(blog.created_at).toLocaleDateString(
                    "en-IN",
                    {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    }
                )}
            </p>

            {blog.image && (

                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full rounded-xl shadow-lg mb-10"
                />

            )}

            <div className="text-gray-700 leading-8 whitespace-pre-wrap">
                {blog.content}
            </div>

        </div>
    );
};

export default PublicBlogDetail;