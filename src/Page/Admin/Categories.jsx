import { useEffect, useState } from "react";
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
      return <div className="p-8">Loading...</div>;
   }

   return (
      <div className="p-8">

         {/* Header */}
         <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-[#0B1C33]">
               Categories
            </h1>
<button
  onClick={openAddModal}
  className="rounded-lg bg-[#0B1B31] px-5 py-2.5 font-medium text-[#C8A45A] transition-all duration-300"
>
  Add Category
</button>
         </div>

         {/* Table */}
         <div className="bg-white border border-gray-200 rounded-lg">

            <table className="w-full text-sm">

               <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wide">
                  <tr>
                     <th className="px-6 py-4 text-left font-semibold">
                        Name
                     </th>
                     <th className="px-6 py-4 text-center font-semibold">
                        Products
                     </th>
                     <th className="px-6 py-4 text-center font-semibold">
                        Action
                     </th>
                  </tr>
               </thead>

               <tbody>

                  {categories.length === 0 ? (
                     <tr>
                        <td colSpan="3" className="py-8 text-center text-gray-500">
                           No Categories Found
                        </td>
                     </tr>
                  ) : (
                     categories.map((category) => (
                        <tr
                           key={category.id}
                           className="border-t hover:bg-gray-50 transition"
                        >
                           <td className="px-6 py-4 font-medium text-gray-800">
                              {category.name}
                           </td>

                           <td className="px-6 py-4 text-center text-gray-600">
                              {category.product_count}
                           </td>

                           <td className="px-6 py-4 text-center space-x-2">

                              <button
                                 onClick={() => openEditModal(category)}
                                 className="rounded-md bg-blue-600 px-3 py-1.5 text-white text-xs hover:bg-blue-700 transition"
                              >
                                 Edit
                              </button>

                              <button
                                 onClick={() => handleDelete(category.id)}
                                 className="rounded-md bg-red-600 px-3 py-1.5 text-white text-xs hover:bg-red-700 transition"
                              >
                                 Delete
                              </button>

                           </td>
                        </tr>
                     ))
                  )}

               </tbody>

            </table>

         </div>

         {/* Modal */}
         {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40">

               <div className="w-96 rounded-lg bg-white p-6 shadow-xl">

                  <h2 className="mb-6 text-xl font-bold text-[#0B1C33]">
                     {editingCategory ? "Edit Category" : "Add Category"}
                  </h2>

                  <form onSubmit={handleSubmit}>

                     <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Category Name"
                        className="mb-6 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B1C33]"
                        required
                     />

                     <div className="flex justify-end gap-3">

                        <button
                           type="button"
                           onClick={() => setShowModal(false)}
                           className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100 transition"
                        >
                           Cancel
                        </button>

                        <button
                           type="submit"
                           className="rounded-lg bg-[#0B1C33] px-4 py-2 text-white text-sm hover:bg-[#162e4f] transition"
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