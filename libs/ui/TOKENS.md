# UI Token Contract (Web + Mobile)

This document fixes the shared token contract used by `@libs/ui-web` and `@libs/ui-mobile`.

## Source of truth

- Shared token source: `libs/ui/tailwind/base.js`
- Web preset: `libs/ui/tailwind/web.preset.js`
- Mobile preset: `libs/ui/tailwind/mobile.preset.js`

`mobile.preset.js` keeps only Nativewind-safe pieces and intentionally excludes web-only utilities.

## Color tokens

Use the same semantic names across web and mobile.

- `normal`
- `backdrop`
- `label.normal`, `label.assertive`, `label.placeholder`, `label.disabled`
- `background.strong`, `background.disabled`
- `line.normal`
- `primary.transparent`, `primary.normal`, `primary.strong`, `primary.deg`
- `secondary.transparent`, `secondary.normal`, `secondary.strong`, `secondary.deg`
- `status.positive`, `status.cautionary`, `status.negative`

Dark mode tokens follow the same keys under `dark.*`:

- `dark.normal`, `dark.backdrop`
- `dark.label.*`
- `dark.background.*`
- `dark.line.*`
- `dark.primary.*`
- `dark.secondary.*`
- `dark.status.*`

## Typography tokens

Use these keys consistently in both platforms:

- `text-28/title`
- `text-24/heading`
- `text-20/heading`
- `text-18/heading`
- `text-16/button`
- `text-14/button`
- `text-16/body/emp`
- `text-16/body`
- `text-14/body/emp`
- `text-14/body`
- `text-12/body`

Font family contract:

- `font-sans` = `Aspekta` (mobile app must load physical font assets via Expo Font)

## Spacing tokens

Spacing uses Tailwind default spacing scale (`0`, `0.5`, `1`, `1.5`, ..., `96`) as the shared contract.
Custom spacing tokens should be added to `libs/ui/tailwind/base.js` only when both web and mobile need them.

## Platform notes

- Web-only tokens/utilities (for example `screens`, `after:*` safelist, complex CSS shadow/animation plugins) are intentionally excluded from `libs/ui/tailwind/mobile.preset.js`.
- Mobile dark mode strategy is system-first (`darkMode: "media"`).
