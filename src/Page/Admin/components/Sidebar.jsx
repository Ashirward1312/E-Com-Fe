import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Tags,
    Users,
    FileText,
    LogOut,
    X,
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }) => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
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
        {
            name: "Blogs",
            path: "/admin/blogs",
            icon: <FileText size={20} />,
        },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside
                className={`
                    fixed top-0 left-0 z-50 h-screen w-64
                    bg-[#0B1B31] text-white flex flex-col shadow-2xl
                    transition-transform duration-300 ease-in-out
                    lg:sticky lg:translate-x-0 lg:flex lg:shrink-0
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                {/* Header */}
                <div className="p-5 border-b border-[#1f2f4a] flex items-center justify-between shrink-0">
                    <div>
                        <h2 className="text-xl font-bold text-[#C8A45A] tracking-wide">
                            IASVeda
                        </h2>
                        <p className="text-xs text-gray-400 mt-0.5">Admin Panel</p>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#1f2f4a] transition"
                        aria-label="Close sidebar"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="mt-4 flex-1 px-3 space-y-1 overflow-y-auto">
                    {menus.map((menu) => (
                        <NavLink
                            key={menu.path}
                            to={menu.path}
                            end={menu.path === "/admin"}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                                    isActive
                                        ? "bg-[#C8A45A] text-[#0B1B31] font-bold shadow-md"
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
                <div className="p-3 border-t border-[#1f2f4a] shrink-0">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-300 hover:bg-red-500/90 hover:text-white transition-all duration-200"
                    >
                        <LogOut size={18} />
                        <span className="font-semibold">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;