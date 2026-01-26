// pages/Help.jsx
import React, { useState } from "react";
import {
    ChevronDown,
    ChevronUp,
    Phone,
    MapPin,
    Clock,
    MessageSquare,
    Globe,
    Send,
    Home,
    CreditCard,
    HelpCircle,
    User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const faqItems = [
    {
        question: "আমি কিভাবে ঋণের জন্য আবেদন করব?",
        answer:
            "ড্যাশবোর্ডে 'নতুন আবেদন' বাটনে ক্লিক করুন এবং প্রয়োজনীয় তথ্য পূরণ করুন। আপনার ডকুমেন্টগুলো আপলোড করুন। আবেদন জমা দেওয়ার পর আমরা যাচাই করে আপনাকে জানাবো।",
    },
    {
        question: "আমার কি ডকুমেন্ট প্রয়োজন?",
        answer:
            "সাধারণত NID কার্ড, সাম্প্রতিক ছবি, আয়ের প্রমাণ (বেতন স্লিপ / ব্যবসার ডকুমেন্ট), ব্যাংক স্টেটমেন্ট, এবং ঠিকানার প্রমাণ প্রয়োজন হয়। বিস্তারিত লিস্ট আবেদন ফর্মে পাবেন।",
    },
    {
        question: "অনুমোদন প্রক্রিয়াটি কতদিন লাগে?",
        answer:
            "সাধারণত ৭–১৫ কার্যদিবসের মধ্যে প্রাথমিক যাচাই সম্পন্ন হয়। সম্পূর্ণ প্রক্রিয়া ৩০ দিন পর্যন্ত সময় নিতে পারে (ডকুমেন্টের উপর নির্ভর করে)।",
    },
    {
        question: "ঋণের সুদের হার কত?",
        answer:
            "বর্তমানে আমাদের ঋণের সুদের হার ৯% থেকে ১৪% পর্যন্ত (ঋণের ধরন ও মেয়াদ অনুযায়ী)। বিস্তারিত হার আবেদনের সময় দেখতে পাবেন।",
    },
    {
        question: "ঋণ পরিশোধের সময়সীমা কেমন?",
        answer:
            "ঋণের মেয়াদ ১২ মাস থেকে ৬০ মাস পর্যন্ত হতে পারে। আপনি আবেদনের সময় পছন্দমতো মেয়াদ নির্বাচন করতে পারবেন।",
    },
];

const Help = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Banner */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center gap-6 md:gap-12">
                    <div className="text-6xl font-bold">?</div>
                    <div>
                        <h1 className="text-3xl font-extrabold mb-2">
                            সাহায্য ও সহায়তা
                        </h1>
                        <p className="text-blue-100 text-lg">
                            আপনার প্রশ্নের উত্তর এবং আমাদের সাথে যোগাযোগ করুন
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
                {/* Contact Info */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="bg-blue-600 text-white px-6 py-5">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Phone size={20} /> যোগাযোগের তথ্য
                        </h2>
                    </div>

                    <div className="p-6 grid md:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin className="text-blue-600 mt-1" size={24} />
                                <div>
                                    <h4 className="font-medium text-gray-800">অফিসের ঠিকানা</h4>
                                    <p className="text-gray-600">
                                        প্লট-ই-৩২, আগারগাঁও, শের-ই-বাংলা নগর, ঢাকা - ১২০৭
                                        <br />
                                        Plot E-32, Agargaon, Sher-e-Bangla Nagar, Dhaka - 1207
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Globe className="text-blue-600 mt-1" size={24} />
                                <div>
                                    <h4 className="font-medium text-gray-800">হেডকোয়ার্টার</h4>
                                    <p className="text-gray-600">
                                        San Mateo, California, United States
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Clock className="text-blue-600 mt-1" size={24} />
                                <div>
                                    <h4 className="font-medium text-gray-800">অফিসিয়াল সময়</h4>
                                    <p className="text-gray-600">
                                        সকাল ৯টা থেকে রাত ৯টা (শনি থেকে বৃহস্পতি)
                                        <br />
                                        9 AM to 9 PM, Saturday to Thursday
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            <div className="grid grid-cols-3 gap-4">
                                <a
                                    href="https://wa.me/8801342689229"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center p-5 bg-green-50 hover:bg-green-100 rounded-xl transition transform hover:scale-105"
                                >
                                    <MessageSquare className="text-green-600" size={32} />
                                    <span className="mt-2 text-sm font-medium">হোয়াটসঅ্যাপ</span>
                                </a>

                                <button className="flex flex-col items-center p-5 bg-blue-50 hover:bg-blue-100 rounded-xl transition transform hover:scale-105">
                                    <MessageSquare className="text-blue-600" size={32} />
                                    <span className="mt-2 text-sm font-medium">চ্যাট</span>
                                </button>

                                <a
                                    href="https://t.me/yourchannel"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center p-5 bg-cyan-50 hover:bg-cyan-100 rounded-xl transition transform hover:scale-105"
                                >
                                    <Send className="text-cyan-600" size={32} />
                                    <span className="mt-2 text-sm font-medium">টেলিগ্রাম</span>
                                </a>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-xl text-center shadow-inner">
                                <p className="text-sm text-gray-500 mb-1">যোগাযোগের নম্বর</p>
                                <p className="text-2xl font-bold text-blue-700">+880 1342 689 229</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="bg-blue-600 text-white px-6 py-5">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <MessageSquare size={20} /> প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী
                        </h2>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {faqItems.map((item, index) => (
                            <div key={index} className="px-6">
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full py-5 flex justify-between items-center text-left hover:bg-gray-50 transition"
                                >
                                    <span className="font-medium text-gray-800">{item.question}</span>
                                    {openFaq === index ? (
                                        <ChevronUp className="text-blue-600" size={20} />
                                    ) : (
                                        <ChevronDown className="text-gray-500" size={20} />
                                    )}
                                </button>

                                <AnimatePresence>
                                    {openFaq === index && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="pb-5 text-gray-600 text-sm"
                                        >
                                            {item.answer}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

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

export default Help;
