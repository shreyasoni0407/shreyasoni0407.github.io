/**
 * Template Name: iPortfolio
 * Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
 * Updated: Jan 2025
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /** ========================
   * Header Toggle
   ======================== */
  const headerToggleBtn = document.querySelector(".header-toggle");
  const header = document.querySelector("#header");

  if (headerToggleBtn && header) {
    headerToggleBtn.addEventListener("click", () => {
      header.classList.toggle("header-show");
      headerToggleBtn.classList.toggle("bi-list");
      headerToggleBtn.classList.toggle("bi-x");
    });
  }

  /** ========================
   * Hide Mobile Nav on Same-page Links
   ======================== */
  const navMenuLinks = document.querySelectorAll("#navmenu a");
  if (navMenuLinks.length > 0) {
    navMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (header.classList.contains("header-show")) {
          header.classList.remove("header-show");
          headerToggleBtn.classList.remove("bi-x");
          headerToggleBtn.classList.add("bi-list");
        }
      });
    });
  }

  /** ========================
   * Preloader Removal
   ======================== */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => preloader.remove());
  }

  /** ========================
   * Scroll to Top Button
   ======================== */
  const scrollTopBtn = document.querySelector(".scroll-top");
  const toggleScrollTop = () => {
    if (scrollTopBtn) {
      window.scrollY > 100
        ? scrollTopBtn.classList.add("active")
        : scrollTopBtn.classList.remove("active");
    }
  };

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    window.addEventListener("scroll", toggleScrollTop);
    window.addEventListener("load", toggleScrollTop);
  }

  /** ========================
   * Animation on Scroll (AOS)
   ======================== */
  const initAOS = () => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  };
  window.addEventListener("load", initAOS);

  /** ========================
   * Typed.js Initialization
   ======================== */
  const typedElement = document.querySelector(".typed");
  if (typedElement) {
    const typedStrings = typedElement.getAttribute("data-typed-items").split(",");
    new Typed(".typed", {
      strings: typedStrings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  /** ========================
   * PureCounter Initialization
   ======================== */
  new PureCounter();

  /** ========================
   * Skills Progress Animation
   ======================== */
  const skillsAnimations = document.querySelectorAll(".skills-animation");
  skillsAnimations.forEach((item) => {
    new Waypoint({
      element: item,
      offset: "80%",
      handler: () => {
        const progressBars = item.querySelectorAll(".progress .progress-bar");
        progressBars.forEach((bar) => {
          bar.style.width = bar.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  });

  /** ========================
   * GLightbox Initialization
   ======================== */
  const glightbox = GLightbox({ selector: ".glightbox" });

  /** ========================
   * Isotope Layout and Filters
   ======================== */
  const initializeIsotope = () => {
    document.querySelectorAll(".isotope-layout").forEach((layout) => {
      const layoutMode = layout.getAttribute("data-layout") || "masonry";
      const defaultFilter = layout.getAttribute("data-default-filter") || "*";
      const sortBy = layout.getAttribute("data-sort") || "original-order";
      const container = layout.querySelector(".isotope-container");

      if (container) {
        imagesLoaded(container, () => {
          const iso = new Isotope(container, {
            itemSelector: ".isotope-item",
            layoutMode: layoutMode,
            filter: defaultFilter,
            sortBy: sortBy,
          });

          layout.querySelectorAll(".isotope-filters li").forEach((filter) => {
            filter.addEventListener("click", function () {
              layout
                .querySelector(".isotope-filters .filter-active")
                .classList.remove("filter-active");
              this.classList.add("filter-active");
              iso.arrange({ filter: this.getAttribute("data-filter") });
              AOS.refresh();
            });
          });
        });
      }
    });
  };
  window.addEventListener("load", initializeIsotope);

  /** ========================
   * Swiper Sliders Initialization
   ======================== */
  const initSwipers = () => {
    document.querySelectorAll(".init-swiper").forEach((swiperElement) => {
      const config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );
      new Swiper(swiperElement, config);
    });
  };
  window.addEventListener("load", initSwipers);

  /** ========================
   * Hash Link Scroll Position Fix
   ======================== */
  const fixHashScrollPosition = () => {
    if (window.location.hash) {
      const targetSection = document.querySelector(window.location.hash);
      if (targetSection) {
        setTimeout(() => {
          const scrollMarginTop = parseInt(
            getComputedStyle(targetSection).scrollMarginTop
          );
          window.scrollTo({
            top: targetSection.offsetTop - scrollMarginTop,
            behavior: "smooth",
          });
        }, 100);
      }
    }
  };
  window.addEventListener("load", fixHashScrollPosition);

  /** ========================
   * Scrollspy for Navmenu Links
   ======================== */
  const navMenuScrollspy = () => {
    const position = window.scrollY + 200;
    navMenuLinks.forEach((link) => {
      const section = document.querySelector(link.hash);
      if (!section) return;

      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((activeLink) => activeLink.classList.remove("active"));
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };
  window.addEventListener("scroll", navMenuScrollspy);
  window.addEventListener("load", navMenuScrollspy);
})();