# Kyoto weekend planner (prototype)

A chat prototype: the guest types one Kyoto trip request, a thinking animation plays, and three cards come back — one stay, one experience, one food spot. No login. Works on phone and laptop.

Listings are sample data and the illustrations stand in for photos. Planning is a mock API route (`app/api/plan`) that picks from a small set by keywords in the request.

## Run

```bash
npm install
npm run dev
```

## The three cards

| Card | Image box spot | Biggest text | Accent color |
| --- | --- | --- | --- |
| Stay | Top, full width | Stay name | Rose |
| Experience | Left side | Start time | Teal |
| Food spot | Right side, round | Signature dish | Amber |

Every pair differs on all three choices (the rule is at least two). Stay dates are fixed at 11 – 13 Apr whatever the guest types. Both rules live in `lib/cardSpec.ts` and `lib/planner.ts` and are checked by:

```bash
npm run check
```

Each card is its own component (`components/cards/`) because each has its own layout, so one can be redesigned or swapped without touching the other two.

## Failure and recovery

Turn on **Force failure** in the header, then send a request. That request fails once and shows the error bubble; **Try again** re-sends the same request and brings all three cards back. Real failures (network, timeout, bad response) land in the same bubble. A turn always shows the thinking animation, the cards or the error bubble — never nothing.

## Deploy

Import this repository at vercel.com/new. Next.js is detected automatically; no environment variables are needed.
