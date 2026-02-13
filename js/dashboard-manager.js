// ===== GESTOR DE DASHBOARD =====
// Enlaces del menú apuntan al INICIO de cada subsección integrada

class DashboardManager {
  constructor() {
    console.log("✅ Dashboard Manager V15.8.2 inicializando...");

    this.currentPage = "vision-general";
    this.init();
  }

  init() {
    console.log(
      "🎯 Iniciando Dashboard Manager (enlaces al inicio de subsecciones)...",
    );

    // Verificar que los elementos del menú existan
    const navItems = document.querySelectorAll(".dashboard-nav-item");
    console.log(`🔍 Encontrados ${navItems.length} elementos del menú lateral`);

    if (navItems.length === 0) {
      console.error(
        "❌ ERROR: No se encontraron elementos .dashboard-nav-item",
      );
      return;
    }

    this.bindEvents();
    this.setupInitialState();
    console.log("✅ Dashboard Manager inicializado (enlaces corregidos)");
  }

  bindEvents() {
    console.log("👂 Configurando event listeners...");

    const navItems = document.querySelectorAll(".dashboard-nav-item");

    navItems.forEach((item, index) => {
      const href = item.getAttribute("href");
      const text = item.querySelector(".nav-text")?.textContent || "sin texto";
      console.log(`  ${index + 1}. ${text} → ${href}`);

      // Remover listeners previos
      const newItem = item.cloneNode(true);
      item.parentNode.replaceChild(newItem, item);

      // Agregar nuevo listener al nuevo elemento
      newItem.addEventListener("click", (e) => this.handleNavClick(e));
    });

    // Manejar popstate (navegación con botones atrás/adelante)
    window.addEventListener("popstate", (e) => {
      const hash = window.location.hash.substring(1);
      console.log("🔙 Popstate detectado - Ignorando navegación por hash");
      // No hacer nada con el hash, mantener vista de inicio
      this.showPage("vision-general");
      this.updateActiveNavItem("vision-general");
    });

    console.log(`✅ Listeners configurados para ${navItems.length} elementos`);
  }

  handleNavClick(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    const href = e.currentTarget.getAttribute("href");
    console.log("🖱️ Click en menú lateral:", href);

    if (href && href.startsWith("#")) {
      const targetId = href.substring(1);
      console.log(`🎯 Navegando a inicio de subsección: ${targetId}`);

      // NO actualizar URL con hash - mantener URL limpia
      // history.pushState(null, null, href); ← ELIMINADO

      // Manejar navegación
      this.handleNavigation(targetId);
    }
  }

  setupInitialState() {
    console.log("⚙️ Configurando estado inicial - SIEMPRE vista de inicio");

    // 🚫 NO LEER el hash - forzamos inicio siempre
    // const hash = window.location.hash.substring(1); ← ELIMINADO

    console.log("📍 Forzando vista de inicio sin hash en URL");

    // Mostrar Resumen por defecto SIEMPRE
    this.showPage("vision-general");

    // 🚫 NO navegar a ningún hash aunque exista en la URL
    // ELIMINADO: if (hash) { setTimeout(() => this.handleNavigation(hash, false), 100); }

    // Marcar el elemento activo por defecto (Resumen)
    this.updateActiveNavItem("vision-general");

    // ✅ LIMPIAR el hash de la URL completamente
    if (window.location.hash) {
      // Limpiar URL sin recargar la página
      history.replaceState(null, null, window.location.pathname);
      console.log("🧹 Hash eliminado de la URL");
    }

    // También limpiar cualquier parámetro de filtro en la URL
    if (window.location.search || window.location.hash.includes("?")) {
      history.replaceState(null, null, window.location.pathname);
      console.log("🧹 Parámetros de URL eliminados");
    }
  }

  handleNavigation(targetId, fromPopstate = false) {
    console.log(
      `🔄 handleNavigation: ${targetId} (fromPopstate: ${fromPopstate})`,
    );

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
      console.warn(`⚠️ Destino no reconocido: ${targetId}`);
      this.scrollToDashboard();
    }

    this.currentPage = targetId;
  }

  showPage(pageId) {
    // Solo manejamos vision-general (página unificada)
    if (pageId !== "vision-general") {
      console.log(`ℹ️ Redirigiendo ${pageId} a vision-general`);
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
      console.log(`📄 Página activa: ${pageId}`);
    }
  }

  updateActiveNavItem(targetId) {
    console.log(`🎯 Actualizando menú activo para: ${targetId}`);

    // Mapeo de targetId a href del menú (coinciden exactamente)
    const linkMap = {
      "vision-general": "#vision-general",
      "accessibility-section": "#accessibility-section",
      "seniority-section": "#seniority-section",
    };

    const targetHref = linkMap[targetId] || `#${targetId}`;
    console.log(`  ↳ Buscando enlace con href: ${targetHref}`);

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
      console.log(`  ✅ Menú activo: ${targetHref}`);
    } else {
      console.warn(`  ⚠️ No se encontró enlace con href="${targetHref}"`);

      // Fallback: activar el primer elemento
      const firstItem = document.querySelector(".dashboard-nav-item");
      if (firstItem) {
        firstItem.classList.add("active");
        console.log("  ✅ Fallback: activado primer elemento del menú");
      }
    }
  }

  scrollToSection(sectionId, smooth = true) {
    console.log(
      `📍 Scroll al INICIO de subsección: ${sectionId} (smooth: ${smooth})`,
    );

    const section = document.getElementById(sectionId);
    if (!section) {
      console.error(`❌ Sección no encontrada: #${sectionId}`);
      console.log("   🔍 Buscando elementos con esa ID...");
      console.log(
        '   • Elementos con id "accessibility-section":',
        document.querySelectorAll("#accessibility-section").length,
      );
      console.log(
        '   • Elementos con id "seniority-section":',
        document.querySelectorAll("#seniority-section").length,
      );
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

    console.log(`  ↳ Posición calculada: ${scrollPosition}px`);

    window.scrollTo({
      top: scrollPosition,
      behavior: smooth ? "smooth" : "auto",
    });
  }

  scrollToDashboard() {
    console.log("📍 Scroll al inicio del dashboard (Resumen)");

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
    console.log("📥 Simulando descarga del informe PDF...");

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
  console.log("=== 🏁 DOM CARGADO - INICIANDO DASHBOARD MANAGER V15.8.2 ===");
  window.dashboardManager = new DashboardManager();
  console.log(
    "=== ✅ DASHBOARD MANAGER V15.8.2 LISTO (URL siempre limpia) ===",
  );
});
