import type { Experience, FoodSpot, Stay, TripPlan } from "./types.ts";

/** The stay dates are fixed for this prototype, whatever the guest types. */
export const STAY_DATES = "11 – 13 Apr";
export const STAY_NIGHTS = 2;

// One row per sheet of the Kyoto Weekend Workbook (docs/Kyoto Weekend Workbook.xlsx):
// row 2 of the Stay, Experience and Food sheets. The worksheet holds fake data.
const STAY_PRICE_PER_NIGHT = 148;

const STAY: Stay = {
  type: "stay",
  name: "Lantern loft above Sanjo Arcade",
  kind: "Entire loft",
  area: "Nakagyo",
  pricePerNight: STAY_PRICE_PER_NIGHT,
  rating: 4.89,
  reviews: 176,
  guestFavorite: true,
  perks: ["1 bed", "Cedar soaking tub", "Rooftop terrace"],
  art: "machiya",
  dates: STAY_DATES,
  nights: STAY_NIGHTS,
  total: STAY_PRICE_PER_NIGHT * STAY_NIGHTS,
};

const EXPERIENCE: Experience = {
  type: "experience",
  name: "Indigo dyeing in a family workshop",
  startTime: "2:00 PM",
  day: "12 Apr",
  duration: "2 hrs",
  area: "Nishijin",
  host: "Haruka",
  pricePerGuest: 54,
  rating: 4.95,
  reviews: 203,
  art: "tea",
};

const FOOD: FoodSpot = {
  type: "food",
  dish: "Duck soba",
  place: "Kamo Riverside Soba",
  area: "Demachiyanagi",
  priceBand: "$$",
  cuisine: "Soba",
  walkFromStay: "14 min walk",
  tip: "Ask for the hot broth on the side.",
  art: "ramen",
};

/** Every request gets the same three rows; the message is not used to choose them. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function buildPlan(_request: string): TripPlan {
  return {
    intro: `Here's your Kyoto weekend for ${STAY_DATES}: a stay in ${STAY.area}, one thing to do and one place to eat.`,
    stay: { ...STAY, perks: [...STAY.perks] },
    experience: { ...EXPERIENCE },
    food: { ...FOOD },
  };
}
