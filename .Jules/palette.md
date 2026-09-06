# Palette's Journal - Critical UX/Accessibility Learnings

This journal is maintained by Palette to keep track of critical UX and accessibility learnings specific to this application.

## 2026-08-12 - Rejecting Custom CSS for Isolated UX Components
**Learning:** In this design system, altering shared global stylesheets (like `index.css`) is heavily restricted and can cause unexpected layout side effects. Reusable UX components (like floating action overlays or assistants) must be entirely self-contained, utilizing clean inline styles or dynamic JSX states to handle conditional formatting (like responsive height/positioning or focus styling).
**Action:** Always favor isolated react inline style properties or state-driven dynamic styles for positioning and accessible focus indicators over global style sheets.

## 2026-08-12 - Interactive Cards with Action Triggers
**Learning:** Interactive cards that trigger navigation or modal actions need `role="button"`, `tabIndex={0}`, and `onKeyDown` handlers. If the design includes a visually styled CTA inside the card (e.g., "View Details"), using a nested `<button>` tag violates HTML interactive element nesting rules. Using a styled `<span>` inside the `role="button"` container preserves both accessibility and visual styling.
**Action:** Replace nested inner `<button>` elements in interactive card containers with styled `<span>` elements while managing card-level focus states and keyboard events.
