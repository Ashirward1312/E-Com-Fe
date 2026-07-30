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
      return <div className="p-8">Loading...</div>;
   }

   return (
      <div className="p-8">

         <div className="bg-white border border-gray-200 rounded-lg p-8">

            <div className="mb-8">
               <h1 className="text-3xl font-bold text-[#0B1C33]">
                  My Profile
               </h1>
               <p className="text-gray-500 mt-1">
                  Manage your personal information
               </p>
            </div>

            <form onSubmit={handleSubmit}>

               {/* Profile Image Section */}
               <div className="mb-10 flex items-center gap-6">

                  <img
                     src={
                        preview ||
                        "https://via.placeholder.com/120"
                     }
                     alt="Profile"
                     className="h-24 w-24 rounded-full border border-gray-300 object-cover"
                  />

                  <div>
                     <label className="block mb-2 text-sm font-medium text-gray-700">
                        Change Profile Image
                     </label>

                     <input
                        type="file"
                        accept="image/*"
                        onChange={handleImage}
                        className="border border-gray-300 rounded-md p-2"
                     />
                  </div>

               </div>

               {/* Grid Section */}
               <div className="grid gap-6 md:grid-cols-2">

                  <div>
                     <label className="mb-2 block text-sm font-medium text-gray-700">
                        First Name
                     </label>

                     <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B1C33]"
                     />
                  </div>

                  <div>
                     <label className="mb-2 block text-sm font-medium text-gray-700">
                        Last Name
                     </label>

                     <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B1C33]"
                     />
                  </div>

                  <div>
                     <label className="mb-2 block text-sm font-medium text-gray-700">
                        Username
                     </label>

                     <input
                        value={formData.username}
                        disabled
                        className="w-full rounded-md border border-gray-200 bg-gray-100 px-4 py-2 text-gray-500"
                     />
                  </div>

                  <div>
                     <label className="mb-2 block text-sm font-medium text-gray-700">
                        Email
                     </label>

                     <input
                        value={formData.email}
                        disabled
                        className="w-full rounded-md border border-gray-200 bg-gray-100 px-4 py-2 text-gray-500"
                     />
                  </div>

                  <div>
                     <label className="mb-2 block text-sm font-medium text-gray-700">
                        Phone
                     </label>

                     <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B1C33]"
                     />
                  </div>

               </div>

               {/* Submit */}
               <div className="mt-10">
                  <button
                     type="submit"
                     disabled={saving}
                     className="bg-[#C8A45A] text-[#0B1C33] px-8 py-2.5 rounded-md font-semibold hover:bg-yellow-400 transition"
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