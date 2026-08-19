import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import adminApi from "../../services/adminApi";

const Categories = () => {
   const [categories, setCategories] = useState([]);
   const [loading, setLoading] = useState(true);

   const [showModal, setShowModal] = useState(false);
   const [editingCategory, setEditingCategory] = useState(null);
   const [name, setName] = useState("");

   useEffect(() => {
      fetchCategories();
   }, []);

   const fetchCategories = async () => {
      try {
         const data = await adminApi.getCategories();
         setCategories(data);
      } catch (error) {
         console.log(error);
      } finally {
         setLoading(false);
      }
   };

   const openAddModal = () => {
      setEditingCategory(null);
      setName("");
      setShowModal(true);
   };

   const openEditModal = (category) => {
      setEditingCategory(category);
      setName(category.name);
      setShowModal(true);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         if (editingCategory) {
            await adminApi.updateCategory(editingCategory.id, { name });
         } else {
            await adminApi.createCategory({ name });
         }

         setShowModal(false);
         fetchCategories();
      } catch (error) {
         console.log(error);
      }
   };

   const handleDelete = async (id) => {
      if (!window.confirm("Delete this category?")) return;

      try {
         await adminApi.deleteCategory(id);
         fetchCategories();
      } catch (error) {
         console.log(error);
      }
   };

   if (loading) {
      return (
         <div className="flex justify-center items-center py-20 text-lg font-semibold text-gray-500">
            Loading...
         </div>
      );
   }

   return (
      <div className="p-4 sm:p-6 lg:p-8">

         {/* Header */}
         <div className="mb-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
               <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1C33]">
                  Categories
               </h1>
               <p className="text-gray-500 text-sm mt-1">
                  Manage product categories
               </p>
            </div>

            <button
               onClick={openAddModal}
               className="inline-flex items-center gap-2 rounded-xl bg-[#0B1B31] px-5 py-2.5 font-semibold text-[#C8A45A] hover:bg-[#162e4f] transition text-sm self-start sm:self-auto"
            >
               <Plus size={18} />
               Add Category
            </button>
         </div>

         {/* Table */}
         <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-200px)] rounded-2xl shadow-sm border border-gray-200">
            <table className="min-w-full bg-white text-sm">

               <thead className="bg-[#0B1C33] text-white sticky top-0 z-10">
                  <tr>
                     <th className="px-4 py-4 text-left whitespace-nowrap">Name</th>
                     <th className="px-4 py-4 text-center whitespace-nowrap">Products</th>
                     <th className="px-4 py-4 text-center whitespace-nowrap">Actions</th>
                  </tr>
               </thead>

               <tbody>
                  {categories.length === 0 ? (
                     <tr>
                        <td colSpan="3" className="py-10 text-center text-gray-500">
                           No Categories Found
                        </td>
                     </tr>
                  ) : (
                     categories.map((category) => (
                        <tr
                           key={category.id}
                           className="border-b hover:bg-gray-50 transition"
                        >
                           <td className="px-4 py-4 font-medium text-gray-800">
                              {category.name}
                           </td>

                           <td className="px-4 py-4 text-center text-gray-600">
                              {category.product_count}
                           </td>

                           <td className="px-4 py-4">
                              <div className="flex items-center justify-center gap-2">
                                 <button
                                    onClick={() => openEditModal(category)}
                                    className="rounded-lg bg-blue-600 px-3 py-1.5 text-white text-xs font-medium hover:bg-blue-700 transition"
                                 >
                                    Edit
                                 </button>

                                 <button
                                    onClick={() => handleDelete(category.id)}
                                    className="rounded-lg bg-red-600 px-3 py-1.5 text-white text-xs font-medium hover:bg-red-700 transition"
                                 >
                                    Delete
                                 </button>
                              </div>
                           </td>
                        </tr>
                     ))
                  )}
               </tbody>

            </table>
         </div>

         {/* Modal */}
         {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-4">

               <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">

                  <h2 className="mb-5 text-xl font-bold text-[#0B1C33]">
                     {editingCategory ? "Edit Category" : "Add Category"}
                  </h2>

                  <form onSubmit={handleSubmit}>

                     <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Category Name"
                        className="mb-5 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1C33] transition"
                        required
                     />

                     <div className="flex justify-end gap-3">

                        <button
                           type="button"
                           onClick={() => setShowModal(false)}
                           className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100 transition"
                        >
                           Cancel
                        </button>

                        <button
                           type="submit"
                           className="rounded-xl bg-[#0B1C33] px-5 py-2 text-white text-sm font-semibold hover:bg-[#162e4f] transition"
                        >
                           Save
                        </button>

                     </div>

                  </form>

               </div>

            </div>
         )}

      </div>
   );
};

export default Categories;