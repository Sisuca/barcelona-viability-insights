// ===== MAIN.JS - VERSIÓN COMPLETA CON SCROLL SPY =====
// Excluye completamente el menú del dashboard - manejado por dashboard-manager.js

document.addEventListener("DOMContentLoaded", function () {
  // ===== 1. HEADER Y NAVEGACIÓN CON SCROLL SPY =====
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mainNav = document.getElementById("mainNav");
  const mainHeader = document.getElementById("mainHeader");
  const navLinks = document.querySelectorAll(".nav-link");

  // Menú móvil
  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener("click", () => {
      mainNav.classList.toggle("active");
      mobileMenuToggle.innerHTML = mainNav.classList.contains("active")
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });

    // Cerrar menú al hacer clic en enlace
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("active");
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  // Scroll effect para header
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      mainHeader.classList.add("scrolled");
    } else {
      mainHeader.classList.remove("scrolled");
    }

    // Actualizar navegación activa (scroll spy)
    updateActiveNavLink();
  });

  // ===== 2. SCROLL SPY PARA ACTUALIZAR NAVEGACIÓN =====
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = window.scrollY + 100; // Offset para activar antes

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        // Remover clase active de todos los enlaces
        navLinks.forEach((link) => {
          link.classList.remove("active");
        });

        // Agregar clase active al enlace correspondiente
        const activeLink = document.querySelector(
          `.nav-link[href="#${sectionId}"]`,
        );
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }

  // Inicializar scroll spy
  updateActiveNavLink();

  // ===== 3. SMOOTH SCROLLING MEJORADO (EXCLUYE DASHBOARD) =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      // EXCEPCIÓN CRÍTICA: No aplicar a enlaces del menú del dashboard
      if (
        this.closest(".dashboard-nav") ||
        this.closest(".dashboard-sidebar") ||
        this.classList.contains("dashboard-nav-item")
      ) {
        return;
      }

      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = mainHeader.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 10;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Actualizar clase activa
        navLinks.forEach((link) => {
          link.classList.remove("active");
        });
        this.classList.add("active");
      }
    });
  });

  // ===== 4. ACORDEÓN METODOLOGÍA - VERSIÓN CORREGIDA =====
  const accordionItems = document.querySelectorAll(".accordion-item");

  if (accordionItems.length > 0) {
    accordionItems.forEach((item) => {
      const header = item.querySelector(".accordion-header");

      if (header) {
        header.addEventListener("click", () => {
          // Verificar si el item actual ya está activo
          const isActive = item.classList.contains("active");

          // Cerrar todos los items primero
          accordionItems.forEach((otherItem) => {
            otherItem.classList.remove("active");
          });

          // Si el item clickeado NO estaba activo, abrirlo
          if (!isActive) {
            item.classList.add("active");
          }

          // Opcional: Desplazar suavemente hacia el acordeón si está colapsado
          if (!isActive && window.innerWidth < 768) {
            setTimeout(() => {
              item.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
              });
            }, 300);
          }
        });
      }
    });

    // Verificar que el primer item está activo por defecto
    const firstItem = document.querySelector(".accordion-item");
    if (firstItem && !firstItem.classList.contains("active")) {
      firstItem.classList.add("active");
    }
  }
});
