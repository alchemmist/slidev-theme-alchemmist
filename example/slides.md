---
theme: alchemmist
title: Alchemmist theme
date: August 2026
themeConfig:
  accent: "#5d3fd3"
  pagination: true
  paginationPosition: top-right
  footer: true
  footerLogo: /assets/alchemmist-logo.svg
layout: cover
background: "#f4f1ff"
footer: false
pagination: false
---

# Alchemmist

An academic engineering theme for Slidev

<SectionMarker label="v0.3.0" />

---
layout: section
---

# A small, stable vocabulary

Layouts and components share spacing, typography, color and chrome.

---
layout: two-cols-header
---

# Two columns with a real header

::left::

<Card title="Deep defaults" color="#5d3fd3">
Readable typography, deliberate rhythm and a restrained accent system.
</Card>

::right::

<Callout type="tip" title="Deck-owned content">
The theme owns presentation; your repository owns slides and assets.
</Callout>

::bottom::

Use `gap` and `leftWidth` only when the content needs them.

---
layout: image-right
image: /assets/alchemmist-logo.svg
imageWidth: 38%
---

# Media layouts

Images and iframes resolve correctly under nested GitHub Pages base paths.

- `image-left`, `image-right`, `image`
- `iframe-left`, `iframe-right`, `iframe`
- `cover`, `full`

---
layout: quote
---

<Quote
  text="A theme should reduce decisions without erasing authorship."
  author="Alchemmist"
  source="Design principle"
  year="2026"
/>

---
layout: statement
footer: false
pagination: false
---

# Build the argument.

## Let the theme carry the rhythm.
