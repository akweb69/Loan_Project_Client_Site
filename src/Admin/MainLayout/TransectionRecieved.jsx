import React, { useRef, useState } from "react";
import html2canvas from "html2canvas-pro";

const TransactionReceived = () => {
    const receiptRef = useRef(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        transId: "WB879935U8918",
        date: "01/28/2026",
        time: "06:21:00 PM",
        type: "TRANSFER",
        fromAccount: "3472 1038 4746 5678",
        fromName: "JOHN DOE",
        toAccount: "XXXX XXXX XXXX 1234",
        toName: "JANE SMITH",
        toBank: "Bank",
        amount: "20,000.00",
        fee: "1,550.00",
        total: "21,550.00",
        reference: "Mr Obry cawrlos",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const downloadPNG = async () => {
        if (!receiptRef.current) {
            setError("Receipt not found");
            return;
        }

        setIsDownloading(true);
        setError(null);

        try {
            const canvas = await html2canvas(receiptRef.current, {
                scale: 3,
                useCORS: true,
                logging: false,
                backgroundColor: "#ffffff",
            });

            canvas.toBlob((blob) => {
                if (!blob) throw new Error("Blob creation failed");

                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `worldbank_receipt_${formData.transId}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);

                setIsDownloading(false);
            }, "image/png", 1.0);
        } catch (err) {
            console.error(err);
            setError("ডাউনলোডে সমস্যা: " + err.message);
            setIsDownloading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
                {/* Exact Receipt Preview */}
                <div className="flex justify-center h-fit">
                    <div
                        ref={receiptRef}
                        className="bg-white p-6 shadow-md max-w-[480px] w-full border border-gray-300"
                        style={{
                            fontFamily: "'Courier New', Courier, monospace",
                            fontSize: "13px",
                            lineHeight: "1.35",
                            color: "#000",
                            letterSpacing: "0.4px",
                        }}
                    >
                        <div className="text-center font-bold text-lg tracking-wide">
                            WORLD BANK
                        </div>
                        <div className="text-center text-xs mt-1">
                            1818 H Street, N.W Washington,
                            <br />
                            DC 20433 USA
                            <br />
                            Tel: (202) 4872-1000
                        </div>

                        <div className="text-center font-bold mt-3 mb-1 text-sm border-t border-b border-black py-1">
                            TRANSACTION RECEIPT
                        </div>

                        <div className="text-center text-xs mb-3">
                            {formData.date} {formData.time}
                        </div>

                        <div className="mb-1">
                            TRANS ID: {formData.transId}
                        </div>
                        <div className="mb-1">
                            DATE: {formData.date}
                        </div>
                        <div className="mb-1">
                            TIME: {formData.time}
                        </div>
                        <div className="mb-3">
                            TYPE: {formData.type}
                        </div>

                        <div className="border-t border-black pt-2 mb-2 font-bold text-sm">
                            FROM ACCOUNT:
                        </div>
                        <div>{formData.fromAccount}</div>
                        <div>{formData.fromName}</div>

                        <div className="border-t border-black pt-2 mb-2 font-bold text-sm">
                            TO ACCOUNT:
                        </div>
                        <div>{formData.toAccount}</div>
                        <div>{formData.toName}</div>
                        <div>{formData.toBank}</div>

                        <div className="border-t border-black pt-3 mt-3">
                            <div className="flex justify-between">
                                <span>AMOUNT:</span>
                                <span>৳{formData.amount}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>FEE:</span>
                                <span>৳{formData.fee}</span>
                            </div>
                            <div className="flex justify-between font-bold">
                                <span>TOTAL:</span>
                                <span>৳{formData.total}</span>
                            </div>
                        </div>

                        <div className="mt-3">
                            REFERENCE:
                            <br />
                            {formData.reference}
                        </div>

                        <div className="text-center font-bold mt-5 mb-2 text-sm">
                            *** TRANSACTION COMPLETED ***
                        </div>

                        <div className="text-center text-xs">
                            THANK YOU FOR BANKING WITH WORLD BANK
                            <br />
                            THIS IS A COMPUTER-GENERATED RECEIPT
                            <br />
                            NO SIGNATURE REQUIRED
                        </div>

                        {/* Simple CSS barcode simulation */}
                        <div className="mt-4 text-center">
                            <div
                                style={{
                                    height: "40px",
                                    background: "repeating-linear-gradient(90deg, #000, #000 2px, transparent 2px, transparent 4px)",
                                    width: "180px",
                                    margin: "0 auto",
                                    border: "1px solid #000",
                                }}
                            ></div>
                            <div className="text-xs mt-1">Working for a World Free of Poverty</div>
                        </div>
                    </div>
                </div>

                {/* Edit Form */}
                <div className="bg-white p-8 rounded-xl shadow-xl">
                    <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">Edit Receipt</h2>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4 text-sm">
                        {/* Add inputs for all fields */}
                        <div>
                            <label className="block mb-1 font-medium">Trans ID</label>
                            <input name="transId" value={formData.transId} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Date (MM/DD/YYYY)</label>
                            <input name="date" value={formData.date} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Time (HH:MM:SS PM)</label>
                            <input name="time" value={formData.time} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Type</label>
                            <input name="type" value={formData.type} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">From Account</label>
                            <input name="fromAccount" value={formData.fromAccount} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">From Name</label>
                            <input name="fromName" value={formData.fromName} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">To Account</label>
                            <input name="toAccount" value={formData.toAccount} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">To Name</label>
                            <input name="toName" value={formData.toName} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">To Bank</label>
                            <input name="toBank" value={formData.toBank} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Amount (e.g. 20,000.00)</label>
                            <input name="amount" value={formData.amount} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Fee (e.g. 1,550.00)</label>
                            <input name="fee" value={formData.fee} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Total (e.g. 21,550.00)</label>
                            <input name="total" value={formData.total} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Reference</label>
                            <input name="reference" value={formData.reference} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                        </div>

                        <button
                            onClick={downloadPNG}
                            disabled={isDownloading}
                            className={`w-full py-3 rounded font-bold text-white mt-6 ${isDownloading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-900 hover:bg-blue-800"
                                }`}
                        >
                            {isDownloading ? "Generating Receipt..." : "Download Exact Receipt PNG"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionReceived;