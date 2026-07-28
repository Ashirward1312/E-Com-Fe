import {
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#FDFBF7] via-white to-[#F9F6EF] py-28 font-poppins">

      {/* Soft Background Glow */}
      <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-[#C8A45A]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-[#0F2E57]/5 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-10">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border border-[#E7E1D5] shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#C8A45A]" />
            <span className="text-xs tracking-[0.3em] uppercase font-semibold text-[#C8A45A]">
              Privacy Policy
            </span>
          </div>

          <h1 className="mt-8 text-4xl sm:text-5xl font-extrabold text-[#0F2E57] leading-tight">
            Your Privacy Matters to Us
          </h1>

          <p className="mt-6 text-lg text-[#6B7280] leading-relaxed max-w-3xl mx-auto">
            Welcome to <span className="font-semibold text-[#0F2E57]">Thesgstudy.com</span>. 
            We are committed to protecting your personal information and ensuring 
            transparency in how we collect, use, and safeguard your data.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-14 text-[#374151] leading-relaxed">

          {/* Ownership */}
          <div>
            <h2 className="text-2xl font-bold text-[#0F2E57] mb-4">
              Ownership & Contact Details
            </h2>
            <p className="font-medium">Thesgstudy.com</p>
            <p>
              T/9, Green Paradise, Vishal Nagar,<br />
              Raipur – 492007, Chhattisgarh, India
            </p>
            <div className="mt-4 space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C8A45A]" />
                bksinha1756@gmail.com / bksinha2801@gmail.com
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C8A45A]" />
                +91 94252 13213 / +91 99261 97075
              </div>
            </div>
          </div>

          {/* Information Collected */}
          <div>
            <h2 className="text-2xl font-bold text-[#0F2E57] mb-4">
              Information We Collect
            </h2>

            <ul className="space-y-4 list-disc list-inside">
              <li>
                <strong>Personal Information:</strong> Name, email address,
                contact number, and registration details.
              </li>
              <li>
                <strong>Payment Information:</strong> Processed securely via
                authorized partners. We do not store card details.
              </li>
              <li>
                <strong>Usage Data:</strong> IP address, browser type, device
                information, and page interactions.
              </li>
              <li>
                <strong>Cookies:</strong> Used to improve website performance
                and personalize user experience.
              </li>
            </ul>
          </div>

          {/* Use of Information */}
          <div>
            <h2 className="text-2xl font-bold text-[#0F2E57] mb-4">
              Use of Information
            </h2>
            <ul className="space-y-3 list-disc list-inside">
              <li>Provide access to courses and user accounts.</li>
              <li>Process transactions and send enrollment updates.</li>
              <li>Improve website and learning experience.</li>
              <li>Send newsletters and exam updates (opt-out anytime).</li>
              <li>Prevent fraud and unauthorized access.</li>
            </ul>
            <p className="mt-4 font-medium text-[#0F2E57]">
              We do not sell, rent, or trade your personal data.
            </p>
          </div>

          {/* Data Security */}
          <div>
            <h2 className="text-2xl font-bold text-[#0F2E57] mb-4">
              Data Security
            </h2>
            <p>
              We implement administrative, technical, and physical safeguards
              to protect your data. All transactions are processed via
              SSL-encrypted channels through trusted payment gateways such as
              Razorpay or PhonePe.
            </p>
          </div>

          {/* Third Party */}
          <div>
            <h2 className="text-2xl font-bold text-[#0F2E57] mb-4">
              Third-Party Services
            </h2>
            <p>
              We may use third-party analytics, hosting, or payment providers
              to operate efficiently. These providers access only necessary data
              and are obligated to protect it.
            </p>
          </div>

          {/* User Rights */}
          <div>
            <h2 className="text-2xl font-bold text-[#0F2E57] mb-4">
              Your Rights
            </h2>
            <ul className="space-y-3 list-disc list-inside">
              <li>Access, correct, or update your personal data.</li>
              <li>Request deletion of your account (subject to verification).</li>
              <li>Opt out of promotional communications anytime.</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, email us at{" "}
              <span className="font-semibold text-[#0F2E57]">
                support@thesgstudy.com
              </span>.
            </p>
          </div>

          {/* Governing Law */}
          <div>
            <h2 className="text-2xl font-bold text-[#0F2E57] mb-4">
              Governing Law
            </h2>
            <p>
              This Privacy Policy is governed by the laws of India. All disputes
              shall fall under the jurisdiction of Raipur, Chhattisgarh courts.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-2xl font-bold text-[#0F2E57] mb-4">
              Contact Us
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C8A45A]" />
                support@thesgstudy.com
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

export default PrivacyPolicy;