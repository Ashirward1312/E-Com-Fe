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
      {
         name: "My Library",
         path: "/account/library",
         icon: <Package size={20} />,
      },

   ];

   return (
      <aside className="w-64 min-h-screen bg-[#0B1C33] text-white flex flex-col">

         {/* Header */}
         <div className="p-6 border-b border-[#1f2f4a]">
            <h2 className="text-2xl font-bold text-[#C8A45A] tracking-wide">
               IASVeda
            </h2>

            <p className="text-sm text-gray-400 mt-1">
               My Account
            </p>
         </div>

         {/* Navigation */}
         <nav className="mt-6 flex-1 space-y-1">

            {menus.map((menu) => (

               <NavLink
                  key={menu.path}
                  to={menu.path}
                  end={menu.path === "/account"}
                  className={({ isActive }) =>
                     `flex items-center gap-3 px-6 py-4 transition-all duration-300 ${isActive
                        ? "bg-[#C8A45A] text-[#0B1C33] font-semibold"
                        : "hover:bg-[#132743] text-gray-300 hover:text-[#C8A45A]"
                     }`
                  }
               >
                  {menu.icon}
                  <span>{menu.name}</span>
               </NavLink>

            ))}

         </nav>

         {/* Logout */}
         <div className="border-t border-[#1f2f4a]">

            <button
               onClick={logout}
               className="flex w-full items-center gap-3 px-6 py-4 text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-300"
            >
               <LogOut size={20} />
               <span>Logout</span>
            </button>

         </div>

      </aside>
   );
};

export default Sidebar;