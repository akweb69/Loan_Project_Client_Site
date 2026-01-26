"use client";

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-slate-50 border-t border-slate-200 text-gray-700">
            <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                {/* Brand */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-blue-700">
                        ক্ষুদ্রঋণ সেবা প্ল্যাটফর্ম
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-600">
                        স্বচ্ছ ও নির্ভরযোগ্য ক্ষুদ্রঋণ সেবা প্রদানের মাধ্যমে
                        উদ্যোক্তা ও সাধারণ মানুষের আর্থিক ক্ষমতায়ন আমাদের লক্ষ্য।
                    </p>
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} সর্বস্বত্ব সংরক্ষিত
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-base font-semibold mb-4 text-gray-800">
                        দ্রুত লিংক
                    </h4>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <Link to="/" className="hover:text-blue-600 transition">
                                হোম
                            </Link>
                        </li>
                        <li>
                            <Link to="/apply" className="hover:text-blue-600 transition">
                                ঋণের জন্য আবেদন
                            </Link>
                        </li>
                        <li>
                            <Link to="/status" className="hover:text-blue-600 transition">
                                আবেদন স্ট্যাটাস
                            </Link>
                        </li>
                        <li>
                            <Link to="/help" className="hover:text-blue-600 transition">
                                সহায়তা
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Legal / Info */}
                <div>
                    <h4 className="text-base font-semibold mb-4 text-gray-800">
                        গুরুত্বপূর্ণ তথ্য
                    </h4>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <Link to="/terms" className="hover:text-blue-600 transition">
                                শর্তাবলি
                            </Link>
                        </li>
                        <li>
                            <Link to="/privacy" className="hover:text-blue-600 transition">
                                গোপনীয়তা নীতি
                            </Link>
                        </li>
                        <li>
                            <Link to="/faq" className="hover:text-blue-600 transition">
                                সাধারণ প্রশ্ন (FAQ)
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-base font-semibold mb-4 text-gray-800">
                        যোগাযোগ
                    </h4>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li>📍 ঢাকা, বাংলাদেশ</li>
                        <li>📞 ০১৭xxxxxxxx</li>
                        <li>✉️ support@microloan.gov.bd</li>
                        <li className="text-xs text-gray-500">
                            অফিস সময়: সকাল ৯টা – বিকাল ৫টা
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Note */}
            <div className="bg-slate-100 border-t border-slate-200 py-4 text-center text-xs text-gray-500">
                এই প্ল্যাটফর্মটি সরকারি নীতিমালা অনুযায়ী পরিচালিত
            </div>
        </footer>
    );
};

export default Footer;
