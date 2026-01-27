import axios from 'axios';
import { Undo2, Phone, User, Briefcase, CreditCard, MapPin, Users, DollarSign, Calendar, Percent, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const M_A_Details = () => {
    const { phone } = useParams();
    const navigate = useNavigate();

    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(true);

    const base_url = import.meta.env.VITE_BASE_URL;

    const loadData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${base_url}/all_data/${phone}`);
            setDetails(res.data || {});
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-slate-50 via-orange-50 to-slate-50">
                <div className="text-center">
                    <div className="inline-block animate-spin h-16 w-16 rounded-full border-4 border-orange-200 border-t-orange-600 mb-4"></div>
                    <p className="text-gray-600 font-medium">তথ্য লোড হচ্ছে...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-orange-50 to-slate-50">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border-b border-gray-200  shadow-sm"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2.5 rounded-xl bg-linear-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
                        >
                            <Undo2 size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                আবেদন বিস্তারিত
                            </h1>
                            <p className="text-sm text-gray-500 mt-0.5">ঋণ আবেদনের সম্পূর্ণ তথ্য</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Status Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 bg-linear-to-r from-orange-500 to-rose-500 rounded-2xl p-6 text-white shadow-xl"
                >
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <p className="text-sm opacity-90 mb-1">আবেদনকারী</p>
                            <h2 className="text-2xl font-bold">{details.name}</h2>
                        </div>
                        <div className="text-right">
                            <p className="text-sm opacity-90 mb-1">মোট ঋণের পরিমাণ</p>
                            <p className="text-3xl font-bold">৳ {details.loanAmount?.toLocaleString('bn-BD')}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column - Main Info */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Personal Information */}
                        <InfoCard
                            title="ব্যক্তিগত তথ্য"
                            icon={<User className="w-5 h-5" />}
                            linear="from-blue-500 to-cyan-500"
                        >
                            <Info icon={<User size={18} />} label="পূর্ণ নাম" value={details.name} />
                            <Info icon={<Phone size={18} />} label="মোবাইল নম্বর" value={details.phone} />
                            <Info icon={<Briefcase size={18} />} label="পেশা" value={details.profession} />
                            <Info icon={<MapPin size={18} />} label="বর্তমান ঠিকানা" value={details.currentAddress} fullWidth />
                            <Info icon={<MapPin size={18} />} label="স্থায়ী ঠিকানা" value={details.permanentAddress} fullWidth />
                        </InfoCard>

                        {/* Loan Details */}
                        <InfoCard
                            title="ঋণের বিস্তারিত"
                            icon={<CreditCard className="w-5 h-5" />}
                            linear="from-orange-500 to-rose-500"
                        >
                            <StatCard
                                icon={<DollarSign size={20} />}
                                label="ঋণের পরিমাণ"
                                value={`৳ ${details.loanAmount?.toLocaleString('bn-BD')}`}
                                bgColor="bg-linear-to-br from-orange-50 to-orange-100"
                                textColor="text-orange-700"
                            />
                            <StatCard
                                icon={<Percent size={20} />}
                                label="সুদের হার"
                                value={`${details.interestRate}%`}
                                bgColor="bg-linear-to-br from-blue-50 to-blue-100"
                                textColor="text-blue-700"
                            />
                            <StatCard
                                icon={<Calendar size={20} />}
                                label="সময়কাল"
                                value={`${details.tenureMonths} মাস`}
                                bgColor="bg-linear-to-br from-purple-50 to-purple-100"
                                textColor="text-purple-700"
                            />
                            <StatCard
                                icon={<CreditCard size={20} />}
                                label="মাসিক কিস্তি"
                                value={`৳ ${details.monthlyEMI?.toLocaleString('bn-BD')}`}
                                bgColor="bg-linear-to-br from-green-50 to-green-100"
                                textColor="text-green-700"
                            />
                            <Info label="মোট সুদ" value={`৳ ${details.totalInterest?.toLocaleString('bn-BD')}`} />
                            <Info label="মোট পরিশোধযোগ্য" value={`৳ ${details.totalPayable?.toLocaleString('bn-BD')}`} />
                            <Info label="প্রসেসিং ফি" value={`৳ ${details.processingFee?.toLocaleString('bn-BD')}`} />
                            <Info icon={<FileText size={18} />} label="ঋণের কারণ" value={details.loanReason} fullWidth />
                        </InfoCard>

                        {/* Nominee Information */}
                        <InfoCard
                            title="নমিনি তথ্য"
                            icon={<Users className="w-5 h-5" />}
                            linear="from-purple-500 to-pink-500"
                        >
                            <Info icon={<Users size={18} />} label="নমিনির নাম" value={details.nomineeName} />
                            <Info icon={<Phone size={18} />} label="মোবাইল নম্বর" value={details.nomineePhone} />
                            <Info label="সম্পর্ক" value={details.nomineeRelation} fullWidth />
                        </InfoCard>
                    </div>

                    {/* Right Column - Documents */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100"
                        >
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-orange-600" />
                                প্রয়োজনীয় ডকুমেন্ট
                            </h3>
                            <div className="space-y-4">
                                <ImageCard title="প্রোফাইল ছবি" src={details.photo} />
                                <ImageCard title="NID সামনের অংশ" src={details.idCardFront} />
                                <ImageCard title="NID পিছনের অংশ" src={details.idCardBack} />
                                <ImageCard title="স্বাক্ষর" src={details.signature} />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ───────── Reusable Components ───────── */

const InfoCard = ({ title, icon, children, linear }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
    >
        <div className={`bg-linear-to-r ${linear} p-4 flex items-center gap-3`}>
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg text-white">
                {icon}
            </div>
            <h2 className="text-lg font-bold text-white">{title}</h2>
        </div>
        <div className="p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {children}
            </div>
        </div>
    </motion.div>
);

const StatCard = ({ icon, label, value, bgColor, textColor }) => (
    <motion.div
        whileHover={{ scale: 1.03 }}
        className={`${bgColor} rounded-xl p-4 border border-gray-200`}
    >
        <div className="flex items-center gap-3">
            <div className={`${textColor} bg-white/60 backdrop-blur-sm p-2 rounded-lg`}>
                {icon}
            </div>
            <div>
                <p className="text-xs text-gray-600 mb-0.5">{label}</p>
                <p className={`text-lg font-bold ${textColor}`}>{value || '—'}</p>
            </div>
        </div>
    </motion.div>
);

const Info = ({ icon, label, value, fullWidth }) => (
    <div className={`${fullWidth ? 'col-span-full' : ''}`}>
        <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
            {icon && (
                <div className="text-orange-600 mt-0.5 bg-orange-50 p-2 rounded-lg">
                    {icon}
                </div>
            )}
            <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
                <p className="text-sm font-semibold text-gray-800 break-words">{value || '—'}</p>
            </div>
        </div>
    </div>
);

const ImageCard = ({ title, src }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="group relative overflow-hidden rounded-xl border-2 border-gray-200 hover:border-orange-400 transition-all duration-300"
    >
        <div className="absolute top-0 left-0 right-0 bg-linear-to-b from-black/60 to-transparent p-3 z-10">
            <p className="text-xs font-semibold text-white">{title}</p>
        </div>
        <img
            src={src}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
            }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
);

export default M_A_Details;