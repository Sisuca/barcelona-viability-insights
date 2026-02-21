// ===== KPI-CARDS.JS - VERSIÓN CON FALLBACK MEJORADO =====

class KPICardsManager {
  constructor() {
    this.kpiContainer = document.getElementById("kpiCardsContainer");
    this.dataProcessor = window.dataProcessorFinal;

    // Escuchar cambios de filtros
    document.addEventListener("filtersChanged", (event) => {
      this.updateKPICards(event.detail.filters);
    });

    // Inicializar con valores por defecto
    this.initializeFallbackCards();
  }

  updateKPICards(filters) {
    if (
      !this.dataProcessor ||
      typeof this.dataProcessor.processData !== "function"
    ) {
      this.updateCardsWithFallback(filters);
      return;
    }

    try {
      const data = this.dataProcessor.processData(filters);

      if (data && data.kpiMetrics) {
        this.updateCardsWithData(data.kpiMetrics, filters);
      } else {
        this.updateCardsWithFallback(filters);
      }
    } catch (error) {
      this.updateCardsWithFallback(filters);
    }
  }

  updateCardsWithData(metrics, filters) {
    // Formatear números manualmente
    const salaryFormatted = this.formatNumber(metrics.salary) + " €";
    const rentFormatted = this.formatNumber(metrics.averageRent) + " €";
    const effortFormatted = this.formatPercentage(metrics.minEffort);

    // Textos actualizados según Fase 3
    const salaryText = `Mediana salarial de ${filters.category} ${filters.level}`;
    const rentText = `Alquiler promedio en ${filters.district}`;
    const effortText = `Menor % de esfuerzo en ${filters.district}`;

    const kpiCardsHTML = `
            <div class="kpi-card">
                <div class="kpi-card-icon">
                    <i class="fas fa-euro-sign"></i>
                </div>
                <div class="kpi-card-content">
                    <div class="kpi-card-label">Salario Bruto Mensual</div>
                    <div class="kpi-card-value">${salaryFormatted}</div>
                    <div class="kpi-card-subtext">${salaryText}</div>
                </div>
            </div>
            
            <div class="kpi-card">
                <div class="kpi-card-icon">
                    <i class="fas fa-home"></i>
                </div>
                <div class="kpi-card-content">
                    <div class="kpi-card-label">Alquiler Promedio</div>
                    <div class="kpi-card-value">${rentFormatted}</div>
                    <div class="kpi-card-subtext">${rentText}</div>
                </div>
            </div>
            
            <div class="kpi-card">
                <div class="kpi-card-icon">
                    <i class="fas fa-chart-bar"></i>
                </div>
                <div class="kpi-card-content">
                    <div class="kpi-card-label">% Esfuerzo Mínimo</div>
                    <div class="kpi-card-value">${effortFormatted}</div>
                    <div class="kpi-card-subtext">${effortText}</div>
                </div>
            </div>
        `;

    if (this.kpiContainer) {
      this.kpiContainer.innerHTML = kpiCardsHTML;
    }
  }

  updateCardsWithFallback(filters) {
    // ===== SALARIOS REALES (basados en profiles-data.js) =====
    let salary;

    // Technology
    if (filters.category === "Technology" && filters.level === "Senior")
      salary = 3500;
    else if (filters.category === "Technology" && filters.level === "Mid")
      salary = 3167;
    else if (filters.category === "Technology" && filters.level === "Junior")
      salary = 1875;
    // Marketing
    else if (filters.category === "Marketing" && filters.level === "Senior")
      salary = 3417;
    else if (filters.category === "Marketing" && filters.level === "Mid")
      salary = 2061;
    else if (filters.category === "Marketing" && filters.level === "Junior")
      salary = 1917;
    // Design
    else if (filters.category === "Design" && filters.level === "Senior")
      salary = 2708;
    else if (filters.category === "Design" && filters.level === "Mid")
      salary = 2021;
    else if (filters.category === "Design" && filters.level === "Junior")
      salary = 1708;
    // Casos "all" - promedios generales
    else if (filters.category === "all" && filters.level === "all")
      salary = 2486; // media de los 9 perfiles
    else if (filters.category === "all" && filters.level === "Senior")
      salary = 3208; // media Senior (Tech+Marketing+Design)
    else if (filters.category === "all" && filters.level === "Mid")
      salary = 2416; // media Mid
    else if (filters.category === "all" && filters.level === "Junior")
      salary = 1833; // media Junior
    else if (filters.category === "Technology" && filters.level === "all")
      salary = 2847; // media Technology
    else if (filters.category === "Marketing" && filters.level === "all")
      salary = 2465; // media Marketing
    else if (filters.category === "Design" && filters.level === "all")
      salary = 2146; // media Design
    else salary = 2486; // valor por defecto (media general)

    // ===== ALQUILER PROMEDIO POR DISTRITO (basado en rent-data.js) =====
    let rent;
    switch (filters.district) {
      case "Ciutat Vella":
        rent = 1135;
        break;
      case "Eixample":
        rent = 1250;
        break;
      case "Gràcia":
        rent = 1400;
        break;
      case "Les Corts":
        rent = 1200;
        break;
      case "Sant Martí":
        rent = 1500;
        break;
      case "Sants-Montjuïc":
        rent = 1250;
        break;
      case "Sarrià-Sant Gervasi":
        rent = 1600;
        break;
      default:
        rent = 1300; // media general
    }

    // ===== ESFUERZO MÍNIMO REAL POR DISTRITO (calculado con datos reales) =====
    let effort;
    switch (filters.district) {
      case "Ciutat Vella":
        effort = 26.29;
        break; // mínimo real: 920€ / salario correspondiente
      case "Eixample":
        effort = 28.16;
        break; // mínimo real: 700€ / salario correspondiente
      case "Gràcia":
        effort = 34.19;
        break; // mínimo real: 850€ / salario correspondiente
      case "Les Corts":
        effort = 33.75;
        break; // mínimo real: 839€ / salario correspondiente
      case "Sant Martí":
        effort = 26.95;
        break; // mínimo real: 670€ / salario correspondiente
      case "Sants-Montjuïc":
        effort = 27.76;
        break; // mínimo real: 690€ / salario correspondiente
      case "Sarrià-Sant Gervasi":
        effort = 31.98;
        break; // mínimo real: 795€ / salario correspondiente
      default:
        effort = 30.0;
    }

    // Formatear números
    const salaryFormatted = this.formatNumber(salary) + " €";
    const rentFormatted = this.formatNumber(rent) + " €";
    const effortFormatted = this.formatPercentage(effort);

    // Textos
    const salaryText = `Mediana salarial de ${filters.category} ${filters.level}`;
    const rentText = `Alquiler promedio en ${filters.district}`;
    const effortText = `Menor % de esfuerzo en ${filters.district}`;

    const fallbackHTML = `
      <div class="kpi-card">
        <div class="kpi-card-icon"><i class="fas fa-euro-sign"></i></div>
        <div class="kpi-card-content">
          <div class="kpi-card-label">Salario Bruto Mensual</div>
          <div class="kpi-card-value">${salaryFormatted}</div>
          <div class="kpi-card-subtext">${salaryText}</div>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-card-icon"><i class="fas fa-home"></i></div>
        <div class="kpi-card-content">
          <div class="kpi-card-label">Alquiler Promedio</div>
          <div class="kpi-card-value">${rentFormatted}</div>
          <div class="kpi-card-subtext">${rentText}</div>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-card-icon"><i class="fas fa-chart-bar"></i></div>
        <div class="kpi-card-content">
          <div class="kpi-card-label">% Esfuerzo Mínimo</div>
          <div class="kpi-card-value">${effortFormatted}</div>
          <div class="kpi-card-subtext">${effortText}</div>
        </div>
      </div>
    `;

    if (this.kpiContainer) {
      this.kpiContainer.innerHTML = fallbackHTML;
    }
  }

  initializeFallbackCards() {
    const defaultFilters = {
      category: "Technology",
      level: "Senior",
      type: "Estudio",
      district: "Ciutat Vella",
    };

    this.updateCardsWithFallback(defaultFilters);
  }

  // Función para formatear números con puntos de miles
  formatNumber(number) {
    if (typeof number !== "number") return "0";
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  // Función para formatear porcentajes con 2 decimales
  formatPercentage(number) {
    if (typeof number !== "number") return "0,00%";
    return number.toFixed(2).replace(".", ",") + "%";
  }
}

// Exportar al global scope
if (typeof window !== "undefined") {
  window.kpiCardsManager = new KPICardsManager();
}
