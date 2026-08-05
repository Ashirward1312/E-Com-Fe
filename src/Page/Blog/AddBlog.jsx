// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import adminApi from "../../services/adminApi";

// const AddBlog = () => {

//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         title: "",
//         excerpt: "",
//         content: "",
//         featured_image: null,
//         is_published: true,
//     });

//     const handleChange = (e) => {
//         const { name, value, type, checked, files } = e.target;

//         setFormData({
//             ...formData,
//             [name]:
//                 type === "checkbox"
//                     ? checked
//                     : type === "file"
//                         ? files[0]
//                         : value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {

//             const data = new FormData();

//             data.append("title", formData.title);
//             data.append("excerpt", formData.excerpt);
//             data.append("content", formData.content);
//             data.append("is_published", formData.is_published);

//             if (formData.featured_image) {
//                 data.append("featured_image", formData.featured_image);
//             }

//             await adminApi.addBlog(data);

//             navigate("/admin/blogs");

//         } catch (error) {
//             console.log(error);
//             alert("Error saving blog: " + (error.response?.data ? JSON.stringify(error.response.data) : error.message));
//         }
//     };

//     return (
//         <div className="max-w-4xl mx-auto">
//             {/* Header */}
//             <div className="mb-8">
//                 <h1 className="text-3xl font-bold text-[#0B1B31]">Add New Blog</h1>
//                 <p className="text-gray-500 mt-1">Create a new article for your readers</p>
//             </div>

//             <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm space-y-8">

//                 {/* Title */}
//                 <div>
//                     <label className="block text-sm font-semibold text-[#0B1B31] mb-2">Blog Title</label>
//                     <input
//                         type="text"
//                         name="title"
//                         placeholder="Enter an engaging title..."
//                         value={formData.title}
//                         onChange={handleChange}
//                         required
//                         className="w-full bg-gray-50 border border-gray-200 text-[#0B1B31] text-sm rounded-xl focus:ring-2 focus:ring-[#C8A45A] focus:border-transparent p-4 transition-all duration-300"
//                     />
//                 </div>

//                 {/* Excerpt */}
//                 <div>
//                     <label className="block text-sm font-semibold text-[#0B1B31] mb-2">Short Excerpt</label>
//                     <textarea
//                         name="excerpt"
//                         placeholder="A brief summary of the blog..."
//                         value={formData.excerpt}
//                         onChange={handleChange}
//                         rows="3"
//                         className="w-full bg-gray-50 border border-gray-200 text-[#0B1B31] text-sm rounded-xl focus:ring-2 focus:ring-[#C8A45A] focus:border-transparent p-4 transition-all duration-300"
//                     />
//                 </div>

//                 {/* Content */}
//                 <div>
//                     <label className="block text-sm font-semibold text-[#0B1B31] mb-2">Full Content</label>
//                     <textarea
//                         name="content"
//                         placeholder="Write your full article here..."
//                         rows="12"
//                         value={formData.content}
//                         onChange={handleChange}
//                         required
//                         className="w-full bg-gray-50 border border-gray-200 text-[#0B1B31] text-sm rounded-xl focus:ring-2 focus:ring-[#C8A45A] focus:border-transparent p-4 transition-all duration-300"
//                     />
//                 </div>

//                 {/* Image & Publish Toggle */}
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pt-4 border-t border-gray-100">
//                     <div>
//                         <label className="block text-sm font-semibold text-[#0B1B31] mb-2">Featured Image</label>
//                         <input
//                             type="file"
//                             name="featured_image"
//                             onChange={handleChange}
//                             className="block w-full text-sm text-gray-500
//                                 file:mr-4 file:py-2 file:px-4
//                                 file:rounded-full file:border-0
//                                 file:text-sm file:font-semibold
//                                 file:bg-[#0B1B31] file:text-white
//                                 hover:file:bg-[#132743] transition-all cursor-pointer"
//                         />
//                     </div>

//                     <label className="flex items-center gap-3 cursor-pointer">
//                         <span className="text-sm font-semibold text-[#0B1B31]">Publish Immediately</span>
//                         <div className="relative">
//                             <input
//                                 type="checkbox"
//                                 name="is_published"
//                                 checked={formData.is_published}
//                                 onChange={handleChange}
//                                 className="sr-only peer"
//                             />
//                             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C8A45A]"></div>
//                         </div>
//                     </label>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
//                     <button
//                         type="button"
//                         onClick={() => navigate("/admin/blogs")}
//                         className="px-8 py-3 rounded-xl font-semibold text-gray-500 hover:bg-gray-100 transition"
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         type="submit"
//                         className="bg-[#0B1B31] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#132743] transition shadow-md"
//                     >
//                         Save Blog
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default AddBlog;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createBlog } from "../../services/blogApi";
import {
    successToast,
    errorToast,
} from "../../utils/toast";

const AddBlog = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        image: null,
        content: "",
        meta_title: "",
        meta_description: "",
        meta_keywords: "",
        is_active: true,
    });

    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked,
            files,
        } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : type === "file"
                        ? files[0]
                        : value,
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const data = new FormData();

            data.append(
                "title",
                formData.title
            );

            data.append(
                "content",
                formData.content
            );

            data.append(
                "meta_title",
                formData.meta_title
            );

            data.append(
                "meta_description",
                formData.meta_description
            );

            data.append(
                "meta_keywords",
                formData.meta_keywords
            );

            data.append(
                "is_active",
                formData.is_active
            );

            if (formData.image) {
                data.append(
                    "upload_image",
                    formData.image
                );
            }

            await createBlog(data);

            successToast(
                "Blog created successfully."
            );

            navigate("/admin/blogs");

        } catch (error) {

            console.log(error);

            errorToast(
                "Failed to create blog."
            );

        } finally {

            setLoading(false);

        }

    };

    return (
        <div>

            <h2>Add Blog</h2>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Title</label>

                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Image</label>

                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Content</label>

                    <textarea
                        name="content"
                        rows="8"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Meta Title</label>

                    <input
                        type="text"
                        name="meta_title"
                        value={formData.meta_title}
                        onChange={handleChange}
                    />
                </div>

                <br />

                <div>
                    <label>Meta Description</label>

                    <textarea
                        name="meta_description"
                        rows="3"
                        value={formData.meta_description}
                        onChange={handleChange}
                    />
                </div>

                <br />

                <div>
                    <label>Meta Keywords</label>

                    <input
                        type="text"
                        name="meta_keywords"
                        value={formData.meta_keywords}
                        onChange={handleChange}
                    />
                </div>

                <br />

                <div>

                    <label>

                        <input
                            type="checkbox"
                            name="is_active"
                            checked={formData.is_active}
                            onChange={handleChange}
                        />

                        Active

                    </label>

                </div>

                <br />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Saving..."
                        : "Save Blog"}
                </button>

            </form>

        </div>
    );
};

export default AddBlog;