import { motion } from "framer-motion";
import {
    ShieldCheck,
    TreePine,
    Users,
    GraduationCap,
    BookOpen,
    Landmark,
    Globe,
    Quote,
} from "lucide-react";
import founderImg from "../aboutimages/founder.jpeg";

const badges = [
    { icon: ShieldCheck, text: "35+ Years of Experience" },
    { icon: TreePine, text: "Indian Forest Service" },
    { icon: Users, text: "Mentor & Guide" },
    { icon: Landmark, text: "Governance Expert" },
];

const education = [
    { icon: BookOpen, title: "M.Sc. Physics – Electronics", sub: "University of Allahabad" },
    { icon: TreePine, title: "AIFC Diploma, Forest Administration", sub: "Indira Gandhi National Forest Academy" },
    { icon: Landmark, title: "Public Policy & Leadership Training", sub: "IIM Bangalore" },
    { icon: Globe, title: "Mid-Career Training, Forestry & RM", sub: "UBC, Canada" },
];

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay },
});

const FounderPremium = () => {
    return (
        <section className="relative bg-[#FFFCF7] py-24 lg:py-32 font-poppins overflow-hidden">

            {/* ── ambient glows ── */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C9A227]/6 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0F172A]/5 rounded-full blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-12">

                {/* ── Section label ── */}
                <motion.div {...fadeUp(0)} className="flex justify-center mb-16">
                    <div className="inline-flex items-center gap-4 rounded-full border border-[#C9A227]/20 bg-gradient-to-r from-[#0F172A] via-[#16213E] to-[#0F172A] px-7 py-3 shadow-[0_15px_45px_rgba(15,23,42,0.35)]">

                        <div className="h-2.5 w-2.5 rounded-full bg-[#C9A227] shadow-[0_0_14px_rgba(201,162,39,0.9)]"></div>

                        <span className="text-[11px] font-semibold uppercase tracking-[0.45em] text-white">
                            OUR
                            <span className="ml-2 text-[#C9A227]">
                                FOUNDER
                            </span>
                        </span>

                        <div className="h-2.5 w-2.5 rounded-full bg-[#C9A227] shadow-[0_0_14px_rgba(201,162,39,0.9)]"></div>

                    </div>
                </motion.div>

                {/* ── Main card ── */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">

                    {/* ────────── LEFT — cinematic photo panel ────────── */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative rounded-[32px] overflow-hidden min-h-[520px] lg:min-h-0"
                    >
                        {/* Full-bleed photo */}
                        <img
                            src={founderImg}
                            alt="B.K. Sinha, IFS (Retd.)"
                            className="absolute inset-0 w-full h-full object-cover object-top"
                        />

                        {/* Cinematic gradient overlay — bottom up */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent" />

                        {/* Decorative gold rings */}
                        <div className="absolute top-8 right-8 w-32 h-32 rounded-full border border-[#C9A227]/25 pointer-events-none" />
                        <div className="absolute top-12 right-12 w-24 h-24 rounded-full border border-[#C9A227]/15 pointer-events-none" />

                        {/* Dot grid — top left */}
                        <div className="absolute top-6 left-6 grid grid-cols-4 gap-1.5 opacity-20 pointer-events-none">
                            {Array.from({ length: 16 }).map((_, i) => (
                                <div key={i} className="w-1 h-1 rounded-full bg-[#C9A227]" />
                            ))}
                        </div>

                        {/* Name overlay — bottom left */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">

                            {/* "OUR FOUNDER" pill */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9A227]/20 backdrop-blur-md border border-[#C9A227]/30 mb-5">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                                <span className="text-[10px] tracking-[0.25em] font-bold uppercase text-[#C9A227]">
                                    IASVeda Founder
                                </span>
                            </div>

                            <h2 className="text-[34px] lg:text-[40px] font-black text-white leading-[1.05] tracking-tight">
                                B.K. Sinha,
                                <br />
                                <span className="bg-gradient-to-r from-[#C9A227] to-[#E2C675] bg-clip-text text-transparent">
                                    IFS (Retd.)
                                </span>
                            </h2>

                            {/* Credential badges — horizontal */}
                            <div className="mt-6 flex flex-wrap gap-2.5">
                                {badges.map((b, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 hover:bg-white/15 hover:border-[#C9A227]/40 transition-all duration-300"
                                    >
                                        <b.icon className="w-3.5 h-3.5 text-[#C9A227] flex-shrink-0" />
                                        <span className="text-[12px] text-white/90 font-semibold">{b.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* ────────── RIGHT — bio & education ────────── */}
                    <div className="flex flex-col justify-center">

                        {/* Bio block */}
                        <motion.div {...fadeUp(0.2)} className="bg-white rounded-[28px] border border-[#E8E1D4] shadow-[0_8px_30px_rgba(15,23,42,0.05)] p-8 lg:p-10 mb-6">

                            {/* Quote icon */}
                            <div className="w-12 h-12 rounded-2xl bg-[#0F172A] flex items-center justify-center mb-6 shadow-lg">
                                <Quote className="w-5 h-5 text-[#C9A227]" strokeWidth={2} />
                            </div>

                            <p className="text-[16px] lg:text-[17px] leading-[1.9] text-[#475569]">
                                A retired officer of the{" "}
                                <strong className="text-[#0F172A]">
                                    Indian Forest Service (Chhattisgarh cadre)
                                </strong>
                                , Mr. Sinha brings over{" "}
                                <strong className="text-[#0F172A]">35 years of experience</strong>{" "}
                                in public administration, governance, and policy formulation. His
                                dedication to public service and education inspired the creation of
                                this platform to guide aspirants and learners across India.
                            </p>

                            {/* Gold accent line */}
                            <div className="mt-8 h-px bg-gradient-to-r from-[#C9A227]/40 via-[#E8E1D4] to-transparent" />
                            <p className="mt-6 text-[14px] font-semibold text-[#C9A227] italic">
                                "Empowering aspirants through structured learning and purposeful guidance."
                            </p>
                        </motion.div>

                        {/* Education header */}
                        <motion.div {...fadeUp(0.3)} className="flex items-center gap-3 px-2 mb-5">
                            <div className="w-8 h-8 rounded-lg bg-[#0F172A] flex items-center justify-center">
                                <GraduationCap className="w-4 h-4 text-[#C9A227]" />
                            </div>
                            <h4 className="text-[13px] font-bold tracking-[0.18em] uppercase text-[#0F172A]">
                                Educational Background
                            </h4>
                        </motion.div>

                        {/* Education grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {education.map((item, i) => (
                                <motion.div
                                    key={i}
                                    {...fadeUp(0.35 + i * 0.08)}
                                    className="group p-5 rounded-[20px] border border-[#E8E1D4] bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)] hover:-translate-y-1.5 hover:border-[#C9A227]/50 hover:shadow-[0_8px_24px_rgba(201,162,39,0.1)] transition-all duration-400 cursor-default"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-[#F8F5EF] border border-[#E8E1D4] flex items-center justify-center mb-4 group-hover:bg-[#0F172A] group-hover:border-[#0F172A] transition-all duration-400">
                                        <item.icon className="w-5 h-5 text-[#0F172A] group-hover:text-[#C9A227] transition-colors duration-400" strokeWidth={1.75} />
                                    </div>
                                    <h5 className="text-[13px] font-bold text-[#111827] leading-snug mb-1.5">
                                        {item.title}
                                    </h5>
                                    <p className="text-[12px] text-[#94A3B8] font-medium leading-snug">
                                        {item.sub}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default FounderPremium;