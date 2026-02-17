import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeroContentSection() {
  const navigate = useNavigate();

  // Edit this object to exactly match your resume wording
  const stackGroups = [
    {
      title: 'Frontend',
      items: [
        'React.js',
        'Vue.js',
        'JavaScript',
        'Tailwind CSS',
        'HTML5',
        'CSS3',
      ],
    },
    {
      title: 'Backend',
      items: [
        'Laravel',
        'Node.js',
        'NestJS',
        'Prisma ORM',
        'REST API Integration',
      ],
    },
    {
      title: 'Database & Cloud',
      items: [
        'Supabase',
        'MySQL',
        'PostgreSQL',
        'SQLite',
        'DigitalOcean Spaces',
      ],
    },
    {
      title: 'Tools & DevOps',
      items: [
        'Docker',
        'Nginx',
        'Git & GitHub',
        'Vercel',
        'WordPress',
        'WooCommerce',
      ],
    },
    {
      title: 'Analytics & Marketing Tools',
      items: [
        'Google Analytics (GA4)',
        'Omnisend',
        'Zapier',
      ],
    },
  ];

  const resumeUrl =
    'https://docs.google.com/document/d/1eTkUFzqG1-aEnrIzEMl5FZczfqo8HToZ/edit?usp=sharing&ouid=117003138271770141554&rtpof=true&sd=true';

  return (
    <section className="w-full px-4 pb-16 md:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur md:p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left content */}
          <div className="lg:col-span-5">
            <p className="mb-3 inline-flex rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-200">
              Technical Profile
            </p>

            <h2 className="text-3xl font-extrabold leading-tight text-white md:text-4xl">
              Tech stack aligned with my resume and current projects
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-slate-300 md:text-base">
              I focus on building responsive frontend experiences, reliable backend APIs,
              and production-ready deployments. This stack reflects the tools I actively
              use across portfolio, client, and integration work.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate('/projects')}
                className="rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-400"
              >
                Explore Projects
              </button>

              <button
                type="button"
                onClick={() => navigate('/contact')}
                className="rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Contact Me
              </button>

              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-5 py-2.5 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/20"
              >
                View Resume
              </a>
            </div>
          </div>

          {/* Right stack cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {stackGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-2xl border border-white/10 bg-slate-800/70 p-4"
              >
                <h3 className="text-sm font-semibold uppercase tracking-wide text-violet-200">
                  {group.title}
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-white/10 bg-slate-900/80 px-2.5 py-1 text-xs text-slate-200"
                    >
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
  );
}
