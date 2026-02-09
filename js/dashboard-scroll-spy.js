document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".dashboard-nav-item");
  const sections = [];
  
  navLinks.forEach(link => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section) sections.push(section);
  });

  if (!("IntersectionObserver" in window) || sections.length === 0) return;

  // Calcular offset - FORMA SEGURA
  const offset = window.innerWidth <= 768 ? 90 : 40;
  
  // rootMargin - FORMA ABSOLUTAMENTE SEGURA
  let rootMargin;
  if (offset === 90) {
    rootMargin = "-90px 0px -60% 0px";
  } else {
    rootMargin = "-40px 0px -60% 0px";
  }
  
  // VALIDACIÓN EXTRA
  console.log("Validando rootMargin:", {
    valor: rootMargin,
    tipo: typeof rootMargin,
    longitud: rootMargin.length,
    caracteres: Array.from(rootMargin).map(c => c.charCodeAt(0))
  });

  try {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${id}`;
            if (isActive) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        });
      },
      {
        root: null,
        rootMargin: rootMargin,
        threshold: 0.1,
      }
    );

    sections.forEach((section) => observer.observe(section));
    console.log("Observer creado con éxito. rootMargin usado:", rootMargin);
  } catch (error) {
    console.error("Error FATAL al crear observer:", error);
    console.error("rootMargin que causó el error:", JSON.stringify(rootMargin));
  }
});