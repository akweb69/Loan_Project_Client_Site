import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageMassage = () => {
    const base_url = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

    const [massages, setMassages] = useState([]);
    const [massageName, setMassageName] = useState('');       // internal/short name
    const [massageTitle, setMassageTitle] = useState('');     // display/public title
    const [bkashNumber, setBkashNumber] = useState('');
    const [nagadNumber, setNagadNumber] = useState('');
    const [paymentDetails, setPaymentDetails] = useState('');

    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMassages();
    }, []);

    const fetchMassages = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${base_url}/massages`);
            setMassages(res.data);
        } catch (err) {
            console.error(err);
            setError('Failed to load massages');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setMassageName('');
        setMassageTitle('');
        setBkashNumber('');
        setNagadNumber('');
        setPaymentDetails('');
        setEditingId(null);
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!massageName.trim()) {
            setError('Massage name (internal) is required');
            return;
        }
        if (!massageTitle.trim()) {
            setError('Display title is required');
            return;
        }

        try {
            setLoading(true);

            const data = {
                name: massageName.trim(),
                title: massageTitle.trim(),
                bkashNumber: bkashNumber.trim() || undefined,
                nagadNumber: nagadNumber.trim() || undefined,
                paymentDetails: paymentDetails.trim() || undefined,
            };

            if (editingId) {
                await axios.patch(`${base_url}/massages/${editingId}`, data);
            } else {
                await axios.post(`${base_url}/massages`, data);
            }

            resetForm();
            fetchMassages();
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (massage) => {
        setEditingId(massage._id);
        setMassageName(massage.name || '');
        setMassageTitle(massage.title || '');
        setBkashNumber(massage.bkashNumber || '');
        setNagadNumber(massage.nagadNumber || '');
        setPaymentDetails(massage.paymentDetails || '');
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this massage?')) return;

        try {
            setLoading(true);
            await axios.delete(`${base_url}/massages/${id}`);
            fetchMassages();
        } catch (err) {
            console.error(err);
            setError('Failed to delete');
        } finally {
            setLoading(false);
        }
    };

    const cancelEdit = () => {
        resetForm();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10 animate-fade-in">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-4 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-3">
                        {editingId ? 'Edit Massage Service' : 'Massage Management'}
                    </h1>
                    <p className="text-gray-600 text-lg">
                        {editingId ? 'Update service details & payment info' : 'Add and manage your massage services'}
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-8 mb-8 border border-white/20 transform hover:scale-[1.01] transition-all duration-300">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Massage Name (internal) */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Internal Massage Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={massageName}
                                onChange={(e) => setMassageName(e.target.value)}
                                placeholder="e.g., swedish-60, hotstone-90"
                                className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-white/50"
                                required
                            />
                        </div>

                        {/* Display Title */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Display Title / Service Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={massageTitle}
                                onChange={(e) => setMassageTitle(e.target.value)}
                                placeholder="e.g., Relaxing Swedish Massage 60 min"
                                className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-white/50"
                                required
                            />
                        </div>

                        {/* bKash */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                bKash Number
                            </label>
                            <input
                                type="text"
                                value={bkashNumber}
                                onChange={(e) => setBkashNumber(e.target.value)}
                                placeholder="01XXXXXXXXX"
                                className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-white/50"
                            />
                        </div>

                        {/* Nagad */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Nagad Number
                            </label>
                            <input
                                type="text"
                                value={nagadNumber}
                                onChange={(e) => setNagadNumber(e.target.value)}
                                placeholder="01XXXXXXXXX"
                                className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-white/50"
                            />
                        </div>

                        {/* Payment Details */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Payment Instructions / Details
                            </label>
                            <textarea
                                value={paymentDetails}
                                onChange={(e) => setPaymentDetails(e.target.value)}
                                placeholder="Send payment to bKash/Nagad number above. Please include your name and massage type in the reference."
                                rows={3}
                                className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-white/50 resize-y"
                            />
                        </div>

                        {error && (
                            <div className="flex items-center gap-3 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg animate-shake">
                                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <span className="font-medium">{error}</span>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold px-8 py-4 rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Saving...</span>
                                    </>
                                ) : editingId ? 'Update Service' : 'Add New Massage'}
                            </button>

                            {editingId && (
                                <button
                                    type="button"
                                    onClick={cancelEdit}
                                    className="flex-1 sm:flex-initial bg-gray-100 text-gray-700 font-semibold px-8 py-4 rounded-xl hover:bg-gray-200 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* List */}
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                        <span className="w-2 h-8 bg-gradient-to-b from-purple-600 to-blue-600 rounded-full"></span>
                        All Massage Services
                        <span className="ml-3 px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full font-medium">
                            {massages.length}
                        </span>
                    </h2>

                    {loading && <div className="text-center py-12">Loading...</div>}

                    {!loading && massages.length === 0 && (
                        <div className="text-center py-16 text-gray-500">
                            No massage services added yet.
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {massages.map((item, index) => (
                            <div
                                key={item._id}
                                className="bg-gradient-to-br from-white to-purple-50/40 rounded-2xl p-5 border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 group"
                                style={{ animationDelay: `${index * 60}ms` }}
                            >
                                <h3 className="font-bold text-xs text-gray-800 group-hover:text-purple-700 transition-colors">
                                    {item.title || item.name}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">{item.name}</p>

                                {(item.bkashNumber || item.nagadNumber) && (
                                    <div className="mt-3 text-sm text-gray-700">
                                        <div className="font-medium">Payment:</div>
                                        {item.bkashNumber && <div>bKash: {item.bkashNumber}</div>}
                                        {item.nagadNumber && <div>Nagad: {item.nagadNumber}</div>}
                                        {item.paymentDetails && (
                                            <div className="mt-1 text-gray-500 italic text-xs">
                                                {item.paymentDetails}
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="mt-5 flex gap-3">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2.5 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 py-2.5 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out;
                }
                .animate-shake {
                    animation: shake 0.4s ease-in-out;
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20%, 60% { transform: translateX(-6px); }
                    40%, 80% { transform: translateX(6px); }
                }
            `}</style>
        </div>
    );
};

export default ManageMassage;