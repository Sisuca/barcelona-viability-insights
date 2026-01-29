# Guía de Estilos - Barcelona Viability Insights

**Versión:** V15.8 • **Última actualización:** Enero 2026

Documentación consolidada del sistema de diseño, paleta de colores, tipografía y componentes para el proyecto Barcelona Viability Insights.

---

## 🎨 FILOSOFÍA DE DISEÑO

### Frase guía
**"El diseño no debe llamar la atención, el análisis sí."**

### Principios fundamentales
1. **Claridad** - Información fácil de digerir
2. **Profesionalidad** - Estilo corporativo sin ruido
3. **Minimalismo** - Solo lo necesario para la comprensión
4. **Jerarquía** - Tipografía como principal herramienta de organización

---

## 🎨 PALETA DE COLORES

### Variables oficiales (ÚNICA FUENTE DE VERDAD)
| Variable | Código HEX | Uso principal |
|----------|------------|---------------|
| `--primary-color` | `#1F3A5F` | Títulos, navbar, elementos principales |
| `--accent-color` | `#FCA311` | CTA, hover, highlights puntuales |
| `--background-color` | `#F3F4F6` | Fondos de secciones, cards, tablas |
| `--text-color` | `#111827` | Texto principal (títulos, párrafos) |
| `--secondary-blue` | `#3A5F8A` | Gráficos, elementos secundarios |
| `--neutral-gray` | `#9CA3AF` | Estados, gridlines, texto secundario |
| `--white` | `#FFFFFF` | Fondo principal |

### Variables de compatibilidad (mantener para legacy)
- `--primary-800` = `--primary-color`
- `--accent-orange` = `--accent-color`
- `--gray-50` = `--background-color`

### Reglas de uso de colores

#### Azul primario (`#1F3A5F`)
- **SÍ**: Títulos principales (h1, h2), navbar, bordes importantes
- **NO**: Textos largos, fondos grandes, elementos secundarios

#### Naranja acento (`#FCA311`)
- **SÓLO PARA**: 
  - Botones CTA principales
  - Estados hover/active
  - 1-2 elementos de máximo impacto por pantalla
- **NUNCA PARA**: 
  - Fondos grandes
  - Textos largos
  - Elementos estáticos decorativos

#### Grises (jerarquía visual)
- `#F3F4F6` - Fondos de secciones (cards, tablas, acordeón)
- `#9CA3AF` - Estados (loading, disabled), gridlines, texto secundario
- `#111827` - Todo el texto principal (con opacidad para variaciones)



### 🚫 **PROHIBICIÓN GENERAL**

**No se permiten colores semánticos (verde/amarillo/rojo) para representar viabilidad en la interfaz.**


#### ❌ VIEJO (PROHIBIDO)
```css
.viable { color: green; background: #d1fae5; }
.limitado { color: orange; background: #fef3c7; }
.inviable { color: red; background: #fee2e2; }

✅ NUEVO (OBLIGATORIO)
/* Usar iconos para representar estados */
.viability-icon::before { content: "✅"; }
.viability-icon.limitado::before { content: "⚠️"; }
.viability-icon.inviable::before { content: "❌"; }


⚠️ EXCEPCIÓN DOCUMENTADA: MATRIZ DE CALOR
Justificación: La página "Accesibilidad" contiene un mapa de calor (heatmap) que requiere colores de fondo semánticos para su correcta interpretación visual.

Alcance de la excepción:
SÓLO APLICA a las clases .cell-viable, .cell-limitado, .cell-inviable en table-chart.css
SOLO FONDO: El texto mantiene colores neutros (--primary-700)
CONFINADO exclusivamente a la matriz transpuesta de la página "Accesibilidad"
NO ES TRANSFERIBLE a otros componentes o páginas

Implementación en CSS:

/* EXCEPCIÓN DOCUMENTADA: Heatmap de accesibilidad */
.cell-viable { background-color: rgba(75, 192, 192, 0.12) !important; }
.cell-limitado { background-color: rgba(255, 206, 86, 0.12) !important; }
.cell-inviable { background-color: rgba(255, 99, 132, 0.12) !important; }


🔤 TIPOGRAFÍA
Familia principal: Inter
Elemento	Peso	Tamaño	Color	Uso
H1 (hero)	700 (Bold)	52px	white	Título hero
H1 (general)	700 (Bold)	40px	--primary-color	Títulos principales
H2 (secciones)	600 (Semibold)	32px	--primary-color	Secciones con iconos
Body	400 (Regular)	16-18px	--text-color	Texto corrido
Small	400 (Regular)	14px	--neutral-gray	Texto secundario
Familia para datos: JetBrains Mono
Elemento	Peso	Tamaño	Color	Uso
KPI values	700 (Bold)	2.5rem	--text-color	Números grandes
Metrics	500 (Medium)	1rem	--text-color	Porcentajes, precios
Table numbers	500 (Medium)	0.95rem	--text-color	Datos tabulares


Reglas tipográficas
TODO texto usa Inter (excepto valores numéricos)
SOLO valores numéricos usan JetBrains Mono
NUNCA mezclar familias en el mismo elemento
EXCEPCIÓN: H1 y H2 mantienen estilos originales para consistencia visual



📐 COMPONENTES PRINCIPALES

Hero Section
.hero {
    background-color: var(--primary-color); /* Azul sólido */
    color: white;
}
.hero-title { font-size: 3.25rem; font-weight: 700; color: white; }
.hero-subtitle { font-size: 1.5rem; font-weight: 400; color: rgba(255,255,255,0.95); }

H2 con iconos
h2 {
    font-size: 2rem;
    font-weight: 600;
    color: var(--primary-color);
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

Tarjetas KPI
.kpi-card {
    background: var(--white);
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    border-left: 4px solid var(--primary-color);
}

Tablas de datos (SIN COLORES SEMÁNTICOS)
.data-table {
    background: var(--white);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.data-table th {
    background: var(--background-color);
    color: var(--primary-color);
    font-weight: 600;
    text-transform: uppercase;
}

Gráficos (COLOR UNIFORME)
.bar {
    background-color: var(--secondary-blue); /* Todas las barras iguales */
    border-radius: 12px;
    transition: width 0.3s ease;
}


📱 RESPONSIVE

Breakpoints oficiales
Nombre	Ancho	Dispositivo
mobile	≤ 768px	Teléfonos
tablet	769px - 1024px	Tablets
desktop	≥ 1025px	Escritorio


Reglas específicas
Hero móvil: H1: 2.25rem, H2: 1.25rem
H2 con iconos: Apilado vertical en móvil
Tablas: Scroll horizontal en móvil
KPIs: 1 columna (móvil) → 3 columnas (desktop)
Iconos viabilidad: Solo icono en móvil (sin texto)

Media queries clave
@media (max-width: 480px) {
    h2 { flex-direction: column; gap: 0.25rem; text-align: center; }
    .hero-title { font-size: 2.25rem; }
}

🚫 ANTI-PATRONES (PROHIBIDOS)

Colores - PROHIBIDO
/* ❌ */
.viable { color: green; background: #d1fae5; }
.effort-value.viable { color: green; }
.bar.viable { background: green; }

Tipografía - PROHIBIDO
/* ❌ */
.number { font-family: Arial; }
.viable { color: #10B981; } /* Verde semántico */

Gráficos - PROHIBIDO
/* ❌ */
.bar.viable { background: green; }
.bar.limitado { background: yellow; }
.bar.inviable { background: red; }



📁 ESTRUCTURA DE ARCHIVOS CSS

css/
├── main.css          # Variables, reset, utilidades, hero
├── dashboard.css     # Layout dashboard, filtros, navegación, KPIs
├── table-chart.css   # Tablas, gráficos, heatmap (con excepción documentada)
└── responsive.css    # Solo media queries, sin estilos base



🎯 MANTENIMIENTO

Agregar nuevos componentes
¿Es nuevo o variación existente?
Usar variables oficiales para colores
NO usar colores semánticos para estados
Usar iconos (✅⚠️❌) para viabilidad
Implementar estados (hover, active, disabled)
Añadir responsive desde inicio
NO usar !important

Modificar existentes
ELIMINAR clases con colores semánticos (excepto heatmap)
Reemplazar por iconos en table-chart.css
Verificar impacto en componentes relacionados
Actualizar documentación si cambia API visual
Testear en móvil, tablet y desktop

Testing visual
Chrome DevTools: Mobile (iPhone 12), Tablet (iPad), Desktop
Iconos de viabilidad (✅⚠️❌) legibles en todos dispositivos
Contraste de colores (WCAG AA mínimo)
Jerarquía visual clara
VERIFICAR: No hay colores semánticos fuera del heatmap



🔄 REGISTRO DE CAMBIOS

✅ CORRECCIONES APLICADAS
Hero section - Fondo azul sólido, contraste óptimo
H1/H2 - Estilos originales mantenidos (no guía estricta)
Variables oficiales - Compatibilidad garantizada
Excepción heatmap - Documentada y justificada

❌ PENDIENTES (DE VERSIONES ANTERIORES)
~~Eliminar colores semánticos de dashboard.css~~ ✅
~~Implementar iconos de viabilidad en table-chart.css~~ ✅
~~Verificar coherencia en responsive.css~~ ✅

