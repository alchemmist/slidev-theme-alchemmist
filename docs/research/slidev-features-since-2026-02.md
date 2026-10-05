# Slidev features since February 2026

## Scope

The last pre-refactor theme release was `0.1.22` on 2026-02-27 and declared Slidev `^52`. Slidev `v52.13.0` was released on the same day, so the useful comparison window is `v52.14.0` through `v52.19.1`. The current theme and migrated decks use `v52.19.1`.

## Highest-value additions

### Built-in MCP server (`v52.17.0`)

Slidev now exposes structured tools for reading, editing, inserting, removing and reordering slides and presenter notes. When connected to a running dev server, an agent can also navigate the live deck to a slide and verify edits against hot reload. It is available at `http://localhost:<port>/__mcp` or through `slidev mcp [entry]` over stdio.

This is especially useful for `eosp` and `talks`: an agent can address rendered slide numbers without attempting to parse Markdown separators itself, edit notes separately from content, and drive the browser after a change.

Sources: [official MCP documentation](https://sli.dev/features/mcp), [v52.17.0 release](https://github.com/slidevjs/slidev/releases/tag/v52.17.0).

### Named click-animation presets (`v52.15.0`)

`v-click` gained composable named animations. A deck can set a default such as `clickAnimation: up`, while individual elements can use modifiers such as `v-click.scale`, `v-click.fade.right`, or `v-click.none`. Built-ins include `fade`, `fade-in`, `up`, `down`, `left`, `right`, `scale`, and `none`; themes can add presets through `.slidev-vclick-anim-{name}` CSS.

For this theme, a restrained default preset plus one or two semantic variants would remove repeated animation CSS from lectures while preserving a consistent visual language.

Sources: [official animation guide](https://sli.dev/guide/animations#click-animation-presets), [v52.15.0 release](https://github.com/slidevjs/slidev/releases/tag/v52.15.0).

### Offline/PWA decks (`v52.17.0`, optional dependency since `v52.18.0`)

With `pwa: true` or `pwa: build`, Slidev generates a service worker that precaches emitted HTML, JavaScript, CSS, images, audio, and video. After the first load, the built presentation works without network access. Remote assets still need `remoteAssets` bundling to become available offline. PWA support is opt-in and its implementation dependency is not installed for decks that do not use it.

This is valuable for lectures on unfamiliar machines or unreliable university Wi-Fi. `pwa: build` is the sensible default candidate for deployed lecture decks, after checking the size of bundled media.

Sources: [official PWA documentation](https://sli.dev/features/pwa), [v52.17.0 release](https://github.com/slidevjs/slidev/releases/tag/v52.17.0), [v52.18.0 release](https://github.com/slidevjs/slidev/releases/tag/v52.18.0).

### Laser pointer (`v52.15.0`)

Slidev added a synchronized laser-pointer mode to the presentation UI. This is directly useful during live lectures and screen sharing because emphasis no longer depends on the OS cursor or an external annotation tool.

Source: [v52.15.0 release](https://github.com/slidevjs/slidev/releases/tag/v52.15.0).

### Theme-provided preparser (`v52.16.0`)

A theme can now provide the preparser that transforms raw lines, slide content, frontmatter, or notes before Markdown rendering. Previously a deck had to own `setup/preparser.ts` itself.

This opens a deep theme-level extension point: repeated lecture syntax can become a stable Alchemmist convention instead of copied setup code. Plausible uses include compact exercise markers, standard section metadata, automatic footer rules, or shared note imports. It should be used sparingly because custom syntax can reduce editor interoperability.

Sources: [official preparser documentation](https://sli.dev/custom/config-parser), [v52.16.0 release](https://github.com/slidevjs/slidev/releases/tag/v52.16.0).

## Other useful additions

- **GitHub-style Markdown alerts (`v52.15.0`)**: note, tip, important, warning, and caution blocks can be written with familiar GitHub alert syntax. This can simplify callouts in technical lectures. [Release](https://github.com/slidevjs/slidev/releases/tag/v52.15.0).
- **More reliable slide lifecycle hooks (`v52.15.0`)**: `onSlideEnter` and `onSlideLeave` run after mount and receive the slide index. This is useful for components that start demos, media, or animations only when their slide is actually ready. [Release](https://github.com/slidevjs/slidev/releases/tag/v52.15.0).
- **Better `AutoFitText` (`v52.17.0`)**: it is now powered by Fitty, improving automatic text fitting for dynamic or variable-length content. [Release](https://github.com/slidevjs/slidev/releases/tag/v52.17.0).
- **Current frontmatter in the navigation API (`v52.18.0`)**: theme components can read the current slide's metadata through navigation state instead of reconstructing it indirectly. This is relevant to footer, pagination, and other slide chrome. [Release](https://github.com/slidevjs/slidev/releases/tag/v52.18.0).
- **Per-slide code copy controls (`v52.19.0`)**: `codeCopy` and `magicMoveCopy` can be overridden in slide frontmatter. A lecture can enable copying on exercise/reference slides without showing it everywhere. [Release](https://github.com/slidevjs/slidev/releases/tag/v52.19.0).
- **VS Code overview preview (`v52.16.0`)** and sorted project tree (`v52.18.1`): better navigation across large multi-file courses. [v52.16.0](https://github.com/slidevjs/slidev/releases/tag/v52.16.0), [v52.18.1](https://github.com/slidevjs/slidev/releases/tag/v52.18.1).
- **Resizable presenter panels (`v52.14.0`)**: presenter mode can allocate space between the current slide, next slide, and notes to fit the situation. [Release](https://github.com/slidevjs/slidev/releases/tag/v52.14.0).
- **Pluggable Mermaid renderer (`v52.14.1`)**: Mermaid rendering can be customized at the renderer boundary. Standard Mermaid code blocks remain supported as documented. [Release](https://github.com/slidevjs/slidev/releases/tag/v52.14.1), [official Mermaid documentation](https://sli.dev/features/mermaid).
- **Router modes (`v52.15.0`, `v52.17.0`)**: builds gained `--router-mode`, followed by a memory-router mode. These matter mainly for embedding a deck in a host application, not for ordinary GitHub Pages lectures. [v52.15.0](https://github.com/slidevjs/slidev/releases/tag/v52.15.0), [v52.17.0](https://github.com/slidevjs/slidev/releases/tag/v52.17.0).

## Important reliability improvements

These are not headline features, but they matter for the repositories in question:

- image preloading was repaired, gained retry behavior, and now exposes progress/completion state (`v52.17.0`);
- paths remain relative to the router base, and monorepo subdirectory deployments use `BASE_URL` correctly (`v52.16.0`–`v52.17.0`);
- public-directory assets are exempt from the slide import guard (`v52.18.0`);
- export uses slide-local navigation state (`v52.18.1`);
- Monaco respects line-number configuration and line options (`v52.18.1`);
- Shiki Magic Move moved to `@shikijs/magic-move`, and imported snippets inside Magic Move blocks were fixed (`v52.16.0`).

Sources: [v52.16.0](https://github.com/slidevjs/slidev/releases/tag/v52.16.0), [v52.17.0](https://github.com/slidevjs/slidev/releases/tag/v52.17.0), [v52.18.0](https://github.com/slidevjs/slidev/releases/tag/v52.18.0), [v52.18.1](https://github.com/slidevjs/slidev/releases/tag/v52.18.1).

## Recommended adoption order

1. Connect the built-in MCP server to the local Slidev dev workflow.
2. Add a restrained theme-level click-animation preset and demonstrate opt-out/composition in the demo.
3. Trial `pwa: build` on one lecture and inspect the generated cache size and remote-asset behavior.
4. Document the laser pointer and presenter resizing for speakers.
5. Design a theme preparser only after identifying repeated syntax in multiple `eosp` and `talks` decks.
