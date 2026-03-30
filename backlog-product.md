# Backlog Prioritizado - web_envases

## Leyenda de Prioridades
- **Crítico**: Bloquea release o es requerido para cumplimiento (SEO, accesibilidad)
- **Importante**: Mejora significativa de UX o funcionalidad admin
- **Mejora**: Detalles de diseño y refinamientos

---

## CRÍTICO

### Title: SEO - Agregar manifest.json y metadatos Open Graph/Twitter
- **As a** Marketing Manager, **I want** proper SEO metadata and PWA manifest **so that** the site is discoverable in search engines and looks good when shared on social media
- **Acceptance Criteria:**
  - [ ] manifest.json creado en `/public` con íconos PWA, nombre, colores del tema
  - [ ] Componente Next.js `<Head>` agrega metatags Open Graph (og:title, og:description, og:image, og:url)
  - [ ] Metatags Twitter Card (twitter:card, twitter:title, twitter:description, twitter:image) implementados
  - [ ] Imágenes OG generadas o subidas al menos 2 tamaños (1200x630, 600x315)
  - [ ] Verificar en Google Lighthouse que no hay errores de SEO
- **Estimate:** 5 story points
- **Priority:** Crítico

### Title: Accesibilidad - aria-labels y alt descriptivos
- **As a** usuario con discapacidad visual, **I want** botones e imágenes con etiquetas accesibles **so that** puedo navegar el sitio con lector de pantalla
- **Acceptance Criteria:**
  - [ ] Todos los iconos de buttons (fav, cart, menu, search) tienen `aria-label` descriptivo
  - [ ] Todas las imágenes `<img>` tienen atributo `alt` que describe el contenido (no "image" o vacío)
  - [ ] Imágenes decorativas usan `alt=""` o `role="presentation"`
  - [ ] Botones "Cotizar" tienen `aria-label` que incluya contexto del producto
  - [ ] Validar conaxe Lighthouse o WAVE sin errores de accesibilidad
- **Estimate:** 3 story points
- **Priority:** Crítico

---

## IMPORTANTE

### Title: Admin - Cambiar sidebar a layout vertical
- **As a** Admin user, **I want** una barra lateral vertical en el panel de administración **so that** puedo navegar mejor las opciones en pantallas estándar
- **Acceptance Criteria:**
  - [ ] Layout admin cambia de horizontal (top nav) a vertical sidebar
  - [ ] Sidebar fija a la izquierda con links: Dashboard, Products, Orders, Settings
  - [ ] Responsivo: en móvil se convierte en drawer hamburguesa
  - [ ] Estado activo del link se visualiza con highlight en color `primary`
  - [ ] Logout funcionando desde el sidebar
- **Estimate:** 8 story points
- **Priority:** Importante

### Title: Admin - Formulario New Product con secciones colapsibles
- **As a** Admin user, **I want** un formulario organizado en 3 secciones plegables **so that** puedo ingresar productos de manera más eficiente y sin saturación
- **Acceptance Criteria:**
  - [ ] Formulario dividido en accordion: Basic Info, Physical Properties, Commercial
  - [ ] Cada sección tiene toggle para expandir/colapsar (estado persiste en localStorage durante la sesión)
  - [ ] Basic Info: nombre, SKU, categoría, descripción corta
  - [ ] Physical Properties: dimensiones, peso, material, capacidad, imágenes
  - [ ] Commercial: precio,stock,SKU,estado (activo/inactivo)
  - [ ] Validación por sección: no permite enviar hasta completar requireds de esa sección
  - [ ] Botón "Save" en la parte inferior (fuera del accordion) habilitado solo cuando todas las secciones válidas
- **Estimate:** 8 story points
- **Priority:** Importante

### Title: Productos - Añadir icono shopping_cart en botones Cotizar
- **As a** cliente potencial, **I want** ver un ícono de carrito en los botones de cotización **so that** la acción sea más recognizable y atractiva
- **Acceptance Criteria:**
  - [ ] Botones "Cotizar" en tarjetas de producto incluyen ícono `shopping_cart` (o `shopping_bag`) a la izquierda del texto
  - [ ] Ícono usa color `primary` (#326286) con tamaño 20px
  - [ ] Espaciado consistente: ícono + spacedText (gap: 8px)
  - [ ] Hover: ícono y texto cambian a color `primary-container` con transición suave
  - [ ] Responsivo: en móvil el ícono permanece visible
- **Estimate:** 2 story points
- **Priority:** Importante

---

## MEJORA

### Title: Hero - Reemplazar blobs estáticos por gradient suave
- **As a** visitante nuevo, **I want** un hero con gradiente sutil y moderno **so that** la primera impresión sea más sofisticada y acorde a la marca
- **Acceptance Criteria:**
  - [ ] Eliminar imágenes de blobs estáticos (SVG/PNG) del hero
  - [ ] Implementar gradient CSS lineal o radial: de `surface` a `surface-container-low` con overlay de `primary` a baja opacidad (0.05 - 0.1)
  - [ ] Mantener contraste para texto: asegurar que heading y CPA lean sobre el gradient
  - [ ] El gradient debe ser responsivo y cubrir toda la sección hero
  - [ ] Opcional: agregar animación sutil de movimiento (slow-drift) usando CSS keyframes
- **Estimate:** 3 story points
- **Priority:** Mejora

### Title: Cards - Añadir efecto shadow-glass en hover
- **As a** usuario navegando el catálogo, **I want** que las cards (About, Certifications, WhyChooseUs) tengan un efecto de vidrio esmerilado al pasar el mouse **so that** la interacción se sija premium y táctil
- **Acceptance Criteria:**
  - [ ] Cards objetivo aplican `backdrop-filter: blur(8px)` y `background: rgba(fg, 0.7)` en hover
  - [ ] Sombra sutil: `box-shadow: 0 8px 32px rgba(42, 52, 55, 0.12)` en estado hover
  - [ ] Transition: `all 0.3s ease-out` para background y shadow
  - [ ] No rompe layout: la tarjeta no se mueve o crece, solo cambia superficialmente
  - [ ] Funciona en About, Certifications, y WhyChooseUs sections
- **Estimate:** 2 story points
- **Priority:** Mejora

---

## Notas Adicionales

- Las imágenes de productos ya están corregidas, por lo que NO se incluye en este backlog.
- Se recomienda abordar primero los items Crítico (SEO y Accesibilidad) para cumplir con estándares de release.
- Los items Importante son funcionalidades core de UX y admin que mejoran significativamente el producto.
- Los items Mejora son refinamientos visuales que pueden realizarse después de release o en sprints de diseño.
