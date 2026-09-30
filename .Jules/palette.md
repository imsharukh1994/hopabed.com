# Palette's Journal - Critical UX/Accessibility Learnings

This journal is maintained by Palette to keep track of critical UX and accessibility learnings specific to this application.

## 2026-08-12 - Rejecting Custom CSS for Isolated UX Components
**Learning:** In this design system, altering shared global stylesheets (like `index.css`) is heavily restricted and can cause unexpected layout side effects. Reusable UX components (like floating action overlays or assistants) must be entirely self-contained, utilizing clean inline styles or dynamic JSX states to handle conditional formatting (like responsive height/positioning or focus styling).
**Action:** Always favor isolated react inline style properties or state-driven dynamic styles for positioning and accessible focus indicators over global style sheets.

## 2026-08-12 - Dynamic Live Regions for Time-Critical Safety Modals
**Learning:** In emergency or safety-critical overlays (like `EmergencySOSModal`), countdown timers and status changes require `aria-live="assertive"` to ensure screen readers immediately prioritize and announce time-sensitive state changes without requiring manual focus shifts.
**Action:** Use `aria-live="assertive"` on status containers for emergency/time-critical modal updates, paired with keyboard listeners (`onKeyDown` handling Enter/Space) for custom trigger elements.
