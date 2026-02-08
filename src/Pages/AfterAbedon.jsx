import { AppContext } from '@/context/AppContext';
import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import Slider from './Slider';
import { Link } from 'react-router-dom';
import { Banknote, CreditCard, HelpCircle, Home, Landmark, User, X } from 'lucide-react';
import toast from 'react-hot-toast';

const AfterAbedon = ({ phone }) => {
    const { user, loading } = useContext(AppContext);
    const [uiLoading, setUiLoading] = React.useState(false);
    const [data, setData] = React.useState([]);
    const base_url = import.meta.env.VITE_BASE_URL;
    const [userData, setUserData] = React.useState({});
    const [lastMassage, setLastMassage] = React.useState(null);
    const [openDetailsMassageModal, setOpenDetailsMassageModal] = React.useState(false);
    const [typeOfAcconut, setTypeOfAcconut] = React.useState("");
    const [accountNumber, setAccountNumber] = React.useState("");
    const [accountHolderName, setAccountHolderName] = React.useState("");

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
    const loadUserData = async () => {
        try {
            const email = user?.email; // no need to await, user.email is not a promise
            if (!email) return;

            setUiLoading(true);

            const res = await axios.get(`${base_url}/user/${email}`);

            if (res.data) {
                setUserData(res.data);

                const messages = res.data.massages;
                if (Array.isArray(messages) && messages.length > 0) {
                    setLastMassage(messages[messages.length - 1]);
                } else {
                    setLastMassage(null);
                }

                console.log("User messages:", messages);
            } else {
                setUserData(null);
                setLastMassage(null);
            }
        } catch (error) {
            console.error("Error loading user data:", error);
            setUserData(null);
            setLastMassage(null);
        } finally {
            setUiLoading(false);
        }
    };


    useEffect(() => {
        if (!loading && user?.email) {
            loadData();
            loadUserData();
        }
    }, [user])

    // handleAddBankAccount------------>
    const handleAddBankAccount = async (e) => {
        e.preventDefault();
        toast.loading("অপেক্ষা করুন");
        const email = await user?.email;
        const date = new Date().toLocaleString();
        const data = { typeOfAcconut, accountNumber, accountHolderName, date };
        const res = await axios.patch(`${base_url}/users/bankdetails/${email}`, data);
        if (res) {
            toast.dismiss();
            toast.success("ব্যাংক অ্যাকাউন্ট সফলভাবে যুক্ত করা হয়েছে");
            setOpenDetailsMassageModal(false);
            // window reload
            window.location.reload();
        }
        else {
            toast.dismiss();
            toast.error("ব্যাংক অ্যাকাউন্ট যুক্ত করা যায়নি");
        }

    }

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
                            {lastMassage ? <div className="text-green-500"> আপনার ঋণ অনুমোদিত হয়েছে</div> : "আবেদন যাচাইকরণ চলছে"}
                        </h2>
                        <p className="text-sm text-yellow-700">
                            {lastMassage ? <div className="text-green-500">অর্থ উত্তোলন করতে নিচের বাটনে ক্লিক করুন</div> : " আপনার আবেদন বর্তমানে পর্যালোচনাধীন রয়েছে"}

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

                {
                    openDetailsMassageModal && <div className="w-full h-screen  z-50 bg-white/20 backdrop-blur-sm flex justify-center items-center">

                        <div className="max-w-3xl w-full relative p-4 md:p-10 rounded-2xl shadow bg-white ">
                            {/* close btn */}
                            <div className="absolute top-0 right-0 h-10 w-10 flex justify-center items-center bg-rose-500 rounded-l-full">
                                <X className="text-white" onClick={() => setOpenDetailsMassageModal(false)} />
                            </div>

                            {/* details */}
                            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                                    ব্যাংক অ্যাকাউন্ট যোগ করুন
                                </h2>

                                {/* ফর্ম */}
                                <form onSubmit={handleAddBankAccount} className="space-y-5">
                                    {/* Account Type */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            অ্যাকাউন্টের ধরণ
                                        </label>
                                        <select
                                            onChange={(e) => setTypeOfAcconut(e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 
                           focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                                        >
                                            <option value="">নির্বাচন করুন</option>
                                            <option value="bkash">বিকাশ</option>
                                            <option value="nagad">নগদ</option>
                                            <option value="rocket">রকেট</option>
                                            <option value="bank">ব্যাংক অ্যাকাউন্ট</option>
                                        </select>
                                    </div>

                                    {/* Account Number */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            অ্যাকাউন্ট নাম্বার
                                        </label>
                                        <input
                                            onChange={(e) => setAccountNumber(e.target.value)}
                                            type="number"
                                            placeholder="01XXXXXXXXX"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 
                           focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                                        />
                                    </div>

                                    {/* Account Holder Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            অ্যাকাউন্ট হোল্ডারের নাম
                                        </label>
                                        <input
                                            onChange={(e) => setAccountHolderName(e.target.value)}
                                            type="text"
                                            placeholder="আপনার নাম লিখুন"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 
                           focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button

                                        type="submit"
                                        className="w-full bg-rose-500 hover:bg-rose-600 text-white font-medium 
                       py-2.5 rounded-lg transition duration-200"
                                    >
                                        সংরক্ষণ করুন
                                    </button>
                                </form>
                            </div>


                        </div>
                    </div>
                }


                {
                    lastMassage ?

                        <div className="mt-4 bg-white rounded shadow p-4">

                            <p className="text-lg font-semibold">
                                আপনার ঋণ অনুমোদিত হয়েছে
                            </p>
                            <p className="text-green-500 text-sm">
                                অর্থ উত্তোলন করতে নিচের বাটনে ক্লিক করুন
                            </p>
                            {/* button */}
                            <div className="">
                                {
                                    userData?.bankDetails && <Link to={`/withdraw_money/${userData?.email}`}

                                        className="w-full py-3 cursor-pointer hover:bg-emerald-700 hover:text-white bg-emerald-500 rounded shadow text-center text-gray-950 mt-4 text-lg flex justify-center items-center gap-2">

                                        <Landmark className="" />
                                        <span className="">
                                            অর্থ উত্তোলন করুন
                                        </span>

                                    </Link>
                                }

                                {
                                    !userData.bankDetails && <div
                                        onClick={() => setOpenDetailsMassageModal(true)}
                                        className="w-full py-3 cursor-pointer hover:bg-emerald-700 hover:text-white bg-emerald-500 rounded shadow text-center text-gray-950 mt-4 text-lg flex justify-center items-center gap-2">

                                        <Landmark className="" />
                                        <span className="">
                                            ব্যাংক অ্যাকাউন্ট যোগ করুন
                                        </span>

                                    </div>
                                }
                            </div>
                        </div>

                        :
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
                }





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