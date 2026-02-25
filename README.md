# Barcelona Viability Insights

**Análisis interactivo de viabilidad económica** que cruza datos reales de salarios del sector digital con precios de alquiler por distrito para evaluar dónde es financieramente sostenible vivir en Barcelona.

![Preview](assets/images/screenshot-dashboard.png)

## Enlaces
- [GitHub Pages](https://sisuca.github.io/barcelona-viability-insights)
- [Repositorio GitHub](https://github.com/Sisuca/barcelona-viability-insights)
- [Informe en PDF](docs/barcelona-viability-insights.pdf)


## Objetivo

Evaluar la viabilidad real de vivir en Barcelona para profesionales del sector tecnológico y digital, analizando la relación entre salario bruto mensual y precio de alquiler por distrito.

El proyecto combina análisis cuantitativo, visualización de datos y arquitectura frontend modular para construir un dashboard interactivo con filtros dinámicos y generación automática de métricas.


## Capacidades demostradas

- **Integración de fuentes reales** — Consolidación y normalización de datos de múltiples plataformas (InfoJobs, Domestika, Idealista)
- **Análisis comparativo multidimensional** — Perfil profesional × seniority × distrito × tipo de vivienda
- **Storytelling con datos** — Síntesis clara de hallazgos complejos
- **Generación de insights accionables** — Traducción de datos en implicaciones prácticas
- **Arquitectura frontend modular** — Separación de responsabilidades y procesamiento centralizado

## Metodología

### Fuentes de datos

- **Salarios:** 153 ofertas reales del sector tecnológico y digital (InfoJobs y Domestika, diciembre 2025)
- **Alquileres:** 140 anuncios reales de vivienda (Idealista, enero 2026)
- **Perfiles analizados:** 9 combinaciones (Tecnología, Marketing, Diseño × Junior, Mid, Senior)
- **Distritos:** 7 distritos con muestra mínima homogénea (10 estudios + 10 viviendas de 1 habitación por distrito)

### Fórmula principal

Esfuerzo financiero (%) = (Precio Alquiler / Salario Bruto del Perfil) × 100

### Clasificación de viabilidad

- ✅ **Viable:** ≤ 30% del salario
- ⚠️ **Limitado:** > 30% y ≤ 45%
- ❌ **Inviable:** > 45%

## Hallazgos clave

- En todos los distritos analizados, los **perfiles junior superan el 30% de esfuerzo salarial** en vivienda individual.
- Solo los **seniors de tecnología alcanzan escenarios con esfuerzo inferior al 20%** en los distritos más accesibles.
- **Diseñadores junior** presentan los niveles de vulnerabilidad más altos (~39% de esfuerzo mínimo).
- **Gràcia** registra el mayor esfuerzo salarial mínimo del estudio (+34%).
- **Sant Martí y Sants-Montjuïc** aparecen como los distritos más accesibles en términos relativos.

### Implicaciones prácticas

- **Para profesionales junior:** necesidad de compartir vivienda o priorizar distritos más accesibles.
- **Para empresas:** posible desalineación entre salarios junior y coste real de vivienda.
- **Responsables públicos y policy makers:** evidencia cuantitativa sobre presión habitacional en perfiles digitales cualificados.

## Dashboard interactivo

**Acceso al proyecto:**  
[GitHub Pages](https://sisuca.github.io/barcelona-viability-insights)

### Secciones principales

- **Dashboard Interactivo** — Análisis cruzado con filtros dinámicos
- **Insights Destacados** — Resumen ejecutivo de hallazgos
- **Metodología** — Explicación del proceso analítico
- **Sobre el Proyecto** — Contexto profesional y enfoque técnico

### Filtros disponibles

- **Categoría laboral:** Tecnología, Marketing, Diseño
- **Nivel profesional:** Junior, Mid, Senior
- **Tipo de vivienda:** Estudio, 1 habitación
- **Distrito:** 7 distritos de Barcelona

### Visualizaciones incluidas

- **KPIs:** salario bruto mensual, alquiler promedio y porcentaje de esfuerzo mínimo
- **Tabla de análisis de viabilidad** según los filtros aplicados
- **Gráficos de barras** con porcentaje de esfuerzo salarial por barrios y por distritos
- **Tabla de porcentaje de esfuerzo salarial** por perfil y distrito
- **Comparativa Junior vs Senior** con porcentaje de esfuerzo salarial entre perfiles

## Stack tecnológico

### Frontend

- HTML5
- CSS3 (Custom Properties, Grid, Flexbox)
- JavaScript ES6+ (módulos, clases, arquitectura event-driven)
- Chart.js
- Font Awesome
- Google Fonts (Inter, JetBrains Mono)

### Arquitectura

- **DataProcessor:** capa central de procesamiento que actúa como fuente única de verdad para cálculos y métricas.
- **Managers modulares:** filtros, KPIs, tablas y gráficos gestionados de forma independiente.
- **Event-driven:** comunicación desacoplada mediante eventos personalizados.
- **Mobile-first:** diseño responsive optimizado.

### Herramientas

- Git para control de versiones
- VS Code como entorno principal de desarrollo

## Estructura del proyecto

```text
barcelona-viability/
├── assets/
│ ├── images/
│ └── favicon.svg
├── css/
│ ├── main.css
│ ├── dashboard.css
│ ├── responsive.css
│ └── table-chart.css
├── docs/
│ ├── architecture.md
│ ├── barcelona-viability-insights.pdf
│ └── design-system.md
├── js/
│ ├── data/
│ │ ├── profiles-data.js
│ │ └── rent-data.js
│ ├── accessibility-heatmap.js
│ ├── app-initializer.js
│ ├── dashboard-manager.js
│ ├── data-processor.js
│ ├── filters-manager.js
│ ├── kpi-cards.js
│ ├── main.js
│ ├── seniority-manager.js
│ └── table-manager.js
├── index.html
├── README.md
└── .gitignore

```

## Documentación técnica ampliada

- **architecture.md** — Arquitectura JavaScript, flujo de datos y modularización
- **design-system.md** — Sistema de diseño, tipografía, componentes y convenciones visuales
- **barcelona-viability-insights.pdf** — Informe analítico descargable

## Licencia y uso

### Propósito

Proyecto de portfolio profesional orientado a demostrar:

- Análisis de datos aplicado
- Visualización estructurada de información compleja
- Diseño orientado a claridad
- Arquitectura frontend modular y escalable

### Limitaciones

- Instantánea del mercado: diciembre 2025 – enero 2026
- No incluye gastos adicionales (suministros, comunidad u otros)
- Resultados condicionados por muestra y contexto temporal

---

**Isabel Abad**  
Data Analyst & Data Storyteller
[LinkedIn](https://linkedin.com/in/abadisabel)
