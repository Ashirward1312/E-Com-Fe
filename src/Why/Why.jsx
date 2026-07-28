import {
  Layers,
  GraduationCap,
  RefreshCcw,
  Wallet,
  BookOpen,
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "One Platform",
    description:
      "Access books, General Studies resources, Current Affairs, and study materials in one place.",
  },
  {
    icon: GraduationCap,
    title: "Expert Guidance",
    description:
      "Content prepared with inputs from experienced educators and subject specialists.",
  },
  {
    icon: RefreshCcw,
    title: "Updated Content",
    description:
      "Study resources designed to stay aligned with current exam trends and syllabus updates.",
  },
  {
    icon: Wallet,
    title: "Affordable Learning",
    description:
      "Quality learning resources offered at reasonable prices for students.",
  },
  {
    icon: BookOpen,
    title: "Comprehensive GS Coverage",
    description:
      "General Studies, Current Affairs, and important topics organized in one structured platform.",
  },
  {
    icon: Users,
    title: "Learning Community",
    description:
      "A space where learners can stay connected, explore resources, and continue improving together.",
  },
];

const WhyChoose = () => {
  return (
    <section className="relative overflow-hidden bg-[#F9F6EF] py-28 lg:py-36 font-poppins">

      {/* Subtle Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F9F6EF] via-white to-[#F3EFE6]" />
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#0F2E57]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#C8A45A]/10 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="max-w-[780px] mx-auto text-center">

  <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-[#E7E1D5] shadow-[0_4px_20px_rgba(200,164,90,0.08)]">
    <Sparkles className="w-4 h-4 text-[#B19047]" strokeWidth={2.5} />
    <span className="text-xs tracking-[0.22em] font-semibold uppercase text-[#B19047]">
      Why Choose IAS Veda
    </span>
  </div>

  <h2 className="mt-8 text-[32px] sm:text-[44px] lg:text-[52px] font-extrabold leading-[1.02] tracking-[-0.03em] text-[#111827]">
    Everything You Need
    <br />
    <span className="text-[#B19047]">
      To Prepare Better
    </span>
  </h2>

  <p className="mt-6 text-[17px] lg:text-[19px] leading-8 text-[#6B7280] max-w-2xl mx-auto">
    We're building a one-stop digital learning platform that makes
    General Studies preparation simpler and more organized. From
    carefully selected books to regularly updated study resources,
    our goal is to provide a{" "}
    <span className="font-semibold text-[#0F2E57]">
      better learning experience
    </span>{" "}
    for every aspirant.
  </p>


          {/* Premium Stats */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              "10+ Expert Mentors",
              "200+ Study Modules",
              "50+ Test Series",
              "100+ Registered Aspirants",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white rounded-xl border border-[#E7E1D5] shadow-sm"
              >
                <CheckCircle2
                  className="w-4 h-4 text-[#C8A45A]"
                  strokeWidth={2.5}
                />
                <span className="text-xs sm:text-sm font-semibold text-[#0F2E57] text-center">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white border border-[#E7E1D5] rounded-2xl p-10 shadow-[0_10px_40px_rgba(15,46,87,0.06)] transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(15,46,87,0.12)]"
              >
                {/* Soft Hover Glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#C8A45A]/5 to-transparent"></div>

                <div className="relative">

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-[#0F2E57]/5 flex items-center justify-center text-[#0F2E57] group-hover:bg-[#C8A45A]/10 group-hover:text-[#C8A45A] transition-all duration-300 shadow-sm">
                    <Icon size={28} strokeWidth={2} />
                  </div>

                  {/* Title */}
                  <h3 className="mt-8 text-xl font-semibold text-[#0F2E57]">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-4 text-[15px] leading-relaxed text-[#6B7280]">
                    {feature.description}
                  </p>

                  {/* Learn More */}
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#C8A45A] opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span>Learn more</span>
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <button className="group inline-flex items-center gap-3 px-10 py-4 bg-[#0F2E57] rounded-2xl text-base font-semibold text-white shadow-[0_15px_40px_rgba(15,46,87,0.2)] transition-all duration-300 hover:bg-[#183D73] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,46,87,0.3)]">
            <span>Explore All Features</span>
            <ArrowRight
              size={18}
              strokeWidth={2.5}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </button>
        </div>

      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8A45A]/50 to-transparent"></div>

    </section>
  );
};

export default WhyChoose;