import React, { useContext, useState } from 'react';
import {
    LayoutDashboard,
    Users,
    ShoppingBag,
    Package,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Menu,
    FileUser,
    Edit,
    Shield,
    User
} from 'lucide-react'; // ← or use any icon library you prefer

import './AdminAsideBar.css'; // we'll create this next
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';

const AdminAsideBar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const { logout } = useContext(AppContext);
    const navigate = useNavigate();

    const menuItems = [
        { icon: LayoutDashboard, label: 'ডাশবোর্ড', href: '/admin' },
        { icon: FileUser, label: 'আবেদন সমূহ', href: '/admin/abedon_request' },
        { icon: Edit, label: 'ডকুমেন্ট ডিজাইন', href: '/admin/document_design' },
        { icon: Shield, label: 'মানেজ এডমিন', href: '/admin/manage_admin' },
        // { icon: Package, label: 'Products', href: '/admin/products' },
        // { icon: Settings, label: "সেটিংস", href: '/admin/settings' },
        { icon: User, label: "প্রোফাইল", href: '/admin/profile' },

    ];

    const toggleSidebar = () => setIsCollapsed(!isCollapsed);
    const toggleMobile = () => setIsMobileOpen(!isMobileOpen);


    const handleLogout = async () => {
        await logout();
        toast.success('Logout successful');
        navigate('/admin_signin');
    };

    return (
        <>
            {/* Mobile hamburger button */}
            <button
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
                onClick={toggleMobile}
                aria-label="Toggle menu"
            >
                <Menu size={24} />
            </button>

            {/* Sidebar */}
            <aside
                className={`
          fixed inset-y-0 left-0 z-40
          transform transition-all duration-300 ease-in-out
          lg:static lg:transform-none
          
          ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          
          bg-gray-900 text-gray-100
          flex flex-col h-screen
        `}
            >
                {/* Header / Logo area */}
                <div className="p-4 border-b border-gray-800 flex items-center justify">
                    {!isCollapsed && (
                        <h1 className="text-xl font-bold ">Admin Panel</h1>
                    )}

                    {/* Collapse button - desktop only */}
                    <button
                        onClick={toggleSidebar}
                        className="hidden lg:block p-1.5 rounded hover:bg-gray-800"
                        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-6 overflow-y-auto">
                    <ul className="space-y-1">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={item.href}
                                    className={`
                    flex items-center gap-3 px-3 py-3 rounded-lg
                    hover:bg-gray-800 transition-colors
                    ${isCollapsed ? 'justify-center' : ''}
                  `}
                                >
                                    <item.icon size={22} />
                                    {!isCollapsed && <span>{item.label}</span>}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Footer / Logout */}
                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={handleLogout}
                        className={`
              flex items-center gap-3 px-3 py-3 rounded-lg
              hover:bg-red-900/30 text-red-400 transition-colors
              ${isCollapsed ? 'justify-center' : ''}
            `}
                    >
                        <LogOut size={22} />
                        {!isCollapsed && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Mobile overlay backdrop */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-30 lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}
        </>
    );
};

export default AdminAsideBar;