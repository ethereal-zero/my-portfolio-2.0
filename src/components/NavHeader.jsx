import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import gsap from "gsap";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
];

const SOCIALS = {
  github: "https://github.com/ethereal-zero",
  linkedin: "https://www.linkedin.com/in/kenneth-candia-4847b331a/",
};

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  // account for sticky nav height (80px)
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function NavHeader() {
  const [activeSection, setActiveSection] = useState("home");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const indicatorRef = useRef(null);
  const navRef = useRef(null);
  const headerRef = useRef(null);

  // entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: -80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1,
      });
    });
    return () => ctx.revert();
  }, []);

  // scroll spy
  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 20);

      // walk sections in reverse so the last one that's past the threshold wins
      const ids = ["home", "about", "projects"];
      let current = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 120) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // slide indicator pill
  useEffect(() => {
    if (!navRef.current || !indicatorRef.current) return;
    const activeEl = navRef.current.querySelector(`[data-id="${activeSection}"]`);
    if (!activeEl) return;
    const navRect = navRef.current.getBoundingClientRect();
    const elRect = activeEl.getBoundingClientRect();
    gsap.to(indicatorRef.current, {
      x: elRect.left - navRect.left,
      width: elRect.width,
      duration: 0.35,
      ease: "power2.inOut",
    });
  }, [activeSection]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const openMenu = () => { setMounted(true); requestAnimationFrame(() => setOpen(true)); };
  const close = () => setOpen(false);
  const handleNav = (id) => { scrollToSection(id); close(); };

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 flex h-20 w-full items-center gap-2 border-b px-4 py-2 transition-all duration-300 ${
          scrolled
            ? "border-white/10 bg-background/90 shadow-lg shadow-black/20 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <img src="android-chrome-512x512.png" alt="Portfolio Logo" className="h-12 w-12 object-contain" />
        </div>

        {/* Desktop nav with sliding pill indicator */}
        <nav className="hidden flex-1 items-center sm:flex ml-2">
          <div ref={navRef} className="relative flex items-center gap-1">
            {/* sliding background pill */}
            <span
              ref={indicatorRef}
              className="pointer-events-none absolute top-0 bottom-0 rounded-lg bg-white/10"
              style={{ width: 0 }}
              aria-hidden
            />
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                data-id={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`relative z-10 rounded-lg px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                  activeSection === item.id
                    ? "text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {item.label}
                {/* accent underline dot */}
                <span
                  className={`absolute -bottom-0.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-accent transition-all duration-300 ${
                    activeSection === item.id ? "w-4 opacity-100" : "w-0 opacity-0"
                  }`}
                />
              </button>
            ))}
          </div>
        </nav>

        {/* Desktop socials */}
        <div className="ml-auto hidden items-center gap-3 sm:flex">
          <a href={SOCIALS.github} target="_blank" rel="noreferrer"
            className="text-xl text-slate-300 hover:text-white hover:scale-110 transition-all" aria-label="GitHub">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href={SOCIALS.linkedin} target="_blank" rel="noreferrer"
            className="text-xl text-slate-300 hover:text-white hover:scale-110 transition-all" aria-label="LinkedIn">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>

        {/* Mobile burger */}
        <button type="button"
          className="ml-auto inline-flex items-center justify-center text-xl text-slate-100 hover:scale-110 transition sm:hidden"
          onClick={openMenu} aria-label="Open menu">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </header>

      {/* Mobile sidebar */}
      {mounted && (
        <div className={`fixed inset-0 z-[60] ${open ? "pointer-events-auto" : "pointer-events-none"}`} onClick={close}>
          <div
            className={`absolute inset-0 bg-black/60 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
            onTransitionEnd={(e) => { if (!open && e.target === e.currentTarget) setMounted(false); }}
          />
          <aside
            className={`absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col border-l border-slate-800 bg-slate-950/95 backdrop-blur transition-transform duration-200 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
              <div className="flex items-center gap-3">
                <img src="android-chrome-512x512.png" alt="Logo" className="h-10 w-10 object-contain" />
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-slate-100">Kenneth Candia</p>
                  <p className="text-xs text-slate-400">Software Developer</p>
                </div>
              </div>
              <button type="button" className="text-xl text-slate-100 hover:scale-110 transition" onClick={close} aria-label="Close menu">
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <nav className="flex-1 px-5 py-5">
              <ul className="space-y-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <button type="button" onClick={() => handleNav(item.id)}
                      className={`block w-full rounded-xl px-4 py-3 text-left text-sm transition ${
                        activeSection === item.id
                          ? "bg-white/10 font-semibold text-slate-100"
                          : "text-slate-200 hover:bg-white/5"
                      }`}>
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="border-t border-slate-800 px-5 py-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Connect</span>
                <div className="flex items-center gap-2">
                  <a href={SOCIALS.github} target="_blank" rel="noreferrer" className="text-xl text-slate-200 hover:scale-105 transition" aria-label="GitHub"><FontAwesomeIcon icon={faGithub} /></a>
                  <a href={SOCIALS.linkedin} target="_blank" rel="noreferrer" className="text-xl text-slate-200 hover:scale-105 transition" aria-label="LinkedIn"><FontAwesomeIcon icon={faLinkedin} /></a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
