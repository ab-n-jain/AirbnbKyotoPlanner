import { checkCardSpecs } from "../lib/cardSpec.ts";
import { buildPlan, STAY_DATES } from "../lib/planner.ts";

let failed = false;

for (const r of checkCardSpecs()) {
  console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.pair}: differs on ${r.differsOn.join(", ") || "nothing"}`);
  if (!r.ok) failed = true;
}

const requests = [
  "A calm weekend for two with tea and temples",
  "cheap solo trip, ramen please, 20-22 May",
  "luxury anniversary with an onsen from 1 to 5 June",
  "",
];
for (const request of requests) {
  const { stay } = buildPlan(request);
  const ok = STAY_DATES === "11 – 13 Apr" && stay.dates === STAY_DATES && stay.nights === 2;
  console.log(`${ok ? "PASS" : "FAIL"}  stay dates "${stay.dates}" for request "${request}"`);
  if (!ok) failed = true;
}

process.exit(failed ? 1 : 0);
