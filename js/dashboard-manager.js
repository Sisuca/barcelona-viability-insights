// ===== GESTOR DE DASHBOARD =====
// Enlaces del menú apuntan al INICIO de cada subsección integrada

class DashboardManager {
  constructor() {
    this.currentPage = "vision-general";
    this.init();
  }

  init() {
    // Verificar que los elementos del menú existan
    const navItems = document.querySelectorAll(".dashboard-nav-item");
    if (navItems.length === 0) {
      return;
    }

    this.bindEvents();
    this.setupInitialState();
  }

  bindEvents() {
    const navItems = document.querySelectorAll(".dashboard-nav-item");

    navItems.forEach((item, index) => {
      const href = item.getAttribute("href");
      const text = item.querySelector(".nav-text")?.textContent || "sin texto";

      // Remover listeners previos
      const newItem = item.cloneNode(true);
      item.parentNode.replaceChild(newItem, item);

      // Agregar nuevo listener al nuevo elemento
      newItem.addEventListener("click", (e) => this.handleNavClick(e));
    });

    // Manejar popstate (navegación con botones atrás/adelante)
    window.addEventListener("popstate", (e) => {
      const hash = window.location.hash.substring(1);
      // No hacer nada con el hash, mantener vista de inicio
      this.showPage("vision-general");
      this.updateActiveNavItem("vision-general");
    });
  }

  handleNavClick(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    const href = e.currentTarget.getAttribute("href");

    if (href && href.startsWith("#")) {
      const targetId = href.substring(1);

      // NO actualizar URL con hash - mantener URL limpia
      // Manejar navegación
      this.handleNavigation(targetId);
    }
  }

  setupInitialState() {
    // Mostrar Resumen por defecto SIEMPRE
    this.showPage("vision-general");

    // Marcar el elemento activo por defecto (Resumen)
    this.updateActiveNavItem("vision-general");

    // LIMPIAR el hash de la URL completamente
    if (window.location.hash) {
      // Limpiar URL sin recargar la página
      history.replaceState(null, null, window.location.pathname);
    }

    // También limpiar cualquier parámetro de filtro en la URL
    if (window.location.search || window.location.hash.includes("?")) {
      history.replaceState(null, null, window.location.pathname);
    }
  }

  handleNavigation(targetId, fromPopstate = false) {
    // Actualizar elemento activo en el menú
    this.updateActiveNavItem(targetId);

    // Mostrar página Resumen (única página ahora)
    this.showPage("vision-general");

    // Scroll al inicio de la subsección correspondiente
    if (targetId === "vision-general") {
      this.scrollToDashboard();
    } else if (
      targetId === "accessibility-section" ||
      targetId === "seniority-section"
    ) {
      // Scroll al INICIO de la subsección
      setTimeout(() => {
        this.scrollToSection(targetId, !fromPopstate);
      }, 50);
    } else {
      this.scrollToDashboard();
    }

    this.currentPage = targetId;
  }

  showPage(pageId) {
    // Solo manejamos vision-general (página unificada)
    if (pageId !== "vision-general") {
      pageId = "vision-general";
    }

    // Ocultar todas las páginas
    document.querySelectorAll(".dashboard-page").forEach((page) => {
      page.classList.remove("active");
    });

    // Mostrar página Resumen
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add("active");
    }
  }

  updateActiveNavItem(targetId) {
    // Mapeo de targetId a href del menú (coinciden exactamente)
    const linkMap = {
      "vision-general": "#vision-general",
      "accessibility-section": "#accessibility-section",
      "seniority-section": "#seniority-section",
    };

    const targetHref = linkMap[targetId] || `#${targetId}`;
    // Remover clase active de todos
    document.querySelectorAll(".dashboard-nav-item").forEach((item) => {
      item.classList.remove("active");
    });

    // Agregar clase active al correspondiente
    const activeItem = document.querySelector(
      `.dashboard-nav-item[href="${targetHref}"]`,
    );
    if (activeItem) {
      activeItem.classList.add("active");
    } else {
      // Fallback: activar el primer elemento
      const firstItem = document.querySelector(".dashboard-nav-item");
      if (firstItem) {
        firstItem.classList.add("active");
      }
    }
  }

  scrollToSection(sectionId, smooth = true) {
    const section = document.getElementById(sectionId);
    if (!section) {
      return;
    }

    // Método más confiable: Usar getBoundingClientRect
    const header = document.getElementById("mainHeader");
    const headerHeight = header ? header.offsetHeight : 72;

    // Calcular posición absoluta de la sección
    const sectionRect = section.getBoundingClientRect();
    const absoluteSectionTop = window.pageYOffset + sectionRect.top;

    // Posición final con offset para header
    const scrollPosition = absoluteSectionTop - headerHeight - 20; // -20px de margen

    window.scrollTo({
      top: scrollPosition,
      behavior: smooth ? "smooth" : "auto",
    });
  }

  scrollToDashboard() {
    const dashboardSection = document.getElementById("dashboard-section");
    const header = document.getElementById("mainHeader");

    if (!dashboardSection || !header) return;

    const headerHeight = header.offsetHeight;
    const dashboardPosition = dashboardSection.offsetTop - headerHeight - 20;

    window.scrollTo({
      top: dashboardPosition,
      behavior: "smooth",
    });
  }

  handleDownload() {
    const downloadBtn = document.getElementById("downloadReportBtn");
    if (!downloadBtn) return;

    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Preparando descarga...';
    downloadBtn.style.opacity = "0.8";

    setTimeout(() => {
      downloadBtn.innerHTML = originalText;
      downloadBtn.style.opacity = "1";
      alert(
        "📄 En una implementación real, esto descargaría el PDF del informe completo.",
      );
    }, 1500);
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  window.dashboardManager = new DashboardManager();
});
