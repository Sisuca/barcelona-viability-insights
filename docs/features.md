# Arquitectura JavaScript - Barcelona Viability Insights

**Versión:** V15.8 • **Última actualización:** Enero 2026

Documentación técnica del sistema de módulos, dependencias y flujo de datos para el proyecto Barcelona Viability Insights 2026.

## 🏗️ Arquitectura general

### Patrón: Event-driven con Managers especializados

Eventos (filtersChanged, pageChanged) → DataProcessorFinal → Managers → UI


### Principios de diseño
1. **Separación de responsabilidades** - Cada manager gestiona una funcionalidad específica
2. **Comunicación por eventos** - Bajo acoplamiento mediante eventos personalizados
3. **Datos centralizados** - DataProcessorFinal como única fuente de verdad
4. **Fallback graceful** - Cada manager tiene datos de respaldo
5. **Inicialización robusta** - AppInitializer coordina la carga secuencial

### Diagrama de dependencias

   ┌─────────────┐
   │  index.html │
   └──────┬──────┘
          │ (scripts en orden)
   ┌──────▼──────┐
   │   Datos     │
   │  (globales) │
   └──────┬──────┘
          │
   ┌──────▼──────┐
   │DataProcessor│
   │    Final    │◄────────────────┐
   └──────┬──────┘                │
          │                       │
┌─────────┼─────────┐             │
│         │         │             │

┌───▼─────┐ │ ┌──────▼──────┐ ┌───▼──────┐
│Dashboard│ │ │ Filters │ │ App │
│ Manager │ │ │ Manager │ │Initializer│
└─────────┘ │ └─────────────┘ └──────────┘
│ │
┌─────▼─────────▼─────┐
│ Managers UI │
└─────────┬───────────┘
│
┌───────┼───────┐
┌────▼───┐ ┌─▼───┐ ┌─▼─────┐
│ KPICards│ │Table│ │Heatmap│
│ Manager │ │Manager│ │Manager │
└─────────┘ └──────┘ └───────┘




## 📦 Módulos y dependencias

### Orden de carga CRÍTICO (index.html)
```html
<!-- 1. Datos estáticos -->
<script src="js/data/rent-data.js"></script>
<script src="js/data/profiles-data.js"></script>

<!-- 2. Procesador central (BASE para managers) -->
<script src="js/data-processor-final.js"></script>

<!-- 3. Managers INDEPENDIENTES -->
<script src="js/dashboard-manager.js"></script>  <!-- No depende de DataProcessor -->
<script src="js/main.js"></script>                <!-- No depende de DataProcessor -->

<!-- 4. Managers DEPENDIENTES (DEBEN ir después del procesador) -->
<script src="js/filters-manager.js"></script>     <!-- ✓ DEPENDE -->
<script src="js/kpi-cards.js"></script>           <!-- ✓ DEPENDE -->
<script src="js/table-manager.js"></script>       <!-- ✓ DEPENDE -->
<script src="js/accessibility-heatmap.js"></script><!-- ✓ DEPENDE -->

<!-- 5. Coordinador (DEBE ir último) -->
<script src="js/app-initializer.js"></script>


Tabla de módulos
Archivo	Versión	Dependencias	Responsabilidad
data-processor-final.js	4.3.0	rent-data.js, profiles-data.js	Procesamiento central de datos y cálculos
dashboard-manager.js	13.6	Ninguna	Navegación entre páginas del dashboard
filters-manager.js	2.0.0	data-processor-final.js	Gestión de estado de filtros
kpi-cards.js	11.5	data-processor-final.js	Actualización de tarjetas KPI
table-manager.js	11.8	data-processor-final.js	Renderizado de tabla y gráfico
accessibility-heatmap.js	5.1	data-processor-final.js	Matriz transpuesta de accesibilidad
app-initializer.js	10.1	Todos los managers	Coordinación de inicialización
main.js	Última	Ninguna	Scroll spy, acordeón, funcionalidades generales



Variables globales disponibles
window.dataProcessorFinal       // Instancia de DataProcessorFinal
window.dashboardManager         // Instancia de DashboardManager
window.filtersManager           // Instancia de FiltersManager
window.kpiCardsManager          // Instancia de KPICardsManager
window.tableManager             // Instancia de TableManager
window.accessibilityHeatmapManager // Instancia de AccessibilityHeatmapManager
window.appInitializer           // Instancia de AppInitializer



🎛️ Managers detallados

DataProcessorFinal (data-processor-final.js v4.3.0)
Responsabilidad: Procesamiento central de datos y cálculos

Métodos públicos principales
class DataProcessorFinal {
    // Principal: procesa filtros y devuelve todos los datos
    processData(filters) → { tableData, chartData, kpiMetrics, summary }
    
    // Heatmap: genera matriz de accesibilidad
    getAccessibilityMatrix() → { matrixData, profiles, districts, minValue, maxValue }
    
    // Utilitarios
    getProfileSalary(category, level) → number
    getFilteredRents(type, district) → array
    getUniqueDistricts() → array
    validateFilters(filters) → boolean
    getHeatmapColor(effort) → string
}


Manejo de filtros "all" (V4.3.0)
category: 'all', level: 'all' → Salario promedio general
category: 'all', level específico → Salario promedio del nivel
category específico, level: 'all' → Salario promedio de la categoría
Ambos específicos → Salario exacto del perfil

DashboardManager (dashboard-manager.js)
Responsabilidad: Navegación entre las 3 páginas del dashboard

Páginas gestionadas
vision-general - Título: "Resumen" (página por defecto)
salary-ratio - Título: "Accesibilidad" (con heatmap)
senior-junior - Título: "Seniority" (en desarrollo)

Eventos emitidos
// Cuando cambia de página
document.dispatchEvent(new CustomEvent('pageChanged', {
    detail: { 
        pageId: 'salary-ratio',
        previousPage: 'vision-general',
        title: 'Accesibilidad'
    }
}));


FiltersManager (filters-manager.js v2.0.0)
Responsabilidad: Gestión del estado de filtros y sincronización con URL

Filtros por defecto
{
    category: 'Technology',   // Valor por defecto: Technology
    level: 'Senior',          // Valor por defecto: Senior
    type: 'Estudio',          // Valor por defecto: Estudio
    district: 'Ciutat Vella'  // Valor por defecto: Ciutat Vella (NO 'all')
}


Eventos emitidos
// Cuando cambia cualquier filtro
document.dispatchEvent(new CustomEvent('filtersChanged', {
    detail: { 
        filters: currentFilters,
        timestamp: '2026-01-23T10:30:00Z'
    }
}));


KPICardsManager (kpi-cards.js)
Responsabilidad: Actualización de las 3 tarjetas de métricas

Textos actualizados (Fase 3)
Salario: Mediana salarial de {category} {level}
Alquiler: Alquiler promedio en {district}
Esfuerzo: Menor % de esfuerzo en {district}

Estados
Loading → Datos aún no disponibles
Ready → Datos calculados y mostrados
Fallback → Usando datos de respaldo


TableManager (table-manager.js)
Responsabilidad: Renderizado de tabla detallada y gráfico de barras

Características
Tabla: Ordenable por esfuerzo (ascendente por defecto)
Gráfico: Barras horizontales ordenadas por esfuerzo (menor a mayor)
Viabilidad: Iconos (✅⚠️❌) sin colores semánticos
Responsive: Scroll horizontal en móvil, disposición vertical


AccessibilityHeatmapManager (accessibility-heatmap.js v5.1)
Responsabilidad: Renderizado de matriz transpuesta con agrupación por categorías

Características
Matriz 7×9 (distritos × perfiles)
Agrupación visual por categorías (Technology, Marketing, Design)
Colores semánticos solo aquí (excepción documentada en CSS)
Tooltips informativos
Se activa automáticamente al cambiar a página "Accesibilidad"


AppInitializer (app-initializer.js)
Responsabilidad: Coordinación de la inicialización de todos los componentes

Secuencia de inicialización
Verifica que los datos estén cargados (rentData, profilesData)
Espera a que todos los managers estén disponibles
Inicializa con filtros por defecto
Configura event listeners para coordinación
Maneja reintentos automáticos en caso de error



🔄 Flujo de datos

1. Inicialización de la aplicación
DOMContentLoaded → AppInitializer.startInitialization()
                  ↓
           Verifica datos cargados
                  ↓
           Verifica managers listos
                  ↓
      Inicializa DashboardManager
                  ↓
      Inicializa FiltersManager
                  ↓
    FiltersManager.notifyOtherManagers()
                  ↓
   KPICardsManager.updateKPICards()
                  ↓
   TableManager.onFiltersChanged()


   2. Cambio de filtros (usuario interactúa)
Usuario cambia filtro → FiltersManager.handleFilterChange()
                         ↓
                  Actualiza estado
                         ↓
             FiltersManager.notifyOtherManagers()
                         ↓
   ┌─────────────────────┼─────────────────────┐
   ↓                     ↓                     ↓
KPICardsManager   TableManager         AccessibilityHeatmapManager
   .updateKPICards() .onFiltersChanged()  (solo si página activa)

   3. Cambio de página (navegación dashboard)
Usuario hace clic → DashboardManager.switchPage()
en menú lateral         ↓
                 Actualiza UI y URL
                         ↓
              Dispara evento 'pageChanged'
                         ↓
        AccessibilityHeatmapManager.renderHeatmap()
        (solo si pageId === 'salary-ratio')

   4. Cálculos internos (DataProcessorFinal)
DataProcessorFinal.processData(filters):
1. Obtiene salario según categoría y nivel (maneja "all")
2. Filtra alquileres según tipo y distrito
3. Calcula esfuerzo: (precio / salario) × 100
4. Determina viabilidad: ≤30% viable, 31-45% limitado, ≥46% inviable
5. Agrupa por barrio para gráfico (promedia esfuerzos)
6. Calcula métricas para KPIs



📊 Estructuras de datos

Datos de entrada (estáticos)

// profiles-data.js (9 elementos)
{
    id: "001",
    category: "Technology",
    level: "Junior",
    Salary: 1875  // Salario bruto mensual
}

// rent-data.js (140 elementos)
{
    id: "001",
    district: "Ciutat Vella",
    neighborhood: "Sant Pere - Santa Caterina i la Ribera",
    type: "Estudio",
    price: 1100  // Precio mensual
}


Datos procesados para tabla (TableManager)
{
    id: "001",
    district: "Ciutat Vella",
    neighborhood: "Sant Pere - Santa Caterina i la Ribera",
    type: "Estudio",
    price: 1100,
    effort: 31.43,      // Porcentaje (price / salary × 100)
    viability: "limitado", // "viable", "limitado", "inviable"
    salary: 3500        // Salario bruto del perfil
}

Datos procesados para gráfico (TableManager)
{
    barrio: "Sant Pere - Santa Caterina i la Ribera",
    district: "Ciutat Vella",
    avgEffort: 31.43,   // Promedio de esfuerzo en el barrio
    avgPrice: 1100,
    viability: "limitado", // Viabilidad basada en avgEffort
    count: 3            // Número de viviendas en el barrio
}


Datos para KPIs (KPICardsManager)
{
    salary: 3500,       // Salario bruto del perfil
    averageRent: 1125,  // Promedio de alquileres filtrados
    minEffort: 28.57,   // Menor esfuerzo encontrado
    maxEffort: 40.00,   // Mayor esfuerzo encontrado
    subtexts: {
        salary: "Mediana salarial de Technology Senior",
        rent: "Alquiler promedio en Ciutat Vella",
        effort: "Menor % de esfuerzo en Ciutat Vella"
    }
}


Datos para heatmap (AccessibilityHeatmapManager)
// Matriz transpuesta: distritos × perfiles
{
    matrixData: [
        {
            x: "Ciutat Vella",               // Distrito
            y: "Technology Junior",          // Perfil
            v: 57.14,                        // Esfuerzo mínimo (%)
            viability: "inviable",           // Clasificación
            salary: 1875,
            district: "Ciutat Vella",
            category: "Technology",
            level: "Junior"
        }
        // ... 62 elementos más (7×9 - 1)
    ],
    profiles: ["Technology Junior", ...],    // 9 perfiles
    districts: ["Ciutat Vella", ...],        // 7 distritos
    minValue: 26.29,                         // Mínimo esfuerzo
    maxValue: 85.33                          // Máximo esfuerzo
}


🛡️ Manejo de errores

Estrategias por componente
Componente	Estrategia	Fallback
DataProcessorFinal	Reintenta cargar datos, valida antes de procesar	Datos de ejemplo predefinidos
FiltersManager	Valida contra opciones válidas, mantiene estado anterior	Valores por defecto documentados
KPICardsManager	Timeout de espera, datos de respaldo calculados	Valores basados en perfiles promedio
TableManager	Mensajes amigables, datos de ejemplo	Tabla y gráfico con datos demo
AppInitializer	Reintentos progresivos, máximo 10 intentos	Estado de error con opciones de recuperación


Logging estructurado
// Convención de emojis y niveles
console.log('✅', 'Inicialización exitosa')    // Información
console.warn('⚠️', 'Datos parciales')         // Advertencia  
console.error('❌', 'Error crítico')          // Error
console.info('🔧', 'Procesando filtros')      // Proceso
console.debug('🐛', 'Variable estado:', var)  // Debug


🔍 Debugging

Problemas comunes y soluciones
1. "Los datos no se muestran"
✅ Verificar: Orden de scripts en index.html
✅ Verificar: Console por errores de carga
✅ Verificar: Variables globales (RENT_DATA, PROFILES_DATA)
✅ Verificar: Filtros por defecto válidos

2. "Cálculos incorrectos"
✅ Confirmar: Usa salario bruto (no neto)
✅ Verificar: Fórmula: (price / salary) × 100
✅ Verificar: Rangos: ≤30 viable, 31-45 limitado, ≥46 inviable
✅ Verificar: Datos de entrada en profiles-data.js

3. "Heatmap no aparece"
✅ Verificar: Estás en página "Accesibilidad" (#salary-ratio)
✅ Verificar: DataProcessor.getAccessibilityMatrix() retorna datos
✅ Verificar: Console por errores en accessibility-heatmap.js
✅ Verificar: CSS table-chart.css cargado

4. "Filtros no se mantienen"
✅ Verificar: FiltersManager.saveState() ejecutándose
✅ Verificar: localStorage disponible en navegador
✅ Verificar: URL se actualiza (hash con parámetros)
✅ Verificar: Filtros válidos según validateFilters()


Herramientas de desarrollo
Consola: Logs estructurados con emojis
SessionStorage: Estado de filtros persistente
URL hash: Filtros codificados en la URL (#vision-general?category=Technology&level=Senior)
Event listeners: Monitor de eventos personalizados (filtersChanged, pageChanged)


🧪 Testing manual

Escenarios a verificar
1. Filtros por defecto (al cargar)
// Debería mostrar:
// - Salario: €3,500 (Technology Senior)
// - Alquiler: ~€1,125 (Estudio en Ciutat Vella)
// - Esfuerzo mínimo: ~28-32%
// - Tabla: 10 estudios de Ciutat Vella
// - Gráfico: Barrios de Ciutat Vella ordenados por esfuerzo

2. Cambio de filtros secuencial
1. Cambiar categoría a "Design" → Datos actualizan
2. Cambiar nivel a "Junior" → Datos actualizan  
3. Cambiar tipo a "1 hab." → Datos actualizan
4. Cambiar distrito a "Eixample" → Datos actualizan
5. Resetear filtros → Vuelve a valores por defecto

3. Navegación entre páginas
1. Click "Accesibilidad" → Muestra matriz transpuesta
2. Click "Seniority" → Muestra mensaje "en desarrollo"
3. Click "Resumen" → Vuelve a tabla y gráfico
4. Verificar URL se actualiza (#vision-general, #salary-ratio)

4. Estados edge
1. Filtros sin resultados → Mensaje "No hay datos"
2. Carga lenta → Spinners o estados de loading
3. Error en DataProcessor → Datos de fallback
4. Móvil responsive → Scroll horizontal, disposición vertical



🔄 Mantenimiento

Agregar nueva funcionalidad
Evaluar impacto: ¿Nuevo manager o extender existente?
Diseñar API: Métodos públicos, eventos, estructuras de datos
Implementar: Siguiendo patrones establecidos
Integrar: Actualizar AppInitializer y orden de scripts
Documentar: Actualizar este features.md

Modificar existente
Preservar API pública cuando sea posible
Actualizar dependencias si cambian estructuras
Mantener compatibilidad con eventos existentes
Testear todas las integraciones afectadas

Archivos obsoletos (ELIMINADOS)
data-processor-v2.js → Reemplazado por data-processor-final.js
jobs-data.js → Datos integrados en profiles-data.js
dashboard-manager.js versión antigua → Ahora es navegación entre páginas


📚 Referencias técnicas

Eventos personalizados
// FiltersManager → Todos los managers
document.addEventListener('filtersChanged', (e) => {
    const filters = e.detail.filters;
    // Actualizar UI con nuevos filtros
});

// DashboardManager → HeatmapManager
document.addEventListener('pageChanged', (e) => {
    if (e.detail.pageId === 'salary-ratio') {
        // Renderizar matriz de calor
    }
});

// AppInitializer → Cuando aplicación está lista
document.dispatchEvent(new Event('appReady'));


Constantes y configuraciones
// Rangos de viabilidad (internos - NO usar en UI)
const VIABILITY_RANGES = {
    VIABLE: 30,      // ≤ 30%
    LIMITADO: 45,    // 31-45%
    INVIABLE: 46     // ≥ 46%
};

// Filtros por defecto (UI y estado inicial)
const DEFAULT_FILTERS = {
    category: 'Technology',
    level: 'Senior',
    type: 'Estudio',
    district: 'Ciutat Vella'  // NOTA: No usar 'all' por defecto
};

// Rutas de páginas del dashboard
const DASHBOARD_PAGES = {
    'vision-general': { title: 'Resumen', element: 'vision-general' },
    'salary-ratio': { title: 'Accesibilidad', element: 'salary-ratio' },
    'senior-junior': { title: 'Seniority', element: 'senior-junior' }
};


Consideraciones de performance
DataProcessor: Cálculos optimizados, caché de resultados
DOM updates: Batched updates, minimal re-renders
Event listeners: Debouncing en inputs, cleanup apropiado
Memory: Clean references, no memory leaks en SPA navigation


Última actualización: Enero 2026
