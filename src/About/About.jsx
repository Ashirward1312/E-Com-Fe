import { motion } from "framer-motion";
import { Book, CheckCircle2, ArrowRight } from "lucide-react";
import aboutImg from "../aboutimages/about.jpeg";

const checklist = [
  "Comprehensive GS Courses",
  "Affordable Learning Plans",
  "Expert Faculty Guidance",
  "Accessible Anytime, Anywhere",
  "Current Affairs Updates",
  "Trusted by Civil Service Aspirants",
];

const About = () => {

  return (
    <section className="relative bg-[#FFFCF7] py-20 lg:py-28 font-poppins overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9A227]/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0F172A]/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="bg-white rounded-[32px] shadow-[0_8px_40px_rgba(15,23,42,0.06)] border border-[#E8E1D4] p-8 lg:p-14">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* ──── LEFT: Image & Stats ──── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] sm:aspect-auto sm:h-[500px] w-full bg-[#0F172A]">
                
                  <>
                    <img
                      src={aboutImg}
                      alt="Students studying"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent" />
                  </>
              </div>

            </motion.div>

            {/* ──── RIGHT: Content ──── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Badge */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#0F172A] flex items-center justify-center">
                  <Book className="w-5 h-5 text-[#C9A227]" />
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[13px] font-bold tracking-[0.2em] uppercase text-[#0F172A]">
                    About Us
                  </span>
                  <div className="h-px w-10 bg-[#C9A227]" />
                </div>
              </div>

              <h2 className="text-[36px] sm:text-[44px] font-black text-[#0F172A] leading-[1.1] tracking-tight mb-6">
                Welcome to IASVeda
              </h2>

              <p className="text-[#475569] leading-relaxed mb-4">
                IASVeda is a comprehensive online learning platform dedicated to providing <strong>accessible, structured, and high-quality study resources</strong> for aspirants of <strong>national and state-level civil services examinations</strong> conducted by the <strong>Union Public Service Commission (UPSC)</strong> and <strong>State Public Service Commissions (PSCs)</strong> across India.
              </p>
              
              <p className="text-[#475569] leading-relaxed mb-8">
                Our mission is to create a <strong>centralised digital ecosystem</strong> where learners can prepare for <strong>General Studies</strong> and stay informed about the latest developments in governance, economy, geopolitics, and current affairs — all under one platform.
              </p>

              {/* Checklist Grid */}
              <div className="grid sm:grid-cols-2 gap-y-4 gap-x-6 mb-10">
                {checklist.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#C9A227] flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-[14.5px] font-medium text-[#1E293B]">{item}</span>
                  </div>
                ))}
              </div>

              {/* Button */}
              <button className="group inline-flex items-center gap-3 px-8 py-4 bg-[#0F172A] text-white rounded-xl font-semibold hover:bg-[#C9A227] transition-all duration-300 shadow-lg hover:shadow-[0_10px_30px_rgba(201,162,39,0.3)] hover:-translate-y-0.5">
                LEARN MORE
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
