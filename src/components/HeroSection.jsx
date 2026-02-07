import React, { useEffect } from "react";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import AOS from "aos";
import "aos/dist/aos.css";

function HeroSection({ setSection }) {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 500,
    });
  }, []);

  const handleOpenCV = () => {
    window.open(
      "https://docs.google.com/document/d/1eTkUFzqG1-aEnrIzEMl5FZczfqo8HToZ/edit?usp=sharing&ouid=117003138271770141554&rtpof=true&sd=true",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      {/* anchor target */}
      <div id="home" className="w-full" />

      <section
        className="landing w-full min-h-screen relative p-4 border-b-4 border-brand-cyan flex items-center justify-center"
        data-aos="fade-up"
      >
        <div className="w-full h-full flex justify-center flex-col items-center mx-auto max-w-screen-xl">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-3 pb-10">
            <div
              className="col-span-1 p-4 flex flex-col items-center justify-center"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              <div className="overflow-hidden rounded-full aspect-square bg-[#0d96d5] border-4 z-10 glow-effect">
                {/* Put image in /public then use /ako_grad2.jpg */}
                <img
                  src="profile/ako_grad.jpg"
                  alt="Kenneth Candia"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="col-span-1 lg:col-span-2 flex flex-col justify-center p-4 max-w-[800px] font-[Inter]">
              <span
                className="w-full text-[#0d96d5] font-bold text-xl sm:text-2xl lg:text-3xl text-center md:text-left"
                data-aos="fade-right"
                data-aos-delay="500"
              >
                Hello!
              </span>

              <span
                className="w-full text-white font-bold text-2xl sm:text-4xl lg:text-6xl text-center md:text-left md:indent-4"
                data-aos="fade-right"
                data-aos-delay="650"
              >
                I&apos;m Kenneth Candia
              </span>

              <span
                className="w-full text-gray-400 font-semibold text-lg sm:text-2xl lg:text-3xl text-center md:text-left md:indent-8"
                data-aos="fade-right"
                data-aos-delay="800"
              >
                Software Developer
              </span>

              <div
                className="w-full text-white font-semibold text-lg md:text-xl text-center md:text-right pt-10"
                data-aos="fade-up"
                data-aos-delay="1000"
              >
                <button
                  type="button"
                  className="px-6 py-2 bg-brand-cyan rounded-xl mr-2 mb-2"
                  onClick={handleOpenCV}
                >
                  Show CV
                </button>

                <button
                  type="button"
                  className="px-6 py-2 border-2 border-brand-cyan rounded-xl"
                  onClick={() => setSection?.("about")}
                >
                  See More
                  <FontAwesomeIcon icon={faAngleRight} className="pl-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
