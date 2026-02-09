import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const ITEMS_PER_PAGE = 10;

const AllUsers = () => {
    const base_url = import.meta.env.VITE_BASE_URL;
    const [loading, setLoading] = useState(true);
    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    // Load data
    const loadData = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await axios.get(`${base_url}/users`);
            const users = res.data || [];
            setAllUsers(users);
            setFilteredUsers(users);
            setCurrentPage(1);
        } catch (err) {
            console.error(err);
            setError('Failed to load users. Please try again.');
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // Filter + reset page
    useEffect(() => {
        const term = searchTerm.toLowerCase().trim();
        let results = allUsers;

        if (term) {
            results = allUsers.filter((user) =>
                (user.name?.toLowerCase() || '').includes(term) ||
                (user.email?.toLowerCase() || '').includes(term) ||
                (user.mobile?.toLowerCase() || '').includes(term)
            );
        }

        setFilteredUsers(results);
        setCurrentPage(1);
    }, [searchTerm, allUsers]);

    const handleDelete = async (userId, userName = 'this user') => {
        const confirmed = window.confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`);

        if (!confirmed) return;

        try {
            setDeletingId(userId);
            await axios.delete(`${base_url}/users/${userId}`);

            // Optimistic update
            setAllUsers((prev) => prev.filter((u) => u._id !== userId));
            setFilteredUsers((prev) => prev.filter((u) => u._id !== userId));

            toast.success('User deleted successfully');
        } catch (err) {
            console.error('Delete failed:', err);
            toast.error('Failed to delete user');
        } finally {
            setDeletingId(null);
        }
    };

    // Pagination logic
    const totalItems = filteredUsers.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleCopyBtn = async (email) => {
        try {
            await navigator.clipboard.writeText(email);
            toast.success('Email copied!');
        } catch {
            toast.error('Failed to copy');
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
            return pages;
        }

        pages.push(1);
        if (currentPage > 3) pages.push('...');

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);
        for (let i = start; i <= end; i++) pages.push(i);

        if (currentPage < totalPages - 2) pages.push('...');
        if (totalPages > 1) pages.push(totalPages);

        return pages;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-2">
                                User Management
                            </h1>
                            <p className="text-slate-600 text-sm md:text-base">
                                Manage and monitor all registered users
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="w-full lg:w-96">
                            <div className="relative">
                                <svg
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search by name, email or mobile..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900 placeholder-slate-400"
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                {loading ? (
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-16">
                        <div className="flex flex-col justify-center items-center">
                            <div className="relative">
                                <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200"></div>
                                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0"></div>
                            </div>
                            <p className="mt-6 text-lg font-medium text-slate-700">Loading users...</p>
                            <p className="mt-2 text-sm text-slate-500">Please wait a moment</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="bg-white rounded-2xl shadow-lg border border-red-200 p-16">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-red-900 mb-2">Error Loading Users</h3>
                            <p className="text-red-600 mb-6">{error}</p>
                            <button
                                onClick={loadData}
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Retry
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        {totalItems === 0 ? (
                            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-16">
                                <div className="text-center">
                                    <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-4">
                                        <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                        {searchTerm ? 'No Results Found' : 'No Users Available'}
                                    </h3>
                                    <p className="text-slate-600">
                                        {searchTerm ? `No matches found for "${searchTerm}"` : 'There are currently no users in the system'}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Stats Bar */}
                                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-4 mb-6 text-white">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <span className="font-medium">
                                                {totalItems} {totalItems === 1 ? 'User' : 'Users'} {searchTerm && '(Filtered)'}
                                            </span>
                                        </div>
                                        <div className="text-sm opacity-90">
                                            Page {currentPage} of {totalPages}
                                        </div>
                                    </div>
                                </div>

                                {/* Table Container */}
                                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-slate-200">
                                            <thead>
                                                <tr className="bg-gradient-to-r from-slate-50 to-slate-100">
                                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                                                        Name
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                                                        Email
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                                                        Mobile
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {currentUsers.map((user, index) => (
                                                    <tr
                                                        key={user._id}
                                                        className={`transition-all duration-150 hover:bg-blue-50 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                                                            }`}
                                                    >
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                                                    {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-semibold text-slate-900">
                                                                        {user.name || '—'}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-slate-900">{user.email || '—'}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-slate-900">{user.mobile || '—'}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            <div className="flex items-center gap-3">
                                                                <button
                                                                    onClick={() => handleCopyBtn(user.email)}
                                                                    className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 font-medium"
                                                                >
                                                                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                                    </svg>
                                                                    Copy
                                                                </button>

                                                                <button
                                                                    onClick={() => handleDelete(user._id, user.name)}
                                                                    disabled={deletingId === user._id}
                                                                    className={`inline-flex items-center px-3 py-1.5 rounded-lg transition-colors duration-200 font-medium ${deletingId === user._id
                                                                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                                                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                                                                        }`}
                                                                >
                                                                    {deletingId === user._id ? (
                                                                        <>
                                                                            <svg className="animate-spin h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24">
                                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                            </svg>
                                                                            Deleting...
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                            </svg>
                                                                            Delete
                                                                        </>
                                                                    )}
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination Footer */}
                                    <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
                                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                            <div className="text-sm text-slate-600">
                                                Showing <span className="font-semibold text-slate-900">{startIndex + 1}</span> to{' '}
                                                <span className="font-semibold text-slate-900">{endIndex}</span> of{' '}
                                                <span className="font-semibold text-slate-900">{totalItems}</span> results
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => goToPage(currentPage - 1)}
                                                    disabled={currentPage === 1}
                                                    className="inline-flex items-center px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow"
                                                >
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                    </svg>
                                                    Previous
                                                </button>

                                                <div className="hidden sm:flex items-center gap-1">
                                                    {getPageNumbers().map((page, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() => typeof page === 'number' && goToPage(page)}
                                                            className={`min-w-[2.5rem] px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${page === currentPage
                                                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                                                                : page === '...'
                                                                    ? 'cursor-default text-slate-400'
                                                                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm hover:shadow'
                                                                }`}
                                                            disabled={page === '...'}
                                                        >
                                                            {page}
                                                        </button>
                                                    ))}
                                                </div>

                                                <button
                                                    onClick={() => goToPage(currentPage + 1)}
                                                    disabled={currentPage === totalPages}
                                                    className="inline-flex items-center px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow"
                                                >
                                                    Next
                                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AllUsers;