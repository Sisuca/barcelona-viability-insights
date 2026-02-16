// ===== GESTOR DE DASHBOARD =====
// Enlaces del menú apuntan al INICIO de cada subsección integrada

class DashboardManager {
  constructor() {
    this.currentPage = "vision-general";
    this.init();
  }

  init() {
    const navItems = document.querySelectorAll(".dashboard-nav-item");
    if (navItems.length === 0) return;

    this.bindEvents();
    this.setupInitialState();
  }

  bindEvents() {
    const navItems = document.querySelectorAll(".dashboard-nav-item");

    navItems.forEach((item) => {
      const newItem = item.cloneNode(true);
      item.parentNode.replaceChild(newItem, item);
      newItem.addEventListener("click", (e) => this.handleNavClick(e));
    });

    window.addEventListener("popstate", (e) => {
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
      this.handleNavigation(targetId);
    }
  }

  setupInitialState() {
    this.showPage("vision-general");
    this.updateActiveNavItem("vision-general");

    if (window.location.hash) {
      history.replaceState(null, null, window.location.pathname);
    }
  }

  handleNavigation(targetId, fromPopstate = false) {
    this.updateActiveNavItem(targetId);
    this.showPage("vision-general");

    if (targetId === "vision-general") {
      this.scrollToDashboard();
    } else if (
      targetId === "accessibility-section" ||
      targetId === "seniority-section"
    ) {
      setTimeout(() => {
        this.scrollToSection(targetId, !fromPopstate);
      }, 50);
    }

    this.currentPage = targetId;
  }

  showPage(pageId) {
    if (pageId !== "vision-general") {
      pageId = "vision-general";
    }

    document.querySelectorAll(".dashboard-page").forEach((page) => {
      page.classList.remove("active");
    });

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add("active");
    }
  }

  updateActiveNavItem(targetId) {
    const linkMap = {
      "vision-general": "#vision-general",
      "accessibility-section": "#accessibility-section",
      "seniority-section": "#seniority-section",
    };

    const targetHref = linkMap[targetId] || `#${targetId}`;

    document.querySelectorAll(".dashboard-nav-item").forEach((item) => {
      item.classList.remove("active");
    });

    const activeItem = document.querySelector(
      `.dashboard-nav-item[href="${targetHref}"]`,
    );
    if (activeItem) {
      activeItem.classList.add("active");
    }
  }

  scrollToSection(sectionId, smooth = true) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const header = document.getElementById("mainHeader");
    const headerHeight = header ? header.offsetHeight : 72;

    const sectionRect = section.getBoundingClientRect();
    const absoluteSectionTop = window.pageYOffset + sectionRect.top;
    const scrollPosition = absoluteSectionTop - headerHeight - 20;

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
      this.showDownloadMessage("Demo: funcionalidad de descarga simulada");
    }, 1500);
  }

  showDownloadMessage(text) {
    const message = document.createElement("div");
    message.className = "download-message";
    message.textContent = text;
    document.body.appendChild(message);

    setTimeout(() => {
      if (message.parentNode) {
        message.parentNode.removeChild(message);
      }
    }, 3000);
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  window.dashboardManager = new DashboardManager();
});
