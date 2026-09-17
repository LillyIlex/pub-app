# pub-app update kit #5

Full `src/` replacement plus `tailwind.config.js`. No new dependencies.
Delete your existing `src/` and `tailwind.config.js`, drop these in, then
`npx expo start -c`.

---

## The card regression — what actually broke

The images vanished because I sized them with a percentage Tailwind class
(`w-2/5 h-full`) on a React Native `Image` sitting inside a fixed-height flex row.
Percentage widths via `className` don't reliably resolve on `Image` in that context —
it collapsed to zero width. Now sized with explicit `style` numbers from
`CARD.imageWidth`, which is also why they're back to a predictable size.

The pills shrinking and the radius change were me over-tuning things that were already
right. Card radius is back to `rounded-2xl`, pills back to `px-2.5 py-1.5` with 13px
icons and 11px text. Card width/height kept as they were, since those were good.

## Search inputs

`Input` lost its `size` variants entirely and went back to normal height with even
`py-2` padding. The left search icon is gone; the **search icon now sits on the right
as the submit button**, on both the landing screen and the results toolbar (the green
arrow is gone).

**The enter key now works.** Two things were wrong: `onSubmitEditing` fired a handler
that bailed out unless a suggestion had been tapped first, and the results toolbar
never passed `onSubmit` at all. Both screens now accept the confirmed selection *or*
raw typed text, so return always does something.

## Distance

Dropdown removed. `DistancePills` is a clickable pill row (1 / 3 / 5 miles), used on
the landing screen (`tone="light"`) and in the drawer (`tone="dark"`). The distance is
still applied to results, but its only visual feedback in the toolbars is the white
pill with the navigate arrow, as you asked.

## Filters drawer

Slides in **from the left**, now `w-11/12` (was `w-4/5`), wrapped in
`SafeAreaView edges={["top","bottom"]}` so nothing sits under the notch or home
indicator, with the scroll area padded top and bottom and the action buttons pinned
below a divider.

The count badge is gone from `FilterButton`, and the active state no longer swaps the
icon — it just changes colour.

## Cards

- Available features on the **top row**, unavailable underneath, as two separate
  wrapped rows.
- Results are **sorted by how many active filters each venue matches**, best first,
  with distance order preserved within ties. `sortByFilterMatch()` lives in
  `constants/search.ts` and is used by both the Results and Map tabs.

## Favourites

- On result and map cards, un-favouriting is now a **straight toggle** — no modal.
- In the **Favourites tab** it still confirms, since removal makes the card disappear.
  Driven by a `confirmRemove` prop threaded `CardList → Card → FavouriteToggle`.
- The "Your favourites" header now uses a heart icon (`ScreenHeader` gained a
  `locationIcon` prop).

## New location flow

`LocationModal` is replaced by `NewLocationModal`, a **two-step bottom sheet**. Step
one confirms where you're searching; "Search new location" swaps the same sheet to a
search field with autocomplete, and searching from there updates results **in place**
rather than navigating anywhere. That's what was broken before — pushing to `/` landed
on the landing screen but the old params were still mounted behind it, so nothing
appeared to happen.

## Other

- `Button`: even `px-5 py-3` with `min-h-[48px]`, `rounded-2xl`.
- Venue detail: `gap-y-7` between sections, `gap-y-3` within them, more bottom padding.
- Removed `Dropdown` (superseded by `DistancePills`) and `LocationModal` (superseded by
  `NewLocationModal`).

---

## Still TODO before API work

1. `src/screens/ListScreen.tsx` — the `setTimeout` mock fetch
2. `src/screens/MapScreen.tsx` — `searchThisArea()`, and geocoding the location chosen
   in `NewLocationModal` to re-centre the map
3. `src/screens/VenueDetailScreen.tsx` — `getVenue()`
4. `src/lib/geocoding.ts` — `fetchLocationSuggestions()` town list and the town-name
   branch of `resolveLocation()`
