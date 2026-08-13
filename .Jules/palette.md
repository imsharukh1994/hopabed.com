# Palette's Journal - Critical UX/Accessibility Learnings

This journal is maintained by Palette to keep track of critical UX and accessibility learnings specific to this application.

## 2026-08-12 - Rejecting Custom CSS for Isolated UX Components
**Learning:** In this design system, altering shared global stylesheets (like `index.css`) is heavily restricted and can cause unexpected layout side effects. Reusable UX components (like floating action overlays or assistants) must be entirely self-contained, utilizing clean inline styles or dynamic JSX states to handle conditional formatting (like responsive height/positioning or focus styling).
**Action:** Always favor isolated react inline style properties or state-driven dynamic styles for positioning and accessible focus indicators over global style sheets.

## 2026-08-13 - Focus-Ring Layout Shifts and Nested Interactive Elements on Tile Components
**Learning:** Adding a focus border or changing border width on hover/focus states dynamically (e.g., from `1px` to `2px`) can cause subtle layout jitter or resizing of child elements. This can be solved by maintaining a stable border width and transitioning only the color, or utilizing outline/box-shadow. Furthermore, when converting a whole card/tile component into a single keyboard-accessible button, inner call-to-actions (e.g. redundant links) must have `tabIndex={-1}` and `aria-hidden="true"` to prevent a redundant tab-stop. Independent interactive items within the card (like favorite heart buttons) must remain in the tab-order but have distinct and accessible labels and keyboard focus outlines.
**Action:** Always use stable border widths or outline/box-shadow to avoid layout-shift on focus/hover, and carefully prune tab-stops in nested composite clickable components.
