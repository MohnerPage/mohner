# Prompt para Gemini CLI - Sitio Crystalline

## Contexto
Sitio web para empresa fabricante de envases de plástico y vidrio. Next.js 14 App Router, TypeScript, CSS puro (sin Tailwind). Paleta de colores y estilos basados en mockups proporcionados.

## Paleta de colores (variables CSS)
--color-primary: #5c6ac3 (azul lavanda)
--color-primary-dim: #494db8
--color-on-primary: #ffffff
--color-surface: #f8fafb (fondo claro)
--color-surface-container: #ffffff (tarjetas)
--color-surface-container-high: #f1f5f9 (hover)
--color-surface-dim: #e9ecef (secciones alternas)
--color-outline-variant: #c5c5c5 (bordes)
--color-on-surface: #1f2937 (texto principal)
--color-on-surface-variant: #6b7280 (texto secundario)
--color-success: #10b981
--color-warning: #f59e0b
--color-error: #ef4444

## Fuentes
- Manrope (headlines, bold, weights 400-800)
- Inter (body, 300-600)

## Efectos
- Glassmorphism: transparencia + backdrop-filter blur(20px)
- Sombras sutiles
- Bordes redondeados (rounded-xl, rounded-2xl)
- Transiciones suaves (transition-all duration-300)

## Estructura de página principal (/)
1. Navbar fijo con glass effect. Logo a la izquierda, menú derecho. En móvil, hamburguesa.
2. Hero: fondo degradado con blobs, headline grande, subtexto, dos botones (primary y outline).
3. Sección Products: grid responsive (1 columna móvil, 2 tablet, 3 desktop). Cards con imagen aspect 4:5, categoría, precio, nombre, descripción corta, botones "Cotizar" e "Info".
4. About: 2 columnas (texto left, imagen right). Estadísticas en 3 cards.
5. Certificaciones: grid 2-3 columnas, iconos verified, nombre y descripción.
6. Testimonios: carrusel que cambia cada 6s, con puntos de navegación. Quote, autor, rol, empresa.
7. Contacto: 2 columnas (info left, formulario right). Form con campos: name, email, company, industry (select), message. Validación básica. Botón envío con spinner.
8. Footer: 4 columnas (Brand, Products, Company, Resources). Redes sociales icons.

## Componentes a crear/optimizar
- Hero: Debe incluirCall to Action claros.
- Products: Las imágenes deben ser de envases reales (botellas, frascos, tarros). Cada card debe tener hover: slight lift, border primary/30.
- Testimonios: transición deslizante horizontal.
- Glass nav: bg-white/70, backdrop-blur, border-bottom outline-variant.

## Páginas
- /login: Card centrada con patrón de fondo (dots o blobs), inputs con border outline-variant, botón primary full width.
- /admin/products/new: Formulario en 3 secciones colapsibles? O en una columna con 3 sections. Campos: name, description, material (select: glass, pet, hdpe, pp, aluminum), capacity (string), dimensions, category (select), price (number), imageUrl (url). Guardar en BD via POST /api/products.
- /admin/products: Tabla con columnas: ID, Name, Category, Material, Price, Actions (Edit, Delete).

## API
- POST /api/auth/login → set cookie auth_token (httpOnly)
- GET /api/auth/me → returns { authenticated: true, user: {...} }
- POST /api/auth/logout → clear cookie
- GET /api/products → protected, return all products ordered by createdAt desc
- POST /api/products → protected admin, create product

## Instrucciones para Gemini
Genera los archivos TypeScript/TSX con código listo para copiar-pegar. Sigue estrictamente la paleta y efectos indicados. Usa clases CSS personalizadas definidas en globals.css (no uses Tailwind). Los nombres de clase deben ser los definidos en globals.css (bg-primary, bg-surface, etc.) o utilidades estándar (flex, grid, p-8, etc.).

Prioriza UX: loading states, validaciones, feedback visual.

Genera UN archivo a la vez. Espera confirmación antes de generar el siguiente.

¿Preparado? Empieza por optimizar el componente Products en /app/page.tsx para que sea exacto al mockup: grid responsive, cards con imagen, badges de categoría, precio, y botones.
