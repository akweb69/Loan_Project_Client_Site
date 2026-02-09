// pages/Profile.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import axios from 'axios';
import {
    User, Mail, Phone, Calendar, ShieldCheck,
    Edit, LogOut, FileText, CreditCard, Clock,
    Settings, Bell, ChevronRight, CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import UserAbedonDetails from '@/Admin/Pages/UserAbedonDetails';

const Profile = () => {
    const { user, loading, logout } = useContext(AppContext);
    const [isEditing, setIsEditing] = useState(false);
    const [userPhone, setUserPhone] = useState('');

    const base_url = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        if (!user?.email) return;

        const fetchPhone = async () => {
            try {
                const res = await axios.get(`${base_url}/user/${user.email}`);
                setUserPhone(res.data.mobile || '');
            } catch (err) {
                console.error('Failed to fetch phone:', err);
            }
        };

        fetchPhone();
    }, [user?.email]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
                    <p className="text-gray-600 font-medium">লোড হচ্ছে...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-5">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8 text-center border border-gray-100">
                    <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                        <User className="h-10 w-10 text-blue-700" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">অ্যাকাউন্টে প্রবেশ করুন</h2>
                    <p className="text-gray-600 mb-8">প্রোফাইল দেখতে লগইন করুন</p>
                    <a
                        href="/signin"
                        className="inline-flex items-center justify-center w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-xl transition-colors"
                    >
                        লগইন করুন
                    </a>
                </div>
            </div>
        );
    }

    const joinDate = user.metadata?.creationTime
        ? new Date(user.metadata.creationTime).toLocaleDateString('bn-BD', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : '—';

    return (
        <div className="min-h-screen bg-gray-50/60 pb-12 md:pb-16">
            {/* Header / Profile banner */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
                    <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
                        {/* Avatar + name block */}
                        <div className="flex flex-col items-center md:items-start gap-4">
                            <div className="relative">
                                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-100">
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-5xl font-semibold">
                                            {(user.displayName?.[0] || user.email?.[0] || '?').toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                {user.emailVerified && (
                                    <div className="absolute -bottom-1 -right-1 bg-green-500 p-1.5 rounded-full border-4 border-white">
                                        <CheckCircle size={18} className="text-white" />
                                    </div>
                                )}
                            </div>

                            <div className="text-center md:text-left">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                    {user.displayName || 'আমার প্রোফাইল'}
                                </h1>
                                <p className="text-gray-600 mt-1">{user.email}</p>
                                {userPhone && <p className="text-gray-600">{userPhone}</p>}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 md:ml-auto mt-4 md:mt-2 flex-wrap justify-center md:justify-end">
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 hover:border-gray-400 rounded-xl text-gray-700 font-medium transition-colors"
                            >
                                <Edit size={18} />
                                {isEditing ? 'বাতিল' : 'সম্পাদনা'}
                            </button>

                            <button
                                onClick={logout}
                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl font-medium transition-colors"
                            >
                                <LogOut size={18} />
                                লগআউট
                            </button>
                        </div>
                    </div>

                    {/* Small meta row */}
                    <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>যোগদান: {joinDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={16} className="text-green-600" />
                            <span>যাচাইকৃত</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left + center column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Personal Info */}
                        <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/70">
                                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2.5">
                                    <User size={20} className="text-blue-600" />
                                    ব্যক্তিগত তথ্য
                                </h2>
                            </div>
                            <div className="p-6 grid sm:grid-cols-2 gap-5">
                                <InfoField label="পুরো নাম" value={user.displayName || '—'} />
                                <InfoField label="ইমেইল" value={user.email} />
                                <InfoField label="ফোন" value={userPhone || 'যোগ করা হয়নি'} />
                                <InfoField label="যোগদান" value={joinDate} />
                            </div>

                            {isEditing && (
                                <div className="px-6 pb-6 pt-2 border-t bg-blue-50/40 text-center text-sm text-blue-700">
                                    প্রোফাইল সম্পাদনা ফিচার শীঘ্রই যুক্ত হবে
                                </div>
                            )}
                        </section>

                        {/* Stats */}
                        {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <StatCard icon={FileText} label="মোট আবেদন" value="০" />
                            <StatCard icon={CreditCard} label="সক্রিয় ঋণ" value="০" />
                            <StatCard icon={CreditCard} label="পরিশোধিত" value="৳ ০" />
                        </div> */}

                        {/* Loan Applications */}
                        <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/70">
                                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2.5">
                                    <FileText size={20} className="text-amber-600" />
                                    আমার ঋণ আবেদন
                                </h2>
                            </div>

                            <div className="p-6">
                                {userPhone ? (
                                    <UserAbedonDetails phone1={userPhone} />
                                ) : (
                                    <div className="py-12 text-center">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <FileText className="h-8 w-8 text-gray-400" />
                                        </div>
                                        <p className="text-gray-600 mb-5">এখনো কোনো ঋণ আবেদন নেই</p>
                                        <a
                                            href="/apply"
                                            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-xl transition-colors"
                                        >
                                            নতুন আবেদন করুন
                                        </a>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Right sidebar */}
                    <div className="space-y-6">
                        {/* Quick actions */}
                        <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/70">
                                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2.5">
                                    <Settings size={20} className="text-indigo-600" />
                                    দ্রুত অ্যাকশন
                                </h2>
                            </div>
                            <div className="divide-y divide-gray-100">
                                <ActionItem icon={CreditCard} label="পেমেন্ট ইতিহাস" />
                                <ActionItem icon={Clock} label="আবেদনের স্ট্যাটাস" />
                                <ActionItem icon={Bell} label="বিজ্ঞপ্তি সেটিংস" />
                                <ActionItem
                                    icon={LogOut}
                                    label="লগআউট"
                                    onClick={logout}
                                    danger
                                />
                            </div>
                        </section>

                        {/* Support card */}
                        <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-6 text-center">
                            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Phone className="h-7 w-7 text-blue-700" />
                            </div>
                            <p className="font-semibold text-blue-900 mb-1">সাহায্য প্রয়োজন?</p>
                            <p className="text-sm text-blue-700 mb-5">আমরা সবসময় আপনার পাশে আছি</p>
                            <a
                                href="/help"
                                className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 font-medium bg-white px-6 py-2.5 rounded-lg border border-blue-200 hover:border-blue-300 transition-colors"
                            >
                                সাহায্য কেন্দ্র
                                <ChevronRight size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ───────── Reusable Components ───────── */

const InfoField = ({ label, value }) => (
    <div>
        <div className="text-xs text-gray-500 mb-1">{label}</div>
        <div className="font-medium text-gray-900">{value}</div>
    </div>
);

const StatCard = ({ icon: Icon, label, value }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-5 text-center hover:border-gray-300 transition-colors">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-3">
            <Icon className="h-6 w-6 text-gray-700" />
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
        <div className="text-sm text-gray-600">{label}</div>
    </div>
);

const ActionItem = ({ icon: Icon, label, onClick, danger = false }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center justify-between px-6 py-3.5 text-left transition-colors ${danger
            ? 'hover:bg-red-50/70 text-red-700'
            : 'hover:bg-gray-50 text-gray-700'
            }`}
    >
        <div className="flex items-center gap-3">
            <Icon size={18} className={danger ? 'text-red-600' : 'text-gray-600'} />
            <span className="font-medium">{label}</span>
        </div>
        {!danger && <ChevronRight size={18} className="text-gray-400" />}
    </button>
);

export default Profile;