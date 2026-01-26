// pages/Profile.jsx
import React, { useContext, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import {
    User, Mail, Phone, MapPin, Calendar, ShieldCheck,
    Edit, LogOut, CreditCard, FileText, Clock, ChevronRight
} from 'lucide-react';

const Profile = () => {
    const { user, loading, logout } = useContext(AppContext);
    const [isEditing, setIsEditing] = useState(false);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">অ্যাকাউন্টে প্রবেশ করুন</h2>
                    <p className="text-gray-600 mb-6">আপনার প্রোফাইল দেখতে লগইন করুন</p>
                    <a
                        href="/signin"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition"
                    >
                        লগইন করুন
                    </a>
                </div>
            </div>
        );
    }

    // Firebase creation time থেকে join date
    const joinDate = user.metadata?.creationTime
        ? new Date(user.metadata.creationTime).toLocaleDateString('bn-BD', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : 'জানা নেই';

    return (
        <div className="min-h-screen bg-gray-50 pb-24 md:pb-12">
            {/* Header / Banner */}
            <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
                        {/* Avatar */}
                        <div className="relative mx-auto md:mx-0">
                            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt={user.displayName || "Profile"}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-blue-800 flex items-center justify-center text-white text-5xl font-bold">
                                        {user.displayName?.charAt(0) || user.email?.charAt(0) || '?'}
                                    </div>
                                )}
                            </div>
                            <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-3 border-white"></span>
                        </div>

                        {/* User Info */}
                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                                {user.displayName || "আমার প্রোফাইল"}
                            </h1>
                            <p className="mt-2 text-blue-100 flex items-center justify-center md:justify-start gap-2 text-lg">
                                <Mail size={20} />
                                {user.email}
                            </p>

                            <div className="mt-5 flex flex-wrap gap-3 justify-center md:justify-start">
                                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
                                    <ShieldCheck size={16} />
                                    যাচাইকৃত
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
                                    <Calendar size={16} />
                                    যোগদান: {joinDate}
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-6 md:mt-0 md:ml-auto flex-wrap justify-center md:justify-end">
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 hover:bg-white/25 rounded-lg transition border border-white/30 text-white"
                            >
                                <Edit size={18} />
                                {isEditing ? 'বাতিল' : 'সম্পাদনা'}
                            </button>

                            <button
                                onClick={logout}
                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-600/90 hover:bg-red-700 rounded-lg transition text-white shadow-md"
                            >
                                <LogOut size={18} />
                                লগআউট
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left + Center Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Personal Information */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b">
                                <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-800">
                                    <User size={20} />
                                    ব্যক্তিগত তথ্য
                                </h3>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">পুরো নাম</label>
                                        <p className="font-medium text-gray-900">{user.displayName || "আপডেট করা হয়নি"}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">ইমেইল</label>
                                        <p className="font-medium text-gray-900">{user.email}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">ফোন নম্বর</label>
                                        <p className="font-medium text-gray-900">+880 .......... (আপডেট করুন)</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">ঠিকানা</label>
                                        <p className="font-medium text-gray-900">আপনার ঠিকানা এখানে দেখাবে...</p>
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="pt-6 border-t">
                                        <p className="text-sm text-gray-500 italic text-center">
                                            এখানে সম্পাদনা ফর্ম যোগ করা যাবে (নাম, ফোন, ঠিকানা ইত্যাদি)
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Loan Applications */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b">
                                <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-800">
                                    <FileText size={20} />
                                    আমার ঋণ আবেদনসমূহ
                                </h3>
                            </div>
                            <div className="p-10 text-center">
                                <FileText size={64} className="mx-auto mb-4 text-gray-300" />
                                <p className="text-gray-600 mb-6">আপনার কোনো ঋণ আবেদন এখনো নেই</p>
                                <a
                                    href="/apply"
                                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition"
                                >
                                    নতুন আবেদন করুন
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        {/* Account Status */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b">
                                <h3 className="text-lg font-semibold text-blue-800">অ্যাকাউন্ট স্ট্যাটাস</h3>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">সদস্যতার ধরন</span>
                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">সক্রিয়</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">শেষ লগইন</span>
                                    <span className="font-medium">আজ</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">যোগদানের তারিখ</span>
                                    <span className="font-medium">{joinDate}</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b">
                                <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-800">
                                    <CreditCard size={20} />
                                    দ্রুত অ্যাকশন
                                </h3>
                            </div>
                            <div className="p-5 space-y-2">
                                <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 rounded-lg transition text-left">
                                    <div className="flex items-center gap-3">
                                        <CreditCard size={18} className="text-blue-600" />
                                        <span>পেমেন্ট ইতিহাস</span>
                                    </div>
                                    <ChevronRight size={18} className="text-gray-400" />
                                </button>

                                <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 rounded-lg transition text-left">
                                    <div className="flex items-center gap-3">
                                        <Clock size={18} className="text-blue-600" />
                                        <span>আবেদনের স্ট্যাটাস</span>
                                    </div>
                                    <ChevronRight size={18} className="text-gray-400" />
                                </button>

                                <button
                                    onClick={logout}
                                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-red-50 rounded-lg transition text-left text-red-600"
                                >
                                    <div className="flex items-center gap-3">
                                        <LogOut size={18} />
                                        <span>লগআউট</span>
                                    </div>
                                    <ChevronRight size={18} className="text-red-400" />
                                </button>
                            </div>
                        </div>

                        {/* Help Card */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
                            <p className="text-blue-800 font-medium mb-3">সাহায্য প্রয়োজন?</p>
                            <a
                                href="/help"
                                className="text-blue-700 hover:text-blue-900 font-medium inline-flex items-center gap-1"
                            >
                                সাহায্য কেন্দ্রে যান <ChevronRight size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;