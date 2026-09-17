// import API from "../api/axios";

// // User Blogs
// export const getBlogs = async () => {
//    const response = await API.get("blogs/");
//    return response.data;
// };

// export const getBlog = async (id) => {
//    const response = await API.get(`blogs/${id}/`);
//    return response.data;
// };


// // Admin Blogs
// export const createBlog = async (blogData) => {
//    const response = await API.post(
//       "blogs/",
//       blogData,
//       {
//          headers: {
//             "Content-Type": "multipart/form-data",
//          },
//       }
//    );

//    return response.data;
// };

// export const updateBlog = async (
//    id,
//    blogData
// ) => {
//    const response = await API.put(
//       `blogs/${id}/`,
//       blogData,
//       {
//          headers: {
//             "Content-Type": "multipart/form-data",
//          },
//       }
//    );

//    return response.data;
// };

// export const deleteBlog = async (id) => {
//    const response = await API.delete(
//       `blogs/${id}/`
//    );

//    return response.data;
// };

import API from "../api/axios";

// Public Blogs

export const getBlogs = async () => {
   const response = await API.get("blogs/");
   return response.data;
};

export const getBlog = async (id) => {
   const response = await API.get(`blogs/${id}/`);
   return response.data;
};


// Admin Blogs

export const createBlog = async (blogData) => {
   const response = await API.post(
      "blogs/",
      blogData
   );

   return response.data;
};

export const updateBlog = async (
   id,
   blogData
) => {
   const response = await API.put(
      `blogs/${id}/`,
      blogData
   );

   return response.data;
};

export const deleteBlog = async (id) => {
   const response = await API.delete(
      `blogs/${id}/`
   );

   return response.data;
};