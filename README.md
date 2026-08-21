# slidev-alchemmist-theme [![demo](https://img.shields.io/badge/Demo-red?style=for-the-badge)](https://alchemmist.github.io/slidev-theme-alchemmist/)

[![npm](https://img.shields.io/npm/v/slidev-theme-alchemmist?color=blue)](https://www.npmjs.com/package/slidev-theme-alchemmist) ![npm](https://img.shields.io/npm/dw/slidev-theme-alchemmist?color=blue)
![Last commit](https://img.shields.io/github/last-commit/alchemmist/slidev-theme-alchemmist?style=flat) ![Stars](https://img.shields.io/github/stars/alchemmist/slidev-theme-alchemmist?style=flat)
![Forks](https://img.shields.io/github/forks/alchemmist/slidev-theme-alchemmist?style=flat)
![License](https://img.shields.io/github/license/alchemmist/slidev-theme-alchemmist?style=flat)
![Contributors](https://img.shields.io/github/contributors/alchemmist/slidev-theme-alchemmist?style=flat)
[![Blog](https://img.shields.io/badge/alchemmist.xyz-red?style=flat&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAQAAACROWYpAAAAAmJLR0QA/4ePzL8AAAAHdElNRQfpCBkNDSaPhdvdAAACo0lEQVQ4y53VX2iVdRgH8I/nnE2nW6fNjnNMatgitiAUMc2ifzQqnJBgCCbtItdNdhF1IWiIVxFdSESQBBEYxRpdSBcGBbWIMmgKwSmtobOpHW3OrbENPTvn14Vnp/dsew/k97153ufh+zy/3/N83+clHo16tbhFPG5S77x0ddHXxAJKh3Ulq0G99khkiy+9WJ282zFd4Haky/47veMBM9UP+6RJI17zkM8EWfeV/G8KfrCyOjntlCCYUhAEv3pbr7eMm9UD7vVC5EQV2GlMKD3FshUEWRlJu/zuonsghad0+9hPWOolhzS66pRB5/yj1hqbPKwRQYfn7FFrv7NztV4VnLfHFh+5YcYRGytGUutRA4KCccGUQ5b+F2xyRFHehGDaK5KLXKbNt4Jg1PPz48sdNCMI3peKaeRmOcE30apzqHFUMGZT7BQSjgoGLF8okryTGHI6llw0iJVWLCSzBldMV1HAVaxyB6iTsWLuhsusR2oRuVYWanJQ1l3WajGc0m61jMdsQKvb/B1LbkbSThCMO5vytdXlDrbpNBBb936M+lTOhBHnDKf84YoLRrXqUm+H74RFyW0exG/2RftSLy2JBn2CXOyw3hAE097zhMzC8FbXBcdL/axEl1z5A5nVf1O+UT21SOFph73ucsS/xFaHNbvmmJy7dRiWr8zdKVvOPWCbRgkJaZu9a0xw3ctulmuaL9F6nwvO2+tDecG0n/Xpc8K1UsLLOuNm2G3WqO2o80HFCggmXVAQ9Feswwge8WNpydAtr2DQcZcEf9pmrQMmBSdtXIycjGylZxV9r1XSDjd8pQYJuwwJ+qMtnjMLJsq+jCW+cBGnTWmwTF7RJ37RI6uoKvYasQG0+8sZzf4HVllXWjVpJwzd+v/qGT1q4oL/ArGV39EThJYTAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDI1LTA4LTI1VDEzOjEzOjMyKzAwOjAw870+1wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyNS0wOC0yNVQxMzoxMzozMiswMDowMILghmsAAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjUtMDgtMjVUMTM6MTM6MzgrMDA6MDBxhfj6AAAAAElFTkSuQmCC&logoColor=violet&label=blog&labelColor=white&color=grey)](https://alchemmist.xyz?utm_source=github)

A modern, customizable Slidev theme inspired by design of [alchemmist](https://alchemmist.xyz?utm_source=github) blog. `slidev-alchemmist-theme` provides polished typography, color tokens, and layout components to make creating clean and beautiful Slidev presentations fast and consistent.

<img width="2917" height="1529" alt="Slideck demo" src="https://github.com/user-attachments/assets/762bf0ba-5a52-4c59-ab52-1c37cf6edacd" />


## Features

- Clean and stylish typography
- Toolkit of custom components (like `Quote`, `Card`, ...)
- Builtin pagination
- Builtin auto footer with page-level disable rules
- The mechanism of slides section with colorful markers
- Table of contents in table view

Try all this featrues in [demo](https://alchemmist.github.io/slidev-theme-alchemmist/).

## Installation
Add the following frontmatter to your `slides.md`. Start Slidev then it will prompt you to install the theme automatically.
```md
---
theme: alchemmist
---
```
Learn more about [how to use theme](https://sli.dev/guide/theme-addon#use-theme).

## Footer

Footer is now rendered automatically for every slide.

Use per-slide frontmatter to disable footer:

```md
---
footer: false
---
```

You can still use `themeConfig.footerPagesDisabled` to disable footer on specific page numbers:

```md
---
theme: alchemmist
themeConfig:
  footerPagesDisabled: [1, 4, 5]
---
```

## Pagination

Pagination is rendered automatically when `themeConfig.paginationX` or `themeConfig.paginationY` is set.

Use per-slide frontmatter to disable pagination:

```md
---
pagination: false
---
```

You can still use `themeConfig.paginationPagesDisabled` to disable pagination on specific page numbers.

To set custom footer for whole deck, create your own component and set it in `themeConfig.footerComponent`.

```md
---
theme: alchemmist
themeConfig:
  footerComponent: ProjectFooter
---
```

Then implement `components/ProjectFooter.vue` (name must match `footerComponent`) and reuse base theme footer via `AlchemmistFooter` if needed.

Theme also exposes dynamic CSS variable `--alchemmist-footer-height`, so custom layouts can subtract real footer height from available space.

## What's new in 0.3.1

Version 0.3.1 keeps the original visual design and layout geometry while adding the internal improvements introduced in 0.3:

- Centralized and configurable pagination and footer chrome
- Base-path-aware asset URLs for local development and GitHub Pages
- New `Callout` and `SectionMarker` components
- Backward-compatible `GitHubAlert` and `MarkerX` components
- Type checking, package validation, accessibility checks, and visual regression tests
- Verified compatibility with the complete EOSP and Talks slide decks

Existing 0.1 decks do not need to change their layout markup or deck-specific CSS.

### Theme configuration

The legacy `paginationX` and `paginationY` options remain supported. New decks can also use the canonical position and footer settings:

```yaml
themeConfig:
  pagination: true
  paginationPosition: top-right
  footer: true
  footerLogo: /assets/logo.svg
  footerLogoAlt: Project name
  footerComponent: ProjectFooter
```

Set `pagination: false` or `footer: false` in slide frontmatter to hide either element. `paginationPagesDisabled` and `footerPagesDisabled` still accept page number arrays.

The `image-left` and `image-right` layouts hide pagination and footer automatically so their split image can remain edge-to-edge. Split images include an inward-facing shadow and rounded inner corners by default.

Split images always preserve their aspect ratio and fit the full slide height. `image-width` moves the boundary between content and image; it does not resize or vertically crop the image.

Set `image-width` in slide frontmatter to control how much of the slide the image occupies. It accepts CSS widths and defaults to `50%`:

```md
---
layout: image-right
image: /assets/screenshot.png
image-width: 60%
---
```

### Components and assets

New slides can use `Callout` and `SectionMarker`. Existing `GitHubAlert`, `MarkerX`, `Card`, `Quote`, `Image`, and `AlchemmistFooter` usages remain supported.

Asset paths beginning with `/` now honor the configured Vite base path, so the same deck works locally and when deployed below a subpath.

See [MIGRATION.md](./MIGRATION.md) for the compatibility-focused upgrade notes.

## Development

Firstly, read the "[writing theme](https://sli.dev/guide/write-theme)" section in slidev docmentation.

## Contributing

You can offer any contribution, that you want. But some tips from me:
1. Bug reports it's very needed of this repository, make it more and more.
2. In first order, this is a my **personal** theme. That mean design of theme depends of me totally. But you can suggest design improvments too, maybe we have same style.
3. You are welcome to [Examples of usage](#examples-of-usage) section. Use this theme (_or use fork of this theme, it's absalutlly okey_) and make it public. Then you can suggest you project and I'm put it to this README. It can be help to you popularity.
4. If you add a new feature, don't forgot to put example of it to `example` slides.

## Examples of usage

The list of projects, which use this theme:
- [talks](https://github.com/alchemmist/talks) — The collection of slides, from my public talks
- [EOSP](https://alchemmist.xyz/teach/eosp) — The eductional curse, that was read at Central University.
