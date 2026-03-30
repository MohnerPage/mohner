# Design System Strategy: The Crystalline Editorial

## 1. Overview & Creative North Star
**Creative North Star: The Translucent Curator**
This design system moves away from the rigid, boxed-in layouts of traditional e-commerce. Instead, it treats the catalog of glass and plastic containers as a high-end gallery. The goal is to evoke the physical properties of the products—clarity, light refraction, and structural integrity. 

We break the "template" look through **Intentional Asymmetry** and **Tonal Depth**. By utilizing wide margins, overlapping elements, and high-contrast typography scales, we create an editorial experience that feels curated rather than computer-generated. The UI should feel like a series of layered, frosted sheets floating in a clean, light-filled space.

---

## 2. Colors & Surface Logic
The palette is a sophisticated mix of industrial charcoals and airy neutrals, punctuated by "Professional Blues" that signify precision and hygiene.

### The "No-Line" Rule
**Strict Mandate:** Designers are prohibited from using 1px solid borders to define sections. Conventional dividers make a premium product look "budget." Boundaries must be established solely through:
- **Background Color Shifts:** Moving from `surface` (#f8fafb) to `surface-container-low` (#f0f4f6).
- **Negative Space:** Utilizing the `12` (4rem) or `16` (5.5rem) spacing tokens to create mental groupings.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack. Layering should follow a logical elevation of importance:
1.  **Base Layer:** `surface` (#f8fafb) – The infinite gallery floor.
2.  **Sectional Wrappers:** `surface-container-low` (#f0f4f6) – Large blocks used to group related categories.
3.  **Interactive Cards:** `surface-container-lowest` (#ffffff) – Used for product cards to make them "pop" against the darker base, appearing closer to the user.

### The Glass & Gradient Rule
To reflect the catalog's subject matter, use **Glassmorphism** for persistent elements like Navigation Bars or Filter Overlays.
*   **Formula:** `surface` at 70% opacity + `backdrop-blur: 20px`.
*   **Signature Textures:** Apply subtle linear gradients (e.g., `primary` #326286 to `primary-container` #cce5ff) on primary CTAs to simulate the way light hits a glass edge.

---

## 3. Typography
We use a dual-font system to balance high-fashion editorial with industrial clarity.

*   **The Voice (Manrope):** Used for `display` and `headline` levels. Manrope’s geometric yet open nature feels contemporary and engineered. Use `display-lg` (3.5rem) for hero statements to create a dramatic sense of scale.
*   **The Engine (Inter):** Used for `title`, `body`, and `label`. Inter provides maximum legibility for technical specifications (dimensions, volumes, material types).

**Hierarchy Tip:** Pair a `headline-lg` in `on-surface` (#2a3437) with a `label-md` in `primary` (#326286) to create a clear, sophisticated entry point for the eye.

---

## 4. Elevation & Depth
In this system, depth is felt, not seen. We avoid heavy shadows in favor of **Tonal Layering**.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container` background. The subtle 2-bit color shift creates a "soft lift" that feels architectural.
*   **Ambient Shadows:** If a floating element (like a modal) requires a shadow, use a diffuse spread: `box-shadow: 0 20px 40px rgba(42, 52, 55, 0.06)`. The shadow must use a tint of `on-surface`, never pure black.
*   **The Ghost Border:** For accessibility on white-on-white elements, use the `outline-variant` (#a9b4b7) at **15% opacity**. It should be a suggestion of an edge, not a cage.

---

## 5. Components

### Product Cards & Lists
*   **Forbidden:** Divider lines or "boxed" image containers.
*   **Execution:** Use `surface-container-lowest` for the card body. The image should bleed to the edges or sit on a transparent background. Use `spacing-4` (1.4rem) for internal padding to give the product room to breathe.

### Buttons
*   **Primary:** A gradient of `primary` to `primary_dim`. Roundedness set to `md` (0.375rem).
*   **Secondary:** No background. Use `on-surface` text with a `Ghost Border`.
*   **Tertiary:** Purely typographic. Use `label-md` in `primary` with a subtle `spacing-1` underline that expands on hover.

### Input Fields
*   **State:** Use `surface-container-high` as the fill color.
*   **Focus:** Transition the background to `surface-container-lowest` and apply a 1px `primary` "Ghost Border" (20% opacity). This mimics the clarity of a polished container.

### Chips (Material Filters)
*   Use `surface-container-highest` with `on-surface-variant` text. When selected, switch to `primary-container` with `on-primary-container` text. This reflects the "sorting" of clear materials.

---

## 6. Do's and Don'ts

### Do
*   **Use Asymmetry:** Offset product descriptions from their images to create a dynamic, editorial feel.
*   **Embrace the Grid:** Use the `spacing-20` and `spacing-24` tokens for section margins to emphasize the "Premium" positioning.
*   **Subtle Motion:** Animate transitions with a "glass-slide" effect—slow, eased-out movements that feel heavy and expensive.

### Don't
*   **No Heavy Borders:** Never use a solid dark border to separate content. It breaks the "translucent" illusion.
*   **No Pure Black:** Avoid `#000000`. Use `inverse-surface` (#0b0f10) or `on-background` (#2a3437) for deep tones to keep the palette organic.
*   **No Crowding:** If you feel the need to add a line to separate elements, you probably just need more white space. Double your `spacing` token instead.

### Accessibility Note
While we lean into subtle tonality, ensure all text at the `body-md` level and below maintains at least a 4.5:1 contrast ratio against its specific `surface-container` tier. Use `on-surface-variant` (#566164) sparingly for non-critical metadata.