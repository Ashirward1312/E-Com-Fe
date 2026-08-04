import { useContext, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Tags,
    Users,
    LogOut,
    Menu,
    X,
} from "lucide-react";

const Sidebar = () => {
    const { logout } = useContext(AuthContext);
    const [open, setOpen] = useState(true);


    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/", {
            replace: true,
        });

    };

    const menus = [
        {
            name: "Dashboard",
            path: "/admin",
            icon: <LayoutDashboard size={20} />,
        },
        {
            name: "Products",
            path: "/admin/products",
            icon: <Package size={20} />,
        },
        {
            name: "Orders",
            path: "/admin/orders",
            icon: <ShoppingCart size={20} />,
        },
        {
            name: "Categories",
            path: "/admin/categories",
            icon: <Tags size={20} />,
        },
        {
            name: "Users",
            path: "/admin/users",
            icon: <Users size={20} />,
        },
    ];

    return (
        <aside
            className={`min-h-screen bg-[#0B1B31] text-white flex flex-col shadow-2xl transition-all duration-300 ${open ? "w-64" : "w-20"
                }`}
        >

            {/* Header */}
            <div className="p-6 border-b border-[#1f2f4a] flex items-center justify-between">

                {open && (
                    <div>
                        <h2 className="text-2xl font-bold text-[#C8A45A] tracking-wide">
                            IASVeda
                        </h2>
                        <p className="text-sm text-gray-400 mt-1">
                            Admin Panel
                        </p>
                    </div>
                )}

                <button
                    onClick={() => setOpen(!open)}
                    className="text-[#C8A45A] hover:text-white transition"
                >
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>

            </div>

            {/* Navigation */}
            <nav className="mt-6 flex-1 space-y-1">

                {menus.map((menu) => (

                    <NavLink
                        key={menu.path}
                        to={menu.path}
                        end={menu.path === "/admin"}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-6 py-4 transition-all duration-300 ${isActive
                                ? "bg-[#C8A45A] text-[#0B1B31] font-semibold"
                                : "hover:bg-[#132743] text-gray-300 hover:text-[#C8A45A]"
                            }`
                        }
                    >
                        {menu.icon}
                        {open && <span>{menu.name}</span>}
                    </NavLink>

                ))}

            </nav>

            {/* Logout */}
            <div className="border-t border-[#1f2f4a]">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-6 py-4 transition-all duration-300 text-gray-300 hover:bg-red-600 hover:text-white"
                >
                    <LogOut size={20} />
                    {open && <span>Logout</span>}
                </button>
            </div>

        </aside>
    );
};

export default Sidebar;