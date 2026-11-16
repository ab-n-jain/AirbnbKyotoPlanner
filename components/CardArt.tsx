import type { Experience, FoodSpot, Stay } from "@/lib/types";

type ArtName = Stay["art"] | Experience["art"] | FoodSpot["art"];

/** Illustrated stand-ins for listing photos, so the prototype needs no image hosting. */
export default function CardArt({ name, className = "" }: { name: ArtName; className?: string }) {
  return (
    <svg
      viewBox="0 0 200 150"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label={LABELS[name]}
    >
      {ART[name]}
    </svg>
  );
}

const LABELS: Record<ArtName, string> = {
  machiya: "Illustration of a wooden townhouse at dusk",
  studio: "Illustration of a bright city studio",
  ryokan: "Illustration of a riverside inn below the hills",
  tea: "Illustration of a bowl of matcha and a whisk",
  bamboo: "Illustration of a bamboo grove",
  torii: "Illustration of red shrine gates at night",
  yakitori: "Illustration of grilled skewers",
  ramen: "Illustration of a bowl of ramen",
  tofu: "Illustration of a small-plates lunch tray",
};

const ART: Record<ArtName, React.ReactNode> = {
  machiya: (
    <>
      <rect width="200" height="150" fill="#fde2d8" />
      <circle cx="150" cy="42" r="20" fill="#ffb199" />
      <path d="M0 96 Q50 70 100 92 T200 84 V150 H0Z" fill="#f4b8a8" />
      <path d="M40 80 L100 52 L160 80Z" fill="#3f3a3a" />
      <rect x="50" y="80" width="100" height="50" fill="#7a4b3a" />
      <rect x="62" y="92" width="22" height="38" fill="#ffe7a8" />
      <rect x="92" y="92" width="22" height="38" fill="#ffe7a8" />
      <rect x="122" y="92" width="18" height="38" fill="#5d3628" />
      <path d="M62 105h52M73 92v38M103 92v38" stroke="#7a4b3a" strokeWidth="2" />
      <rect y="130" width="200" height="20" fill="#5a4a48" />
      <circle cx="26" cy="100" r="16" fill="#f58fa8" />
      <rect x="24" y="110" width="4" height="22" fill="#5d3628" />
    </>
  ),
  studio: (
    <>
      <rect width="200" height="150" fill="#dbeafe" />
      <rect x="20" y="40" width="34" height="110" fill="#93b4e6" />
      <rect x="60" y="20" width="44" height="130" fill="#6f95d6" />
      <rect x="110" y="55" width="36" height="95" fill="#93b4e6" />
      <rect x="152" y="32" width="30" height="118" fill="#6f95d6" />
      <g fill="#fff7d6">
        <rect x="68" y="32" width="10" height="12" /><rect x="86" y="32" width="10" height="12" />
        <rect x="68" y="54" width="10" height="12" /><rect x="86" y="54" width="10" height="12" />
        <rect x="68" y="76" width="10" height="12" /><rect x="86" y="76" width="10" height="12" />
        <rect x="27" y="52" width="8" height="10" /><rect x="40" y="72" width="8" height="10" />
        <rect x="118" y="66" width="8" height="10" /><rect x="132" y="88" width="8" height="10" />
        <rect x="160" y="44" width="8" height="10" /><rect x="160" y="68" width="8" height="10" />
      </g>
      <circle cx="128" cy="22" r="9" fill="#fff" />
    </>
  ),
  ryokan: (
    <>
      <rect width="200" height="150" fill="#ffe4e6" />
      <path d="M0 80 L45 38 L85 72 L130 30 L200 82 V150 H0Z" fill="#9fb8a5" />
      <path d="M0 100 L60 66 L120 100 L170 76 L200 96 V150 H0Z" fill="#6f9479" />
      <path d="M62 92 L104 72 L146 92Z" fill="#3f3a3a" />
      <rect x="70" y="92" width="68" height="26" fill="#f6e3c5" />
      <path d="M82 92v26M104 92v26M126 92v26" stroke="#b08a5a" strokeWidth="2" />
      <rect y="118" width="200" height="32" fill="#7fb7d9" />
      <path d="M10 130h30M70 138h40M140 128h36" stroke="#d8eef9" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  tea: (
    <>
      <rect width="200" height="150" fill="#ccfbf1" />
      <circle cx="100" cy="80" r="52" fill="#99e6d8" />
      <path d="M58 70 H142 Q142 118 100 118 Q58 118 58 70Z" fill="#2f3b3a" />
      <ellipse cx="100" cy="70" rx="42" ry="10" fill="#7cb342" />
      <ellipse cx="92" cy="68" rx="14" ry="3" fill="#a5d06a" />
      <rect x="150" y="40" width="8" height="46" rx="3" fill="#d9b37a" transform="rotate(24 154 63)" />
      <path d="M136 88 q8 -22 22 -8 q-4 14 -22 8Z" fill="#e8cf9e" />
    </>
  ),
  bamboo: (
    <>
      <rect width="200" height="150" fill="#d1fae5" />
      {[14, 44, 78, 108, 142, 172].map((x, i) => (
        <g key={x}>
          <rect x={x} y="0" width={i % 2 ? 12 : 16} height="150" fill={i % 2 ? "#4c9a6a" : "#2f7d55"} />
          <path d={`M${x} ${36 + i * 6}h16M${x} ${88 + i * 4}h16`} stroke="#1f5c3d" strokeWidth="2" />
        </g>
      ))}
      <path d="M70 150 L92 70 L112 70 L134 150Z" fill="#f1e6c8" opacity="0.9" />
    </>
  ),
  torii: (
    <>
      <rect width="200" height="150" fill="#1e3a4c" />
      <circle cx="160" cy="28" r="12" fill="#fdf3c7" />
      {[0, 1, 2].map((i) => {
        const s = 1 - i * 0.24;
        const w = 150 * s;
        const x = 100 - w / 2;
        const top = 34 + i * 22;
        return (
          <g key={i} fill={["#e2492f", "#c93d27", "#a9321f"][i]}>
            <rect x={x - 8 * s} y={top} width={w + 16 * s} height={10 * s} rx="2" />
            <rect x={x + 6 * s} y={top + 16 * s} width={w - 12 * s} height={7 * s} />
            <rect x={x + 14 * s} y={top} width={11 * s} height={150} />
            <rect x={x + w - 25 * s} y={top} width={11 * s} height={150} />
          </g>
        );
      })}
      <circle cx="100" cy="128" r="7" fill="#ffd87a" />
    </>
  ),
  yakitori: (
    <>
      <rect width="200" height="150" fill="#fef3c7" />
      <rect x="20" y="100" width="160" height="30" rx="6" fill="#3f3a3a" />
      <path d="M32 112h136" stroke="#f97316" strokeWidth="4" strokeDasharray="6 8" strokeLinecap="round" />
      {[44, 84, 124].map((x) => (
        <g key={x} transform={`rotate(-8 ${x + 16} 70)`}>
          <rect x={x + 14} y="24" width="4" height="84" rx="2" fill="#c9a26b" />
          <rect x={x + 4} y="36" width="24" height="16" rx="6" fill="#b45309" />
          <rect x={x + 4} y="56" width="24" height="14" rx="6" fill="#84a83a" />
          <rect x={x + 4} y="74" width="24" height="16" rx="6" fill="#b45309" />
        </g>
      ))}
    </>
  ),
  ramen: (
    <>
      <rect width="200" height="150" fill="#fef3c7" />
      <path d="M36 70 H164 Q160 130 100 130 Q40 130 36 70Z" fill="#b91c1c" />
      <ellipse cx="100" cy="70" rx="64" ry="18" fill="#f6c453" />
      <path d="M58 70 q10 -8 20 0 t20 0 t20 0 t20 0" stroke="#fde9a8" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="126" cy="66" r="11" fill="#fff" />
      <circle cx="126" cy="66" r="5" fill="#f59e0b" />
      <rect x="64" y="56" width="22" height="12" rx="2" fill="#2f4f3a" />
      <path d="M120 18 L96 64M136 22 L106 66" stroke="#7a4b3a" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  tofu: (
    <>
      <rect width="200" height="150" fill="#fef3c7" />
      <rect x="24" y="30" width="152" height="96" rx="10" fill="#3f3a3a" />
      <rect x="36" y="42" width="58" height="34" rx="4" fill="#fffdf5" />
      <circle cx="134" cy="59" r="18" fill="#f6e3c5" />
      <circle cx="134" cy="59" r="9" fill="#84a83a" />
      <circle cx="60" cy="100" r="15" fill="#f6e3c5" />
      <circle cx="60" cy="100" r="7" fill="#e2492f" />
      <rect x="92" y="88" width="72" height="26" rx="4" fill="#fde9a8" />
      <path d="M100 101h56" stroke="#d9a441" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
};
