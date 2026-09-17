# pub-app — full src/ replacement

This is the complete, current `src/app/` (and everything it depends on) as one consistent
package — safe to use as a wholesale replacement rather than another diff.

## What to do with it

1. **Delete your existing `src/` folder entirely**, and delete `tailwind.config.js`,
   `babel.config.js`, `metro.config.js`, `nativewind-env.d.ts` at your project root.
2. Copy everything from this kit into your project root — `src/` becomes your new `src/`,
   and `tailwind.config.js` / `babel.config.js` / `metro.config.js` /
   `nativewind-env.d.ts` / `scripts/create-component.js` land back at the root.
3. Leave `package.json`, `app.json`, `tsconfig.json`, and `node_modules` alone — none of
   those changed, and this kit assumes the packages from the earlier setup steps
   (`nativewind`, `react-native-maps`, `expo-location`, `@react-native-async-storage/async-storage`,
   `@expo-google-fonts/poppins`, etc.) are already installed.
4. `npx expo start -c` to clear the Metro cache and reload.

## `src/app/` route map

```
src/app/
├── _layout.tsx              Root Stack: index → (tabs) → venue/[id] (modal) → +not-found
├── index.tsx                 Landing search screen (full bleed, NOT a tab)
├── +not-found.tsx             Fallback for unmatched routes
├── (tabs)/
│   ├── _layout.tsx            Tab bar: Results / Map / Favourites
│   ├── index.tsx               Results tab → screens/ListScreen
│   ├── map.tsx                 Map tab → screens/MapScreen
│   └── favourites.tsx          Favourites tab → screens/FavouritesScreen
└── venue/
    └── [id].tsx                Venue detail, presented as a modal → screens/VenueDetailScreen
```

Every route file is a thin wrapper — the actual screen content lives in `src/screens/`,
which keeps `app/` purely about routing.

## Everything else in this kit

- `src/screens/` — LandingSearchScreen, ListScreen, MapScreen, FavouritesScreen,
  VenueDetailScreen, LoadingScreen (app boot), ErrorScreen, NoMatchesScreen
- `src/components/base/` — the small reusable primitives (Title, Button, Input, Pill, etc.)
- `src/components/group/` — Card, CurrentLocation
- `src/components/blocks/` — CardList, FiltersList, Header (unused by any route right now,
  kept for reuse), LocationModal, VenueDetailBlock
- `src/constants/search.ts` — distance options (in miles) and the feature filter list
- `src/data/mockVenues.ts` — placeholder pub data until the real API is wired in
- `src/lib/geocoding.ts` — postcode/town resolution + autocomplete stub
- `scripts/create-component.js` — `npm run gen:component <Name> [base|group|blocks]`

## Known TODOs (search for `TODO` in the code)

- `ListScreen.tsx` — swap the mock `setTimeout` for a real search API call
- `src/lib/geocoding.ts` — swap the placeholder town list for a real places/geocoding API
