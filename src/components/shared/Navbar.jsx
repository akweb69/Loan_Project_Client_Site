// components/Navbar.tsx
import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Menu,
    X,
    Home,
    Info,
    LogIn,
    UserPlus,
    Sparkles,
    UserCircle2,
    LogOut,
} from "lucide-react";
import { AppContext } from "@/context/AppContext";

const navItems = [
    // { name: "Home", path: "/", icon: Home },
    // { name: "About", path: "/about", icon: Info },
    // { name: "Features", path: "/features", icon: Sparkles },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, loading, logout } = useContext(AppContext); // assuming you have logout in context

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            {/* Main navbar */}
            <div className="w-11/12 mx-auto max-w-7xl">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2.5 group"
                    >
                        <motion.div
                            initial={{ rotate: -8 }}
                            animate={{ rotate: 0, scale: 1.08 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            className="text-2xl font-black bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"
                        >
                            Loan Project
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1 lg:gap-2">

                        {/* Nav Items (uncomment if needed) */}
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `group relative px-4 py-2 text-sm font-medium transition-colors hover:text-foreground ${isActive ? "text-foreground" : "text-muted-foreground"
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <span className="relative z-10 flex items-center gap-1.5">
                                            <item.icon className="h-4 w-4" />
                                            {item.name}
                                        </span>
                                        {isActive && (
                                            <motion.span
                                                layoutId="navbar-active-indicator"
                                                className="absolute inset-0 rounded-md bg-primary/10"
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}

                        {/* Right Side - Auth Section */}
                        <div className="flex items-center gap-3 pl-6 ml-6 border-l border-border/50">
                            {!loading && user ? (
                                <div className="flex items-center gap-4">
                                    {/* User Name + Avatar */}
                                    <div className="flex items-center gap-3 group">
                                        <div className="text-right">
                                            <p className="text-sm font-semibold text-foreground">
                                                {user?.displayName || user?.name || "User"}
                                            </p>
                                            <p className="text-xs text-muted-foreground">{user?.email}</p>
                                        </div>
                                        <div className="relative">
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 p-0.5"
                                            >
                                                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                                                    {user?.photoURL ? (
                                                        <img
                                                            src={user.photoURL}
                                                            alt="Profile"
                                                            className="w-full h-full rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <UserCircle2 className="h-7 w-7 text-violet-600" />
                                                    )}
                                                </div>
                                            </motion.div>

                                            {/* Online indicator */}
                                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-background"></span>
                                        </div>
                                    </div>

                                    {/* Logout Button */}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={logout}
                                        className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                                    >
                                        <LogOut className="h-4 w-4 mr-1" />
                                        Logout
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="gap-1.5 text-muted-foreground hover:text-foreground"
                                        asChild
                                    >
                                        <Link to="/signin">
                                            <LogIn className="h-4 w-4" />
                                            Sign in
                                        </Link>
                                    </Button>

                                    <Button
                                        size="sm"
                                        className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-500/30"
                                        asChild
                                    >
                                        <Link to="/signup" className="gap-1.5">
                                            <UserPlus className="h-4 w-4" />
                                            Get Started
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </nav>

                    {/* Mobile menu button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={isOpen ? "close" : "menu"}
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </motion.div>
                        </AnimatePresence>
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="md:hidden overflow-hidden border-t bg-background/95 backdrop-blur-2xl"
                    >
                        <div className="px-4 py-6 space-y-4">

                            {/* User Info in Mobile (if logged in) */}
                            {!loading && user && (
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-violet-500/20">
                                    <div className="relative">
                                        <motion.div
                                            whileHover={{ scale: 1.15 }}
                                            className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 p-0.5"
                                        >
                                            <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                                                {user?.photoURL ? (
                                                    <img src={user.photoURL} alt="Profile" className="rounded-full object-cover" />
                                                ) : (
                                                    <UserCircle2 className="h-9 w-9 text-violet-600" />
                                                )}
                                            </div>
                                        </motion.div>
                                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-background"></span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-foreground">{user?.displayName || user?.name || "User"}</p>
                                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                                    </div>
                                </div>
                            )}

                            {/* Mobile Nav Links */}
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${isActive
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        }`
                                    }
                                >
                                    <item.icon className="h-5 w-5" />
                                    {item.name}
                                </NavLink>
                            ))}

                            {/* Mobile Auth Buttons */}
                            <div className="pt-4 space-y-3">
                                {!loading && user ? (
                                    <Button
                                        className="w-full justify-center bg-red-500/10 text-red-600 hover:bg-red-500/20 border border-red-500/30"
                                        onClick={() => {
                                            logout();
                                            setIsOpen(false);
                                        }}
                                    >
                                        <LogOut className="h-4 w-4 mr-2" />
                                        লগ আউট করুন
                                    </Button>
                                ) : (
                                    <>
                                        <Button variant="outline" className="w-full justify-center" asChild>
                                            <Link to="/signin" onClick={() => setIsOpen(false)}>
                                                <LogIn className="h-4 w-4 mr-2" />
                                                Sign In
                                            </Link>
                                        </Button>
                                        <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600" asChild>
                                            <Link to="/signup" onClick={() => setIsOpen(false)}>
                                                <Sparkles className="h-4 w-4 mr-2" />
                                                Get Started Free
                                            </Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}