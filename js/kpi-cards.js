// ===== KPI-CARDS.JS - VERSIÓN V15.8 =====

class KPICardsManager {
    constructor() {
        console.log('📊 KPICardsManager V15.8 inicializando...');
        this.kpiContainer = document.getElementById('kpiCardsContainer');
        this.dataProcessor = window.dataProcessorFinal;
        
        // Escuchar cambios de filtros
        document.addEventListener('filtersChanged', (event) => {
            this.updateKPICards(event.detail.filters);
        });
        
        // Inicializar con valores por defecto
        this.initializeFallbackCards();
    }
    
    updateKPICards(filters) {
        console.log('🔄 Actualizando KPI cards con filtros:', filters);
        
        if (!this.dataProcessor || typeof this.dataProcessor.processData !== 'function') {
            console.warn('⚠️ DataProcessor no disponible, usando valores por defecto');
            this.updateCardsWithFallback(filters);
            return;
        }
        
        try {
            const data = this.dataProcessor.processData(filters);
            
            if (data && data.kpiMetrics) {
                this.updateCardsWithData(data.kpiMetrics, filters);
            } else {
                console.warn('⚠️ No se obtuvieron métricas KPI, usando fallback');
                this.updateCardsWithFallback(filters);
            }
        } catch (error) {
            console.error('❌ Error actualizando KPI cards:', error);
            this.updateCardsWithFallback(filters);
        }
    }
    
    updateCardsWithData(metrics, filters) {
        console.log('🎯 Actualizando KPI cards con datos reales:', metrics);
        
        // Formatear números manualmente
        const salaryFormatted = this.formatNumber(metrics.salary) + ' €';
        const rentFormatted = this.formatNumber(metrics.averageRent) + ' €';
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
        console.log('🔄 Usando valores de fallback para KPI cards');
        
        // Valores por defecto
        const salary = filters.category === 'Technology' && filters.level === 'Senior' ? 3500 : 
                      filters.level === 'Junior' ? 1875 : 2500;
        const rent = filters.district === 'Ciutat Vella' ? 1125 : 950;
        const effort = filters.district === 'Ciutat Vella' ? 32.14 : 28.50;
        
        const salaryFormatted = this.formatNumber(salary) + ' €';
        const rentFormatted = this.formatNumber(rent) + ' €';
        const effortFormatted = this.formatPercentage(effort);
        
        // Textos actualizados según Fase 3
        const salaryText = `Mediana salarial de ${filters.category} ${filters.level}`;
        const rentText = `Alquiler promedio en ${filters.district}`;
        const effortText = `Menor % de esfuerzo en ${filters.district}`;
        
        const fallbackHTML = `
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
            this.kpiContainer.innerHTML = fallbackHTML;
        }
    }
    
    initializeFallbackCards() {
        const defaultFilters = {
            category: 'Technology',
            level: 'Senior',
            type: 'Estudio',
            district: 'Ciutat Vella'
        };
        
        this.updateCardsWithFallback(defaultFilters);
    }
    
    // Función para formatear números con puntos de miles
    formatNumber(number) {
        if (typeof number !== 'number') return '0';
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    
    // Función para formatear porcentajes con 2 decimales
    formatPercentage(number) {
        if (typeof number !== 'number') return '0,00%';
        return number.toFixed(2).replace('.', ',') + '%';
    }
}

// Exportar al global scope
if (typeof window !== 'undefined') {
    window.kpiCardsManager = new KPICardsManager();
    console.log('✅ KPICardsManager V15.8 cargado');
}