document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".dashboard-nav-item");
  const sections = Array.from(navLinks)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || sections.length === 0) return;

  const headerOffset = () => (window.innerWidth <= 768 ? 90 : 40); // móvil vs desktop

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${id}`,
          );
        });
      });
    },
    {
      root: null,
      rootMargin: () => `-${headerOffset()}px 0px -60% 0px`,
      threshold: 0.1,
    },
  );

  sections.forEach((section) => observer.observe(section));
});
