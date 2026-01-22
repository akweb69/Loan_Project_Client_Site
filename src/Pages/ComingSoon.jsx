import React from 'react';
import { motion } from 'framer-motion';
import {
    Construction,
    Clock,
    ArrowRight,
    Sparkles,
    Mail,
} from 'lucide-react';

const ComingSoon = () => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.18,
                delayChildren: 0.3,
            },
        },
    };

    const item = {
        hidden: { y: 32, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 110,
                damping: 14,
            },
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-purple-950 text-white flex items-center justify-center relative overflow-hidden px-5">
            {/* Subtle animated background elements */}
            <motion.div
                className="absolute top-[10%] left-[8%] opacity-10 text-purple-400 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
            >
                <Sparkles size={80} strokeWidth={1} />
            </motion.div>

            <motion.div
                className="absolute bottom-[12%] right-[10%] opacity-10 text-indigo-300 pointer-events-none"
                animate={{ rotate: -360 }}
                transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
            >
                <Sparkles size={100} strokeWidth={0.9} />
            </motion.div>

            <motion.div
                className="relative z-10 text-center max-w-2xl w-full"
                variants={container}
                initial="hidden"
                animate="show"
            >
                <motion.div variants={item} className="mb-10">
                    <div className="w-28 h-28 mx-auto rounded-full bg-purple-900/20 border border-purple-500/30 backdrop-blur-xl flex items-center justify-center">
                        <Construction size={56} strokeWidth={1.4} className="text-purple-400" />
                    </div>
                </motion.div>
                <h1 className="text-green-500 text-3xl font-bold">Success Loan Request</h1>
                <motion.h1
                    variants={item}
                    className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight mb-6 bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent"
                >
                    Coming Soon
                </motion.h1>

                <motion.p
                    variants={item}
                    className="text-xl sm:text-2xl text-gray-300 mb-10 leading-relaxed"
                >
                    We’re building something really special.
                    <br className="hidden sm:block" />
                    Stay tuned — launching very soon!
                </motion.p>

                <motion.div
                    variants={item}
                    className="flex items-center justify-center gap-3 text-indigo-300 mb-12 text-lg"
                >
                    <Clock size={20} />
                    <span>Expected: within the next 1–2 weeks</span>
                </motion.div>

                {/* Email signup */}
                <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-10">
                    <div className="flex-1 min-w-[260px] bg-white/5 border border-indigo-500/30 rounded-full px-5 py-3.5 flex items-center gap-3 backdrop-blur-lg">
                        <Mail size={18} className="text-indigo-400" />
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="bg-transparent outline-none flex-1 text-white placeholder:text-gray-500"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-7 py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 shadow-lg shadow-purple-900/40 transition-all"
                    >
                        Notify Me
                        <ArrowRight size={18} />
                    </motion.button>
                </motion.div>

                <motion.p variants={item} className="text-gray-500 text-sm">
                    Big updates coming to our social channels too ✦
                </motion.p>
            </motion.div>

            {/* Very subtle radial glow */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_70%,rgba(139,92,246,0.08)_0%,transparent_45%)]" />
        </div>
    );
};

export default ComingSoon;