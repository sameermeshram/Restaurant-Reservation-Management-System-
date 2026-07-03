---
name: HauteReserve
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#006b5f'
  on-secondary: '#ffffff'
  secondary-container: '#6df5e1'
  on-secondary-container: '#006f64'
  tertiary: '#3e3fcc'
  on-tertiary: '#ffffff'
  tertiary-container: '#585be6'
  on-tertiary-container: '#f1eeff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#71f8e4'
  secondary-fixed-dim: '#4fdbc8'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#005048'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
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
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style
The design system is engineered for a premium Restaurant Reservation Management System, balancing high-end hospitality aesthetics with the rigorous functional requirements of a professional SaaS platform. The style is **Corporate Modern** with a lean toward **Minimalism**, characterized by expansive white space, precision-engineered layouts, and a "utility-first" aesthetic inspired by leading developer tools.

The brand personality is professional, calm, and highly reliable. It targets restaurant owners who require deep operational control and diners who expect a frictionless, upscale booking experience. The emotional response is one of "effortless precision"—reducing the chaos of service through clear, structured information design.

## Colors
The palette is rooted in a crisp, clean base of Slate and White to ensure the restaurant's own photography and branding can shine. 

- **Primary Blue** is used for high-intent actions and navigation focus.
- **Teal** acts as a secondary accent for financial or growth-related metrics in the dashboard.
- **Semantic Colors** (Success, Warning, Error) are used sparingly to signal table status (e.g., Available, Imminent, Delayed).
- **Backgrounds** use a very soft Slate tint (#F8FAFC) to differentiate the canvas from the white surface containers, creating a clear sense of layering.

## Typography
The design system utilizes **Inter** exclusively to achieve a systematic, neutral, and highly legible interface. The scale follows a strict hierarchy:
- **Headlines** utilize tighter letter-spacing and semi-bold weights to create a strong anchor for section starts.
- **Labels** use a medium weight for buttons and specialized "all-caps" for secondary metadata to ensure clear scannability in data-dense dashboard views.
- **Body** text maintains generous line-height to ensure readability during fast-paced restaurant operations.

## Layout & Spacing
This design system employs an **8-point spacing system** to ensure mathematical consistency across all components.

- **Dashboard Layout:** A 12-column fluid grid for the main content area, with a fixed 280px left navigation sidebar.
- **Booking Flow:** A centered, fixed-width container (max-width: 640px) to maintain focus and reduce eye strain during the reservation process.
- **Gutters:** Standardized at 24px (3 units) to provide breathable separation between complex data cards.
- **Reflow:** On mobile devices, side-by-side card layouts stack vertically, and horizontal navigation transforms into a bottom bar or "hamburger" drawer.

## Elevation & Depth
Depth is communicated through **ambient shadows** and **tonal layering**. Surfaces follow a hierarchical stack:

1.  **Level 0 (Canvas):** #F8FAFC. The base layer.
2.  **Level 1 (Surface):** #FFFFFF. Used for the primary content cards and dashboard widgets. Features a 1px border in Slate-200.
3.  **Level 2 (Popovers/Modals):** High-elevation surfaces with multi-layered shadows (0px 10px 15px -3px rgba(0,0,0,0.1)).

Shadows are never pure black; they are tinted with the primary neutral color to feel more organic. Interactive elements (buttons) use a very subtle "pressed" shadow state to mimic physical tactile response.

## Shapes
The shape language is **Rounded**, conveying friendliness and modern sophistication. 
- **Standard UI elements** (Inputs, Buttons) use a 0.5rem (8px) radius.
- **Large containers** (Cards, Modals) use a 1rem (16px) radius to soften the technical nature of the dashboard.
- **Status Chips** are fully rounded (pill-shaped) to distinguish them from interactive buttons.

## Components
- **Buttons:** Primary buttons use a subtle top-down gradient (Primary Blue to a slightly darker shade) with a white label. Secondary buttons are "Ghost" style with a Slate-200 border.
- **Data Tables:** High-density with 1px horizontal dividers. Row hover states use a subtle #F1F5F9 fill.
- **Reservation Cards:** Key information (Time, Cover Count, Guest Name) is prioritized. Status indicators (Arrived, Seated, Finished) use the semantic color palette.
- **Input Fields:** Large tap targets (44px height) with a 1px Slate-200 border. Focus states use a 2px Primary Blue ring with an offset.
- **Booking Calendar:** A custom component with high-contrast date selection and clear "unavailable" styling (diagonal hatching or 40% opacity).
- **Empty States:** Clean illustrations with primary action buttons to guide users when no data is present.