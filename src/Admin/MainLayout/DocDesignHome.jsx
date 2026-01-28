import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Repeat,
    IdCard,
    ShieldCheck,
    Stamp,
    CreditCard,
    Receipt,
    FileCheck,
    ArrowRight,
    Sparkles,
} from 'lucide-react';

const DocDesignHome = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const services = [
        {
            title: "Transaction",
            desc: "Generate transaction documents",
            Icon: Repeat,
            color: "from-blue-500 to-blue-700",
            hover: "hover:shadow-blue-200/60 hover:border-blue-200",
            bgGlow: "bg-blue-500/10",
        },
        {
            title: "ID Card",
            desc: "Create identification cards",
            Icon: IdCard,
            color: "from-emerald-500 to-emerald-700",
            hover: "hover:shadow-emerald-200/60 hover:border-emerald-200",
            bgGlow: "bg-emerald-500/10",
        },
        {
            title: "Insurance",
            desc: "Generate insurance documents",
            Icon: ShieldCheck,
            color: "from-indigo-500 to-indigo-700",
            hover: "hover:shadow-indigo-200/60 hover:border-indigo-200",
            bgGlow: "bg-indigo-500/10",
        },
        {
            title: "Stamp",
            desc: "Create stamp documents",
            Icon: Stamp,
            color: "from-amber-500 to-amber-700",
            hover: "hover:shadow-amber-200/60 hover:border-amber-200",
            bgGlow: "bg-amber-500/10",
        },
        {
            title: "Cheque",
            desc: "Generate cheque documents",
            Icon: CreditCard,
            color: "from-rose-500 to-rose-700",
            hover: "hover:shadow-rose-200/60 hover:border-rose-200",
            bgGlow: "bg-rose-500/10",
        },
        {
            title: "Money Receipt",
            desc: "Create money receipts",
            Icon: Receipt,
            color: "from-cyan-500 to-cyan-700",
            hover: "hover:shadow-cyan-200/60 hover:border-cyan-200",
            bgGlow: "bg-cyan-500/10",
        },
        {
            title: "Approval",
            desc: "Generate approval certificates",
            Icon: FileCheck,
            color: "from-green-500 to-green-700",
            hover: "hover:shadow-green-200/60 hover:border-green-200",
            bgGlow: "bg-green-500/10",
        },
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
            },
        },
    };

    const headerVariants = {
        hidden: { y: -20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 py-6 px-3 sm:py-8 sm:px-4 md:py-12 md:px-6 lg:px-8">
            <div className="mx-auto max-w-[1600px]">
                {/* Animated Header */}
                <motion.div
                    className="mb-8 sm:mb-10 md:mb-14 text-center"
                    initial="hidden"
                    animate="visible"
                    variants={headerVariants}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 mb-3 sm:mb-4 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-sm border border-gray-200"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                    >
                        <Sparkles className="h-4 w-4 text-indigo-600" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700">
                            Professional Document Generation
                        </span>
                    </motion.div>

                    <motion.h1
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        Document{' '}
                        <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                            Generator
                        </span>
                    </motion.h1>

                    <motion.p
                        className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        Choose the type of document you want to create instantly
                    </motion.p>
                </motion.div>

                {/* Animated Cards Grid */}
                <motion.div
                    className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-7"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {services.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -8, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onHoverStart={() => setHoveredIndex(index)}
                            onHoverEnd={() => setHoveredIndex(null)}
                            className={`
                group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/80 backdrop-blur-sm
                shadow-lg hover:shadow-2xl transition-all duration-500
                border border-gray-200/50 cursor-pointer
                ${item.hover}
              `}
                            role="button"
                            tabIndex={0}
                            onClick={() => {
                                console.log(`Opening ${item.title} generator`);
                            }}
                        >
                            {/* Animated gradient bar */}
                            <motion.div
                                className={`absolute inset-x-0 top-0 h-1.5 sm:h-2 bg-gradient-to-r ${item.color}`}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                            />

                            {/* Glow effect on hover */}
                            <motion.div
                                className={`absolute inset-0 ${item.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                                initial={false}
                            />

                            <div className="relative p-5 sm:p-6 md:p-7 pt-6 sm:pt-8 md:pt-9 flex flex-col items-center text-center">
                                {/* Animated Icon container */}
                                <motion.div
                                    className={`
                    mb-4 sm:mb-5 md:mb-6 flex h-16 w-16 sm:h-18 sm:w-18 md:h-20 md:w-20 items-center justify-center 
                    rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 
                    shadow-inner relative overflow-hidden
                  `}
                                    whileHover={{ rotate: [0, -5, 5, 0] }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {/* Icon background pulse */}
                                    {hoveredIndex === index && (
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-br from-white to-transparent"
                                            initial={{ scale: 0, opacity: 0.5 }}
                                            animate={{ scale: 2, opacity: 0 }}
                                            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.5 }}
                                        />
                                    )}

                                    <item.Icon
                                        className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-gray-700 relative z-10"
                                        strokeWidth={1.8}
                                    />
                                </motion.div>

                                <motion.h3
                                    className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.1 + 0.2 }}
                                >
                                    {item.title}
                                </motion.h3>

                                <motion.p
                                    className="text-xs sm:text-sm text-gray-600 leading-relaxed px-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.1 + 0.3 }}
                                >
                                    {item.desc}
                                </motion.p>

                                {/* Animated hover action */}
                                <motion.div
                                    className="mt-4 sm:mt-5 md:mt-6 flex items-center gap-1.5 sm:gap-2"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{
                                        opacity: hoveredIndex === index ? 1 : 0,
                                        y: hoveredIndex === index ? 0 : 10,
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                                        Create now
                                    </span>
                                    <motion.div
                                        animate={{ x: hoveredIndex === index ? [0, 4, 0] : 0 }}
                                        transition={{ duration: 0.8, repeat: Infinity }}
                                    >
                                        <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-600" />
                                    </motion.div>
                                </motion.div>
                            </div>

                            {/* Shimmer effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                initial={{ x: '-100%' }}
                                animate={{ x: hoveredIndex === index ? '100%' : '-100%' }}
                                transition={{ duration: 0.6 }}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Animated Footer */}
                <motion.div
                    className="mt-10 sm:mt-12 md:mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 bg-white/60 backdrop-blur-sm px-4 sm:px-6 py-3 rounded-full shadow-sm border border-gray-200">
                        <span className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            Standard Formats
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                            Secure & Instant
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                            Professional Quality
                        </span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default DocDesignHome;