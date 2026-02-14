import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function NavHeader() {
  const navItems = [
    { to: "/", label: "Home", end: true },
    { to: "/about", label: "About" },
    { to: "/projects", label: "Projects" },
  ];

  const socials = {
    github: "https://github.com/ethereal-zero",
    linkedin: "https://www.linkedin.com/in/kenneth-candia-4847b331a/",
  };

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // lock scroll when sidebar open
  useEffect(() => {
    if (!mounted) return;

    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open, mounted]);

  const openMenu = () => {
    // mount first so DOM exists
    setMounted(true);
    // then open on next frame so transitions animate
    requestAnimationFrame(() => setOpen(true));
  };

  const close = () => setOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 flex h-24 w-full items-center gap-2 border-b border-gray-200 bg-background/80 px-4 py-2 shadow-sm shadow-accent backdrop-blur-sm">
        {/* Logo */}
        <div className="logo flex items-center">
          <img
            src="android-chrome-512x512.png"
            alt="Portfolio Logo"
            className="h-14 w-14 object-contain sm:h-16 sm:w-16"
          />
        </div>

        {/* Desktop nav */}
        <nav className="hidden flex-1 items-center sm:flex">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `rounded-md px-3 pb-2 pt-1 text-sm transition ${
                      isActive
                        ? "bg-white/10 font-semibold"
                        : "text-slate-100/90 hover:bg-white/5"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop socials */}
        <div className="ml-auto hidden items-center gap-2 sm:flex">
          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            className="text-xl text-slate-200 hover:scale-105 transition"
            aria-label="GitHub"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-xl text-slate-200 hover:scale-105 transition"
            aria-label="LinkedIn"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          className="ml-auto inline-flex items-center justify-center text-xl text-slate-100 hover:scale-105 transition sm:hidden"
          onClick={openMenu}
          aria-label="Open menu"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </header>

      {/* Mobile Sidebar */}
      {mounted && (
        <div
          className={`fixed inset-0 z-[60] ${
            open ? "pointer-events-auto" : "pointer-events-none"
          }`}
          onClick={close}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/60 transition-opacity duration-200 ease-out ${
              open ? "opacity-100" : "opacity-0"
            }`}
            onTransitionEnd={(e) => {
              // unmount ONLY after closing transition ends
              if (!open && e.target === e.currentTarget) setMounted(false);
            }}
          />

          {/* Right panel */}
          <aside
            className={`absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col
                        border-l border-slate-800 bg-slate-950/90 backdrop-blur
                        transition-transform duration-200 ease-out
                        ${open ? "translate-x-0" : "translate-x-full"}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
              <div className="flex items-center gap-3">
                <img
                  src="android-chrome-512x512.png"
                  alt="Portfolio Logo"
                  className="h-10 w-10 object-contain"
                />
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-slate-100">
                    Kenneth Candia
                  </p>
                  <p className="text-xs text-slate-400">Software Developer</p>
                </div>
              </div>

              <button
                type="button"
                className="text-xl text-slate-100 hover:scale-110 transition"
                onClick={close}
                aria-label="Close menu"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 px-5 py-5">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      onClick={close}
                      className={({ isActive }) =>
                        `block rounded-xl px-4 py-3 text-sm transition ${
                          isActive
                            ? "bg-white/10 font-semibold text-slate-100"
                            : "text-slate-200 hover:bg-white/5"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Bottom socials */}
            <div className="border-t border-slate-800 px-5 py-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Connect</span>
                <div className="flex items-center gap-2">
                  <a
                    href={socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xl text-slate-200 hover:scale-105 transition"
                    aria-label="GitHub"
                  >
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xl text-slate-200 hover:scale-105 transition"
                    aria-label="LinkedIn"
                  >
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
