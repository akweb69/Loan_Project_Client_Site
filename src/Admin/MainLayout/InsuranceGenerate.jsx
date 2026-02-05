import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas-pro';

const InsuranceGenerate = () => {
    const certificateRef = useRef(null);
    const fileInputRef = useRef(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        certificateNo: 'BDIC-2026-621595',
        insuredName: 'মোঃ আব্দুল করিম',
        nomineeName: 'মোঃ রহিম উদ্দিন',
        address: '১২৩/এ, গ্রীন রোড, ঢাকা-১২৫৫',
        nid: '১২৩৪৫৬৭৮৯০১২',
        policyNo: 'LI-2026-871504',
        insuranceType: 'জীবন বীমা',
        sumAssured: '৫,০০,০০০/- (পাঁচ লক্ষ টাকা মাত্র)',
        duration: '০৫/০৫/২০২৮ থেকে ০৫/০৫/২০৩৮',
        company: 'জীবন বীমা কর্পোরেশন',
        date: '28/01/2026',
        signatureName: 'মাহমুদ আলী',
    });

    const handleInputChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPhotoPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const downloadAsPNG = async () => {
        if (!certificateRef.current) {
            setError('সার্টিফিকেট লোড হয়নি');
            return;
        }

        setIsDownloading(true);
        setError('');

        try {
            const element = certificateRef.current;

            const canvas = await html2canvas(element, {
                scale: 3,                      // High resolution for print
                useCORS: true,
                allowTaint: true,
                backgroundColor: null,
                logging: false,
                width: element.offsetWidth,
                height: element.offsetHeight,
                windowWidth: element.scrollWidth,
                windowHeight: element.scrollHeight,
            });

            canvas.toBlob((blob) => {
                if (!blob) throw new Error('Blob তৈরি হয়নি');

                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `Bima_Sattifiket_${formData.certificateNo || 'BDIC'}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);

                setIsDownloading(false);
            }, 'image/png', 1.0);
        } catch (err) {
            console.error('ডাউনলোড ত্রুটি:', err);
            setError('ডাউনলোডে সমস্যা: ' + err.message);
            setIsDownloading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 ">
            <div className="w-full grid lg:grid-cols-4 gap-10">
                {/* A4 Size Certificate Preview */}
                <div className="flex justify-center w-full col-span-3 h-fit lg:justify-end">
                    <div
                        ref={certificateRef}
                        className="bg-white   w-full h-fit"
                        style={{
                            width: '794px',              // A4 width @ 96 DPI
                            minHeight: '1123px',         // A4 height @ 96 DPI
                            border: '2px solid #006400',
                            borderRadius: '8px',
                            position: 'relative',
                            fontFamily: "'Noto Serif Bengali', 'Times New Roman', serif",
                            color: '#000',
                            lineHeight: '1.5',
                            boxSizing: 'border-box',
                            padding: '40px 50px',
                            backgroundColor: '#fff',
                        }}
                    >
                        {/* Inner green border for decoration */}
                        <div
                            style={{
                                position: 'absolute',
                                inset: '10px',
                                border: '2px solid #228B22',
                                pointerEvents: 'none',
                                borderRadius: '4px',
                            }}
                        />

                        {/* Top Logos - Left red, Center green leaf style, Right World Bank */}
                        <div className="flex justify-between items-start mb-8">
                            <div className="w-24 h-24 rounded-full bg-red-600 border-4 border-white flex items-center justify-center text-white font-bold text-xs text-center shadow-md">
                                বাংলাদেশ<br />ব্যাংক<br />কর্তৃপক্ষ

                            </div>

                            <div className="w-28 h-28 rounded-full bg-rose-500 border-4 border-white flex items-center justify-center shadow-lg">
                                <div className="text-white text-5xl font-bold">
                                    <div className=" bg-green-500 h-20 w-20 rounded-full">
                                        <div className="bg-rose-500 w-3  h-10 rounded-full mx-auto"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-24 h-24 rounded-full bg-green-800 border-4 border-white flex items-center justify-center text-white font-bold text-[9px] text-center shadow-md">
                                World Bank<br />বীমা নিয়ন্ত্রণ<br />কর্তৃপক্ষ
                            </div>
                        </div>

                        {/* Main Title */}
                        <div className="text-center mb-10">
                            <h1 className="text-4xl font-bold text-[#006400]">
                                গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
                            </h1>
                            <h2 className="text-3xl font-semibold text-[#006400] mt-2">
                                বীমা নিয়ন্ত্রণ কর্তৃপক্ষ
                            </h2>
                            <h3 className="text-2xl font-bold text-[#006400] mt-3">
                                অর্থ মন্ত্রণালয়
                            </h3>

                            <div className="flex items-center justify-center my-8 gap-6">
                                <div className="text-red-700 text-4xl">★</div>
                                <h2 className="text-5xl font-extrabold text-[#006400]">
                                    বীমা সার্টিফিকেট
                                </h2>
                                <div className="text-red-700 text-4xl">★</div>
                            </div>

                            <p className="text-2xl font-semibold text-[#006400]">
                                BDIC-{formData.certificateNo}
                            </p>
                        </div>

                        {/* Declaration & Fields */}
                        <div className="space-y-6 text-lg">
                            <p className="text-center font-semibold mb-6">
                                এতদ্বারা প্রত্যয়ন করা যাচ্ছে যে,
                            </p>

                            <div className="space-y-5">
                                {[
                                    { label: 'বীমাগ্রহীতার নামঃ', value: formData.insuredName },
                                    { label: 'নমিনির নামঃ', value: formData.nomineeName },
                                    { label: 'ঠিকানাঃ', value: formData.address },
                                    { label: 'জাতীয় পরিচয়পত্র নংঃ', value: formData.nid },
                                    { label: 'বীমা পলিসি নংঃ', value: formData.policyNo },
                                    { label: 'বীমার ধরনঃ', value: formData.insuranceType },
                                    { label: 'বীমার পরিমাণঃ', value: formData.sumAssured },
                                    { label: 'মেয়াদকালঃ', value: formData.duration },
                                    { label: 'বীমা কোম্পানিঃ', value: formData.company },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-baseline border-b border-dashed border-gray-700 pb-2">
                                        <span className="font-bold w-64 inline-block">{item.label}</span>
                                        <span className="flex-1">{item.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Long Declaration */}
                            <div className="mt-10 text-justify text-base leading-relaxed">
                                উপরোক্ত বীমাগ্রহীতা বাংলাদেশ বীমা নিয়ন্ত্রণ কর্তৃপক্ষের অনুমোদিত নিয়ম অনুযায়ী বীমা পলিসি গ্রহণ করেছেন। এই সার্টিফিকেটটি বীমা চুক্তির অধীনে প্রদত্ত সুবিধাদি প্রাপ্তির অধিকার নিশ্চিত করে।
                                <br /><br />
                                এই সার্টিফিকেট সরকারি নিয়ম অনুযায়ী জারি করা হয়েছে এবং বীমা নিয়ন্ত্রণ কর্তৃপক্ষের অনুমোদনক্রমে প্রদান করা হলো।
                            </div>

                            {/* Signature */}
                            <div className="mt-16 flex justify-between items-end px-8">
                                <div className="text-center">
                                    <p className="mt-3 font-bold text-xl signFont">{formData.signatureName}</p>
                                    <div className="border-t-2 border-black w-80"></div>

                                    <p className="text-lg">অনুমোদনকারী কর্মকর্তা</p>
                                </div>

                                <div className="text-center">
                                    <p className="font-bold text-2xl">{formData.date}</p>
                                    <p className="text-lg">তারিখ</p>
                                </div>
                            </div>

                            {/* Bottom QR simulation & dots */}
                            <div className="mt-12 text-center">
                                {/* <div className="inline-block bg-gray-100 p-4 rounded-lg shadow-inner">
                                    <div className="w-24 h-24 bg-white grid grid-cols-5 grid-rows-5 gap-1 p-3">
                                        {Array.from({ length: 25 }).map((_, i) => (
                                            <div key={i} className="bg-black rounded-sm opacity-80" />
                                        ))}
                                    </div>
                                </div> */}

                                <div className="flex justify-center gap-4 mt-6">
                                    <div className="w-5 h-5 rounded-full bg-green-700"></div>
                                    <div className="w-5 h-5 rounded-full bg-red-600"></div>
                                    <div className="w-5 h-5 rounded-full bg-green-700"></div>
                                </div>

                                <p className="text-sm mt-6 text-gray-800 font-medium">
                                    এই সার্টিফিকেটের নিরাপত্তা নিশ্চিত করা হয়েছে। অনুলিপি বা পরিবর্তন অবৈধ ও দণ্ডনীয় অপরাধ।
                                </p>
                            </div>
                        </div>

                        {/* Photo - top right circular */}
                        {photoPreview && (
                            <div
                                className="absolute top-40 right-10 w-30 h-36  rounded-md border-2  border-rose-500 overflow-hidden shadow-2xl bg-white"
                            >
                                <img
                                    src={photoPreview}
                                    alt="Insured"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white rounded-2xl shadow-2xl p-4 h-fit">
                    <h2 className="text-xl font-bold text-green-800 mb-4 text-center">
                        Modify Certificate Details
                    </h2>

                    {error && <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded text-red-700">{error}</div>}

                    <div className="space-y-3">
                        {/* Photo */}
                        <div>
                            <label className="block text-gray-700 text-xs font-medium mb-2">
                                Photo (120×120 px recommended)
                            </label>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="p-2 text-xs bg-blue-700 text-white rounded-lg hover:bg-blue-800"
                                >
                                    Choose File
                                </button>
                                <span className="text-gray-600">
                                    {photoPreview ? 'Selected' : 'No file chosen'}
                                </span>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handlePhotoUpload}
                                    accept="image/*"
                                    className="hidden text-xs"
                                />
                            </div>
                        </div>

                        {/* All fields */}
                        {Object.entries(formData).map(([key, value]) => (
                            <div key={key}>
                                <label className="block text-gray-700 font-medium mb-2 capitalize text-sm">
                                    {key.replace(/([A-Z])/g, ' $1')}
                                </label>
                                <input
                                    name={key}
                                    value={value}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-600 outline-none text-sm"
                                />
                            </div>
                        ))}

                        <button
                            onClick={downloadAsPNG}
                            disabled={isDownloading}
                            className={`w-full mt-10 py-4 rounded-xl text-sm font-bold text-white text-lg shadow-xl transition-all flex items-center justify-center gap-3
                ${isDownloading ? 'bg-green-500 cursor-not-allowed' : 'bg-green-700 hover:bg-green-900'}`}
                        >
                            {isDownloading ? (
                                <>
                                    <div className="animate-spin h-6 w-6 border-4 border-white border-t-transparent rounded-full"></div>
                                    Generating A4 Certificate...
                                </>
                            ) : (
                                'Download as PNG (A4 Size)'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsuranceGenerate;