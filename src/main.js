document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".navbar");

  // Desktop nav links (only used for scrollspy on sections)
  const navLinks = Array.from(document.querySelectorAll(".nav-menu a"));
  const sections = Array.from(document.querySelectorAll("section[id]"));

  // Mobile nav
  const navToggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector("#mobileNav");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // -----------------------
  // Sticky header
  // -----------------------
  const onScroll = () => {
    const y = window.scrollY;

    if (header) {
      if (y > 40) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    }

    // Scrollspy (only if we have in-page sections)
    if (sections.length && navLinks.length) updateActiveNavLink();
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // -----------------------
  // Mobile nav toggle
  // -----------------------
  const isMobileNavOpen = () => {
    if (!mobileNav) return false;
    // If hidden attribute is missing, treat it as open only when it's visible
    return mobileNav.hidden === false;
  };

  const closeMobileNav = () => {
    if (!mobileNav) return;
    mobileNav.hidden = true;
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Отвори мени");
    document.body.classList.remove("no-scroll");
  };

  const openMobileNav = () => {
    if (!mobileNav) return;
    mobileNav.hidden = false;
    navToggle?.setAttribute("aria-expanded", "true");
    navToggle?.setAttribute("aria-label", "Затвори мени");
    document.body.classList.add("no-scroll");
  };

  // Ensure initial state is closed (important if some pages forgot hidden="")
  if (mobileNav && typeof mobileNav.hidden !== "boolean") {
    mobileNav.hidden = true;
  } else if (mobileNav && mobileNav.hidden !== true) {
    // If it starts open by accident, close it
    closeMobileNav();
  }

  navToggle?.addEventListener("click", () => {
    if (!mobileNav) return;
    if (isMobileNavOpen()) closeMobileNav();
    else openMobileNav();
  });

  // Close mobile nav on link click
  document.querySelectorAll(".mobile-nav a").forEach((a) => {
    a.addEventListener("click", () => closeMobileNav());
  });

  // Close on escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileNav();
  });

  // Close if user clicks outside the menu/toggle when open
  document.addEventListener("click", (e) => {
    if (!mobileNav || !navToggle) return;
    if (!isMobileNavOpen()) return;

    const target = e.target;
    const clickedInsideMenu = mobileNav.contains(target);
    const clickedToggle = navToggle.contains(target);

    if (!clickedInsideMenu && !clickedToggle) closeMobileNav();
  });

  // Close if resized to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMobileNav();
  });

  // -----------------------
  // Hero particles
  // -----------------------
  const particlesContainer = document.querySelector('.hero-particles');
  if (particlesContainer && !prefersReducedMotion) {
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'hero-particle';
      const size = Math.random() * 3 + 1;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = (Math.random() * 8 + 6) + 's';
      p.style.animationDelay = (Math.random() * 6) + 's';
      p.style.opacity = Math.random() * 0.5 + 0.2;
      particlesContainer.appendChild(p);
    }
  }

  // -----------------------
  // Parallax on hero globe
  // -----------------------
  const heroGlobe = document.querySelector('.hero-globe img');
  if (heroGlobe && !prefersReducedMotion) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroGlobe.style.transform = `scale(1.05) translateY(${y * 0.15}px)`;
    }, { passive: true });
  }

  // -----------------------
  // Mouse tilt on hero content
  // -----------------------
  const heroContent = document.querySelector('.hero-content');
  const heroSection = document.querySelector('.hero');
  if (heroContent && heroSection && !prefersReducedMotion) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroContent.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
    });
    heroSection.addEventListener('mouseleave', () => {
      heroContent.style.transform = 'translate(0, 0)';
      heroContent.style.transition = 'transform 0.5s ease';
      setTimeout(() => { heroContent.style.transition = ''; }, 500);
    });
  }

  // -----------------------
  // Reveal on scroll
  // -----------------------
  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  if (!prefersReducedMotion && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.02 }
    );

    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // -----------------------
  // Count-up stats (once)
  // -----------------------
  const statNumbers = Array.from(
    document.querySelectorAll(".stat strong[data-count]")
  );

  if (statNumbers.length) {
    const animateCount = (el) => {
      const target = Number(el.dataset.count || "0");
      const duration = 1100;
      const startTime = performance.now();

      const tick = (now) => {
        const t = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const value = Math.round(target * eased);
        el.textContent = String(value);
        if (t < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    if (!prefersReducedMotion) {
      const statsSection = document.querySelector("#numbers");
      if (statsSection) {
        const ioStats = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                statNumbers.forEach((n) => animateCount(n));
                ioStats.disconnect();
              }
            });
          },
          { threshold: 0.25 }
        );
        ioStats.observe(statsSection);
      } else {
        statNumbers.forEach((n) => animateCount(n));
      }
    } else {
      statNumbers.forEach((n) => {
        n.textContent = String(n.dataset.count || "0");
      });
    }
  }

  // -----------------------
  // FAQ accordion (single open)
  // -----------------------
  document.querySelectorAll(".faq-item").forEach((item) => {
    const btn = item.querySelector(".faq-question");
    const ans = item.querySelector(".faq-answer");
    if (!btn || !ans) return;

    btn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      document.querySelectorAll(".faq-item.active").forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove("active");
          const b = openItem.querySelector(".faq-question");
          b?.setAttribute("aria-expanded", "false");
        }
      });

      item.classList.toggle("active", !isActive);
      btn.setAttribute("aria-expanded", String(!isActive));
    });
  });

  // -----------------------
  // Scrollspy: active link (only works for # anchors)
  // -----------------------
  function updateActiveNavLink() {
    const y = window.scrollY + 140;
    let currentId = null;

    for (const section of sections) {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (y >= top && y < bottom) {
        currentId = section.id;
        break;
      }
    }

    navLinks.forEach((a) => {
      const href = a.getAttribute("href") || "";
      const id = href.startsWith("#") ? href.slice(1) : null;
      a.classList.toggle("active", !!id && id === currentId);
    });
  }

  // -----------------------
  // Language toggle (simple)
  // -----------------------
  const langBtns = Array.from(document.querySelectorAll(".lang-toggle button"));
  const transEls = Array.from(document.querySelectorAll("[data-mk][data-en]"));

  const setLang = (lang) => {
    langBtns.forEach((b) =>
      b.classList.toggle("active", b.dataset.lang === lang)
    );

    transEls.forEach((el) => {
      el.textContent = lang === "en" ? el.dataset.en : el.dataset.mk;
    });

    localStorage.setItem("ba_lang", lang);
    document.documentElement.lang = lang === "en" ? "en" : "mk";
  };

  langBtns.forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });

  const saved = localStorage.getItem("ba_lang");
  if (saved === "en" || saved === "mk") setLang(saved);

  // -----------------------
  // Countdown timer
  // -----------------------
  const cdDays = document.getElementById("cd-days");
  const cdHours = document.getElementById("cd-hours");
  const cdMins = document.getElementById("cd-mins");
  const cdSecs = document.getElementById("cd-secs");

  if (cdDays) {
    const eventDate = new Date("2026-10-14T09:00:00+02:00").getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.max(0, eventDate - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      cdDays.textContent = String(days).padStart(3, "0");
      cdHours.textContent = String(hours).padStart(2, "0");
      cdMins.textContent = String(mins).padStart(2, "0");
      cdSecs.textContent = String(secs).padStart(2, "0");
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // -----------------------
  // Sponsor form (inline feedback)
  // -----------------------
  const sponsorForm = document.querySelector("#sponsorForm");
  sponsorForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = sponsorForm.querySelector('button[type="submit"]');
    if (btn) {
      btn.textContent = "Испратено!";
      btn.classList.add("btn-success");
      btn.disabled = true;
    }
    sponsorForm.reset();
    setTimeout(() => {
      if (btn) {
        btn.textContent = "Испрати";
        btn.classList.remove("btn-success");
        btn.disabled = false;
      }
    }, 3000);
  });

  // -----------------------
  // Contact form (inline feedback)
  // -----------------------
  const contactForm = document.querySelector("#contactForm");
  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    if (btn) {
      btn.textContent = "Испратено!";
      btn.classList.add("btn-success");
      btn.disabled = true;
    }
    contactForm.reset();
    setTimeout(() => {
      if (btn) {
        btn.textContent = "Испрати";
        btn.classList.remove("btn-success");
        btn.disabled = false;
      }
    }, 3000);
  });

  // -----------------------
  // Sticky tickets CTA
  // -----------------------
  const stickyCta = document.querySelector(".sticky-cta");
  if (stickyCta) {
    const heroEl = document.querySelector(".hero");
    const heroBottom = heroEl ? heroEl.offsetTop + heroEl.offsetHeight : 600;

    const updateSticky = () => {
      if (window.scrollY > heroBottom) stickyCta.classList.add("visible");
      else stickyCta.classList.remove("visible");
    };

    window.addEventListener("scroll", updateSticky, { passive: true });
    updateSticky();
  }

  // -----------------------
  // Plexus network canvas
  // -----------------------
  const plexusTargets = document.querySelectorAll('.plexus-canvas');
  if (plexusTargets.length && !prefersReducedMotion) {
    plexusTargets.forEach((container) => {
      const canvas = document.createElement('canvas');
      container.appendChild(canvas);
      const ctx = canvas.getContext('2d');

      let w, h, points;
      const POINT_COUNT = 40;
      const MAX_DIST = 120;

      const resize = () => {
        w = container.offsetWidth;
        h = container.offsetHeight;
        canvas.width = w;
        canvas.height = h;
      };

      const initPoints = () => {
        points = [];
        for (let i = 0; i < POINT_COUNT; i++) {
          points.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
          });
        }
      };

      const draw = () => {
        ctx.clearRect(0, 0, w, h);

        // Move points
        points.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        });

        // Draw lines
        for (let i = 0; i < points.length; i++) {
          for (let j = i + 1; j < points.length; j++) {
            const dx = points[i].x - points[j].x;
            const dy = points[i].y - points[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MAX_DIST) {
              const alpha = 1 - dist / MAX_DIST;
              ctx.strokeStyle = `rgba(124, 92, 252, ${alpha * 0.5})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(points[i].x, points[i].y);
              ctx.lineTo(points[j].x, points[j].y);
              ctx.stroke();
            }
          }
        }

        // Draw dots
        points.forEach((p) => {
          ctx.fillStyle = 'rgba(168, 85, 247, 0.6)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        });

        requestAnimationFrame(draw);
      };

      resize();
      initPoints();
      draw();

      window.addEventListener('resize', () => {
        resize();
        initPoints();
      });
    });
  }

});

// -----------------------
// Sweden Market Entry form (UX + validation)
// -----------------------
const swedenForm = document.querySelector("#swedenEntryForm");

if (swedenForm) {
  const prefersReducedMotionLocal = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const countWords = (text) =>
    text
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

  // Word limits for any textarea with data-max-words
  const limitedTextareas = Array.from(
    swedenForm.querySelectorAll("textarea[data-max-words]")
  );

  limitedTextareas.forEach((ta) => {
    const max = Number(ta.dataset.maxWords || "0");
    const counter = swedenForm.querySelector(`[data-wordcount="${ta.id}"]`);

    const update = () => {
      const words = countWords(ta.value);

      if (counter) counter.textContent = `${Math.min(words, max)} / ${max} зборови`;

      // Hard cap: trim extra words (keeps it simple and “school safe”)
      if (max > 0 && words > max) {
        const trimmed = ta.value
          .trim()
          .split(/\s+/)
          .slice(0, max)
          .join(" ");
        ta.value = trimmed + (prefersReducedMotionLocal ? "" : " ");
      }
    };

    ta.addEventListener("input", update);
    update();
  });

  // Conditional: countries field only if intl_clients = yes
  const countriesWrap = swedenForm.querySelector("[data-countries-wrap]");
  const countriesInput = swedenForm.querySelector("#countries");
  const intlRadios = Array.from(swedenForm.querySelectorAll('input[name="intl_clients"]'));

  const updateCountries = () => {
    const selected = swedenForm.querySelector('input[name="intl_clients"]:checked')?.value;
    const show = selected === "yes";

    if (countriesWrap) countriesWrap.style.display = show ? "" : "none";
    if (countriesInput) {
      countriesInput.required = show;
      if (!show) countriesInput.value = "";
    }
  };

  intlRadios.forEach((r) => r.addEventListener("change", updateCountries));
  updateCountries();

  // Support checkboxes: require at least one
  const supportChecks = Array.from(swedenForm.querySelectorAll('input[name="support[]"]'));
  const supportAnchor = supportChecks[0] || null;

  const validateSupport = () => {
    if (!supportAnchor) return true;
    const any = supportChecks.some((c) => c.checked);
    supportAnchor.setCustomValidity(any ? "" : "Избери барем една опција.");
    return any;
  };

  supportChecks.forEach((c) => c.addEventListener("change", validateSupport));
  validateSupport();

  // Submit behavior:
  // - If action is "#" (or empty), we treat as frontend-only and show success alert.
  // - If you later add a real action URL, it will submit normally (after validation).
  swedenForm.addEventListener("submit", (e) => {
    // Honeypot: silently block obvious spam
    const hp = swedenForm.querySelector('input[name="website"]');
    if (hp && hp.value.trim() !== "") {
      e.preventDefault();
      return;
    }

    validateSupport();

    if (!swedenForm.checkValidity()) {
      e.preventDefault();
      swedenForm.reportValidity();
      return;
    }

    const action = (swedenForm.getAttribute("action") || "").trim();
    if (!action || action === "#") {
      e.preventDefault();
      swedenForm.reset();
      updateCountries();
      validateSupport();

      // reset counters
      limitedTextareas.forEach((ta) => ta.dispatchEvent(new Event("input")));

      alert("Формата е испратена. Ќе ве контактираме наскоро.");
    }
  });
}