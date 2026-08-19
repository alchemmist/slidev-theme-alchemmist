# Migrating to 0.3

Version 0.3 centralizes slide chrome, spacing and media behavior while keeping the common 0.1 component names available.

## Requirements

- Use Node 24 or newer.
- Use Slidev 52.
- Replace Git dependencies with `slidev-theme-alchemmist@^0.3.0`.

## Deck frontmatter

Prefer `paginationPosition: top-right` over the legacy `paginationX` and `paginationY` pair. Configure the footer once with `footer`, `footerLogo` and `footerComponent`; remove repeated `<AlchemmistFooter>` instances from slides.

## Content

Replace `MarkerX` with `SectionMarker` when editing a slide. Replace `GitHubAlert` with `Callout`. Both old names remain adapters in 0.3.

Remove CSS that reaches into `.slidev-layout`, `.my-auto`, component internals or fixed footer heights. Use layout props such as `contentWidth`, `gap`, `leftWidth`, `imageWidth`, `imagePosition` and `imageSize` instead.

## Assets

Keep deck-specific images in the deck repository. Absolute paths such as `/assets/diagram.svg` now honor the deployment base path automatically.
