---
name: LogiFlow Digital Standard
colors:
  surface: '#f4fbf4'
  surface-dim: '#d4dcd5'
  surface-bright: '#f4fbf4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eef6ee'
  surface-container: '#e8f0e9'
  surface-container-high: '#e3eae3'
  surface-container-highest: '#dde4dd'
  on-surface: '#161d19'
  on-surface-variant: '#3c4a42'
  inverse-surface: '#2b322d'
  inverse-on-surface: '#ebf3eb'
  outline: '#6c7a71'
  outline-variant: '#bbcabf'
  surface-tint: '#006c49'
  primary: '#006c49'
  on-primary: '#ffffff'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#4edea3'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#a43a3a'
  on-tertiary: '#ffffff'
  tertiary-container: '#fc7c78'
  on-tertiary-container: '#711419'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3af'
  on-tertiary-fixed: '#410005'
  on-tertiary-fixed-variant: '#842225'
  background: '#f4fbf4'
  on-background: '#161d19'
  surface-variant: '#dde4dd'
typography:
  h1:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-base:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: '0'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
  container-padding: 2rem
  gutter: 1rem
---

## Brand & Style

The design system is engineered for high-velocity logistics management, prioritizing clarity, efficiency, and reliability. It adopts a **Corporate Modern** aesthetic that balances the utilitarian needs of supply chain data with a sophisticated, contemporary interface. 

The visual narrative centers on "Precision Flow." This is achieved through generous whitespace, a strict structural grid, and high-contrast interactive touchpoints. The interface evokes a sense of calm control, reducing the cognitive load of managing complex inventory and shipping data. By leveraging Shadcn/UI patterns, the system ensures a familiar yet premium experience that feels both robust and lightweight.

## Colors

The palette is anchored by a neutral **Modern Light Gray (#F9FAFB)** background to provide a clean canvas for data-heavy views. The **Emerald Green (#10B981)** serves as the primary action color, signifying movement, success, and system health.

- **Primary:** Emerald Green is reserved for primary buttons, success states, and active tracking indicators.
- **Surface & Sidebar:** Dark Zinc/Slate tones (#0F172A) are utilized for navigation sidebars to create a strong structural anchor.
- **Neutral Scale:** A range of Zinc and Slate grays are used for borders, secondary text, and inactive states to maintain a high-contrast ratio for accessibility.

## Typography

The design system utilizes **Inter** exclusively to leverage its exceptional legibility at small sizes, which is critical for logistics tables and dashboards. 

Headlines use a tighter letter-spacing and heavier weights to establish a clear information hierarchy. Body text is optimized for readability with a standard 1.5x line height. For metadata and table headers, the `label-caps` style provides a distinct visual break from data values.

## Layout & Spacing

The layout follows a **Fluid Grid** philosophy within defined breakpoint constraints. The system uses an 8px spacing rhythm (4px base unit) to ensure vertical and horizontal alignment across all components.

- **Dashboards:** Use a 12-column responsive grid with a 16px gutter.
- **Sidebars:** Fixed at 280px for standard desktop views, collapsing to an icon-only rail on smaller screens.
- **Margins:** Page containers maintain a 32px (xl) padding to ensure content does not feel cramped against the viewport edges.

## Elevation & Depth

This design system uses **Tonal Layering** combined with **Ambient Shadows** to create a structured hierarchy. 

The background (#F9FAFB) sits at the lowest level. Content "cards" and the main workspace sit on a white (#FFFFFF) surface with a subtle `0px 1px 3px rgba(0,0,0,0.1)` shadow. Floating elements like modals and dropdowns utilize a more pronounced, diffused shadow to indicate high elevation. Borders are kept thin (1px) and use a light Zinc-200 color to define boundaries without adding visual noise.

## Shapes

The design system adopts a **Rounded (xl)** shape language to soften the corporate aesthetic and make the interface feel modern and approachable. 

The `rounded-xl` (0.75rem to 1.5rem) setting is applied to primary containers, cards, and modal windows. Smaller interactive elements like buttons and input fields follow a `rounded-lg` (0.5rem) standard to maintain a cohesive look while ensuring they remain recognizable as clickable objects.

## Components

- **Buttons:** Primary buttons use a solid Emerald Green background with white text. Secondary buttons use a Zinc-100 background or a simple 1px border. Hover states should involve a slight darkening of the background color.
- **Inputs:** High-contrast fields with a 1px Zinc-300 border that transitions to Emerald Green on focus. Error states use a soft red border with descriptive sub-text.
- **Chips/Badges:** Small, rounded-full elements used for shipping status (e.g., "In Transit", "Delivered"). Use a low-opacity version of the status color for the background and a high-contrast version for the text.
- **Cards:** White surfaces with `rounded-xl` corners and subtle shadows. Card headers should be separated by a thin Zinc-100 divider.
- **Data Tables:** Clean, borderless rows with subtle hover highlights. Use Lucide React icons (20px) for actions like "Edit," "Track," or "Delete."
- **Side Navigation:** Zinc-950 background with Zinc-400 text. Active links should use a white text color and a small Emerald Green vertical indicator on the left edge.
- **Logistics Icons:** Use Lucide React's `Package`, `Truck`, `MapPin`, and `BarChart` for intuitive navigation through the logistics lifecycle.