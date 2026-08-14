import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Admin/components/Sidebar";
import { Menu } from "lucide-react";

const AdminLayout = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

                {/* Mobile Top Bar */}
                <header className="lg:hidden flex items-center gap-3 px-4 py-3 bg-[#0B1B31] text-white shadow-md sticky top-0 z-30">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="p-2 rounded-lg hover:bg-[#1f2f4a] transition"
                        aria-label="Open sidebar"
                    >
                        <Menu size={22} />
                    </button>
                    <span className="text-base font-bold text-[#C8A45A] tracking-wide">
                        IASVeda
                    </span>
                    <span className="text-xs text-gray-400 mt-0.5">— Admin Panel</span>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>

            </div>
        </div>
    );
};

export default AdminLayout;