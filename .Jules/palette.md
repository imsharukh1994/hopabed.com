# Palette's Journal - Critical UX/Accessibility Learnings

This journal is maintained by Palette to keep track of critical UX and accessibility learnings specific to this application.

## 2026-08-12 - Rejecting Custom CSS for Isolated UX Components
**Learning:** In this design system, altering shared global stylesheets (like `index.css`) is heavily restricted and can cause unexpected layout side effects. Reusable UX components (like floating action overlays or assistants) must be entirely self-contained, utilizing clean inline styles or dynamic JSX states to handle conditional formatting (like responsive height/positioning or focus styling).
**Action:** Always favor isolated react inline style properties or state-driven dynamic styles for positioning and accessible focus indicators over global style sheets.

## 2026-08-13 - Interactive Card Keyboard Focus & Nested Button Pattern
**Learning:** Interactive card components in this repository wrap details in a clickable container `<div onClick>` with a nested "View Details" button. To make cards fully accessible without invalid nested focus traps or double screen reader announcements, the outer container must be given `role="button"`, `tabIndex={0}`, keyboard handlers (Enter/Space), and an expressive `aria-label`, while setting `tabIndex={-1}` and `aria-hidden="true"` on the redundant nested action button.
**Action:** When converting clickable card containers to keyboard-navigable buttons, decouple redundant inner action buttons with `tabIndex={-1}` while maintaining distinct tab stops for nested standalone controls (like favorite toggle buttons).
