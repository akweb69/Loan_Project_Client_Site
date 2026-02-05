import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    UserPlus,
    Phone,
    Lock,
    Eye,
    EyeOff
} from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '@/context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const SignIn = () => {
    const { loginWithEmail, loading, user } = useContext(AppContext);
    const navigate = useNavigate();

    const base_url = import.meta.env.VITE_BASE_URL;

    const backgroundImages = [
        "https://i.ibb.co/sGdpqw3/image.png",
        "https://i.ibb.co/XxYYP7Ys/image.png",
        "https://i.ibb.co/pYRFGtG/image.png"
    ];

    const logo = "https://i.ibb.co/hxjcFNzD/image.png";

    const [currentBg, setCurrentBg] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    /* ---------------- AUTH REDIRECT ---------------- */
    useEffect(() => {
        if (loading) return;
        if (user?.email) {
            navigate(`/provide_info/${user.email}`, { replace: true });
        }
    }, [user, loading, navigate]);

    /* ---------------- BACKGROUND ROTATION ---------------- */
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBg(prev =>
                prev === backgroundImages.length - 1 ? 0 : prev + 1
            );
        }, 20000);

        return () => clearInterval(interval);
    }, []);

    /* ---------------- LOGIN HANDLER ---------------- */
    const handleLogin = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        if (!phone || !password) {
            toast.error('অনুগ্রহ করে সব প্রয়োজনীয় ফর্ম পূরণ করুন');
            return;
        }

        try {
            setIsSubmitting(true);

            // get email from phone
            const res = await axios.get(`${base_url}/users/${phone}`);
            const email = res.data?.email;

            if (!email) {
                toast.error('সঠিক ফোন নাম্বার ব্যবহার করুন');
                return;
            }

            const loginRes = await loginWithEmail(email, password);

            if (loginRes.success) {
                // toast.success('লগইন সফল হয়েছে');
                navigate(`/provide_info/${email}`);
            } else {
                toast.error('লগইন করা যায়নি');
            }

        } catch (error) {
            console.error(error);
            toast.error('সার্ভার সমস্যা হয়েছে');
        } finally {
            setIsSubmitting(false);
        }
    };

    /* ---------------- GLOBAL LOADING ---------------- */
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImages[currentBg]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            className="min-h-screen flex items-center justify-center transition-all duration-1000"
        >
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 md:p-8"
            >
                {/* Header */}
                <div className="flex items-center justify-center gap-3 mb-6">
                    <img src={logo} alt="logo" className="w-10 h-10" />
                    <div className="w-px h-10 bg-gray-400" />
                    <div className="text-xs font-bold text-blue-950 text-center">
                        World <br /> Bank <br /> Bangladesh
                    </div>
                </div>

                <h1 className="text-xl font-bold text-center text-blue-900 mb-1">
                    স্বাগতম
                </h1>
                <p className="text-sm text-gray-500 text-center mb-6">
                    আপনার অ্যাকাউন্টে লগইন করুন
                </p>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Phone */}
                    <div>
                        <label className="text-sm font-medium">মোবাইল নাম্বার</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <Input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="pl-10"
                                placeholder="017XXXXXXXX"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm font-medium">পাসওয়ার্ড</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? 'text' : 'password'}
                                className="pl-10 pr-10"
                                placeholder="********"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 rounded-lg
                                   bg-gradient-to-r from-blue-600 to-indigo-600
                                   py-2.5 text-white font-semibold shadow-md
                                   disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        <UserPlus size={18} />
                        {isSubmitting ? 'লগইন হচ্ছে...' : 'লগইন করুন'}
                    </motion.button>
                </form>

                {/* Footer */}
                <Button
                    onClick={() => navigate('/signup')}
                    variant="outline"
                    className="w-full mt-4 flex items-center justify-center gap-2 h-10"
                >
                    <UserPlus size={18} />
                    নতুন একাউন্ট তৈরি করুন
                </Button>
            </motion.div>
        </div>
    );
};

export default SignIn;
