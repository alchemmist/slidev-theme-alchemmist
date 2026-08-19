# Changelog

## 0.3.1

- Reworked the visual system with presentation-scale typography, distinct layout compositions and stronger component hierarchy.
- Fixed nested Slidev layout nodes that pushed media and iframe panels outside the active slide.
- Restored `imageWidth`, `background-position` and `shadow` compatibility for image layouts.
- Rebuilt the demo and added geometry, screenshot and accessibility regression coverage.
- Verified production builds against the EOSP and Talks decks.

## 0.3.0

- Rebuilt the layout system around shared frames, semantic tokens and responsive spacing.
- Added centralized, configurable pagination and footer chrome.
- Added `Callout`, `SectionMarker` and accessible media behavior.
- Added light, dark, reduced-motion and print styling.
- Preserved `MarkerX`, `GitHubAlert` and disabled-page configuration as compatibility adapters.
- Reduced the published font payload and added package, type, unit, build and format gates.
