import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1C33] via-[#0f2540] to-[#0B1C33] flex items-center justify-center px-6">

      {/* Glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C8A45A]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative text-center max-w-xl mx-auto">

        {/* 404 big number */}
        <div className="relative mb-6">
          <h1 className="text-[140px] md:text-[180px] font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#C8A45A] to-[#C8A45A]/20 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C8A45A] to-transparent rounded-full" />
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C8A45A]/10 border border-[#C8A45A]/30 text-[#C8A45A] text-sm font-semibold uppercase tracking-widest mb-6">
          <span className="w-2 h-2 rounded-full bg-[#C8A45A] animate-pulse" />
          Page Not Found
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-snug">
          Oops! This page doesn't exist.
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-base leading-relaxed mb-10">
          The page you are looking for might have been moved, deleted, or never
          existed. Let's get you back on track.
        </p>

        {/* Divider */}
        <div className="flex justify-center items-center gap-3 mb-10">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#C8A45A]/50 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#C8A45A] rounded-full rotate-45" />
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#C8A45A]/50 rounded-full" />
        </div>

        {/* Home Button */}
        <Link to="/">
          <button className="group inline-flex items-center gap-3 bg-[#C8A45A] hover:bg-[#b08f20] text-[#0B1C33] px-8 py-3.5 rounded-2xl font-bold text-base shadow-lg hover:shadow-[0_8px_30px_rgba(200,164,90,0.4)] transition-all duration-300">
            <svg
              className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </button>
        </Link>

        {/* Quick Links */}
        <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm">
          <Link to="/current-affairs" className="text-gray-400 hover:text-[#C8A45A] transition">
            Current Affairs
          </Link>
          <span className="text-gray-600">•</span>
          <Link to="/books" className="text-gray-400 hover:text-[#C8A45A] transition">
            Books
          </Link>
          <span className="text-gray-600">•</span>
          <Link to="/about" className="text-gray-400 hover:text-[#C8A45A] transition">
            About Us
          </Link>
          <span className="text-gray-600">•</span>
          <Link to="/contact" className="text-gray-400 hover:text-[#C8A45A] transition">
            Contact
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFound;
