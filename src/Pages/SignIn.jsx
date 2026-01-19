import { Input } from '@/components/ui/input';
import { UserPlus, Phone, Lock, User, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '@/context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const SignIn = () => {
    const { loginWithEmail } = useContext(AppContext)
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
    const navigate = useNavigate()

    // background rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBg((prev) =>
                prev === backgroundImages.length - 1 ? 0 : prev + 1
            );
        }, 20000);

        return () => clearInterval(interval);
    }, []);
    // handle login--->
    const base_url = import.meta.env.VITE_BASE_URL;
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!phone || !password) {
            toast.error('অনুগ্রহ করে সব প্রয়োজনীয় ফর্ম পূরণ করুন');
            return
        }
        // get email form db--->
        const res = await axios.get(`${base_url}/users/${phone}`)
        const data = res.data
        const email = data.email
        if (!email) {
            toast.error('সঠিক ফোন নাম্বার দিয়ে লগইন করুন');
            return
        }

        const res2 = await loginWithEmail(email, password)
        if (res2.success) {
            toast.success('লগইন করা হয়েছে');
            navigate(`/provide_info/${email}`)
        }
        else (
            toast.error('লগইন করা যায়নি সঠিক তথ্য দিয়ে প্রয়োজনীয় ফর্ম পূরণ করুন')
        )
    }

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImages[currentBg]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            className="min-h-screen overflow-hidden flex items-center justify-center transition-all duration-1000"
        >
            {/* overlay */}
            {/* <div className="absolute inset-0 h-full bg-black/40"></div> */}

            {/* card */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 md:p-8"
            >
                {/* header */}
                <div className="flex items-center justify-center gap-3 mb-6">
                    <img src={logo} alt="logo" className="w-10 h-10" />
                    <div className="w-px h-10 bg-gradient-to-b from-gray-300 to-gray-900" />
                    <div className="text-xs font-bold tracking-wide text-blue-950">
                        World <br /> Bank <br /> Bangladesh
                    </div>
                </div>

                {/* title */}
                <h1 className="text-xl font-bold text-center text-blue-900 mb-1">
                    স্বাগতম
                </h1>
                <p className="text-sm text-gray-500 text-center mb-6">
                    আপনার আকাউন্টে লগইন করুন
                </p>

                {/* form */}
                <form
                    onSubmit={handleLogin}
                    className="space-y-4">
                    {/* name */}
                    <div>
                        <label className="text-sm font-medium">মোবাইল নাম্বার</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <Input
                                onChange={(e) => setPhone(e.target.value)}
                                className="pl-10" placeholder="01768******" />
                        </div>
                    </div>

                    {/* password */}
                    <div>
                        <label className="text-sm font-medium">পাসওয়ার্ড</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <Input
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? "text" : "password"}
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

                    {/* submit */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 cursor-pointer to-indigo-600 py-2.5 text-white font-semibold shadow-md"
                        type="submit"
                    >
                        <UserPlus size={18} />
                        লগইন করুন

                    </motion.button>
                </form>

                {/* footer */}
                <Button
                    onClick={() => navigate('/signup')}
                    variant='outline'
                    className="w-full mt-4 flex items-center justify-center gap-2 cursor-pointer h-10">
                    <UserPlus size={18} />
                    নতুন একাউন্ট তৈরি করুন
                </Button>

            </motion.div>
        </div>
    );
};

export default SignIn;
