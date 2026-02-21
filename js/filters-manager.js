// js/filters-manager.js - GESTOR DE FILTROS ACTUALIZADO
// Versión sin dependencia de URL, siempre filtros por defecto

class FiltersManager {
  constructor() {
    // Referencias a los elementos del DOM
    this.categoryFilter = document.getElementById("categoryFilter");
    this.levelFilter = document.getElementById("levelFilter");
    this.typeFilter = document.getElementById("typeFilter");
    this.districtFilter = document.getElementById("districtFilter");
    this.resetFiltersBtn = document.getElementById("resetFiltersBtn");

    // Referencia al DataProcessor (para obtener distritos únicos)
    this.dataProcessor = window.dataProcessorFinal;

    // FILTROS POR DEFECTO SEGÚN ESPECIFICACIONES
    this.currentFilters = {
      category: "Technology", // Filtro por defecto: Technology
      level: "Senior", // Filtro por defecto: Senior
      type: "Estudio", // Filtro por defecto: Estudio
      district: "Ciutat Vella", // Filtro por defecto: Ciutat Vella (NO 'all')
    };

    // Inicializar
    this.init();
  }

  init() {
    if (!this.validateElements()) {
      return;
    }

    // 1. NO CARGAR estado desde URL - usar filtros por defecto siempre
    // 2. Configurar el filtro de distritos con opciones dinámicas
    this.populateDistrictFilter();

    // 3. Configurar event listeners
    this.setupEventListeners();

    // 4. Aplicar filtros por defecto en la UI
    this.updateAllFiltersUI();

    // 5. Notificar estado inicial a otros componentes
    setTimeout(() => {
      this.notifyOtherManagers();
      // NO guardar en URL
      // this.updateURL(); ← ELIMINADO
    }, 500);
  }

  validateElements() {
    const elements = [
      this.categoryFilter,
      this.levelFilter,
      this.typeFilter,
      this.districtFilter,
    ];

    return elements.every((element) => element !== null);
  }

  populateDistrictFilter() {
    if (!this.districtFilter) return;

    // Guardar la opción seleccionada actualmente
    const currentDistrict = this.districtFilter.value;

    // Limpiar opciones actuales (excepto "Todos los distritos")
    while (this.districtFilter.options.length > 1) {
      this.districtFilter.remove(1);
    }

    // Obtener distritos únicos del DataProcessor
    let districts = [
      "Ciutat Vella",
      "Eixample",
      "Gràcia",
      "Les Corts",
      "Sant Martí",
      "Sants-Montjuïc",
      "Sarrià-Sant Gervasi",
    ];

    // Si tenemos acceso al DataProcessor, usar sus datos
    if (this.dataProcessor && this.dataProcessor.getUniqueDistricts) {
      const uniqueDistricts = this.dataProcessor.getUniqueDistricts();
      if (uniqueDistricts && uniqueDistricts.length > 0) {
        districts = uniqueDistricts;
      }
    }

    // Ordenar alfabéticamente
    districts.sort();

    // Agregar opciones al select
    districts.forEach((district) => {
      const option = document.createElement("option");
      option.value = district;
      option.textContent = district;
      this.districtFilter.appendChild(option);
    });

    // Restaurar la selección anterior o usar la por defecto
    if (districts.includes(currentDistrict)) {
      this.districtFilter.value = currentDistrict;
    } else {
      this.districtFilter.value = this.currentFilters.district;
    }
  }

  setupEventListeners() {
    // Event listeners para filtros
    this.categoryFilter.addEventListener("change", (e) =>
      this.handleFilterChange("category", e.target.value),
    );
    this.levelFilter.addEventListener("change", (e) =>
      this.handleFilterChange("level", e.target.value),
    );
    this.typeFilter.addEventListener("change", (e) =>
      this.handleFilterChange("type", e.target.value),
    );
    this.districtFilter.addEventListener("change", (e) =>
      this.handleFilterChange("district", e.target.value),
    );

    // Botón de reset
    if (this.resetFiltersBtn) {
      this.resetFiltersBtn.addEventListener("click", () => this.resetFilters());
    }

    // Actualizar distritos si cambian los datos
    window.addEventListener("dataLoaded", () => {
      setTimeout(() => this.populateDistrictFilter(), 300);
    });
  }

  handleFilterChange(filterType, value) {
    // Actualizar el estado
    this.currentFilters[filterType] = value;

    // Actualizar la UI del filtro específico
    this.updateFilterUI(filterType);

    // NO guardar estado en URL
    // this.updateURL(); ← ELIMINADO

    // Solo guardar en localStorage (opcional)
    this.saveState();

    // Notificar a otros managers
    this.notifyOtherManagers();
  }

  updateFilterUI(filterType) {
    switch (filterType) {
      case "category":
        this.categoryFilter.value = this.currentFilters.category;
        break;
      case "level":
        this.levelFilter.value = this.currentFilters.level;
        break;
      case "type":
        this.typeFilter.value = this.currentFilters.type;
        break;
      case "district":
        this.districtFilter.value = this.currentFilters.district;
        break;
    }
  }

  updateAllFiltersUI() {
    // Aplicar los filtros actuales a todos los selects
    Object.keys(this.currentFilters).forEach((filterType) => {
      this.updateFilterUI(filterType);
    });
  }

  notifyOtherManagers() {
    // Crear y despachar evento personalizado
    const filterEvent = new CustomEvent("filtersChanged", {
      detail: {
        filters: { ...this.currentFilters },
        timestamp: new Date().toISOString(),
      },
    });

    document.dispatchEvent(filterEvent);
  }

  saveState() {
    try {
      localStorage.setItem(
        "dashboardFilters",
        JSON.stringify(this.currentFilters),
      );
    } catch (error) {}
  }

  // Mantenemos resetFilters pero sin actualizar URL
  resetFilters() {
    // Restaurar filtros por defecto
    this.currentFilters = {
      category: "Technology",
      level: "Senior",
      type: "Estudio",
      district: "Ciutat Vella",
    };

    // Actualizar UI
    this.updateAllFiltersUI();

    // Actualizar distritos (por si hubo cambios)
    this.populateDistrictFilter();

    // Solo guardar en localStorage y notificar
    this.saveState();
    this.notifyOtherManagers();

    // Mostrar mensaje de confirmación
    this.showResetConfirmation();
  }

  showResetConfirmation() {
    // Crear un mensaje temporal de confirmación
    const message = document.createElement("div");
    message.className = "reset-confirmation";
    message.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Filtros reiniciados a valores por defecto</span>
        `;

    message.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #10B981;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;

    document.body.appendChild(message);

    // Remover después de 3 segundos
    setTimeout(() => {
      message.style.animation = "slideOut 0.3s ease";
      setTimeout(() => {
        if (message.parentNode) {
          message.parentNode.removeChild(message);
        }
      }, 300);
    }, 3000);
  }

  getCurrentFilters() {
    return { ...this.currentFilters };
  }

  setFilters(newFilters) {
    // Validar y aplicar nuevos filtros
    Object.keys(newFilters).forEach((key) => {
      if (this.currentFilters.hasOwnProperty(key)) {
        this.currentFilters[key] = newFilters[key];
      }
    });

    this.updateAllFiltersUI();
    this.saveState();
    // 🚫 NO actualizar URL
    // this.updateURL(); ← ELIMINADO
    this.notifyOtherManagers();
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  // Esperar a que se cargue DataProcessorFinal
  const initFiltersManager = () => {
    if (window.dataProcessorFinal) {
      window.filtersManager = new FiltersManager();
    } else {
      setTimeout(initFiltersManager, 100);
    }
  };

  initFiltersManager();
});
