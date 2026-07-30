import { useEffect, useState } from "react";
import adminApi from "../../services/adminApi";

const Users = () => {
   const [users, setUsers] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      fetchUsers();
   }, []);

   const fetchUsers = async () => {
      try {
         const data = await adminApi.getUsers();
         setUsers(data);
      } catch (error) {
         console.log(error);
      } finally {
         setLoading(false);
      }
   };

   const handleDelete = async (id) => {
      if (!window.confirm("Delete this user?")) return;

      try {
         await adminApi.deleteUser(id);
         fetchUsers();
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
         <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0B1C33]">
               Users
            </h1>
         </div>

         {/* Table */}
         <div className="bg-white border border-gray-200 rounded-lg">

            <table className="w-full text-sm">

               <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wide">
                  <tr>
                     <th className="px-6 py-4 text-left font-semibold">
                        Name
                     </th>
                     <th className="px-6 py-4 text-left font-semibold">
                        Email
                     </th>
                     <th className="px-6 py-4 text-left font-semibold">
                        Phone
                     </th>
                     <th className="px-6 py-4 text-center font-semibold">
                        Role
                     </th>
                     <th className="px-6 py-4 text-center font-semibold">
                        Status
                     </th>
                     <th className="px-6 py-4 text-center font-semibold">
                        Joined
                     </th>
                     <th className="px-6 py-4 text-center font-semibold">
                        Action
                     </th>
                  </tr>
               </thead>

               <tbody>

                  {users.length === 0 ? (

                     <tr>
                        <td
                           colSpan="7"
                           className="py-8 text-center text-gray-500"
                        >
                           No users found.
                        </td>
                     </tr>

                  ) : (

                     users.map((user) => (

                        <tr
                           key={user.id}
                           className="border-t hover:bg-gray-50 transition"
                        >

                           <td className="px-6 py-4 font-medium text-gray-800">
                              {user.username}
                           </td>

                           <td className="px-6 py-4 text-gray-600">
                              {user.email}
                           </td>

                           <td className="px-6 py-4 text-gray-600">
                              {user.phone || "-"}
                           </td>

                           <td className="px-6 py-4 text-center">

                              <span
                                 className={`rounded-full px-3 py-1 text-xs font-medium ${
                                    user.is_staff
                                       ? "bg-purple-100 text-purple-700"
                                       : "bg-blue-100 text-blue-700"
                                 }`}
                              >
                                 {user.is_staff ? "Admin" : "Customer"}
                              </span>

                           </td>

                           <td className="px-6 py-4 text-center">

                              <span
                                 className={`rounded-full px-3 py-1 text-xs font-medium ${
                                    user.is_active
                                       ? "bg-green-100 text-green-700"
                                       : "bg-red-100 text-red-700"
                                 }`}
                              >
                                 {user.is_active ? "Active" : "Inactive"}
                              </span>

                           </td>

                           <td className="px-6 py-4 text-center text-gray-600">
                              {new Date(
                                 user.date_joined
                              ).toLocaleDateString()}
                           </td>

                           <td className="px-6 py-4 text-center">

                              <button
                                 onClick={() =>
                                    handleDelete(user.id)
                                 }
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

      </div>
   );
};

export default Users;