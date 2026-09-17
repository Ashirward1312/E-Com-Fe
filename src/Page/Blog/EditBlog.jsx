import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getBlog, updateBlog } from "../../services/blogApi";
import { successToast, errorToast } from "../../utils/toast";
import { UploadCloud } from "lucide-react";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    image: null,
    imagePreview: "",
    content: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    is_active: true,
  });

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const blog = await getBlog(id);

      setFormData({
        title: blog.title,
        image: null,
        imagePreview: blog.image,
        content: blog.content,
        meta_title: blog.meta_title,
        meta_description: blog.meta_description,
        meta_keywords: blog.meta_keywords,
        is_active: blog.is_active,
      });
    } catch (error) {
      console.log(error);
      errorToast("Failed to load current affair.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

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

      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("meta_title", formData.meta_title);
      data.append("meta_description", formData.meta_description);
      data.append("meta_keywords", formData.meta_keywords);
      data.append("is_active", formData.is_active);

      if (formData.image) {
        data.append("upload_image", formData.image);
      }

      await updateBlog(id, data);

      successToast("Current Affair updated successfully.");
      navigate("/admin/blogs");

    } catch (error) {
      console.log(error);
      errorToast("Failed to update current affair.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6fb] py-12 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-[#0B1C33]">
            Edit Current Affair
          </h2>

          <div className="w-16 h-1 bg-[#C8A45A] rounded mt-3"></div>

          <p className="text-gray-500 mt-3 text-sm">
            Update current affair content and SEO information.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10">

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current Affair Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#C8A45A] outline-none"
              />
            </div>

            {/* Current Image */}
            {formData.imagePreview && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Current Image
                </label>

                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  className="w-48 h-32 object-cover rounded-xl shadow-md border"
                />
              </div>
            )}

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current Affair Content
              </label>

              <textarea
                name="content"
                rows="8"
                value={formData.content}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#C8A45A] outline-none"
              />
            </div>

            {/* Active Toggle */}
            <div className="flex items-center gap-3">

              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="w-5 h-5 accent-[#0B1C33]"
              />

              <label className="text-sm font-medium text-gray-700">
                Publish Current Affair
              </label>

            </div>

            {/* Submit Button */}
            <div className="pt-4">

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#0B1C33] to-[#1b355e] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-70"
              >
                {loading
                  ? "Updating..."
                  : "Update Current Affair"}
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default EditBlog;