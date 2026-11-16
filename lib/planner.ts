import type { Experience, FoodSpot, Stay, TripPlan } from "./types.ts";

/** The stay dates are fixed for this prototype, whatever the guest types. */
export const STAY_DATES = "11 – 13 Apr";
export const STAY_NIGHTS = 2;

type Tagged<T> = T & { tags: string[] };

const stay = (s: Omit<Stay, "dates" | "nights" | "total">): Stay => ({
  ...s,
  dates: STAY_DATES,
  nights: STAY_NIGHTS,
  total: s.pricePerNight * STAY_NIGHTS,
});

// Sample data for the prototype: places are illustrative, not real listings.
const STAYS: Tagged<Stay>[] = [
  {
    ...stay({
      name: "Machiya townhouse by Gion",
      kind: "Entire home",
      area: "Higashiyama",
      pricePerNight: 182,
      rating: 4.94,
      reviews: 212,
      guestFavorite: true,
      perks: ["2 beds", "Tatami room", "Garden courtyard"],
      art: "machiya",
    }),
    tags: ["traditional", "gion", "temple", "tea", "culture", "couple", "romantic"],
  },
  {
    ...stay({
      name: "Bright studio near Kyoto Station",
      kind: "Entire rental unit",
      area: "Shimogyo",
      pricePerNight: 96,
      rating: 4.86,
      reviews: 148,
      guestFavorite: false,
      perks: ["1 bed", "Self check-in", "5 min to trains"],
      art: "studio",
    }),
    tags: ["budget", "cheap", "affordable", "solo", "station", "ramen", "student"],
  },
  {
    ...stay({
      name: "Riverside ryokan suite, Arashiyama",
      kind: "Room in ryokan",
      area: "Arashiyama",
      pricePerNight: 340,
      rating: 4.97,
      reviews: 89,
      guestFavorite: true,
      perks: ["Private onsen bath", "River view", "Breakfast"],
      art: "ryokan",
    }),
    tags: ["luxury", "onsen", "splurge", "anniversary", "honeymoon", "bamboo", "nature", "quiet", "ryokan"],
  },
];

const EXPERIENCES: Tagged<Experience>[] = [
  {
    name: "Tea ceremony in a 100-year-old teahouse",
    startTime: "9:30 AM",
    day: "12 Apr",
    duration: "90 min",
    area: "Higashiyama",
    host: "Yuki",
    pricePerGuest: 48,
    rating: 4.96,
    reviews: 534,
    art: "tea",
    tags: ["tea", "culture", "traditional", "matcha", "calm", "romantic", "couple"],
  },
  {
    name: "Sunrise walk through the bamboo grove",
    startTime: "6:30 AM",
    day: "12 Apr",
    duration: "2 hrs",
    area: "Arashiyama",
    host: "Kenji",
    pricePerGuest: 35,
    rating: 4.91,
    reviews: 318,
    art: "bamboo",
    tags: ["bamboo", "nature", "walk", "photo", "photography", "quiet", "outdoor", "budget", "cheap"],
  },
  {
    name: "Lantern-lit night hike at Fushimi Inari",
    startTime: "6:00 PM",
    day: "12 Apr",
    duration: "2.5 hrs",
    area: "Fushimi",
    host: "Aiko",
    pricePerGuest: 42,
    rating: 4.93,
    reviews: 276,
    art: "torii",
    tags: ["shrine", "temple", "hike", "night", "torii", "adventure", "friends", "solo"],
  },
];

const FOOD: Tagged<FoodSpot>[] = [
  {
    dish: "Charcoal yakitori",
    place: "Pontocho Alley Grill",
    area: "Pontocho",
    priceBand: "$$",
    cuisine: "Izakaya",
    walkFromStay: "12 min walk",
    tip: "Go before 6 PM, counter seats fill fast.",
    art: "yakitori",
    tags: ["dinner", "izakaya", "friends", "night", "sake", "grill", "couple"],
  },
  {
    dish: "Shoyu ramen",
    place: "Nishiki Noodle Bar",
    area: "Nishiki Market",
    priceBand: "$",
    cuisine: "Ramen",
    walkFromStay: "8 min walk",
    tip: "Order the soft egg, it sells out by 1 PM.",
    art: "ramen",
    tags: ["ramen", "noodle", "noodles", "budget", "cheap", "lunch", "solo", "market", "affordable"],
  },
  {
    dish: "Tofu kaiseki lunch",
    place: "Sagano Garden Table",
    area: "Arashiyama",
    priceBand: "$$$",
    cuisine: "Kaiseki",
    walkFromStay: "15 min walk",
    tip: "Ask for the garden-side room when you book.",
    art: "tofu",
    tags: ["vegetarian", "vegan", "tofu", "kaiseki", "luxury", "splurge", "quiet", "onsen", "anniversary", "ryokan"],
  },
];

function pick<T>(items: Tagged<T>[], words: Set<string>): T {
  let best = items[0];
  let bestScore = 0;
  for (const item of items) {
    const score = item.tags.filter((t) => words.has(t)).length;
    if (score > bestScore) {
      best = item;
      bestScore = score;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { tags, ...rest } = best;
  return rest as T;
}

export function buildPlan(request: string): TripPlan {
  const words = new Set(request.toLowerCase().match(/[a-z]+/g) ?? []);
  const stayPick = pick(STAYS, words);
  const experience = pick(EXPERIENCES, words);
  const food = pick(FOOD, words);
  return {
    intro: `Here's your Kyoto weekend for ${STAY_DATES}: a stay in ${stayPick.area}, one thing to do and one place to eat.`,
    stay: stayPick,
    experience,
    food,
  };
}
