
// VEIL & VECTOR — SHARED ARTICLE JAVASCRIPT

(() => {
  "use strict";

  // Reading progress
  const progress = document.getElementById("progress");

  function updateProgress() {
    if (!progress) return;

    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const percentage = scrollableHeight > 0
      ? (window.scrollY / scrollableHeight) * 100
      : 0;

    progress.style.width =
      `${Math.min(100, Math.max(0, percentage))}%`;
  }

  window.addEventListener("scroll", updateProgress, {
    passive: true
  });

  window.addEventListener("resize", updateProgress);
  updateProgress();

  // Shared dark / aged-paper theme
  const themeToggle = document.getElementById("theme-toggle");
  const themeColor = document.querySelector(
    'meta[name="theme-color"]'
  );

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;

    if (themeToggle) {
      themeToggle.textContent =
        theme === "dark" ? "Light mode" : "Dark mode";

      themeToggle.setAttribute(
        "aria-label",
        theme === "dark"
          ? "Switch to light mode"
          : "Switch to dark mode"
      );
    }

    if (themeColor) {
      themeColor.content =
        theme === "dark" ? "#11100f" : "#e9dfcc";
    }
  }

  let savedTheme = "dark";

  try {
    savedTheme = localStorage.getItem("vv-theme") || "dark";
  } catch (error) {
    // Keep the default theme if browser storage is unavailable.
  }

  applyTheme(savedTheme === "light" ? "light" : "dark");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme =
        document.documentElement.dataset.theme === "dark"
          ? "light"
          : "dark";

      applyTheme(nextTheme);

      try {
        localStorage.setItem("vv-theme", nextTheme);
      } catch (error) {
        // The theme still changes for this page.
      }
    });
  }

  // Reveal content as it enters the viewport
  const revealElements = document.querySelectorAll(".reveal");

  if (
    "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08
    });

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }
})();
