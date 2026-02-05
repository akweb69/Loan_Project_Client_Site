import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas-pro';

const Checque = () => {
    const chequeRef = useRef(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        date: 'May 15, 2025',
        payeeName: 'Bangladesh Rural Development Board',
        amount: '100000.00',
        amountInWords: 'One lakh thirty-five thousand seven hundred fifty only',
        memo: 'Rural development project',
        chequeNo: 'WB-23528',
        micr: '04243603314 • WB852120123409 • 069807',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // English number to words (simple version)
    const numberToWords = (num) => {
        if (!num) return '';
        const n = parseFloat(num);
        if (isNaN(n)) return '';

        const belowTwenty = [
            'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
            'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
            'Seventeen', 'Eighteen', 'Nineteen'
        ];
        const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

        function helper(num) {
            if (num === 0) return '';
            if (num < 20) return belowTwenty[num];
            if (num < 100) {
                return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + belowTwenty[num % 10] : '');
            }
            if (num < 1000) {
                return belowTwenty[Math.floor(num / 100)] + ' Hundred' + (num % 100 ? ' ' + helper(num % 100) : '');
            }
            if (num < 100000) {
                return helper(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 ? ' ' + helper(num % 1000) : '');
            }
            if (num < 10000000) {
                return helper(Math.floor(num / 100000)) + ' Lakh' + (num % 100000 ? ' ' + helper(num % 100000) : '');
            }
            return '';
        }

        const words = helper(Math.floor(n));
        return words + ' only';
    };

    const downloadPNG = async () => {
        if (!chequeRef.current) {
            setError('Cheque preview not loaded');
            return;
        }

        setIsDownloading(true);
        setError('');

        try {
            const canvas = await html2canvas(chequeRef.current, {
                scale: 3,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                logging: false,
            });

            canvas.toBlob((blob) => {
                if (!blob) throw new Error('Blob creation failed');

                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `WorldBank_Cheque_${formData.chequeNo || 'WB'}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);

                setIsDownloading(false);
            }, 'image/png', 1.0);
        } catch (err) {
            console.error('Download error:', err);
            setError('Failed to download: ' + err.message);
            setIsDownloading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 ">
            <div className=" space-y-6">
                {/* Edit Section */}
                <div className="bg-white rounded-lg shadow-md p-3">
                    <h2 className="text-sm font-semibold text-blue-900 mb-3 text-center">
                        Edit Cheque Details
                    </h2>

                    {error && (
                        <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                            {error}
                        </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-2 text-sm">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-0.5">
                                Date
                            </label>
                            <input
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-0.5">
                                Payee Name
                            </label>
                            <input
                                name="payeeName"
                                value={formData.payeeName}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-0.5">
                                Amount (৳)
                            </label>
                            <input
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div className="">
                            <label className="block text-xs font-medium text-gray-600 mb-0.5">
                                Amount in Words
                            </label>
                            <input
                                name="amountInWords"
                                value={formData.amountInWords || numberToWords(formData.amount)}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div className="">
                            <label className="block text-xs font-medium text-gray-600 mb-0.5">
                                Memo
                            </label>
                            <input
                                name="memo"
                                value={formData.memo}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-0.5">
                                Cheque No
                            </label>
                            <input
                                name="chequeNo"
                                value={formData.chequeNo}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    <button
                        onClick={downloadPNG}
                        disabled={isDownloading}
                        className={`w-full mt-4 py-2 rounded-lg text-sm font-semibold text-white transition flex items-center justify-center gap-2
        ${isDownloading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800'}`}
                    >
                        {isDownloading ? (
                            <>
                                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                Generating…
                            </>
                        ) : (
                            'Download PNG'
                        )}
                    </button>
                </div>


                {/* Cheque Preview */}
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-300">
                    <div
                        ref={chequeRef}
                        className="p-10 sm:p-12 md:p-16 bg-[#f8f9fa]"
                        style={{ fontFamily: "'Courier New', Courier, monospace" }}
                    >
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center text-white text-3xl font-bold shadow">
                                    WB
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-blue-900">WORLD BANK</h1>
                                    <p className="text-sm text-gray-600">
                                        1818 H Street, N.W., Washington, DC 20433 USA
                                    </p>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="font-bold text-xl text-blue-900">{formData.chequeNo}</p>
                                <p className="text-sm text-gray-600">Date: {formData.date}</p>
                            </div>
                        </div>

                        {/* Pay to the Order */}
                        <div className="mb-10">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 border-b-2 border-black pb-3">
                                <span className="font-bold text-xl whitespace-nowrap">PAY TO THE ORDER OF</span>
                                <span className="flex-1 border-b border-dashed border-gray-600 text-xl font-semibold">
                                    {formData.payeeName}
                                </span>
                            </div>
                        </div>

                        {/* Amount Section */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
                            <div>
                                <p className="text-5xl font-bold text-blue-900">
                                    ৳ {Number(formData.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="text-sm text-gray-600 uppercase">Amount in Words</p>
                                <p className="text-xl font-semibold">
                                    {formData.amountInWords || numberToWords(formData.amount)}
                                </p>
                            </div>
                        </div>

                        {/* Memo & Signature */}
                        <div className="border-t border-gray-400 pt-8">
                            <div className="flex flex-col sm:flex-row justify-between gap-10">
                                <div className="flex-1">
                                    <p className="text-sm text-gray-600 uppercase mb-1">MEMO</p>
                                    <p className="border-b border-dashed border-gray-600 pb-1 text-lg">
                                        {formData.memo}
                                    </p>
                                </div>

                                <div className="text-right min-w-[220px]">
                                    <p className="text-sm text-gray-600 uppercase mb-1">AUTHORIZED SIGNATURE</p>
                                    <div className="border-b-2 border-black w-64 inline-block mt-4"></div>
                                    <p className="mt-3 font-semibold text-lg signFont">Mahmud Ali</p>
                                </div>
                            </div>

                            <div className="mt-10 text-xs text-center text-gray-600 font-mono">
                                {formData.micr}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checque;