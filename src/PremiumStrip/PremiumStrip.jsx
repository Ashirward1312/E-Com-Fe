import { BookOpen, GraduationCap, ClipboardCheck, BadgeDollarSign, Layers, Users } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "All Under One Platform",
    description: "Books, study resources, current affairs, and learning tools organized in one place.",
  },
  {
    icon: GraduationCap,
    title: "Expert Guidance",
    description: "Learning resources prepared with insights from experienced educators and subject specialists.",
  },
  {
    icon: ClipboardCheck,
    title: "Updated Content",
    description: "Study materials designed to stay aligned with current syllabus and exam trends.",
  },
  {
    icon: BadgeDollarSign,
    title: "Affordable Learning",
    description: "Quality learning resources offered at reasonable prices for aspirants.",
  },
  {
    icon: Layers,
    title: "Comprehensive GS Coverage",
    description: "General Studies, Current Affairs, and important topics organized in a structured manner.",
  },
  {
    icon: Users,
    title: "Learning Community",
    description: "A supportive environment where learners can explore resources and grow together.",
  },
];

const PremiumStrip = () => {
  return (
    <section className="relative bg-white py-14 font-poppins overflow-hidden">

      {/* Ambient top light */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C8A45A]/40 to-transparent" />

      <div className="mx-auto max-w-6xl px-6 lg:px-12">

        {/* Cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 divide-x divide-y divide-[#F0EBE1] border border-[#F0EBE1] rounded-[24px] overflow-hidden shadow-[0_4px_30px_rgba(15,46,87,0.05)]">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center px-5 py-8 bg-white hover:bg-[#FDFBF7] transition-all duration-300 cursor-pointer hover:-translate-y-0.5 hover:shadow-[inset_0_-3px_0_0_#C8A45A]"
            >
              {/* Icon circle */}
              <div className="w-14 h-14 rounded-full bg-[#F9F6EF] border border-[#E7E1D5] flex items-center justify-center mb-5 group-hover:bg-[#C8A45A]/10 group-hover:border-[#C8A45A]/30 transition-all duration-300 group-hover:scale-105">
                <feature.icon
                  className="w-6 h-6 text-[#B19047] group-hover:text-[#C8A45A] transition-colors duration-300 group-hover:rotate-6 transform"
                  strokeWidth={1.75}
                />
              </div>

              {/* Title */}
              <h3 className="text-[13px] font-bold text-[#111827] mb-2 leading-snug group-hover:text-[#0F2E57] transition-colors duration-300">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-[12px] text-[#9CA3AF] leading-relaxed">
                {feature.description}
              </p>

              {/* Bottom gold bar */}
              <div className="mt-5 w-8 h-0.5 rounded-full bg-[#C8A45A]/30 group-hover:bg-[#C8A45A] group-hover:w-12 transition-all duration-300" />
            </div>
          ))}
        </div>

      </div>

      {/* Ambient bottom light */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C8A45A]/30 to-transparent" />
    </section>
  );
};

export default PremiumStrip;
