// pages/Profile.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import axios from 'axios';
import {
    User, Mail, Phone, MapPin, Calendar, ShieldCheck,
    Edit, LogOut, CreditCard, FileText, Clock, ChevronRight,
    Settings, Bell, Award, TrendingUp, CheckCircle2
} from 'lucide-react';
import M_A_Details from '@/Admin/Pages/M_A_Details';
import { motion } from 'framer-motion';

const Profile = () => {
    const { user, loading, logout } = useContext(AppContext);
    const [isEditing, setIsEditing] = useState(false);
    const [userPhone, setUserPhone] = useState("");

    const base_url = import.meta.env.VITE_BASE_URL;

    const getUserPhone = async () => {
        try {
            const res = await axios.get(`${base_url}/user/${user.email}`);
            setUserPhone(res.data.mobile);
        } catch (error) {
            console.error("Error fetching user phone:", error);
        }
    };

    useEffect(() => {
        if (user?.email) {
            getUserPhone();
        }
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mb-4"></div>
                    <p className="text-gray-600 font-medium">লোড হচ্ছে...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border border-gray-100"
                >
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                        <User size={40} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">অ্যাকাউন্টে প্রবেশ করুন</h2>
                    <p className="text-gray-600 mb-6">আপনার প্রোফাইল দেখতে লগইন করুন</p>
                    <a
                        href="/signin"
                        className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                        লগইন করুন
                    </a>
                </motion.div>
            </div>
        );
    }

    const joinDate = user.metadata?.creationTime
        ? new Date(user.metadata.creationTime).toLocaleDateString('bn-BD', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : 'জানা নেই';

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 pb-24 md:pb-12">
            {/* Enhanced Header / Banner */}
            <div className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8"
                    >
                        {/* Enhanced Avatar */}
                        <div className="relative mx-auto md:mx-0">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-white">
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt={user.displayName || "Profile"}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-5xl md:text-6xl font-bold">
                                        {user.displayName?.charAt(0) || user.email?.charAt(0) || '?'}
                                    </div>
                                )}
                            </div>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="absolute -bottom-2 -right-2 bg-green-500 p-2 rounded-full border-4 border-white shadow-lg"
                            >
                                <CheckCircle2 size={20} className="text-white" />
                            </motion.div>
                        </div>

                        {/* User Info */}
                        <div className="text-center md:text-left flex-1">
                            <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3"
                            >
                                {user.displayName || "আমার প্রোফাইল"}
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="space-y-2"
                            >
                                <p className="text-blue-100 flex items-center justify-center md:justify-start gap-2 text-base">
                                    <Mail size={18} />
                                    {user.email}
                                </p>
                                {userPhone && (
                                    <p className="text-blue-100 flex items-center justify-center md:justify-start gap-2 text-base">
                                        <Phone size={18} />
                                        {userPhone}
                                    </p>
                                )}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mt-5 flex flex-wrap gap-3 justify-center md:justify-start"
                            >
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl text-sm font-medium text-white border border-white/30 shadow-lg">
                                    <ShieldCheck size={18} />
                                    যাচাইকৃত সদস্য
                                </span>
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl text-sm font-medium text-white border border-white/30 shadow-lg">
                                    <Calendar size={18} />
                                    {joinDate}
                                </span>
                            </motion.div>
                        </div>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex gap-3 mt-6 md:mt-0 md:ml-auto flex-wrap justify-center md:justify-end"
                        >
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-xl transition-all duration-200 border border-white/30 text-white shadow-lg hover:shadow-xl"
                            >
                                <Edit size={18} />
                                {isEditing ? 'বাতিল' : 'সম্পাদনা'}
                            </button>

                            <button
                                onClick={logout}
                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-500/90 hover:bg-red-600 rounded-xl transition-all duration-200 text-white shadow-lg hover:shadow-xl"
                            >
                                <LogOut size={18} />
                                লগআউট
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left + Center Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Personal Information */}
                        <InfoCard
                            title="ব্যক্তিগত তথ্য"
                            icon={<User size={20} />}
                            gradient="from-blue-500 to-indigo-600"
                        >
                            <div className="grid sm:grid-cols-2 gap-6">
                                <InfoField label="পুরো নাম" value={user.displayName || "আপডেট করা হয়নি"} />
                                <InfoField label="ইমেইল" value={user.email} />
                                <InfoField label="ফোন নম্বর" value={userPhone || "যোগ করা হয়নি"} />
                                <InfoField label="যোগদানের তারিখ" value={joinDate} />
                            </div>

                            {isEditing && (
                                <div className="pt-6 border-t mt-6">
                                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
                                        <p className="text-sm text-blue-800 font-medium">
                                            প্রোফাইল সম্পাদনা ফিচার শীঘ্রই আসছে
                                        </p>
                                    </div>
                                </div>
                            )}
                        </InfoCard>

                        {/* Stats Overview */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                        >
                            <StatCard
                                icon={<FileText size={24} />}
                                label="মোট আবেদন"
                                value="০"
                                color="from-blue-500 to-cyan-500"
                            />
                            <StatCard
                                icon={<CreditCard size={24} />}
                                label="সক্রিয় ঋণ"
                                value="০"
                                color="from-purple-500 to-pink-500"
                            />
                            <StatCard
                                icon={<TrendingUp size={24} />}
                                label="পরিশোধিত"
                                value="৳ ০"
                                color="from-green-500 to-emerald-500"
                            />
                        </motion.div>

                        {/* Loan Applications */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                        >
                            <div className="bg-gradient-to-r from-orange-500 to-rose-500 px-6 py-4">
                                <h3 className="text-lg font-bold flex items-center gap-2 text-white">
                                    <FileText size={20} />
                                    আমার ঋণ আবেদন
                                </h3>
                            </div>

                            {userPhone ? (
                                <M_A_Details phone1={userPhone} />
                            ) : (
                                <div className="p-10 text-center">
                                    <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <FileText size={40} className="text-gray-400" />
                                    </div>
                                    <p className="text-gray-600 mb-6">আপনার কোনো ঋণ আবেদন এখনো নেই</p>
                                    <a
                                        href="/apply"
                                        className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        নতুন আবেদন করুন
                                    </a>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        {/* Account Status */}
                        <InfoCard
                            title="অ্যাকাউন্ট স্ট্যাটাস"
                            icon={<Award size={20} />}
                            gradient="from-green-500 to-emerald-600"
                        >
                            <div className="space-y-4">
                                <StatusItem
                                    label="সদস্যতার ধরন"
                                    value="সক্রিয়"
                                    badge="green"
                                />
                                <StatusItem
                                    label="ইমেইল যাচাই"
                                    value={user.emailVerified ? "সম্পন্ন" : "অপেক্ষমাণ"}
                                    badge={user.emailVerified ? "green" : "yellow"}
                                />
                                <StatusItem
                                    label="প্রোফাইল সম্পূর্ণতা"
                                    value="৮৫%"
                                    badge="blue"
                                />
                            </div>
                        </InfoCard>

                        {/* Quick Actions */}
                        <InfoCard
                            title="দ্রুত অ্যাকশন"
                            icon={<Settings size={20} />}
                            gradient="from-purple-500 to-indigo-600"
                        >
                            <div className="space-y-2">
                                <ActionButton
                                    icon={<CreditCard size={18} />}
                                    label="পেমেন্ট ইতিহাস"
                                    onClick={() => console.log("Payment history")}
                                />
                                <ActionButton
                                    icon={<Clock size={18} />}
                                    label="আবেদনের স্ট্যাটাস"
                                    onClick={() => console.log("Application status")}
                                />
                                <ActionButton
                                    icon={<Bell size={18} />}
                                    label="বিজ্ঞপ্তি সেটিংস"
                                    onClick={() => console.log("Notifications")}
                                />
                                <ActionButton
                                    icon={<LogOut size={18} />}
                                    label="লগআউট"
                                    onClick={logout}
                                    danger
                                />
                            </div>
                        </InfoCard>

                        {/* Help Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 text-center shadow-lg"
                        >
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <Phone size={28} className="text-white" />
                            </div>
                            <p className="text-blue-900 font-bold text-lg mb-2">সাহায্য প্রয়োজন?</p>
                            <p className="text-blue-700 text-sm mb-4">আমরা সবসময় আপনার সেবায় প্রস্তুত</p>
                            <a
                                href="/help"
                                className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 font-semibold bg-white px-6 py-2.5 rounded-xl hover:shadow-md transition-all duration-200"
                            >
                                সাহায্য কেন্দ্রে যান
                                <ChevronRight size={16} />
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ───────── Reusable Components ───────── */

const InfoCard = ({ title, icon, children, gradient }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
    >
        <div className={`bg-gradient-to-r ${gradient} px-6 py-4 flex items-center gap-3`}>
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg text-white">
                {icon}
            </div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
        <div className="p-6">
            {children}
        </div>
    </motion.div>
);

const InfoField = ({ label, value }) => (
    <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
        <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
        <p className="font-semibold text-gray-900 text-sm">{value}</p>
    </div>
);

const StatCard = ({ icon, label, value, color }) => (
    <motion.div
        whileHover={{ scale: 1.03, y: -4 }}
        className={`bg-gradient-to-br ${color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-200`}
    >
        <div className="flex items-center justify-between mb-3">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                {icon}
            </div>
        </div>
        <p className="text-3xl font-bold mb-1">{value}</p>
        <p className="text-sm text-white/90">{label}</p>
    </motion.div>
);

const StatusItem = ({ label, value, badge }) => {
    const badgeColors = {
        green: 'bg-green-100 text-green-800 border-green-200',
        yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        blue: 'bg-blue-100 text-blue-800 border-blue-200',
    };

    return (
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <span className="text-gray-700 text-sm font-medium">{label}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${badgeColors[badge]}`}>
                {value}
            </span>
        </div>
    );
};

const ActionButton = ({ icon, label, onClick, danger = false }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 text-left group ${danger
            ? 'hover:bg-red-50 text-red-600'
            : 'hover:bg-gray-50 text-gray-700'
            }`}
    >
        <div className="flex items-center gap-3">
            <div className={`${danger ? 'text-red-600' : 'text-blue-600'} group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <span className="font-medium text-sm">{label}</span>
        </div>
        <ChevronRight size={18} className={`${danger ? 'text-red-400' : 'text-gray-400'} group-hover:translate-x-1 transition-transform`} />
    </button>
);

export default Profile;