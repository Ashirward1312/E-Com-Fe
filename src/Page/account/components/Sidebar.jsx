import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import {
   LayoutDashboard,
   User,
   Package,
   LogOut,
   Menu,
   X,
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }) => {
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
      <>
         {/* Mobile Overlay */}
         {isOpen && (
            <div
               className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
               onClick={() => setIsOpen(false)}
            />
         )}

         <aside
            className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-[#0B1C33] text-white flex flex-col shadow-xl transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
               }`}
         >
            {/* Header */}
            <div className="p-6 border-b border-[#1f2f4a] flex items-center justify-between">
               <div>
                  <h2 className="text-2xl font-bold text-[#C8A45A] tracking-wide">
                     IASVeda
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">My Account</p>
               </div>
               <button
                  onClick={() => setIsOpen(false)}
                  className="lg:hidden text-gray-400 hover:text-white"
               >
                  <X size={24} />
               </button>
            </div>

            {/* Navigation */}
            <nav className="mt-6 flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
               {menus.map((menu) => (
                  <NavLink
                     key={menu.path}
                     to={menu.path}
                     end={menu.path === "/account"}
                     onClick={() => setIsOpen(false)}
                     className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                           ? "bg-[#C8A45A] text-[#0B1C33] font-bold shadow-md"
                           : "text-gray-300 hover:bg-[#132743] hover:text-white"
                        }`
                     }
                  >
                     {menu.icon}
                     <span>{menu.name}</span>
                  </NavLink>
               ))}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-[#1f2f4a]">
               <button
                  onClick={logout}
                  className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-red-500 hover:text-white transition-all duration-300"
               >
                  <LogOut size={20} />
                  <span className="font-semibold">Logout</span>
               </button>
            </div>
         </aside>
      </>
   );
};

export default Sidebar;