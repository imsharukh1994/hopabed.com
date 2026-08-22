# Palette's Journal - Critical UX/Accessibility Learnings

This journal is maintained by Palette to keep track of critical UX and accessibility learnings specific to this application.

## 2026-08-12 - Rejecting Custom CSS for Isolated UX Components
**Learning:** In this design system, altering shared global stylesheets (like `index.css`) is heavily restricted and can cause unexpected layout side effects. Reusable UX components (like floating action overlays or assistants) must be entirely self-contained, utilizing clean inline styles or dynamic JSX states to handle conditional formatting (like responsive height/positioning or focus styling).
**Action:** Always favor isolated react inline style properties or state-driven dynamic styles for positioning and accessible focus indicators over global style sheets.

## 2026-08-12 - Card Accessibility & Nested Interactive Controls
**Learning:** Wrapping complex card components with `role="button"` and `aria-label` overrides and silences all internal text content for screen readers and creates invalid nested interactive elements.
**Action:** Keep outer card containers semantically passive and enhance individual inner action controls (such as 'View Details' and 'Favorite' buttons) with specific, descriptive `aria-label` attributes incorporating item titles.
