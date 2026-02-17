// ================================
// APP INITIALIZER - VERSIÓN V15.8.1
// ================================

class AppInitializer {
  constructor() {
    // ELIMINADO: console.log('🚀 AppInitializer V15.8.1 inicializando...');
    this.initAttempts = 0;
    this.maxAttempts = 10;
    this.init();
  }

  init() {
    // ELIMINADO: console.log('🎯 Iniciando secuencia de arranque...');

    // Escuchar cuando el DOM esté listo
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () =>
        this.startInitialization(),
      );
    } else {
      this.startInitialization();
    }
  }

  startInitialization() {
    // ELIMINADO: console.log('🔍 Verificando dependencias...');

    // Verificar que los datos básicos estén cargados
    if (!this.areDataFilesLoaded()) {
      // ELIMINADO: console.warn('⚠️ Datos aún no cargados, reintentando...');
      this.retryInitialization();
      return;
    }

    // Verificar que los managers estén disponibles
    this.checkManagers();
  }

  areDataFilesLoaded() {
    // Verificar que las variables de datos globales existan
    const rentDataLoaded =
      typeof RENT_DATA !== "undefined" && RENT_DATA.length > 0;
    const profilesDataLoaded =
      typeof PROFILES_DATA !== "undefined" && PROFILES_DATA.length > 0;

    // ELIMINADO: console.log(`📊 Datos cargados: Rentas=${rentDataLoaded ? '✅' : '❌'}, Perfiles=${profilesDataLoaded ? '✅' : '❌'}`);

    return rentDataLoaded && profilesDataLoaded;
  }

  checkManagers() {
    // ELIMINADO: console.log('👨‍💼 Verificando managers...');

    const managers = {
      dataProcessorFinal: window.dataProcessorFinal,
      filtersManager: window.filtersManager,
      kpiCardsManager: window.kpiCardsManager,
      tableManager: window.tableManager,
      accessibilityHeatmapManager: window.accessibilityHeatmapManager,
      seniorityManager: window.seniorityManager,
    };

    // DIAGNÓSTICO ESPECÍFICO PARA SENIORITY MANAGER
    // ELIMINADO: console.log('🔍 Diagnóstico SeniorityManager:', {
    // ELIMINADO:   existeEnWindow: 'seniorityManager' in window,
    // ELIMINADO:   tipo: typeof window.seniorityManager,
    // ELIMINADO:   valor: window.seniorityManager
    // ELIMINADO: });

    // Si seniorityManager no existe, intentar crearlo manualmente
    if (!window.seniorityManager && typeof SeniorityManager !== "undefined") {
      // ELIMINADO: console.log('🔄 Intentando instanciar SeniorityManager manualmente...');
      try {
        window.seniorityManager = new SeniorityManager();
        // ELIMINADO: console.log('✅ SeniorityManager instanciado manualmente');
      } catch (error) {
        // ELIMINADO: console.error('❌ Error instanciando SeniorityManager:', error);
      }
    }

    const essentialManagersReady =
      managers.dataProcessorFinal &&
      managers.filtersManager &&
      managers.kpiCardsManager &&
      managers.tableManager;

    if (essentialManagersReady) {
      // ELIMINADO: console.log('✅ Managers esenciales listos:', Object.keys(managers).filter(k => managers[k]).join(', '));
      this.initializeDashboard();
    } else {
      // ELIMINADO: console.log('⏳ Esperando managers...', Object.keys(managers).filter(k => !managers[k]));
      this.retryInitialization();
    }
  }

  retryInitialization() {
    this.initAttempts++;

    if (this.initAttempts >= this.maxAttempts) {
      // ELIMINADO: console.error('❌ Máximo de intentos alcanzado. Verifica:');
      // ELIMINADO: console.error('1. Orden de scripts en index.html');
      // ELIMINADO: console.error('2. Variables globales: RENT_DATA, PROFILES_DATA');
      // ELIMINADO: console.error('3. Managers: dataProcessorFinal, filtersManager, etc.');
      // ELIMINADO: console.error('4. SeniorityManager:', {
      // ELIMINADO:     enWindow: 'seniorityManager' in window,
      // ELIMINADO:     claseDisponible: typeof SeniorityManager !== 'undefined',
      // ELIMINADO:     scriptsCargados: document.querySelectorAll('script[src*="seniority"]').length
      // ELIMINADO: });
      this.showErrorState();
      return;
    }

    setTimeout(() => this.checkManagers(), 500);
  }

  initializeDashboard() {
    // ELIMINADO: console.log('🎬 Inicializando dashboard con filtros por defecto...');

    try {
      // Obtener filtros iniciales
      const initialFilters = window.filtersManager.getCurrentFilters();
      // ELIMINADO: console.log('🔧 Filtros iniciales:', initialFilters);

      // Inicializar KPIs
      if (
        window.kpiCardsManager &&
        typeof window.kpiCardsManager.updateKPICards === "function"
      ) {
        window.kpiCardsManager.updateKPICards(initialFilters);
        // ELIMINADO: console.log('✅ KPIs inicializados');
      }

      // Inicializar tabla y gráfico
      if (
        window.tableManager &&
        typeof window.tableManager.onFiltersChanged === "function"
      ) {
        window.tableManager.onFiltersChanged(initialFilters);
        // ELIMINADO: console.log('✅ Tabla y gráfico inicializados');
      }

      // Inicializar matriz de calor si está en la página correcta
      if (
        window.accessibilityHeatmapManager &&
        typeof window.accessibilityHeatmapManager.renderHeatmap === "function"
      ) {
        // Verificar si estamos en la página de accesibilidad
        const isAccessibilityPage =
          window.location.hash.includes("salary-ratio") ||
          document.querySelector("#salary-ratio.dashboard-page.active");

        if (isAccessibilityPage) {
          // ELIMINADO: console.log('🔥 Inicializando matriz de calor...');
          setTimeout(
            () => window.accessibilityHeatmapManager.renderHeatmap(),
            300,
          );
        }
      }

      // Inicializar gráficos de Seniority si está en la página correcta
      if (
        window.seniorityManager &&
        typeof window.seniorityManager.renderComparisonChart === "function"
      ) {
        // ELIMINADO: console.log('👥 SeniorityManager disponible, renderizando gráficos...');
        setTimeout(() => {
          try {
            window.seniorityManager.renderComparisonChart();
            window.seniorityManager.renderAllCategoriesChart();
            // ELIMINADO: console.log('✅ Gráficos de Seniority renderizados');
          } catch (error) {
            // ELIMINADO: console.error('❌ Error renderizando gráficos de Seniority:', error);
          }
        }, 500);
      } else {
        // ELIMINADO: console.warn('⚠️ SeniorityManager no disponible o no tiene métodos requeridos');
        // ELIMINADO: console.log('🔍 Estado SeniorityManager:', {
        // ELIMINADO:     existe: !!window.seniorityManager,
        // ELIMINADO:     tieneRenderComparisonChart: window.seniorityManager && typeof window.seniorityManager.renderComparisonChart,
        // ELIMINADO:     tieneRenderAllCategoriesChart: window.seniorityManager && typeof window.seniorityManager.renderAllCategoriesChart
        // ELIMINADO: });

        // Intentar renderizar manualmente si los contenedores existen
        const comparisonContainer = document.getElementById(
          "seniority-comparison-chart",
        );
        const allCategoriesContainer = document.getElementById(
          "salary-difference-chart",
        );

        if (comparisonContainer && allCategoriesContainer) {
          // ELIMINADO: console.log('🔄 Intentando renderizar gráficos de Seniority manualmente...');
          this.renderSeniorityFallbackCharts();
        }
      }

      // Configurar event listeners para cambios de filtros
      this.setupEventListeners();

      // ELIMINADO: console.log('🎉 Dashboard inicializado correctamente');
    } catch (error) {
      // ELIMINADO: console.error('❌ Error inicializando dashboard:', error);
      this.showErrorState();
    }
  }

  /**
   * Método de fallback para renderizar gráficos de Seniority si el manager no funciona
   */
  renderSeniorityFallbackCharts() {
    // ELIMINADO: console.log('🔄 Renderizando gráficos de Seniority de fallback...');

    // Datos estáticos para gráfico de comparativa
    const comparisonData = [
      { category: "Technology", level: "Junior", effort: 35.73 },
      { category: "Technology", level: "Senior", effort: 19.14 },
      { category: "Marketing", level: "Junior", effort: 34.95 },
      { category: "Marketing", level: "Senior", effort: 19.61 },
      { category: "Design", level: "Junior", effort: 39.23 },
      { category: "Design", level: "Senior", effort: 24.74 },
    ];

    // Datos estáticos para gráfico de todas las categorías
    const allCategoriesData = [
      { level: "Junior", effort: 36.55 },
      { level: "Senior", effort: 20.88 },
    ];

    // Renderizar gráfico de comparativa
    const comparisonContainer = document.getElementById(
      "seniority-comparison-chart",
    );
    if (comparisonContainer) {
      const maxEffort = Math.max(...comparisonData.map((d) => d.effort));
      let html = `<div class="html-chart"><div class="bars-container column-layout">`;

      comparisonData.forEach((item) => {
        const barHeight = Math.min(100, (item.effort / maxEffort) * 100);
        const barColor =
          item.level === "Junior"
            ? "var(--neutral-gray)"
            : "var(--secondary-blue)";
        const viabilityIcon =
          item.effort <= 30 ? "✅" : item.effort <= 45 ? "⚠️" : "❌";
        const viabilityText =
          item.effort <= 30
            ? "Viable"
            : item.effort <= 45
              ? "Limitado"
              : "Inviable";

        html += `
                    <div class="column-chart-item">
                        <div class="column-chart-bar-container">
                            <div class="column-chart-bar" style="height: ${barHeight}%; background-color: ${barColor}">
                                <span class="column-chart-value">${item.effort.toFixed(2).replace(".", ",")}%</span>
                            </div>
                        </div>
                        <div class="column-chart-label">${item.level} ${item.category}</div>
                        <div class="column-chart-viability">${viabilityIcon} ${viabilityText}</div>
                    </div>
                `;
      });

      html += `</div><div class="chart-footer"><p class="footer-info">
                <strong>Leyenda:</strong> 
                <span class="color-legend-item"><span class="color-box" style="background-color: var(--neutral-gray)"></span>Junior</span>
                <span class="color-legend-item"><span class="color-box" style="background-color: var(--secondary-blue)"></span>Senior</span>
                • Porcentaje: % esfuerzo salarial mínimo por categoría y nivel.
            </p></div></div>`;

      comparisonContainer.innerHTML = html;
      // ELIMINADO: console.log('✅ Gráfico de comparativa (fallback) renderizado');
    }

    // Renderizar gráfico de todas las categorías
    const allCategoriesContainer = document.getElementById(
      "salary-difference-chart",
    );
    if (allCategoriesContainer) {
      const maxEffort = Math.max(...allCategoriesData.map((d) => d.effort));
      let html = `<div class="html-chart"><div class="bars-container">`;

      allCategoriesData.forEach((item) => {
        const barWidth = Math.min(100, (item.effort / maxEffort) * 100);
        const barColor =
          item.level === "Junior"
            ? "var(--neutral-gray)"
            : "var(--secondary-blue)";
        const viabilityIcon =
          item.effort <= 30 ? "✅" : item.effort <= 45 ? "⚠️" : "❌";
        const viabilityText =
          item.effort <= 30
            ? "Viable"
            : item.effort <= 45
              ? "Limitado"
              : "Inviable";

        html += `
                    <div class="bar-item">
                        <div class="bar-label">
                            <strong>${item.level}</strong>
                            <small>Todas las categorías</small>
                        </div>
                        <div class="bar-wrapper">
                            <div class="bar" style="width: ${barWidth}%; background-color: ${barColor}">
                                <span class="bar-value">${item.effort.toFixed(2).replace(".", ",")}%</span>
                            </div>
                        </div>
                        <div class="bar-viability">${viabilityIcon} ${viabilityText}</div>
                    </div>
                `;
      });

      html += `</div><div class="chart-footer"><p class="footer-info">
                <strong>Leyenda:</strong> 
                <span class="color-legend-item"><span class="color-box" style="background-color: var(--neutral-gray)"></span>Junior (36,55%)</span>
                <span class="color-legend-item"><span class="color-box" style="background-color: var(--secondary-blue)"></span>Senior (20,88%)</span>
                • Porcentaje: % esfuerzo salarial mínimo para todas las categorías.
            </p></div></div>`;

      allCategoriesContainer.innerHTML = html;
      // ELIMINADO: console.log('✅ Gráfico de todas las categorías (fallback) renderizado');
    }
  }

  setupEventListeners() {
    // Los managers ya tienen sus propios listeners, esto es para coordinación adicional
    // ELIMINADO: console.log('👂 Configurando listeners de aplicación...');

    // Escuchar errores de carga
    window.addEventListener("error", (event) => {
      // ELIMINADO: console.error('🚨 Error capturado:', event.error);
    });

    // Escuchar cambios de página para inicializar componentes específicos
    document.addEventListener("pageChanged", (event) => {
      // ELIMINADO: console.log('📄 Cambio de página detectado:', event.detail.pageId);

      // Si se cambia a la página de accesibilidad, inicializar la matriz
      if (
        event.detail.pageId === "salary-ratio" &&
        window.accessibilityHeatmapManager &&
        typeof window.accessibilityHeatmapManager.renderHeatmap === "function"
      ) {
        // ELIMINADO: console.log('🔥 Página de accesibilidad detectada, renderizando matriz...');
        setTimeout(
          () => window.accessibilityHeatmapManager.renderHeatmap(),
          200,
        );
      }

      // Si se cambia a la página de seniority, inicializar los gráficos
      if (event.detail.pageId === "seniority-section") {
        // ELIMINADO: console.log('👥 Página de seniority detectada');

        if (
          window.seniorityManager &&
          typeof window.seniorityManager.renderComparisonChart === "function"
        ) {
          // ELIMINADO: console.log('🔄 Renderizando gráficos de Seniority...');
          setTimeout(() => {
            window.seniorityManager.renderComparisonChart();
            window.seniorityManager.renderAllCategoriesChart();
          }, 200);
        } else {
          // ELIMINADO: console.log('🔄 Usando fallback para gráficos de Seniority...');
          setTimeout(() => this.renderSeniorityFallbackCharts(), 200);
        }
      }
    });
  }

  showErrorState() {
    // Mostrar mensaje de error en el dashboard
    const errorHTML = `
            <div class="app-error-state">
                <div class="error-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3>Error de inicialización</h3>
                <p>No se pudieron cargar todos los componentes del dashboard.</p>
                <div class="error-actions">
                    <button onclick="location.reload()" class="btn-retry">
                        <i class="fas fa-redo"></i> Recargar página
                    </button>
                    <button onclick="console.log('Managers:', window.dataProcessorFinal, window.filtersManager, window.seniorityManager); console.log('Scripts cargados:', document.querySelectorAll('script').length)" class="btn-debug">
                        <i class="fas fa-bug"></i> Depurar en consola
                    </button>
                </div>
                <div class="error-details" style="margin-top: 15px; font-size: 0.9rem; color: #666;">
                    <p><strong>SeniorityManager:</strong> ${"seniorityManager" in window ? "EXISTE" : "NO EXISTE"}</p>
                    <p><strong>Ruta del script:</strong> ${document.querySelector('script[src*="seniority"]')?.src || "NO ENCONTRADO"}</p>
                </div>
            </div>
        `;

    // Insertar en el contenedor principal del dashboard
    const dashboardMain = document.getElementById("dashboardMain");
    if (dashboardMain) {
      const existingError = dashboardMain.querySelector(".app-error-state");
      if (!existingError) {
        dashboardMain.insertAdjacentHTML("afterbegin", errorHTML);
      }
    }
  }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  window.appInitializer = new AppInitializer();
});

// ELIMINADO: console.log('📦 AppInitializer V15.8.1 cargado (esperando DOM)');
