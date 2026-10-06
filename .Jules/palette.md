# Palette's Journal - Critical UX/Accessibility Learnings

This journal is maintained by Palette to keep track of critical UX and accessibility learnings specific to this application.

## 2026-08-12 - Rejecting Custom CSS for Isolated UX Components
**Learning:** In this design system, altering shared global stylesheets (like `index.css`) is heavily restricted and can cause unexpected layout side effects. Reusable UX components (like floating action overlays or assistants) must be entirely self-contained, utilizing clean inline styles or dynamic JSX states to handle conditional formatting (like responsive height/positioning or focus styling).
**Action:** Always favor isolated react inline style properties or state-driven dynamic styles for positioning and accessible focus indicators over global style sheets.

## 2026-10-06 - Modal Dialog Keyboard Accessibility and Interactive Pulse Triggers
**Learning:** Emergency and safety modals using custom circular pulse elements rendered as `<div>` tags with `onClick` handlers hide critical actions from screen readers and keyboard users. Using semantic `<button type="button">` elements with clear `aria-label`s, along with `role="dialog"`, `aria-modal="true"`, and an `Escape` key listener, provides complete keyboard accessibility without visual disruption.
**Action:** When building interactive triggers or modals, always use native `<button>` elements for triggers and support standard modal ARIA attributes + `Escape` key listeners.
