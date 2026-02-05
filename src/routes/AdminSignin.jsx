import React, { useContext, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, LogIn, Shield, Phone } from 'lucide-react';
import axios from 'axios';

// Define this in a better place (env / config file) later
const BASE_URL = import.meta.env.VITE_BASE_URL;

const AdminSignin = () => {
    const { loginWithEmail } = useContext(AppContext);
    const navigate = useNavigate();

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Optional: basic client-side cleanup
        const cleanedPhone = phone.trim().replace(/\s+/g, '');

        if (!cleanedPhone) {
            setError('ফোন নম্বর দিন');
            setLoading(false);
            return;
        }

        try {
            // 1. Get user by phone
            const res0 = await axios.get(`${BASE_URL}/users/${cleanedPhone}`);

            const email = res0.data?.email;

            if (!email) {
                setError('সঠিক ফোন নম্বর ব্যবহার করুন');
                return;
            }

            // 2. Login with found email
            const res = await loginWithEmail(email, password);

            if (res?.success) {
                navigate('/admin');
            } else {
                setError('ইমেইল অথবা পাসওয়ার্ড ভুল');
            }
        } catch (err) {
            console.error(err);
            // More user-friendly error messages
            if (err.response?.status === 404) {
                setError('এই ফোন নম্বার দিয়ে কোনো একাউন্ট পাওয়া যায়নি');
            } else if (err.response?.status === 401) {
                setError('পাসওয়ার্ড ভুল');
            } else {
                setError('কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black px-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-3">
                        <div className="p-3 rounded-full bg-rose-500/20">
                            <Shield className="text-rose-500" size={28} />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-white">Admin Login</h1>
                    <p className="text-gray-400 text-sm mt-1">
                        অ্যাডমিন ড্যাশবোর্ডে প্রবেশ করুন
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-center"
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Phone */}
                    <div>
                        <label className="text-sm text-gray-300 mb-1.5 block">
                            ফোন নম্বর
                        </label>
                        <div className="relative">
                            <Phone
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                            />
                            <input
                                type="tel"              // ← better for phones
                                inputMode="tel"
                                autoComplete="tel"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="017XXXXXXXX"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/30 transition"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm text-gray-300 mb-1.5 block">
                            পাসওয়ার্ড
                        </label>
                        <div className="relative">
                            <Lock
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                            />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/30 transition"
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 transition font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-rose-900/30"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                </svg>
                                প্রবেশ করা হচ্ছে...
                            </span>
                        ) : (
                            <>
                                <LogIn size={18} />
                                লগইন করুন
                            </>
                        )}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminSignin;