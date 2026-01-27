import React, { useContext, useState } from 'react';
import { CheckCircle2, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '@/context/AppContext';


const LoanCalculator = () => {
    const [step, setStep] = useState(1);
    const [selectedTerm, setSelectedTerm] = useState(12);
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [hoveredAmount, setHoveredAmount] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate()
    const { phone } = useParams();
    const { user, loading } = useContext(AppContext);


    const base_url = import.meta.env.VITE_BASE_URL || 'http://localhost:5000'; // fallback for local dev

    const terms = [
        { value: 12, label: '12 মাস' },
        { value: 24, label: '24 মাস' },
        { value: 36, label: '36 মাস' },
        { value: 48, label: '48 মাস' },
        { value: 60, label: '60 মাস' },
    ];

    const loanAmounts = [
        20000, 50000, 100000, 150000, 200000, 300000, 400000, 500000,
        600000, 700000, 800000, 900000, 1000000, 1100000, 1200000,
        1300000, 1400000, 1500000, 1600000, 1700000, 1800000, 1900000, 2000000,
    ];

    const interestRate = 8;       // flat interest rate per year (%)
    const processingFee = 480;

    // Flat rate interest calculation (common in some personal/micro loans in BD)
    const calculateTotalInterest = (principal, months) => {
        const years = months / 12;
        return Math.round((principal * interestRate * years) / 100);
    };

    const calculateTotalPayable = (principal, months) => {
        if (!principal || !months) return 0;
        const interest = calculateTotalInterest(principal, months);
        return principal + interest + processingFee;
    };

    const calculateMonthlyEMI = (principal, months) => {
        if (!principal || !months) return 0;
        const total = calculateTotalPayable(principal, months);
        return Math.round(total / months);
    };

    const formatNumber = (num) => {
        return num.toLocaleString('bn-BD');
    };

    const handleNext = () => {
        if (selectedAmount) {
            setStep(2);
        }
    };

    const handleBack = () => {
        setStep(1);
    };

    const handleConfirmRequest = async () => {
        if (!selectedAmount || !selectedTerm) return;

        setIsSubmitting(true);

        const payload = {
            loanAmount: selectedAmount,
            tenureMonths: selectedTerm,
            interestRate: interestRate,
            processingFee: processingFee,
            totalInterest: calculateTotalInterest(selectedAmount, selectedTerm),
            totalPayable: calculateTotalPayable(selectedAmount, selectedTerm),
            monthlyEMI: calculateMonthlyEMI(selectedAmount, selectedTerm),
            // You can add more fields: userId, timestamp, status, etc.
            createdAt: new Date().toISOString(),
            phone: phone
        };

        try {
            const response = await fetch(`${base_url}/loanAmountAndKistiDetails`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add Authorization if you use JWT later
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`Server responded with status ${response.status}`);
            }

            // const result = await response.json();  // if you want to use the inserted ID
            navigate(`/provide_info/${user?.email}`)
            alert('আবেদন সফলভাবে জমা হয়েছে!'); // replace with toast / modal / redirect
            // history.push('/request_successfull');  // if using react-router

            // Optional: reset form or redirect
            // setStep(1);
            // setSelectedAmount(null);

        } catch (error) {
            console.error('Submission error:', error);
            alert('দুঃখিত! আবেদন জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-8">
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${step === 1
                                    ? 'bg-blue-600 text-white scale-110 shadow-lg'
                                    : 'bg-white text-blue-600 border-2 border-blue-600'
                                    }`}
                            >
                                1
                            </div>
                            <span
                                className={`text-sm mt-2 font-medium transition-colors duration-300 ${step === 1 ? 'text-blue-700' : 'text-gray-600'
                                    }`}
                            >
                                পরিমাণ নির্বাচন
                            </span>
                        </div>

                        <div
                            className={`w-16 h-1 transition-all duration-500 ${step === 2 ? 'bg-blue-600' : 'bg-gray-300'
                                }`}
                        ></div>

                        <div className="flex flex-col items-center">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${step === 2
                                    ? 'bg-blue-600 text-white scale-110 shadow-lg'
                                    : 'bg-white text-gray-400 border-2 border-gray-300'
                                    }`}
                            >
                                2
                            </div>
                            <span
                                className={`text-sm mt-2 font-medium transition-colors duration-300 ${step === 2 ? 'text-blue-700' : 'text-gray-400'
                                    }`}
                            >
                                বিবরণ নিশ্চিত
                            </span>
                        </div>
                    </div>
                </div>

                {/* Step 1: Selection */}
                {step === 1 && (
                    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 animate-fadeIn">
                        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6 text-center">
                            ঋণের পরিমাণ এবং মেয়াদ নির্বাচন করুন
                        </h2>

                        {/* Loan Term Selection */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                                <span className="text-blue-600">📅</span> ঋণের মেয়াদ
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {terms.map((term) => (
                                    <button
                                        key={term.value}
                                        onClick={() => setSelectedTerm(term.value)}
                                        className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${selectedTerm === term.value
                                            ? 'bg-blue-600 text-white shadow-lg scale-105'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
                                            }`}
                                    >
                                        {term.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Amount Selection */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                                <span className="text-blue-600">💰</span> ঋণের পরিমাণ
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {loanAmounts.map((amount) => {
                                    const monthly = calculateMonthlyEMI(amount, selectedTerm);
                                    const isSelected = selectedAmount === amount;
                                    const isHovered = hoveredAmount === amount;

                                    return (
                                        <button
                                            key={amount}
                                            onClick={() => setSelectedAmount(amount)}
                                            onMouseEnter={() => setHoveredAmount(amount)}
                                            onMouseLeave={() => setHoveredAmount(null)}
                                            className={`p-4 rounded-xl border-2 transition-all duration-300 transform ${isSelected
                                                ? 'border-blue-600 bg-blue-50 scale-105 shadow-lg'
                                                : isHovered
                                                    ? 'border-blue-300 bg-blue-50/50 scale-102 shadow-md'
                                                    : 'border-gray-200 bg-white hover:border-blue-200'
                                                }`}
                                        >
                                            <div className="flex items-start justify-between mb-1">
                                                <span className="text-xl font-bold text-blue-600">
                                                    ৳{formatNumber(amount)}
                                                </span>
                                                {isSelected && (
                                                    <CheckCircle2 className="w-5 h-5 text-blue-600 animate-scaleIn" />
                                                )}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                ৳{formatNumber(monthly)} / মাস
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Next Button */}
                        <div className="mt-8">
                            <button
                                onClick={handleNext}
                                disabled={!selectedAmount}
                                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${selectedAmount
                                    ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:scale-102'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                পরবর্তী
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Confirmation */}
                {step === 2 && selectedAmount && (
                    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 animate-fadeIn">
                        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6 text-center">
                            আপনার বিবরণ নিশ্চিত করুন
                        </h2>

                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
                            <h3 className="text-xl font-bold text-blue-700 mb-6 text-center">
                                নির্বাচিত ঋণের বিবরণ
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-3 border-b border-blue-200">
                                    <span className="text-gray-700 font-medium">ঋণের পরিমাণ:</span>
                                    <span className="text-gray-900 font-bold text-lg">
                                        ৳{formatNumber(selectedAmount)}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center py-3 border-b border-blue-200">
                                    <span className="text-gray-700 font-medium">মেয়াদ:</span>
                                    <span className="text-gray-900 font-bold">{selectedTerm} মাস</span>
                                </div>

                                <div className="flex justify-between items-center py-3 border-b border-blue-200">
                                    <span className="text-gray-700 font-medium">বার্ষিক সুদের হার:</span>
                                    <span className="text-gray-900 font-bold">{interestRate}% (ফ্ল্যাট)</span>
                                </div>

                                <div className="flex justify-between items-center py-3 border-b border-blue-200">
                                    <span className="text-gray-700 font-medium">প্রসেসিং ফি:</span>
                                    <span className="text-gray-900 font-bold">৳{formatNumber(processingFee)}</span>
                                </div>

                                <div className="flex justify-between items-center py-3 border-b border-blue-200">
                                    <span className="text-gray-700 font-medium">মোট সুদ:</span>
                                    <span className="text-gray-900 font-bold">
                                        ৳{formatNumber(calculateTotalInterest(selectedAmount, selectedTerm))}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center py-4 bg-blue-100 -mx-6 px-6 rounded-lg mt-4">
                                    <span className="text-blue-900 font-bold text-lg">সর্বমোট পরিশোধযোগ্য:</span>
                                    <span className="text-blue-900 font-bold text-2xl">
                                        ৳{formatNumber(calculateTotalPayable(selectedAmount, selectedTerm))}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center py-4 bg-green-50 -mx-6 px-6 rounded-lg border-2 border-green-200">
                                    <span className="text-green-900 font-bold text-lg">মাসিক কিস্তি:</span>
                                    <span className="text-green-700 font-bold text-2xl">
                                        ৳{formatNumber(calculateMonthlyEMI(selectedAmount, selectedTerm))}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={handleBack}
                                disabled={isSubmitting}
                                className="flex-1 py-4 rounded-xl font-bold text-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                পিছনে যান
                            </button>

                            <button
                                onClick={handleConfirmRequest}
                                disabled={isSubmitting}
                                className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-102 flex items-center justify-center gap-2 ${isSubmitting
                                    ? 'bg-blue-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
                                    } text-white`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        জমা হচ্ছে...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 className="w-5 h-5" />
                                        আবেদন নিশ্চিত করুন
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
        </div>
    );
};

export default LoanCalculator;