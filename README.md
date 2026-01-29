# Barcelona Viability Insights 2026

**Análisis socioeconómico multidimensional** que cruza datos reales de salarios y precios de alquiler para determinar la viabilidad económica de vivir en Barcelona en 2026.

## 🎯 Objetivo

Conectar a través de datos reales con la situación socioeconómica de profesionales del mundo tecnológico y creativo digital, analizando la viabilidad real de vivir en Barcelona comparando ingresos medios con coste de alquiler.

### Capacidades demostradas:
1. **Análisis integrado** - Fusión de múltiples fuentes de datos
2. **Exploración de variaciones** - Detección de patrones relevantes
3. **Storytelling con datos** - Comunicación clara de hallazgos complejos
4. **Generación de insights** - Conclusiones prácticas sobre accesibilidad a la vivienda

## 📊 Metodología

### Fuentes de datos
- **Salarios**: 153 ofertas reales de InfoJobs y Domestika (Diciembre 2025)
- **Alquileres**: 140 inmuebles reales de Idealista (Enero 2026)
- **Perfiles profesionales**: 9 combinaciones categoría-nivel (Technology/Marketing/Design × Junior/Mid/Senior)

### Fórmula principal

Esfuerzo financiero (%) = (Precio Alquiler / Salario Bruto del Perfil) × 100


### Rangos de viabilidad (análisis interno)
- **Viable**: ≤ 30% del salario destinado al alquiler
- **Limitado**: 31-45% del salario destinado al alquiler  
- **Inviable**: ≥ 46% del salario destinado al alquiler

## 🚀 Cómo usar el dashboard

### Navegación principal
1. **Dashboard Interactivo** - Análisis cruzado con filtros dinámicos
2. **Insights Destacados** - Hallazgos clave para lectura rápida
3. **Metodología** - Proceso completo de análisis y desarrollo
4. **Sobre el Proyecto** - Contexto profesional y stack tecnológico

### Filtros disponibles
- **Categoría laboral**: Technology, Marketing, Design
- **Nivel profesional**: Junior, Mid, Senior
- **Tipo de vivienda**: Estudio, 1 habitación
- **Distrito**: 7 distritos de Barcelona

### Visualizaciones
- **KPIs**: Salario bruto, alquiler promedio, esfuerzo mínimo
- **Tabla detallada**: Viviendas individuales con esfuerzo calculado
- **Gráfico de barras**: Esfuerzo por barrio ordenado por impacto

## 🛠️ Stack tecnológico

### Frontend
- HTML5, CSS3 (Custom properties, Grid, Flexbox)
- JavaScript ES6+ (Módulos, Classes, Events)
- Chart.js para visualizaciones
- Font Awesome para iconografía

### Arquitectura
- **DataProcessor**: Procesamiento y cálculo centralizado
- **Managers modularizados**: Filtros, KPIs, Tabla, Gráficos
- **Event-driven**: Comunicación entre componentes
- **Mobile-first**: Diseño responsive

### Herramientas
- Git para control de versiones
- VS Code como editor principal
- Google Fonts (Inter, JetBrains Mono)

## 📁 Estructura del proyecto

barcelona-viability/
├── index.html # Punto de entrada principal
├── css/
│ ├── main.css # Estilos base y utilidades
│ ├── dashboard.css # Estilos específicos del dashboard
│ ├── table-chart.css # Estilos para tabla y gráficos
│ └── responsive.css # Media queries y ajustes móviles
├── js/
│ ├── data/ # Datos estáticos
│ │ ├── rent-data.js # Precios de alquiler
│ │ └── profiles-data.js # Perfiles profesionales
│ ├── main.js
│ ├── data-processor-final.js # Procesador central
│ ├── data-processor-v2.js # Procesador central (anterior, eliminar si no se utiliza)
│ ├── dashboard-manager.js # Procesador central
│ ├── filters-manager.js # Gestor de filtros
│ ├── kpi-cards.js # Tarjetas de métricas
│ ├── table-manager.js # Gestor de tabla y gráfico
│ └── app-initializer.js # Inicializador principal
└── assets/ # Imágenes, iconos, recursos



## 📚 Documentación técnica

Para detalles completos sobre el sistema de diseño, arquitectura JavaScript y decisiones técnicas:

- **Guía de estilos completo** → `docs/styles.md`  
  Paleta de colores, tipografía, componentes y reglas de diseño

- **Arquitectura JavaScript** → `docs/ARCHITECTURE.md`  
  Diagrama de módulos, flujo de datos, managers y patrones implementados

*Nota: Esta documentación está dirigida a desarrolladores y analistas técnicos.*



## 🔍 Insights clave

### Hallazgos principales
1. **95% de los profesionales junior** necesitan compartir piso para vivir en Barcelona
2. Solo los **seniors de tecnología** mantienen un ratio salario/alquiler saludable (<35%)
3. **Diseñadores junior** son el perfil más vulnerable (57% del salario para alquiler)
4. **Brecha de €2,705 mensuales** entre distritos más y menos caros

### Implicaciones prácticas
- **Para juniors**: Necesidad de compartir vivienda o buscar distritos periféricos
- **Para empresas**: Revisión de políticas salariales para retención de talento
- **Para legisladores**: Datos para políticas de vivienda accesible

## 📄 Licencia y uso

### Propósito
Proyecto de portfolio profesional que demuestra capacidades de:
- Análisis de datos integrado
- Visualización de información compleja
- Storytelling con datos
- Desarrollo frontend modular

### Limitaciones
- Instantánea de Diciembre 2025 - Enero 2026
- No incluye gastos adicionales (comunidad, suministros)
- Precios pueden variar según estado del inmueble

### Créditos
**Isabel Abad** - Analista de Datos & Data Storyteller  
[LinkedIn](https://linkedin.com/in/tuperfil) | [GitHub](https://github.com/tuusuario)

---

*"El diseño no debe llamar la atención, el análisis sí."*

