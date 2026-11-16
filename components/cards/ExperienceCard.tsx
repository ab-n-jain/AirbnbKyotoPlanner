import CardArt from "@/components/CardArt";
import type { Experience } from "@/lib/types";

/** Experience card. Image on the left, the start time is the biggest text, teal accent. */
export default function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <article className="flex overflow-hidden rounded-2xl border border-hairline bg-white shadow-sm">
      <CardArt name={experience.art} className="w-28 shrink-0 self-stretch sm:w-36" />

      <div className="flex min-w-0 flex-1 flex-col gap-1 border-l-4 border-teal-600 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
          Experience · {experience.day}
        </p>
        <p className="text-3xl font-bold leading-none tracking-tight text-teal-700">
          {experience.startTime}
        </p>
        <h3 className="text-base font-semibold leading-snug">{experience.name}</h3>
        <p className="text-sm text-muted">
          {experience.duration} · {experience.area} · Hosted by {experience.host}
        </p>
        <p className="mt-1 text-sm">
          <span className="font-semibold">From ${experience.pricePerGuest}</span>
          <span className="text-muted"> / guest · </span>
          <span className="text-teal-600">★</span> {experience.rating.toFixed(2)}{" "}
          <span className="text-muted">({experience.reviews})</span>
        </p>
      </div>
    </article>
  );
}
