import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
   getBlog,
   updateBlog,
} from "../../services/blogApi";

import {
   successToast,
   errorToast,
} from "../../utils/toast";

const EditBlog = () => {

   const { slug } = useParams();

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
   }, [slug]);

   const fetchBlog = async () => {

      try {

         const blog = await getBlog(slug);

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

         errorToast("Failed to load blog.");

      }

   };

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

         await updateBlog(
            slug,
            data
         );

         successToast(
            "Blog updated successfully."
         );

         navigate("/admin/blogs");

      } catch (error) {

         console.log(error);

         errorToast(
            "Failed to update blog."
         );

      } finally {

         setLoading(false);

      }

   };

   return (
      <div>

         <h2>Edit Blog</h2>

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

               <label>Current Image</label>

               <br />

               {formData.imagePreview && (

                  <img
                     src={formData.imagePreview}
                     alt=""
                     width="150"
                  />

               )}

            </div>

            <br />

            <div>

               <label>New Image</label>

               <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
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
                  ? "Updating..."
                  : "Update Blog"}
            </button>

         </form>

      </div>
   );

};

export default EditBlog;