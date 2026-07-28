import { motion } from "framer-motion";
import {
  Target,
  Compass,
  CheckCircle2,
  TrendingUp,
  Users,
  BookOpen,
  Lightbulb,
} from "lucide-react";

const missionPoints = [
  "Structured and syllabus-aligned General Studies resources",
  "Connect learners with experienced educators and quality content",
  "Encourage analytical thinking through updated study materials",
  "Build a collaborative learning environment",
  "Make quality education affordable and accessible through digital learning",
];

const VisionMission = () => {
  return (
    <section className="relative overflow-hidden bg-[#FFFCF7] font-poppins">
      {/* ── Subtle ambient glows ── */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#C9A227]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0F172A]/5 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-10 lg:px-16 py-24 lg:py-32">
        {/* ──────────────── HEADER ──────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          {/* Pill label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-[#E8E1D4] shadow-sm mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
            <span className="text-[11px] tracking-[0.22em] font-bold uppercase text-[#C9A227]">
              Our Purpose
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[42px] sm:text-[54px] lg:text-[66px] font-black leading-[0.95] tracking-[-0.04em] text-[#0F172A]"
          >
            Purpose-Driven
            <br />
            <span className="bg-gradient-to-r from-[#C9A227] to-[#E2C675] bg-clip-text text-transparent">
              Learning.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 text-[16px] sm:text-[18px] leading-[1.8] text-[#6B7280] max-w-xl mx-auto font-medium"
          >
            We aim to make civil services preparation more structured,
            accessible, and meaningful through carefully designed resources.
          </motion.p>
        </div>

        {/* ──────────────── TWO CARDS ──────────────── */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* ── MISSION CARD ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group relative bg-white/80 backdrop-blur-xl rounded-[28px] border border-[#E8E1D4] shadow-[0_8px_40px_rgba(15,23,42,0.04)] p-9 lg:p-12 overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all duration-500"
          >
            {/* Subtle hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#C9A227]/5 to-transparent opacity-0 group-hover:opacity-100 rounded-[28px] transition-opacity duration-500" />

            <div className="relative">
              {/* Icon header */}
              <div className="flex items-center gap-5 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#0F172A] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <Target className="w-6 h-6 text-[#C9A227]" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-[26px] font-black text-[#0F172A] tracking-tight leading-tight">
                    Mission
                  </h3>
                </div>
              </div>

              {/* Checklist */}
              <ul className="space-y-4">
                {missionPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle2
                      className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-0.5"
                      strokeWidth={2.5}
                    />
                    <span className="text-[15px] leading-[1.7] text-[#475569] font-medium">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* ── VISION CARD ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group relative bg-white/80 backdrop-blur-xl rounded-[28px] border border-[#E8E1D4] shadow-[0_8px_40px_rgba(15,23,42,0.04)] p-9 lg:p-12 overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all duration-500"
          >
            {/* Subtle hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/3 to-transparent opacity-0 group-hover:opacity-100 rounded-[28px] transition-opacity duration-500" />

            <div className="relative">
              {/* Icon header */}
              <div className="flex items-center gap-5 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C9A227] to-[#B89322] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <Compass className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-[26px] font-black text-[#0F172A] tracking-tight leading-tight">
                    Vision
                  </h3>
                </div>
              </div>

              {/* Quote block */}
              <div className="relative pl-6 border-l-2 border-[#C9A227]/30 mb-10">
                <p className="text-[16px] leading-[1.8] text-[#475569] italic font-medium">
                  We aspire to build a trusted platform where quality education,
                  thoughtful guidance, and accessible learning resources empower
                  students to prepare with clarity while contributing to a
                  knowledgeable and responsible society.
                </p>
              </div>

              {/* Pillars */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: BookOpen, label: "Expert Resources" },
                  { icon: TrendingUp, label: "Continuous Growth" },
                  { icon: Users, label: "Community Learning" },
                  { icon: Lightbulb, label: "Critical Thinking" },
                ].map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#F8F5EF] border border-[#E8E1D4] hover:border-[#C9A227]/40 transition-all duration-300"
                  >
                    <p.icon className="w-4 h-4 text-[#C9A227]" strokeWidth={2.5} />
                    <span className="text-[13px] font-bold text-[#0F172A]">
                      {p.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;