import { Link } from "react-router-dom";
import { BookOpen, Mail, Phone, MapPin, ChevronRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const exploreLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Books", path: "/books" },
    { name: "Blog", path: "/blogs" },
  ];

  const quickLinks = [
    { name: "Terms & Conditions", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Refund Policy", path: "/refund" },
    { name: "Disclaimer", path: "/disclaimer" },
  ];

  return (
    <footer className="bg-[#0B1C33] pt-20 pb-8 font-poppins relative overflow-hidden border-t border-white/10">
      
      {/* ── Background Elements ── */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C8A45A]/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0F2E57] rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* ────────── Brand Column ────────── */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group cursor-pointer mb-6 inline-flex">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1E3A6B] via-[#0F2E57] to-[#081426] flex items-center justify-center shadow-[0_0_20px_rgba(15,46,87,0.6)] transition-all duration-500 group-hover:scale-105">
                <BookOpen className="w-5 h-5 text-[#C8A45A]" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                IAS<span className="text-[#C8A45A]"> Veda</span>
              </span>
            </Link>
            
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              A comprehensive digital learning ecosystem for UPSC and State PSC aspirants. Prepare with clarity, consistency, and purpose.
            </p>
          </div>

          {/* ────────── Explore Links ────────── */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
              Explore
            </h4>
            <ul className="space-y-3.5">
              {exploreLinks.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.path}
                    className="group flex items-center text-sm text-white/60 hover:text-[#C8A45A] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 mr-1.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ────────── Quick / Legal Links ────────── */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
              Quick Links
            </h4>
            <ul className="space-y-3.5">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.path}
                    className="group flex items-center text-sm text-white/60 hover:text-[#C8A45A] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 mr-1.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ────────── Contact Info ────────── */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">
              Contact Info
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/60 group hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-[#C8A45A] mt-1 flex-shrink-0" />
                <div className="flex flex-col">
                  <span>+91-9926197075</span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/60 group hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-[#C8A45A] mt-1 flex-shrink-0" />
                <div className="flex flex-col">
                  <a href="mailto:bksinha1756@gmail.com" className="hover:text-[#C8A45A] transition-colors">bksinha1756@gmail.com</a>
                  <a href="mailto:bksinha2801@gmail.com" className="hover:text-[#C8A45A] transition-colors mt-0.5">bksinha2801@gmail.com</a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/60 group hover:text-white transition-colors">
                <MapPin className="w-4 h-4 text-[#C8A45A] mt-1 flex-shrink-0" />
                <span>
                  T/9, Green Paradise, Vishal Nagar,<br />
                  Raipur – 492007, Chhattisgarh, India
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* ────────── Bottom Bar ────────── */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          
          <p className="text-white/40 text-xs text-center md:text-left flex-1">
            &copy; {currentYear} IASVeda. All rights reserved.
          </p>

          <p className="text-white/40 text-xs text-center flex-1">
            Designed & Developed by <a href="https://spadvertising.in/" target="_blank" rel="noopener noreferrer" className="text-[#C8A45A] hover:text-white transition-colors font-semibold">SP Advertising</a>
          </p>

          <div className="flex items-center justify-center md:justify-end gap-6 flex-1">
            <Link to="/terms" className="text-white/40 hover:text-white text-xs transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="text-white/40 hover:text-white text-xs transition-colors">Privacy Policy</Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
