import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Tags,
    Users,
    TicketPercent,
} from "lucide-react";

const Sidebar = () => {

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
            name: "Coupons",
            path: "/admin/coupons",
            icon: <TicketPercent size={20} />,
        },
        {
            name: "Users",
            path: "/admin/users",
            icon: <Users size={20} />,
        },
    ];

    return (
        <aside className="w-64 min-h-screen bg-[#0B1F3A] text-white">

            <div className="p-6 border-b border-gray-700">

                <h2 className="text-2xl font-bold text-orange-400">
                    IASVeda
                </h2>

                <p className="text-sm text-gray-300">
                    Admin Panel
                </p>

            </div>

            <nav className="mt-6">

                {menus.map((menu) => (

                    <NavLink
                        key={menu.path}
                        to={menu.path}
                        end={menu.path === "/admin"}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-6 py-4 transition-all ${isActive
                                ? "bg-orange-500 text-white"
                                : "hover:bg-[#162C4F]"
                            }`
                        }
                    >
                        {menu.icon}

                        <span>
                            {menu.name}
                        </span>

                    </NavLink>

                ))}

            </nav>

        </aside>
    );
};

export default Sidebar;