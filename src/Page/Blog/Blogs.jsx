import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";

import { getBlogs, deleteBlog } from "../../services/blogApi";
import { successToast, errorToast } from "../../utils/toast";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

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

  const handleDelete = async (slug) => {
    const confirmDelete = window.confirm("Delete this blog?");
    if (!confirmDelete) return;

    try {
      await deleteBlog(slug);

      setBlogs((prev) =>
        prev.filter((blog) => blog.slug !== slug)
      );

      successToast("Blog deleted successfully.");
    } catch (error) {
      console.log(error);
      errorToast("Delete failed.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f6fb]">
        <div className="text-[#0B1C33] text-lg font-medium">
          Loading Blogs...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6fb] py-12 px-6">
      <div className="max-w-6xl mx-auto">

        {/* ✅ Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[#0B1C33]">
              Blogs Management
            </h2>
            <div className="w-16 h-1 bg-[#C8A45A] rounded mt-2"></div>
          </div>

          <Link to="/admin/blogs/add">
            <button className="flex items-center gap-2 bg-gradient-to-r from-[#0B1C33] to-[#1b355e] text-white px-5 py-2.5 rounded-xl font-medium hover:shadow-lg transition">
              <Plus size={18} />
              Add Blog
            </button>
          </Link>
        </div>

        {/* ✅ Table Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">

              <thead className="bg-[#0B1C33] text-white text-sm uppercase tracking-wider">
                <tr>
                  {/* <th className="px-6 py-4">Image</th> */}
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Created</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">

                {blogs.map((blog) => (
                  <tr
                    key={blog.id}
                    className="hover:bg-gray-50 transition"
                  >
                    {/* Image */}
                    {/* <td className="px-6 py-4">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-20 h-14 object-cover rounded-lg shadow-sm"
                      />
                    </td> */}

                    {/* Title */}
                    <td className="px-6 py-4 font-medium text-[#0B1C33]">
                      {blog.title}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {blog.is_active ? (
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-600">
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">

                        <Link
                          to={`/admin/blogs/edit/${blog.slug}`}
                        >
                          <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition">
                            <Pencil size={18} />
                          </button>
                        </Link>

                        <button
                          onClick={() => handleDelete(blog.slug)}
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Blogs;