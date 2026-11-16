import CardArt from "@/components/CardArt";
import type { FoodSpot } from "@/lib/types";

/** Food card. Round image on the right, the signature dish is the biggest text, amber accent. */
export default function FoodCard({ food }: { food: FoodSpot }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-amber-200 bg-amber-50 shadow-sm">
      <div className="flex items-center gap-4 p-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
            Food spot · {food.area}
          </p>
          <h3 className="mt-1 font-serif text-3xl font-semibold leading-none">{food.dish}</h3>
          <p className="mt-2 text-sm font-medium">at {food.place}</p>
          <div className="mt-2 flex flex-wrap gap-1.5 text-xs font-medium">
            <span className="rounded-full bg-amber-500 px-2.5 py-1 text-white">{food.priceBand}</span>
            <span className="rounded-full border border-amber-300 bg-white px-2.5 py-1">{food.cuisine}</span>
            <span className="rounded-full border border-amber-300 bg-white px-2.5 py-1">{food.walkFromStay}</span>
          </div>
        </div>
        <CardArt
          name={food.art}
          className="size-24 shrink-0 rounded-full ring-4 ring-amber-400 sm:size-28"
        />
      </div>
      <p className="border-t border-dashed border-amber-300 px-4 py-2.5 text-sm text-amber-900">
        <span className="font-semibold">Tip:</span> {food.tip}
      </p>
    </article>
  );
}
