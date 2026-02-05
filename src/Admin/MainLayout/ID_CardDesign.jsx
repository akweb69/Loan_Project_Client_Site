import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    Upload,
    Download,
    User,
    Building2,
    Calendar,
    Shield,
    Hash,
    Briefcase,
    Camera,
    FileCheck,
    Loader2,
    AlertCircle,
} from 'lucide-react';

const ID_CardDesign = () => {
    const [formData, setFormData] = useState({
        idNumber: '',
        name: '',
        position: '',
        department: '',
        accessLevel: '',
        issueDate: '',
        expiryDate: '',
        photo: null,
    });

    const [photoPreview, setPhotoPreview] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);
    const cardRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
                setFormData((prev) => ({
                    ...prev,
                    photo: file,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDownload = async () => {
        if (!cardRef.current) {
            setError('Card reference not found');
            return;
        }

        setIsDownloading(true);
        setError('');

        try {
            // Clone the card element
            const originalCard = cardRef.current;
            const clonedCard = originalCard.cloneNode(true);

            // Create a container off-screen
            const container = document.createElement('div');
            container.style.position = 'fixed';
            container.style.left = '-9999px';
            container.style.top = '0';
            document.body.appendChild(container);
            container.appendChild(clonedCard);

            // Force RGB colors and remove problematic styles
            const allElements = clonedCard.querySelectorAll('*');
            allElements.forEach(el => {
                const computedStyle = window.getComputedStyle(el);

                // Convert all colors to RGB
                if (computedStyle.backgroundColor && computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)') {
                    el.style.backgroundColor = computedStyle.backgroundColor;
                }
                if (computedStyle.color) {
                    el.style.color = computedStyle.color;
                }
                if (computedStyle.borderColor) {
                    el.style.borderColor = computedStyle.borderColor;
                }
                if (computedStyle.fill) {
                    el.style.fill = computedStyle.fill;
                }
                if (computedStyle.stroke) {
                    el.style.stroke = computedStyle.stroke;
                }

                // Remove backdrop-filter which can cause issues
                el.style.backdropFilter = 'none';
                el.style.webkitBackdropFilter = 'none';
            });

            // Wait for rendering
            await new Promise(resolve => setTimeout(resolve, 500));

            // Import html2canvas
            const html2canvas = (await import('html2canvas-pro')).default;

            // Capture with safe settings
            const canvas = await html2canvas(clonedCard, {
                scale: window.devicePixelRatio > 1 ? 3 : 2,   // রেটিনা/হাই-ডিপি স্ক্রিনে ভালো দেখাবে
                useCORS: true,
                allowTaint: true,
                backgroundColor: null,          // transparent রাখতে চাইলে null
                logging: false,
                windowWidth: clonedCard.scrollWidth,
                windowHeight: clonedCard.scrollHeight,
                removeContainer: true,          // অটো ক্লিনআপ
            });

            // Clean up the temporary container
            document.body.removeChild(container);

            // Convert to blob and download
            canvas.toBlob((blob) => {
                if (!blob) {
                    throw new Error('Failed to create image blob');
                }

                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                const fileName = formData.name
                    ? `ID_Card_${formData.name.replace(/\s+/g, '_')}.png`
                    : `ID_Card_${Date.now()}.png`;

                link.href = url;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();

                setTimeout(() => {
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                }, 100);

                setIsDownloading(false);
            }, 'image/png', 1.0);

        } catch (err) {
            console.error('Download error:', err);
            setError(`Failed: ${err.message}`);
            setIsDownloading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };

    const getExpiryYear = () => {
        if (!formData.expiryDate) return '2026';
        const date = new Date(formData.expiryDate);
        return date.getFullYear();
    };

    const accessLevels = ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5'];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 py-6 px-4 sm:py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <motion.div
                    className="mb-8 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-sm border border-gray-200">
                        <FileCheck className="h-4 w-4 text-indigo-600" />
                        <span className="text-sm font-medium text-gray-700">
                            Professional ID Card Generator
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                        Create Your{' '}
                        <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                            ID Card
                        </span>
                    </h1>
                    <p className="text-base sm:text-lg text-gray-600">
                        Fill in the details below to generate a professional ID card
                    </p>
                </motion.div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {/* Form Section */}
                    <motion.div
                        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <User className="h-6 w-6 text-indigo-600" />
                            ID Card Information
                        </h2>

                        <div className="space-y-5">
                            {/* ID Number */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <Hash className="h-4 w-4 text-gray-500" />
                                    ID Number:
                                </label>
                                <input
                                    type="text"
                                    name="idNumber"
                                    value={formData.idNumber}
                                    onChange={handleInputChange}
                                    placeholder="e.g., WB-CSO-234SI"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                                />
                            </div>

                            {/* Name */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <User className="h-4 w-4 text-gray-500" />
                                    Name:
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="e.g., JHON CHAWLOWS"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                                />
                            </div>

                            {/* Position */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <Briefcase className="h-4 w-4 text-gray-500" />
                                    Position:
                                </label>
                                <input
                                    type="text"
                                    name="position"
                                    value={formData.position}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Customer Service Officer"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                                />
                            </div>

                            {/* Department */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <Building2 className="h-4 w-4 text-gray-500" />
                                    Department:
                                </label>
                                <input
                                    type="text"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Client Services"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                                />
                            </div>

                            {/* Access Level */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <Shield className="h-4 w-4 text-gray-500" />
                                    Access Level:
                                </label>
                                <select
                                    name="accessLevel"
                                    value={formData.accessLevel}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none bg-white"
                                >
                                    <option value="">Select Access Level</option>
                                    {accessLevels.map((level) => (
                                        <option key={level} value={level}>
                                            {level}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Issue Date */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    Issue Date:
                                </label>
                                <input
                                    type="date"
                                    name="issueDate"
                                    value={formData.issueDate}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                                />
                            </div>

                            {/* Expiry Date */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    Expiry Date:
                                </label>
                                <input
                                    type="date"
                                    name="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                                />
                            </div>

                            {/* Photo Upload */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <Camera className="h-4 w-4 text-gray-500" />
                                    Photo (120x 120px):
                                </label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handlePhotoUpload}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 transition-all flex items-center gap-2"
                                    >
                                        <Upload className="h-4 w-4" />
                                        Browse...
                                    </button>
                                    <span className="text-sm text-gray-500 truncate">
                                        {formData.photo ? formData.photo.name : 'No file selected'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ID Card Preview */}
                    <motion.div
                        className="lg:sticky lg:top-8 h-fit"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <FileCheck className="h-6 w-6 text-indigo-600" />
                                Preview
                            </h2>

                            {/* Error Message */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2"
                                >
                                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-red-800">Error</p>
                                        <p className="text-xs text-red-600 mt-1">{error}</p>
                                    </div>
                                </motion.div>
                            )}

                            {/* ID Card - Using inline styles only to avoid Tailwind oklch */}
                            <div className="flex justify-center mb-6">
                                <div
                                    ref={cardRef}
                                    style={{
                                        width: '400px',
                                        height: '300px',
                                        backgroundColor: '#ffffff',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        border: '2px solid #e5e7eb',
                                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                                    }}
                                >
                                    {/* Card Header */}
                                    <div style={{
                                        background: 'linear-gradient(to right, #1e3a8a, #1d4ed8)',
                                        padding: '12px 24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '50%',
                                                border: '2px solid #ffffff',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                            }}>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                                                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                                </svg>
                                            </div>
                                            <span style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '14px' }}>
                                                WORLD BANK
                                            </span>
                                        </div>
                                        <span style={{ color: '#ffffff', fontSize: '12px', fontWeight: '500' }}>
                                            {formData.idNumber || 'WB-CSO-234SI'}
                                        </span>
                                    </div>

                                    {/* Card Body */}
                                    <div style={{ padding: '20px', display: 'flex', gap: '16px' }}>
                                        {/* Photo */}
                                        <div style={{ flexShrink: 0 }}>
                                            <div style={{
                                                width: '96px',
                                                height: '96px',
                                                borderRadius: '50%',
                                                backgroundColor: '#e5e7eb',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                overflow: 'hidden',
                                                border: '2px solid #d1d5db'
                                            }}>
                                                {photoPreview ? (
                                                    <img
                                                        src={photoPreview}
                                                        alt="ID Photo"
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                ) : (
                                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                        <circle cx="12" cy="7" r="4" />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <h3 style={{
                                                fontSize: '18px',
                                                fontWeight: 'bold',
                                                color: '#111827',
                                                marginBottom: '4px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                {formData.name || 'JHON CHAWLOWS'}
                                            </h3>
                                            <p style={{
                                                fontSize: '12px',
                                                color: '#2563eb',
                                                fontWeight: '500',
                                                marginBottom: '12px'
                                            }}>
                                                {formData.position || 'Customer Service Officer'}
                                            </p>

                                            <div style={{
                                                display: 'grid',
                                                gridTemplateColumns: '1fr 1fr',
                                                gap: '8px 12px'
                                            }}>
                                                <div>
                                                    <p style={{
                                                        fontSize: '9px',
                                                        color: '#6b7280',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.05em',
                                                        marginBottom: '2px'
                                                    }}>
                                                        Department
                                                    </p>
                                                    <p style={{
                                                        fontSize: '12px',
                                                        fontWeight: '600',
                                                        color: '#1f2937',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    }}>
                                                        {formData.department || 'Client Services'}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p style={{
                                                        fontSize: '9px',
                                                        color: '#6b7280',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.05em',
                                                        marginBottom: '2px'
                                                    }}>
                                                        Access Level
                                                    </p>
                                                    <p style={{
                                                        fontSize: '12px',
                                                        fontWeight: '600',
                                                        color: '#1f2937'
                                                    }}>
                                                        {formData.accessLevel || 'Level 2'}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p style={{
                                                        fontSize: '9px',
                                                        color: '#6b7280',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.05em',
                                                        marginBottom: '2px'
                                                    }}>
                                                        Issue Date
                                                    </p>
                                                    <p style={{
                                                        fontSize: '12px',
                                                        fontWeight: '600',
                                                        color: '#1f2937'
                                                    }}>
                                                        {formatDate(formData.issueDate) || '01/15/2024'}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p style={{
                                                        fontSize: '9px',
                                                        color: '#6b7280',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.05em',
                                                        marginBottom: '2px'
                                                    }}>
                                                        Expiry Date
                                                    </p>
                                                    <p style={{
                                                        fontSize: '12px',
                                                        fontWeight: '600',
                                                        color: '#1f2937'
                                                    }}>
                                                        {formatDate(formData.expiryDate) || '01/14/2026'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Footer */}
                                    <div style={{
                                        padding: '0 20px 16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                backgroundColor: '#f3f4f6',
                                                borderRadius: '4px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <div style={{
                                                    display: 'grid',
                                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                                    gap: '2px'
                                                }}>
                                                    {[...Array(9)].map((_, i) => (
                                                        <div
                                                            key={i}
                                                            style={{
                                                                width: '4px',
                                                                height: '4px',
                                                                backgroundColor: '#1f2937',
                                                                borderRadius: '1px'
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <p style={{
                                                    fontSize: '9px',
                                                    color: '#6b7280',
                                                    marginBottom: '4px'
                                                }}>
                                                    Authorized Signature
                                                </p>
                                                <div style={{ height: '32px', display: 'flex', alignItems: 'center' }}>
                                                    <svg width="80" height="30" viewBox="0 0 80 30">
                                                        <path
                                                            d="M5,20 Q10,10 15,15 T25,20 Q30,15 35,18 T45,22"
                                                            stroke="#1f2937"
                                                            strokeWidth="1.5"
                                                            fill="none"
                                                            strokeLinecap="round"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-end',
                                            gap: '8px'
                                        }}>
                                            <p style={{
                                                fontSize: '9px',
                                                color: '#2563eb',
                                                fontWeight: '500'
                                            }}>
                                                VALID THRU {getExpiryYear()}
                                            </p>
                                            <div style={{
                                                width: '48px',
                                                height: '32px',
                                                backgroundColor: '#bfdbfe',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <span style={{
                                                    fontSize: '12px',
                                                    fontWeight: 'bold',
                                                    color: '#1e3a8a'
                                                }}>
                                                    WBG
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Download Button */}
                            <motion.button
                                onClick={handleDownload}
                                disabled={isDownloading}
                                className={`w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 ${isDownloading ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                                whileHover={!isDownloading ? { scale: 1.02 } : {}}
                                whileTap={!isDownloading ? { scale: 0.98 } : {}}
                            >
                                {isDownloading ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Download className="h-5 w-5" />
                                        Download ID Card
                                    </>
                                )}
                            </motion.button>

                            {/* Info */}
                            <div className="mt-4 text-center text-xs text-gray-500">
                                <p>Click the button above to download your ID card as PNG</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ID_CardDesign;