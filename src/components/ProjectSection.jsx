import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase/client.ts";

const STORAGE_BUCKET = "assets";
const STORAGE_FOLDER = "projects";
const FALLBACK_IMG = "/placeholder-project.jpg";

function resolveImageUrl(imagePath) {
  if (!imagePath) return FALLBACK_IMG;
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  const normalized = imagePath.startsWith(`${STORAGE_FOLDER}/`)
    ? imagePath
    : `${STORAGE_FOLDER}/${imagePath}`;

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(normalized);
  return data?.publicUrl || FALLBACK_IMG;
}

export default function ProjectSection() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchProjects() {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("projects")
        .select("id, title, description, tags, image_path")
        // .eq('is_active', true)
        .order("title", { ascending: true });

      if (!active) return;

      if (error) {
        setError(error.message || "Failed to load projects");
        setProjects([]);
      } else {
        setProjects(data || []);
      }

      setLoading(false);
    }

    fetchProjects();
    return () => {
      active = false;
    };
  }, []);

  const list = useMemo(
    () =>
      projects.map((p) => ({
        ...p,
        imageUrl: resolveImageUrl(p.image_path),
      })),
    [projects]
  );

  return (
    <section className="w-full px-6 py-6 text-slate-100">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Projects</h1>
          <p className="mt-2 text-sm text-slate-300 sm:text-base">
            A collection of projects I’ve built and maintained.
          </p>
        </div>
      </div>

      {loading && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 animate-pulse"
            >
              <div className="h-64 bg-slate-800/70 sm:h-72" />
              <div className="space-y-3 p-6">
                <div className="h-7 w-44 rounded bg-slate-700" />
                <div className="h-4 w-full rounded bg-slate-800" />
                <div className="h-4 w-4/5 rounded bg-slate-800" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200 sm:text-base">
          {error}
        </div>
      )}

      {!loading && !error && list.length === 0 && (
        <div className="rounded-2xl border border-slate-700 bg-slate-900/50 p-6 text-center text-sm text-slate-300 sm:text-base">
          No projects found.
        </div>
      )}

      {!loading && !error && list.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((project) => (
            <article
              key={project.id}
              className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 shadow-lg"
            >
              <div className="relative h-64 overflow-hidden sm:h-72">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                <span className="absolute bottom-4 left-4 rounded-full bg-black/65 px-3 py-1 text-xs font-medium sm:px-4 sm:text-sm">
                  {project.category || "Project"}
                </span>

                <button
                  type="button"
                  className="absolute bottom-4 right-4 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-300 backdrop-blur hover:bg-emerald-500/30 transition sm:px-4 sm:text-sm"
                  onClick={() => navigate(project.path || "/")}
                >
                  Play
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold leading-tight sm:text-xl">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
                  {project.description}
                </p>

                <div className="mt-5 flex items-center gap-3">
                  <span className="text-xs text-slate-400 sm:text-sm">Path</span>
                  <code className="rounded-lg bg-slate-800/70 px-3 py-2 text-xs text-slate-200 sm:text-sm">
                    {project.path || "/"}
                  </code>
                </div>

                {/* Optional: tags row if tags exist */}
                {Array.isArray(project.tags) && project.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.slice(0, 6).map((tag) => (
                      <span
                        key={tag}
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
  );
}
