import {
  FileText,
  AlertTriangle,
  Globe,
  Mail,
  Phone,
} from "lucide-react";

const ProductDisclaimer = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#FDFBF7] via-white to-[#F9F6EF] py-28 font-poppins">

      {/* Soft Background Glow */}
      <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-[#C8A45A]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-[#0F2E57]/5 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-10">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border border-[#E7E1D5] shadow-sm">
            <FileText className="w-4 h-4 text-[#C8A45A]" />
            <span className="text-xs tracking-[0.3em] uppercase font-semibold text-[#C8A45A]">
              Product & Liability Disclaimer
            </span>
          </div>

          <h1 className="mt-8 text-4xl sm:text-5xl font-extrabold text-[#0F2E57] leading-tight">
            Important Legal Information
          </h1>

          <p className="mt-6 text-lg text-[#6B7280] leading-relaxed max-w-3xl mx-auto">
            Please read the following disclaimers carefully before using
            our study materials and services.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-14 text-[#374151] leading-relaxed">

          {/* Product Disclaimer */}
          <div>
            <h2 className="text-2xl font-bold text-[#0F2E57] mb-4">
              Product Disclaimer
            </h2>
            <p>
              All study materials, e-books, notes, and online content available on
              <span className="font-semibold text-[#0F2E57]"> Thesgstudy.com</span>
              are original and carefully prepared by our subject experts.
            </p>

            <ul className="mt-4 space-y-3 list-disc list-inside">
              <li>Materials are for educational purposes only and do not guarantee exam success.</li>
              <li>Information may change with syllabus updates or government notifications.</li>
              <li>Images and formatting may vary due to digital or screen resolution differences.</li>
              <li>Minor typographical variations may occur during digital conversion.</li>
            </ul>
          </div>

          {/* Liability Disclaimer */}
          <div>
            <h2 className="text-2xl font-bold text-[#0F2E57] mb-4">
              Liability Disclaimer
            </h2>

            <ul className="space-y-3 list-disc list-inside">
              <li>No responsibility for indirect or consequential damages.</li>
              <li>No liability for missed deadlines or technical interruptions.</li>
              <li>Content is provided on an “as is” basis without warranties.</li>
              <li>No responsibility for disruptions due to external events or force majeure.</li>
            </ul>
          </div>

          {/* Academic Disclaimer */}
          <div>
            <h2 className="text-2xl font-bold text-[#0F2E57] mb-4">
              Academic Disclaimer
            </h2>
            <p>
              The content provided supports competitive exam preparation only.
              Users should cross-verify critical data (schemes, policies, statistics)
              with official government sources.
            </p>
            <p className="mt-3 font-medium text-[#0F2E57]">
              Thesgstudy.com is not affiliated with UPSC, any State PSC, or any government body.
            </p>
          </div>

          {/* Fraud Alert */}
          <div>
            <h2 className="text-2xl font-bold text-[#0F2E57] mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#C8A45A]" />
              Fraud Alert
            </h2>

            <p>
              Beware of unauthorized sellers, fake websites, or social media accounts
              misusing our brand name.
            </p>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#C8A45A]" />
                www.thesgstudy.com
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C8A45A]" />
                bksinha1756@gmail.com / support@thesgstudy.com
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C8A45A]" />
                +91 94252 13213 / +91 99261 97075
              </div>
            </div>

            <p className="mt-4 font-medium text-red-600">
              We are not responsible for payments made outside our official website or verified payment gateways.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ProductDisclaimer;