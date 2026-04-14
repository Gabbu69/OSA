# Design System Strategy: The Academic Sanctuary

## 1. Overview & Creative North Star
The design system for the **OSA Portal** is defined by the Creative North Star: **"The Digital Curator."** 

This system moves away from the utilitarian, "spreadsheet-heavy" look of typical management portals. Instead, it adopts an editorial, high-end aesthetic that treats student housing data with the prestige of a luxury architectural journal. We use intentional asymmetry, generous whitespace (the "breathing room" of an open campus), and a sophisticated tonal layering system to organize complex information. By breaking the rigid grid with overlapping elements and shifting background depths, we create a sense of calm authority and institutional trust.

## 2. Colors & Tonal Depth

Our palette is rooted in a deep, scholarly green (`primary: #206223`) and a crisp, clinical white (`surface_container_lowest: #ffffff`). We move beyond flat blocks of color by utilizing a sophisticated layering system.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section off content. Traditional dividers feel cluttered and dated. Instead, boundaries must be defined solely through background color shifts. A `surface_container_low` section sitting on a `surface` background is the only "line" allowed.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine vellum.
*   **Base:** `background: #f8faf8` (The canvas).
*   **Low Contrast:** `surface_container_low: #f2f4f2` (General sectioning).
*   **High Focus:** `surface_container_highest: #e1e3e1` (Sidebars or deep context).
*   **The Lift:** `surface_container_lowest: #ffffff` (Interactive cards or primary content blocks).

### The "Glass & Gradient" Rule
To elevate the portal, use Glassmorphism for floating elements (like message overlays or profile dropdowns). Apply a backdrop-blur effect on top of `surface_variant` colors with 60-80% opacity. For primary CTAs, use a subtle linear gradient from `primary` to `primary_container` (at a 135-degree angle) to provide a polished, tactile "soul" to the interface.

## 3. Typography: The Editorial Scale

We use a high-contrast pairing of **Manrope** for architectural headlines and **Inter** for functional clarity.

*   **Display & Headline (Manrope):** These are your "wayfinding" marks. Use `display-md` (2.75rem) for main dashboard greetings. Headlines should use `headline-sm` (1.5rem) to introduce sections like "Dormitories" with a sense of importance.
*   **Title & Body (Inter):** Functional and legible. Use `title-md` (1.125rem) for card titles (e.g., student names) and `body-md` (0.875rem) for all management data and descriptions.
*   **Labels:** Use `label-md` (0.75rem) in all-caps with a 0.05em letter spacing for metadata like "STATUS" or "ROOM NUMBER."

The typography hierarchy conveys a brand identity of "Sophisticated Precision"—where the largest text is calm and the smallest text is perfectly readable.

## 4. Elevation & Depth: Tonal Layering

Traditional drop shadows are largely replaced by **Ambient Elevation**.

*   **The Layering Principle:** Depth is achieved by stacking. A `surface_container_lowest` card placed on a `surface_container_low` background creates a soft, natural lift without the need for a stroke.
*   **Ambient Shadows:** When a card *must* float (e.g., a "New Complaint" modal), use an extra-diffused shadow: `box-shadow: 0 12px 32px rgba(25, 28, 27, 0.06);`. Note the color: it is a tinted version of `on_surface`, never a neutral black or grey.
*   **The "Ghost Border" Fallback:** If accessibility requires a container edge, use a "Ghost Border": `outline_variant: #bfcaba` at 20% opacity. 100% opaque borders are strictly forbidden.

## 5. Components

### Sidebar Navigation
A signature component of the OSA Portal. Use a `surface_container_highest` background. Active states should not use a box, but rather a "Primary Fixed" (`#acf4a4`) vertical pill indicator on the left side, shifting the icon color to `primary`.

### Cards (Dormitories & Tenants)
*   **Styling:** No borders. Background: `surface_container_lowest`. 
*   **Radius:** `xl` (0.75rem) for a modern, approachable feel.
*   **Layout:** Use vertical whitespace (from a 8px baseline) to separate "Dormitory Name" from "Occupancy" rather than horizontal dividers.

### Buttons
*   **Primary:** Gradient of `primary` to `primary_container`, `white` text, `full` (9999px) roundedness for a "pill" look that feels premium.
*   **Secondary:** `surface_container_high` background with `on_surface` text. No border.

### Input Fields
*   **Standard State:** `surface_container_low` background with a `Ghost Border` (10% `outline_variant`). 
*   **Focus State:** The border transitions to `primary` (100% opacity) with a subtle 2px glow.

### Additional Signature Components
*   **The Status Dot:** For "Concerns and Complaints," use a small, 8px circle with a subtle outer glow to indicate priority (e.g., `error` for urgent, `secondary` for resolved).
*   **Management Chips:** Use `secondary_container` for status tags like "Paid" or "Verified." These should have a `md` (0.375rem) radius.

## 6. Do's and Don'ts

### Do
*   **DO** use asymmetric layouts. Place a large dormitory image on the left with text content slightly offset to the right.
*   **DO** prioritize "Negative Space." If a screen feels full, increase the padding.
*   **DO** use the `tertiary` (`#923357`) color sparingly for high-attention alerts, such as an overdue complaint.

### Don't
*   **DON'T** use 1px solid lines for any reason.
*   **DON'T** use pure black `#000000` for text; always use `on_surface` (`#191c1b`) to maintain a soft, premium feel.
*   **DON'T** use standard "Material Design" shadows. Keep elevations flat or use the high-diffusion "Ambient" shadow specified above.
*   **DON'T** crowd the sidebar. Icons need at least 24px of internal padding to feel "high-end."