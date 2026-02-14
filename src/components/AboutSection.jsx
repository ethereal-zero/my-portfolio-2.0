import React from "react";
import { NavLink } from 'react-router-dom';

const aboutContent = {
  headline: "About",
  subtitle: "A quick snapshot of who I am, what I’ve worked on, and what I build with.",
  introTitle: "General Information",
  introDescription:
    "Hi, I’m Kenneth Candia, a full-stack developer with hands-on experience building production-ready web applications, admin systems, and media-driven platforms. I’ve worked on real-world projects ranging from streaming platforms and business dashboards to scalable web solutions. I focus on clean user experiences, reliable backends, and systems that are built to scale.",
  focusTitle: "What I Focus On",
  focusDescription:
    "I enjoy building systems that balance usability, performance, and scalability. My approach is to keep code maintainable, interfaces intuitive, and integrations reliable—so the product stays stable as it grows.",
};

const workExperience = [
  {
    role: "Work Immersion",
    company: "Magsige MPC",
    period: "Early Career Experience",
    highlight:
      "Gained early exposure to professional workflows and real-world business processes.",
  },
  {
    role: "Full Stack Developer Intern",
    company: "PageOne247",
    period: "Feb 2024 – May 2024",
    highlight:
      "Built and maintained full-stack features, collaborated with the team, and contributed to production systems.",
  },
  {
    role: "Junior Full Stack Developer",
    company: "PageOne247",
    period: "2024 – Present",
    highlight:
      "Build and maintain production web applications, integrate third-party services, and improve performance and usability.",
  },
];

const techStack = [
  "React",
  "Vue",
  "Laravel",
  "TailwindCSS",
  "JavaScript",
  "PHP",
  "Supabase",
  "MySQL",
  "REST APIs",
  "Vimeo",
  "DigitalOcean Spaces",
  "Docker",
  "Git",
  "Figma",
];

  const handleOpenCV = () => {
    window.open(
      "https://docs.google.com/document/d/1eTkUFzqG1-aEnrIzEMl5FZczfqo8HToZ/edit?usp=sharing&ouid=117003138271770141554&rtpof=true&sd=true",
      "_blank",
      "noopener,noreferrer"
    );
  };

export default function AboutPage() {
  return (
    <section className="w-full px-6 py-6 text-slate-100">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {aboutContent.headline}
          </h1>
          <p className="mt-2 max-w-4xl text-sm leading-relaxed text-slate-300 sm:text-base">
            {aboutContent.subtitle}
          </p>
        </div>
      </div>

      {/* Intro + Focus */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 shadow-lg">
          <div className="p-6">
            <h2 className="text-xl font-semibold leading-tight sm:text-2xl">
              {aboutContent.introTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              {aboutContent.introDescription}
            </p>
          </div>
        </article>

        <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 shadow-lg">
          <div className="p-6">
            <h2 className="text-xl font-semibold leading-tight sm:text-2xl">
              {aboutContent.focusTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              {aboutContent.focusDescription}
            </p>
          </div>
        </article>
      </div>

      {/* Work Experience */}
      <div className="mt-10">
        <div className="mb-5">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Work Experience
          </h2>
          <p className="mt-2 max-w-4xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Roles I’ve taken and the kind of impact I aim to deliver.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {workExperience.map((w) => (
            <article
              key={`${w.role}-${w.company}`}
              className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 shadow-lg"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold leading-tight sm:text-xl">
                  {w.role}
                </h3>
                <p className="mt-1 text-sm text-slate-300 sm:text-base">{w.company}</p>

                <div className="mt-4 flex items-center gap-3">
                  <span className="text-xs text-slate-400 sm:text-sm">Period</span>
                  <code className="rounded-lg bg-slate-800/70 px-3 py-2 text-xs text-slate-200 sm:text-sm">
                    {w.period}
                  </code>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
                  {w.highlight}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mt-10">
        <div className="mb-5">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Tech Stack
          </h2>
          <p className="mt-2 max-w-4xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Tools and technologies I commonly use for building and shipping web apps.
          </p>
        </div>

        <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 shadow-lg">
          <div className="p-6">
            <div className="flex flex-wrap gap-2.5">
              {techStack.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-slate-700 bg-black/30 px-3 py-1.5 text-xs font-medium text-slate-200 backdrop-blur sm:px-4 sm:py-2 sm:text-sm"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Optional CTA row */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <NavLink
                to="/projects"
                className="rounded-full border border-slate-700 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-white/10 transition sm:text-sm"
              >
                View Projects
              </NavLink>

              <a
                onClick={handleOpenCV}
                className="rounded-full bg-emerald-500/20 px-4 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/30 transition sm:text-sm"
              >
                Download CV
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
