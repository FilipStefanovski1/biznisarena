import gsap from "gsap";

export function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const links = mobileNav.querySelectorAll("a");

  if (!toggle || !mobileNav) return;

  const menuTl = gsap.timeline({ paused: true });

  menuTl.to(mobileNav, {
    x: 0,
    duration: 0.5,
    ease: "power3.inOut"
  }).from(links, {
    y: 20,
    opacity: 0,
    stagger: 0.1,
    duration: 0.4,
    ease: "power2.out"
  }, "-=0.2");

  toggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    toggle.classList.toggle("open");

    if (isOpen) {
      menuTl.play();
      document.body.style.overflow = "hidden";
    } else {
      menuTl.reverse();
      document.body.style.overflow = "auto";
    }
  });

  links.forEach(link => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      toggle.classList.remove("open");
      menuTl.reverse();
      document.body.style.overflow = "auto";
    });
  });
}