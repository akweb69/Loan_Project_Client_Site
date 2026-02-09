import { Input } from '@/components/ui/input';
import { UserPlus, Phone, Lock, User, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const { signUpWithEmail } = useContext(AppContext)
    const backgroundImages = [
        "https://i.ibb.co/sGdpqw3/image.png",
        "https://i.ibb.co/XxYYP7Ys/image.png",
        "https://i.ibb.co/pYRFGtG/image.png"
    ];

    const logo = "https://i.ibb.co/hxjcFNzD/image.png";

    const [currentBg, setCurrentBg] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const navigate = useNavigate()
    const email = `${name ? name.split(' ')[0] : 'WBL'}${Math.floor(Math.random() * 1009969000)}@gmail.com`;

    // background rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBg((prev) =>
                prev === backgroundImages.length - 1 ? 0 : prev + 1
            );
        }, 20000);

        return () => clearInterval(interval);
    }, []);
    const base_url = import.meta.env.VITE_BASE_URL;
    const handleSignUp = async (e) => {
        toast.loading("অপেক্ষা করুন আকাউন্ট তৈরি হচ্ছে ... ");
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Name:', name);
        console.log('Mobile:', mobile);
        if (!email || !password || !name || !mobile) {
            toast.error('অনুগ্রহ করে সব প্রয়োজনীয় ফর্ম পূরণ করুন');
            return
        }
        // ----sign up
        const res = await signUpWithEmail(email, password, name);
        if (res.success) {
            axios.post(`${base_url}/users`, {
                email: email,
                password: password,
                name: name,
                mobile: mobile
            })
                .then((response) => {
                    toast.dismiss();
                    console.log(response.data);
                    toast.success('আকাউন্ট তৈরি করা হয়েছে');
                    navigate(`/provide_info/${email}`)

                })
                .catch((error) => {
                    toast.dismiss();
                    console.error(error);
                    toast.error('আকাউন্ট তৈরি করা যায়নি');
                });
        }


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
                className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6 md:p-8"
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
                    আকাউন্ট তৈরি করুন
                </h1>
                <p className="text-sm text-gray-500 text-center mb-6">
                    নতুন আকাউন্ট তৈরি করতে নিচের তথ্য দিন
                </p>

                {/* form */}
                <form
                    onSubmit={handleSignUp}
                    className="space-y-4">
                    {/* name */}
                    <div className="md:grid  grid-cols-2 gap-4 space-y-4 md:space-y-0 items-center">
                        <div>
                            <label className="text-sm font-medium">পূর্ণ নাম</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    onChange={(e) => setName(e.target.value)}
                                    className="pl-10" placeholder="সম্পূর্ণ নাম লিখুন" />
                            </div>
                        </div>

                        {/* mobile */}
                        <div>
                            <label className="text-sm font-medium">মোবাইল নাম্বার</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    onChange={(e) => setMobile(e.target.value)}
                                    className="pl-10" placeholder="01768******" />
                            </div>
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
                        className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 py-2.5 text-white font-semibold shadow-md"
                        type="submit"
                    >
                        <UserPlus size={18} />
                        আকাউন্ট তৈরি করুন
                    </motion.button>
                </form>

                {/* footer */}
                <p className="text-sm text-center text-gray-600 mt-5">
                    ইতিমধ্যে আকাউন্ট আছে?{" "}
                    <span
                        onClick={() => navigate('/signin')}
                        className="text-blue-600 font-semibold cursor-pointer hover:underline">
                        এখানে লগইন করুন
                    </span>
                </p>
            </motion.div>
        </div>
    );
};

export default SignUp;
