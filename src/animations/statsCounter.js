import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initStatsCounter() {
  document.querySelectorAll("[data-count]").forEach(el => {
    const value = Number(el.dataset.count || "0");
    el.innerText = "0";

    gsap.to(el, {
      innerText: value,
      duration: 1.8,
      ease: "power1.out",
      snap: { innerText: 1 },
      scrollTrigger: {
        trigger: el,
        start: "top 85%"
      }
    });
  });
}