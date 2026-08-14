import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import adminApi from "../../services/adminApi";
import { successToast, errorToast } from "../../utils/toast";

const EditProduct = () => {

   const { id } = useParams();
   const navigate = useNavigate();

   const [categories, setCategories] = useState([]);
   const [loading, setLoading] = useState(false);

   const [formData, setFormData] = useState({
      category: "",
      name: "",
      author: "",
      description: "",
      price: "",
      sale_price: "",
      pages: "",
      language: "English",
      image: null,
      ebook: null,
      is_active: true,
   });

   useEffect(() => {
      fetchCategories();
      fetchProduct();
   }, []);

   const fetchCategories = async () => {
      try {
         const data = await adminApi.getCategories();
         setCategories(data);
      } catch (error) {
         console.log(error);
      }
   };

   const fetchProduct = async () => {
      try {

         const product = await adminApi.getProduct(id);

         setFormData({
            category: product.category.id,
            name: product.name,
            author: product.author,
            description: product.description,
            price: product.price,
            sale_price: product.sale_price || "",
            pages: product.pages,
            language: product.language,
            image: null,
            ebook: null,
            is_active: product.is_active,
         });

      } catch (error) {
         console.log(error);
      }
   };

   const handleChange = (e) => {
      const { name, value, type, checked, files } = e.target;

      setFormData({
         ...formData,
         [name]:
            type === "checkbox"
               ? checked
               : type === "file"
                  ? files[0]
                  : value,
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {

         if (
            formData.sale_price &&
            Number(formData.sale_price) >= Number(formData.price)
         ) {
            errorToast("Sale price must be less than actual price");
            setLoading(false);
            return;
         }

         const data = new FormData();

         data.append("category_id", formData.category);
         data.append("name", formData.name);
         data.append("author", formData.author);
         data.append("description", formData.description);
         data.append("price", formData.price);

         if (formData.sale_price) {
            data.append("sale_price", formData.sale_price);
         }

         data.append("pages", formData.pages);
         data.append("language", formData.language);
         data.append("is_active", formData.is_active);

         if (formData.image) data.append("upload_image", formData.image);
         if (formData.ebook) data.append("upload_ebook", formData.ebook);

         await adminApi.updateProduct(id, data);

         successToast("Product Updated Successfully");
         navigate("/admin/products");

      } catch (error) {
         console.log(error);
         errorToast("Failed to Update Product");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="min-h-screen bg-gray-50 p-10">

         <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200">

            {/* Header */}
            <div className="bg-[#0B1C33] rounded-t-2xl px-8 py-6">
               <h2 className="text-2xl font-bold text-white">
                  Edit Product
               </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">

               {/* Category */}
               <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                     Category
                  </label>
                  <select
                     name="category"
                     value={formData.category}
                     onChange={handleChange}
                     required
                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#C8A45A]"
                  >
                     <option value="">Select Category</option>
                     {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                           {category.name}
                        </option>
                     ))}
                  </select>
               </div>

               {/* Book Name */}
               <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                     Book Name
                  </label>
                  <input
                     type="text"
                     name="name"
                     value={formData.name}
                     onChange={handleChange}
                     required
                     className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
               </div>

               {/* Author */}
               <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                     Author
                  </label>
                  <input
                     type="text"
                     name="author"
                     value={formData.author}
                     onChange={handleChange}
                     required
                     className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
               </div>

               {/* Description */}
               <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                     Description
                  </label>
                  <textarea
                     name="description"
                     rows="4"
                     value={formData.description}
                     onChange={handleChange}
                     required
                     className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
               </div>

               {/* Prices */}
               <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                     Actual Price
                  </label>
                  <input
                     type="number"
                     name="price"
                     value={formData.price}
                     onChange={handleChange}
                     required
                     className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
               </div>

               <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                     Sale Price (Optional)
                  </label>
                  <input
                     type="number"
                     name="sale_price"
                     value={formData.sale_price}
                     onChange={handleChange}
                     className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
               </div>

               {/* Pages */}
               <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                     Pages
                  </label>
                  <input
                     type="number"
                     name="pages"
                     value={formData.pages}
                     onChange={handleChange}
                     className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
               </div>

               {/* Language */}
               <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                     Language
                  </label>
                  <select
                     name="language"
                     value={formData.language}
                     onChange={handleChange}
                     className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                     <option value="English">English</option>
                     <option value="Hindi">Hindi</option>
                  </select>
               </div>

               {/* Files */}
               <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                     Change Cover Image
                  </label>
                  <input
                     type="file"
                     name="image"
                     accept="image/*"
                     onChange={handleChange}
                  />
               </div>

               <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                     Change Ebook PDF
                  </label>
                  <input
                     type="file"
                     name="ebook"
                     accept=".pdf"
                     onChange={handleChange}
                  />
               </div>

               {/* Active */}
               <div className="flex items-center gap-2">
                  <input
                     type="checkbox"
                     name="is_active"
                     checked={formData.is_active}
                     onChange={handleChange}
                  />
                  <label className="font-medium text-gray-700">
                     Active Product
                  </label>
               </div>

               {/* Submit */}
               <div className="text-right pt-6">
                  <button
                     type="submit"
                     disabled={loading}
                     className="bg-[#C8A45A] text-[#0B1C33] px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition shadow-md"
                  >
                     {loading ? "Updating..." : "Update Product"}
                  </button>
               </div>

            </form>

         </div>

      </div>
   );
};

export default EditProduct;