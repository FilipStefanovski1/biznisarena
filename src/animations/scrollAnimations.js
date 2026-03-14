import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations() {
  // Sections
  gsap.utils.toArray(".section").forEach(section => {
    gsap.from(section, {
      opacity: 0,
      y: 70,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%"
      }
    });
  });

  // Cards stagger
  gsap.utils.toArray(".cards").forEach(cards => {
    gsap.from(cards.children, {
      opacity: 0,
      y: 40,
      stagger: 0.12,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: cards,
        start: "top 85%"
      }
    });
  });

  // TBA Grid stagger
  gsap.utils.toArray(".coming-grid").forEach(grid => {
    gsap.from(grid.children, {
      opacity: 0,
      y: 24,
      stagger: 0.06,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: grid,
        start: "top 88%"
      }
    });
  });
}