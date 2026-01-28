import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const ITEMS_PER_PAGE = 5;

const M_Abedon = () => {
    const base_url = import.meta.env.VITE_BASE_URL;

    const [loading, setLoading] = useState(true);
    const [applications, setApplications] = useState([]);
    const [loanMap, setLoanMap] = useState({});
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // ───────── Load Data ─────────
    const loadAllData = async () => {
        try {
            setLoading(true);

            const [loanDetailsRes, loanAmountRes] = await Promise.all([
                axios.get(`${base_url}/loanDetails`),
                axios.get(`${base_url}/loanAmountAndKistiDetails`)
            ]);

            const loanAmountMap = {};
            loanAmountRes.data?.forEach(item => {
                loanAmountMap[item.phone] = item.loanAmount;
            });

            const enrichedData = loanDetailsRes.data.map(item => ({
                ...item,
                status: item.status || 'pending'
            }));

            setApplications(enrichedData || []);
            setLoanMap(loanAmountMap);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAllData();
    }, []);

    // ───────── Status Update (UI only) ─────────
    const updateStatus = (index, newStatus, id) => {

        axios.patch(`${base_url}/loanDetails/${id}`, { status: newStatus })
            .then(response => {
                const data = response.data;
                toast.success('স্ট্যাটাস পরিবর্তন করা হয়েছে');
                loadAllData();
            })
            .catch(error => {
                console.error(error);
                toast.error('স্ট্যাটাস পরিবর্তন করা যায়নি');
            });
    };

    // ───────── Search Filter ─────────
    const filteredData = applications.filter(item =>
        item?.name?.toLowerCase().includes(search.toLowerCase()) ||
        item?.phone?.includes(search)
    );

    // ───────── Pagination ─────────
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin h-10 w-10 border-b-2 border-orange-600 rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">সকল আবেদন সমূহ</h1>
                    <p className="text-sm text-gray-500">Approve / Reject / Search / Pagination</p>
                </div>

                {/* Search */}
                <input
                    type="text"
                    placeholder="নাম বা মোবাইল দিয়ে খুঁজুন"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="border rounded-lg px-4 py-2 text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-xl shadow">
                <table className="w-full">
                    <thead className="bg-gray-100 text-sm">
                        <tr>
                            <th className="px-4 py-3 text-left">#</th>
                            <th className="px-4 py-3 text-left">নাম</th>
                            <th className="px-4 py-3 text-left">মোবাইল</th>
                            <th className="px-4 py-3 text-left">ঋণ</th>
                            <th className="px-4 py-3 text-left">স্ট্যাটাস</th>
                            <th className="px-4 py-3 text-center">অ্যাকশন</th>
                        </tr>
                    </thead>

                    <tbody className="text-sm">
                        {paginatedData.length === 0 && (
                            <tr>
                                <td colSpan="6" className="py-6 text-center text-gray-400">
                                    কোনো ডাটা পাওয়া যায়নি
                                </td>
                            </tr>
                        )}

                        {paginatedData.map((item, index) => {
                            const globalIndex = startIndex + index;

                            return (
                                <tr key={globalIndex} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-3">{globalIndex + 1}</td>
                                    <td className="px-4 py-3 font-medium">{item.name}</td>
                                    <td className="px-4 py-3">{item.phone}</td>
                                    <td className="px-4 py-3 font-semibold text-orange-600">
                                        ৳ {loanMap[item.phone] || '—'}
                                    </td>

                                    {/* Status */}
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold
                                                ${item.status === 'approved' && 'bg-green-100 text-green-700'}
                                                ${item.status === 'rejected' && 'bg-red-100 text-red-700'}
                                                ${item.status === 'pending' && 'bg-yellow-100 text-yellow-700'}
                                            `}
                                        >
                                            {item.status}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-4 py-3 flex justify-center gap-2">
                                        <Link
                                            to={`/admin/abedon_details/${item?.phone}`}
                                            className="px-3 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700"
                                        >
                                            Details
                                        </Link>
                                        <button
                                            onClick={() => updateStatus(globalIndex, 'approved', item?._id)}
                                            className="px-3 py-1 text-xs rounded bg-green-600 text-white hover:bg-green-700"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => updateStatus(globalIndex, 'rejected', item?._id)}
                                            className="px-3 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700"
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 rounded text-sm
                                ${currentPage === i + 1
                                    ? 'bg-orange-600 text-white'
                                    : 'bg-gray-200 hover:bg-gray-300'}
                            `}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default M_Abedon;
