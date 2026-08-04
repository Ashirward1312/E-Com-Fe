import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import adminApi from "../../services/adminApi"; // Fetching public blogs

const PublicBlogDetail = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                // If there's a dedicated getPublicBlog use that, otherwise we'll get it from adminApi for now
                const data = await adminApi.getBlog(slug);
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
                <div className="text-xl font-semibold text-gray-500">Loading article...</div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="text-center py-20 min-h-[60vh]">
                <h2 className="text-3xl font-bold text-[#0B1B31] mb-4">Article Not Found</h2>
                <Link to="/blogs" className="text-[#C8A45A] font-semibold hover:underline">
                    &larr; Back to all blogs
                </Link>
            </div>
        );
    }

    return (
        <article className="max-w-[900px] mx-auto px-6 py-16">
            <Link to="/blogs" className="text-[#C8A45A] font-semibold hover:underline inline-flex items-center mb-8 transition-transform hover:-translate-x-2">
                &larr; Back to Articles
            </Link>

            <header className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#0B1B31] mb-6 leading-tight">
                    {blog.title}
                </h1>
                <div className="flex items-center justify-center gap-4 text-gray-500">
                    <span>
                        {new Date(blog.created_at).toLocaleDateString(undefined, {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>Admin</span>
                </div>
            </header>

            {blog.featured_image && (
                <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-12">
                    <img
                        src={blog.featured_image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <div className="prose prose-lg max-w-none prose-headings:text-[#0B1B31] prose-a:text-[#C8A45A]">
                {/* Normally we'd use dangerouslySetInnerHTML if it's HTML, but for now just outputting string or pre-wrap */}
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-lg">
                    {blog.content}
                </div>
            </div>
        </article>
    );
};

export default PublicBlogDetail;
