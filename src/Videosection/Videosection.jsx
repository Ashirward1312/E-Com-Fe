import { useState } from "react";
import { Play, MonitorPlay, X } from "lucide-react";
import videoBg from "../Videosection/video.jpeg";

const VIDEO_ID = "VhBl3dHT5SY";

const VideoSection = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="relative bg-[#F3EFE6] py-14 font-poppins">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">

        <div className="relative rounded-[28px] overflow-hidden shadow-[0_24px_80px_rgba(15,46,87,0.18)]">

          {/* ── Background image with navy overlay ── */}
          {!playing && (
            <div className="absolute inset-0">
              <img
                src={videoBg}
                alt="Learning environment"
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay: strong navy on left, fades to reveal image on right */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0F2E57] via-[#0F2E57]/92 to-[#0F2E57]/50" />
            </div>
          )}

          {/* ── Playing state: full iframe + close button ── */}
          {playing && (
            <div className="relative">
              <iframe
                src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="IAS Veda Learning Approach"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full aspect-video"
              />
              {/* Close button */}
              <button
                onClick={() => setPlaying(false)}
                aria-label="Close video"
                className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-[#0F2E57]/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#C8A45A] hover:border-[#C8A45A] transition-all duration-300 shadow-lg group"
              >
                <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" strokeWidth={2.5} />
              </button>
            </div>
          )}

          {/* ── Content overlay (hidden when playing) ── */}
          {!playing && (
            <div className="relative z-10 grid lg:grid-cols-[1fr_auto] items-center gap-10 px-10 py-14 lg:px-16 lg:py-16">

              {/* LEFT — Text content */}
              <div className="text-white">

                {/* Featured pill */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#C8A45A] rounded-full mb-7">
                  <MonitorPlay className="w-3.5 h-3.5 text-[#0F2E57]" strokeWidth={2.5} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#0F2E57]">
                    Featured Video
                  </span>
                </div>

                <h3 className="text-[28px] sm:text-[34px] font-extrabold leading-[1.15] tracking-tight mb-4">
                  Watch Our Learning Approach
                </h3>

                <p className="text-[15px] leading-[1.8] text-white/70 max-w-md mb-8">
                  A quick overview of our platform, our learning philosophy,
                  and how we help aspirants prepare with confidence.
                </p>

              </div>

              {/* RIGHT — Play button */}
              <div className="flex justify-center lg:justify-end pr-0 lg:pr-8">
                <button
                  onClick={() => setPlaying(true)}
                  aria-label="Play video"
                  className="relative group"
                >
                  {/* Outer pulse rings */}
                  <span className="absolute inset-0 rounded-full bg-[#C8A45A]/25 animate-ping scale-150" />
                  <span className="absolute inset-0 rounded-full border-2 border-[#C8A45A]/40 scale-125" />

                  {/* Button disc */}
                  <div className="relative w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-[0_0_40px_rgba(200,164,90,0.5)] group-hover:scale-110 group-hover:bg-[#C8A45A] transition-all duration-300">
                    <Play
                      className="w-9 h-9 ml-1 text-[#0F2E57] fill-[#0F2E57] group-hover:text-white group-hover:fill-white transition-colors duration-300"
                      strokeWidth={0}
                    />
                  </div>
                </button>
              </div>

            </div>
          )}

          {/* Dot pattern decoration — top right */}
          {!playing && (
            <div className="absolute top-5 right-5 grid grid-cols-5 gap-1.5 opacity-20 z-10">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-[#C8A45A]" />
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

export default VideoSection;