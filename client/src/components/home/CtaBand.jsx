import { useGuidance } from '../../features/guidance/GuidanceContext';

export default function CtaBand() {
  const { openGuidance } = useGuidance();
  return (
    <section className="container-page">
      <div className="rounded-3xl bg-gradient-to-r from-pine-900 to-lake-800 px-6 py-12 text-center text-white sm:px-12">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Not sure where to start?</h2>
        <p className="mx-auto mt-3 max-w-xl text-pine-100">Tell us your NEET score and budget. A counsellor will suggest realistic options in India and abroad.</p>
        <button onClick={() => openGuidance()} className="btn-accent mt-7 px-8 py-3.5 text-base">Talk to a counsellor</button>
      </div>
    </section>
  );
}
