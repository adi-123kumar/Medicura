/** Faint "MC" watermark with rings, used on the right of page heroes. */
export default function McRings({ className = '' }) {
  return (
    <svg viewBox="0 0 620 560" className={className} aria-hidden="true" fill="none">
      <circle cx="380" cy="400" r="270" fill="#12337a" fillOpacity="0.05" />
      <circle cx="380" cy="400" r="215" stroke="#12337a" strokeOpacity="0.07" strokeWidth="2" />
      <circle cx="310" cy="190" r="150" fill="#fff" fillOpacity="0.55" />
      <circle cx="310" cy="190" r="120" stroke="#12337a" strokeOpacity="0.1" strokeWidth="2" />
      <text x="310" y="228" textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="500" fontSize="110" fill="#12337a" fillOpacity="0.13" letterSpacing="-4">MC</text>
      <circle cx="418" cy="268" r="8" fill="#1fa75a" />
    </svg>
  );
}
