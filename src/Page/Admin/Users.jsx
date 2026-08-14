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
      return (
         <div className="flex justify-center items-center py-20 text-lg font-semibold text-gray-500">
            Loading...
         </div>
      );
   }

   return (
      <div className="p-4 sm:p-6 lg:p-8">

         {/* Header */}
         <div className="mb-7">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1C33]">
               Users
            </h1>
            <p className="text-gray-500 text-sm mt-1">
               View and manage registered users
            </p>
         </div>

         {/* Table */}
         <div className="overflow-x-auto rounded-2xl shadow-sm border border-gray-200">
            <table className="min-w-full bg-white text-sm">

               <thead className="bg-[#0B1C33] text-white">
                  <tr>
                     <th className="px-4 py-4 text-left whitespace-nowrap">Name</th>
                     <th className="px-4 py-4 text-left whitespace-nowrap">Email</th>
                     <th className="px-4 py-4 text-left whitespace-nowrap">Phone</th>
                     <th className="px-4 py-4 text-center whitespace-nowrap">Role</th>
                     <th className="px-4 py-4 text-center whitespace-nowrap">Status</th>
                     <th className="px-4 py-4 text-center whitespace-nowrap">Joined</th>
                     <th className="px-4 py-4 text-center whitespace-nowrap">Action</th>
                  </tr>
               </thead>

               <tbody>
                  {users.length === 0 ? (
                     <tr>
                        <td colSpan="7" className="py-10 text-center text-gray-500">
                           No users found.
                        </td>
                     </tr>
                  ) : (
                     users.map((user) => (
                        <tr
                           key={user.id}
                           className="border-b hover:bg-gray-50 transition"
                        >

                           <td className="px-4 py-4 font-medium text-gray-800 whitespace-nowrap">
                              {user.username}
                           </td>

                           <td className="px-4 py-4 text-gray-600 whitespace-nowrap">
                              {user.email}
                           </td>

                           <td className="px-4 py-4 text-gray-600 whitespace-nowrap">
                              {user.phone || "—"}
                           </td>

                           <td className="px-4 py-4 text-center whitespace-nowrap">
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

                           <td className="px-4 py-4 text-center whitespace-nowrap">
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

                           <td className="px-4 py-4 text-center text-gray-600 whitespace-nowrap">
                              {new Date(user.date_joined).toLocaleDateString()}
                           </td>

                           <td className="px-4 py-4 text-center">
                              <button
                                 onClick={() => handleDelete(user.id)}
                                 className="rounded-lg bg-red-600 px-3 py-1.5 text-white text-xs font-medium hover:bg-red-700 transition"
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