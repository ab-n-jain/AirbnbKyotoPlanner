"use client";

import { useState } from "react";
import CardArt from "@/components/CardArt";
import type { Stay } from "@/lib/types";

/** Stay card. Image on top, the stay name is the biggest text, rose accent. */
export default function StayCard({ stay }: { stay: Stay }) {
  const [saved, setSaved] = useState(false);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white shadow-sm">
      <div className="relative">
        <CardArt name={stay.art} className="aspect-[4/3] w-full md:aspect-[16/11]" />
        {stay.guestFavorite && (
          <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold shadow">
            Guest favorite
          </span>
        )}
        <button
          type="button"
          onClick={() => setSaved((s) => !s)}
          aria-pressed={saved}
          aria-label={saved ? "Remove stay from saved" : "Save stay"}
          className="absolute right-2 top-2 grid size-10 place-items-center rounded-full bg-white/90 shadow transition active:scale-90"
        >
          <svg viewBox="0 0 24 24" className={`size-5 ${saved ? "fill-rose-500 stroke-rose-500" : "fill-black/10 stroke-ink"}`} strokeWidth="2">
            <path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2Z" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-rose-600">Stay · {stay.area}</p>
        <h3 className="text-2xl font-semibold leading-tight">{stay.name}</h3>
        <p className="text-sm text-muted">
          {stay.kind} · {stay.perks.join(" · ")}
        </p>

        <p className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-rose-50 px-3 py-1.5 text-sm font-semibold text-rose-700">
          <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current" strokeWidth="2" aria-hidden="true">
            <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
            <path d="M3.5 10h17M8 3v4M16 3v4" strokeLinecap="round" />
          </svg>
          {stay.dates} · {stay.nights} nights
        </p>

        <div className="mt-auto flex items-end justify-between border-t border-hairline pt-3 text-sm">
          <p>
            <span className="font-semibold">${stay.pricePerNight}</span> night
            <span className="text-muted"> · ${stay.total} total</span>
          </p>
          <p className="font-medium">
            <span className="text-rose-500">★</span> {stay.rating.toFixed(2)}{" "}
            <span className="font-normal text-muted">({stay.reviews})</span>
          </p>
        </div>
      </div>
    </article>
  );
}
