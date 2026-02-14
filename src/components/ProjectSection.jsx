import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase/client.ts'

const STORAGE_BUCKET = 'assets';
const STORAGE_FOLDER = 'projects';
const FALLBACK_IMG = '/placeholder-project.jpg';

function resolveImageUrl(imagePath) {
  if (!imagePath) return FALLBACK_IMG;
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
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
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function fetchProjects() {
      setLoading(true);
      setError('');

      const { data, error } = await supabase
        .from('projects')
        .select('id, title, description, tags, image_path')
        // .eq('is_active', true)
        .order('title', { ascending: true });

      if (!active) return;

      if (error) {
        setError(error.message || 'Failed to load projects');
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
          <h1 className="text-5xl font-bold tracking-tight">Projects</h1>
        </div>
      </div>

      {loading && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 animate-pulse"
            >
              <div className="h-72 bg-slate-800/70" />
              <div className="space-y-4 p-6">
                <div className="h-8 w-48 rounded bg-slate-700" />
                <div className="h-5 w-full rounded bg-slate-800" />
                <div className="h-5 w-4/5 rounded bg-slate-800" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
          {error}
        </div>
      )}

      {!loading && !error && list.length === 0 && (
        <div className="rounded-2xl border border-slate-700 bg-slate-900/50 p-6 text-slate-300 text-center">
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
              <div className="relative h-72 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                <span className="absolute bottom-4 left-4 rounded-full bg-black/65 px-4 py-1 text-sm font-medium">
                  {project.category || 'Project'}
                </span>

                <button
                  type="button"
                  className="absolute bottom-4 right-4 rounded-full bg-emerald-500/20 px-4 py-1 text-sm font-medium text-emerald-300 backdrop-blur hover:bg-emerald-500/30 transition"
                  onClick={() => navigate(project.path || '/')}
                >
                  Play
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-4xl font-bold leading-tight">{project.title}</h3>
                <p className="mt-3 text-xl leading-relaxed text-slate-300">
                  {project.description}
                </p>

                <div className="mt-6 flex items-center gap-4">
                  <span className="text-slate-400 text-2xl">Path</span>
                  <code className="rounded-lg bg-slate-800/70 px-3 py-2 text-2xl text-slate-200">
                    {project.path || '/'}
                  </code>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
