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
         <div className="p-6">
            Loading...
         </div>
      );
   }

   return (
      <div className="p-6">

         <div className="mb-6 flex items-center justify-between">

            <h1 className="text-3xl font-bold">
               Users
            </h1>

         </div>

         <div className="overflow-x-auto rounded-xl border bg-white shadow">

            <table className="min-w-full">

               <thead className="border-b bg-gray-50">

                  <tr>

                     <th className="px-6 py-4 text-left">
                        Name
                     </th>

                     <th className="px-6 py-4 text-left">
                        Email
                     </th>

                     <th className="px-6 py-4 text-left">
                        Phone
                     </th>

                     <th className="px-6 py-4 text-center">
                        Role
                     </th>

                     <th className="px-6 py-4 text-center">
                        Status
                     </th>

                     <th className="px-6 py-4 text-center">
                        Joined
                     </th>

                     <th className="px-6 py-4 text-center">
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
                           className="border-b hover:bg-gray-50"
                        >

                           <td className="px-6 py-4">
                              {user.username}
                           </td>

                           <td className="px-6 py-4">
                              {user.email}
                           </td>

                           <td className="px-6 py-4">
                              {user.phone || "-"}
                           </td>

                           <td className="px-6 py-4 text-center">

                              <span
                                 className={`rounded-full px-3 py-1 text-sm font-medium ${user.is_staff
                                       ? "bg-purple-100 text-purple-700"
                                       : "bg-blue-100 text-blue-700"
                                    }`}
                              >
                                 {user.is_staff
                                    ? "Admin"
                                    : "Customer"}
                              </span>

                           </td>

                           <td className="px-6 py-4 text-center">

                              <span
                                 className={`rounded-full px-3 py-1 text-sm font-medium ${user.is_active
                                       ? "bg-green-100 text-green-700"
                                       : "bg-red-100 text-red-700"
                                    }`}
                              >
                                 {user.is_active
                                    ? "Active"
                                    : "Inactive"}
                              </span>

                           </td>

                           <td className="px-6 py-4 text-center">
                              {new Date(
                                 user.date_joined
                              ).toLocaleDateString()}
                           </td>

                           <td className="px-6 py-4 text-center">

                              <button
                                 onClick={() =>
                                    handleDelete(user.id)
                                 }
                                 className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
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