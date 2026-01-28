import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Users,
    FileText,
    CheckCircle,
    XCircle,
    Loader2
} from 'lucide-react'; // ← recommended icon library

const AdminDash = () => {
    const [loading, setLoading] = useState(true);
    const [loanData, setLoanData] = useState([]);
    const [users, setUsers] = useState([]);
    const [approvedLoans, setApprovedLoans] = useState([]);
    const [rejectedLoans, setRejectedLoans] = useState([]);
    const [kistiData, setKistiData] = useState([]);

    const base_url = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);

                const [loanRes, userRes, kistiRes] = await Promise.all([

                    axios.get(`${base_url}/loanDetails`),
                    axios.get(`${base_url}/users`),
                    axios.get(`${base_url}/loanAmountAndKistiDetails`)
                ]);

                const loans = loanRes.data || [];
                setLoanData(loans);
                setUsers(userRes.data || []);
                setKistiData(kistiRes.data || []);

                // You should either get these from backend or calculate them here
                const approved = loans.filter(l => l.status === 'approved');
                const rejected = loans.filter(l => l.status === 'rejected');

                setApprovedLoans(approved);
                setRejectedLoans(rejected);

            } catch (err) {
                console.error("Dashboard data fetch failed:", err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const stats = [
        {
            title: "মোট ইউজার",
            value: users.length,
            icon: Users,
            color: "bg-blue-50 text-blue-700",
            iconColor: "text-blue-600"
        },
        {
            title: "মোট লোন আবেদন",
            value: loanData.length,
            icon: FileText,
            color: "bg-amber-50 text-amber-700",
            iconColor: "text-amber-600"
        },
        {
            title: "অনুমোদিত লোন",
            value: approvedLoans.length,
            icon: CheckCircle,
            color: "bg-emerald-50 text-emerald-700",
            iconColor: "text-emerald-600"
        },
        {
            title: "বাতিল/প্রত্যাখ্যাত লোন",
            value: rejectedLoans.length,
            icon: XCircle,
            color: "bg-rose-50 text-rose-700",
            iconColor: "text-rose-600"
        },
        {
            title: "মোট লোন আবেদন পরিমাণ",
            value: kistiData.reduce((total, loan) => total + loan.loanAmount, 0),
            icon: FileText,
            color: "bg-amber-50 text-amber-700",
            iconColor: "text-amber-600"
        },

    ];

    return (
        <div className="min-h-screen bg-gray-50/40 p-4 md:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        অ্যাডমিন ড্যাশবোর্ড
                    </h1>
                    <p className="mt-2 text-gray-600">
                        সকল গুরুত্বপূর্ণ পরিসংখ্যান এখানে দেখুন
                    </p>
                </div>

                {/* Stats Cards */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse"
                            >
                                <div className="h-10 w-10 bg-gray-200 rounded-full mb-4"></div>
                                <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
                                <div className="h-8 w-16 bg-gray-200 rounded"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className={`
                  relative overflow-hidden rounded-xl border border-gray-100 
                  bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200
                  ${stat.color}
                `}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium opacity-90">
                                            {stat.title}
                                        </p>
                                        <p className="mt-2 text-3xl font-bold">
                                            {stat.value.toLocaleString()}
                                        </p>
                                    </div>

                                    <div className={`rounded-full p-3 ${stat.color}`}>
                                        <stat.icon className={`h-7 w-7 ${stat.iconColor}`} />
                                    </div>
                                </div>

                                {/* Optional subtle background decoration */}
                                <div className="absolute -right-6 -bottom-6 opacity-5">
                                    <stat.icon className="h-24 w-24" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* You can add more sections here later */}
                {/* Recent loan applications table */}
                {/* Loan status chart */}
                {/* Quick actions buttons */}
            </div>
        </div>
    );
};

export default AdminDash;