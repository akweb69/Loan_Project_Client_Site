// components/Card.jsx
import React from "react";
import { CreditCard, HelpCircle, Home, User } from "lucide-react";
import { Link } from 'react-router-dom';

const Card = ({ cardNumber, cardHolder, validTill }) => {
    const maskedNumber = cardNumber
        ? cardNumber.replace(/\d{4}(?= \d{4})/g, "****")
        : "XXXX **** **** XXXX";

    return (
        <div className="flex flex-col items-center mt-12">
            <div className="flex items-center gap-2 mb-4 text-blue-600">
                <CreditCard size={24} />
                <h2 className="text-2xl font-bold">আপনার ঋণ কার্ড</h2>
            </div>
            <p className="text-gray-500 mb-6 text-sm">
                আপনার ঋণের বিবরণ এবং পেমেন্ট পরিচালনা করুন
            </p>

            {/* Card */}
            <div className="w-full max-w-md bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl p-6 shadow-xl relative">
                {/* Card chip */}
                <div className="w-12 h-8 bg-yellow-400 rounded-md mb-6" />

                {/* Card number */}
                <div className="text-lg tracking-widest mb-6">
                    {maskedNumber}
                </div>

                <div className="flex justify-between items-end text-sm">
                    {/* Card holder */}
                    <div>
                        <p className="text-gray-400 uppercase">Card Holder</p>
                        <p className="font-semibold">{cardHolder || "NO ACTIVE CARD"}</p>
                    </div>

                    {/* Valid till */}
                    <div className="text-right">
                        <p className="text-gray-400 uppercase">Valid Till</p>
                        <p className="font-semibold">{validTill || "-- / --"}</p>
                    </div>
                </div>

                {/* Optional card icon */}
                <div className="absolute top-6 right-6">
                    <CreditCard size={24} className="text-gray-300 opacity-60" />
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
    );
};

export default Card;
