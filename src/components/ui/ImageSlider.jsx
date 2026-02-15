import React, { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, Thumbs, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

/**
 * Safely build URL for assets in /public, including subpath deployments.
 * Examples:
 * - "projects/a.png"      -> "/projects/a.png" (or "/myapp/projects/a.png")
 * - "/projects/a.png"     -> "/projects/a.png" (or "/myapp/projects/a.png")
 */
function toPublicUrl(path = "") {
  const base = (process.env.PUBLIC_URL || "").replace(/\/+$/, ""); // CRA-safe base
  const clean = String(path).replace(/\\/g, "/").replace(/^\/+/, ""); // normalize slashes
  return `${base}/${clean}`;
}

const FALLBACK_IMG = toPublicUrl("placeholder-img.png");

function resolveImageSrc(url) {
  if (typeof url !== "string") return null;
  const raw = url.trim();
  if (!raw) return null;

  const normalized = raw.replace(/\\/g, "/");

  // remote/data/blob URLs -> keep as-is
  if (
    /^https?:\/\//i.test(normalized) ||
    normalized.startsWith("//") ||
    normalized.startsWith("data:") ||
    normalized.startsWith("blob:")
  ) {
    return normalized;
  }

  // local internal path -> resolve from /public
  return toPublicUrl(normalized);
}

function normalizeImages(images) {
  if (!Array.isArray(images)) return [];
  return images
    .map(resolveImageSrc)
    .filter(Boolean);
}

/**
 * Reusable slider:
 * accepts only `images: string[]`
 * optional:
 * - fit: "cover" | "contain"
 * - aspectRatio: CSS ratio string, default "16 / 9"
 */
export default function ImageSlider({
  images = [],
  fit = "cover",
  aspectRatio = "16 / 9",
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = useMemo(() => {
    const safe = normalizeImages(images);
    return safe.length ? safe : [FALLBACK_IMG];
  }, [images]);

  const thumbsInstance = thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null;
  const imageFitClass = fit === "contain" ? "object-contain bg-black" : "object-cover";

  return (
    <div className="space-y-3">
      {/* Main slider */}
      <div className="overflow-hidden rounded-xl border border-slate-700 bg-black">
        <Swiper
          modules={[Navigation, Pagination, Keyboard, Thumbs]}
          navigation={slides.length > 1}
          pagination={slides.length > 1 ? { clickable: true } : false}
          keyboard={{ enabled: true }}
          thumbs={{ swiper: thumbsInstance }}
          loop={slides.length > 1}
          spaceBetween={10}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="w-full"
        >
          {slides.map((src, idx) => (
            <SwiperSlide key={`${src}-${idx}`}>
              {/* Always full width + uniform 16:9 (or custom aspectRatio) */}
              <div className="relative w-full" style={{ aspectRatio }}>
                <img
                  src={src}
                  alt={`Preview ${idx + 1}`}
                  className={`absolute inset-0 h-full w-full ${imageFitClass}`}
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMG;
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thumbnails */}
      {slides.length > 1 && (
        <Swiper
          modules={[FreeMode, Thumbs]}
          onSwiper={setThumbsSwiper}
          watchSlidesProgress
          freeMode
          spaceBetween={8}
          slidesPerView={Math.min(6, slides.length)}
          className="!pb-1"
        >
          {slides.map((src, idx) => (
            <SwiperSlide key={`thumb-${src}-${idx}`} className="!w-24 sm:!w-28 !h-auto">
              <div
                className={`relative w-full overflow-hidden rounded-md border ${
                  idx === activeIndex ? "border-accent" : "border-slate-700"
                }`}
                style={{ aspectRatio: "16 / 9" }}
              >
                <img
                  src={src}
                  alt={`Thumbnail ${idx + 1}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMG;
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
