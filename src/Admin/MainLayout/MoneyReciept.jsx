import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas-pro';

const MoneyReciept = () => {
    const receiptRef = useRef(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        receiptNo: `WB-${Math.floor(10000 + Math.random() * 90000)}`,
        date: new Date().toLocaleDateString('en-GB'),
        receivedFrom: '',
        amount: '',
        amountInWords: '',
        forPurpose: '',
        acctNo: '',
        paymentMethod: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            let updated = { ...prev, [name]: value };

            if (name === 'amount') {
                updated.amountInWords = numberToWords(value);
            }

            return updated;
        });
    };

    // Simple number to words (English)
    const numberToWords = (num) => {
        if (!num || isNaN(num)) return '';
        const n = parseFloat(num);
        if (n === 0) return 'Zero Taka Only';

        const belowTwenty = [
            '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
            'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
            'Seventeen', 'Eighteen', 'Nineteen'
        ];
        const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
        const scales = ['', 'Thousand', 'Lakh', 'Crore'];

        function helper(num) {
            if (num < 20) return belowTwenty[num];
            if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + belowTwenty[num % 10] : '');
            if (num < 1000) {
                return belowTwenty[Math.floor(num / 100)] + ' Hundred' + (num % 100 ? ' ' + helper(num % 100) : '');
            }

            for (let i = 1; i < scales.length; i++) {
                const divider = Math.pow(100, i * 2); // 1000, 100000, 10000000
                if (num < divider * 100) {
                    return helper(Math.floor(num / divider)) + ' ' + scales[i] + (num % divider ? ' ' + helper(num % divider) : '');
                }
            }
            return '';
        }

        const words = helper(Math.floor(n));
        const decimal = (n % 1).toFixed(2).slice(2);
        return words + ' Taka' + (decimal !== '00' ? ' and ' + decimal + '/100' : '') + ' Only';
    };

    const downloadPNG = async () => {
        if (!receiptRef.current) {
            setError('Receipt not loaded');
            return;
        }

        setIsGenerating(true);
        setError('');

        try {
            const canvas = await html2canvas(receiptRef.current, {
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
                link.download = `WorldBank_Money_Receipt_${formData.receiptNo}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);

                setIsGenerating(false);
            }, 'image/png', 1.0);
        } catch (err) {
            console.error(err);
            setError('Download failed: ' + err.message);
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className=" mx-auto space-y-12">
                {/* Edit Form */}
                <div className="bg-white rounded-xl shadow-md p-4 max-w-4xl mx-auto">
                    <h2 className="text-xl font-semibold text-blue-900 mb-4 text-center">
                        Edit Money Receipt
                    </h2>

                    {error && (
                        <div className="mb-3 px-3 py-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <div className="grid sm:grid-cols-3 gap-3 text-sm">
                        {/* Receipt No */}
                        <div>
                            <label className="block text-gray-600 mb-0.5">Receipt No</label>
                            <input
                                name="receiptNo"
                                value={formData.receiptNo}
                                readOnly
                                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
                            />
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block text-gray-600 mb-0.5">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-yellow-500 outline-none"
                            />
                        </div>

                        {/* Amount */}
                        <div>
                            <label className="block text-gray-600 mb-0.5">Amount (৳)</label>
                            <input
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                placeholder="100000"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-yellow-500 outline-none"
                            />
                        </div>

                        {/* Received From */}
                        <div className="sm:col-span-3">
                            <label className="block text-gray-600 mb-0.5">Received From</label>
                            <input
                                name="receivedFrom"
                                value={formData.receivedFrom}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                            />
                        </div>

                        {/* Amount in Words */}
                        <div className="sm:col-span-3">
                            <label className="block text-gray-600 mb-0.5">Amount in Words</label>
                            <input
                                name="amountInWords"
                                value={formData.amountInWords || numberToWords(formData.amount)}
                                readOnly
                                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
                            />
                        </div>

                        {/* For */}
                        <div className="sm:col-span-2">
                            <label className="block text-gray-600 mb-0.5">For</label>
                            <select
                                name="forPurpose"
                                value={formData.forPurpose}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                            >
                                <option value="">Select</option>
                                <option value="Rural Development Project">Rural Development</option>
                                <option value="Education Support">Education</option>
                                <option value="Health Program">Health</option>
                                <option value="Emergency Fund">Emergency</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Payment Method */}
                        <div>
                            <label className="block text-gray-600 mb-0.5">Payment</label>
                            <select
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                            >
                                <option value="">Select</option>
                                <option value="Cash">Cash</option>
                                <option value="Bank Transfer">Bank</option>
                                <option value="bKash">bKash</option>
                                <option value="Rocket">Rocket</option>
                                <option value="Cheque">Cheque</option>
                            </select>
                        </div>

                        {/* Account No */}
                        <div className="sm:col-span-3">
                            <label className="block text-gray-600 mb-0.5">A/C No (optional)</label>
                            <input
                                name="acctNo"
                                value={formData.acctNo}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                            />
                        </div>
                    </div>

                    <button
                        onClick={downloadPNG}
                        disabled={isGenerating}
                        className={`w-full mt-4 py-2.5 rounded-lg font-semibold text-white text-sm transition flex items-center justify-center gap-2
        ${isGenerating ? 'bg-green-500' : 'bg-green-700 hover:bg-green-800'}`}
                    >
                        {isGenerating ? (
                            <>
                                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                Generating...
                            </>
                        ) : (
                            'Generate & Download PNG'
                        )}
                    </button>
                </div>


                {/* Receipt Preview */}
                <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 max-w-4xl mx-auto">
                    <div
                        ref={receiptRef}
                        className="p-6 md:p-8 bg-white"
                        style={{ fontFamily: "'Courier New', Courier, monospace" }}
                    >

                        {/* ===== Header ===== */}
                        <div className="relative mb-8">
                            <div className="absolute inset-0 h-20 bg-gradient-to-r from-blue-900 to-blue-700 rounded-t-xl"></div>
                            <div className="relative flex items-center justify-between px-6 pt-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-blue-900 shadow">
                                        WB
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-white leading-tight">
                                            THE WORLD BANK
                                        </h2>
                                        <p className="text-xs text-blue-100">
                                            World Bank Group
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-yellow-400 text-blue-900 font-bold px-4 py-2 rounded-md shadow">
                                    MONEY RECEIPT
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <p className="text-center text-xs text-gray-600 mb-6">
                            Plot E-32, Syed Mahbub Morshed Avenue, Dhaka 1207, Bangladesh
                        </p>

                        {/* ===== Receipt Body ===== */}
                        <div className="border border-yellow-500 rounded-lg p-5 bg-white">
                            {/* Top Info */}
                            <div className="flex justify-between text-sm font-semibold border-b border-gray-300 pb-2 mb-4">
                                <span>
                                    Receipt No: <span className="font-normal">{formData.receiptNo}</span>
                                </span>
                                <span>
                                    Date: <span className="font-normal">{formData.date}</span>
                                </span>
                            </div>

                            {/* Fields */}
                            <div className="space-y-3 text-sm">
                                {[
                                    ['Received From', formData.receivedFrom],
                                    ['Amount (৳)', formData.amount],
                                    ['In Words', formData.amountInWords || numberToWords(formData.amount)],
                                    ['For', formData.forPurpose],
                                ].map(([label, value], i) => (
                                    <div key={i} className="flex gap-2">
                                        <span className="font-bold min-w-[120px]">{label}:</span>
                                        <span className="flex-1 border-b border-dashed border-gray-500">
                                            {value || '........................................................'}
                                        </span>
                                    </div>
                                ))}

                                <div className="flex justify-between mt-2">
                                    <div>
                                        <span className="font-bold">A/C No:</span>{' '}
                                        <span className="border-b border-dashed border-gray-500 inline-block w-36">
                                            {formData.acctNo || '....................'}
                                        </span>
                                    </div>
                                    <div className="font-bold text-green-700">PAID</div>
                                </div>
                            </div>

                            {/* Signature */}
                            <div className="mt-10 flex justify-end">
                                <div className="text-center">

                                    <p className="text-xl text-gray-600 signFont">N.H.M.</p>
                                    <div className="border-b border-black w-48 mb-1"></div>
                                    <p className="font-semibold text-sm">Authorized Signature</p>
                                </div>
                            </div>
                        </div>

                        {/* ===== Footer ===== */}
                        <div className="mt-6 text-center text-[11px] text-gray-500">
                            This is a system generated receipt and does not require a physical stamp.
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MoneyReciept;