import Eyebrow from '../common/Eyebrow';

/** Two-line section heading (second line in green) with an optional paragraph on the right. */
export default function SectionIntro({ eyebrow, line1, line2, text, children }) {
  return (
    <div className="grid items-end gap-8 lg:grid-cols-[1.3fr_1fr]">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-5 text-[clamp(2.2rem,4.4vw,3.6rem)] font-bold leading-[1.04] tracking-[-0.05em]">
          {line1}
          {line2 && <><br /><span className="text-leaf-600">{line2}</span></>}
        </h2>
      </div>
      {(text || children) && (
        <div>
          {text && <p className="max-w-[480px] text-[17px] leading-[1.75] text-slate-500">{text}</p>}
          {children}
        </div>
      )}
    </div>
  );
}
