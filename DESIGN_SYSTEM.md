# Design System

This project uses Angular Material and Tailwind CSS 4 together.

## Responsibility Split

- Angular Material owns interactive component behavior, accessibility, density, and component theming.
- Tailwind owns layout, spacing, one-off utilities, and page composition.
- Shared design tokens live as CSS custom properties in `src/styles.scss`.
- Tailwind token aliases and reusable utilities live in `src/tailwind.css`.

## Usage

Prefer Material components for controls:

```html
<button mat-flat-button color="primary">Create</button>
<mat-form-field appearance="outline">...</mat-form-field>
```

Use Tailwind utilities for layout around those controls:

```html
<section class="grid gap-app-4 md:grid-cols-2">
  <div class="app-panel p-app-4">...</div>
</section>
```

Do not import Tailwind Preflight. Angular Material already provides component-level baseline styles, and the app base styles are defined in `src/styles.scss`.
