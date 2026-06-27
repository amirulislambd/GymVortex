"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Array containing tactical background image resources
const SLIDER_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBpLp2QUzUrS0c5AwRlCeOXgTPZdqGRvSBknVf4pOvSSQ0XjJbwepuc8IaJ3eGxwHvZY0rnMnkE1fwkRBB0FWfieg-siOHxitCfQDOhjzI5_z0014pZ_1K0TxMEcAijX4NgFIBp9kBT9mqAab58XfqBOKoldcHQ2Ow1FczBI6ZyHhjx7MwNjio7eJW56UuoXzGW37mkICVV6GVO-mavId547Cq_yNCkTpZfHVd6oEAmr9uGCoFvMEOAUWW2py5sussuFa4KUK5exgI",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB3ygIRSrHDIWAm4S3LRKpSKHD_zb6sxDqGIrzOqN_rZkzfwWqHDWgy6jg6AlyGOlSZX7KTOdcfwdla7kz47FqkQZxV-dBEYPgy4X1ad5k0XeHGE1SvP6r8wUQeedGvp38wLg-fzyYymK3IUE9Y16ujPlAx3cekm2cdUJAQD4oNKohC01xNJvP7BvL32p935lqqKg9ulw6duRwXiyTU0VKTOwsoyhw3nj-Wm08LXFqjqg-Aonhk_JA3H5sgtkVsWXe0JRC9RKuWzmM",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDJlvKPsQy-8BHZXXMlf38Kich5QT6hZEcSnJdxnYV06ozMPs7b1ZI46cXrozaw_p7fnk5HJeEBd55PtaXMtgMC6Qhxv0lJxYTwyQ43eiDEhZX949kb5qCVOJpHerJPk-RxivW4SxRSZZryc5tDkTorLUYPbtrLlwU82jtuXt_x57xvxL-sPtQYKR2r-7PwowQJ-YB61OWrf1IUZKLlqHF-Z2ze4e0WXSNuOFJVU0w_tZwl_bnHe15uPZyI1WDrAF_ZyxtRI0ybc_U",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAJE5LUXw9cD4d66_G6wf6_3z4ru3uAGH8LPn7PX9gLBVze6fcdz8Ib4kYeMaaue3hXa6m42dQfisZmgLZMrPpqrVqSQ5h-EyjoGqwMJ5aaudJuAHJKCMTtbv43mF7SSl9Ry-HD531ioXskiVJjE8ilO6gIgM2mUPe0m1s1_b40eX-dB5eF8rsjOjK_0eJJGKFsuS14bCSzE5RRdYJXZTwOcs28ab3W9onnyBqy-BD0Wf0JTLD5B4839a8FqKF7Rl3C3H9t_-JRX2M",
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatic state progression loop for slide intervals
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 5000); // Transitions background slide every 5000ms

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <section className="relative min-h-[550px] md:min-h-[795px] flex flex-col justify-center items-center overflow-hidden px-margin-mobile md:px-margin-desktop text-center bg-[#0a0a0a]">
      {/* Dynamic Optimized Slider Track Wrapper */}
      <div className="absolute inset-0 z-0">
        {SLIDER_IMAGES.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Dark Tactical Vignette Overlay Filter */}
            <div className="absolute inset-0 bg-black/70 md:bg-[#0a0a0a]/65 mix-blend-multiply z-20" />

            {/* Next.js Core Core Engine Image Loader */}
            <Image
              src={src}
              alt={`GymVortex Industrial Background Asset ${index + 1}`}
              fill
              priority={index === 0} // Prioritize initialization layer loading on runtime
              sizes="100vw"
              className="object-cover object-center select-none"
            />
          </div>
        ))}
      </div>

      {/* Content Command Grid Overlay */}
      <div className="relative z-20 max-w-4xl animate-slide-up px-4 font-mono">
        <h2 className="text-display-lg md:text-5xl lg:text-6xl font-black uppercase italic tracking-tighter text-[#caf300] mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
          FORGE YOUR <span className="text-white">LIMITS</span>
        </h2>
        <p className="font-sans text-body-lg text-neutral-300 max-w-2xl mx-auto mb-10 leading-relaxed text-sm md:text-base">
          Industrial athletics for the modern elite. Push through structural
          barriers with data-driven training and raw intensity. This isn't just
          fitness; it's high-velocity engineering for the human body.
        </p>

        {/* Call to Action Controls Interactivity */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto sm:max-w-none">
          <Link href={"/classes"}>
            <button className="bg-[#caf300] text-black px-10 py-4 text-sm font-black uppercase tracking-wider hover:bg-white transition-all active:scale-95 w-full sm:w-auto">
              EXPLORE CLASSES
            </button>
          </Link>
          <button className="border-2 border-white text-white px-10 py-4 text-sm font-black uppercase tracking-wider hover:bg-white hover:text-black transition-all active:scale-95 w-full sm:w-auto">
            JOIN THE ELITE
          </button>
        </div>
      </div>

      {/* Minimalist Grid Navigation Sync Indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
        {SLIDER_IMAGES.map((_, index) => {
          const isActive = index === currentSlide;
          return (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Jump directly to operation profile layout slide ${index + 1}`}
              className={`h-1.5 transition-all duration-300 focus:outline-none ${
                isActive
                  ? "w-8 bg-[#caf300]"
                  : "w-4 bg-white/30 hover:bg-white/60"
              }`}
            />
          );
        })}
      </div>

      {/* Tactical Diagnostics Scroll Indicator */}
      <div className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex-col items-center opacity-70 z-30 text-white font-mono pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.25em] mb-1.5">
          Engage Scroll
        </span>
        <span className="material-symbols-outlined text-[#caf300] text-xl">
          expand_more
        </span>
      </div>
    </section>
  );
}