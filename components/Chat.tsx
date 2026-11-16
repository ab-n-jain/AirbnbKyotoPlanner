"use client";

import { useEffect, useRef, useState } from "react";
import ErrorBubble from "@/components/ErrorBubble";
import ThinkingBubble from "@/components/ThinkingBubble";
import ExperienceCard from "@/components/cards/ExperienceCard";
import FoodCard from "@/components/cards/FoodCard";
import StayCard from "@/components/cards/StayCard";
import { isTripPlan, type TripPlan } from "@/lib/types";

type Turn = {
  id: number;
  request: string;
  status: "thinking" | "done" | "error";
  plan?: TripPlan;
};

const SUGGESTIONS = [
  "A calm weekend for two with tea and temples",
  "Budget solo trip, I want great ramen",
  "Anniversary splurge with an onsen",
];

const REQUEST_TIMEOUT_MS = 12000;

async function fetchPlan(message: string, forceFail: boolean): Promise<TripPlan> {
  const response = await fetch("/api/plan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, forceFail }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`Plan request failed: ${response.status}`);
  const data: unknown = await response.json();
  if (!isTripPlan(data)) throw new Error("Plan response was incomplete");
  return data;
}

export default function Chat() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [failNext, setFailNext] = useState(false);
  const nextId = useRef(1);
  const endRef = useRef<HTMLDivElement>(null);

  const busy = turns.some((t) => t.status === "thinking");

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [turns]);

  // Every turn always ends as cards or an error bubble, never as nothing.
  async function run(id: number, request: string, forceFail: boolean) {
    try {
      const plan = await fetchPlan(request, forceFail);
      setTurns((all) => all.map((t) => (t.id === id ? { ...t, status: "done", plan } : t)));
    } catch {
      setTurns((all) => all.map((t) => (t.id === id ? { ...t, status: "error" } : t)));
    }
  }

  function send(text: string) {
    const request = text.trim();
    if (!request || busy) return;
    const id = nextId.current++;
    setTurns((all) => [...all, { id, request, status: "thinking" }]);
    setDraft("");
    // The forced failure fires once, so "Try again" recovers.
    setFailNext(false);
    void run(id, request, failNext);
  }

  function retry(turn: Turn) {
    if (busy) return;
    setTurns((all) => all.map((t) => (t.id === turn.id ? { ...t, status: "thinking" } : t)));
    void run(turn.id, turn.request, false);
  }

  return (
    <div className="mx-auto flex h-dvh w-full max-w-3xl flex-col">
      <header className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-full bg-brand text-base text-white" aria-hidden="true">
            ⛩
          </span>
          <div>
            <h1 className="text-base font-semibold leading-tight">Kyoto weekend planner</h1>
            <p className="text-xs text-muted">Prototype · sample listings</p>
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-2 rounded-full border border-hairline py-1.5 pl-3 pr-1.5 text-xs font-medium">
          <span>
            Force failure<span className="sr-only"> on the next request</span>
          </span>
          <input
            type="checkbox"
            role="switch"
            checked={failNext}
            onChange={(e) => setFailNext(e.target.checked)}
            className="peer sr-only"
          />
          <span className="relative h-6 w-10 rounded-full bg-neutral-300 transition peer-checked:bg-brand peer-focus-visible:ring-2 peer-focus-visible:ring-ink peer-focus-visible:ring-offset-2 after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:shadow after:transition peer-checked:after:translate-x-4" />
        </label>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-5" aria-live="polite">
        <div className="flex flex-col gap-4">
          <div className="w-fit max-w-[85%] rounded-3xl rounded-bl-md bg-neutral-100 px-4 py-3">
            <p className="font-semibold">Planning a weekend in Kyoto?</p>
            <p className="mt-0.5 text-sm text-muted">
              Tell me what you&apos;re after in one message. I&apos;ll come back with a stay, an experience
              and a food spot for 11 – 13 Apr.
            </p>
          </div>

          {turns.length === 0 && (
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-hairline px-4 py-2 text-left text-sm font-medium transition hover:border-ink active:scale-[0.98]"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {turns.map((turn) => (
            <div key={turn.id} className="flex flex-col gap-4">
              <p className="ml-auto w-fit max-w-[85%] animate-rise rounded-3xl rounded-br-md bg-ink px-4 py-3 text-white">
                {turn.request}
              </p>

              {turn.status === "thinking" && <ThinkingBubble />}
              {turn.status === "error" && <ErrorBubble onRetry={() => retry(turn)} />}
              {turn.status === "done" && turn.plan && (
                <div className="flex animate-rise flex-col gap-3">
                  <p className="w-fit max-w-[85%] rounded-3xl rounded-bl-md bg-neutral-100 px-4 py-3 text-sm">
                    {turn.plan.intro}
                  </p>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="md:row-span-2">
                      <StayCard stay={turn.plan.stay} />
                    </div>
                    <ExperienceCard experience={turn.plan.experience} />
                    <FoodCard food={turn.plan.food} />
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={endRef} />
        </div>
      </main>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(draft);
        }}
        className="border-t border-hairline px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      >
        {failNext && (
          <p className="mb-2 text-xs font-medium text-brand">
            Demo: the next request will fail once so you can see the recovery.
          </p>
        )}
        <div className="flex items-center gap-2 rounded-full border border-hairline py-1.5 pl-5 pr-1.5 shadow-sm focus-within:border-ink">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={busy ? "Planning your weekend…" : "Describe your Kyoto weekend"}
            aria-label="Describe your Kyoto weekend"
            maxLength={500}
            enterKeyHint="send"
            className="min-w-0 flex-1 bg-transparent py-2 text-base outline-none placeholder:text-muted"
          />
          <button
            type="submit"
            disabled={busy || !draft.trim()}
            aria-label="Send"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-brand text-white transition active:scale-90 disabled:bg-neutral-300"
          >
            <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="2.5" aria-hidden="true">
              <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
