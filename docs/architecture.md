# Arquitectura JavaScript - Barcelona Viability Insights

Documentación técnica del sistema modular, dependencias y flujo de datos del proyecto.

## Arquitectura general

### Patrón: Event-driven con Managers especializados

```
Eventos (filtersChanged, pageChanged)
↓
DataProcessor
↓
Managers especializados
↓
UI
```

### Principios de diseño

- **Separación de responsabilidades** — Cada manager gestiona una funcionalidad específica.
- **Fuente única de verdad** — DataProcessor centraliza todos los cálculos.
- **Comunicación desacoplada** — Interacción mediante eventos personalizados.
- **Inicialización controlada** — AppInitializer coordina dependencias.
- **Fallback controlado** — Cada módulo contempla estados de error.

## Módulos y dependencias

### Orden de carga CRÍTICO (index.html)

```html
<!-- 1. Datos estáticos -->
<script src="js/data/rent-data.js"></script>
<script src="js/data/profiles-data.js"></script>

<!-- 2. Procesador central -->
<script src="js/data-processor.js"></script>

<!-- 3. Managers independientes -->
<script src="js/dashboard-manager.js"></script>
<script src="js/main.js"></script>

<!-- 4. Managers dependientes -->
<script src="js/filters-manager.js"></script>
<script src="js/kpi-cards.js"></script>
<script src="js/table-manager.js"></script>
<script src="js/accessibility-heatmap.js"></script>
<script src="js/seniority-manager.js"></script>

<!-- 5. Coordinador global -->
<script src="js/app-initializer.js"></script>
```

*El orden es obligatorio debido a dependencias en variables globales.*

### Tabla de módulos

| Archivo | Dependencias | Responsabilidad |
|---------|--------------|-----------------|
| data-processor.js | rent-data.js, profiles-data.js | Cálculo central y transformación de datos |
| dashboard-manager.js | — | Navegación entre páginas |
| filters-manager.js | data-processor.js | Gestión de filtros y estado |
| kpi-cards.js | data-processor.js | Actualización de métricas |
| table-manager.js | data-processor.js | Renderizado tabla + gráfico |
| accessibility-heatmap.js | data-processor.js | Matriz de accesibilidad |
| seniority-manager.js | data-processor.js | Gráficos comparativos Junior vs Senior |
| app-initializer.js | Todos | Coordinación de inicialización |
| main.js | — | Funcionalidades generales |

### Variables globales disponibles

```javascript
window.dataProcessor
window.dashboardManager
window.filtersManager
window.kpiCardsManager
window.tableManager
window.accessibilityHeatmapManager
window.seniorityManager
window.appInitializer
```


## Managers detallados

### DataProcessor

**Responsabilidad:** procesamiento central y generación de métricas.

**Métodos públicos:**

- `processData(filters)`
- `getAccessibilityMatrix()`
- `getProfileSalary(category, level)`
- `getFilteredRents(type, district)`
- `getUniqueDistricts()`
- `validateFilters(filters)`
- `getHeatmapColor(effort)`

**Manejo de filtros "all":**

| category | level | Resultado |
|----------|-------|-----------|
| all | all | Salario promedio general |
| all | específico | Promedio por nivel |
| específico | all | Promedio por categoría |
| específico | específico | Salario exacto |

---

### DashboardManager

**Responsabilidad:** navegación entre páginas.

**Páginas:**

- `vision-general` (Resumen)
- `salary-ratio` (Accesibilidad)
- `senior-junior` (Seniority)

**Evento emitido:**

```javascript
document.dispatchEvent(new CustomEvent('pageChanged', {
    detail: { pageId, previousPage, title }
}));
```

---

### FiltersManager

**Responsabilidad:** gestión del estado + sincronización con URL.

**Filtros por defecto:**

```javascript
{
    category: 'Technology',
    level: 'Senior',
    type: 'Estudio',
    district: 'Ciutat Vella'
}
```

**Evento emitido:**

```javascript
document.dispatchEvent(new CustomEvent('filtersChanged', {
    detail: { filters }
}));
```

---

### KPICardsManager

**Actualiza:**

- Salario bruto
- Alquiler promedio
- Esfuerzo mínimo

**Estados:** Loading · Ready · Fallback

---

### TableManager

**Responsabilidad:** tabla detallada + gráfico.

- Orden por esfuerzo ascendente
- Barras horizontales
- Indicadores de viabilidad (✅ ⚠️ ❌)
- Adaptación responsive

---

### AccessibilityHeatmapManager

**Responsabilidad:** matriz 7×9 (distritos × perfiles).

- Matriz transpuesta
- Agrupación por categorías
- Tooltips informativos
- Colores semánticos exclusivos del heatmap
- Se activa en página `salary-ratio`

---

### SeniorityManager

**Responsabilidad:** comparación gráfica entre perfiles Junior y Senior.

- Visualización comparativa
- Reutiliza cálculos de DataProcessor
- Se activa en página `senior-junior`


### AppInitializer

**Coordina:**

- Verificación de datos
- Verificación de managers
- Inicialización secuencial
- Disparo de estado inicial
- Configuración de listeners
- Reintentos ante errores


## Flujo de datos

### Inicialización

```
DOMContentLoaded
      ↓
AppInitializer.start()
      ↓
FiltersManager emite filtersChanged
      ↓
DataProcessor procesa
      ↓
Managers renderizan
```

### Cambio de filtros

```
Usuario interactúa
      ↓
FiltersManager actualiza estado
      ↓
Evento 'filtersChanged'
      ↓
Managers consumen datos
```

### Cambio de página

```
DashboardManager.switchPage()
      ↓
Evento 'pageChanged'
      ↓
Manager correspondiente renderiza
```

## Estructuras de datos

### Entrada — profiles-data.js

```javascript
{
    id: "001",
    category: "Technology",
    level: "Junior",
    salary: 1875
}
```

### Entrada — rent-data.js

```javascript
{
    id: "001",
    district: "Ciutat Vella",
    neighborhood: "...",
    type: "Estudio",
    price: 1100
}
```

### Salida — Tabla

```javascript
{
    district,
    neighborhood,
    type,
    price,
    effort,
    viability,
    salary
}
```

### Salida — KPIs

```javascript
{
    salary,
    averageRent,
    minEffort,
    maxEffort
}
```

### Salida — Heatmap

```javascript
{
    matrixData,
    profiles,
    districts,
    minValue,
    maxValue
}
```


## Configuración interna

```javascript
// Rangos de viabilidad:
// ✅ Viable: ≤30%
// ⚠️ Limitado: >30% y ≤45%
// ❌ Inviable: >45%

const DEFAULT_FILTERS = {
    category: 'Technology',
    level: 'Senior',
    type: 'Estudio',
    district: 'Ciutat Vella'
};

const DASHBOARD_PAGES = {
    'vision-general': { title: 'Resumen' },
    'salary-ratio': { title: 'Accesibilidad' },
    'senior-junior': { title: 'Seniority' }
};
```

## Archivos obsoletos

```
data-processor-v2.js → Reemplazado por data-processor.js
jobs-data.js → Datos integrados en profiles-data.js
```

## Consideraciones de performance

- Cálculos centralizados y reutilizables
- Renderizado mínimo del DOM
- Comunicación desacoplada mediante eventos
- Sin re-render global innecesario
- Control manual de dependencias (sin framework)
```
