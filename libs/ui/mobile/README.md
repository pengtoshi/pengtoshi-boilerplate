# ui-mobile

React Native UI components for Expo clients.

## Tailwind / Nativewind setup

`ui-mobile` owns its own Tailwind config and consumes shared mobile preset.

- `libs/ui/mobile/tailwind.config.js`
- `libs/ui/tailwind/mobile.preset.js`

`apps/client-expo/tailwind.config.js` should import the mobile preset:

```js
presets: [require("nativewind/preset"), require("../../libs/ui/tailwind/mobile.preset")];
```

This keeps dependency direction one-way (`app -> ui`) and avoids circular references.

## Dark mode strategy

Mobile uses system appearance by default (`darkMode: "media"`), which is the standard approach in React Native apps.

- Use `useSystemColorScheme` from `@libs/ui-mobile` when the app needs to branch UI logic.
- `dark:*` classes follow device appearance automatically.

## Font strategy (Aspekta)

`ui-mobile` uses `Aspekta` as the default `font-sans`.

- UI components apply `font-sans` as default text family.
- The app must load actual Aspekta font assets via Expo Font.
- Use `useUIMobileFonts` from `@libs/ui-mobile` for app-level font loading.

## Quality targets

- `yarn nx lint ui-mobile`
- `yarn nx test ui-mobile`
- `yarn nx build ui-mobile`

## Storybook

- Web UI Storybook: `yarn storybook` (`ui-web`)
- Mobile UI Storybook: `yarn storybook:mobile` (`client-expo`)
