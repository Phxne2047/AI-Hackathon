---
name: CareGo Oasis
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45474c'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#75777d'
  outline-variant: '#c5c6cd'
  surface-tint: '#545f73'
  primary: '#091426'
  on-primary: '#ffffff'
  primary-container: '#1e293b'
  on-primary-container: '#8590a6'
  inverse-primary: '#bcc7de'
  secondary: '#0051d5'
  on-secondary: '#ffffff'
  secondary-container: '#316bf3'
  on-secondary-container: '#fefcff'
  tertiary: '#00190e'
  on-tertiary: '#ffffff'
  tertiary-container: '#00301f'
  on-tertiary-container: '#24a375'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e3fb'
  primary-fixed-dim: '#bcc7de'
  on-primary-fixed: '#111c2d'
  on-primary-fixed-variant: '#3c475a'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003ea8'
  tertiary-fixed: '#85f8c4'
  tertiary-fixed-dim: '#68dba9'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.25'
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.25'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 64px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
---

## Brand & Style
The brand personality is **reliable, inclusive, and empowering**. As a travel and event platform for people with disabilities, the design system prioritizes clarity and ease of use over decorative trends. The visual style is **Corporate / Modern** with a strong emphasis on **High-Contrast** accessibility.

The aesthetic is functional and systematic. It avoids ambiguity by using clear visual hierarchies, generous white space to reduce cognitive load, and explicit signposting. The emotional goal is to evoke a sense of "Oasis"—a safe, predictable, and stress-free environment where users feel confident navigating their journey.

## Colors
This design system utilizes a high-contrast palette compliant with **WCAG 2.1 AA** standards. 

- **Deep Navy (#1E293B):** Used for navigation, headers, and primary branding to establish trust and authority.
- **Vibrant Blue (#2563EB):** Reserved exclusively for interactive elements and primary actions to ensure high discoverability.
- **Accessible Green (#059669):** Used for safety indicators, success states, and accessibility "Safe Zone" badges.
- **Surface & Text:** The background is a clean White or Light Gray (#F8FAFC) to ensure the Slate 900 (#0F172A) text maintains a contrast ratio of at least 7:1 for body copy.

**Accessibility Note:** Never use color alone to convey meaning. Always pair status colors with icons or clear text labels (e.g., "Error: Required Field").

## Typography
The system uses **Inter** for its exceptional legibility and tall x-height, which aids readability for users with low vision. 

- **Base Size:** The default body text starts at **16px** (body-md) but scales to **18px** (body-lg) for long-form content to reduce eye strain.
- **Hierarchy:** Headlines use a Bold (700) weight to create a clear structural anchor for the page.
- **Line Height:** A generous 1.6x line height is applied to all body text to prevent "crowding" of characters.
- **Letter Spacing:** Headlines use slight negative tracking for impact, while labels use positive tracking to ensure individual characters are distinct.

## Layout & Spacing
The layout follows a **Fixed Grid** model on desktop (12 columns) and a **Fluid Grid** on mobile (4 columns). 

- **Spacious Rhythm:** A strict 8px baseline grid is used. Padding is never smaller than 16px (md) for container interiors to prevent visual clutter.
- **Touch Targets:** All interactive elements must maintain a minimum hit area of **44x44px**, even if the visual element is smaller.
- **Safe Zones:** Content is grouped into logical "Safe Zones" using cards. These zones are separated by 40px (xl) or 64px (xxl) vertical margins to help users focus on one task at a time.
- **Mobile Reflow:** On mobile, side-by-side elements (like two buttons) should stack vertically to provide larger horizontal tap targets.

## Elevation & Depth
Depth is used to signify interactivity and stack order, following a **Tonal Layering** approach combined with **Ambient Shadows**.

- **Level 0 (Background):** Solid Light Gray (#F8FAFC). No shadow.
- **Level 1 (Cards/Content):** Pure White background with a subtle, diffused shadow (0px 4px 12px rgba(15, 23, 42, 0.08)). These are the primary interactive containers.
- **Level 2 (Modals/Dropdowns):** Pure White background with a more pronounced shadow (0px 12px 24px rgba(15, 23, 42, 0.15)).
- **Focus States:** Every interactive element must have a visible focus state—a 3px solid Vibrant Blue outline with a 2px white "inner gap" (offset) to ensure it is visible against any background color.

## Shapes
The shape language uses **Rounded (0.5rem)** corners to feel approachable yet professional. 

- **Primary Components:** Buttons, Input fields, and Accessibility Badges use the base `rounded` (8px) setting.
- **Large Containers:** Content cards and feature blocks use `rounded-lg` (16px) to soften the overall interface layout.
- **Badges:** Small accessibility tags (e.g., "Step-free Access") use a pill-shape (32px+) to distinguish them from actionable buttons.

## Components

- **Buttons:** Primary buttons use Vibrant Blue backgrounds with White text. Hover states must darken the blue significantly. Disabled states must be visually distinct (Light Gray) and use the `aria-disabled` attribute.
- **Accessibility Badges:** High-contrast tags with icons. Example: "Wheelchair Friendly" uses a green background with white text and a standard icon. These are strictly informational and non-tappable to avoid confusion.
- **Input Fields:** Use 16px text minimum. Labels must always be visible (no floating labels that disappear). Borders are 2px solid Slate 400, darkening to Vibrant Blue on focus.
- **Cards:** Cards are the primary container for bookings and events. They must include a clear heading, an image with alt-text, and a single primary action button at the bottom.
- **Chips/Filters:** Used for selecting specific needs (e.g., "Sign Language," "Quiet Space"). Selected chips use the Primary Navy color with a checkmark icon to indicate the active state.
- **Lists:** Use 16px vertical padding between list items. Every list item that is interactive should have a chevron icon or a clear "View" button to signal the click action.