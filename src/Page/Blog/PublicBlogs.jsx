// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getBlogs } from "../../services/blogApi";
// import { BookOpen, Clock, Star, Zap, ChevronRight, FileText, HelpCircle, MessageSquare } from "lucide-react";

// const PublicBlogs = () => {

//     const [blogs, setBlogs] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchBlogs = async () => {
//             try {
//                 const data = await getBlogs();
//                 setBlogs(data);
//             } catch (error) {
//                 console.log(error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchBlogs();
//     }, []);

//     return (
//         <div className="max-w-[1200px] mx-auto px-6 pt-24 pb-16">

//             {/* Heading Section */}
//             <div className="relative text-center mb-14">

//                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#C8A45A]/10 blur-[80px] rounded-full -z-10"></div>

//                 <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0B1B31] tracking-tight leading-tight mb-5">
//                     Discover Latest{" "}
//                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8A45A] to-[#B19047]">
//                         Content
//                     </span>
//                 </h1>

//                 <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
//                     Stay updated with the latest news, insights, and current affairs for your IAS preparation.
//                 </p>

//                 <div className="mt-6 flex justify-center items-center gap-2">
//                     <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#C8A45A] rounded-full"></div>
//                     <div className="w-2 h-2 bg-[#C8A45A] rounded-full transform rotate-45"></div>
//                     <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#C8A45A] rounded-full"></div>
//                 </div>
//             </div>

//             {/* ── ARTICLES GRID ── */}
//             <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#F3EFE6] text-[#C8A45A] font-semibold text-xs uppercase tracking-widest mb-8">
//                 <span className="w-2 h-2 rounded-full bg-[#C8A45A] animate-pulse"></span>
//                 Current Affairs
//             </div>

//                     {loading ? (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//                             {[1,2,3].map(i => (
//                                 <div key={i} className="bg-white rounded-3xl p-8 animate-pulse border border-gray-100">
//                                     <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
//                                     <div className="h-3 bg-gray-100 rounded w-full mb-2" />
//                                     <div className="h-3 bg-gray-100 rounded w-2/3" />
//                                 </div>
//                             ))}
//                         </div>
//                     ) : blogs.length === 0 ? (
//                         <div className="text-center py-20 bg-gray-50 rounded-3xl shadow-sm">
//                             <h2 className="text-xl font-semibold text-[#0B1B31] mb-2">No Articles Yet</h2>
//                             <p className="text-gray-500">Check back later for new content.</p>
//                         </div>
//                     ) : (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//                             {blogs.map((blog) => (
//                                 <Link
//                                     key={blog.id}
//                                     to={`/current-affairs/${blog.id}`}
//                                     className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(200,164,90,0.15)] hover:border-[#C8A45A]/30 transition-all duration-500 group flex flex-col items-center text-center relative overflow-hidden"
//                                 >
//                                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C8A45A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

//                                     <div className="mb-6 inline-flex items-center justify-center bg-[#F3EFE6] text-[#C8A45A] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
//                                         {new Date(blog.created_at).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
//                                     </div>

//                                     <h3 className="text-xl md:text-2xl font-bold text-[#0B1B31] mb-8 line-clamp-3 group-hover:text-[#C8A45A] transition-colors duration-300 leading-tight">
//                                         {blog.title}
//                                     </h3>

//                                     <div className="mt-auto inline-flex items-center justify-center gap-2 text-[#0B1B31] font-semibold text-sm group-hover:text-[#C8A45A] transition-colors duration-300">
//                                         <span>Read Article</span>
//                                         <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-[#C8A45A]/10 flex items-center justify-center transition-colors duration-300">
//                                             <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                                             </svg>
//                                         </div>
//                                     </div>
//                                 </Link>
//                             ))}
//                         </div>
//                     )}


//         </div>
//     );
// };

// export default PublicBlogs;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../../services/blogApi";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PublicBlogs = () => {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalBlogs, setTotalBlogs] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);

    const fetchBlogs = async (page = 1) => {
        try {
            setLoading(true);

            const data = await getBlogs(page);

            setBlogs(data.results);
            setTotalBlogs(data.count);
            setCurrentPage(page);

            setHasNextPage(Boolean(data.next));
            setHasPreviousPage(Boolean(data.previous));

        } catch (error) {
            console.log(error);
            setBlogs([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs(1);
    }, []);

    const handlePrevious = () => {
        if (hasPreviousPage && currentPage > 1) {
            fetchBlogs(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (hasNextPage) {
            fetchBlogs(currentPage + 1);
        }
    };

    return (
        <div className="max-w-[1200px] mx-auto px-6 pt-24 pb-16">

            {/* Heading Section */}
            <div className="relative text-center mb-14">

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#C8A45A]/10 blur-[80px] rounded-full -z-10"></div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0B1B31] tracking-tight leading-tight mb-5">
                    Discover Latest{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8A45A] to-[#B19047]">
                        Content
                    </span>
                </h1>

                <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                    Stay updated with the latest news, insights, and current affairs for your IAS preparation.
                </p>

                <div className="mt-6 flex justify-center items-center gap-2">
                    <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#C8A45A] rounded-full"></div>
                    <div className="w-2 h-2 bg-[#C8A45A] rounded-full transform rotate-45"></div>
                    <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#C8A45A] rounded-full"></div>
                </div>

            </div>

            {/* ARTICLES GRID */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#F3EFE6] text-[#C8A45A] font-semibold text-xs uppercase tracking-widest mb-8">

                <span className="w-2 h-2 rounded-full bg-[#C8A45A] animate-pulse"></span>

                Current Affairs

                {totalBlogs > 0 && (
                    <span className="bg-[#C8A45A]/20 px-2 py-0.5 rounded-full">
                        {totalBlogs}
                    </span>
                )}

            </div>

            {/* Loading */}
            {loading ? (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

                    {[1, 2, 3].map((i) => (

                        <div
                            key={i}
                            className="bg-white rounded-3xl p-8 animate-pulse border border-gray-100"
                        >
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                            <div className="h-3 bg-gray-100 rounded w-full mb-2" />
                            <div className="h-3 bg-gray-100 rounded w-2/3" />
                        </div>

                    ))}

                </div>

            ) : blogs.length === 0 ? (

                /* No Articles */
                <div className="text-center py-20 bg-gray-50 rounded-3xl shadow-sm">

                    <h2 className="text-xl font-semibold text-[#0B1B31] mb-2">
                        No Articles Yet
                    </h2>

                    <p className="text-gray-500">
                        Check back later for new content.
                    </p>

                </div>

            ) : (

                <>
                    {/* Blog Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

                        {blogs.map((blog) => (

                            <Link
                                key={blog.id}
                                to={`/current-affairs/${blog.id}`}
                                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(200,164,90,0.15)] hover:border-[#C8A45A]/30 transition-all duration-500 group flex flex-col items-center text-center relative overflow-hidden"
                            >

                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C8A45A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="mb-6 inline-flex items-center justify-center bg-[#F3EFE6] text-[#C8A45A] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                                    {new Date(
                                        blog.created_at
                                    ).toLocaleDateString(
                                        undefined,
                                        {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        }
                                    )}
                                </div>

                                <h3 className="text-xl md:text-2xl font-bold text-[#0B1B31] mb-8 line-clamp-3 group-hover:text-[#C8A45A] transition-colors duration-300 leading-tight">
                                    {blog.title}
                                </h3>

                                <div className="mt-auto inline-flex items-center justify-center gap-2 text-[#0B1B31] font-semibold text-sm group-hover:text-[#C8A45A] transition-colors duration-300">

                                    <span>
                                        Read Article
                                    </span>

                                    <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-[#C8A45A]/10 flex items-center justify-center transition-colors duration-300">

                                        <svg
                                            className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-300"
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

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-12">

                        {/* Total */}
                        <div className="text-sm text-gray-500">
                            Total Articles:{" "}
                            <span className="font-semibold text-[#0B1B31]">
                                {totalBlogs}
                            </span>
                        </div>

                        {/* Pagination Buttons */}
                        <div className="flex items-center gap-3">

                            {/* Previous */}
                            <button
                                onClick={handlePrevious}
                                disabled={
                                    !hasPreviousPage ||
                                    loading
                                }
                                className="
                                    flex items-center gap-2
                                    px-4 py-2.5
                                    rounded-xl
                                    border border-gray-200
                                    bg-white
                                    text-[#0B1B31]
                                    font-semibold
                                    text-sm
                                    hover:border-[#C8A45A]
                                    hover:text-[#C8A45A]
                                    transition
                                    disabled:opacity-40
                                    disabled:cursor-not-allowed
                                "
                            >
                                <ChevronLeft size={18} />
                                Previous
                            </button>

                            {/* Current Page */}
                            <span
                                className="
                                    min-w-10
                                    h-10
                                    px-3
                                    flex items-center
                                    justify-center
                                    rounded-xl
                                    bg-[#0B1B31]
                                    text-white
                                    text-sm
                                    font-bold
                                "
                            >
                                {currentPage}
                            </span>

                            {/* Next */}
                            <button
                                onClick={handleNext}
                                disabled={
                                    !hasNextPage ||
                                    loading
                                }
                                className="
                                    flex items-center gap-2
                                    px-4 py-2.5
                                    rounded-xl
                                    border border-gray-200
                                    bg-white
                                    text-[#0B1B31]
                                    font-semibold
                                    text-sm
                                    hover:border-[#C8A45A]
                                    hover:text-[#C8A45A]
                                    transition
                                    disabled:opacity-40
                                    disabled:cursor-not-allowed
                                "
                            >
                                Next
                                <ChevronRight size={18} />
                            </button>

                        </div>

                    </div>
                </>
            )}

        </div>
    );
};

export default PublicBlogs;
