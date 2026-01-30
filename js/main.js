// ===== MAIN.JS - VERSIÃ“N COMPLETA CON SCROLL SPY =====
// Excluye completamente el menÃº del dashboard - manejado por dashboard-manager.js

document.addEventListener('DOMContentLoaded', function () {
  console.log('âœ… DOM cargado - Inicializando funcionalidades...');

  // ===== 1. HEADER Y NAVEGACIÃ“N CON SCROLL SPY =====
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mainNav = document.getElementById('mainNav');
  const mainHeader = document.getElementById('mainHeader');
  const navLinks = document.querySelectorAll('.nav-link');

  // MenÃº mÃ³vil
  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      mobileMenuToggle.innerHTML = mainNav.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });

    // Cerrar menÃº al hacer clic en enlace
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  // Scroll effect para header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }

    // Actualizar navegaciÃ³n activa (scroll spy)
    updateActiveNavLink();
  });

  // ===== 2. SCROLL SPY PARA ACTUALIZAR NAVEGACIÃ“N =====
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100; // Offset para activar antes

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute('id');

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        // Remover clase active de todos los enlaces
        navLinks.forEach((link) => {
          link.classList.remove('active');
        });

        // Agregar clase active al enlace correspondiente
        const activeLink = document.querySelector(
          `.nav-link[href="#${sectionId}"]`
        );
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }

  // Inicializar scroll spy
  updateActiveNavLink();

  // ===== 3. SMOOTH SCROLLING MEJORADO (EXCLUYE DASHBOARD) =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      // EXCEPCIÃ“N CRÃTICA: No aplicar a enlaces del menÃº del dashboard
      if (
        this.closest('.dashboard-nav') ||
        this.closest('.dashboard-sidebar') ||
        this.classList.contains('dashboard-nav-item')
      ) {
        console.log(
          'ðŸ”— Enlace del dashboard - dejando que dashboard-manager.js lo maneje'
        );
        return;
      }

      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = mainHeader.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 10;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });

        // Actualizar clase activa
        navLinks.forEach((link) => {
          link.classList.remove('active');
        });
        this.classList.add('active');
      }
    });
  });

  // ===== 4. ACORDEÃ“N METODOLOGÃA - VERSIÃ“N CORREGIDA =====
  const accordionItems = document.querySelectorAll('.accordion-item');

  if (accordionItems.length > 0) {
    console.log('ðŸŽ¯ AcordeÃ³n encontrado:', accordionItems.length, 'items');

    accordionItems.forEach((item) => {
      const header = item.querySelector('.accordion-header');

      if (header) {
        header.addEventListener('click', () => {
          console.log('ðŸ‘† Click en acordeÃ³n');

          // Verificar si el item actual ya estÃ¡ activo
          const isActive = item.classList.contains('active');

          // Cerrar todos los items primero
          accordionItems.forEach((otherItem) => {
            otherItem.classList.remove('active');
          });

          // Si el item clickeado NO estaba activo, abrirlo
          if (!isActive) {
            item.classList.add('active');
          }

          // Opcional: Desplazar suavemente hacia el acordeÃ³n si estÃ¡ colapsado
          if (!isActive && window.innerWidth < 768) {
            setTimeout(() => {
              item.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
              });
            }, 300);
          }
        });
      }
    });

    // Verificar que el primer item estÃ© activo por defecto
    const firstItem = document.querySelector('.accordion-item');
    if (firstItem && !firstItem.classList.contains('active')) {
      firstItem.classList.add('active');
    }
  } else {
    console.warn('âš ï¸ No se encontraron elementos del acordeÃ³n');
  }

})
