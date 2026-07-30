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
            data.append(
               "profile_image",
               formData.profile_image
            );
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
      return <h2>Loading...</h2>;
   }

   return (
      <div className="max-w-5xl rounded-xl bg-white p-8 shadow">

         <h1 className="mb-8 text-3xl font-bold">
            My Profile
         </h1>

         <form onSubmit={handleSubmit}>

            <div className="mb-8 flex items-center gap-6">

               <img
                  src={
                     preview ||
                     "https://via.placeholder.com/120"
                  }
                  alt="Profile"
                  className="h-28 w-28 rounded-full border object-cover"
               />

               <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
               />

            </div>

            <div className="grid gap-6 md:grid-cols-2">

               <div>

                  <label className="mb-2 block font-medium">
                     First Name
                  </label>

                  <input
                     type="text"
                     name="first_name"
                     value={formData.first_name}
                     onChange={handleChange}
                     className="w-full rounded-lg border p-3"
                  />

               </div>

               <div>

                  <label className="mb-2 block font-medium">
                     Last Name
                  </label>

                  <input
                     type="text"
                     name="last_name"
                     value={formData.last_name}
                     onChange={handleChange}
                     className="w-full rounded-lg border p-3"
                  />

               </div>

               <div>

                  <label className="mb-2 block font-medium">
                     Username
                  </label>

                  <input
                     value={formData.username}
                     disabled
                     className="w-full rounded-lg border bg-gray-100 p-3"
                  />

               </div>

               <div>

                  <label className="mb-2 block font-medium">
                     Email
                  </label>

                  <input
                     value={formData.email}
                     disabled
                     className="w-full rounded-lg border bg-gray-100 p-3"
                  />

               </div>

               <div>

                  <label className="mb-2 block font-medium">
                     Phone
                  </label>

                  <input
                     type="text"
                     name="phone"
                     value={formData.phone}
                     onChange={handleChange}
                     className="w-full rounded-lg border p-3"
                  />

               </div>

            </div>

            <button
               type="submit"
               disabled={saving}
               className="mt-8 rounded-lg bg-orange-500 px-8 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
               {saving
                  ? "Updating..."
                  : "Update Profile"}
            </button>

         </form>

      </div>
   );
};

export default Profile;