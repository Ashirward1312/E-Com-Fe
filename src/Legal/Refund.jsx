import {
  Mail,
  Phone,
  MapPin,
  FileText,
} from "lucide-react";

const RefundPolicy = () => {
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
              Refund Policy
            </span>
          </div>

          <h1 className="mt-8 text-4xl sm:text-5xl font-extrabold text-[#0F2E57] leading-tight">
            General Policy & Refund Guidelines
          </h1>

          <p className="mt-6 text-lg text-[#6B7280] leading-relaxed max-w-3xl mx-auto">
            At <span className="font-semibold text-[#0F2E57]">Thesgstudy.com</span>, 
            we are committed to delivering high-quality digital study resources.
            Due to the digital nature of our products, all sales are final.
          </p>
        </div>

        {/* Policy Content */}
        <div className="space-y-14 text-[#374151] leading-relaxed">

          {/* General Policy */}
          <div>
            <h2 className="text-2xl font-bold text-[#0F2E57] mb-4">
              General Policy
            </h2>
            <p>
              Once access to study materials (PDFs, e-books, notes, or online content)
              has been granted, it cannot be cancelled, refunded, or transferred.
              We strongly advise users to review course descriptions carefully
              before purchase.
            </p>
          </div>

          {/* Exceptions */}
          <div>
            <h2 className="text-2xl font-bold text-[#0F2E57] mb-4">
              Exceptions (Refunds / Access Corrections Allowed)
            </h2>

            <ul className="space-y-4 list-disc list-inside">
              <li>
                <strong>Duplicate Payment:</strong> Refund within 7–10 business days after verification.
              </li>
              <li>
                <strong>Technical Access Issues:</strong> If content fails due to system error
                and cannot be resolved within 3 working days.
              </li>
              <li>
                <strong>Wrong Course Purchase (Within 24 Hours):</strong> If not accessed or downloaded.
              </li>
            </ul>
          </div>

          {/* Non Refundable */}
          <div>
            <h2 className="text-2xl font-bold text-[#0F2E57] mb-4">
              Non-Refundable Situations
            </h2>

            <ul className="space-y-3 list-disc list-inside">
              <li>Material already accessed or downloaded.</li>
              <li>Change of mind after purchase.</li>
              <li>Misunderstanding about course content.</li>
              <li>Exam schedule delays or personal preparation changes.</li>
              <li>Internet issues or user device malfunction.</li>
              <li>Unauthorized sharing or misuse of content.</li>
            </ul>
          </div>

          {/* Claim Procedure */}
          <div>
            <h2 className="text-2xl font-bold text-[#0F2E57] mb-4">
              Claim Procedure
            </h2>

            <p>
              To request a refund review or access correction, contact us with:
            </p>

            <ul className="mt-3 space-y-3 list-disc list-inside">
              <li>Registered Email ID / Phone Number</li>
              <li>Payment Receipt or Transaction ID</li>
              <li>Description of the issue (with screenshots if applicable)</li>
            </ul>

            <p className="mt-4">
              Our team will respond within 2–3 working days.
            </p>
          </div>

          {/* Timeline */}
          <div>
            <h2 className="text-2xl font-bold text-[#0F2E57] mb-4">
              Refund Timeline
            </h2>
            <ul className="space-y-3 list-disc list-inside">
              <li>Approved refunds credited within 7–10 business days.</li>
              <li>Replacement access resolved within 3–5 working days.</li>
            </ul>
          </div>

          {/* Important Note */}
          <div>
            <h2 className="text-2xl font-bold text-[#0F2E57] mb-4">
              Important Note
            </h2>
            <p>
              Thesgstudy.com reserves the right to decline refund requests that
              do not meet the conditions mentioned above. All purchases imply
              agreement with this no-cancellation and no-refund policy.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-2xl font-bold text-[#0F2E57] mb-4">
              Contact Information
            </h2>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C8A45A]" />
                support@thesgstudy.com / bksinha1756@gmail.com
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C8A45A]" />
                +91 94252 13213 / +91 99261 97075
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C8A45A]" />
                T/9, Green Paradise, Vishal Nagar, Raipur – 492007, Chhattisgarh, India
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RefundPolicy;