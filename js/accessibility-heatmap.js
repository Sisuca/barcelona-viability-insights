// js/accessibility-heatmap.js - VERSIÓN 15.8
// Matriz transpuesta con auto-renderizado y gráfico de ranking de distritos (sin funciones duplicadas)

class AccessibilityHeatmapManager {
    constructor() {
        console.log('🔥 AccessibilityHeatmapManager V5.6 inicializando...');
        
        // Usar ID específico
        this.container = document.getElementById('accessibility-heatmap-container');
        this.dataProcessor = window.dataProcessorFinal;
        this.hasRendered = false;
        
        // Inicializar automáticamente si el contenedor existe
        if (this.container) {
            console.log('🎯 Contenedor de heatmap encontrado, inicializando...');
            this.initialize();
        } else {
            console.warn('⚠️ Contenedor #accessibility-heatmap-container no encontrado');
        }
    }
    
    initialize() {
        // Esperar a que DataProcessor esté disponible
        if (!this.dataProcessor || typeof this.dataProcessor.getAccessibilityMatrix !== 'function') {
            console.log('⏳ Esperando DataProcessor...');
            setTimeout(() => this.initialize(), 100);
            return;
        }
        
        // Renderizar heatmap inmediatamente
        console.log('🚀 Renderizando heatmap automáticamente...');
        this.renderHeatmap();
        
        // Renderizar gráfico de distritos inmediatamente
        console.log('🚀 Renderizando gráfico de distritos automáticamente...');
        setTimeout(() => this.renderDistrictChart(), 100);
        
        // Escuchar cambios de datos
        document.addEventListener('dataLoaded', () => {
            console.log('📊 Datos recargados, actualizando visualizaciones...');
            this.renderHeatmap();
            this.renderDistrictChart();
        });
        
        // También podemos escuchar filtrosChanged para ofrecer opción de actualizar
        // (pero el heatmap es independiente de los filtros, así que solo logueamos)
        document.addEventListener('filtersChanged', (event) => {
            console.log('🔧 Filtros cambiados, heatmap permanece igual (datos completos)');
        });
    }
    
    renderHeatmap() {
        console.log('📊 Renderizando matriz de calor transpuesta...');
        
        // Verificar que tenemos contenedor
        if (!this.container) {
            console.error('❌ Contenedor no encontrado (#accessibility-heatmap-container)');
            return;
        }
        
        if (!this.dataProcessor || typeof this.dataProcessor.getAccessibilityMatrix !== 'function') {
            console.error('❌ DataProcessor no disponible');
            this.showErrorMessage('DataProcessor no disponible');
            return;
        }
        
        try {
            // Obtener datos de la matriz
            const heatmapData = this.dataProcessor.getAccessibilityMatrix();
            
            if (!heatmapData || !heatmapData.matrixData || heatmapData.matrixData.length === 0) {
                console.error('❌ No se obtuvieron datos para el heatmap');
                this.showErrorMessage('No hay datos disponibles');
                return;
            }
            
            console.log('✅ Datos obtenidos:', {
                perfiles: heatmapData.profiles.length,
                distritos: heatmapData.districts.length,
                celdas: heatmapData.matrixData.length
            });
            
            // Crear la matriz transpuesta
            this.createTransposedHeatmapTable(heatmapData);
            this.hasRendered = true;
            
        } catch (error) {
            console.error('❌ Error renderizando heatmap:', error);
            this.showErrorMessage(`Error: ${error.message}`);
        }
    }
    
    // ===== MÉTODO PARA GRÁFICO DE DISTRITOS =====
    
    renderDistrictChart() {
        console.log('📊 Renderizando gráfico de ranking por distritos...');
        
        // Contenedor específico para este gráfico
        const chartContainer = document.getElementById('district-ranking-chart');
        
        if (!chartContainer) {
            console.error('❌ Contenedor #district-ranking-chart no encontrado');
            return;
        }
        
        if (!this.dataProcessor || typeof this.dataProcessor.getDistrictRanking !== 'function') {
            console.error('❌ DataProcessor.getDistrictRanking() no disponible');
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
            // Obtener ranking ordenado (menor a mayor esfuerzo)
            const districtRanking = this.dataProcessor.getDistrictRanking();
            
            if (!districtRanking || districtRanking.length === 0) {
                throw new Error('No se obtuvieron datos de ranking');
            }
            
            // Encontrar esfuerzo máximo para escalar las barras
            const maxEffort = Math.max(...districtRanking.map(d => d.minEffort));
            
            // Generar HTML idéntico al gráfico de barrios (mismo CSS)
            let chartHTML = `
                <div class="html-chart">
                    <div class="bars-container">
            `;
            
            districtRanking.forEach(district => {
                const barWidth = Math.min(100, (district.minEffort / maxEffort) * 100);
                const viabilityIcon = this.getViabilityIcon(district.viability);
                const effortFormatted = district.minEffort.toFixed(2).replace('.', ',') + '%';
                
                // MISMA ESTRUCTURA GRID 2-3-1 QUE GRÁFICO DE BARRIOS
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
                            ✅ Viable (≤30%) • ⚠️ Limitado (31-45%) • ❌ Inviable (≥46%)
                            • Porcentaje: menor esfuerzo salarial posible en el distrito.
                        </p>
                    </div>
                </div>
            `;
            
            chartContainer.innerHTML = chartHTML;
            console.log(`✅ Gráfico de distritos renderizado: ${districtRanking.length} distritos`);
            
        } catch (error) {
            console.error('❌ Error renderizando gráfico de distritos:', error);
            chartContainer.innerHTML = `
                <div class="data-message">
                    <div class="message-icon">📭</div>
                    <h4>Gráfico no disponible</h4>
                    <p>${error.message || 'No se pudieron cargar los datos del ranking de distritos'}</p>
                    <button class="retry-btn" onclick="window.accessibilityHeatmapManager.renderDistrictChart()">
                        <i class="fas fa-redo"></i> Reintentar
                    </button>
                </div>
            `;
        }
    }
    
    createTransposedHeatmapTable(heatmapData) {
        console.log('🎨 Creando matriz transpuesta con agrupación por categorías...');
        
        // Limpiar contenedor
        this.container.innerHTML = '';
        
        // ===== CREAR SECCIÓN VISUAL (YA EXISTE EL CONTENEDOR CON TÍTULO EN HTML) =====
        // Solo necesitamos crear la tabla, no el título
        
        // Crear contenedor principal (MISMO QUE TABLA DE RESUMEN)
        const tableContainer = document.createElement('div');
        tableContainer.className = 'table-container';
        
        // Crear tabla con clases unificadas
        const table = document.createElement('table');
        table.className = 'data-table heatmap-table transposed-matrix';
        
        // ===== CREAR ENCABEZADO CON AGRUPACIÓN POR CATEGORÍAS =====
        const thead = document.createElement('thead');
        
        // Fila 1: Encabezado principal con colspan para categorías
        const headerRow1 = document.createElement('tr');
        
        // Primera celda (vacía para la esquina)
        const cornerHeader1 = document.createElement('th');
        cornerHeader1.textContent = 'Distrito / Perfil';
        cornerHeader1.rowSpan = 2;
        cornerHeader1.className = 'sticky-corner';
        headerRow1.appendChild(cornerHeader1);
        
        // Definir categorías y niveles
        const categories = ['Technology', 'Marketing', 'Design'];
        const levels = ['Junior', 'Mid', 'Senior'];
        
        // Crear encabezados de categorías con colspan=3
        categories.forEach(category => {
            const categoryHeader = document.createElement('th');
            categoryHeader.textContent = category;
            categoryHeader.colSpan = 3;
            categoryHeader.className = 'category-header';
            headerRow1.appendChild(categoryHeader);
        });
        
        thead.appendChild(headerRow1);
        
        // Fila 2: Encabezado de niveles
        const headerRow2 = document.createElement('tr');
        
        // Repetir para cada categoría: Junior, Mid, Senior
        categories.forEach(category => {
            levels.forEach(level => {
                const levelHeader = document.createElement('th');
                levelHeader.textContent = level;
                levelHeader.className = 'level-header';
                headerRow2.appendChild(levelHeader);
            });
        });
        
        thead.appendChild(headerRow2);
        table.appendChild(thead);
        
        // ===== ORGANIZAR DATOS EN ESTRUCTURA TRANSPUESTA =====
        const matrix = {};
        const viabilityMatrix = {};
        
        // Inicializar estructura: distritos como claves principales
        heatmapData.districts.forEach(district => {
            matrix[district] = {};
            viabilityMatrix[district] = {};
            
            // Para cada combinación categoría-nivel
            categories.forEach(category => {
                levels.forEach(level => {
                    const profileKey = `${category} ${level}`;
                    matrix[district][profileKey] = null;
                    viabilityMatrix[district][profileKey] = 'no-data';
                });
            });
        });
        
        // Llenar con datos
        heatmapData.matrixData.forEach(cell => {
            if (matrix[cell.x] && matrix[cell.x][cell.y] !== undefined) {
                matrix[cell.x][cell.y] = cell.v;
                viabilityMatrix[cell.x][cell.y] = cell.viability;
            }
        });
        
        // ===== CREAR CUERPO DE TABLA =====
        const tbody = document.createElement('tbody');
        
        // Crear una fila por cada distrito
        heatmapData.districts.forEach((district, rowIndex) => {
            const row = document.createElement('tr');
            row.className = rowIndex % 2 === 0 ? 'even' : 'odd';
            
            // Celda del distrito (primera columna)
            const districtCell = document.createElement('td');
            districtCell.textContent = district;
            districtCell.className = 'district-cell sticky-district';
            row.appendChild(districtCell);
            
            // Celdas de datos para cada combinación categoría-nivel
            categories.forEach(category => {
                levels.forEach(level => {
                    const profileKey = `${category} ${level}`;
                    const effort = matrix[district][profileKey];
                    const viability = viabilityMatrix[district][profileKey];
                    
                    const cell = document.createElement('td');
                    
                    // FORMATO: 2 decimales con coma
                    let displayText = 'N/A';
                    if (effort !== null && effort !== undefined) {
                        displayText = effort.toFixed(2).replace('.', ',') + '%';
                    }
                    
                    cell.textContent = displayText;
                    cell.className = 'matrix-cell';
                    
                    // Aplicar clase según viabilidad
                    if (effort !== null && effort !== undefined) {
                        if (effort <= 30) {
                            cell.classList.add('cell-viable');
                        } else if (effort <= 45) {
                            cell.classList.add('cell-limitado');
                        } else {
                            cell.classList.add('cell-inviable');
                        }
                    } else {
                        cell.classList.add('cell-nodata');
                    }
                    
                    // Tooltip
                    if (effort !== null && effort !== undefined) {
                        const tooltipEffort = effort.toFixed(2).replace('.', ',') + '%';
                        cell.title = `${district} - ${profileKey}\nEsfuerzo: ${tooltipEffort}\nViabilidad: ${this.getViabilityText(viability)}`;
                    }
                    
                    row.appendChild(cell);
                });
            });
            
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        tableContainer.appendChild(table);
        
        // ===== FOOTER (MISMO QUE TABLA DE RESUMEN) =====
        const footer = document.createElement('div');
        footer.className = 'table-footer';
        
        const footerInfo = document.createElement('p');
        footerInfo.className = 'footer-info';
        footerInfo.innerHTML = `
            <strong>Leyenda:</strong> 
            ✅ Viable (≤30%) • ⚠️ Limitado (31-45%) • ❌ Inviable (≥46%)
            • Porcentaje: menor esfuerzo salarial posible por distrito (sobre salario bruto).
        `;
        
        footer.appendChild(footerInfo);
        tableContainer.appendChild(footer);
        
        // Finalmente, agregar el tableContainer al contenedor principal
        this.container.appendChild(tableContainer);
        
        console.log('✅ Matriz transpuesta creada exitosamente');
    }
    
    // ===== FUNCIONES AUXILIARES PARA VIABILIDAD (MANTENIDAS LOCALMENTE PARA INDEPENDENCIA) =====
    
    /**
     * Obtiene el icono de viabilidad (versión local para independencia)
     * @param {string} viability - 'viable', 'limitado', 'inviable'
     * @returns {string} Emoji del icono
     */
    getViabilityIcon(viability) {
        // Primero intentar usar tableManager si está disponible
        if (window.tableManager && typeof window.tableManager.getViabilityIcon === 'function') {
            return window.tableManager.getViabilityIcon(viability);
        }
        
        // Fallback local
        switch(viability) {
            case 'viable': return '✅';
            case 'limitado': return '⚠️';
            case 'inviable': return '❌';
            default: return '❓';
        }
    }
    
    /**
     * Obtiene el texto de viabilidad (versión local para independencia)
     * @param {string} viability - 'viable', 'limitado', 'inviable'
     * @returns {string} Texto de viabilidad
     */
    getViabilityText(viability) {
        // Primero intentar usar tableManager si está disponible
        if (window.tableManager && typeof window.tableManager.getViabilityText === 'function') {
            return window.tableManager.getViabilityText(viability);
        }
        
        // Fallback local
        switch(viability) {
            case 'viable': return 'Viable';
            case 'limitado': return 'Limitado';
            case 'inviable': return 'Inviable';
            default: return 'Desconocido';
        }
    }
    
    showErrorMessage(message) {
        this.container.innerHTML = `
            <div class="data-message">
                <div class="message-icon">🔥</div>
                <h4>Matriz de calor no disponible</h4>
                <p>${message}</p>
                <button class="retry-btn" id="retryHeatmapBtn">
                    <i class="fas fa-redo"></i> Reintentar
                </button>
            </div>
        `;
        
        const retryBtn = document.getElementById('retryHeatmapBtn');
        if (retryBtn) {
            retryBtn.addEventListener('click', () => {
                this.renderHeatmap();
            });
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('🏁 DOM listo - Inicializando AccessibilityHeatmapManager V5.6...');
    window.accessibilityHeatmapManager = new AccessibilityHeatmapManager();
    console.log('✅ AccessibilityHeatmapManager V5.6 cargado (sin funciones duplicadas)');
});