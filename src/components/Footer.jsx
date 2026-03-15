import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 88;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function Footer() {
  const year = new Date().getFullYear();

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
  ];

  const socials = {
    github: "https://github.com/ethereal-zero",
    linkedin: "https://www.linkedin.com/in/kenneth-candia-4847b331a/",
  };

  const email = "kenchicken0118@gmail.com";
  const mailto = `mailto:${email}`;
  const resumeUrl =
    "https://docs.google.com/document/d/1eTkUFzqG1-aEnrIzEMl5FZczfqo8HToZ/edit?usp=sharing&ouid=117003138271770141554&rtpof=true&sd=true";

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative z-10 mt-16 border-t border-white/10 bg-black/25 backdrop-blur-md">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="text-lg font-semibold text-white">
              Kenneth <span className="text-accent">Candia</span>
            </div>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-300">
              Building clean frontends, reliable backends, and production-ready integrations.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a href={socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 hover:text-white">
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 hover:text-white">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href={mailto} aria-label="Email"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 hover:text-white">
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10">
                View Resume
              </a>
            </div>
            <a href={mailto}
              className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 transition hover:bg-white/10 hover:text-white">
              <FontAwesomeIcon icon={faEnvelope} />
              {email}
            </a>
          </div>

          <div>
            <div className="text-sm font-semibold tracking-wide text-white">Explore</div>
            <ul className="mt-4 space-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <button type="button" onClick={() => scrollToSection(l.id)}
                    className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-slate-300 transition hover:bg-white/5 hover:text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold tracking-wide text-white">Let&apos;s work together</div>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Need a website built, an existing one optimized, or a feature integrated? Let's talk.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={mailto} className="rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-400">
                Email me
              </a>
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer"
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
                LinkedIn
              </a>
              <button type="button" onClick={scrollToTop}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
                Back to top
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
          <div>© {year} Kenneth Candia. All rights reserved.</div>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
            <a href={mailto} className="inline-flex items-center gap-2 hover:text-white">
              <FontAwesomeIcon icon={faEnvelope} />
              {email}
            </a>
            <div className="flex items-center gap-2">
              <span className="hidden md:inline">Built with</span>
              <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1">React</span>
              <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1">Tailwind</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
