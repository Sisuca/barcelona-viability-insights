// ===== TABLE-MANAGER.JS - VERSIÓN V15.8 =====

class TableManager {
    constructor() {
        console.log('📋 TableManager V11.8 inicializando...');
        this.tableContainer = document.getElementById('detail-table');
        this.chartContainer = document.getElementById('chart-visualization');
        this.dataProcessor = window.dataProcessorFinal;
        
        // Escuchar cambios de filtros
        document.addEventListener('filtersChanged', (event) => {
            this.onFiltersChanged(event.detail.filters);
        });
        
        // Inicializar con valores por defecto
        this.initializeWithFallback();
    }
    
    onFiltersChanged(filters) {
        console.log('🔄 TableManager: Filtros cambiados', filters);
        
        if (!this.dataProcessor || typeof this.dataProcessor.processData !== 'function') {
            console.warn('⚠️ DataProcessor no disponible, usando datos de fallback');
            this.renderFallbackData();
            return;
        }
        
        try {
            const data = this.dataProcessor.processData(filters);
            
            if (data && data.tableData && data.chartData) {
                this.renderTable(data.tableData);
                this.renderChart(data.chartData);
            } else {
                console.warn('⚠️ No se obtuvieron datos para tabla/gráfico');
                this.renderFallbackData();
            }
        } catch (error) {
            console.error('❌ Error procesando datos:', error);
            this.renderFallbackData();
        }
    }
    
    renderTable(tableData) {
        console.log('📊 Renderizando tabla con', tableData.length, 'elementos');
        
        if (!tableData || tableData.length === 0) {
            this.tableContainer.innerHTML = `
                <div class="data-message">
                    <div class="message-icon">📭</div>
                    <h4>No hay datos disponibles</h4>
                    <p>No se encontraron viviendas con los filtros seleccionados.</p>
                </div>
            `;
            return;
        }
        
        // Ordenar por esfuerzo (ascendente)
        tableData.sort((a, b) => a.effort - b.effort);
        
        let tableHTML = `
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Barrio</th>
                            <th>Distrito</th>
                            <th>Tipo</th>
                            <th>Alquiler</th>
                            <th>Esfuerzo</th>
                            <th>Viabilidad</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        tableData.forEach((item, index) => {
            const rowClass = index % 2 === 0 ? 'even' : 'odd';
            const viabilityIcon = this.getViabilityIcon(item.viability);
            const viabilityText = this.getViabilityText(item.viability);
            
            tableHTML += `
                <tr class="${rowClass}">
                    <td>${item.neighborhood}</td>
                    <td>${item.district}</td>
                    <td>${item.type}</td>
                    <td class="currency">${this.formatNumber(item.price)} €</td>
                    <td class="percentage">${this.formatPercentage(item.effort)}</td>
                    <td class="viability-icon">${viabilityIcon} ${viabilityText}</td>
                </tr>
            `;
        });
        
        tableHTML += `
                    </tbody>
                </table>
                <div class="table-footer">
                    <p class="footer-info">
                        <strong>Leyenda:</strong> 
                        ✅ Viable (≤30%) • ⚠️ Limitado (31-45%) • ❌ Inviable (≥46%)
                    </p>
                </div>
            </div>
        `;
        
        this.tableContainer.innerHTML = tableHTML;
    }
    
    renderChart(chartData) {
        console.log('📈 Renderizando gráfico con', chartData.length, 'elementos');
        
        if (!chartData || chartData.length === 0) {
            this.chartContainer.innerHTML = `
                <div class="data-message">
                    <div class="message-icon">📊</div>
                    <h4>No hay datos para el gráfico</h4>
                    <p>No se encontraron barrios con los filtros seleccionados.</p>
                </div>
            `;
            return;
        }
        
        // Ordenar por esfuerzo de MENOR a MAYOR (ascendente)
        chartData.sort((a, b) => a.avgEffort - b.avgEffort);
        
        // Encontrar el esfuerzo máximo para escalar las barras
        const maxEffort = Math.max(...chartData.map(item => item.avgEffort));
        
        let chartHTML = `
            <div class="html-chart">
                <div class="bars-container">
        `;
        
        chartData.forEach(item => {
            const barWidth = Math.min(100, (item.avgEffort / maxEffort) * 100);
            const viabilityIcon = this.getViabilityIcon(item.viability);
            
            // ESTRUCTURA SIMPLE - REVERTIDA A V13.5
            chartHTML += `
                <div class="bar-item">
                    <div class="bar-label">
                        <strong>${item.barrio}</strong>
                        <small>${item.district} • ${item.count} viviendas</small>
                    </div>
                    <div class="bar-wrapper">
                        <div class="bar" style="width: ${barWidth}%">
                            <span class="bar-value">${this.formatPercentage(item.avgEffort)}</span>
                        </div>
                    </div>
                    <div class="bar-viability">
                        ${viabilityIcon} ${this.getViabilityText(item.viability)}
                    </div>
                </div>
            `;
        });
        
        chartHTML += `
                </div>
                <div class="chart-footer">
                    <p class="footer-info">
                        <strong>Leyenda:</strong> 
                        ✅ Viable (≤30%) • ⚠️ Limitado (31-45%) • ❌ Inviable (≥46%)
                    </p>
                </div>
            </div>
        `;
        
        this.chartContainer.innerHTML = chartHTML;
    }
    
    renderFallbackData() {
        console.log('🔄 Renderizando datos de fallback');
        
        // Datos de ejemplo
        const fallbackTableData = [
            {
                neighborhood: "Sant Pere - Santa Caterina i la Ribera",
                district: "Ciutat Vella",
                type: "Estudio",
                price: 1100,
                effort: 31.43,
                viability: "limitado"
            },
            {
                neighborhood: "El Raval",
                district: "Ciutat Vella",
                type: "Estudio",
                price: 1050,
                effort: 30.00,
                viability: "viable"
            }
        ];
        
        const fallbackChartData = [
            {
                barrio: "Sant Pere - Santa Caterina i la Ribera",
                district: "Ciutat Vella",
                avgEffort: 31.43,
                count: 3,
                viability: "limitado"
            },
            {
                barrio: "El Raval",
                district: "Ciutat Vella",
                avgEffort: 30.00,
                count: 2,
                viability: "viable"
            }
        ];
        
        this.renderTable(fallbackTableData);
        this.renderChart(fallbackChartData);
    }
    
    initializeWithFallback() {
        console.log('🎬 Inicializando TableManager con datos de fallback');
        this.renderFallbackData();
    }
    
    // ===== FUNCIONES UTILITARIAS =====
    
    getViabilityIcon(viability) {
        switch(viability) {
            case 'viable': return '✅';
            case 'limitado': return '⚠️';
            case 'inviable': return '❌';
            default: return '❓';
        }
    }
    
    getViabilityText(viability) {
        switch(viability) {
            case 'viable': return 'Viable';
            case 'limitado': return 'Limitado';
            case 'inviable': return 'Inviable';
            default: return 'Desconocido';
        }
    }
    
    // Formatear números con puntos de miles
    formatNumber(number) {
        if (typeof number !== 'number') return '0';
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    
    // Formatear porcentajes con 2 decimales y símbolo %
    formatPercentage(number) {
        if (typeof number !== 'number') return '0,00%';
        return number.toFixed(2).replace('.', ',') + '%';
    }
}

// Exportar al global scope
if (typeof window !== 'undefined') {
    window.tableManager = new TableManager();
    console.log('✅ TableManager V11.8 cargado (gráfico alineado 6 columnas)');
}