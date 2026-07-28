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
            await adminApi.updateCategory(editingCategory.id, {
               name,
            });
         } else {
            await adminApi.createCategory({
               name,
            });
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
      return <div className="p-6">Loading...</div>;
   }

   return (
      <div className="p-6">

         <div className="mb-6 flex items-center justify-between">

            <h1 className="text-3xl font-bold">
               Categories
            </h1>

            <button
               onClick={openAddModal}
               className="rounded-lg bg-indigo-600 px-4 py-2 text-white"
            >
               Add Category
            </button>

         </div>

         <div className="overflow-hidden rounded-xl border bg-white shadow">

            <table className="min-w-full">

               <thead className="border-b bg-gray-50">

                  <tr>

                     <th className="px-6 py-4 text-left">
                        Name
                     </th>

                     <th className="px-6 py-4 text-center">
                        Products
                     </th>

                     <th className="px-6 py-4 text-center">
                        Action
                     </th>

                  </tr>

               </thead>

               <tbody>

                  {categories.length === 0 ? (

                     <tr>

                        <td
                           colSpan="3"
                           className="py-8 text-center"
                        >
                           No Categories Found
                        </td>

                     </tr>

                  ) : (

                     categories.map((category) => (

                        <tr
                           key={category.id}
                           className="border-b"
                        >

                           <td className="px-6 py-4">
                              {category.name}
                           </td>

                           <td className="px-6 py-4 text-center">
                              {category.product_count}
                           </td>

                           <td className="space-x-2 px-6 py-4 text-center">

                              <button
                                 onClick={() =>
                                    openEditModal(category)
                                 }
                                 className="rounded bg-blue-600 px-3 py-1 text-white"
                              >
                                 Edit
                              </button>

                              <button
                                 onClick={() =>
                                    handleDelete(category.id)
                                 }
                                 className="rounded bg-red-600 px-3 py-1 text-white"
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

         {showModal && (

            <div className="fixed inset-0 flex items-center justify-center bg-black/40">

               <div className="w-96 rounded-xl bg-white p-6">

                  <h2 className="mb-4 text-xl font-bold">

                     {editingCategory
                        ? "Edit Category"
                        : "Add Category"}

                  </h2>

                  <form onSubmit={handleSubmit}>

                     <input
                        type="text"
                        value={name}
                        onChange={(e) =>
                           setName(e.target.value)
                        }
                        placeholder="Category Name"
                        className="mb-4 w-full rounded border p-2"
                        required
                     />

                     <div className="flex justify-end gap-3">

                        <button
                           type="button"
                           onClick={() =>
                              setShowModal(false)
                           }
                           className="rounded border px-4 py-2"
                        >
                           Cancel
                        </button>

                        <button
                           type="submit"
                           className="rounded bg-indigo-600 px-4 py-2 text-white"
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