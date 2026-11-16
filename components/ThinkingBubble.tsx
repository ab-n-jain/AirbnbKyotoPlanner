"use client";

import { useEffect, useState } from "react";

const STEPS = [
  "Finding a stay for 11 – 13 Apr…",
  "Picking one experience…",
  "Tracking down a food spot…",
  "Putting your weekend together…",
];

export default function ThinkingBubble() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 600);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      role="status"
      className="flex w-fit animate-rise items-center gap-3 rounded-3xl rounded-bl-md bg-neutral-100 px-4 py-3"
    >
      <span className="flex gap-1" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-2 animate-dot rounded-full bg-brand"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </span>
      <span className="text-sm text-muted">{STEPS[step]}</span>
    </div>
  );
}
