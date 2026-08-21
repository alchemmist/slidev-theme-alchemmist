# Changelog

## Unreleased

- Hid footer and pagination automatically on `image-left` and `image-right` layouts.
- Added default rounded inner corners and inward-facing shadows to split-image layouts.

## 0.3.2

- Fixed duplicated deployment base paths in `Image` component URLs.
- Added regression coverage for idempotent asset URL resolution.
- Verified the fix against EOSP slides deployed below nested base paths.

## 0.3.1

- Restored the original 0.1 visual design and layout geometry.
- Kept the 0.3 configuration, asset resolution and component APIs without changing existing deck rendering.
- Preserved legacy layout markup, footer behavior, pagination spacing and component dimensions.
- Added screenshot regression coverage for the original intro and center layouts.
- Verified all 32 EOSP slides and all 7 Talks slides against pre-refactor screenshots.

## 0.3.0

- Rebuilt the layout system around shared frames, semantic tokens and responsive spacing.
- Added centralized, configurable pagination and footer chrome.
- Added `Callout`, `SectionMarker` and accessible media behavior.
- Added light, dark, reduced-motion and print styling.
- Preserved `MarkerX`, `GitHubAlert` and disabled-page configuration as compatibility adapters.
- Reduced the published font payload and added package, type, unit, build and format gates.

The visual changes in this release were reverted in 0.3.1.
