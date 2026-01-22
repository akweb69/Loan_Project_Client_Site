import React, { useState } from 'react';
import { Images, Lightbulb, User, UserCircle, Users, X } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function GetUserDetailsInfo() {
    const base_url = import.meta.env.VITE_BASE_URL;
    const imgbb_key = import.meta.env.VITE_IMGBB_API_KEY;

    const [selectedStep, setSelectedStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        nid: '',
        profession: '',
        loanReason: '',
        currentAddress: '',
        permanentAddress: '',
        nomineeName: '',
        nomineePhone: '',
        nomineeRelation: '',
        idCardFront: null,
        idCardBack: null,
        photoImage: null,
        signatureImage: null,
    });

    const [previews, setPreviews] = useState({
        idCardFront: null,
        idCardBack: null,
        photoImage: null,
        signatureImage: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('শুধুমাত্র ছবি ফাইল আপলোড করুন');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('ফাইলের আকার ৫ MB এর কম হতে হবে');
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviews((prev) => ({
                ...prev,
                [fieldName]: reader.result,
            }));
        };
        reader.readAsDataURL(file);

        setFormData((prev) => ({
            ...prev,
            [fieldName]: file,
        }));
    };

    const removeImage = (fieldName) => {
        setFormData((prev) => ({ ...prev, [fieldName]: null }));
        setPreviews((prev) => ({ ...prev, [fieldName]: null }));
    };

    const uploadToImgBB = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post(
                `https://api.imgbb.com/1/upload?key=${imgbb_key}`,
                formData
            );
            return response.data.data.url;
        } catch (error) {
            console.error('ImgBB upload error:', error);
            throw new Error('ছবি আপলোড ব্যর্থ হয়েছে');
        }
    };

    const validateStep1 = () => {
        if (!formData.name.trim()) {
            toast.error('আপনার নাম প্রয়োজন');
            return false;
        }
        if (!formData.phone || !/^(01[3-9]\d{8})$/.test(formData.phone)) {
            toast.error('সঠিক ১১ সংখ্যার ফোন নম্বর দিন (01XXXXXXXXX)');
            return false;
        }
        if (!formData.nid.trim()) {
            toast.error('জাতীয় পরিচয়পত্র নম্বর প্রয়োজন');
            return false;
        }
        if (!formData.profession) {
            toast.error('পেশা নির্বাচন করুন');
            return false;
        }
        if (!formData.loanReason.trim()) {
            toast.error('ঋণের কারণ লিখুন');
            return false;
        }
        if (!formData.currentAddress.trim()) {
            toast.error('বর্তমান ঠিকানা প্রয়োজন');
            return false;
        }
        if (!formData.permanentAddress.trim()) {
            toast.error('স্থায়ী ঠিকানা প্রয়োজন');
            return false;
        }
        if (!formData.nomineeName.trim()) {
            toast.error('নমিনীর নাম প্রয়োজন');
            return false;
        }
        if (!formData.nomineePhone || !/^(01[3-9]\d{8})$/.test(formData.nomineePhone)) {
            toast.error('নমিনীর সঠিক ফোন নম্বর দিন');
            return false;
        }
        if (!formData.nomineeRelation.trim()) {
            toast.error('নমিনীর সাথে সম্পর্ক লিখুন');
            return false;
        }
        return true;
    };

    const validateStep2 = () => {
        if (!formData.idCardFront) {
            toast.error('আইডি কার্ডের সামনের ছবি আপলোড করুন');
            return false;
        }
        if (!formData.idCardBack) {
            toast.error('আইডি কার্ডের পেছনের ছবি আপলোড করুন');
            return false;
        }
        return true;
    };

    const validateStep3 = () => {
        if (!formData.photoImage) {
            toast.error('আপনার ছবি (আইডি কার্ডসহ) আপলোড করুন');
            return false;
        }
        if (!formData.signatureImage) {
            toast.error('স্বাক্ষরের ছবি আপলোড করুন');
            return false;
        }
        return true;
    };

    const handleNextStep = () => {
        if (selectedStep === 1 && validateStep1()) {
            setSelectedStep(2);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (selectedStep === 2 && validateStep2()) {
            setSelectedStep(3);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePreviousStep = () => {
        if (selectedStep > 1) {
            setSelectedStep(selectedStep - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    const navigate = useNavigate()

    const handleUpload = async () => {
        if (!validateStep3()) return;

        setIsSubmitting(true);
        const loadingToast = toast.loading('তথ্য জমা দেওয়া হচ্ছে...');

        try {
            const [idCardFrontUrl, idCardBackUrl, photoUrl, signatureUrl] = await Promise.all([
                uploadToImgBB(formData.idCardFront),
                uploadToImgBB(formData.idCardBack),
                uploadToImgBB(formData.photoImage),
                uploadToImgBB(formData.signatureImage),
            ]);

            const finalData = {
                name: formData.name.trim(),
                phone: formData.phone.trim(),
                nid: formData.nid.trim(),
                profession: formData.profession,
                loanReason: formData.loanReason.trim(),
                currentAddress: formData.currentAddress.trim(),
                permanentAddress: formData.permanentAddress.trim(),
                nomineeName: formData.nomineeName.trim(),
                nomineePhone: formData.nomineePhone.trim(),
                nomineeRelation: formData.nomineeRelation.trim(),
                idCardFront: idCardFrontUrl,
                idCardBack: idCardBackUrl,
                photo: photoUrl,
                signature: signatureUrl,
            };

            const response = await axios.post(`${base_url}/loanDetails`, finalData);

            toast.success('সফলভাবে জমা দেওয়া হয়েছে!', { id: loadingToast });
            console.log('Server response:', response.data);

            // Reset form
            setFormData({
                name: '',
                phone: '',
                nid: '',
                profession: '',
                loanReason: '',
                currentAddress: '',
                permanentAddress: '',
                nomineeName: '',
                nomineePhone: '',
                nomineeRelation: '',
                idCardFront: null,
                idCardBack: null,
                photoImage: null,
                signatureImage: null,
            });

            setPreviews({
                idCardFront: null,
                idCardBack: null,
                photoImage: null,
                signatureImage: null,
            });

            // setSelectedStep(1);
            navigate('/selectLoan');

        } catch (error) {
            console.error('Submission error:', error);
            toast.error('জমা দিতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।', { id: loadingToast });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-emerald-50">
            <Toaster position="top-center" />

            <div className="w-11/12 py-10 md:py-16 mx-auto flex justify-center items-center flex-col">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-center items-center flex-col"
                >
                    <UserCircle size={70} className="text-blue-500" />
                    <h1 className="text-2xl font-bold text-blue-900 md:text-3xl py-1">
                        ব্যক্তিগত তথ্য
                    </h1>
                    <p className="text-center text-sm text-gray-700">
                        আপনার ব্যক্তিগত তথ্য এবং কাগজপত্র আপডেট করুন
                    </p>

                    {/* Steps Indicator */}
                    <div className="flex items-center gap-2 md:gap-4 py-6">
                        {[1, 2, 3].map((step, index) => (
                            <React.Fragment key={step}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="flex flex-col justify-center items-center gap-2"
                                >
                                    <div
                                        className={`h-12 w-12 md:h-16 md:w-16 flex justify-center items-center rounded-full transition-all duration-300 ${selectedStep === step ? 'bg-blue-500 shadow-lg' : 'bg-white'
                                            }`}
                                    >
                                        {step === 1 && <User size={24} className={selectedStep === step ? 'text-white' : 'text-blue-500'} />}
                                        {step === 2 && <Images size={24} className={selectedStep === step ? 'text-white' : 'text-blue-500'} />}
                                        {step === 3 && <User size={24} className={selectedStep === step ? 'text-white' : 'text-blue-500'} />}
                                    </div>
                                    <p className="text-xs text-center max-w-[80px]">
                                        {step === 1 && 'ব্যক্তিগত তথ্য'}
                                        {step === 2 && 'আইডি কার্ড'}
                                        {step === 3 && 'ছবি ও স্বাক্ষর'}
                                    </p>
                                </motion.div>
                                {index < 2 && <div className="w-8 md:w-12 h-0.5 bg-gray-300" />}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* ────────────────────────────────────────────── */}
                    {/* STEP 1 ──────────────────────────────────────── */}
                    {/* ────────────────────────────────────────────── */}
                    {selectedStep === 1 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="max-w-xl md:min-w-[600px] w-full p-4 rounded-xl bg-white shadow-lg"
                        >
                            {/* Instructions */}
                            <div className="p-4 rounded-lg bg-orange-100 space-y-3 border border-orange-200 mb-5">
                                <h1 className="flex items-center gap-2 text-sm font-medium text-blue-600">
                                    <Lightbulb size={18} className="text-orange-500" />
                                    কিভাবে পূরণ করবেন
                                </h1>
                                {[
                                    'সব লাল তারকা (*) চিহ্নিত ঘর পূরণ করুন',
                                    'স্পষ্ট ছবি আপলোড করুন (JPG, PNG)',
                                    'স্বাক্ষর স্ক্যান বা ছবি আপলোড করুন',
                                    'সব তথ্য যাচাই করে সংরক্ষণ বাটনে ক্লিক করুন',
                                ].map((text, i) => (
                                    <div key={i} className="bg-white p-2 rounded-md border border-orange-200 flex items-center gap-3">
                                        <span className="text-xs text-white bg-green-500 w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0">
                                            {i + 1}
                                        </span>
                                        <p className="text-sm text-gray-700">{text}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Personal Info */}
                            <div className="bg-white rounded-xl border border-blue-100 p-4 md:p-6 space-y-6 mb-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                        <User className="text-blue-600" size={20} />
                                    </div>
                                    <div>
                                        <h2 className="text-base font-semibold text-blue-700">১. আপনার তথ্য</h2>
                                        <p className="text-xs text-gray-500">আপনার ব্যক্তিগত তথ্য দিন</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">
                                            নাম <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="আপনার পূর্ণ নাম"
                                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700">
                                            ফোন <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="017XXXXXXXX"
                                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700">
                                            জাতীয় পরিচয়পত্র নম্বর <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="nid"
                                            value={formData.nid}
                                            onChange={handleInputChange}
                                            placeholder="17/18/19/20 digit NID number"
                                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700">
                                            পেশা <span className="text-rose-500">*</span>
                                        </label>
                                        <select
                                            name="profession"
                                            value={formData.profession}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                        >
                                            <option value="">নির্বাচন করুন</option>
                                            <option value="Student">ছাত্র/ছাত্রী</option>
                                            <option value="Worker">শ্রমিক</option>
                                            <option value="Business">ব্যবসায়ী</option>
                                            <option value="Service">চাকরিজীবী</option>
                                            <option value="Housewife">গৃহিণী</option>
                                            <option value="Other">অন্যান্য</option>
                                        </select>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            ঋণের কারণ <span className="text-rose-500">*</span>
                                        </label>
                                        <textarea
                                            name="loanReason"
                                            value={formData.loanReason}
                                            onChange={handleInputChange}
                                            rows={3}
                                            placeholder="ঋণ নেওয়ার উদ্দেশ্য লিখুন..."
                                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            বর্তমান ঠিকানা <span className="text-rose-500">*</span>
                                        </label>
                                        <textarea
                                            name="currentAddress"
                                            value={formData.currentAddress}
                                            onChange={handleInputChange}
                                            rows={3}
                                            placeholder="বর্তমান ঠিকানা লিখুন"
                                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            স্থায়ী ঠিকানা <span className="text-rose-500">*</span>
                                        </label>
                                        <textarea
                                            name="permanentAddress"
                                            value={formData.permanentAddress}
                                            onChange={handleInputChange}
                                            rows={3}
                                            placeholder="স্থায়ী ঠিকানা লিখুন"
                                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Nominee Info */}
                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-l-4 border-yellow-400 mb-5">
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 md:p-6 border-b border-gray-100">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-blue-500 rounded-xl p-3 shadow-md">
                                            <Users className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-1">২. নমিনীর তথ্য</h2>
                                            <p className="text-gray-600 text-xs md:text-sm">মিথ্যা অথবা অসম্পূর্ণ তথ্যের জন্য দায়ী হবেন</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 md:p-6 space-y-6">
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">
                                            নমিনীর নাম <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="nomineeName"
                                            value={formData.nomineeName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                                            placeholder="নমিনীর পূর্ণ নাম"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">
                                            নমিনীর ফোন <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="nomineePhone"
                                            value={formData.nomineePhone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                                            placeholder="01XXXXXXXXX"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">
                                            সম্পর্ক <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="nomineeRelation"
                                            value={formData.nomineeRelation}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                                            placeholder="পিতা / মাতা / স্ত্রী / স্বামী / সন্তান / ভাই ..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    onClick={handleNextStep}
                                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg"
                                >
                                    পরবর্তী ধাপ
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {/* ────────────────────────────────────────────── */}
                    {/* STEP 2 ──────────────────────────────────────── */}
                    {/* ────────────────────────────────────────────── */}
                    {selectedStep === 2 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="max-w-xl md:min-w-[600px] w-full p-4 md:p-6 rounded-xl bg-white shadow-lg"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <Images className="text-blue-600" size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">৩. পরিচয়পত্রের ছবি</h2>
                                    <p className="text-sm text-gray-600">আইডি কার্ডের সামনে ও পেছনের স্পষ্ট ছবি আপলোড করুন</p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {/* Front */}
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-3">
                                        জাতীয় পরিচয়পত্র - সামনের দিক <span className="text-red-500">*</span>
                                    </label>

                                    {previews.idCardFront ? (
                                        <div className="relative">
                                            <img
                                                src={previews.idCardFront}
                                                alt="NID Front"
                                                className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
                                            />
                                            <button
                                                onClick={() => removeImage('idCardFront')}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <Images className="w-12 h-12 text-gray-400 mb-3" />
                                                <p className="mb-2 text-sm text-gray-500">
                                                    <span className="font-semibold">ক্লিক করুন</span> বা টেনে আনুন
                                                </p>
                                                <p className="text-xs text-gray-500">PNG, JPG (MAX. 5MB)</p>
                                            </div>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) => handleFileChange(e, 'idCardFront')}
                                            />
                                        </label>
                                    )}
                                </div>

                                {/* Back */}
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-3">
                                        জাতীয় পরিচয়পত্র - পেছনের দিক <span className="text-red-500">*</span>
                                    </label>

                                    {previews.idCardBack ? (
                                        <div className="relative">
                                            <img
                                                src={previews.idCardBack}
                                                alt="NID Back"
                                                className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
                                            />
                                            <button
                                                onClick={() => removeImage('idCardBack')}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <Images className="w-12 h-12 text-gray-400 mb-3" />
                                                <p className="mb-2 text-sm text-gray-500">
                                                    <span className="font-semibold">ক্লিক করুন</span> বা টেনে আনুন
                                                </p>
                                                <p className="text-xs text-gray-500">PNG, JPG (MAX. 5MB)</p>
                                            </div>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) => handleFileChange(e, 'idCardBack')}
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-3 mt-8">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    onClick={handlePreviousStep}
                                    className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-all"
                                >
                                    পূর্ববর্তী
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    onClick={handleNextStep}
                                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md"
                                >
                                    পরবর্তী ধাপ
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {/* ────────────────────────────────────────────── */}
                    {/* STEP 3 ──────────────────────────────────────── */}
                    {/* ────────────────────────────────────────────── */}
                    {selectedStep === 3 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="max-w-xl md:min-w-[600px] w-full p-4 md:p-6 rounded-xl bg-white shadow-lg"
                        >
                            <div className="space-y-8">
                                {/* Selfie with NID */}
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-3">
                                        আইডি কার্ড হাতে নিয়ে মুখের ছবি <span className="text-red-500">*</span>
                                    </label>

                                    {previews.photoImage ? (
                                        <div className="relative">
                                            <img
                                                src={previews.photoImage}
                                                alt="Selfie with NID"
                                                className="w-full h-64 object-cover rounded-lg border-2 border-gray-300"
                                            />
                                            <button
                                                onClick={() => removeImage('photoImage')}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors bg-blue-50/30">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <User className="w-16 h-16 text-blue-400 mb-3" />
                                                <p className="mb-2 text-sm text-gray-600 text-center px-4">
                                                    আইডি কার্ড হাতে ধরে স্পষ্ট ছবি তুলুন
                                                </p>
                                                <p className="text-xs text-gray-500">PNG, JPG (MAX. 5MB)</p>
                                            </div>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) => handleFileChange(e, 'photoImage')}
                                            />
                                        </label>
                                    )}
                                </div>

                                {/* Signature */}
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                            />
                                        </svg>
                                        স্বাক্ষর <span className="text-red-500">*</span>
                                    </label>

                                    <p className="text-sm text-gray-600 mb-4">সাদা কাগজে স্বাক্ষর করে ছবি তুলে আপলোড করুন</p>

                                    {previews.signatureImage ? (
                                        <div className="relative">
                                            <img
                                                src={previews.signatureImage}
                                                alt="Signature"
                                                className="w-full h-40 object-contain bg-white rounded-lg border-2 border-gray-300"
                                            />
                                            <button
                                                onClick={() => removeImage('signatureImage')}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 shadow-lg"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-white transition-colors bg-white">
                                            <div className="flex flex-col items-center justify-center">
                                                <svg className="w-12 h-12 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                    />
                                                </svg>
                                                <p className="text-sm text-gray-500">ছবি আপলোড করুন</p>
                                            </div>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) => handleFileChange(e, 'signatureImage')}
                                            />
                                        </label>
                                    )}

                                    <div className="mt-4 flex items-start gap-2 text-xs text-gray-500">
                                        <svg className="w-4 h-4 text-blue-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <p>
                                            সাদা কাগজে কালি দিয়ে স্বাক্ষর করুন এবং ছবি তুলুন।
                                            <span className="text-rose-500 font-medium"> (আপনার স্বাক্ষর আবশ্যক)</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 text-center">
                                <p className="text-sm text-gray-700">সব তথ্য ঠিক আছে নিশ্চিত হয়ে সাবমিট করুন</p>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    onClick={handlePreviousStep}
                                    disabled={isSubmitting}
                                    className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-all disabled:opacity-50"
                                >
                                    পূর্ববর্তী
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    onClick={handleUpload}
                                    disabled={isSubmitting}
                                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-md disabled:opacity-50"
                                >
                                    {isSubmitting ? 'জমা দেওয়া হচ্ছে...' : 'জমা দিন'}
                                </motion.button>
                            </div>

                            <div className="mt-4 text-center">
                                <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    আপনার তথ্য সুরক্ষিত রয়েছে
                                </p>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

