import React, { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, Thumbs, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

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

/* Shimmer + fade-in wrapper for a single image */
function LazyImg({ src, alt, className, style }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      {/* Shimmer shown until image loads */}
      {!loaded && (
        <div className="absolute inset-0 slider-shimmer rounded-sm" />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        style={style}
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          e.currentTarget.src = FALLBACK_IMG;
          setLoaded(true);
        }}
      />
    </div>
  );
}

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
      `}</style>

      <div className="space-y-3">
        {/* Main slider */}
        <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800">
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
                  <LazyImg
                    src={src}
                    alt={`Thumbnail ${idx + 1}`}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
}
