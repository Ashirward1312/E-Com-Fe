import { useEffect, useState } from "react";
import book1 from "./Hero images/home1.png";
import book2 from "./Hero images/home2.png";
import book3 from "./Hero images/home3.png";
import book4 from "./Hero images/home4.png";

const books = [book1, book2, book3, book4];

const Hero = () => {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % books.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative overflow-hidden bg-white font-poppins min-h-screen flex items-center pt-28">

            {/* ===== PREMIUM BACKGROUND ===== */}

            <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-white" />

            {/* Fine Grid */}
            <div className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(to_right,#0F2E57_1px,transparent_1px),linear-gradient(to_bottom,#0F2E57_1px,transparent_1px)] bg-[size:100px_100px]" />

            {/* Gold Glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C8A45A]/10 rounded-full blur-[120px]" />

            {/* Navy Depth */}
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0F2E57]/5 rounded-full blur-[120px]" />

            {/* Decorative Frame */}
            <div className="absolute top-36 left-24 w-28 h-28 border border-[#C8A45A]/20 rounded-3xl rotate-12" />

            {/* ===== CONTENT ===== */}

            <div className="relative mx-auto max-w-7xl w-full px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 items-center gap-20">

                    {/* LEFT CONTENT */}
                    <div>

                        <div className="inline-flex items-center gap-2 rounded-full bg-white border border-[#E7E1D5] px-6 py-2 text-xs sm:text-sm font-semibold text-[#C8A45A] uppercase tracking-widest shadow-[0_4px_20px_rgba(200,164,90,0.12)]">
                            <span className="w-2 h-2 bg-[#C8A45A] rounded-full animate-pulse" />
                            India’s Trusted Civil Services Platform
                        </div>
                        <h1 className="mt-10 text-[36px] sm:text-[52px] lg:text-[64px] leading-[1.08] font-extrabold tracking-tight text-[#111827]">
                            Build Strong <br />
                            <span className="bg-gradient-to-r from-[#B19047] via-[#C8A45A] to-[#B19047] bg-clip-text text-transparent">
                                Foundations
                            </span>
                            <br />
                            <span className="text-[#1F2937]">
                                For Civil Services.
                            </span>
                        </h1>

                        <p className="mt-8 text-lg sm:text-xl leading-relaxed text-[#6B7280] max-w-xl">
                            Premium, exam-focused learning designed to elevate preparation
                            standards — from General Studies to Governance & Current Affairs.
                            Structured for clarity. Built for rank.
                        </p>

                        <div className="mt-12 flex flex-col sm:flex-row gap-6">
                            <button className="rounded-xl bg-[#0F2E57] px-9 py-4 text-base font-semibold text-white shadow-[0_20px_60px_-15px_rgba(15,46,87,0.5)] transition-all duration-300 hover:bg-[#183D73] hover:-translate-y-1">
                                Explore Books →
                            </button>

                            <button className="rounded-xl border border-[#E7E1D5] bg-white px-9 py-4 text-base font-semibold text-[#0F2E57] shadow-sm transition-all duration-300 hover:border-[#C8A45A] hover:bg-[#F3EFE6] hover:-translate-y-1">
                                Browse Collection
                            </button>
                        </div>
                    </div>

                    {/* RIGHT SIDE BOOK */}
                    <div className="relative flex justify-center lg:justify-end items-center">

                        {/* Premium Platform */}
                        <div className="absolute bottom-8 w-[260px] h-14 bg-gradient-to-r from-[#0F2E57]/5 via-[#C8A45A]/25 to-[#0F2E57]/5 rounded-full blur-xl" />

                        {/* Back Glow */}
                        <div className="absolute w-[380px] h-[380px] bg-gradient-to-br from-[#C8A45A]/10 via-[#0F2E57]/5 to-transparent rounded-full blur-3xl" />

                        <div className="relative w-[260px] sm:w-[300px] lg:w-[320px] h-[420px] flex items-center justify-center">

                            {books.map((book, index) => {
                                const isActive = index === active;
                                return (
                                    <img
                                        key={index}
                                        src={book}
                                        alt="Civil Services Book"
                                        draggable="false"
                                        className={`absolute w-full mix-blend-multiply transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive
                                            ? "opacity-100 scale-105 translate-y-0 z-20"
                                            : "opacity-0 scale-95 translate-y-10 z-10"
                                            }`}
                                    />
                                );
                            })}

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;