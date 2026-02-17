// js/seniority-manager.js - VERSIÓN 1.4 COMPLETA Y CORREGIDA
// Manager para gráficos de la subsección Seniority

class SeniorityManager {
  constructor() {
    // ELIMINADO: console.log("👥 SeniorityManager V1.4 inicializando...");

    // Referencias a contenedores (ahora ya son .html-chart)
    this.comparisonChartContainer = document.getElementById(
      "seniority-comparison-chart",
    );
    this.allCategoriesChartContainer = document.getElementById(
      "salary-difference-chart",
    );

    // Referencia al DataProcessor
    this.dataProcessor = window.dataProcessorFinal;

    // Inicializar automáticamente si los contenedores existen
    if (this.comparisonChartContainer || this.allCategoriesChartContainer) {
      // ELIMINADO: console.log("🎯 Contenedores de Seniority encontrados, inicializando...");
      this.initialize();
    } else {
      // ELIMINADO: console.warn("⚠️ Contenedores de Seniority no encontrados");
      // ELIMINADO: console.log("🔍 Buscando contenedores:", {
      // ELIMINADO:   comparison: this.comparisonChartContainer,
      // ELIMINADO:   allCategories: this.allCategoriesChartContainer,
      // ELIMINADO: });
    }
  }

  initialize() {
    // Esperar a que DataProcessor esté disponible
    if (
      !this.dataProcessor ||
      typeof this.dataProcessor.getSeniorityComparisonData !== "function"
    ) {
      // ELIMINADO: console.log("⏳ Esperando DataProcessor...");
      setTimeout(() => this.initialize(), 100);
      return;
    }

    // ELIMINADO: console.log("✅ DataProcessor disponible");

    // Renderizar gráficos inmediatamente
    // ELIMINADO: console.log("🚀 Renderizando gráficos de Seniority...");
    this.renderComparisonChart();
    this.renderAllCategoriesChart();

    // Escuchar recarga de datos
    document.addEventListener("dataLoaded", () => {
      // ELIMINADO: console.log("📊 Datos recargados, actualizando gráficos de Seniority...");
      this.renderComparisonChart();
      this.renderAllCategoriesChart();
    });
  }

  /**
   * Renderiza gráfico de columnas comparativas (6 columnas) CON EJES
   * AHORA: Genera solo el contenido interno, sin div .html-chart adicional
   */
  renderComparisonChart() {
    // ELIMINADO: console.log("📊 Renderizando gráfico de comparativa Junior vs Senior por categoría...");

    if (!this.comparisonChartContainer) {
      // ELIMINADO: console.error("❌ Contenedor #seniority-comparison-chart no encontrado");
      return;
    }

    if (
      !this.dataProcessor ||
      typeof this.dataProcessor.getSeniorityComparisonData !== "function"
    ) {
      // ELIMINADO: console.error("❌ DataProcessor.getSeniorityComparisonData() no disponible");
      this.showErrorMessage(
        this.comparisonChartContainer,
        "DataProcessor no disponible",
      );
      return;
    }

    try {
      // Obtener datos estáticos
      const chartData = this.dataProcessor.getSeniorityComparisonData();

      if (!chartData || chartData.length === 0) {
        throw new Error(
          "No se obtuvieron datos para el gráfico de comparativa",
        );
      }

      // ELIMINADO: console.log("✅ Datos obtenidos para gráfico de comparativa:", chartData);

      // ESCALA FIJA: 0% a 50% (según especificaciones)
      const maxEffort = 50; // Escala fija, no dinámica
      const yAxisTicks = [0, 10, 20, 30, 40, 50]; // Marcas del eje Y

      // Generar HTML para gráfico de columnas CON EJE (SIN div .html-chart adicional)
      let chartHTML = `
                <div class="chart-with-axis">
                    <!-- Eje vertical -->
                    <div class="y-axis">
            `;

      // Agregar marcas del eje Y (de arriba a abajo)
      yAxisTicks.reverse().forEach((tick) => {
        chartHTML += `<div class="y-tick">${tick}%</div>`;
      });

      chartHTML += `
                    </div>
                    <!-- Contenedor de columnas -->
                    <div class="columns-container">
                        <div class="bars-container column-layout">
            `;

      chartData.forEach((item) => {
        // Calcular altura relativa a la escala 0-50%
        const barHeight = Math.min(100, (item.effort / maxEffort) * 100);
        const label = `${item.level} ${item.category}`;
        const effortFormatted = item.effort.toFixed(2).replace(".", ",") + "%";
        const barColor =
          item.level === "Junior"
            ? "var(--neutral-gray)"
            : "var(--secondary-blue)";

        // Estructura para gráfico de columnas verticales
        chartHTML += `
                    <div class="column-chart-item">
                        <div class="column-chart-bar-container">
                            <div class="column-chart-bar" style="height: ${barHeight}%; background-color: ${barColor}">
                                <span class="column-chart-value">${effortFormatted}</span>
                            </div>
                        </div>
                        <div class="column-chart-label">${label}</div>
                        <div class="column-chart-viability">
                            ${this.getViabilityIcon(item.effort)} ${this.getViabilityText(item.effort)}
                        </div>
                    </div>
                `;
      });

      chartHTML += `
                        </div>
                    </div>
                </div>
                <div class="chart-footer">
                    <p class="footer-info">
                        <strong>Leyenda:</strong> 
                        <span class="color-legend-item">
                            <span class="color-box" style="background-color: var(--neutral-gray)"></span>
                            Junior
                        </span>
                        <span class="color-legend-item">
                            <span class="color-box" style="background-color: var(--secondary-blue)"></span>
                            Senior
                        </span>
                        • Porcentaje: % esfuerzo salarial mínimo por categoría y nivel (sobre salario bruto).
                    </p>
                </div>
            `;

      // Insertar directamente en el contenedor (que ya es .html-chart)
      this.comparisonChartContainer.innerHTML = chartHTML;
      // ELIMINADO: console.log(`✅ Gráfico de comparativa renderizado: ${chartData.length} columnas con eje Y (0-50%), SIN doble div`);
    } catch (error) {
      // ELIMINADO: console.error("❌ Error renderizando gráfico de comparativa:", error);
      this.showErrorMessage(
        this.comparisonChartContainer,
        error.message ||
          "No se pudieron cargar los datos del gráfico de comparativa",
      );
    }
  }

  /**
   * Renderiza gráfico de barras para todas las categorías (2 barras)
   * AHORA: Genera solo el contenido interno, sin div .html-chart adicional
   */
  renderAllCategoriesChart() {
    // ELIMINADO: console.log("📊 Renderizando gráfico de todas las categorías Junior vs Senior...");

    if (!this.allCategoriesChartContainer) {
      // ELIMINADO: console.error("❌ Contenedor #salary-difference-chart no encontrado");
      return;
    }

    if (
      !this.dataProcessor ||
      typeof this.dataProcessor.getAllCategoriesComparisonData !== "function"
    ) {
      // ELIMINADO: console.error("❌ DataProcessor.getAllCategoriesComparisonData() no disponible");
      this.showErrorMessage(
        this.allCategoriesChartContainer,
        "DataProcessor no disponible",
      );
      return;
    }

    try {
      // Obtener datos estáticos
      const chartData = this.dataProcessor.getAllCategoriesComparisonData();

      if (!chartData || chartData.length === 0) {
        throw new Error(
          "No se obtuvieron datos para el gráfico de todas las categorías",
        );
      }

      // ELIMINADO: console.log("✅ Datos obtenidos para gráfico de todas las categorías:", chartData);

      // Ordenar: Junior primero, Senior segundo
      const sortedData = [...chartData].sort((a, b) =>
        a.level === "Junior" ? -1 : 1,
      );

      // ESCALA FIJA: 0% a 50% para mantener consistencia
      const maxEffort = 50;

      // Generar HTML para gráfico de barras horizontales (SIN div .html-chart adicional)
      let chartHTML = `
                <div class="bars-container">
            `;

      sortedData.forEach((item) => {
        const barWidth = Math.min(100, (item.effort / maxEffort) * 100);
        const effortFormatted = item.effort.toFixed(2).replace(".", ",") + "%";
        const barColor =
          item.level === "Junior"
            ? "var(--neutral-gray)"
            : "var(--secondary-blue)";

        // MISMA ESTRUCTURA GRID 2-3-1 QUE GRÁFICO DE BARRIOS
        chartHTML += `
                    <div class="bar-item">
                        <div class="bar-label">
                            <strong>${item.level}</strong>
                            <small>Todas las categorías</small>
                        </div>
                        <div class="bar-wrapper">
                            <div class="bar" style="width: ${barWidth}%; background-color: ${barColor}">
                                <span class="bar-value">${effortFormatted}</span>
                            </div>
                        </div>
                        <div class="bar-viability">
                            ${this.getViabilityIcon(item.effort)} ${this.getViabilityText(item.effort)}
                        </div>
                    </div>
                `;
      });

      chartHTML += `
                </div>
                <div class="chart-footer">
                    <p class="footer-info">
                        <strong>Leyenda:</strong> 
                        <span class="color-legend-item">
                            <span class="color-box" style="background-color: var(--neutral-gray)"></span>
                            Junior
                        </span>
                        <span class="color-legend-item">
                            <span class="color-box" style="background-color: var(--secondary-blue)"></span>
                            Senior
                        </span>
                        • Porcentaje: % esfuerzo salarial mínimo para todas las categorías (sobre salario bruto).
                    </p>
                </div>
            `;

      // Insertar directamente en el contenedor (que ya es .html-chart)
      this.allCategoriesChartContainer.innerHTML = chartHTML;
      // ELIMINADO: console.log(`✅ Gráfico de todas las categorías renderizado: ${sortedData.length} barras, SIN doble div`);
    } catch (error) {
      // ELIMINADO: console.error("❌ Error renderizando gráfico de todas las categorías:", error);
      this.showErrorMessage(
        this.allCategoriesChartContainer,
        error.message ||
          "No se pudieron cargar los datos del gráfico de todas las categorías",
      );
    }
  }

  /**
   * Obtiene icono de viabilidad basado en el porcentaje de esfuerzo
   * @param {number} effort - Porcentaje de esfuerzo
   * @returns {string} Emoji del icono
   */
  getViabilityIcon(effort) {
    if (effort <= 30) return "✅";
    if (effort <= 45) return "⚠️";
    return "❌";
  }

  /**
   * Obtiene texto de viabilidad basado en el porcentaje de esfuerzo
   * @param {number} effort - Porcentaje de esfuerzo
   * @returns {string} Texto de viabilidad
   */
  getViabilityText(effort) {
    if (effort <= 30) return "Viable";
    if (effort <= 45) return "Limitado";
    return "Inviable";
  }

  /**
   * Muestra mensaje de error en el contenedor
   * @param {HTMLElement} container - Contenedor donde mostrar el error
   * @param {string} message - Mensaje de error
   */
  showErrorMessage(container, message) {
    container.innerHTML = `
            <div class="data-message">
                <div class="message-icon">📊</div>
                <h4>Gráfico no disponible</h4>
                <p>${message}</p>
                <button class="retry-btn" onclick="window.seniorityManager.renderComparisonChart && window.seniorityManager.renderComparisonChart(); window.seniorityManager.renderAllCategoriesChart && window.seniorityManager.renderAllCategoriesChart();">
                    <i class="fas fa-redo"></i> Reintentar
                </button>
            </div>
        `;
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  // ELIMINADO: console.log("🏁 DOM listo - Inicializando SeniorityManager V1.4...");
  window.seniorityManager = new SeniorityManager();
  // ELIMINADO: console.log("✅ SeniorityManager V1.4 cargado (sin doble div, estructura optimizada)");
});
