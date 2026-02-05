// EditableLoanApprovalCertificate.jsx
import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas-pro';
import { CircleCheck, Clock, Download, User } from 'lucide-react';

const EditableLoanApprovalCertificate = () => {
    const certificateRef = useRef(null);

    const [form, setForm] = useState({
        date: '15 May, 2025',
        referenceNo: 'MOF/WB/IND/2025/4582',
        serialNo: 'BD-WB-IND-2025-4582',
        beneficiaryId: 'IFAP-BD-2025-45821',
        fullName: 'Mohammad Abdul Karim',
        nationalId: '1992457812345678',
        address: 'Village: Nayapara, Union: Boalia, Upazila: Sreepur, District: Gazipur',
        loanAmount: '200000 TK',
        term: '20 Months',
        interestRate: '2.4%',
        monthlyInstallment: '18000 TK',
        photoPreview: '', // local preview URL
    });

    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setForm((prev) => ({ ...prev, photoPreview: previewUrl }));
        }
    };

    const downloadAsPNG = async () => {
        if (!certificateRef.current) return;

        try {
            const canvas = await html2canvas(certificateRef.current, {
                scale: 3,
                useCORS: true,
                backgroundColor: null,
                logging: false,
                allowTaint: true, // helps with local blob urls
            });

            const link = document.createElement('a');
            link.download = 'certificate.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (err) {
            console.error('Failed to generate image:', err);
        }
    };

    const govtSeal = 'https://upload.wikimedia.org/wikipedia/commons/8/84/Government_Seal_of_Bangladesh.svg';
    const secSignature = 'https://i.ibb.co/nNx4CGsg/image.png';
    const progSignature = 'https://i.ibb.co/RkwcyB7F/image.png';

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 py-6 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_2fr] gap-6">
                {/* Compact Form */}
                <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200">
                    <h2 className="text-xl font-bold mb-4 text-blue-800">Modify Certificate</h2>

                    <div className="grid grid-cols-1 gap-3 text-sm">
                        <label className="block">
                            <span className="font-medium text-gray-700">Date</span>
                            <input
                                name="date"
                                value={form.date}
                                onChange={handleTextChange}
                                className="mt-1 block w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm"
                            />
                        </label>

                        <label className="block">
                            <span className="font-medium text-gray-700">Reference No</span>
                            <input
                                name="referenceNo"
                                value={form.referenceNo}
                                onChange={handleTextChange}
                                className="mt-1 block w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm"
                            />
                        </label>

                        <label className="block">
                            <span className="font-medium text-gray-700">Serial No</span>
                            <input
                                name="serialNo"
                                value={form.serialNo}
                                onChange={handleTextChange}
                                className="mt-1 block w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm"
                            />
                        </label>

                        <label className="block">
                            <span className="font-medium text-gray-700">Beneficiary ID</span>
                            <input
                                name="beneficiaryId"
                                value={form.beneficiaryId}
                                onChange={handleTextChange}
                                className="mt-1 block w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm"
                            />
                        </label>

                        <label className="block">
                            <span className="font-medium text-gray-700">Full Name</span>
                            <input
                                name="fullName"
                                value={form.fullName}
                                onChange={handleTextChange}
                                className="mt-1 block w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm"
                            />
                        </label>

                        <label className="block">
                            <span className="font-medium text-gray-700">National ID</span>
                            <input
                                name="nationalId"
                                value={form.nationalId}
                                onChange={handleTextChange}
                                className="mt-1 block w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm"
                            />
                        </label>

                        <label className="block">
                            <span className="font-medium text-gray-700">Address</span>
                            <textarea
                                name="address"
                                value={form.address}
                                onChange={handleTextChange}
                                rows={2}
                                className="mt-1 block w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm resize-y"
                            />
                        </label>

                        <div className="grid grid-cols-2 gap-3">
                            <label className="block">
                                <span className="font-medium text-gray-700">Loan Amount</span>
                                <input
                                    name="loanAmount"
                                    value={form.loanAmount}
                                    onChange={handleTextChange}
                                    className="mt-1 block w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm"
                                />
                            </label>

                            <label className="block">
                                <span className="font-medium text-gray-700">Term</span>
                                <input
                                    name="term"
                                    value={form.term}
                                    onChange={handleTextChange}
                                    className="mt-1 block w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm"
                                />
                            </label>

                            <label className="block">
                                <span className="font-medium text-gray-700">Interest Rate</span>
                                <input
                                    name="interestRate"
                                    value={form.interestRate}
                                    onChange={handleTextChange}
                                    className="mt-1 block w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm"
                                />
                            </label>

                            <label className="block">
                                <span className="font-medium text-gray-700">Installment</span>
                                <input
                                    name="monthlyInstallment"
                                    value={form.monthlyInstallment}
                                    onChange={handleTextChange}
                                    className="mt-1 block w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm"
                                />
                            </label>
                        </div>

                        <label className="block">
                            <span className="font-medium text-gray-700">Recipient Photo</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {form.photoPreview && (
                                <p className="mt-1 text-xs text-gray-500">Photo selected</p>
                            )}
                        </label>
                    </div>

                    <button
                        onClick={downloadAsPNG}
                        className="mt-6 w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-lg shadow transition-all hover:shadow-lg active:scale-95 text-sm"
                    >
                        <Download size={16} />
                        Download PNG
                    </button>
                </div>

                {/* Preview */}
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-bold mb-4 text-blue-800">Preview</h2>

                    <div
                        ref={certificateRef}
                        className="w-full max-w-4xl bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-200 relative"
                        style={{
                            aspectRatio: '1 / 1.414',
                            background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                        }}
                    >
                        <div className="absolute inset-0 border-8 border-double border-[#1e40af] pointer-events-none" />

                        {/* Header */}
                        <div className="relative pt-6 pb-1 px-8 text-center">
                            <div className="flex justify-center">
                                <img src={govtSeal} alt="Seal" className="w-16 h-16 object-contain" />
                            </div>

                            <h1 className="text-lg md:text-xl font-bold mt-1">
                                গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
                            </h1>
                            <p className="text-base font-medium">Government of the People's Republic of Bangladesh</p>
                            <p className="text-sm">Ministry of Finance</p>
                            <p className="text-lg font-bold mt-1">ঋণ অনুমোদন সনদপত্র</p>
                            <p className="text-lg font-semibold">LOAN APPROVAL CERTIFICATE</p>
                        </div>

                        <div className="flex justify-center gap-1.5 my-1">
                            <div className="w-10 h-0.5 bg-green-500 rounded-full" />
                            <Clock size={14} className="text-orange-500" />
                            <div className="w-10 h-0.5 bg-rose-500 rounded-full" />
                        </div>

                        <p className="text-center text-xs font-semibold">Approved Bank Name: World Bank</p>

                        <div className="flex justify-between px-6 py-1.5 text-xs">
                            <p><strong>Reference No:</strong> {form.referenceNo}</p>
                            <p><strong>Date:</strong> {form.date}</p>
                        </div>

                        <div className="px-6 py-1.5">
                            <div className="p-3 bg-orange-50/50 text-[10px] text-justify border border-orange-200 rounded-lg">
                                We are pleased to inform you that your loan request has been approved by our bank. After a thorough review of your application, supporting documents, and overall financial profile, we are confident in your ability to repay the requested loan amount. This approval falls under the scope of the International Bank's proposed Loan Restructuring and Development Project Assessment.
                            </div>
                        </div>

                        {/* Recipient Details */}
                        <div className="px-6 grid grid-cols-7 gap-3 text-xs">
                            <div className="col-span-5 p-3 border-l-4 border-blue-600 rounded-lg bg-blue-50/40">
                                <div className="flex items-center gap-1.5 text-green-700 mb-2">
                                    <User size={12} />
                                    <span className="font-semibold">Recipient Details</span>
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex">
                                        <span className="font-medium w-32">Beneficiary ID:</span>
                                        <span>{form.beneficiaryId}</span>
                                    </div>
                                    <hr className="border-gray-300" />
                                    <div className="flex">
                                        <span className="font-medium w-32">Full Name:</span>
                                        <span>{form.fullName}</span>
                                    </div>
                                    <hr className="border-gray-300" />
                                    <div className="flex">
                                        <span className="font-medium w-32">National ID:</span>
                                        <span>{form.nationalId}</span>
                                    </div>
                                    <hr className="border-gray-300" />
                                    <div className="flex">
                                        <span className="font-medium w-32">Address:</span>
                                        <span>{form.address}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-2 flex flex-col items-center justify-center gap-1.5">
                                <div className="w-20 h-28 border-2 border-gray-400 rounded flex items-center justify-center bg-gray-50 overflow-hidden">
                                    {form.photoPreview ? (
                                        <img src={form.photoPreview} alt="Recipient" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-[9px] text-center p-1">Recipient's<br />Photograph</div>
                                    )}
                                </div>
                                <p className="text-[9px] text-center">Verified by Ministry of Finance</p>
                            </div>
                        </div>

                        {/* Benefits */}
                        <div className="px-6 mt-3">
                            <div className="p-3 border-l-4 border-blue-600 rounded-lg bg-blue-50/40">
                                <div className="flex items-center gap-1.5 text-green-700 mb-2">
                                    <CircleCheck size={12} />
                                    <span className="font-semibold">কর্মসূচি সুবিধা</span>
                                </div>
                                <div className="text-[10px] text-justify mb-2">
                                    This loan has been provided under the World Bank's microcredit program at a low interest rate to help improve the borrower's quality of life...
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-[10px] font-medium">
                                    <div>Loan Amount: {form.loanAmount}</div>
                                    <div>Term: {form.term}</div>
                                    <div>Interest Rate: {form.interestRate}</div>
                                    <div>Installment: {form.monthlyInstallment}</div>
                                </div>
                            </div>
                        </div>

                        <p className="text-xs text-center italic mt-3 px-6">
                            This certificate is valid subject to the terms and conditions No. {form.serialNo}
                        </p>

                        {/* Signatures */}
                        <div className="grid grid-cols-3 gap-3 px-6 mt-4 pb-5 text-[10px]">
                            <div className="text-center">
                                <img src={secSignature} alt="Sig" className="h-10 mx-auto" />
                                <p>Secretary<br />Ministry of Finance</p>
                            </div>
                            <div className="text-center">
                                <img src={progSignature} alt="Sig" className="h-10 mx-auto" />
                                <p>Program Director<br />World Bank, Bangladesh</p>
                            </div>
                            <div className="flex justify-center">
                                <div className="w-16 h-16 rounded-full border-4 border-green-600 flex items-center justify-center text-[7px] text-center p-1 bg-white">
                                    গণপ্রজাতন্ত্রী বাংলাদেশ সরকার<br />Ministry of Finance
                                </div>
                            </div>
                        </div>

                        <div className="text-xs px-6 pb-3">
                            Serial No: {form.serialNo}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditableLoanApprovalCertificate;