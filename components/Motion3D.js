"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Motion3D — wraps content in a GSAP-driven 3D "frame".
 *  • Scroll-reveal: rotates in from a tilted perspective as it enters the viewport.
 *  • Live tilt: the card leans toward the cursor in 3D on hover.
 * Respects prefers-reduced-motion.
 */
export default function Motion3D({
  children,
  className = "",
  maxTilt = 9,
  delay = 0,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      // 3D scroll-reveal
      gsap.set(el, { transformPerspective: 900, transformStyle: "preserve-3d" });
      gsap.from(el, {
        opacity: 0,
        y: 46,
        rotateX: -16,
        scale: 0.96,
        duration: 0.9,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });
    }, el);

    // live cursor tilt
    const qx = gsap.quickTo(el, "rotateY", { duration: 0.5, ease: "power3.out" });
    const qy = gsap.quickTo(el, "rotateX", { duration: 0.5, ease: "power3.out" });

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      qx(px * maxTilt * 2);
      qy(-py * maxTilt * 2);
    };
    const onLeave = () => {
      qx(0);
      qy(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      ctx.revert();
    };
  }, [maxTilt, delay]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
