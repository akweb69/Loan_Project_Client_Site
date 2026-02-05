import React, { useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import { motion } from 'framer-motion';
import {
    User,
    Mail,
    Phone,
    Calendar,
    Shield,
    LogOut,
    BadgeCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminProfile = () => {
    const { user, loading, logout } = useContext(AppContext);
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-300">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-white"
                >
                    <h2 className="text-2xl font-bold mb-4">Not Logged In</h2>
                    <p className="text-gray-400 mb-6">
                        Please sign in to view your profile.
                    </p>
                    <button
                        onClick={() => navigate('/login')}
                        className="px-6 py-3 bg-rose-600 hover:bg-rose-700 rounded-xl font-medium transition"
                    >
                        Go to Login
                    </button>
                </motion.div>
            </div>
        );
    }

    const formatDate = (timestamp) => {
        if (!timestamp) return '—';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black rounded-3xl text-white px-4 py-14">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="relative p-10 bg-gradient-to-r from-rose-900/40 via-purple-900/30 to-indigo-900/30">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            {/* Avatar */}
                            <div className="relative">
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt="Profile"
                                        className="w-28 h-28 rounded-full object-cover border-4 border-rose-500 shadow-xl"
                                    />
                                ) : (
                                    <div className="w-28 h-28 rounded-full bg-rose-600/30 flex items-center justify-center border-4 border-rose-500/50 shadow-xl">
                                        <User size={44} className="text-rose-400" />
                                    </div>
                                )}

                                <span className="absolute -bottom-1 -right-1 bg-green-500 text-black text-xs px-2 py-0.5 rounded-full font-semibold">
                                    Online
                                </span>
                            </div>

                            {/* Info */}
                            <div className="text-center md:text-left">
                                <h1 className="text-3xl font-bold flex items-center gap-2 justify-center md:justify-start">
                                    {user.displayName || 'Admin User'}
                                    <BadgeCheck className="text-emerald-400" size={22} />
                                </h1>

                                <div className="mt-2 space-y-1 text-gray-300">
                                    <p className="flex items-center gap-2 justify-center md:justify-start">
                                        <Mail size={16} />
                                        {user.email || 'No email linked'}
                                    </p>

                                    {user.phoneNumber && (
                                        <p className="flex items-center gap-2 justify-center md:justify-start">
                                            <Phone size={16} />
                                            {user.phoneNumber}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 grid gap-6 md:grid-cols-2">
                        {/* Account Info */}
                        <motion.div
                            whileHover={{ y: -4 }}
                            className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-rose-500/40 transition"
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <Shield className="text-rose-400" size={22} />
                                <h3 className="font-semibold text-lg">
                                    Account Details
                                </h3>
                            </div>

                            <div className="space-y-4 text-gray-300 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">UID</span>
                                    <span className="font-mono text-xs max-w-[160px] truncate">
                                        {user.uid}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-400">Created</span>
                                    <span className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        {formatDate(user.metadata?.creationTime)}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-400">Last Login</span>
                                    <span className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        {formatDate(user.metadata?.lastSignInTime)}
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Actions */}
                        <motion.div
                            whileHover={{ y: -4 }}
                            className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-rose-500/40 transition flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="font-semibold text-lg mb-3">
                                    Security Actions
                                </h3>
                                <p className="text-sm text-gray-400">
                                    Manage your admin session and access security.
                                </p>
                            </div>

                            <button
                                onClick={logout}
                                className="mt-6 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 transition font-medium"
                            >
                                <LogOut size={18} />
                                Logout
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminProfile;
