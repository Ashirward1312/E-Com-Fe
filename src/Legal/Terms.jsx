import { ShieldCheck, Mail, Phone, MapPin } from "lucide-react";

const TermsConditions = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#FDFBF7] via-white to-[#F9F6EF] py-28 font-poppins">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">

        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border border-[#E7E1D5] shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#C8A45A]" />
            <span className="text-xs tracking-[0.3em] uppercase font-semibold text-[#C8A45A]">
              Legal Information
            </span>
          </div>

          <h1 className="mt-8 text-4xl sm:text-5xl font-extrabold text-[#0F2E57] leading-tight">
            Terms & Conditions
          </h1>

          <p className="mt-6 text-lg text-[#6B7280] leading-relaxed max-w-3xl mx-auto">
            Welcome to <span className="font-semibold text-[#0F2E57]">IAS Veda</span>. 
            By accessing our website, purchasing any course, or using our services, 
            you agree to comply with the following terms and conditions.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-14 text-[#374151] leading-relaxed">

          {/* Ownership */}
          <div>
            <h2 className="text-2xl font-bold text-[#0F2E57] mb-4">Ownership & Contact Details</h2>
            <p>This website is owned and operated by:</p>
            <p className="mt-2 font-medium">IAS Veda</p>
            <p>T/9, Green Paradise, Vishal Nagar,<br/>Raipur – 492007, Chhattisgarh, India</p>
            <div className="mt-4 space-y-1 text-sm">
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#C8A45A]" /> bksinha1756@gmail.com / bksinha2801@gmail.com</div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#C8A45A]" /> +91-9926197075</div>
            </div>
          </div>

          {/* Use of Website */}
          <div>
            <h2 className="text-2xl font-bold text-[#0F2E57] mb-4">Use of Website</h2>
            <ul className="space-y-3 list-disc list-inside">
              <li>You will not misuse or attempt to compromise website security.</li>
              <li>You must be at least 16 years old or under parental supervision.</li>
              <li>Content is for lawful educational purposes only.</li>
              <li>Unauthorized reproduction or sharing of materials is prohibited.</li>
              <li>Violation may result in suspension or legal action.</li>
            </ul>
          </div>

          {/* Courses & Content */}
          <div>
            <h2 className="text-2xl font-bold text-[#0F2E57] mb-4">Courses, Materials & Content</h2>
            <p>
              We strive to keep study materials updated and aligned with UPSC and State PSC syllabus.
              However, minor updates may occur due to changes in exam patterns or notifications.
            </p>
            <p className="mt-3">
              All materials including PDFs, videos, and notes are intellectual property of 
              <span className="font-semibold"> IAS Veda</span> and are for personal learning only.
            </p>
          </div>

          {/* Pricing & Payments */}
          <div>
            <h2 className="text-2xl font-bold text-[#0F2E57] mb-4">Pricing & Payments</h2>
            <ul className="space-y-3 list-disc list-inside">
              <li>Prices may change without prior notice.</li>
              <li>Displayed price at purchase is final and includes applicable taxes.</li>
              <li>Payments processed securely via Razorpay or PhonePe.</li>
              <li>Only prepaid payments accepted (No COD).</li>
              <li>Digital access granted instantly; no refunds or transfers.</li>
            </ul>
          </div>

          {/* User Responsibilities */}
          <div>
            <h2 className="text-2xl font-bold text-[#0F2E57] mb-4">User Responsibilities</h2>
            <p>
              Users must provide accurate information during registration.
              Account sharing, duplication, or misuse may lead to suspension without refund.
            </p>
          </div>

          {/* Fraud Warning */}
          <div>
            <h2 className="text-2xl font-bold text-[#0F2E57] mb-4">Fraudulent Activities & Fake Accounts</h2>
            <p>
              Only the following are official channels:
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>Website: iasveda.com</li>
              <li>Email: bksinha1756@gmail.com / bksinha2801@gmail.com</li>
              <li>Contact: +91-9926197075</li>
            </ul>
            <p className="mt-3 text-red-600 font-medium">
              Payments made outside official channels are not our responsibility.
            </p>
          </div>

          {/* Delivery */}
          <div>
            <h2 className="text-2xl font-bold text-[#0F2E57] mb-4">Delivery of Digital Content</h2>
            <p>
              Digital materials are delivered instantly via dashboard or email after payment.
              Temporary downtime due to maintenance or technical issues may occur.
            </p>
          </div>

          {/* Liability */}
          <div>
            <h2 className="text-2xl font-bold text-[#0F2E57] mb-4">Limitation of Liability</h2>
            <p>
              IAS Veda is not responsible for indirect damages, data loss, or 
              third-party service disruptions. Content is provided for educational 
              purposes without guaranteed exam success.
            </p>
          </div>

          {/* Governing Law */}
          <div>
            <h2 className="text-2xl font-bold text-[#0F2E57] mb-4">Governing Law</h2>
            <p>
              These terms are governed by the laws of India. Any disputes shall be 
              subject to the jurisdiction of courts in Raipur, Chhattisgarh.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-2xl font-bold text-[#0F2E57] mb-4">Contact Us</h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#C8A45A]" /> bksinha1756@gmail.com / bksinha2801@gmail.com</div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#C8A45A]" /> +91-9926197075</div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#C8A45A]" /> T/9, Green Paradise, Vishal Nagar, Raipur – 492007, Chhattisgarh, India</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TermsConditions;