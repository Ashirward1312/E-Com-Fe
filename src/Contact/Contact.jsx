import { useState } from "react";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

const Contact = () => {
    const whatsappNumber = "918349093453";

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const text = `Hello IAS Veda,

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}
Message: ${formData.message}`;

        window.open(
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
            "_blank"
        );

        setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-[#f8fbff] to-[#fdf9f2] pt-24 pb-20">

            <div className="max-w-6xl mx-auto px-6">

                {/* ✅ HEADER */}
                <div className="text-center mb-20 max-w-3xl mx-auto">

                    <span className="inline-block px-5 py-2 rounded-full bg-[#C8A45A]/15 text-[#C8A45A] text-xs font-semibold tracking-wider uppercase border border-[#C8A45A]/30">
                        We're Here To Help
                    </span>

                    <h1 className="mt-6 text-5xl font-extrabold text-[#0B1C33]">
                        Get In Touch
                    </h1>

                    <div className="mt-5 flex justify-center">
                        <div className="h-1 w-28 rounded-full bg-gradient-to-r from-[#0B1C33] via-[#C8A45A] to-[#1e40af]"></div>
                    </div>

                    <p className="mt-6 text-gray-600 text-lg leading-relaxed">
                        Have questions or need expert guidance?
                        Connect with our team and take the next step confidently.
                    </p>

                </div>

                <div className="grid lg:grid-cols-2 gap-14 items-start">

                    {/* ✅ FORM CARD */}
                    <div className="bg-white rounded-3xl shadow-xl border border-[#e6ecf5] p-10">

                        <div className="mb-8 text-center">
                            <h2 className="text-3xl font-bold text-[#0B1C33]">
                                Send Us A Message
                            </h2>

                            <div className="mt-3 mx-auto h-1.5 w-24 rounded-full bg-[#C8A45A]"></div>

                            <p className="mt-4 text-gray-500 text-sm">
                                Fill in your details and our team will respond shortly.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] outline-none text-sm"
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] outline-none text-sm"
                            />

                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] outline-none text-sm"
                            />

                            <textarea
                                name="message"
                                rows="4"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] outline-none text-sm"
                            />

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#0B1C33] to-[#1e40af] text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all"
                            >
                                <MessageCircle size={18} className="text-[#C8A45A]" />
                                Send Message
                            </button>

                        </form>
                    </div>

                    {/* ✅ CONTACT INFO */}
                    <div>

                        <h2 className="text-2xl font-bold text-[#0B1C33] mb-8">
                            Contact Information
                        </h2>

                        <div className="space-y-6">

                            {/* CALL */}
                            <div className="bg-white rounded-2xl shadow-md p-6 border border-[#e6ecf5] hover:shadow-xl transition">
                                <div className="flex items-center gap-5">
                                    <div className="bg-[#1e40af]/10 p-3 rounded-xl">
                                        <Phone size={20} className="text-[#1e40af]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[#0B1C33]">
                                            Call Us
                                        </h3>
                                        <a
                                            href="tel:+919926197075"
                                            className="block text-sm text-gray-600 hover:text-[#1e40af]"
                                        >
                                            +91-9926197075
                                        </a>

                                    </div>
                                </div>
                            </div>

                            {/* EMAIL */}
                            <div className="bg-white rounded-2xl shadow-md p-6 border border-[#e6ecf5] hover:shadow-xl transition">
                                <div className="flex items-center gap-5">
                                    <div className="bg-[#C8A45A]/15 p-3 rounded-xl">
                                        <Mail size={20} className="text-[#C8A45A]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[#0B1C33]">
                                            Email Us
                                        </h3>
                                        <a
                                            href="mailto:bksinha1756@gmail.com"
                                            className="block text-sm text-gray-600 hover:text-[#C8A45A]"
                                        >
                                            bksinha1756@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* VISIT */}
                            <div className="bg-white rounded-2xl shadow-md p-6 border border-[#e6ecf5] hover:shadow-xl transition">
                                <div className="flex items-center gap-5">
                                    <div className="bg-[#1e40af]/10 p-3 rounded-xl">
                                        <MapPin size={20} className="text-[#1e40af]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[#0B1C33]">
                                            Visit Us
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Raipur, Chhattisgarh, India
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* SOCIAL MEDIA */}
                            <div className="bg-white rounded-2xl shadow-md p-6 border border-[#e6ecf5] hover:shadow-xl transition">
                                <div className="flex items-start gap-5">
                                    <div className="bg-gradient-to-br from-[#833AB4]/15 to-[#FF0000]/15 p-3 rounded-xl">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: '#C13584' }}>
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-[#0B1C33] mb-3">Follow Us</h3>
                                        <div className="flex items-center gap-3">

                                            {/* YouTube */}
                                            <a
                                                href="https://www.youtube.com/channel/UCm7VmaIQOdI9oYUEUU1rrqw"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="YouTube"
                                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#FF0000]/10 hover:bg-[#FF0000]/20 border border-[#FF0000]/20 hover:border-[#FF0000]/50 transition-all duration-300 hover:scale-110"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: '#FF0000' }}>
                                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                                </svg>
                                            </a>

                                            {/* Facebook */}
                                            <a
                                                href="https://www.facebook.com/profile.php?id=61593818942274"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="Facebook"
                                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/20 hover:border-[#1877F2]/50 transition-all duration-300 hover:scale-110"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: '#1877F2' }}>
                                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                                </svg>
                                            </a>

                                            {/* Instagram */}
                                            <a
                                                href="https://www.instagram.com/ias.veda/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="Instagram"
                                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-pink-50 hover:bg-pink-100 border border-pink-200/50 hover:border-pink-400/50 transition-all duration-300 hover:scale-110"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: 'url(#igGrad2)' }}>
                                                    <defs>
                                                        <linearGradient id="igGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                                                            <stop offset="0%" stopColor="#FFDC80" />
                                                            <stop offset="25%" stopColor="#FCAF45" />
                                                            <stop offset="50%" stopColor="#F77737" />
                                                            <stop offset="75%" stopColor="#C13584" />
                                                            <stop offset="100%" stopColor="#833AB4" />
                                                        </linearGradient>
                                                    </defs>
                                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                                                </svg>
                                            </a>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* MAP */}
                            {/* <div className="rounded-2xl overflow-hidden shadow-md border border-[#e6ecf5] mt-6">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3538.7531309095048!2d81.6677299!3d21.2766435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28dd3b660224ed%3A0xd080b45f88c41562!2sGreen%20Paradise%20GPRA!5e1!3m2!1sen!2sin!4v1785911404430!5m2!1sen!2sin"
                                    width="100%"
                                    height="220"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    title="Google Map"
                                ></iframe>
                            </div> */}

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default Contact;