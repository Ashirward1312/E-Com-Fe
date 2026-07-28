import { useState } from "react";
import { Plus, Minus, Sparkles } from "lucide-react";

const faqs = [
  {
    question: "Who can benefit from IASVeda?",
    answer:
      "Our primary audience includes UPSC and State PSC aspirants, college students, working professionals, and anyone interested in improving their general knowledge and current affairs understanding.",
  },
  {
    question: "Is IASVeda suitable for beginners?",
    answer:
      "Yes. The platform is designed to support learners at every stage — from foundational understanding to advanced exam-level preparation.",
  },
  {
    question: "Are the study resources updated regularly?",
    answer:
      "Absolutely. We keep our content aligned with the latest UPSC syllabus and recent developments in current affairs, economy, and international relations.",
  },
  {
    question: "How can I access the study material?",
    answer:
      "All materials are available online through our website. Registered users can access digital notes, PDFs, and current affairs updates anytime and from anywhere.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FDFBF7] via-white to-[#F9F6EF] py-28 font-poppins">

      {/* Soft Gold Glow */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#C8A45A]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#C8A45A]/6 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border border-[#E7E1D5] shadow-sm">
            <Sparkles className="w-4 h-4 text-[#C8A45A]" />
            <span className="text-xs tracking-[0.3em] uppercase font-semibold text-[#C8A45A]">
              FAQs
            </span>
          </div>

          <h2 className="mt-8 text-3xl sm:text-4xl font-extrabold leading-tight text-[#111827]">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about how{" "}
            <span className="font-semibold text-[#C8A45A]">IASVeda</span>{" "}
            supports your preparation journey.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-500 overflow-hidden ${
                  isOpen
                    ? "bg-white border-[#C8A45A] shadow-[0_20px_50px_rgba(200,164,90,0.15)]"
                    : "bg-white border-[#E7E1D5] hover:border-[#C8A45A]/50"
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <h3
                    className={`text-base sm:text-lg font-semibold transition-colors duration-300 ${
                      isOpen ? "text-[#111827]" : "text-[#374151]"
                    }`}
                  >
                    {faq.question}
                  </h3>

                  <span
                    className={`ml-4 transition-all duration-300 ${
                      isOpen ? "text-[#C8A45A] rotate-180" : "text-[#C8A45A]"
                    }`}
                  >
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>

                {/* Animated Answer */}
                <div
                  className={`transition-all duration-500 ease-in-out px-6 ${
                    isOpen
                      ? "max-h-40 pb-6 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-sm sm:text-[15px] leading-relaxed text-[#6B7280]">
                    {faq.answer}
                  </p>
                </div>

                {/* Subtle Gold Accent */}
                <div
                  className={`h-[2px] bg-gradient-to-r from-transparent via-[#C8A45A] to-transparent transition-opacity duration-500 ${
                    isOpen ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;