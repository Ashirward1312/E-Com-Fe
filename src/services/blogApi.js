import API from "../api/axios";

// User Blogs
export const getBlogs = async () => {
   const response = await API.get("blogs/");
   return response.data;
};

export const getBlog = async (slug) => {
   const response = await API.get(`blogs/${slug}/`);
   return response.data;
};

// Admin Blogs
export const createBlog = async (blogData) => {
   const response = await API.post(
      "blogs/",
      blogData,
      {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      }
   );

   return response.data;
};

export const updateBlog = async (
   slug,
   blogData
) => {
   const response = await API.put(
      `blogs/${slug}/`,
      blogData,
      {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      }
   );

   return response.data;
};

export const deleteBlog = async (slug) => {
   const response = await API.delete(
      `blogs/${slug}/`
   );

   return response.data;
};