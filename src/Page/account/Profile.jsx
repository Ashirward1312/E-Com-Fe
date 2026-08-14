import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../services/authApi";
import { successToast, errorToast } from "../../utils/toast";

const Profile = () => {
   const [loading, setLoading] = useState(true);
   const [saving, setSaving] = useState(false);
   const [preview, setPreview] = useState("");

   const [formData, setFormData] = useState({
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      phone: "",
      profile_image: null,
   });

   useEffect(() => {
      fetchProfile();
   }, []);

   const fetchProfile = async () => {
      try {
         const user = await getProfile();

         setFormData({
            first_name: user.first_name || "",
            last_name: user.last_name || "",
            username: user.username || "",
            email: user.email || "",
            phone: user.phone || "",
            profile_image: null,
         });

         if (user.profile_image) {
            setPreview(user.profile_image);
         }
      } catch (error) {
         console.log(error);
      } finally {
         setLoading(false);
      }
   };

   const handleChange = (e) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleImage = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      setFormData((prev) => ({
         ...prev,
         profile_image: file,
      }));

      setPreview(URL.createObjectURL(file));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setSaving(true);

      try {
         const data = new FormData();

         data.append("first_name", formData.first_name);
         data.append("last_name", formData.last_name);
         data.append("phone", formData.phone);

         if (formData.profile_image) {
            data.append("profile_image", formData.profile_image);
         }

         await updateProfile(data);
         successToast("Profile updated successfully.");
         fetchProfile();

      } catch (error) {
         console.log(error);
         errorToast("Failed to update profile.");
      } finally {
         setSaving(false);
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

         <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-8">

            <div className="mb-7">
               <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1C33]">
                  My Profile
               </h1>
               <p className="text-gray-500 mt-1 text-sm sm:text-base">
                  Manage your personal information
               </p>
            </div>

            <form onSubmit={handleSubmit}>

               {/* Profile Image Section */}
               <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">

                  <img
                     src={preview || "https://via.placeholder.com/120"}
                     alt="Profile"
                     className="h-20 w-20 sm:h-24 sm:w-24 rounded-full border-2 border-gray-200 object-cover shrink-0"
                  />

                  <div className="w-full sm:w-auto">
                     <label className="block mb-2 text-sm font-medium text-gray-700">
                        Change Profile Image
                     </label>

                     <input
                        type="file"
                        accept="image/*"
                        onChange={handleImage}
                        className="block w-full text-sm text-gray-500
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-lg file:border-0
                           file:text-sm file:font-medium
                           file:bg-[#0B1C33] file:text-white
                           hover:file:bg-[#162e4f]
                           cursor-pointer border border-gray-300 rounded-lg p-2"
                     />
                  </div>

               </div>

               {/* Grid Section */}
               <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                     <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        First Name
                     </label>

                     <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1C33] transition"
                     />
                  </div>

                  <div>
                     <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Last Name
                     </label>

                     <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1C33] transition"
                     />
                  </div>

                  <div>
                     <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Username
                     </label>

                     <input
                        value={formData.username}
                        disabled
                        className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-500 cursor-not-allowed"
                     />
                  </div>

                  <div>
                     <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Email
                     </label>

                     <input
                        value={formData.email}
                        disabled
                        className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-500 cursor-not-allowed"
                     />
                  </div>

                  <div className="sm:col-span-2 md:col-span-1">
                     <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Phone
                     </label>

                     <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1C33] transition"
                     />
                  </div>

               </div>

               {/* Submit */}
               <div className="mt-8">
                  <button
                     type="submit"
                     disabled={saving}
                     className="w-full sm:w-auto bg-[#C8A45A] text-[#0B1C33] px-8 py-2.5 rounded-lg font-semibold hover:bg-yellow-400 transition disabled:opacity-60"
                  >
                     {saving ? "Updating..." : "Update Profile"}
                  </button>
               </div>

            </form>

         </div>

      </div>
   );
};

export default Profile;