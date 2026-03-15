import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faDownload,
  faArrowRight,
  faGraduationCap,
  faBullseye,
} from "@fortawesome/free-solid-svg-icons";

const CV_URL =
  "https://docs.google.com/document/d/1eTkUFzqG1-aEnrIzEMl5FZczfqo8HToZ/edit?usp=sharing&ouid=117003138271770141554&rtpof=true&sd=true";

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: "smooth" });
}

const workExperience = [
  {
    role: "Software Developer Intern",
    company: "Infosoft Studio",
    period: "Feb 2024 – May 2024",
    periodColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    bullets: [
      "Built full-stack features using Laravel, Vue.js, and Tailwind CSS.",
      "Developed frontend components and backend logic with DB interactions and API usage.",
      "Ran SEO and performance audits with Google PageSpeed Insights and Screaming Frog.",
      "Assisted with server maintenance, backups, and troubleshooting.",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "PageOne247",
    period: "July 2024 – Present",
    periodColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    bullets: [
      "Develop and maintain full-stack web apps using Laravel, Vue.js, Tailwind CSS, and MySQL.",
      "Build and integrate RESTful APIs — auth, validation, transactions, and payment gateways.",
      "Manage deployment and server environments (Linux, SSL, DNS, name servers).",
      "Maintain legacy systems including refactoring, bug fixes, and technical support.",
    ],
  },
];

const education = {
  degree: "Bachelor of Science in Information Technology",
  school: "Holy Cross of Davao College",
};

const skillGroups = [
  {
    label: "Languages & Frameworks",
    color: "text-cyan-300",
    bar: "bg-cyan-500",
    items: [
      { name: "PHP (Laravel)", level: 90 },
      { name: "JavaScript / Vue.js", level: 88 },
      { name: "HTML5 / CSS3 / Tailwind", level: 92 },
    ],
  },
  {
    label: "Backend & APIs",
    color: "text-violet-300",
    bar: "bg-violet-500",
    items: [
      { name: "RESTful APIs", level: 88 },
      { name: "Authentication & Transactions", level: 85 },
      { name: "Payment Integrations", level: 80 },
      { name: "MySQL & Data Modeling", level: 85 },
    ],
  },
  {
    label: "DevOps & Servers",
    color: "text-orange-300",
    bar: "bg-orange-500",
    items: [
      { name: "Linux (Ubuntu/WSL)", level: 78 },
      { name: "SSL / DNS / Deployment", level: 80 },
      { name: "Docker", level: 72 },
      { name: "Git & GitHub", level: 90 },
    ],
  },
  {
    label: "Tools & Others",
    color: "text-pink-300",
    bar: "bg-pink-500",
    items: [
      { name: "Figma", level: 75 },
      { name: "Google PageSpeed / Screaming Frog", level: 80 },
      { name: "WordPress", level: 65 },
    ],
  },
];

const BADGE_STACK = [
  { name: "PHP", bg: "bg-violet-500/15 border-violet-500/30 text-violet-300" },
  { name: "Laravel", bg: "bg-red-500/15 border-red-500/30 text-red-300" },
  { name: "Vue.js", bg: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300" },
  { name: "JavaScript", bg: "bg-yellow-500/15 border-yellow-500/30 text-yellow-300" },
  { name: "HTML5", bg: "bg-orange-500/15 border-orange-500/30 text-orange-300" },
  { name: "CSS3", bg: "bg-blue-500/15 border-blue-500/30 text-blue-300" },
  { name: "Tailwind CSS", bg: "bg-cyan-500/15 border-cyan-500/30 text-cyan-300" },
  { name: "MySQL", bg: "bg-orange-500/15 border-orange-500/30 text-orange-300" },
  { name: "Linux", bg: "bg-slate-500/15 border-slate-500/30 text-slate-300" },
  { name: "Docker", bg: "bg-blue-500/15 border-blue-500/30 text-blue-300" },
  { name: "Git & GitHub", bg: "bg-orange-500/15 border-orange-500/30 text-orange-400" },
  { name: "Figma", bg: "bg-pink-500/15 border-pink-500/30 text-pink-300" },
  { name: "React", bg: "bg-cyan-500/15 border-cyan-500/30 text-cyan-300" },
  { name: "Next.js", bg: "bg-slate-500/15 border-slate-500/30 text-slate-200" },
  { name: "Bootstrap", bg: "bg-violet-500/15 border-violet-500/30 text-violet-300" },
  { name: "Firebase", bg: "bg-yellow-500/15 border-yellow-500/30 text-yellow-300" },
  { name: "Java / Android", bg: "bg-red-500/15 border-red-500/30 text-red-300" },
  { name: "C#", bg: "bg-violet-500/15 border-violet-500/30 text-violet-200" },
  { name: "WordPress", bg: "bg-blue-500/15 border-blue-500/30 text-blue-300" },
  { name: "Supabase", bg: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300" },
];

function SkillBar({ name, level, barColor, staggerDelay }) {
  const wrapRef = useRef(null);
  const barRef = useRef(null);
  const countRef = useRef(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || triggered.current) return;
        triggered.current = true;
        observer.disconnect();

        const baseDelay = staggerDelay || 0;

        // Animate the bar width
        setTimeout(() => {
          if (barRef.current) {
            barRef.current.style.width = `${level}%`;
          }
        }, baseDelay);

        // Animate the counter number 0 → level
        let start = null;
        const duration = 900;
        const step = (ts) => {
          if (!start) start = ts + baseDelay;
          const elapsed = ts - start;
          if (elapsed < 0) { requestAnimationFrame(step); return; }
          const progress = Math.min(elapsed / duration, 1);
          // ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * level);
          if (countRef.current) countRef.current.textContent = `${current}%`;
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [level, staggerDelay]);

  return (
    <div ref={wrapRef} className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="text-xs text-slate-300">{name}</span>
        <span ref={countRef} className="text-xs font-mono text-slate-400">0%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-slate-700/60 overflow-hidden">
        <div
          ref={barRef}
          className={`h-full rounded-full ${barColor}`}
          style={{
            width: "0%",
            transition: `width 900ms cubic-bezier(0.25, 1, 0.5, 1) ${staggerDelay || 0}ms`,
          }}
        />
      </div>
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("is-visible"); observer.unobserve(e.target); }
        }),
      { threshold: 0.05 }
    );
    section.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .fade-in { opacity:0; transform:translateY(26px); transition:opacity 0.6s ease,transform 0.6s ease; }
        .fade-in.is-visible { opacity:1; transform:translateY(0); }
      `}</style>

      <section ref={sectionRef} className="w-full px-4 py-16 text-slate-100">
        <div className="max-w-5xl mx-auto">

          {/* ── Heading ── */}
          <div className="fade-in mb-12">
            <span className="inline-flex rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-violet-300 mb-3">
              About Me
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Kenneth I. Candia</h2>
            <p className="mt-1.5 text-slate-400 text-sm">Full-Stack Developer · Davao City · kenchicken0118@gmail.com</p>
          </div>

          {/* ── Objective + Education ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-14">
            <article className="fade-in rounded-2xl border border-slate-700/50 bg-slate-900/70 p-6" style={{ transitionDelay: "0.05s" }}>
              <h3 className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                <FontAwesomeIcon icon={faBullseye} className="text-accent" /> Objective
              </h3>
              <p className="text-sm leading-relaxed text-slate-300">
                To obtain a challenging role that allows me to utilize my skills, grow professionally, and add value
                through dedication and continuous improvement.
              </p>
            </article>

            <article className="fade-in rounded-2xl border border-slate-700/50 bg-slate-900/70 p-6" style={{ transitionDelay: "0.1s" }}>
              <h3 className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                <FontAwesomeIcon icon={faGraduationCap} className="text-accent" /> Education
              </h3>
              <p className="text-white text-sm font-semibold">{education.degree}</p>
              <p className="text-slate-400 text-xs mt-0.5">{education.school}</p>
            </article>
          </div>

          {/* ── Work Experience ── */}
          <div className="fade-in mb-6" style={{ transitionDelay: "0.12s" }}>
            <h3 className="flex items-center gap-2 text-lg font-bold text-white">
              <FontAwesomeIcon icon={faBriefcase} className="text-accent text-sm" />
              Work Experience
            </h3>
            <p className="text-slate-500 text-xs mt-1">Roles held at PageOne247.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
            {workExperience.map((w, i) => (
              <article
                key={w.role}
                className="fade-in rounded-2xl border border-slate-700/50 bg-slate-900/70 p-6"
                style={{ transitionDelay: `${0.15 + i * 0.08}s` }}
              >
                <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-semibold mb-3 ${w.periodColor}`}>
                  {w.period}
                </span>
                <h4 className="text-sm font-semibold text-white">{w.role}</h4>
                <p className="text-xs text-accent/80 mb-4">{w.company}</p>
                <ul className="space-y-2">
                  {w.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2 text-xs text-slate-300 leading-relaxed">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent/60" />
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {/* ── Skills ── */}
          <div className="fade-in mb-6" style={{ transitionDelay: "0.22s" }}>
            <h3 className="text-lg font-bold text-white">Skills</h3>
            <p className="text-slate-500 text-xs mt-1">Proficiency across core technical areas.</p>
          </div>

          <div className="fade-in grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14" style={{ transitionDelay: "0.26s" }}>
            {skillGroups.map((group) => (
              <div key={group.label} className="rounded-2xl border border-slate-700/50 bg-slate-900/70 p-5">
                <h4 className={`text-[10px] font-semibold uppercase tracking-widest mb-4 ${group.color}`}>{group.label}</h4>
                {group.items.map((item, i) => (
                  <SkillBar key={item.name} name={item.name} level={item.level} barColor={group.bar} staggerDelay={i * 120} />
                ))}
              </div>
            ))}
          </div>

          {/* ── Full tech stack chips ── */}
          <div className="fade-in mb-4" style={{ transitionDelay: "0.3s" }}>
            <h3 className="text-lg font-bold text-white">Full Tech Stack</h3>
            <p className="text-slate-500 text-xs mt-1">Every technology across all projects.</p>
          </div>

          <div className="fade-in rounded-2xl border border-slate-700/50 bg-slate-900/70 p-6" style={{ transitionDelay: "0.34s" }}>
            <div className="flex flex-wrap gap-2">
              {BADGE_STACK.map((t) => (
                <span key={t.name} className={`rounded-full border px-3.5 py-1.5 text-xs font-medium ${t.bg}`}>
                  {t.name}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3 border-t border-white/5 pt-5">
              <button
                type="button"
                onClick={() => scrollToSection("projects")}
                className="flex items-center gap-1.5 rounded-full border border-slate-700 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-white/10 transition"
              >
                View Projects <FontAwesomeIcon icon={faArrowRight} />
              </button>
              <a
                href={CV_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-4 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/30 transition"
              >
                <FontAwesomeIcon icon={faDownload} /> Download CV
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
