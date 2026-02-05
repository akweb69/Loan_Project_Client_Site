// LoanApprovalStamp.jsx
import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas-pro';

const LoanApprovalStamp = () => {
    const certificateRef = useRef(null);

    const [form, setForm] = useState({
        name: 'মোঃ আব্দুল করিম',
        nid: '১২৩৪৫৬৭৮৯০১২',
        applicationDate: '২৮/০১/২০২৬',
        loanAmount: '৫০,০০০ টাকা',
        durationMonths: '১২',
        monthlyInstallment: '৪,৫০০ টাকা',
        fatherName: 'মোঃ আব্দুল হামিদ',
        address: 'পাহাড়পুর, রাজশাহী',
    });

    const [photoPreview, setPhotoPreview] = useState(null);
    const [signaturePreview, setSignaturePreview] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            if (type === 'photo') setPhotoPreview(reader.result);
            if (type === 'signature') setSignaturePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const downloadAsPNG = async () => {
        if (!certificateRef.current) return;

        setIsDownloading(true);
        setError('');

        try {
            const canvas = await html2canvas(certificateRef.current, {
                scale: 3,
                useCORS: true,
                allowTaint: true,
                backgroundColor: null,
                logging: false,
            });

            const link = document.createElement('a');
            link.download = `loan_approved_stamp_${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (err) {
            console.error(err);
            setError('ডাউনলোডে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="min-h-screen  py-8 ">
            <div className="w-full grid lg:grid-cols-4 gap-8">
                {/* Form Panel */}
                <div className="bg-white p-2 col-span-1 rounded-xl shadow-lg border border-gray-200">
                    <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
                        ঋণ অনুমোদন স্ট্যাম্প এডিট করুন
                    </h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4 text-sm">
                        {/* Photo Upload */}
                        <div>
                            <label className="block font-medium text-gray-700 mb-1">ছবি (Photo)</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'photo')}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                            />
                        </div>

                        {/* Signature Upload */}
                        <div>
                            <label className="block font-medium text-gray-700 mb-1">ঋণগ্রহীতার স্বাক্ষর (Borrower Signature)</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'signature')}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                            />
                        </div>

                        {[
                            { key: 'name', label: 'ঋণগ্রহীতার নাম' },
                            { key: 'nid', label: 'এনআইডি নম্বর' },
                            { key: 'applicationDate', label: 'আবেদনের তারিখ' },
                            { key: 'loanAmount', label: 'ঋণের পরিমাণ' },
                            { key: 'durationMonths', label: 'মেয়াদ (মাস)' },
                            { key: 'monthlyInstallment', label: 'মাসিক কিস্তি' },
                            { key: 'fatherName', label: 'পিতার নাম' },
                            { key: 'address', label: 'ঠিকানা', isTextArea: true },
                        ].map((field) => (
                            <div key={field.key}>
                                <label className="block font-medium text-gray-700 mb-1">{field.label}</label>
                                {field.isTextArea ? (
                                    <textarea
                                        name={field.key}
                                        value={form[field.key]}
                                        onChange={handleChange}
                                        rows={2}
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                                    />
                                ) : (
                                    <input
                                        name={field.key}
                                        value={form[field.key]}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                                    />
                                )}
                            </div>
                        ))}

                        <button
                            onClick={downloadAsPNG}
                            disabled={isDownloading}
                            className={`mt-6 w-full py-3 px-4 rounded-lg font-bold text-white flex items-center justify-center gap-2 transition-all
                ${isDownloading ? 'bg-green-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 shadow-md'}`}
                        >
                            {isDownloading ? (
                                <>
                                    <div className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full" />
                                    তৈরি হচ্ছে...
                                </>
                            ) : (
                                'PNG হিসেবে ডাউনলোড করুন'
                            )}
                        </button>
                    </div>
                </div>

                {/* Preview Panel */}
                <div className="flex flex-col items-center col-span-3">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">প্রিভিউ (Letter Size)</h2>

                    <div
                        ref={certificateRef}
                        className="relative   overflow-hidden "
                        style={{
                            width: '816px',    // ~Letter/A4 width at 96dpi
                            height: '1056px',  // ~Letter/A4 height
                            fontFamily: "'Noto Serif Bengali', 'Hind Siliguri', serif",
                            color: '#fff',
                            padding: '40px 50px',
                            boxSizing: 'border-box',
                            backgroundImage: 'url(https://i.ibb.co/nMWX77Tz/1.webp)',
                            // your stamp bg
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <h1 className="mt-[245px] text-2xl text-center underline font-bold text-gray-950">
                            ঋণের চুক্তিপত্র
                        </h1>


                        {/* Details */}
                        <div className=" text-black text-lg ">
                            {[
                                { label: 'ঋণগ্রহীতার নাম :', value: form.name },
                                { label: 'এনআইডি নম্বর :', value: form.nid },
                                { label: 'আবেদনের তারিখ :', value: form.applicationDate },
                                { label: 'ঋণের পরিমাণ :', value: form.loanAmount },
                                { label: 'মেয়াদ (মাস) :', value: form.durationMonths },
                                { label: 'মাসিক কিস্তি :', value: form.monthlyInstallment },
                                { label: 'পিতার নাম :', value: form.fatherName },
                                { label: 'ঠিকানা :', value: form.address },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-6 ">
                                    <span className="font-bold min-w-[180px]">{item.label}</span>
                                    <span className="flex-1 ">{item.value || '.......................'}</span>
                                </div>
                            ))}
                        </div>

                        <div className="text-gray-950">
                            <h1 className="text-xl font-bold underline text-center my-1">গুরুত্বপূর্ণ তথ্য ও শর্তাবলী
                            </h1>
                            <p className="">
                                আমি {form.name}, পিতা - {form.fatherName}, সাং - {form.address} । আমাকে <strong>বিশ্ব ব্যাংক ঋণ বাংলাদেশ</strong> {form.loanAmount} টাকা, {form.durationMonths} মাস মেয়াদি, প্রতিমাসে {form.monthlyInstallment} টাকা কিস্তির ঋণ প্রস্তাব করিলে, আমি সকল প্রক্রিয়া সম্পূর্ণ করে ও <strong>বিশ্ব ব্যাংক ঋণ বাংলাদেশ</strong> এর সকল শর্ত মেনে ঋণটি নিতে রাজি হয়েছি।

                            </p>
                            <p className="py-2">
                                আপনাকে প্রতিমাসে ১ থেকে ১০ তারিখের মধ্যে অনলাইনের মাধ্যমে কিস্তি প্রদান করতে হবে, কোনো মাসে দিতে সমস্যা হলে অবশ্যই আগে জানাতে হবে। ব্যাংক কর্তৃপক্ষ যেসব প্রক্রিয়ার কথা বলেছেন ওই সব প্রক্রিয়া অবশ্যই সম্পূর্ণ করতে হবে।
                            </p>
                            <p className="">
                                আমি ব্যাংক কর্তৃপক্ষ সাক্ষ দিচ্ছি যে {form.name} এর দেওয়া তথ্যের উপর ভিত্তি করে ও তার আর্থিক অবস্থা এবং ঋনের যোগ্যতা যাচাই করে, আমার আত্মবিশ্বাস যে তিনি আমাদের দেওয়া সকল শর্ত ও নিয়মাবলী পূরণ করতে পারবে।
                            </p>
                        </div>
                        <div className="flex mt-10 justify-between items-center gap-6 px-10 text-gray-950">
                            <div className="flex justify-center items-center flex-col">
                                <img src="https://i.ibb.co/LdpjxqJs/image-removebg-preview-2.png" alt="" />
                                <h1 className="pt-2">ব্যাংক কর্তৃপক্ষের স্বাক্ষর</h1>
                            </div>


                            <div className="pt-2 flex justify-center items-center flex-col gap-2">
                                {signaturePreview && (
                                    <div className=" max-w-[130px] h-16 bg-white/20 rounded-lg overflow-hidden border border-white/60 shadow-lg">
                                        <img src={signaturePreview} alt="স্বাক্ষর" className="w-full h-full object-contain" />
                                    </div>
                                )}

                                <h1 className="pt-2 border-t border-gray-950">ঋণ গ্রহীতার স্বাক্ষর</h1>
                            </div>
                        </div>

                        <div className="px-6 text-center text-black mt-6 text-lg">
                            বিঃদ্রঃ ঋণের শর্তাবলী পালন না করলে ব্যাংক কর্তৃপক্ষ আইনানুগ ব্যবস্থা নিতে বাধ্য থাকিবে।
                        </div>

                        {/* Big RED Stamp */}

                        {/* Photo (top-right) */}
                        {photoPreview && (
                            <div className="absolute top-[340px] right-16 w-28 h-36  overflow-hidden ">
                                <img src={photoPreview} alt="ছবি" className="w-full h-full object-cover" />
                            </div>
                        )}



                        {/* Bottom text */}
                        {/* <div className="absolute bottom-8 left-0 right-0 text-center text-sm text-yellow-200 px-12">
                            <p className="font-semibold">ব্যাংক কর্তৃপক্ষের স্বাক্ষর</p>
                            <p className="mt-2 italic text-white/90">"দেশপ্রেমের শপথ নিন, দুর্নীতিকে বিদায় দিন"</p>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanApprovalStamp;