import { AppContext } from '@/context/AppContext';
import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import Slider from './Slider';
import { Link } from 'react-router-dom';
import { CreditCard, HelpCircle, Home, User } from 'lucide-react';

const AfterAbedon = ({ phone }) => {
    const { user, loading } = useContext(AppContext);
    const [uiLoading, setUiLoading] = React.useState(false);
    const [data, setData] = React.useState([]);
    const base_url = import.meta.env.VITE_BASE_URL;

    // load data------->
    const loadData = async () => {
        setUiLoading(true);
        const res = await axios.get(`${base_url}/loanAmountAndKistiDetails/${phone}`);
        if (res.data) {
            setUiLoading(false);
            setData(res.data);
            console.log("===========<===", res.data);
        }
        else {
            setUiLoading(false);
            setData(null);
        }
    }

    useEffect(() => {
        if (!loading && user?.email) {
            loadData();
        }
    }, [user])

    // checking loading
    if (loading || uiLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
            </div>
        );
    }
    return (
        <div className='w-full '>
            <div className="w-11/12 mx-auto py-4">
                {/* header */}
                <div className="bg-linear-to-br from-blue-600 to-blue-500 
                rounded-2xl shadow-lg p-4 md:p-5 text-white space-y-4">

                    {/* Header */}
                    <div className="flex justify-between items-center border-b border-white/20 pb-2">
                        <h1 className="text-xs md:text-sm font-medium opacity-90">
                            বিশ্বব্যাংক ক্ষুদ্রঋণ প্রকল্পে স্বাগতম,
                        </h1>
                        <p className="font-semibold text-sm md:text-base">
                            {user?.displayName}
                        </p>
                    </div>

                    {/* List */}
                    <div className="space-y-3">
                        {data.map((item, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-xl
                           bg-white/10 backdrop-blur-xl border border-white/20
                           hover:bg-white/15 transition-all duration-200"
                            >

                                {/* Loan Amount */}
                                <div className="flex flex-col gap-1 bg-black/30 backdrop-blur-2xl
                                p-3 rounded-lg text-white items-center justify-center">
                                    <span className="text-[11px] font-medium text-white">
                                        ঋণের পরিমাণ
                                    </span>
                                    <span className="text-lg md:text-xl font-bold">
                                        ৳ {item?.loanAmount}
                                    </span>
                                </div>

                                {/* Tenure */}
                                <div className="flex flex-col gap-1 bg-black/30 backdrop-blur-2xl
                                p-3 rounded-lg text-white items-center justify-center">
                                    <span className="text-[11px] opacity-80">
                                        মেয়াদ
                                    </span>
                                    <span className="text-base font-semibold">
                                        {item?.tenureMonths} মাস
                                    </span>
                                </div>

                                {/* Date */}
                                <div className="flex flex-col gap-1 bg-black/30 backdrop-blur-2xl
                                p-3 rounded-lg text-white items-center justify-center">
                                    <span className="text-[11px] opacity-80">
                                        আবেদনের তারিখ
                                    </span>
                                    <span className="text-sm font-medium">
                                        {new Date(item?.createdAt).toLocaleDateString('bn-BD')}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* slider */}
                <div className="mt-8">
                    <Slider />
                </div>
                {/* jachai section */}
                <div className="mt-8 w-full space-y-4">

                    {/* Status Card */}
                    <div className="rounded-2xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100
                    shadow-md p-5 space-y-3">
                        <h2 className="text-lg font-semibold text-yellow-800">
                            আবেদন যাচাইকরণ চলছে
                        </h2>
                        <p className="text-sm text-yellow-700">
                            আপনার আবেদন বর্তমানে পর্যালোচনাধীন রয়েছে
                        </p>
                    </div>

                    {/* Loan Summary */}
                    <div className="rounded-2xl bg-white shadow-lg border p-5 space-y-4">

                        <h3 className="text-base font-semibold text-gray-800 border-b pb-2">
                            ঋণের বিস্তারিত তথ্য
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

                            <div className="flex justify-between bg-gray-50 p-3 rounded-lg">
                                <span>ঋণের পরিমাণ</span>
                                <span className="font-semibold">৳ {data[0]?.loanAmount}</span>
                            </div>

                            <div className="flex justify-between bg-gray-50 p-3 rounded-lg">
                                <span>মেয়াদ</span>
                                <span className="font-semibold">
                                    {data[0]?.tenureMonths} মাস
                                </span>
                            </div>

                            <div className="flex justify-between bg-gray-50 p-3 rounded-lg">
                                <span>সুদের হার</span>
                                <span className="font-semibold">
                                    {data[0]?.interestRate}%
                                </span>
                            </div>

                            <div className="flex justify-between bg-gray-50 p-3 rounded-lg">
                                <span>প্রসেসিং ফি</span>
                                <span className="font-semibold">
                                    ৳ {data[0]?.processingFee}
                                </span>
                            </div>

                            <div className="flex justify-between bg-gray-50 p-3 rounded-lg">
                                <span>মোট সুদ</span>
                                <span className="font-semibold">
                                    ৳ {data[0]?.totalInterest}
                                </span>
                            </div>

                            <div className="flex justify-between bg-gray-50 p-3 rounded-lg">
                                <span>মোট পরিশোধযোগ্য</span>
                                <span className="font-semibold text-rose-600">
                                    ৳ {data[0]?.totalPayable}
                                </span>
                            </div>

                            <div className="flex justify-between bg-blue-50 p-3 rounded-lg">
                                <span>মাসিক কিস্তি (EMI)</span>
                                <span className="font-bold text-blue-600">
                                    ৳ {data[0]?.monthlyEMI}
                                </span>
                            </div>

                            <div className="flex justify-between bg-gray-50 p-3 rounded-lg">
                                <span>মোবাইল নম্বর</span>
                                <span className="font-semibold">
                                    {data[0]?.phone}
                                </span>
                            </div>

                            <div className="flex justify-between bg-gray-50 p-3 rounded-lg md:col-span-2">
                                <span>আবেদনের তারিখ</span>
                                <span className="font-semibold">
                                    {new Date(data[0]?.createdAt).toLocaleDateString('bn-BD')}
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
                {/* help button */}
                <div className="mt-8 mb-12 w-full">
                    <Link
                        to="/help"
                        className="group flex items-center justify-center gap-2
                   w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500
                   px-5 py-3 text-white font-semibold
                   shadow-md hover:shadow-lg
                   hover:from-blue-700 hover:to-blue-600
                   transition-all duration-200"
                    >
                        <svg
                            className="h-5 w-5 group-hover:scale-110 transition"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M18.364 5.636l-1.414 1.414A7.963 7.963 0 0112 4a7.963 7.963 0 01-4.95 1.636L5.636 5.636A9.969 9.969 0 002 12c0 5.523 4.477 10 10 10s10-4.477 10-10a9.969 9.969 0 00-3.636-6.364z"
                            />
                        </svg>

                        সহায়তা প্রয়োজন?
                    </Link>
                </div>
                {/* bottom nav bar */}
                <div className="fixed z-50 bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md flex justify-around py-2">
                    <Link to="/" className="flex flex-col items-center text-gray-700 hover:text-blue-600">
                        <Home size={24} />
                        <span className="text-xs mt-1">হোম</span>
                    </Link>
                    <Link to="/card" className="flex flex-col items-center text-gray-700 hover:text-blue-600">
                        <CreditCard size={24} />
                        <span className="text-xs mt-1">কার্ড</span>
                    </Link>
                    <Link to="/help" className="flex flex-col items-center text-gray-700 hover:text-blue-600">
                        <HelpCircle size={24} />
                        <span className="text-xs mt-1">সহায়তা</span>
                    </Link>
                    <Link to="/profile" className="flex flex-col items-center text-gray-700 hover:text-blue-600">
                        <User size={24} />
                        <span className="text-xs mt-1">প্রোফাইল</span>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default AfterAbedon;