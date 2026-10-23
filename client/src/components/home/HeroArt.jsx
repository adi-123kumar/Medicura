/*
 * Illustrated campus scene shown when /hero.jpg is missing.
 * To use your own photo, save it as client/public/hero.jpg (portrait works best).
 */
export default function HeroArt() {
  return (
    <svg viewBox="0 0 600 700" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8fc1ea" /><stop offset="1" stopColor="#eaf3fb" /></linearGradient>
        <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8fb07a" /><stop offset="1" stopColor="#5f8a57" /></linearGradient>
        <linearGradient id="dome" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4a6a9c" /><stop offset="1" stopColor="#24406e" /></linearGradient>
      </defs>
      <rect width="600" height="700" fill="url(#sky)" />
      <g fill="#fff" opacity=".85"><ellipse cx="130" cy="110" rx="90" ry="24" /><ellipse cx="190" cy="98" rx="60" ry="22" /><ellipse cx="470" cy="170" rx="100" ry="22" /><ellipse cx="420" cy="158" rx="55" ry="20" /></g>
      <rect y="520" width="600" height="180" fill="url(#grass)" />
      <polygon points="270,700 330,700 372,540 318,540" fill="#d8cfbd" />
      {/* wings */}
      <rect x="140" y="410" width="150" height="130" fill="#d6c7a3" /><rect x="410" y="410" width="150" height="130" fill="#d6c7a3" />
      <g fill="#33507f" opacity=".75">{[160, 195, 230, 440, 475, 510].map((x) => <rect key={x} x={x} y="440" width="18" height="40" />)}</g>
      {/* main hall */}
      <rect x="260" y="360" width="180" height="180" fill="#e2d4b2" />
      <polygon points="250,360 350,322 450,360" fill="#cdbb94" />
      <g fill="#f3ead5">{[272, 304, 336, 368, 400].map((x) => <rect key={x} x={x} y="372" width="13" height="168" />)}</g>
      <rect x="318" y="268" width="64" height="58" fill="#cdbb94" />
      <path d="M312 268 A38 52 0 0 1 388 268 Z" fill="url(#dome)" />
      <rect x="346" y="204" width="8" height="14" fill="#24406e" />
      <g fill="#33507f" opacity=".8">{[326, 346, 366].map((x) => <rect key={x} x={x} y="280" width="8" height="30" />)}</g>
      {/* trees */}
      <g><rect x="62" y="470" width="10" height="90" fill="#5b4632" /><circle cx="67" cy="450" r="54" fill="#4f8a4d" /><circle cx="40" cy="480" r="36" fill="#5e9b58" />
      <rect x="548" y="480" width="10" height="90" fill="#5b4632" /><circle cx="553" cy="458" r="50" fill="#4f8a4d" /><circle cx="580" cy="490" r="34" fill="#5e9b58" /></g>
      <ellipse cx="300" cy="640" rx="260" ry="36" fill="#000" opacity=".06" />
    </svg>
  );
}
