import { site } from '../config/site';
import { useGuidance } from '../features/guidance/GuidanceContext';

export default function AboutPage() {
  const { openGuidance } = useGuidance();
  return (
    <section className="container-page max-w-3xl py-16">
      <h1 className="text-4xl font-extrabold">About {site.name}</h1>
      {/* TODO: replace with your real story, team and credentials */}
      <p className="mt-5 leading-relaxed text-slate-600">
        {site.name} helps students and parents make confident decisions about medical education. We explain the admission process in plain language,
        shortlist colleges that fit your score and budget, and support you through counselling, documentation and, for overseas study, visas and travel.
      </p>
      <p className="mt-4 leading-relaxed text-slate-600">
        Every college page on this site lists fees, seats, recognition and admission steps in one place. Please verify time-sensitive details with the college and official authorities before making a decision.
      </p>
      <button onClick={() => openGuidance()} className="btn-ink mt-8">Get free counselling</button>
    </section>
  );
}
