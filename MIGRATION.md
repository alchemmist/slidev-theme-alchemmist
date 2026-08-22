# Migrating to 0.3

Version 0.3.1 adds centralized slide chrome, asset handling and new component names while preserving the visual output and layout markup of 0.1 decks.

## Requirements

- Use Node 24 or newer.
- Use Slidev 52.
- Replace Git dependencies with `slidev-theme-alchemmist@^0.3.1`.

## Deck frontmatter

`paginationPosition: top-right` is available alongside the legacy `paginationX` and `paginationY` pair. The old options remain supported. A footer can be configured once with `footer`, `footerLogo` and `footerComponent`, but existing per-slide footer components do not need to be migrated.

## Content

`SectionMarker` remains available for section labels. Replace legacy `Callout` and `GitHubAlert` components with Slidev's built-in GitHub-style alert syntax:

```md
> [!NOTE]
> Additional context for the audience.

> [!WARNING]
> A caveat that deserves attention.
```

`MarkerX` remains supported.

Keep deck-specific CSS that targets the established `.slidev-layout` and `.my-auto` structure. Version 0.3.1 intentionally preserves these compatibility seams.

## Assets

Keep deck-specific images in the deck repository. Absolute paths such as `/assets/diagram.svg` now honor the deployment base path automatically.
