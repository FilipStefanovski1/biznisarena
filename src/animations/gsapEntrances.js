import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initGsapEntrances() {
  // HERO
  gsap.from(".hero-meta", {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
  });

  gsap.from(".hero h1", {
    y: 40,
    opacity: 0,
    duration: 1,
    delay: 0.1,
    ease: "power3.out",
  });

  gsap.from(".hero-lead", {
    y: 30,
    opacity: 0,
    duration: 0.9,
    delay: 0.2,
    ease: "power3.out",
  });

  gsap.from(".hero-actions .btn", {
    y: 20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.12,
    delay: 0.35,
    ease: "power3.out",
  });

  // SECTION HEADERS
  document.querySelectorAll(".section-head").forEach(head => {
    gsap.from(head.children, {
      scrollTrigger: {
        trigger: head,
        start: "top 85%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
    });
  });

  // CARDS (Only trigger if not handled by scrollAnimations)
  document.querySelectorAll(".cards").forEach(group => {
    gsap.from(group.children, {
      scrollTrigger: {
        trigger: group,
        start: "top 85%",
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
    });
  });
}