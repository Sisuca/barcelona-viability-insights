// js/accessibility-heatmap.js - VERSIÓN 17.3
class AccessibilityHeatmapManager {
  constructor() {
    this.container = document.getElementById("accessibility-heatmap-container");
    this.dataProcessor = window.dataProcessorFinal;
    this.hasRendered = false;
    this.currentHeatmapData = null;
    this.resizeTimer = null;
    this.currentView = null;

    if (this.container) {
      this.initialize();
    } else {
    }
  }

  initialize() {
    if (
      !this.dataProcessor ||
      typeof this.dataProcessor.getAccessibilityMatrix !== "function"
    ) {
      setTimeout(() => this.initialize(), 100);
      return;
    }

    // ===== RESIZE SIN SALTOS VISUALES =====
    window.addEventListener("resize", () => {
      if (!this.currentHeatmapData) return;

      clearTimeout(this.resizeTimer);

      const newView = window.innerWidth <= 768 ? "mobile" : "desktop";

      if (newView !== this.currentView) {
        // Ocultar inmediatamente para evitar saltos
        if (this.container) {
          this.container.style.visibility = "hidden";
        }

        this.resizeTimer = setTimeout(() => {
          this.renderHeatmap();
          // Mostrar cuando esté listo
          if (this.container) {
            this.container.style.visibility = "visible";
          }
        }, 20);
      }
    });

    this.renderHeatmap();

    // ===== GRÁFICO DE RANKING DE DISTRITOS =====
    setTimeout(() => {
      const chartContainer = document.getElementById("district-ranking-chart");
      if (chartContainer) {
        this.renderDistrictChart();
      } else {
        const interval = setInterval(() => {
          if (document.getElementById("district-ranking-chart")) {
            clearInterval(interval);
            this.renderDistrictChart();
          }
        }, 200);
      }
    }, 300);

    document.addEventListener("dataLoaded", () => {
      this.renderHeatmap();
      this.renderDistrictChart();
    });
  }

  // ============================================================
  // RENDER PRINCIPAL CON DOBLE VISTA SEGÚN VIEWPORT
  // ============================================================

  renderHeatmap() {
    if (!this.container) return;

    if (
      !this.dataProcessor ||
      typeof this.dataProcessor.getAccessibilityMatrix !== "function"
    ) {
      this.showErrorMessage("DataProcessor no disponible");
      return;
    }

    try {
      const heatmapData = this.dataProcessor.getAccessibilityMatrix();

      if (!heatmapData?.matrixData?.length) {
        this.showErrorMessage("No hay datos disponibles");
        return;
      }

      this.currentHeatmapData = heatmapData;
      this.currentView = window.innerWidth <= 768 ? "mobile" : "desktop";

      if (window.innerWidth <= 768) {
        this.createMobileHeatmapView(heatmapData);
      } else {
        this.createTransposedHeatmapTable(heatmapData);
      }

      this.hasRendered = true;
    } catch (error) {
      this.showErrorMessage(`Error: ${error.message}`);
    }
  }

  // ============================================================
  // VISTA MÓVIL: 7 tablas y gráficos
  // Ancho por Sants-Montjuïc
  // Salto de línea Sarrià-Sant Gervasi
  // ============================================================

  createMobileHeatmapView(heatmapData) {
    this.container.innerHTML = "";

    // ===== FONDO BLANCO EN EL CONTENEDOR =====
    this.container.style.backgroundColor = "white";
    this.container.style.padding = "0.5rem 0";
    this.container.style.borderRadius = "0";
    this.container.style.gap = "1.2rem";

    const categories = ["Technology", "Marketing", "Design"];
    const levels = ["Junior", "Mid", "Senior"];

    // ===== CALCULAR ANCHO DE REFERENCIA (Sants-Montjuïc) =====
    const measureDiv = document.createElement("div");
    measureDiv.style.cssText = `
            position: absolute;
            visibility: hidden;
            height: auto;
            width: auto;
            white-space: nowrap;
            font-family: "Inter", sans-serif;
            font-size: 0.95rem;
            font-weight: 500;
            padding: 0.75rem 0.5rem;
        `;
    document.body.appendChild(measureDiv);

    // Medir "Sants-Montjuïc" como referencia de ancho
    measureDiv.textContent = "Sants-Montjuïc";
    const referenceWidth = 98;

    // Medir "Sarrià-Sant Gervasi" para salto de línea
    measureDiv.style.whiteSpace = "normal";
    measureDiv.style.width = referenceWidth + "px";
    measureDiv.textContent = "Sarrià-Sant Gervasi";
    const sarriaHeight = measureDiv.offsetHeight;

    document.body.removeChild(measureDiv);

    // ===== GENERAR UNA TABLA POR CADA DISTRITO =====
    heatmapData.districts.forEach((district) => {
      const table = document.createElement("table");
      table.className = "mobile-district-table";

      // ================================================
      // FILA 1: CABECERA (Distrito + Junior, Mid, Senior)
      // ================================================
      const headerRow = document.createElement("tr");

      // Celda del distrito
      const districtCell = document.createElement("th");
      districtCell.textContent = district;
      districtCell.className = "mobile-district-header";
      districtCell.setAttribute("data-district", district);

      // APLICAR ANCHO DE REFERENCIA (Sants-Montjuïc)
      districtCell.style.width = referenceWidth + "px";
      districtCell.style.minWidth = referenceWidth + "px";
      districtCell.style.maxWidth = referenceWidth + "px";

      // SALTO DE LÍNEA ESPECÍFICO PARA SARRIÀ-SANT GERVASI
      if (district === "Sarrià-Sant Gervasi") {
        districtCell.style.whiteSpace = "normal";
        districtCell.style.wordBreak = "break-word";
        districtCell.style.lineHeight = "1.2";
        districtCell.style.paddingTop = "0.5rem";
        districtCell.style.paddingBottom = "0.5rem";
        districtCell.style.fontSize = "0.85rem";
      }

      headerRow.appendChild(districtCell);

      // Celdas de niveles (JUNIOR, MID, SENIOR)
      levels.forEach((level) => {
        const levelCell = document.createElement("th");
        levelCell.textContent = level.toUpperCase();
        levelCell.className = "mobile-level-header";
        headerRow.appendChild(levelCell);
      });

      table.appendChild(headerRow);

      // ================================================
      // FILAS DE DATOS (Technology, Marketing, Design)
      // ================================================
      categories.forEach((category) => {
        const dataRow = document.createElement("tr");

        // Celda de categoría
        const categoryCell = document.createElement("td");
        categoryCell.textContent = category;
        categoryCell.className = "mobile-category-cell";
        dataRow.appendChild(categoryCell);

        // Celdas de porcentaje para cada nivel
        levels.forEach((level) => {
          const cellData = heatmapData.matrixData.find(
            (c) => c.x === district && c.y === `${category} ${level}`,
          );

          const value = cellData?.v;

          // ===== CORRECCIÓN CRÍTICA =====
          // Añadir prefijo 'cell-' a la clase de viabilidad
          const viabilityClass = cellData?.viability
            ? `cell-${cellData.viability}`
            : "";

          const valueCell = document.createElement("td");
          valueCell.className = `mobile-value-cell ${viabilityClass}`;

          // Formato: coma decimal + símbolo %
          valueCell.textContent = value
            ? value.toFixed(2).replace(".", ",") + "%"
            : "N/A";

          dataRow.appendChild(valueCell);
        });

        table.appendChild(dataRow);
      });

      // AÑADIR LA TABLA DIRECTAMENTE AL CONTENEDOR (SIN WRAPPER)
      this.container.appendChild(table);
    });
  }

  // ============================================================
  // VISTA DESKTOP: Matriz transpuesta (SIN CAMBIOS)
  // ============================================================

  createTransposedHeatmapTable(heatmapData) {
    this.container.innerHTML = "";
    this.container.style.backgroundColor = ""; // Restaurar fondo por defecto
    this.container.style.padding = "";

    const tableContainer = document.createElement("div");
    tableContainer.className = "table-container";

    const table = document.createElement("table");
    table.className = "data-table heatmap-table transposed-matrix";

    const thead = document.createElement("thead");

    const headerRow1 = document.createElement("tr");
    const cornerHeader1 = document.createElement("th");
    cornerHeader1.textContent = "Distrito / Perfil";
    cornerHeader1.rowSpan = 2;
    cornerHeader1.className = "sticky-corner";
    headerRow1.appendChild(cornerHeader1);

    const categories = ["Technology", "Marketing", "Design"];
    const levels = ["Junior", "Mid", "Senior"];

    categories.forEach((category) => {
      const categoryHeader = document.createElement("th");
      categoryHeader.textContent = category;
      categoryHeader.colSpan = 3;
      categoryHeader.className = "category-header";
      headerRow1.appendChild(categoryHeader);
    });

    thead.appendChild(headerRow1);

    const headerRow2 = document.createElement("tr");

    categories.forEach((category) => {
      levels.forEach((level) => {
        const levelHeader = document.createElement("th");
        levelHeader.textContent = level;
        levelHeader.className = "level-header";
        headerRow2.appendChild(levelHeader);
      });
    });

    thead.appendChild(headerRow2);
    table.appendChild(thead);

    const matrix = {};
    const viabilityMatrix = {};

    heatmapData.districts.forEach((district) => {
      matrix[district] = {};
      viabilityMatrix[district] = {};

      categories.forEach((category) => {
        levels.forEach((level) => {
          const profileKey = `${category} ${level}`;
          matrix[district][profileKey] = null;
          viabilityMatrix[district][profileKey] = "no-data";
        });
      });
    });

    heatmapData.matrixData.forEach((cell) => {
      if (matrix[cell.x] && matrix[cell.x][cell.y] !== undefined) {
        matrix[cell.x][cell.y] = cell.v;
        viabilityMatrix[cell.x][cell.y] = cell.viability;
      }
    });

    const tbody = document.createElement("tbody");

    heatmapData.districts.forEach((district, rowIndex) => {
      const row = document.createElement("tr");
      row.className = rowIndex % 2 === 0 ? "even" : "odd";

      const districtCell = document.createElement("td");
      districtCell.textContent = district;
      districtCell.className = "district-cell sticky-district";
      row.appendChild(districtCell);

      categories.forEach((category) => {
        levels.forEach((level) => {
          const profileKey = `${category} ${level}`;
          const effort = matrix[district][profileKey];
          const viability = viabilityMatrix[district][profileKey];

          const cell = document.createElement("td");

          let displayText = "N/A";
          if (effort !== null && effort !== undefined) {
            displayText = effort.toFixed(2).replace(".", ",") + "%";
          }

          cell.textContent = displayText;
          cell.className = "matrix-cell";

          if (effort !== null && effort !== undefined) {
            if (effort <= 30) {
              cell.classList.add("cell-viable");
            } else if (effort <= 45) {
              cell.classList.add("cell-limitado");
            } else {
              cell.classList.add("cell-inviable");
            }
          } else {
            cell.classList.add("cell-nodata");
          }

          if (effort !== null && effort !== undefined) {
            const tooltipEffort = effort.toFixed(2).replace(".", ",") + "%";
            cell.title = `${district} - ${profileKey}\nEsfuerzo: ${tooltipEffort}\nViabilidad: ${this.getViabilityText(viability)}`;
          }

          row.appendChild(cell);
        });
      });

      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    tableContainer.appendChild(table);

    const footer = document.createElement("div");
    footer.className = "table-footer";

    const footerInfo = document.createElement("p");
    footerInfo.className = "footer-info";
    footerInfo.innerHTML = `
            <strong>Leyenda:</strong> 
            ✅ Viable (≤30%) • ⚠️ Limitado (>30% y ≤45%) • ❌ Inviable (>45%)
            • Porcentaje de menor esfuerzo salarial posible por distrito (sobre salario bruto).
        `;

    footer.appendChild(footerInfo);
    tableContainer.appendChild(footer);

    this.container.appendChild(tableContainer);
  }

  // ============================================================
  // GRÁFICO DE RANKING POR DISTRITOS
  // ============================================================

  renderDistrictChart() {
    const chartContainer = document.getElementById("district-ranking-chart");

    if (!chartContainer) {
      return;
    }

    if (
      !this.dataProcessor ||
      typeof this.dataProcessor.getDistrictRanking !== "function"
    ) {
      chartContainer.innerHTML = `
                <div class="data-message">
                    <div class="message-icon">📭</div>
                    <h4>Datos no disponibles</h4>
                    <p>El procesador de datos no está listo para calcular el ranking de distritos.</p>
                </div>
            `;
      return;
    }

    try {
      const districtRanking = this.dataProcessor.getDistrictRanking();

      if (!districtRanking || districtRanking.length === 0) {
        throw new Error("No se obtuvieron datos de ranking");
      }

      const maxEffort = Math.max(...districtRanking.map((d) => d.minEffort));

      let chartHTML = `
                <div class="html-chart">
                    <div class="bars-container">
            `;

      districtRanking.forEach((district) => {
        const barWidth = Math.min(100, (district.minEffort / maxEffort) * 100);
        const viabilityIcon = this.getViabilityIcon(district.viability);
        const effortFormatted =
          district.minEffort.toFixed(2).replace(".", ",") + "%";

        chartHTML += `
                    <div class="bar-item">
                        <div class="bar-label">
                            <strong>${district.district}</strong>
                            <small>${district.rentCount} alquileres analizados</small>
                        </div>
                        <div class="bar-wrapper">
                            <div class="bar" style="width: ${barWidth}%">
                                <span class="bar-value">${effortFormatted}</span>
                            </div>
                        </div>
                        <div class="bar-viability">
                            ${viabilityIcon} ${this.getViabilityText(district.viability)}
                        </div>
                    </div>
                `;
      });

      chartHTML += `
                    </div>
                    <div class="chart-footer">
                        <p class="footer-info">
                            <strong>Leyenda:</strong> 
                            ✅ Viable (≤30%) • ⚠️ Limitado (>30% y ≤45%) • ❌ Inviable (>45%)
                            • Porcentaje de menor esfuerzo salarial posible por distrito (sobre salario bruto).
                        </p>
                    </div>
                </div>
            `;

      chartContainer.innerHTML = chartHTML;
    } catch (error) {
      chartContainer.innerHTML = `
                <div class="data-message">
                    <div class="message-icon">📭</div>
                    <h4>Gráfico no disponible</h4>
                    <p>${error.message || "No se pudieron cargar los datos del ranking de distritos"}</p>
                    <button class="retry-btn" onclick="window.accessibilityHeatmapManager.renderDistrictChart()">
                        <i class="fas fa-redo"></i> Reintentar
                    </button>
                </div>
            `;
    }
  }

  // ============================================================
  // FUNCIONES AUXILIARES
  // ============================================================

  getViabilityIcon(viability) {
    if (
      window.tableManager &&
      typeof window.tableManager.getViabilityIcon === "function"
    ) {
      return window.tableManager.getViabilityIcon(viability);
    }
    switch (viability) {
      case "viable":
        return "✅";
      case "limitado":
        return "⚠️";
      case "inviable":
        return "❌";
      default:
        return "❓";
    }
  }

  getViabilityText(viability) {
    if (
      window.tableManager &&
      typeof window.tableManager.getViabilityText === "function"
    ) {
      return window.tableManager.getViabilityText(viability);
    }
    switch (viability) {
      case "viable":
        return "Viable";
      case "limitado":
        return "Limitado";
      case "inviable":
        return "Inviable";
      default:
        return "Desconocido";
    }
  }

  showErrorMessage(message) {
    if (!this.container) return;

    this.container.innerHTML = `
            <div class="data-message">
                <div class="message-icon">⚠️</div>
                <h4>Matriz de calor no disponible</h4>
                <p>${message}</p>
                <button class="retry-btn" onclick="window.accessibilityHeatmapManager.renderHeatmap()">
                    <i class="fas fa-redo"></i> Reintentar
                </button>
            </div>
        `;
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  window.accessibilityHeatmapManager = new AccessibilityHeatmapManager();
});
