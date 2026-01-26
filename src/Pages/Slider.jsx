import React, { useEffect, useState } from 'react';

const Slider = () => {
    const slides = [
        {
            id: 1,
            title: 'দ্রুত ঋণ অনুমোদন',
            sub_title: '২৪ ঘন্টার মধ্যে আপনার ঋণ অনুমোদিত হবে',
            image: 'https://i.ibb.co/fPCrjH2/image.png',
        },
        {
            id: 2,
            title: 'কম সুদের হার',
            sub_title: 'সকল ধরনের ঋণের জন্য প্রতিযোগিতামূলক হার',
            image: 'https://i.ibb.co/rfwG92Jh/image.png',
        },
        {
            id: 3,
            title: 'সহজ আবেদন প্রক্রিয়া',
            sub_title: 'কয়েকটি ধাপে অনলাইনে আবেদন করুন',
            image: 'https://i.ibb.co/LhtsXbfs/image.png',
        },
    ];

    const [active, setActive] = useState(0);

    // auto slide
    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % slides.length);
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-2xl shadow-lg">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
                        ${index === active ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                    />

                    {/* overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="text-center text-white px-4 max-w-xl">
                            <h2 className="text-xl md:text-3xl font-bold mb-2">
                                {slide.title}
                            </h2>
                            <p className="text-sm md:text-base opacity-90">
                                {slide.sub_title}
                            </p>
                        </div>
                    </div>
                </div>
            ))}

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setActive(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all
                            ${i === active ? 'bg-white scale-110' : 'bg-white/50'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;
