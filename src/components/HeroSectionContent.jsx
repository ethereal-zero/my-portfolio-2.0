import React, { useEffect, useRef } from "react";

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: "smooth" });
}

const STACK_GROUPS = [
  { title: "Frontend", color: "text-cyan-300", items: ["React.js", "Vue.js", "JavaScript", "Tailwind CSS", "HTML5", "CSS3"] },
  { title: "Backend", color: "text-violet-300", items: ["Laravel", "Node.js", "NestJS", "Prisma ORM", "REST API Integration"] },
  { title: "Database & Cloud", color: "text-emerald-300", items: ["Supabase", "MySQL", "PostgreSQL", "SQLite", "DigitalOcean Spaces"] },
  { title: "Tools & DevOps", color: "text-orange-300", items: ["Docker", "Nginx", "Git & GitHub", "Vercel", "WordPress", "WooCommerce"] },
  { title: "Analytics & Marketing", color: "text-pink-300", items: ["Google Analytics (GA4)", "Omnisend", "Zapier"] },
];

const RESUME_URL =
  "https://docs.google.com/document/d/1eTkUFzqG1-aEnrIzEMl5FZczfqo8HToZ/edit?usp=sharing&ouid=117003138271770141554&rtpof=true&sd=true";

export default function HeroContentSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    section.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .fade-up { opacity: 0; transform: translateY(32px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .fade-up.is-visible { opacity: 1; transform: translateY(0); }
        .fade-up:nth-child(2) { transition-delay: 0.1s; }
        .fade-up:nth-child(3) { transition-delay: 0.2s; }
        .fade-up:nth-child(4) { transition-delay: 0.3s; }
        .fade-up:nth-child(5) { transition-delay: 0.4s; }
        .fade-up:nth-child(6) { transition-delay: 0.5s; }
      `}</style>
      <section ref={sectionRef} className="w-full px-4 py-16 md:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur md:p-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">

            {/* Left */}
            <div className="lg:col-span-5 fade-up">
              <span className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-300 mb-4">
                Technical Profile
              </span>
              <h2 className="text-3xl font-extrabold leading-tight text-white md:text-4xl">
                Tech stack aligned with my resume &amp; current projects
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-300 md:text-base">
                I focus on building responsive frontend experiences, reliable backend APIs, and production-ready
                deployments. This stack reflects the tools I actively use across client and integration work.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => scrollToSection("projects")}
                  className="rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-400"
                >
                  Explore Projects
                </button>
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-5 py-2.5 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/20"
                >
                  View Resume
                </a>
              </div>
            </div>

            {/* Right — stack cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
              {STACK_GROUPS.map((group, i) => (
                <div
                  key={group.title}
                  className="fade-up rounded-2xl border border-white/10 bg-slate-800/70 p-4"
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <h3 className={`text-sm font-semibold uppercase tracking-wide ${group.color}`}>{group.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="rounded-lg border border-white/10 bg-slate-900/80 px-2.5 py-1 text-xs text-slate-200">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
