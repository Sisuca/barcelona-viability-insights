// data-processor.js - PROCESADOR DE DATOS CON CARGUE ROBUSTO
// // Versión: 15.8 - Con método getDistrictRanking() corregido (mínimo esfuerzo por distrito)

class DataProcessorFinal {
    constructor() {
        console.log('🧮 DataProcessorFinal V4.3.3 inicializando...');
        
        // INTELIGENTE: Buscar datos en múltiples ubicaciones posibles
        this.profilesData = this.findProfilesData();
        this.rentData = this.findRentData();
        
        console.log(`✅ ${this.profilesData.length} perfiles cargados`);
        console.log(`✅ ${this.rentData.length} alquileres cargados`);
        
        // Si no hay datos, esperar y reintentar
        if (this.profilesData.length === 0 || this.rentData.length === 0) {
            console.warn('⚠️ Datos insuficientes, se intentará recargar en uso');
        }
    }

    /**
     * Busca datos de perfiles en múltiples ubicaciones
     */
    findProfilesData() {
        console.log('🔍 Buscando datos de perfiles...');
        
        // 1. Primero intentar window.PROFILES_DATA (mayúsculas)
        if (window.PROFILES_DATA && Array.isArray(window.PROFILES_DATA)) {
            console.log('📥 Encontrado: window.PROFILES_DATA');
            return window.PROFILES_DATA;
        }
        
        // 2. Intentar window.profilesData (minúsculas)
        if (window.profilesData && Array.isArray(window.profilesData)) {
            console.log('📥 Encontrado: window.profilesData');
            return window.profilesData;
        }
        
        // 3. Intentar variable global PROFILES_DATA
        if (typeof PROFILES_DATA !== 'undefined' && Array.isArray(PROFILES_DATA)) {
            console.log('📥 Encontrado: PROFILES_DATA (global)');
            return PROFILES_DATA;
        }
        
        // 4. Intentar variable global profilesData
        if (typeof profilesData !== 'undefined' && Array.isArray(profilesData)) {
            console.log('📥 Encontrado: profilesData (global)');
            return profilesData;
        }
        
        console.error('❌ No se encontraron datos de perfiles en ningún lugar');
        return [];
    }

    /**
     * Busca datos de alquileres en múltiples ubicaciones
     */
    findRentData() {
        console.log('🔍 Buscando datos de alquileres...');
        
        // 1. Primero intentar window.RENT_DATA (mayúsculas)
        if (window.RENT_DATA && Array.isArray(window.RENT_DATA)) {
            console.log('📥 Encontrado: window.RENT_DATA');
            return window.RENT_DATA;
        }
        
        // 2. Intentar window.rentData (minúsculas)
        if (window.rentData && Array.isArray(window.rentData)) {
            console.log('📥 Encontrado: window.rentData');
            return window.rentData;
        }
        
        // 3. Intentar variable global RENT_DATA
        if (typeof RENT_DATA !== 'undefined' && Array.isArray(RENT_DATA)) {
            console.log('📥 Encontrado: RENT_DATA (global)');
            return RENT_DATA;
        }
        
        // 4. Intentar variable global rentData
        if (typeof rentData !== 'undefined' && Array.isArray(rentData)) {
            console.log('📥 Encontrado: rentData (global)');
            return rentData;
        }
        
        console.error('❌ No se encontraron datos de alquileres en ningún lugar');
        return [];
    }

    // ==================== MÉTODOS PRINCIPALES ====================

    /**
     * Procesa datos según filtros y devuelve estructura completa
     * @param {Object} filters - {category, level, type, district}
     * @returns {Object} Datos procesados para tabla, gráfico y KPIs
     */
    processData(filters) {
        console.log('🔧 Procesando datos con filtros:', filters);
        
        // Si no hay datos, intentar recargar
        if (this.profilesData.length === 0) {
            console.log('🔄 Reintentando cargar datos de perfiles...');
            this.profilesData = this.findProfilesData();
        }
        
        if (this.rentData.length === 0) {
            console.log('🔄 Reintentando cargar datos de alquileres...');
            this.rentData = this.findRentData();
        }
        
        // Si aún no hay datos, usar datos de ejemplo
        if (this.profilesData.length === 0 || this.rentData.length === 0) {
            console.warn('⚠️ Usando datos de ejemplo');
            return this.getSampleData(filters);
        }
        
        // 1. Obtener salario bruto del perfil seleccionado
        const salary = this.getProfileSalary(filters.category, filters.level);
        
        // 2. Filtrar alquileres según tipo y distrito
        const filteredRents = this.getFilteredRents(filters.type, filters.district);
        
        // 3. Calcular esfuerzo y viabilidad para cada vivienda
        const processedRents = this.calculateEfforts(salary, filteredRents);
        
        // 4. Preparar datos para tabla (viviendas individuales)
        const tableData = this.prepareTableData(processedRents, salary);
        
        // 5. Preparar datos para gráfico (agrupado por barrio)
        const chartData = this.prepareChartData(processedRents);
        
        // 6. Calcular métricas para KPIs
        const kpiMetrics = this.calculateKPIMetrics(processedRents, salary, filters);
        
        return {
            tableData,
            chartData,
            kpiMetrics,
            filters,
            summary: {
                totalViviendas: processedRents.length,
                barriosUnicos: [...new Set(processedRents.map(r => r.neighborhood))].length,
                esfuerzoPromedio: processedRents.reduce((sum, r) => sum + r.effort, 0) / processedRents.length
            }
        };
    }

    /**
     * Obtiene salario bruto para categoría y nivel específicos
     * MODIFICADO V4.3.0: Manejo de filtros "all" con promedios
     */
    getProfileSalary(category, level) {
        // Caso 1: Ambos son "all" - promedio general
        if (category === 'all' && level === 'all') {
            const total = this.profilesData.reduce((sum, profile) => sum + profile.Salary, 0);
            return total / this.profilesData.length;
        }
        
        // Caso 2: Categoría es "all", nivel específico
        if (category === 'all') {
            const levelProfiles = this.profilesData.filter(p => p.level === level);
            if (levelProfiles.length === 0) return 0;
            const total = levelProfiles.reduce((sum, profile) => sum + profile.Salary, 0);
            return total / levelProfiles.length;
        }
        
        // Caso 3: Nivel es "all", categoría específica
        if (level === 'all') {
            const categoryProfiles = this.profilesData.filter(p => p.category === category);
            if (categoryProfiles.length === 0) return 0;
            const total = categoryProfiles.reduce((sum, profile) => sum + profile.Salary, 0);
            return total / categoryProfiles.length;
        }
        
        // Caso 4: Ambos específicos (comportamiento original)
        const profile = this.profilesData.find(p => 
            p.category === category && p.level === level
        );
        
        if (!profile) {
            console.warn(`⚠️ Perfil no encontrado: ${category} - ${level}`);
            // Buscar en datos brutos como última opción
            const allData = window.PROFILES_DATA || window.profilesData || [];
            const fallbackProfile = allData.find(p => 
                p.category === category && p.level === level
            );
            
            if (fallbackProfile) {
                console.log(`✅ Perfil encontrado en datos globales: ${fallbackProfile.Salary}`);
                return fallbackProfile.Salary || 0;
            }
            
            return 0;
        }
        
        return profile.Salary || 0;
    }

    getFilteredRents(type, district) {
        let filtered = [...this.rentData];
        
        if (type && type !== 'all') {
            filtered = filtered.filter(rent => rent.type === type);
        }
        
        if (district && district !== 'all') {
            filtered = filtered.filter(rent => rent.district === district);
        }
        
        console.log(`🏠 ${filtered.length} alquileres filtrados`);
        return filtered;
    }

    calculateEfforts(salary, rents) {
        if (salary <= 0) {
            console.warn('⚠️ Salario es 0, no se pueden calcular esfuerzos');
            return rents.map(rent => ({ ...rent, effort: 0, viability: 'no-data' }));
        }
        
        return rents.map(rent => {
            const effort = (rent.price / salary) * 100;
            
            let viability = 'no-data';
            if (effort <= 30) viability = 'viable';
            else if (effort <= 45) viability = 'limitado';
            else viability = 'inviable';
            
            return {
                ...rent,
                effort: parseFloat(effort.toFixed(2)),
                viability
            };
        });
    }

    prepareTableData(processedRents, salary) {
        return processedRents.map(rent => ({
            id: rent.id,
            district: rent.district,
            neighborhood: rent.neighborhood,
            type: rent.type,
            price: rent.price,
            effort: rent.effort,
            viability: rent.viability,
            salary: salary
        }));
    }

    prepareChartData(processedRents) {
        const barriosMap = new Map();
        
        processedRents.forEach(rent => {
            const barrio = rent.neighborhood;
            if (!barriosMap.has(barrio)) {
                barriosMap.set(barrio, {
                    district: rent.district,
                    efforts: [],
                    prices: [],
                    viabilities: []
                });
            }
            
            const barrioData = barriosMap.get(barrio);
            barrioData.efforts.push(rent.effort);
            barrioData.prices.push(rent.price);
            barrioData.viabilities.push(rent.viability);
        });
        
        const chartData = Array.from(barriosMap.entries()).map(([barrio, data]) => {
            const avgEffort = data.efforts.reduce((a, b) => a + b, 0) / data.efforts.length;
            const avgPrice = data.prices.reduce((a, b) => a + b, 0) / data.prices.length;
            
            // CORRECCIÓN V4.3.0: Determinar viabilidad basada en avgEffort (promedio)
            let viability = 'no-data';
            if (avgEffort <= 30) {
                viability = 'viable';
            } else if (avgEffort <= 45) {
                viability = 'limitado';
            } else {
                viability = 'inviable';
            }
            
            return {
                barrio,
                district: data.district,
                avgEffort: parseFloat(avgEffort.toFixed(2)),
                avgPrice: parseFloat(avgPrice.toFixed(0)),
                viability, // Usamos viabilidad calculada por promedio
                count: data.efforts.length
            };
        });
        
        chartData.sort((a, b) => b.avgEffort - a.avgEffort);
        
        return chartData;
    }

    calculateKPIMetrics(processedRents, salary, filters) {
        if (processedRents.length === 0) {
            return {
                salary: 0,
                averageRent: 0,
                minEffort: 0,
                maxEffort: 0,
                subtexts: {
                    salary: 'Sin datos',
                    rent: 'Sin datos',
                    effort: 'Sin datos'
                }
            };
        }
        
        const averageRent = processedRents.reduce((sum, rent) => sum + rent.price, 0) / processedRents.length;
        const efforts = processedRents.map(r => r.effort);
        const minEffort = Math.min(...efforts);
        const maxEffort = Math.max(...efforts);
        
        const subtexts = {
            salary: this.getSalarySubtext(filters),
            rent: this.getRentSubtext(filters, averageRent),
            effort: this.getEffortSubtext(filters, minEffort)
        };
        
        return {
            salary: parseFloat(salary.toFixed(0)),
            averageRent: parseFloat(averageRent.toFixed(0)),
            minEffort: parseFloat(minEffort.toFixed(2)),
            maxEffort: parseFloat(maxEffort.toFixed(2)),
            subtexts
        };
    }

    getSalarySubtext(filters) {
        if (filters.category === 'all' && filters.level === 'all') {
            return 'Salario bruto promedio general';
        } else if (filters.category !== 'all' && filters.level === 'all') {
            return `Salario bruto promedio en ${filters.category}`;
        } else if (filters.category === 'all' && filters.level !== 'all') {
            return `Salario bruto promedio ${filters.level}`;
        } else {
            return `Salario bruto ${filters.category} ${filters.level}`;
        }
    }

    getRentSubtext(filters, averageRent) {
        let text = 'Promedio ';
        
        if (filters.type !== 'all') {
            text += `de ${filters.type.toLowerCase()}`;
        } else {
            text += 'de alquiler';
        }
        
        if (filters.district !== 'all') {
            text += ` en ${filters.district}`;
        } else {
            text += ' en Barcelona';
        }
        
        return text;
    }

    getEffortSubtext(filters, minEffort) {
        if (filters.district === 'all') {
            return `Mejor distrito para ahorrar (${minEffort}% esfuerzo)`;
        } else {
            return `Mejor barrio en ${filters.district} (${minEffort}% esfuerzo)`;
        }
    }

    getUniqueDistricts() {
        return [...new Set(this.rentData.map(rent => rent.district))].sort();
    }

    validateFilters(filters) {
        const validCategories = ['Technology', 'Marketing', 'Design', 'all'];
        const validLevels = ['Junior', 'Mid', 'Senior', 'all'];
        const validTypes = ['Estudio', '1 hab.', 'all'];
        
        const validDistricts = this.getUniqueDistricts();
        validDistricts.push('all');
        
        return (
            validCategories.includes(filters.category) &&
            validLevels.includes(filters.level) &&
            validTypes.includes(filters.type) &&
            validDistricts.includes(filters.district)
        );
    }

    getSampleData(filters) {
        console.log('🧪 Generando datos de ejemplo...');
        
        return {
            tableData: [
                {
                    id: "001",
                    district: "Ciutat Vella",
                    neighborhood: "Sant Pere - Santa Caterina i la Ribera",
                    type: "Estudio",
                    price: 1100,
                    effort: 31.43,
                    viability: "limitado",
                    salary: 3500
                },
                {
                    id: "002",
                    district: "Ciutat Vella",
                    neighborhood: "El Gòtic",
                    type: "Estudio",
                    price: 1000,
                    effort: 28.57,
                    viability: "viable",
                    salary: 3500
                }
            ],
            chartData: [
                {
                    barrio: "Sant Pere - Santa Caterina i la Ribera",
                    district: "Ciutat Vella",
                    avgEffort: 31.43,
                    avgPrice: 1100,
                    viability: "limitado",
                    count: 3
                },
                {
                    barrio: "El Gòtic",
                    district: "Ciutat Vella",
                    avgEffort: 28.57,
                    avgPrice: 1000,
                    viability: "viable",
                    count: 3
                }
            ],
            kpiMetrics: {
                salary: 3500,
                averageRent: 1050,
                minEffort: 26.29,
                maxEffort: 40.00,
                subtexts: {
                    salary: "Salario bruto Technology Senior",
                    rent: "Promedio de Estudio en Ciutat Vella",
                    effort: "Mejor barrio en Ciutat Vella (26.29% esfuerzo)"
                }
            }
        };
    }

    // ==================== NUEVO MÉTODO PARA HEATMAP ====================

    /**
     * Genera matriz de accesibilidad para heatmap
     * @returns {Object} Datos para heatmap: {matrixData, profiles, districts}
     */
    getAccessibilityMatrix() {
        console.log('🔥 Generando matriz de accesibilidad...');
        
        // 1. Obtener todos los perfiles (9)
        const profiles = this.profilesData;
        
        // 2. Obtener todos los distritos (7)
        const districts = this.getUniqueDistricts();
        
        // 3. Matriz para almacenar resultados
        const matrixData = [];
        
        // 4. Para cada combinación perfil-distrito
        profiles.forEach(profile => {
            districts.forEach(district => {
                // Filtrar alquileres: tipo="all", distrito actual
                const filteredRents = this.getFilteredRents("all", district);
                
                // Si no hay datos, usar 0 (no debería pasar según especificaciones)
                if (filteredRents.length === 0) {
                    matrixData.push({
                        x: district,
                        y: `${profile.category} ${profile.level}`,
                        v: 0,
                        viability: 'no-data'
                    });
                    return;
                }
                
                // Calcular esfuerzos para cada alquiler
                const efforts = filteredRents.map(rent => {
                    return (rent.price / profile.Salary) * 100;
                });
                
                // Tomar el menor esfuerzo (mejor caso)
                const minEffort = Math.min(...efforts);
                
                // Determinar viabilidad según rangos
                let viability = 'inviable';
                if (minEffort <= 30) viability = 'viable';
                else if (minEffort <= 45) viability = 'limitado';
                
                // Agregar a la matriz
                matrixData.push({
                    x: district, // Distrito (eje X)
                    y: `${profile.category} ${profile.level}`, // Perfil (eje Y)
                    v: parseFloat(minEffort.toFixed(2)), // Valor numérico
                    viability: viability, // Categoría para colores
                    salary: profile.Salary,
                    district: district,
                    category: profile.category,
                    level: profile.level
                });
            });
        });
        
        console.log(`✅ Matriz generada: ${matrixData.length} celdas`);
        
        return {
            matrixData: matrixData,
            profiles: profiles.map(p => `${p.category} ${p.level}`),
            districts: districts,
            minValue: Math.min(...matrixData.map(d => d.v)),
            maxValue: Math.max(...matrixData.map(d => d.v))
        };
    }

    // ==================== MÉTODO GETDISTRICTRANKING() CORREGIDO ====================

    /**
     * Genera ranking de distritos por menor esfuerzo salarial
     * Filtros: Todas las categorías, todos los niveles, todos los tipos de vivienda
     * @returns {Array} Distritos ordenados por esfuerzo mínimo
     */
    getDistrictRanking() {
        console.log('🏆 Generando ranking de distritos por esfuerzo mínimo...');
        
        try {
            // 1. Obtener salario promedio general (categoría="all", nivel="all")
            const averageSalary = this.getProfileSalary('all', 'all');
            console.log(`💰 Salario promedio general: ${averageSalary}€`);
            
            // 2. Obtener todos los distritos
            const districts = this.getUniqueDistricts();
            
            // 3. Para cada distrito, calcular el mínimo esfuerzo
            const districtRanking = districts.map(district => {
                // Obtener todos los alquileres de este distrito (tipo="all")
                const districtRents = this.getFilteredRents('all', district);
                
                if (districtRents.length === 0) {
                    console.warn(`⚠️ No hay alquileres para el distrito: ${district}`);
                    return {
                        district,
                        minEffort: 0,
                        viability: 'no-data',
                        rentCount: 0,
                        minPrice: 0
                    };
                }
                
                // Encontrar el precio más bajo en el distrito
                const prices = districtRents.map(rent => rent.price);
                const minPrice = Math.min(...prices);
                
                // Calcular esfuerzo mínimo: (precio más bajo / salario promedio general) × 100
                const minEffort = (minPrice / averageSalary) * 100;
                
                // Determinar viabilidad según rangos
                let viability = 'inviable';
                if (minEffort <= 30) viability = 'viable';
                else if (minEffort <= 45) viability = 'limitado';
                
                return {
                    district,
                    minEffort: parseFloat(minEffort.toFixed(2)),
                    viability,
                    rentCount: districtRents.length,
                    minPrice: minPrice,
                    averageSalary: averageSalary
                };
            });
            
            // 4. Filtrar distritos sin datos y ordenar de menor a mayor esfuerzo
            const validRanking = districtRanking.filter(d => d.rentCount > 0);
            validRanking.sort((a, b) => a.minEffort - b.minEffort);
            
            console.log('✅ Ranking de distritos generado:');
            validRanking.forEach(d => {
                console.log(`   ${d.district}: ${d.minEffort}% (${d.minPrice}€ / ${d.averageSalary}€)`);
            });
            
            // 5. Si hay datos insuficientes, usar datos de ejemplo
            if (validRanking.length === 0) {
                console.warn('⚠️ No se pudieron calcular datos, usando ejemplo');
                return this.getSampleDistrictRanking();
            }
            
            return validRanking;
            
        } catch (error) {
            console.error('❌ Error generando ranking de distritos:', error);
            return this.getSampleDistrictRanking();
        }
    }
    
    /**
     * Datos de ejemplo para el ranking de distritos
     */
    getSampleDistrictRanking() {
        return [
            { district: 'Sant Martí', minEffort: 26.95, viability: 'viable', rentCount: 20, minPrice: 670, averageSalary: 2486 },
            { district: 'Sants-Montjuïc', minEffort: 27.76, viability: 'viable', rentCount: 18, minPrice: 690, averageSalary: 2486 },
            { district: 'Eixample', minEffort: 28.16, viability: 'viable', rentCount: 25, minPrice: 700, averageSalary: 2486 },
            { district: 'Ciutat Vella', minEffort: 31.17, viability: 'limitado', rentCount: 22, minPrice: 775, averageSalary: 2486 },
            { district: 'Sarrià-Sant Gervasi', minEffort: 31.98, viability: 'limitado', rentCount: 15, minPrice: 795, averageSalary: 2486 },
            { district: 'Les Corts', minEffort: 33.75, viability: 'limitado', rentCount: 12, minPrice: 839, averageSalary: 2486 },
            { district: 'Gràcia', minEffort: 34.19, viability: 'limitado', rentCount: 16, minPrice: 850, averageSalary: 2486 }
        ];
    }

    /**
     * Obtiene el color según el porcentaje de esfuerzo
     * @param {number} effort - Porcentaje de esfuerzo
     * @returns {string} Color en formato RGBA
     */
    getHeatmapColor(effort) {
        // Rangos: Verde (≤30%), Amarillo (31-45%), Rojo (>45%)
        if (effort <= 30) return 'rgba(75, 192, 192, 0.7)';  // Verde
        if (effort <= 45) return 'rgba(255, 206, 86, 0.7)';  // Amarillo
        return 'rgba(255, 99, 132, 0.7)';                   // Rojo
    }

    // ==================== NUEVOS MÉTODOS PARA SENIORITY ====================

    /**
     * Obtiene datos para el gráfico de comparativa Junior vs Senior por categoría
     * @returns {Array} Datos para gráfico de columnas
     */
    getSeniorityComparisonData() {
        console.log('📊 Generando datos para comparativa Junior vs Senior por categoría...');
        
        // Valores estáticos según especificaciones
        return [
            { category: 'Technology', level: 'Junior', effort: 35.73 },
            { category: 'Technology', level: 'Senior', effort: 19.14 },
            { category: 'Marketing', level: 'Junior', effort: 34.95 },
            { category: 'Marketing', level: 'Senior', effort: 19.61 },
            { category: 'Design', level: 'Junior', effort: 39.23 },
            { category: 'Design', level: 'Senior', effort: 24.74 }
        ];
    }

    /**
     * Obtiene datos para el gráfico de esfuerzo salarial todas las categorías Junior vs Senior
     * @returns {Array} Datos para gráfico de barras
     */
    getAllCategoriesComparisonData() {
        console.log('📊 Generando datos para comparativa todas las categorías Junior vs Senior...');
        
        // Valores estáticos según especificaciones (corregidos)
        return [
            { level: 'Junior', effort: 36.55 },
            { level: 'Senior', effort: 20.88 }
        ];
    }
}

// Inicializar y exportar globalmente
window.dataProcessorFinal = new DataProcessorFinal();
console.log('🚀 DataProcessorFinal V4.3.3 cargado y listo (con ranking de distritos corregido y métodos Seniority)');