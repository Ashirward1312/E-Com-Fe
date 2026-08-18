import { MonitorPlay } from "lucide-react";
import videoBg from "../Videosection/video.jpeg";

const VideoSection = () => {

  return (
    <section className="relative bg-[#F3EFE6] py-14 font-poppins">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">

        <div className="relative rounded-[28px] overflow-hidden shadow-[0_24px_80px_rgba(15,46,87,0.18)]">

          {/* ── Background image with navy overlay ── */}
          <div className="absolute inset-0">
            <img
              src={videoBg}
              alt="Learning environment"
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay: strong navy on left, fades to reveal image on right */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F2E57] via-[#0F2E57]/92 to-[#0F2E57]/50" />
          </div>

          {/* ── Content overlay ── */}
          <div className="relative z-10 grid lg:grid-cols-[1fr_auto] items-center gap-10 px-10 py-14 lg:px-16 lg:py-16">
            {/* LEFT — Text content */}
            <div className="text-white">
              {/* Featured pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#C8A45A] rounded-full mb-7">
                <MonitorPlay className="w-3.5 h-3.5 text-[#0F2E57]" strokeWidth={2.5} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0F2E57]">
                  Featured Content
                </span>
              </div>

              <h3 className="text-[28px] sm:text-[34px] font-extrabold leading-[1.15] tracking-tight mb-4">
                Our Learning Approach
              </h3>

              <p className="text-[15px] leading-[1.8] text-white/70 max-w-md mb-8">
                A quick overview of our platform, our learning philosophy,
                and how we help aspirants prepare with confidence.
              </p>
            </div>
          </div>

          {/* Dot pattern decoration — top right */}
          <div className="absolute top-5 right-5 grid grid-cols-5 gap-1.5 opacity-20 z-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-[#C8A45A]" />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default VideoSection;