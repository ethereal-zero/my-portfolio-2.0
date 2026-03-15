import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faCode, faServer, faDatabase } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";

const CV_URL =
  "https://docs.google.com/document/d/1eTkUFzqG1-aEnrIzEMl5FZczfqo8HToZ/edit?usp=sharing&ouid=117003138271770141554&rtpof=true&sd=true";

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: "smooth" });
}

function DevIllustration() {
  return (
    <div className="relative w-full max-w-[340px] mx-auto select-none">
      <div className="absolute inset-0 rounded-3xl bg-accent/10 blur-3xl scale-110 animate-pulse" />

      <div className="relative rounded-2xl border border-white/10 bg-slate-900/90 shadow-2xl backdrop-blur overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5 bg-slate-950/60">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
          <span className="ml-3 text-xs text-slate-500 font-mono">kenneth.jsx</span>
        </div>

        {/* Code */}
        <div className="p-5 font-mono text-xs leading-6 space-y-0.5">
          <div><span className="text-purple-400">const</span> <span className="text-cyan-300">developer</span> <span className="text-white">=</span> <span className="text-yellow-400">{"{"}</span></div>
          <div className="pl-4"><span className="text-green-400">name</span><span className="text-white">:</span> <span className="text-orange-300">&quot;Kenneth Candia&quot;</span><span className="text-white">,</span></div>
          <div className="pl-4"><span className="text-green-400">role</span><span className="text-white">:</span> <span className="text-orange-300">&quot;Full-Stack Developer&quot;</span><span className="text-white">,</span></div>
          <div className="pl-4"><span className="text-green-400">primary</span><span className="text-white">:</span> <span className="text-yellow-400">[</span></div>
          <div className="pl-8"><span className="text-orange-300">&quot;Laravel&quot;</span><span className="text-white">,</span> <span className="text-orange-300">&quot;Vue.js&quot;</span><span className="text-white">,</span></div>
          <div className="pl-8"><span className="text-orange-300">&quot;PHP&quot;</span><span className="text-white">,</span> <span className="text-orange-300">&quot;MySQL&quot;</span></div>
          <div className="pl-4"><span className="text-yellow-400">]</span><span className="text-white">,</span></div>
          <div className="pl-4"><span className="text-green-400">location</span><span className="text-white">:</span> <span className="text-orange-300">&quot;Philippines&quot;</span><span className="text-white">,</span></div>
          <div className="pl-4"><span className="text-green-400">available</span><span className="text-white">:</span> <span className="text-purple-400">true</span></div>
          <div><span className="text-yellow-400">{"}"}</span><span className="text-white">;</span></div>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-slate-500">▶</span>
            <span className="inline-block h-4 w-2 bg-accent/90 rounded-sm hero-blink" />
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-white/5 bg-slate-950/40 text-[10px] text-slate-500 font-mono">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            Open to opportunities
          </span>
          <span>JSX · UTF-8</span>
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute -top-3 -right-3 rounded-xl border border-white/10 bg-slate-800/90 px-3 py-1.5 text-xs font-semibold text-cyan-300 shadow-lg backdrop-blur hero-float1">
        <FontAwesomeIcon icon={faCode} className="mr-1.5" />Frontend
      </div>
      <div className="absolute -bottom-3 -left-3 rounded-xl border border-white/10 bg-slate-800/90 px-3 py-1.5 text-xs font-semibold text-violet-300 shadow-lg backdrop-blur hero-float2">
        <FontAwesomeIcon icon={faServer} className="mr-1.5" />Backend
      </div>
      <div className="absolute top-1/2 -right-5 -translate-y-1/2 rounded-xl border border-white/10 bg-slate-800/90 px-3 py-1.5 text-xs font-semibold text-emerald-300 shadow-lg backdrop-blur hero-float1" style={{ animationDelay: "1.2s" }}>
        <FontAwesomeIcon icon={faDatabase} className="mr-1.5" />Database
      </div>
    </div>
  );
}

function HeroSection() {
  const sectionRef = useRef(null);
  const illusRef = useRef(null);
  const badgeRef = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const btnsRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.25 });
      tl.from(illusRef.current, { scale: 0.75, opacity: 0, duration: 0.9, ease: "back.out(1.4)" })
        .from(badgeRef.current, { y: -16, opacity: 0, duration: 0.45, ease: "power2.out" }, "-=0.5")
        .from(nameRef.current, { x: -40, opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.35")
        .from(titleRef.current, { x: -40, opacity: 0, duration: 0.45, ease: "power3.out" }, "-=0.3")
        .from(descRef.current, { y: 18, opacity: 0, duration: 0.45, ease: "power2.out" }, "-=0.2")
        .from(btnsRef.current, { y: 18, opacity: 0, duration: 0.45, ease: "power2.out" }, "-=0.25")
        .from(statsRef.current, { y: 18, opacity: 0, duration: 0.45, ease: "power2.out" }, "-=0.2");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .hero-blink { animation: hero-blink-kf 1.1s step-end infinite; }
        @keyframes hero-blink-kf { 0%,100%{opacity:1} 50%{opacity:0} }
        .hero-float1 { animation: hero-float1-kf 4s ease-in-out infinite; }
        .hero-float2 { animation: hero-float2-kf 5s ease-in-out infinite; }
        @keyframes hero-float1-kf { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes hero-float2-kf { 0%,100%{transform:translateY(0)} 50%{transform:translateY(7px)} }
      `}</style>

      <section
        ref={sectionRef}
        className="w-full min-h-screen relative px-6 py-8 lg:py-12 border-b border-white/10 flex items-center justify-center -mt-20"
      >
        <div className="w-full mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* ── Left: text ── */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-1">

              {/* Status badge */}
              <div ref={badgeRef} className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 mb-6">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-medium text-emerald-300">Available for opportunities</span>
              </div>

              {/* Name */}
              <h1 ref={nameRef} className="text-white font-extrabold text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.1] tracking-tight">
                Kenneth <span className="text-accent">Candia</span>
              </h1>

              {/* Role */}
              <div ref={titleRef} className="flex items-center gap-2.5 mt-3 w-full justify-center lg:justify-start">
                <span className="h-px flex-1 lg:flex-none lg:w-8 max-w-[3rem] bg-accent/60" />
                <span className="text-slate-300 font-medium text-lg tracking-wide whitespace-nowrap">Full-Stack Developer</span>
                <span className="h-px flex-1 lg:hidden max-w-[3rem] bg-accent/60" />
              </div>

              {/* Description */}
              <p ref={descRef} className="mt-6 max-w-md text-slate-400 text-sm sm:text-base leading-relaxed">
                PHP · Laravel · Vue.js specialist building production-ready web platforms — from auth and payments to server deployment.
                Currently shipping at{" "}
                <span className="text-white font-medium border-b border-accent/40 pb-px">PageOne247</span>.
              </p>

              {/* Buttons */}
              <div ref={btnsRef} className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
                <button
                  type="button"
                  className="px-6 py-2.5 bg-accent text-black font-bold text-sm rounded-xl hover:opacity-90 transition shadow-lg shadow-accent/20"
                  onClick={() => window.open(CV_URL, "_blank", "noopener,noreferrer")}
                >
                  View CV
                </button>
                <button
                  type="button"
                  className="px-6 py-2.5 border border-white/15 bg-white/5 text-white text-sm font-medium rounded-xl hover:bg-white/10 transition"
                  onClick={() => scrollToSection("about")}
                >
                  About Me <FontAwesomeIcon icon={faAngleRight} className="ml-1 text-xs" />
                </button>
                <button
                  type="button"
                  className="px-6 py-2.5 border border-white/15 bg-white/5 text-white text-sm font-medium rounded-xl hover:bg-white/10 transition"
                  onClick={() => scrollToSection("projects")}
                >
                  Projects
                </button>
              </div>

              {/* Stats */}
              <div ref={statsRef} className="mt-10 flex gap-8 justify-center lg:justify-start">
                {[
                  { value: "2+", label: "Years Exp." },
                  { value: "9+", label: "Projects Built" },
                  { value: "20+", label: "Technologies" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-extrabold text-white">{s.value}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: illustration ── */}
            <div ref={illusRef} className="order-2 flex justify-center lg:justify-end">
              <DevIllustration />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
