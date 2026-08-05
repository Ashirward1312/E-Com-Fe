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
                                        <a href="tel:+918349093453" className="block text-sm text-gray-600 hover:text-[#1e40af]">
                                            +91 8349093453
                                        </a>
                                        <a href="tel:+917722811409" className="block text-sm text-gray-600 hover:text-[#1e40af]">
                                            +91 7722811409
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
                                            Green Paradise GPRA,
                                            <br />
                                            Raipur, Chhattisgarh
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* MAP */}
                            <div className="rounded-2xl overflow-hidden shadow-md border border-[#e6ecf5] mt-6">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3538.7531309095048!2d81.6677299!3d21.2766435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28dd3b660224ed%3A0xd080b45f88c41562!2sGreen%20Paradise%20GPRA!5e1!3m2!1sen!2sin!4v1785911404430!5m2!1sen!2sin"
                                    width="100%"
                                    height="220"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    title="Google Map"
                                ></iframe>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default Contact;