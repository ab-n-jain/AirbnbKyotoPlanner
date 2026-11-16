/**
 * The three design choices that make each card recognisable at a glance.
 * Rule: every pair of cards must differ on at least two of the three.
 * `npm run check` enforces it.
 */
export type CardSpec = {
  card: "stay" | "experience" | "food";
  imageSpot: "top" | "left" | "right";
  biggestText: string;
  accent: "rose" | "teal" | "amber";
};

export const CARD_SPECS: CardSpec[] = [
  { card: "stay", imageSpot: "top", biggestText: "stay name", accent: "rose" },
  { card: "experience", imageSpot: "left", biggestText: "start time", accent: "teal" },
  { card: "food", imageSpot: "right", biggestText: "signature dish", accent: "amber" },
];

const CHOICES = ["imageSpot", "biggestText", "accent"] as const;

export function checkCardSpecs(specs: CardSpec[] = CARD_SPECS) {
  const results: { pair: string; differsOn: string[]; ok: boolean }[] = [];
  for (let i = 0; i < specs.length; i++) {
    for (let j = i + 1; j < specs.length; j++) {
      const differsOn = CHOICES.filter((c) => specs[i][c] !== specs[j][c]);
      results.push({
        pair: `${specs[i].card} vs ${specs[j].card}`,
        differsOn,
        ok: differsOn.length >= 2,
      });
    }
  }
  return results;
}
