import React, { useMemo, useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import ImageSlider from "./ui/ImageSlider";

const FALLBACK_IMG = "/placeholder-img.png";

const PROJECTS = [
  {
    id: 1,
    title: "Project FH",
    description: "A secure, scalable sports video platform delivering authorized live and on-demand fight content. Built with Vue and Laravel, powered by Vimeo for live streaming and DigitalOcean Spaces for media storage. Features controlled access, protected content workflows, and stable playback across devices.",
    tags: ["Vue.js", "Laravel", "Vimeo", "Stripe", "Digital Ocean Space"],
    images: ["projects/project_fh_1.png","projects/project_fh_2.png","projects/project_fh_3.png","projects/project_fh_4.png","projects/project_fh_5.png"],
    type: "Private Repository",
    category: "Streaming",
  },
  {
    id: 2,
    title: "Project MP",
    description: "A performance-focused e-commerce platform supporting muscle growth goals through high-quality formulations. Features controlled access, consistent delivery, GA4 analytics, and Omnisend email marketing integration.",
    tags: ["Vue.js", "Laravel", "Provesource", "Omnisend", "E-PATH", "GA4 Analytics"],
    images: ["projects/project_mp_1.png","projects/project_mp_2.png","projects/project_mp_3.png","projects/project_mp_4.png","projects/project_mp_5.png"],
    type: "Private Repository",
    category: "E-commerce",
  },
  {
    id: 3,
    title: "The Final Whistle",
    description: "A dynamic registration platform for youth football competitions. TFW9s celebrates young athletes through a safe, competitive environment, empowering them to learn resilience, teamwork, and sportsmanship.",
    tags: ["Vue.js", "Stripe", "Paypal", "Afterpay", "Laravel"],
    images: [],
    category: "Registration System",
  },
  {
    id: 4,
    title: "Dentabase",
    description: "A dental staffing and job-hunting platform connecting practices with qualified professionals. Simple, fast, and stress-free — one unified platform for employers and job seekers in the dental industry.",
    tags: ["Vue.js", "Leaflet", "Stripe", "Laravel"],
    images: [],
    type: "Private Repository",
    category: "Employment",
  },
  {
    id: 5,
    title: "Scholarly Hub",
    description: "A booking and scheduling system for academic institutions, streamlining reservations and resource management to reduce administrative friction for staff and students.",
    tags: ["Vue.js", "Stripe", "Laravel"],
    images: [],
    type: "Private Repository",
    category: "Booking System",
  },
  {
    id: 6,
    title: "Whole Hearted Health",
    description: "A platform for Wholehearted Health Solutions, connecting caregivers with clients who need in-home support. Focused on compassion, dignity, and independence for those needing practical home assistance.",
    tags: ["Vue.js", "Laravel"],
    images: [],
    type: "Private Repository",
    category: "Healthcare",
  },
  {
    id: 7,
    title: "ZeroBond",
    description: "A property management platform bringing tenants, landlords, and agents together in one place. Makes renting, leasing, and property management simple and stress-free.",
    tags: ["Vue.js", "PayStack", "Laravel"],
    images: [],
    type: "Private Repository",
    category: "Lease & Guarantee",
  },
  {
    id: 8,
    title: "Barterbud",
    description: "A peer-to-peer barter and trade platform enabling users to exchange goods and services without traditional monetary transactions. Built as a school project.",
    tags: ["Next.js", "Firebase", "Java"],
    images: [],
    type: "School Project",
    category: "School Project",
  },
  {
    id: 9,
    title: "Kakeibo App",
    description: "A mobile budgeting app inspired by the Japanese kakeibo method, helping users mindfully track income, expenses, and savings goals with a simple, reflective approach.",
    tags: ["Java", "Android"],
    images: [],
    type: "Class Activity",
    category: "Class Activity",
  },
];

function getCover(images) {
  if (!Array.isArray(images) || images.length === 0) return FALLBACK_IMG;
  return typeof images[0] === "string" ? images[0] : FALLBACK_IMG;
}

const CAT_COLORS = {
  "Streaming":           "bg-red-500/20 text-red-300 border-red-500/30",
  "E-commerce":          "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "Healthcare":          "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "Registration System": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Employment":          "bg-orange-500/20 text-orange-300 border-orange-500/30",
  "Booking System":      "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Lease & Guarantee":   "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  "School Project":      "bg-pink-500/20 text-pink-300 border-pink-500/30",
  "Class Activity":      "bg-slate-500/20 text-slate-300 border-slate-500/30",
};
const catColor = (c) => CAT_COLORS[c] || "bg-slate-500/20 text-slate-300 border-slate-500/30";

function DetailText({ project, index, total }) {
  return (
    <>
      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${catColor(project.category)}`}>
          {project.category}
        </span>
        {project.type && (
          <span className="rounded-full bg-slate-800 border border-slate-700 px-2.5 py-0.5 text-[10px] text-slate-400">
            {project.type}
          </span>
        )}
      </div>
      <h3 className="text-xl font-bold text-white">{project.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-300">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span key={t} className="rounded-lg border border-slate-700 bg-black/25 px-2.5 py-1 text-xs text-slate-200">{t}</span>
        ))}
      </div>
      <p className="mt-5 text-[10px] text-slate-600">Project {index + 1} of {total}</p>
    </>
  );
}

function DetailImages({ project }) {
  return <ImageSlider images={project.images || []} fit="cover" />;
}

export default function ProjectSection() {
  const list = useMemo(() => PROJECTS, []);
  const [activeIdx, setActiveIdx] = useState(0);
  const [visibleIdx, setVisibleIdx] = useState(0);

  const stripRef = useRef(null);
  const cardRefs = useRef([]);
  const textRef = useRef(null);
  const imagesRef = useRef(null);
  const headerRef = useRef(null);
  const pendingIdx = useRef(null);
  const animating = useRef(false);

  // Section entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-visible"); observer.unobserve(e.target); } }),
      { threshold: 0.05 }
    );
    [headerRef, stripRef].forEach((r) => r.current && observer.observe(r.current));
    return () => observer.disconnect();
  }, []);

  // Detect center card on strip scroll
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const onScroll = () => {
      const center = el.scrollLeft + el.clientWidth / 2;
      let closest = 0, closestDist = Infinity;
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
        if (dist < closestDist) { closestDist = dist; closest = i; }
      });
      setActiveIdx(closest);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Animate strip card scales
  useEffect(() => {
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      gsap.to(card, {
        scale: i === activeIdx ? 1 : 0.9,
        opacity: i === activeIdx ? 1 : 0.45,
        duration: 0.35,
        ease: "power2.inOut",
        overwrite: true,
      });
    });
  }, [activeIdx]);

  // Two-phase crossfade: fade out → swap → fade in
  useEffect(() => {
    if (activeIdx === visibleIdx) return;
    if (animating.current) {
      pendingIdx.current = activeIdx;
      return;
    }
    const run = (nextIdx) => {
      animating.current = true;
      const text = textRef.current;
      const images = imagesRef.current;
      gsap.to([text, images], {
        opacity: 0, y: -6, duration: 0.16, ease: "power2.in", overwrite: true,
        onComplete: () => {
          setVisibleIdx(nextIdx);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              gsap.fromTo([text, images],
                { opacity: 0, y: 8 },
                {
                  opacity: 1, y: 0, duration: 0.22, ease: "power2.out", overwrite: true,
                  onComplete: () => {
                    animating.current = false;
                    if (pendingIdx.current !== null && pendingIdx.current !== nextIdx) {
                      const queued = pendingIdx.current;
                      pendingIdx.current = null;
                      run(queued);
                    } else {
                      pendingIdx.current = null;
                    }
                  },
                }
              );
            });
          });
        },
      });
    };
    run(activeIdx);
  }, [activeIdx]); // eslint-disable-line react-hooks/exhaustive-deps

  const scrollToIdx = useCallback((idx) => {
    const el = stripRef.current;
    const card = cardRefs.current[idx];
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft - el.clientWidth / 2 + card.offsetWidth / 2, behavior: "smooth" });
    setActiveIdx(idx);
  }, []);

  const active = list[visibleIdx];

  return (
    <>
      <style>{`
        .proj-fade { opacity:0; transform:translateY(28px); transition:opacity 0.6s ease,transform 0.6s ease; }
        .proj-fade.is-visible { opacity:1; transform:translateY(0); }
        .strip-hide { -ms-overflow-style:none; scrollbar-width:none; }
        .strip-hide::-webkit-scrollbar { display:none; }
        .shimmer-skeleton {
          background: linear-gradient(90deg,
            rgba(255,255,255,0.03) 0%,
            rgba(255,255,255,0.08) 40%,
            rgba(255,255,255,0.03) 80%
          );
          background-size: 200% 100%;
          animation: shimmer 1.6s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .strip-edge-l {
          background: linear-gradient(to right,
            rgba(15, 23, 42, 0.95) 0%,
            rgba(15, 23, 42, 0.9) 20%,
            rgba(15, 23, 42, 0.6) 55%,
            rgba(15, 23, 42, 0) 100%
          );
        }
        .strip-edge-r {
          background: linear-gradient(to left,
            rgba(15, 23, 42, 0.95) 0%,
            rgba(15, 23, 42, 0.9) 20%,
            rgba(15, 23, 42, 0.6) 55%,
            rgba(15, 23, 42, 0) 100%
          );
        }
        .strip-chevron polyline {
          opacity: 0.55;
          transition: opacity 0.15s;
        }
        .strip-chevron:hover polyline { opacity: 1; }
        .strip-chevron:disabled { opacity: 0 !important; pointer-events: none; }
      `}</style>

      <section className="w-full py-16 text-slate-100">
        <div className="max-w-6xl mx-auto">

          {/* ── Section header ── */}
          <div ref={headerRef} className="proj-fade px-4 mb-10">
            <span className="inline-flex rounded-full border border-pink-400/30 bg-pink-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-pink-300 mb-3">
              Portfolio
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Projects</h2>
            <p className="mt-2 text-sm text-slate-400">
              {list.length} projects built across various industries. Use arrows or scroll to browse.
            </p>
          </div>

          {/* ── Unified project card: detail + strip + dots ── */}
          <div className="px-4">
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 shadow-2xl backdrop-blur overflow-hidden">

              {/* Detail section */}
              <div className="p-6 border-b border-white/5">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div ref={textRef}>
                    <DetailText project={active} index={visibleIdx} total={list.length} />
                  </div>
                  <div ref={imagesRef} key={active.id}>
                    <DetailImages project={active} />
                  </div>
                </div>
              </div>

              {/* Strip carousel */}
              <div className="relative py-4 px-1">

                {/* Edge fade masks */}
                <div className="pointer-events-none absolute left-0 top-0 h-full w-40 z-10 strip-edge-l" />
                <div className="pointer-events-none absolute right-0 top-0 h-full w-40 z-10 strip-edge-r" />

                {/* Prev chevron */}
                <button
                  type="button"
                  onClick={() => scrollToIdx(Math.max(0, activeIdx - 1))}
                  disabled={activeIdx === 0}
                  aria-label="Previous project"
                  className="strip-chevron absolute left-2 top-1/2 z-20 -translate-y-1/2 transition-opacity duration-200"
                >
                  <svg width="24" height="44" viewBox="0 0 24 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="18,4 6,22 18,40" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Next chevron */}
                <button
                  type="button"
                  onClick={() => scrollToIdx(Math.min(list.length - 1, activeIdx + 1))}
                  disabled={activeIdx === list.length - 1}
                  aria-label="Next project"
                  className="strip-chevron absolute right-2 top-1/2 z-20 -translate-y-1/2 transition-opacity duration-200"
                >
                  <svg width="24" height="44" viewBox="0 0 24 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="6,4 18,22 6,40" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

              {/* Dots — float inside the strip, above edge fades */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-30 pointer-events-none">
                <div className="flex gap-1.5 pointer-events-auto">
                  {list.map((_, i) => (
                    <button key={i} type="button" onClick={() => scrollToIdx(i)} aria-label={`Project ${i + 1}`}
                      className={`rounded-full transition-all duration-300 ${i === activeIdx ? "w-5 h-2 bg-accent" : "w-2 h-2 bg-slate-600/80 hover:bg-slate-400"}`}
                    />
                  ))}
                </div>
              </div>

              {/* Scrollable strip */}
                <div
                  ref={stripRef}
                  className="proj-fade flex gap-4 overflow-x-auto pb-3 strip-hide"
                  style={{
                    scrollSnapType: "x mandatory",
                    WebkitOverflowScrolling: "touch",
                    paddingLeft: "calc(50% - 8rem)",
                    paddingRight: "calc(50% - 8rem)",
                  }}
                >
                  {list.map((project, i) => (
                    <div
                      key={project.id}
                      ref={(el) => (cardRefs.current[i] = el)}
                      onClick={() => scrollToIdx(i)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === "Enter") scrollToIdx(i); }}
                      className="flex-shrink-0 cursor-pointer rounded-xl border border-slate-700/60 bg-slate-800/60 overflow-hidden"
                      style={{ scrollSnapAlign: "center", width: "16rem" }}
                    >
                      <div className="relative h-36 bg-slate-800 overflow-hidden">
                        <div className="absolute inset-0 shimmer-skeleton" />
                        <img
                          src={getCover(project.images)}
                          alt={project.title}
                          className="h-full w-full object-cover opacity-0 transition-opacity duration-500"
                          loading="lazy"
                          onLoad={(e) => { e.currentTarget.classList.remove("opacity-0"); }}
                          onError={(e) => { e.currentTarget.src = FALLBACK_IMG; e.currentTarget.classList.remove("opacity-0"); }}
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        {i === activeIdx && (
                          <div className="absolute inset-0 ring-2 ring-inset ring-accent/60 rounded-xl pointer-events-none" />
                        )}
                        <span className={`absolute bottom-2 left-2 rounded-full border px-2 py-0.5 text-[9px] font-semibold ${catColor(project.category)}`}>
                          {project.category}
                        </span>
                      </div>
                      <div className="px-3 py-2.5">
                        <p className="text-xs font-semibold text-white truncate">{project.title}</p>
                        <p className="text-[9px] text-slate-400 mt-0.5 truncate">
                          {project.tags.slice(0, 3).join(" · ")}{project.tags.length > 3 ? ` +${project.tags.length - 3}` : ""}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}
