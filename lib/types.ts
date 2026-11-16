export type Stay = {
  type: "stay";
  name: string;
  kind: string;
  area: string;
  dates: string;
  nights: number;
  pricePerNight: number;
  total: number;
  rating: number;
  reviews: number;
  guestFavorite: boolean;
  perks: string[];
  art: "machiya" | "studio" | "ryokan";
};

export type Experience = {
  type: "experience";
  name: string;
  startTime: string;
  day: string;
  duration: string;
  area: string;
  host: string;
  pricePerGuest: number;
  rating: number;
  reviews: number;
  art: "tea" | "bamboo" | "torii";
};

export type FoodSpot = {
  type: "food";
  dish: string;
  place: string;
  area: string;
  priceBand: "$" | "$$" | "$$$";
  cuisine: string;
  walkFromStay: string;
  tip: string;
  art: "yakitori" | "ramen" | "tofu";
};

export type TripPlan = {
  intro: string;
  stay: Stay;
  experience: Experience;
  food: FoodSpot;
};

export function isTripPlan(value: unknown): value is TripPlan {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  const is = (o: unknown, type: string, key: string) =>
    !!o &&
    typeof o === "object" &&
    (o as Record<string, unknown>).type === type &&
    typeof (o as Record<string, unknown>)[key] === "string";
  return (
    typeof v.intro === "string" &&
    is(v.stay, "stay", "name") &&
    is(v.experience, "experience", "name") &&
    is(v.food, "food", "dish")
  );
}
