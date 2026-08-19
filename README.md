# slidev-theme-alchemmist

[![npm](https://img.shields.io/npm/v/slidev-theme-alchemmist)](https://www.npmjs.com/package/slidev-theme-alchemmist) [![demo](https://img.shields.io/badge/demo-GitHub%20Pages-5d3fd3)](https://alchemmist.github.io/slidev-theme-alchemmist/)

An academic engineering theme for Slidev: calm typography, semantic color tokens, predictable layouts, reusable content components, automatic pagination and a configurable footer.

## Install

```sh
pnpm add -D slidev-theme-alchemmist
```

```md
---
theme: alchemmist
---
```

Node 24 or newer and Slidev 52 are supported.

## Theme configuration

```yaml
themeConfig:
  accent: "#5d3fd3"
  pagination: true
  paginationPosition: top-right
  footer: true
  footerLogo: /assets/logo.svg
  footerLogoAlt: Project name
  footerComponent: ProjectFooter
```

Set `pagination: false` or `footer: false` in a slide frontmatter block to hide either element. `paginationPagesDisabled` and `footerPagesDisabled` accept page number arrays for compatibility with older decks.

## Layouts

`default`, `center`, `cover`, `intro`, `section`, `statement`, `fact`, `quote`, `end`, `full`, `two-cols`, `two-cols-header`, `image`, `image-left`, `image-right`, `iframe`, `iframe-left`, and `iframe-right`.

Media paths beginning with `/` are resolved against the configured Vite base path, so the same deck works locally and on GitHub Pages.

## Components

- `Card` for grouped arguments or metrics
- `Quote` for attributed quotations
- `Callout` for note, tip, warning and danger content
- `SectionMarker` for section labels
- `Image` for accessible figures
- `AlchemmistFooter` as a base for project-specific footers
- `MarkerX` and `GitHubAlert` as compatibility adapters

## Development

```sh
pnpm install
pnpm dev
pnpm check
```

See [MIGRATION.md](./MIGRATION.md) when upgrading an existing deck.

## Used by

- [Engineering Open Source Projects](https://github.com/alchemmist/eosp)
- [Talks](https://github.com/alchemmist/talks)
