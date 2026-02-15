import React, { useMemo, useState } from "react";
import AppModal from "./ui/AppModal";
import ImageSlider from "./ui/ImageSlider";

const FALLBACK_IMG = "/placeholder-project.jpg";

const PROJECTS = [
  {
    id: 1,
    title: "Project FH",
    description: "A secure, scalable video platform for authorized live and on-demand sports content, built for controlled access and reliable playback.",
    tags: [  "Vuejs", "Laravel", "Vimeo", "Digital Ocean Space", "NDA Protected"],
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
    title: "Task Tracker Pro",
    description: "Task manager with filtering, priorities, and drag-and-drop sorting.",
    tags: ["React", "Productivity", "DnD"],
    images: [
      "https://picsum.photos/seed/task-1/1200/800",
      "https://picsum.photos/seed/task-2/1200/800",
      "https://picsum.photos/seed/task-3/1200/800",
    ],
    category: "Web App",
  },
  {
    id: 3,
    title: "Portfolio CMS",
    description: "Manage portfolio items, categories, and media from one dashboard.",
    tags: ["Admin", "CMS", "Dashboard"],
    images: [
      "https://picsum.photos/seed/cms-1/1200/800",
      "https://picsum.photos/seed/cms-2/1200/800",
    ],
    category: "Dashboard",
  },
  {
    id: 4,
    title: "Fitness Tracker",
    description: "Log workouts, monitor progress, and review monthly performance.",
    tags: ["Health", "Analytics", "Charts"],
    images: [
      "https://picsum.photos/seed/fitness-1/1200/800",
      "https://picsum.photos/seed/fitness-2/1200/800",
      "https://picsum.photos/seed/fitness-3/1200/800",
      "https://picsum.photos/seed/fitness-4/1200/800",
    ],
    category: "Mobile",
  },
  {
    id: 5,
    title: "E-Commerce Admin",
    description: "Product, inventory, and order management interface for merchants.",
    tags: ["E-Commerce", "CRUD", "Admin Panel"],
    images: [
      "https://picsum.photos/seed/store-1/1200/800",
      "https://picsum.photos/seed/store-2/1200/800",
      "https://picsum.photos/seed/store-3/1200/800",
    ],
    category: "Admin",
  },
  {
    id: 6,
    title: "Travel Journal",
    description: "Create trip entries with notes, photos, and destination tags.",
    tags: ["Travel", "Gallery", "Map"],
    images: [
      "https://picsum.photos/seed/travel-1/1200/800",
      "https://picsum.photos/seed/travel-2/1200/800",
      "https://picsum.photos/seed/travel-3/1200/800",
    ],
    category: "Lifestyle",
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
                  <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
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
            <p className="text-sm text-slate-300 sm:text-base">{selectedProject.description}</p>
          </div>
        )}
      </AppModal>

    </>
  );
}
