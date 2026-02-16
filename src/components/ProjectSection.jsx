import React, { useMemo, useState } from "react";
import AppModal from "./ui/AppModal";
import ImageSlider from "./ui/ImageSlider";

const FALLBACK_IMG = "/placeholder-img.png";

const PROJECTS = [
  {
    id: 1,
    title: "Project FH",
    description: "Project FH is a secure, scalable sports video platform built to deliver authorized live and on-demand fight content with dependable performance. Developed with Vue on the frontend and Laravel on the backend, the platform combines a fast, responsive user experience with a robust, maintainable application architecture. Live streaming is powered by Vimeo for reliable broadcast delivery, while DigitalOcean Spaces is used for efficient, scalable media storage. With controlled access, protected content workflows, and stable playback across devices, Project FH is designed to support growing audiences without compromising security, quality, or operational control.",
    tags: [  "Vue.js", "Laravel", "Vimeo", "Digital Ocean Space"],
    images: [
      "projects/project_fh_1.png",
      "projects/project_fh_2.png",
      "projects/project_fh_3.png",
      "projects/project_fh_4.png",
      "projects/project_fh_5.png",
    ],
    category: "Streaming",
  },
    {
    id: 2,
    title: "Project MP",
    description: "Project MP is a private performance-focused platform built to support muscle growth goals through high-quality formulations and a reliable digital experience. With strong quality standards, controlled access, and consistent delivery, Project MP is designed to provide a trusted and seamless user journey.",
    tags: [  "Vue.js", "Laravel", "Provesouurce", "Omnisend", "GA4 Analytics"],
    images: [
      "projects/project_mp_1.png",
      "projects/project_mp_2.png",
      "projects/project_mp_3.png",
      "projects/project_mp_4.png",
      "projects/project_mp_5.png",
    ],
    category: "E-commerce",
  },
  {
    id: 3,
    title: "The Final Whistle",
    description: "TFW9s is a dynamic platform dedicated to children who love to be competitive in a safe environment. TFW9s also provides an enjoyment factor for those who love tackling. TFW9s is an electric and competitive 9s footy concept. TFW celebrates the achievements of young athletes who attend our events and creates positive stories through strong community connection and spirit. TFW9s culture empowers young people to learn valuable life skills by understanding what it feels like to win and be humble as well as learning resilience from losing which will help shape young people into great humans. TFW9s socials have laid the platform for people to have a voice on the game since 2019.",
    tags: [  "Vue.js", "Laravel"],
    images: [],
    category: "Registration System",
  },
  {
    id: 4,
    title: "Dentabase",
    description: "Dentabase makes dental staffing and job hunting simple, fast, and stress-free by connecting practices with qualified professionals through one easy-to-use platform.",
    tags: [  "Vue.js", "Laravel"],
    images: [],
    category: "Employment",
  },
  {
    id: 5,
    title: "Scholarly Hub",
    description: "Temporary Content",
    tags: [  "Vue.js", "Laravel"],
    images: [],
    category: "Education",
  },
  {
    id: 6,
    title: "Whole Hearted Health",
    description: "At Wholehearted Health Solutions, we believe everyone deserves to feel safe, supported and cared for within the comfort of their own home. Our team provides practical assistance with compassion, respect and genuine understanding, helping you or your loved ones maintain independence, dignity and quality of life.",
    tags: [  "Vue.js", "Laravel"],
    images: [],
    category: "Health Care",
  },
  {
    id: 7,
    title: "ZeroBond",
    description: "ZeroBond makes renting, leasing, and property management simple, fast, and stress-free by bringing tenants, landlords, and agents together on one easy-to-use platform.",
    tags: [  "Vue.js", "Laravel"],
    images: [],
    category: "Lease and Guarantee",
  },
  {
    id: 8,
    title: "Barterbud",
    description: "Temporary Content",
    tags: [  "Next.js", "Firebase", "Java"],
    images: [],
    category: "School Project",
  },
  {
    id: 9,
    title: "Kakeibo App",
    description: "Temporary Content",
    tags: [  "Java", "Android"],
    images: [],
    category: "Class Activity",
  },
];

function getCover(images) {
  if (!Array.isArray(images) || images.length === 0) return FALLBACK_IMG;
  const first = images[0];
  return typeof first === "string" ? first : FALLBACK_IMG;
}

export default function ProjectSection() {
  const list = useMemo(() => PROJECTS, []);
  const [selectedProject, setSelectedProject] = useState(null);

  const openProject = (project) => setSelectedProject(project);

  return (
    <>
      <section className="w-full px-6 py-6 text-slate-100">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Projects</h1>
          <p className="mt-2 text-sm text-slate-300 sm:text-base">
            Click any project to see all attached images.
          </p>
        </div>

        {list.length === 0 ? (
          <div className="rounded-2xl border border-slate-700 bg-slate-900/50 p-6 text-center text-sm text-slate-300 sm:text-base">
            No projects found.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((project) => (
              <article
                key={project.id}
                role="button"
                tabIndex={0}
                onClick={() => openProject(project)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openProject(project);
                  }
                }}
                className="group cursor-pointer overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg transition hover:-translate-y-0.5 hover:border-slate-600"
              >
                <div className="relative h-64 overflow-hidden sm:h-72">
                  <img
                    src={getCover(project.images)}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = FALLBACK_IMG;
                    }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  <span className="absolute bottom-4 left-4 rounded-full bg-black/65 px-3 py-1 text-xs font-medium sm:px-4 sm:text-sm">
                    {project.category || "Project"}
                  </span>

                  <span className="absolute bottom-4 right-4 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-300 backdrop-blur sm:px-4 sm:text-sm">
                    View all
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold leading-tight sm:text-xl">{project.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base line-clamp-2">
                    {project.description}
                  </p>

                  {Array.isArray(project.tags) && project.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.slice(0, 8).map((tag, idx) => (
                        <span
                          key={`${project.id}-${tag}-${idx}`}
                          className="rounded-full border border-slate-700 bg-black/25 px-3 py-1 text-[11px] text-slate-200 sm:text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <AppModal
        open={!!selectedProject}
        onOpenChange={(next) => !next && setSelectedProject(null)}
        srTitle={selectedProject?.title || "Project details"}
        headerSlot={
          selectedProject ? (
            <div>
              <h3 className="text-lg font-semibold sm:text-xl">{selectedProject.title}</h3>
            </div>
          ) : null
        }
        descriptionSlot={
          selectedProject
            ? `${selectedProject.images?.length || 0} images`
            : "Project gallery"
        }
        footerSlot={
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        }
      >
        {selectedProject && (
          <div className="space-y-4">
            <ImageSlider images={selectedProject.images} fit="cover" />
            <p className="text-sm text-slate-300 sm:text-base text-justify indent-8">{selectedProject.description}</p>
          </div>
        )}
      </AppModal>

    </>
  );
}
