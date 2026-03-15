import React, { useMemo, useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function toPublicUrl(path = "") {
  const base = (process.env.PUBLIC_URL || "").replace(/\/+$/, "");
  const clean = String(path).replace(/\\/g, "/").replace(/^\/+/, "");
  return `${base}/${clean}`;
}

const FALLBACK_IMG = toPublicUrl("placeholder-img.png");

function resolveImageSrc(url) {
  if (typeof url !== "string") return null;
  const raw = url.trim();
  if (!raw) return null;
  const normalized = raw.replace(/\\/g, "/");
  if (
    /^https?:\/\//i.test(normalized) ||
    normalized.startsWith("//") ||
    normalized.startsWith("data:") ||
    normalized.startsWith("blob:")
  ) {
    return normalized;
  }
  return toPublicUrl(normalized);
}

function normalizeImages(images) {
  if (!Array.isArray(images)) return [];
  return images.map(resolveImageSrc).filter(Boolean);
}

function LazyImg({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative w-full h-full">
      {!loaded && <div className="absolute inset-0 slider-shimmer rounded-sm" />}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
        onError={(e) => { e.currentTarget.src = FALLBACK_IMG; setLoaded(true); }}
      />
    </div>
  );
}

export default function ImageSlider({
  images = [],
  fit = "cover",
  aspectRatio = "16 / 9",
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbRowRef = useRef(null);
  const thumbItemRefs = useRef([]);
  const swiperRef = useRef(null);

  const slides = useMemo(() => {
    const safe = normalizeImages(images);
    return safe.length ? safe : [];
  }, [images]);

  const hasImages = slides.length > 0;
  const imageFitClass = fit === "contain" ? "object-contain bg-black" : "object-cover";

  // Auto-scroll thumb strip to keep active thumb in view
  useEffect(() => {
    const row = thumbRowRef.current;
    const thumb = thumbItemRefs.current[activeIndex];
    if (!row || !thumb) return;
    const rowRect = row.getBoundingClientRect();
    const thumbRect = thumb.getBoundingClientRect();
    if (thumbRect.left < rowRect.left) {
      row.scrollBy({ left: thumbRect.left - rowRect.left - 8, behavior: "smooth" });
    } else if (thumbRect.right > rowRect.right) {
      row.scrollBy({ left: thumbRect.right - rowRect.right + 8, behavior: "smooth" });
    }
  }, [activeIndex]);

  return (
    <>
      <style>{`
        .slider-shimmer {
          background: linear-gradient(90deg,
            rgba(255,255,255,0.03) 0%,
            rgba(255,255,255,0.09) 40%,
            rgba(255,255,255,0.03) 80%
          );
          background-size: 200% 100%;
          animation: slider-shimmer-kf 1.6s ease-in-out infinite;
        }
        @keyframes slider-shimmer-kf {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .thumb-row::-webkit-scrollbar { display: none; }
        .thumb-row { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="space-y-3">
        {/* Main slider — always same aspect ratio */}
        <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800">
          {hasImages ? (
            <Swiper
              modules={[Navigation, Pagination, Keyboard]}
              navigation={slides.length > 1}
              pagination={slides.length > 1 ? { clickable: true } : false}
              keyboard={{ enabled: true }}
              loop={slides.length > 1}
              spaceBetween={10}
              onSwiper={(swiper) => { swiperRef.current = swiper; }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              className="w-full"
            >
              {slides.map((src, idx) => (
                <SwiperSlide key={`${src}-${idx}`}>
                  <div className="relative w-full" style={{ aspectRatio }}>
                    <LazyImg
                      src={src}
                      alt={`Preview ${idx + 1}`}
                      className={`absolute inset-0 h-full w-full ${imageFitClass}`}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            /* No images — same aspect ratio box so layout doesn't jump */
            <div className="relative w-full" style={{ aspectRatio }}>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <svg className="w-10 h-10 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 3h18M3 21h18" />
                </svg>
                <span className="text-xs text-slate-500">No preview available</span>
              </div>
            </div>
          )}
        </div>

        {/* Thumbnail row — always rendered to preserve height, invisible when no images */}
        <div
          ref={thumbRowRef}
          className={`thumb-row flex gap-2 overflow-x-auto ${!hasImages ? "invisible" : ""}`}
        >
          {hasImages
            ? slides.map((src, idx) => (
                <button
                  key={`thumb-${idx}`}
                  ref={(el) => (thumbItemRefs.current[idx] = el)}
                  type="button"
                  onClick={() => {
                    setActiveIndex(idx);
                    if (swiperRef.current) swiperRef.current.slideToLoop(idx);
                  }}
                  className={`flex-shrink-0 rounded-md border overflow-hidden transition-all duration-200 ${
                    idx === activeIndex
                      ? "border-accent ring-1 ring-accent/40"
                      : "border-slate-700 opacity-60 hover:opacity-90"
                  }`}
                  style={{ width: "5.5rem", aspectRatio: "16 / 9" }}
                >
                  <LazyImg
                    src={src}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))
            : /* Ghost thumbs — invisible placeholders to hold height */
              Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={`ghost-${idx}`}
                  className="flex-shrink-0 rounded-md bg-transparent"
                  style={{ width: "5.5rem", aspectRatio: "16 / 9" }}
                />
              ))
          }
        </div>
      </div>
    </>
  );
}
