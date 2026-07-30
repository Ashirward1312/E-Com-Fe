import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import {
   LayoutDashboard,
   User,
   Package,
   LogOut,
} from "lucide-react";

const Sidebar = () => {
   const { logout } = useContext(AuthContext);

   const menus = [
      {
         name: "Dashboard",
         path: "/account",
         icon: <LayoutDashboard size={20} />,
      },
      {
         name: "My Profile",
         path: "/account/profile",
         icon: <User size={20} />,
      },
      {
         name: "My Orders",
         path: "/account/orders",
         icon: <Package size={20} />,
      },
   ];

   return (
      <aside className="w-64 min-h-screen bg-[#0B1F3A] text-white flex flex-col">

         <div className="p-6 border-b border-gray-700">

            <h2 className="text-2xl font-bold text-orange-400">
               IASVeda
            </h2>

            <p className="text-sm text-gray-300">
               My Account
            </p>

         </div>

         <nav className="mt-6 flex-1">

            {menus.map((menu) => (

               <NavLink
                  key={menu.path}
                  to={menu.path}
                  end={menu.path === "/account"}
                  className={({ isActive }) =>
                     `flex items-center gap-3 px-6 py-4 transition-all ${isActive
                        ? "bg-orange-500 text-white"
                        : "hover:bg-[#162C4F]"
                     }`
                  }
               >
                  {menu.icon}

                  <span>{menu.name}</span>

               </NavLink>

            ))}

         </nav>

         <div className="border-t border-gray-700">

            <button
               onClick={logout}
               className="flex w-full items-center gap-3 px-6 py-4 transition-all hover:bg-red-600"
            >
               <LogOut size={20} />

               <span>Logout</span>
            </button>

         </div>

      </aside>
   );
};

export default Sidebar;